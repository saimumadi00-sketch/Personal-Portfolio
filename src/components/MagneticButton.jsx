import { useRef } from 'react'

/**
 * MagneticButton — wraps any child element and makes it magnetically
 * attracted toward the cursor when hovered within a threshold radius.
 *
 * Usage:
 *   <MagneticButton>
 *     <button className="btn btn-primary">Click me</button>
 *   </MagneticButton>
 */
function MagneticButton({ children, strength = 0.35, className = '' }) {
  const ref = useRef(null)

  const handleMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`
    el.style.transition = 'transform 0.15s ease'
  }

  const handleMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'translate(0, 0)'
    el.style.transition = 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)'
  }

  return (
    <span
      ref={ref}
      className={`d-inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ display: 'inline-block' }}
    >
      {children}
    </span>
  )
}

export default MagneticButton
