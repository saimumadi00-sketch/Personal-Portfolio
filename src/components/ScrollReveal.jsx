import { motion } from 'framer-motion'

const offsets = {
  up: { x: 0, y: 24 },
  left: { x: -28, y: 0 },
  right: { x: 28, y: 0 },
}

function ScrollReveal({ children, direction = 'up', delay = 0 }) {
  const offset = offsets[direction] || offsets.up

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  )
}

export default ScrollReveal
