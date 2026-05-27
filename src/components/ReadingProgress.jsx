import { useEffect, useState } from 'react'

/**
 * ReadingProgress — thin bar at the very top of the viewport
 * that fills as the user scrolls down the page.
 */
function ReadingProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const update = () => {
      const scrollTop  = window.scrollY
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight
      const pct        = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setWidth(Math.min(100, Math.max(0, pct)))
    }

    window.addEventListener('scroll', update, { passive: true })
    update()
    return () => window.removeEventListener('scroll', update)
  }, [])

  return (
    <div
      id="reading-progress"
      aria-hidden="true"
      style={{ width: `${width}%` }}
    />
  )
}

export default ReadingProgress
