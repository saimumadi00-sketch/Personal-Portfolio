import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'

export default function NotFound() {
  return (
    <section className="container py-5 text-center">
      <SEOHead title="Page not found" noIndex />
      <p className="display-4 fw-bold text-primary">404</p>
      <h1 className="h2">Page not found</h1>
      <p className="text-secondary">This page may have moved. Explore my projects or return home.</p>
      <div className="d-flex gap-2 justify-content-center">
        <Link className="btn btn-primary" to="/">Home</Link>
        <Link className="btn btn-outline-primary" to="/projects">Browse projects</Link>
      </div>
    </section>
  )
}
