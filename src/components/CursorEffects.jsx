import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

/**
 * CursorEffects
 *  - Spotlight glow that follows the mouse on the hero section (feature 1)
 *  - Small trailing dot that follows the cursor site-wide (feature 11)
 */
function CursorEffects() {
  const { darkMode } = useTheme()
  const spotlightRef = useRef(null)
  const dotRef       = useRef(null)
  const dotPos       = useRef({ x: -100, y: -100 })
  const mousePos     = useRef({ x: -100, y: -100 })
  const rafRef       = useRef(null)

  useEffect(() => {
    // Create spotlight element
    const spotlight = document.createElement('div')
    spotlight.id = 'cursor-spotlight'
    spotlight.style.cssText = [
      'position:fixed', 'inset:0', 'pointer-events:none', 'z-index:0',
      'transition:opacity 0.3s ease',
      'opacity:0',
    ].join(';')
    document.body.appendChild(spotlight)
    spotlightRef.current = spotlight

    // Create trailing dot element
    const dot = document.createElement('div')
    dot.id = 'cursor-dot'
    dot.style.cssText = [
      'position:fixed', 'top:0', 'left:0',
      'width:8px', 'height:8px',
      'border-radius:50%',
      'background:#6ea8fe',
      'pointer-events:none',
      'z-index:9999',
      'transform:translate(-50%,-50%)',
      'transition:opacity 0.3s ease',
      'opacity:0',
      'will-change:transform',
    ].join(';')
    document.body.appendChild(dot)
    dotRef.current = dot

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      // Spotlight — only over hero section
      const hero = document.querySelector('.hero-immersive')
      if (hero) {
        const rect = hero.getBoundingClientRect()
        const inside = (
          e.clientX >= rect.left && e.clientX <= rect.right &&
          e.clientY >= rect.top  && e.clientY <= rect.bottom
        )
        if (inside) {
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top
          spotlight.style.opacity = '1'
          spotlight.style.background = `radial-gradient(
            600px circle at ${e.clientX}px ${e.clientY}px,
            rgba(13,110,253,0.10) 0%,
            transparent 70%
          )`
        } else {
          spotlight.style.opacity = '0'
        }
      }

      dot.style.opacity = '1'
    }

    const onMouseLeave = () => {
      spotlight.style.opacity = '0'
      dot.style.opacity = '0'
    }

    // Smooth dot animation loop
    const animate = () => {
      const lerp = (a, b, t) => a + (b - a) * t
      dotPos.current.x = lerp(dotPos.current.x, mousePos.current.x, 0.18)
      dotPos.current.y = lerp(dotPos.current.y, mousePos.current.y, 0.18)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotPos.current.x - 4}px, ${dotPos.current.y - 4}px)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      cancelAnimationFrame(rafRef.current)
      spotlight.remove()
      dot.remove()
    }
  }, [])

  // Update dot color on theme change
  useEffect(() => {
    if (dotRef.current) {
      dotRef.current.style.background = darkMode ? '#6ea8fe' : '#0d6efd'
    }
  }, [darkMode])

  return null
}

export default CursorEffects
