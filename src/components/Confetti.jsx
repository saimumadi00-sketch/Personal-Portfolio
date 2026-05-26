import { useEffect, useRef } from 'react'

/**
 * Confetti — canvas-based burst of coloured particles.
 * Mounts, plays once, then unmounts itself via onDone callback.
 */
function Confetti({ onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    const COLOURS = [
      '#0d6efd', '#6ea8fe', '#198754', '#20c997',
      '#ffc107', '#fd7e14', '#dc3545', '#ffffff',
    ]
    const PARTICLE_COUNT = 160
    const particles = []

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x:       canvas.width  * 0.5 + (Math.random() - 0.5) * 200,
        y:       canvas.height * 0.45,
        vx:      (Math.random() - 0.5) * 14,
        vy:      -(Math.random() * 12 + 6),
        rot:     Math.random() * 360,
        rotV:    (Math.random() - 0.5) * 8,
        w:       Math.random() * 10 + 5,
        h:       Math.random() * 5  + 3,
        color:   COLOURS[Math.floor(Math.random() * COLOURS.length)],
        alpha:   1,
        gravity: 0.35,
      })
    }

    let frame = 0
    let rafId

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      particles.forEach((p) => {
        if (p.alpha <= 0) return
        alive = true
        p.vy  += p.gravity
        p.x   += p.vx
        p.y   += p.vy
        p.rot += p.rotV
        p.alpha -= 0.012

        ctx.save()
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rot * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
        ctx.restore()
      })

      frame++
      if (alive && frame < 300) {
        rafId = requestAnimationFrame(draw)
      } else {
        onDone?.()
      }
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [onDone])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 99998,
      }}
    />
  )
}

export default Confetti
