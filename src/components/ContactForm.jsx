import { useState } from 'react'
import Button from './Button'

const initialForm = {
  name: '',
  email: '',
  subject: '',
  topic: '',
  message: '',
  consent: false,
}

function validateField(name, value) {
  if (name === 'name') {
    if (!value.trim()) return 'Name is required.'
    if (value.trim().length < 2) return 'Name must be at least 2 characters.'
  }

  if (name === 'email') {
    if (!value.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.'
  }

  if (name === 'subject' && !value.trim()) return 'Subject is required.'

  if (name === 'message') {
    if (!value.trim()) return 'Message is required.'
    if (value.trim().length < 10) return 'Message must be at least 10 characters.'
    if (value.length > 500) return 'Message cannot exceed 500 characters.'
  }

  if (name === 'consent' && !value) return 'You must agree before submitting.'

  return ''
}

function validateForm(form) {
  return Object.keys(initialForm).reduce((nextErrors, key) => {
    const error = validateField(key, form[key])
    if (error) nextErrors[key] = error
    return nextErrors
  }, {})
}

function ContactForm({ onSuccess }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [charCount, setCharCount] = useState(0)
  const [shake, setShake] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const setFieldError = (name, value) => {
    const error = validateField(name, value)
    setErrors((prev) => {
      const next = { ...prev }
      if (error) next[name] = error
      else delete next[name]
      return next
    })
  }

  const handleChange = (event) => {
    const { name, type, checked, value } = event.target
    const nextValue = type === 'checkbox' ? checked : value

    setForm((prev) => ({ ...prev, [name]: nextValue }))
    if (name === 'message') setCharCount(value.length)
    setFieldError(name, nextValue)
  }

  const getValidationClass = (name) => {
    if (errors[name]) return 'is-invalid'
    if (name === 'consent') return form.consent ? 'is-valid' : ''
    if (name === 'topic') return form.topic ? 'is-valid' : ''
    return form[name] ? 'is-valid' : ''
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
    setCharCount(0)
    setIsSubmitting(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    const nextErrors = validateForm(form)
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShake(true)
      setTimeout(() => {
        setShake(false)
        setIsSubmitting(false)
      }, 450)
      return
    }

    setForm(initialForm)
    setErrors({})
    setCharCount(0)
    setSubmitted(true)
    onSuccess?.()
    setTimeout(() => {
      setSubmitted(false)
      setIsSubmitting(false)
    }, 4000)
  }

  return (
    <div className={`card border-0 shadow-lg hover-card ${shake ? 'shake' : ''}`}>
      <div className="card-body p-4 p-lg-5">
        <h2 className="h4 mb-4">Send Me a Message</h2>

        {submitted && (
          <div className="alert alert-success border-0 shadow-sm" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            Message received. Thanks for reaching out.
          </div>
        )}

        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit} onReset={handleReset}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              className={`form-control ${getValidationClass('name')}`}
              id="name"
              name="name"
              placeholder="Full name"
              value={form.name}
              onChange={handleChange}
              required
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text">@</span>
              <input
                type="email"
                className={`form-control ${getValidationClass('email')}`}
                id="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
          </div>

          <div className="col-md-6">
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              className={`form-control ${getValidationClass('subject')}`}
              id="subject"
              name="subject"
              placeholder="Project discussion"
              value={form.subject}
              onChange={handleChange}
              required
            />
            {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
          </div>

          <div className="col-md-6">
            <label htmlFor="topic" className="form-label">
              Topic
            </label>
            <select
              className={`form-select ${getValidationClass('topic')}`}
              id="topic"
              name="topic"
              value={form.topic}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option value="Internship">Internship</option>
              <option value="Freelance Project">Freelance Project</option>
              <option value="Collaboration">Collaboration</option>
              <option value="General Question">General Question</option>
            </select>
          </div>

          <div className="col-12">
            <label htmlFor="message" className="form-label">
              Message
            </label>
            <textarea
              className={`form-control ${getValidationClass('message')}`}
              id="message"
              name="message"
              rows="5"
              placeholder="Write your message here..."
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>
            <div className={`d-flex justify-content-between mt-1 ${charCount > 500 ? 'text-danger' : 'text-muted'}`}>
              <small>{errors.message || 'Use 10 to 500 characters.'}</small>
              <small>{charCount} / 500 characters</small>
            </div>
          </div>

          <div className="col-12">
            <div className="form-check">
              <input
                className={`form-check-input ${getValidationClass('consent')}`}
                type="checkbox"
                id="consent"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                required
              />
              <label className="form-check-label" htmlFor="consent">
                I agree to be contacted regarding this message.
              </label>
              {errors.consent && <div className="invalid-feedback">{errors.consent}</div>}
            </div>
          </div>

          <div className="col-12 d-flex flex-wrap gap-2 pt-2">
            <Button type="submit" loading={isSubmitting} className="px-4">
              Send Message
            </Button>
            <Button type="reset" variant="outline-secondary">
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ContactForm
