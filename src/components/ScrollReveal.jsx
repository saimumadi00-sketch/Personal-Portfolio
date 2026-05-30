import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const offsets = {
  up:    { x: 0,   y: 24 },
  left:  { x: -28, y: 0  },
  right: { x: 28,  y: 0  },
}

function ScrollReveal({ children, direction = 'up', delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const offset = offsets[direction] || offsets.up

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...offset }}
      transition={{ duration: 0.5, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
