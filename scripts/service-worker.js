// Version and asset list are injected after the Vite production build.
/* global __PRECACHE__ */
const CACHE = 'saimum-portfolio-__BUILD_VERSION__'
const PRECACHE = __PRECACHE__

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(PRECACHE)))
  // Activate after existing tabs close, or when the user selects Reload.
})

self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((key) => key.startsWith('saimum-portfolio-') && key !== CACHE).map((key) => caches.delete(key))
  )).then(() => self.clients.claim()))
})

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin || url.pathname.startsWith('/api/')) return
  if (request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(request)
        if (response.ok) return response
      } catch { /* Fall back to the complete, versioned application shell. */ }
      return await caches.match('/index.html') || await caches.match('/offline.html') || new Response('Offline. Please reconnect and reload.', { status: 503 })
    })())
    return
  }
  if (!PRECACHE.includes(url.pathname) || request.headers.has('range')) return
  event.respondWith((async () => {
    const cache = await caches.open(CACHE)
    const hit = await cache.match(url.pathname)
    if (hit) return hit
    try {
      const response = await fetch(request)
      if (response.ok && response.status === 200 && response.type !== 'opaque') {
        event.waitUntil(cache.put(url.pathname, response.clone()).catch(() => {}))
      }
      return response
    } catch { return new Response('Asset unavailable offline. Please reconnect.', { status: 503 }) }
  })())
})
