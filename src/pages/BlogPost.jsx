import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import SEOHead from '../components/SEOHead'
import posts from '../data/posts'
import { pageVariants } from '../utils/variants'

const categoryColors = {
  'Web Dev':          'text-bg-primary',
  'Machine Learning': 'text-bg-warning',
  'Systems':          'text-bg-dark',
}

// Very lightweight markdown renderer — handles **bold**, `code`, and ## headings
function renderContent(text) {
  return text
    .trim()
    .split('\n')
    .map((line, i) => {
      const trimmed = line.trim()
      if (!trimmed) return <br key={i} />

      // Heading
      if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.slice(2, -2).includes('**')) {
        return (
          <h3 key={i} className="h5 fw-semibold mt-4 mb-2">
            {trimmed.slice(2, -2)}
          </h3>
        )
      }

      // Parse inline bold and code
      const parts = trimmed.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
      return (
        <p key={i} className="lh-lg text-secondary">
          {parts.map((part, j) => {
            if (part.startsWith('**') && part.endsWith('**'))
              return <strong key={j}>{part.slice(2, -2)}</strong>
            if (part.startsWith('`') && part.endsWith('`'))
              return <code key={j} className="bg-body-secondary px-1 rounded">{part.slice(1, -1)}</code>
            // Handle markdown links [text](url)
            const linkMatch = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
            if (linkMatch)
              return <a key={j} href={linkMatch[2]} target="_blank" rel="noreferrer" className="text-primary">{linkMatch[1]}</a>
            return part
          })}
        </p>
      )
    })
}

function BlogPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="container py-5 text-center">
        <h1 className="h3 mb-3">Post not found</h1>
        <Link to="/blog" className="btn btn-primary">Back to Blog</Link>
      </div>
    )
  }

  const currentIndex = posts.findIndex((p) => p.slug === slug)
  const prev = posts[currentIndex + 1]
  const next = posts[currentIndex - 1]

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead title={post.title} description={post.excerpt} />

      <PageHeader
        title={post.title}
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Blog', to: '/blog' },
          { label: post.title },
        ]}
      />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">

            {/* Meta row */}
            <div className="d-flex flex-wrap gap-3 align-items-center mb-4">
              <span className={`badge ${categoryColors[post.category] || 'text-bg-secondary'}`}>
                {post.category}
              </span>
              <span className="small text-muted">
                <i className="bi bi-calendar3 me-1"></i>
                {new Date(post.date).toLocaleDateString('en-GB', {
                  day: 'numeric', month: 'long', year: 'numeric',
                })}
              </span>
              <span className="small text-muted">
                <i className="bi bi-clock me-1"></i>{post.readTime} read
              </span>
            </div>

            {/* Content */}
            <article className="blog-post-body">
              {renderContent(post.content)}
            </article>

            <hr className="my-5" />

            {/* Prev / Next */}
            <div className="d-flex flex-wrap justify-content-between gap-3">
              {prev ? (
                <Link to={`/blog/${prev.slug}`} className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-arrow-left me-1"></i>{prev.title}
                </Link>
              ) : <span />}
              {next ? (
                <Link to={`/blog/${next.slug}`} className="btn btn-outline-primary btn-sm ms-auto">
                  {next.title}<i className="bi bi-arrow-right ms-1"></i>
                </Link>
              ) : null}
            </div>

            <div className="text-center mt-4">
              <Link to="/blog" className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-grid me-1"></i>All Posts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default BlogPost
