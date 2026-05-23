import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

function TimelineItem({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 })
  const fromLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`timeline-item ${fromLeft ? 'timeline-item-left' : 'timeline-item-right'}`}
      initial={{ opacity: 0, x: fromLeft ? -32 : 32 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: fromLeft ? -32 : 32 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <span className="timeline-dot" aria-hidden="true"></span>
      <div className="card border-0 shadow-sm h-100">
        <div className="card-body">
          <span className="timeline-year">{item.year}</span>
          <h5>{item.title}</h5>
          <p className="fw-semibold mb-2">{item.subtitle}</p>
          <p className="text-secondary mb-0">{item.description}</p>
        </div>
      </div>
    </motion.div>
  )
}

function Timeline({ items = [] }) {
  return (
    <div className="timeline timeline-alternate">
      {items.map((item, index) => (
        <TimelineItem item={item} index={index} key={`${item.year}-${item.title}`} />
      ))}
    </div>
  )
}

export default Timeline
