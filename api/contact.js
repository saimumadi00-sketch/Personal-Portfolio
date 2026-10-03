import { Buffer } from 'node:buffer'
import { normalizeForm, validateForm } from '../src/utils/contact.js'
import resume from '../src/data/resume.js'

// Per-instance throttle; provider/platform limits are still needed at scale.
const attempts = new Map()
const WINDOW_MS = 10 * 60 * 1000

export function createContactHandler({ env = process.env, send = fetch, now = Date.now } = {}) {
  return async (req, res) => {
    res.setHeader('Cache-Control', 'no-store')
    const configured = Boolean(env.RESEND_API_KEY && env.CONTACT_EMAIL_FROM)
    if (req.method === 'GET') return res.status(200).json({ configured })
    if (req.method !== 'POST') { res.setHeader('Allow', 'GET, POST'); return res.status(405).json({ error: 'Method not allowed.' }) }
    if (req.headers.origin !== (env.CONTACT_ALLOWED_ORIGIN || resume.site)) return res.status(403).json({ error: 'Request origin is not allowed.' })
    if (!configured) return res.status(503).json({ error: 'Direct sending is unavailable. Please use your email app.' })
    if (!req.headers['content-type']?.startsWith('application/json')) return res.status(415).json({ error: 'Send JSON content.' })
    let raw
    try { raw = typeof req.body === 'string' ? req.body : JSON.stringify(req.body) } catch { return res.status(400).json({ error: 'Invalid request.' }) }
    if (!raw || Buffer.byteLength(raw) > 12000) return res.status(413).json({ error: 'Message is too large.' })
    let body
    try { body = JSON.parse(raw) } catch { return res.status(400).json({ error: 'Invalid JSON.' }) }
    if (!body || typeof body !== 'object' || Array.isArray(body)) return res.status(400).json({ error: 'Invalid message.' })
    const data = normalizeForm(body)
    if (Object.keys(validateForm(data)).length || data.website) return res.status(400).json({ error: 'Please check your message fields.' })
    const timestamp = now()
    for (const [key, value] of attempts) if (timestamp - value.start >= WINDOW_MS) attempts.delete(key)
    const ip = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
    const record = attempts.get(ip) || { start: timestamp, count: 0 }
    if (record.count >= 4 || attempts.size >= 10000) { res.setHeader('Retry-After', '600'); return res.status(429).json({ error: 'Too many requests. Please try later or email directly.' }) }
    attempts.set(ip, { ...record, count: record.count + 1 })
    try {
      const response = await send('https://api.resend.com/emails', {
        method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: env.CONTACT_EMAIL_FROM, to: [resume.email], reply_to: data.email,
          subject: `Portfolio: ${data.subject.replace(/[\r\n]/g, ' ')}`,
          text: `${data.message}\n\nName: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}` }),
        signal: AbortSignal.timeout(10000),
      })
      const result = await response.json()
      if (!response.ok || typeof result.id !== 'string') return res.status(502).json({ error: 'The email service could not accept your message.' })
      return res.status(200).json({ accepted: true })
    } catch { return res.status(502).json({ error: 'The email service is unavailable.' }) }
  }
}

export default createContactHandler()
