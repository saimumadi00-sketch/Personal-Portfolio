import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import posts from '../data/posts'
import { pageVariants } from '../utils/variants'

const allCategories = ['All', ...new Set(posts.map((p) => p.category))]

const categoryColors = {
  'Web Dev':        'text-bg-primary',
  'Machine Learning': 'text-bg-warning',
  'Systems':        'text-bg-dark',
}

function Blog() {
  const [active, setActive] = useState('All')

  const visible = active === 'All'
    ? posts
    : posts.filter((p) => p.category === active)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead
        title="Blog"
        description="Dev notes and write-ups by Md Saimum Al Mahmud on web development, machine learning, and systems programming."
      />

      <PageHeader
        title="Dev Notes"
        subtitle="Writing about things I've built, broken, and learned."
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Blog' }]}
      />

      <div className="container py-5">

        {/* Category filter */}
        <div className="d-flex flex-wrap gap-2 mb-5">
          {allCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`btn btn-sm ${active === cat ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {cat}
            </button>
          ))}
          <span className="badge text-bg-secondary align-self-center ms-1">
            {visible.length} post{visible.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Post cards */}
        <div className="row g-4">
          {visible.map((post, i) => (
            <div className="col-12 col-md-6" key={post.id}>
              <ScrollReveal direction="up" delay={i * 0.1}>
                <Link to={`/blog/${post.slug}`} className="text-decoration-none">
                  <div className="card h-100 border-0 shadow-sm hover-card blog-card">
                    <div className="card-body d-flex flex-column p-4">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <span className={`badge ${categoryColors[post.category] || 'text-bg-secondary'}`}>
                          {post.category}
                        </span>
                        <span className="small text-muted">{post.readTime} read</span>
                      </div>
                      <h2 className="h5 card-title mb-2">{post.title}</h2>
                      <p className="card-text text-secondary small flex-grow-1">{post.excerpt}</p>
                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <span className="small text-muted">
                          <i className="bi bi-calendar3 me-1"></i>
                          {new Date(post.date).toLocaleDateString('en-GB', {
                            day: 'numeric', month: 'short', year: 'numeric',
                          })}
                        </span>
                        <span className="small text-primary fw-medium">
                          Read more <i className="bi bi-arrow-right ms-1"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Blog
