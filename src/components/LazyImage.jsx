import { useEffect, useRef, useState } from 'react'

/**
 * LazyImage — only loads the src when the element enters the viewport.
 * Shows a blurred placeholder until loaded, then crossfades to sharp.
 */
function LazyImage({ src, alt, className = '', style = {}, wrapperClassName = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const wrapperClasses = ['lazy-img-wrap', wrapperClassName].filter(Boolean).join(' ')
  const imageClasses = ['lazy-img', loaded ? 'loaded' : '', className].filter(Boolean).join(' ')

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={wrapperClasses} style={style}>
      {inView && (
        <img
          src={src}
          alt={alt}
          className={imageClasses}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

export default LazyImage
