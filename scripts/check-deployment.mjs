import assert from 'node:assert/strict'
import { sitePages, siteUrl } from '../src/data/site.js'

const base = new URL(process.argv[2] || siteUrl)
const failures = []
const warnings = []
let passed = 0

async function get(path) {
  const response = await fetch(new URL(path, base), {
    cache: 'no-store',
    signal: AbortSignal.timeout(15_000),
  })
  return { response, bytes: new Uint8Array(await response.arrayBuffer()) }
}

async function check(label, action) {
  try {
    await action()
    passed += 1
    console.log(`PASS ${label}`)
  } catch (error) {
    failures.push(`${label}: ${error.message}`)
    console.error(`FAIL ${label}: ${error.message}`)
  }
}

function expectType(response, type) {
  assert.equal(response.status, 200, `HTTP ${response.status}`)
  assert.match(response.headers.get('content-type') || '', type)
}

function text(bytes) {
  return new TextDecoder().decode(bytes)
}

let entry
await check('homepage application shell', async () => {
  const { response, bytes } = await get('/')
  expectType(response, /text\/html/)
  const html = text(bytes)
  assert.match(html, /id="root"/)
  entry = html.match(/<script[^>]*\bsrc="([^"]+)"/)?.[1]
  assert.ok(entry?.startsWith('/assets/'), 'Missing production entry script')
})

for (const { path } of sitePages.filter(({ path }) => path !== '/')) {
  await check(`direct page ${path}`, async () => {
    const { response, bytes } = await get(path)
    expectType(response, /text\/html/)
    assert.ok(entry && text(bytes).includes(entry), 'Page does not serve the application shell')
    assert.equal(new URL(response.url).pathname, path, 'Unexpected page redirect')
  })
}

await check('unknown page reaches client-side recovery', async () => {
  const { response, bytes } = await get('/__deployment-check__')
  expectType(response, /text\/html/)
  assert.ok(entry && text(bytes).includes(entry), 'Missing client-side 404 application')
})

await check('sitemap lists all public pages', async () => {
  const { response, bytes } = await get('/sitemap.xml')
  expectType(response, /(?:application|text)\/xml/)
  const urls = [...text(bytes).matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1])
  assert.deepEqual(urls.sort(), sitePages.map(({ path }) => `${siteUrl}${path === '/' ? '/' : path}`).sort())
})

await check('contact configuration returns JSON', async () => {
  const { response, bytes } = await get('/api/contact')
  expectType(response, /application\/json/)
  const config = JSON.parse(text(bytes))
  assert.equal(typeof config.configured, 'boolean')
  assert.match(response.headers.get('cache-control') || '', /no-store/)
  if (!config.configured) warnings.push('Direct email delivery is unconfigured; the form uses email drafts.')
})

for (const path of ['/api/__deployment-check__', '/assets/__deployment-check__.js']) {
  await check(`missing resource ${path} stays a 404`, async () => {
    const { response } = await get(path)
    assert.equal(response.status, 404, `Unexpected HTTP ${response.status}`)
  })
}

let precache = []
await check('versioned service worker and complete asset manifest', async () => {
  const { response, bytes } = await get('/sw.js')
  expectType(response, /(?:application|text)\/javascript/)
  assert.match(response.headers.get('cache-control') || '', /no-store/)
  const source = text(bytes)
  assert.match(source, /saimum-portfolio-[a-f0-9]{16}/)
  const manifest = source.match(/const PRECACHE = (\[[^\n]+\])/)
  assert.ok(manifest, 'Missing offline asset manifest')
  precache = JSON.parse(manifest[1])
  assert.ok(precache.includes('/index.html') && precache.includes('/offline.html'), 'Missing offline HTML')
  assert.ok(precache.includes(entry), 'Entry script is absent from the offline manifest')
  assert.ok(precache.some((path) => /\/Contact-[^/]+\.js$/.test(path)), 'Missing lazy contact page')
  assert.equal(new Set(precache).size, precache.length, 'Duplicate offline assets')
  assert.ok(precache.every((path) => path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/api/')), 'Invalid public asset path')
})

async function checkAsset(path) {
  await check(`offline asset ${path}`, async () => {
    const { response, bytes } = await get(path)
    const types = {
      html: /text\/html/,
      js: /(?:application|text)\/javascript/,
      css: /text\/css/,
      json: /application\/json/,
      svg: /image\/svg\+xml/,
      webp: /image\/webp/,
      png: /image\/png/,
      pdf: /application\/pdf/,
      woff: /(?:font\/woff|application\/(?:font-woff|octet-stream))/,
      woff2: /(?:font\/woff2|application\/(?:font-woff|octet-stream))/,
    }
    expectType(response, types[path.split('.').pop()] || /.+/)
    assert.ok(bytes.length > 0, 'Empty asset')
    assert.equal(new URL(response.url).pathname, path, 'Offline asset was redirected')
    if (path === '/index.html') assert.ok(entry && text(bytes).includes(entry), 'Wrong application shell')
    if (path === '/offline.html') assert.match(text(bytes), /<h1>You are offline<\/h1>/)
    if (path.endsWith('.pdf')) assert.equal(text(bytes.subarray(0, 5)), '%PDF-')
    if (path.startsWith('/assets/')) assert.match(response.headers.get('cache-control') || '', /immutable/)
  })
}

// Keep deployment checks modest even when the offline bundle grows.
for (let offset = 0; offset < precache.length; offset += 4) {
  await Promise.all(precache.slice(offset, offset + 4).map(checkAsset))
}

for (const warning of warnings) console.warn(`WARN ${warning}`)
console.log(`${passed} checks passed; ${failures.length} failed; ${warnings.length} warnings.`)
if (failures.length) process.exitCode = 1
