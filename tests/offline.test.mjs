import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile, access } from 'node:fs/promises'
import { runInNewContext } from 'node:vm'

const worker = await readFile('dist/sw.js', 'utf8')
const files = JSON.parse(worker.match(/const PRECACHE = (\[[^\n]+\])/)[1])
async function runtime() {
  const handlers = new Map(), stores = new Map()
  let network = async () => new Response('network')
  let claims = 0, skips = 0
  const caches = {
    keys: async () => [...stores.keys()], delete: async (key) => stores.delete(key),
    open: async (key) => {
      if (!stores.has(key)) stores.set(key, new Map())
      const store = stores.get(key)
      return { addAll: async (list) => { for (const path of list) store.set(path, new Response(await readFile(`dist${path}`))) }, match: async (path) => store.get(path)?.clone(), put: async (path, value) => store.set(path, value) }
    },
    match: async (path) => { for (const store of stores.values()) if (store.has(path)) return store.get(path).clone() },
  }
  runInNewContext(worker, { self: { location: { origin: 'https://saimum-aditto.vercel.app' }, clients: { claim: () => { claims++ } }, skipWaiting: () => { skips++ }, addEventListener: (name, fn) => handlers.set(name, fn) }, caches, URL, Response, fetch: (...args) => network(...args) })
  const dispatch = async (name, extra = {}) => {
    const tasks = []; let response
    handlers.get(name)({ ...extra, waitUntil: (promise) => tasks.push(promise), respondWith: (promise) => { response = promise } })
    const result = response ? await response : undefined
    await Promise.all(tasks)
    return result
  }
  await dispatch('install')
  return { dispatch, caches, stores, setNetwork: (fn) => { network = fn }, skips: () => skips, claims: () => claims }
}
const request = (path, mode = 'cors', method = 'GET') => ({ url: `https://saimum-aditto.vercel.app${path}`, mode, method, headers: new Headers() })

test('production precache contains the complete lazy application and every referenced file exists', async () => {
  for (const file of files) await access(`dist${file}`)
  for (const name of ['Contact-', 'Resume-', 'Projects-', 'Skills-', 'About-', 'NotFound-']) assert.ok(files.some((file) => file.includes(name)), name)
  assert.ok(files.includes('/saimum-al-mahmud-cv.pdf')); assert.ok(!files.includes('/portrait.png'))
})
test('offline deep links serve the cached shell and route chunks without network', async () => {
  const app = await runtime(); app.setNetwork(async () => { throw Error('offline') })
  const page = await app.dispatch('fetch', { request: request('/resume', 'navigate') })
  assert.equal(page.status, 200); assert.match(await page.text(), /id="root"/)
  const asset = files.find((file) => file.includes('Resume-'))
  const chunk = await app.dispatch('fetch', { request: request(asset) })
  assert.equal(chunk.status, 200); assert.ok((await chunk.text()).length > 500)
})
test('API calls, writes, and external requests bypass offline caching', async () => {
  const app = await runtime()
  assert.equal(await app.dispatch('fetch', { request: request('/api/contact') }), undefined)
  assert.equal(await app.dispatch('fetch', { request: request('/api/contact', 'cors', 'POST') }), undefined)
  assert.equal(await app.dispatch('fetch', { request: { ...request('/'), url: 'https://other.example/asset.js' } }), undefined)
})
test('failed asset responses are not stored', async () => {
  const app = await runtime(), asset = files.find((file) => file.endsWith('.js'))
  for (const store of app.stores.values()) store.delete(asset)
  app.setNetwork(async () => new Response('failed', { status: 500 }))
  const response = await app.dispatch('fetch', { request: request(asset) })
  assert.equal(response.status, 500); assert.equal(await app.caches.match(asset), undefined)
})
test('activation removes only older portfolio caches and update activation is explicit', async () => {
  const app = await runtime()
  app.stores.set('saimum-portfolio-v1', new Map()); app.stores.set('unrelated-app', new Map())
  assert.equal(app.skips(), 0)
  await app.dispatch('activate')
  assert.ok(app.stores.has('unrelated-app')); assert.ok(!app.stores.has('saimum-portfolio-v1')); assert.equal(app.claims(), 1)
  await app.dispatch('message', { data: { type: 'SKIP_WAITING' } }); assert.equal(app.skips(), 1)
})
