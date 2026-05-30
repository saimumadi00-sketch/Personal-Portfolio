import { useEffect, useRef } from 'react'

function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Skip on touch-only devices to save battery
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) return

    const ctx = canvas.getContext('2d')
    let animId
    let W = 0, H = 0
    const PARTICLE_COUNT = 80
    const MAX_DIST = 130
    const particles = []

    function resize() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      // Guard against zero dimensions during hidden phase
      if (w === 0 || h === 0) return
      W = canvas.width  = w
      H = canvas.height = h
    }

    function Particle() {
      this.x  = Math.random() * W
      this.y  = Math.random() * H
      this.vx = (Math.random() - 0.5) * 0.4
      this.vy = (Math.random() - 0.5) * 0.4
      this.r  = Math.random() * 1.6 + 0.4
      this.alpha = Math.random() * 0.5 + 0.2
    }

    Particle.prototype.update = function () {
      this.x += this.vx
      this.y += this.vy
      if (this.x < 0 || this.x > W) this.vx *= -1
      if (this.y < 0 || this.y > H) this.vy *= -1
    }

    function init() {
      particles.length = 0
      if (W === 0 || H === 0) return
      for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle())
    }

    function draw() {
      if (W === 0 || H === 0) { animId = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.18
            ctx.beginPath()
            ctx.strokeStyle = `rgba(110,168,254,${alpha})`
            ctx.lineWidth = 0.8
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      particles.forEach((p) => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(180,210,255,${p.alpha})`
        ctx.fill()
        p.update()
      })

      animId = requestAnimationFrame(draw)
    }

    // Debounced resize
    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => { resize(); init() }, 150)
    }

    resize()
    init()
    draw()

    const ro = new ResizeObserver(handleResize)
    ro.observe(canvas)

    return () => {
      cancelAnimationFrame(animId)
      clearTimeout(resizeTimer)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

export default StarField
