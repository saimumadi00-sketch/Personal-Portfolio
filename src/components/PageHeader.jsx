import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const fadeSlideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  return (
    <header className="page-header">
      <div className="container">
        {breadcrumbs.length > 0 && (
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb mb-0">
              {breadcrumbs.map((item) => (
                <li className={`breadcrumb-item${item.to ? '' : ' active'}`} key={item.label} aria-current={item.to ? undefined : 'page'}>
                  {item.to ? <Link to={item.to}>{item.label}</Link> : item.label}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <motion.div variants={fadeSlideUp} initial="hidden" animate="visible">
          <h1 className="display-5 fw-bold mb-2">{title}</h1>
          {subtitle && <p className="lead mb-0">{subtitle}</p>}
        </motion.div>
      </div>
    </header>
  )
}

export default PageHeader
