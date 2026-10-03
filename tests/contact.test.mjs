import test from 'node:test'
import assert from 'node:assert/strict'
import { buildMailto, normalizeForm, validateForm } from '../src/utils/contact.js'
import { createContactHandler } from '../api/contact.js'

const form = { name: 'Test Visitor', email: 'visitor@example.com', phone: '', subject: 'Project discussion', message: 'Hello, I would like to discuss a project.', consent: true, website: '' }
const headers = { origin: 'https://saimum-aditto.vercel.app', 'content-type': 'application/json', 'x-forwarded-for': 'test-ip' }
const env = { RESEND_API_KEY: 'test-only', CONTACT_EMAIL_FROM: 'test@example.com' }
function response() { return { headers: {}, status(code) { this.code = code; return this }, setHeader(name, value) { this.headers[name] = value }, json(data) { this.data = data; return this } } }

test('normalization preserves internal spaces and email drafts safely encode punctuation', () => {
  assert.equal(normalizeForm({ ...form, name: ' Test Visitor ' }).name, 'Test Visitor')
  const uri = buildMailto({ ...form, subject: 'Meeting & CV?', message: 'Hello there\nSecond line + details' }, 'owner@example.com')
  const query = new URL(uri).searchParams
  assert.equal(query.get('subject'), 'Meeting & CV?')
  assert.match(query.get('body'), /Hello there\nSecond line \+ details/)
  assert.deepEqual(validateForm(form), {})
  assert.ok(validateForm({ ...form, email: 'bad', consent: false }).email)
  assert.ok(validateForm({ ...form, message: 'x'.repeat(501) }).message)
})

test('unconfigured contact endpoint reports unavailable without claiming delivery', async () => {
  const handler = createContactHandler({ env: {} })
  const get = response(); await handler({ method: 'GET' }, get)
  assert.deepEqual(get.data, { configured: false })
  const post = response(); await handler({ method: 'POST', headers, body: form }, post)
  assert.equal(post.code, 503); assert.equal(post.data.accepted, undefined)
})

test('endpoint validates origin, consent, malformed input and honeypot without provider calls', async () => {
  const handler = createContactHandler({ env, send: () => { throw Error('Must not send') } })
  for (const [body, expected, origin] of [[form, 403, 'https://other.example'], [{ ...form, consent: false }, 400], ['{', 400], ['"text"', 400], [{ ...form, website: 'spam' }, 400], [{ ...form, message: 'x'.repeat(13000) }, 413]]) {
    const res = response()
    await handler({ method: 'POST', headers: { ...headers, origin: origin || headers.origin }, body }, res)
    assert.equal(res.code, expected)
  }
})

test('success requires provider acceptance and failures never report acceptance', async () => {
  let payload
  const ok = createContactHandler({ env, send: async (_, options) => { payload = JSON.parse(options.body); return { ok: true, json: async () => ({ id: 'test-message' }) } } })
  const good = response(); await ok({ method: 'POST', headers: { ...headers, 'x-forwarded-for': 'good' }, body: form }, good)
  assert.equal(good.data.accepted, true)
  assert.equal(payload.reply_to, form.email); assert.match(payload.text, /Test Visitor/)
  const bad = createContactHandler({ env, send: async () => ({ ok: false, json: async () => ({ error: 'provider failed' }) }) })
  const failed = response(); await bad({ method: 'POST', headers: { ...headers, 'x-forwarded-for': 'failed' }, body: form }, failed)
  assert.equal(failed.code, 502); assert.equal(failed.data.accepted, undefined)
})

test('per-instance throttle blocks the fifth attempt', async () => {
  const handler = createContactHandler({ env, send: async () => ({ ok: true, json: async () => ({ id: 'test' }) }) })
  let res
  for (let i = 0; i < 5; i++) { res = response(); await handler({ method: 'POST', headers: { ...headers, 'x-forwarded-for': 'rate' }, body: form }, res) }
  assert.equal(res.code, 429)
})
