import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

/**
 * PageLoader — full-screen animated intro that plays once per session.
 * Shows the brand name letter by letter, then slides up and unmounts.
 */
function PageLoader({ onDone }) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Total: 300ms delay + 600ms letter anim + 500ms hold + 400ms exit = ~1.8s
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => onDone?.(), 450)
    }, 1600)
    return () => clearTimeout(timer)
  }, [onDone])

  const letters = 'Saimum.'.split('')

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'linear-gradient(135deg, #0d1117 0%, #1a3a5c 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            flexDirection: 'column',
            gap: '1.5rem',
          }}
        >
          {/* Brand letters */}
          <div style={{ display: 'flex', gap: '0.04em' }}>
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.4,
                  ease: 'easeOut',
                }}
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                  fontWeight: 700,
                  color: letter === '.' ? '#6ea8fe' : '#ffffff',
                  lineHeight: 1,
                  fontFamily: 'system-ui, sans-serif',
                  letterSpacing: '-0.02em',
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.4 }}
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontSize: '0.85rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              margin: 0,
            }}
          >
            Portfolio
          </motion.p>

          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: '3px',
              background: 'linear-gradient(90deg, #0d6efd, #6ea8fe)',
            }}
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageLoader
