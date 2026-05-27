import { useEffect, useRef, useState } from 'react'

/**
 * LazyImage — only loads the src when the element enters the viewport.
 * Shows a blurred placeholder until loaded, then crossfades to sharp.
 */
function LazyImage({ src, alt, className = '', style = {}, wrapperClassName = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

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
    <div ref={ref} className={`lazy-img-wrap ${wrapperClassName}`} style={style}>
      {inView && (
        <img
          src={src}
          alt={alt}
          className={`lazy-img ${loaded ? 'loaded' : ''} ${className}`}
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  )
}

export default LazyImage
