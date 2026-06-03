import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

const fadeSlideUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

function PageHeader({ title, subtitle, breadcrumbs = [] }) {
  const { darkMode } = useTheme()

  return (
    <header
      className="page-header"
      style={{
        background: darkMode
          ? 'linear-gradient(135deg, #0d1117 0%, #1a3a5c 100%)'
          : 'linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%)',
      }}
    >
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
