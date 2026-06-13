import { motion } from 'framer-motion'
import { useState } from 'react'
import ContactForm from '../components/ContactForm'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SEOHead from '../components/SEOHead'
import socialLinks from '../data/socialLinks'
import { pageVariants } from '../utils/variants'

function Contact({ onToast }) {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    const email = 'saimumadi00@gmail.com'
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true)
      onToast?.('Email address copied to clipboard!', 'success')
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      onToast?.('Could not copy — please copy manually.', 'danger')
    })
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead title="Contact" />
      <PageHeader
        title="Get In Touch"
        subtitle="Reach out any time"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Contact' },
        ]}
      />

      <div className="container py-5">
        <section>
          <div className="row g-4">
            <div className="col-lg-5">
              <div className="d-flex flex-wrap gap-2 mb-4">
                <a href={socialLinks.github.href} target="_blank" rel="noreferrer" className="btn btn-dark">
                  <i className={`bi ${socialLinks.github.icon} me-2`}></i>
                  {socialLinks.github.label}
                </a>
                <a href={socialLinks.liveSite.href} target="_blank" rel="noreferrer" className="btn btn-outline-primary">
                  <i className={`bi ${socialLinks.liveSite.icon} me-2`}></i>
                  {socialLinks.liveSite.label}
                </a>
              </div>
              <ScrollReveal direction="left">
                <div className="card border-0 shadow-sm h-100 hover-card">
                  <div className="card-body p-4">
                    <h2 className="h5 mb-3">Contact Information</h2>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item px-0">
                        <strong>Location:</strong> Vassantek, Dhaka Cantonment, Bangladesh
                      </li>
                      <li className="list-group-item px-0">
                        <strong>GitHub:</strong>{' '}
                        <a href={socialLinks.github.href} className="link-primary">
                          github.com/saimumadi00-sketch
                        </a>
                      </li>
                      <li className="list-group-item px-0">
                        <strong>Email:</strong> saimumadi00@gmail.com{' '}
                        <button
                          className={`btn btn-sm btn-outline-primary copy-email-btn ms-2 ${copied ? 'copied' : ''}`}
                          onClick={handleCopyEmail}
                          aria-label="Copy email address"
                        >
                          <i className={`bi ${copied ? 'bi-check-lg' : 'bi-clipboard'} me-1`}></i>
                          {copied ? 'Copied!' : 'Copy Email'}
                        </button>
                      </li>
                      <li className="list-group-item px-0">
                        <strong>LinkedIn:</strong>{' '}
                        <a href={socialLinks.linkedin.href} className="link-primary">
                          linkedin.com/in/saimum
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="col-lg-7">
              <ScrollReveal direction="right">
                <ContactForm onSuccess={() => onToast?.('Message sent!', 'success')} />
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  )
}

export default Contact
