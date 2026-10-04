import { useEffect, useRef, useState } from 'react'

export default function UpdateNotice() {
  const [worker, setWorker] = useState(null)
  const [reloading, setReloading] = useState(false)
  const reloadIntent = useRef(false)
  useEffect(() => {
    const ready = (event) => setWorker(event.detail)
    const changed = () => { if (reloadIntent.current) window.location.reload() }
    window.addEventListener('portfolio-update-ready', ready)
    navigator.serviceWorker?.addEventListener('controllerchange', changed)
    navigator.serviceWorker?.getRegistration().then((registration) => { if (registration?.waiting) setWorker(registration.waiting) }).catch(() => {})
    return () => { window.removeEventListener('portfolio-update-ready', ready); navigator.serviceWorker?.removeEventListener('controllerchange', changed) }
  }, [])
  if (!worker) return null
  return (
    <aside className="update-notice alert alert-info shadow mb-0" aria-label="Site update">
      <p className="small mb-2">A new version is ready. Reloading clears any unsent form text.</p>
      <button className="btn btn-sm btn-primary me-2" type="button" disabled={reloading} onClick={() => { reloadIntent.current = true; setReloading(true); worker.postMessage({ type: 'SKIP_WAITING' }) }}>Reload</button>
      <button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setWorker(null)} disabled={reloading}>Later</button>
    </aside>
  )
}
