import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

function SectionToggle({ title, children, defaultVisible = true }) {
  const [isVisible, setIsVisible] = useState(defaultVisible)

  return (
    <section className="mb-5">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h3 fw-semibold mb-0">{title}</h2>
        <button
          type="button"
          className="btn btn-outline-secondary btn-sm"
          onClick={() => setIsVisible((visible) => !visible)}
        >
          {isVisible ? 'Hide' : 'Show'}
        </button>
      </div>
      <AnimatePresence initial={false}>
        {isVisible && (
          <motion.div
            className="section-toggle-content"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default SectionToggle
