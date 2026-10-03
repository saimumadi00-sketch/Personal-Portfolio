import { useEffect, useRef, useState } from 'react'
import resume from '../data/resume'
import { buildMailto, initialForm, normalizeForm, validateField, validateForm } from '../utils/contact'
import Button from './Button'

function ContactForm() {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [canSend, setCanSend] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [notice, setNotice] = useState('')
  const [failed, setFailed] = useState(false)
  const formRef = useRef(null)
  const requestRef = useRef(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/contact', { signal: controller.signal, cache: 'no-store' })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => { if (!controller.signal.aborted) setCanSend(data?.configured === true) })
      .catch(() => {})
    return () => { controller.abort(); requestRef.current?.abort(); requestRef.current = null }
  }, [])

  const handleChange = ({ target: { name, type, checked, value } }) => {
    const nextValue = type === 'checkbox' ? checked : value
    setForm((current) => ({ ...current, [name]: nextValue }))
    setNotice('')
    if (errors[name]) setErrors((current) => ({ ...current, [name]: validateField(name, nextValue) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (isSubmitting) return
    const nextErrors = validateForm(form)
    setErrors(nextErrors)
    setNotice('')
    setFailed(false)
    if (Object.keys(nextErrors).length) {
      formRef.current.elements.namedItem(Object.keys(nextErrors)[0])?.focus()
      return
    }
    if (!canSend) {
      setNotice('Your email draft is ready. Open your email app below and send it there. Your message stays here until you clear it.')
      return
    }
    setIsSubmitting(true)
    const controller = new AbortController()
    requestRef.current = controller
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(normalizeForm(form)), signal: controller.signal,
      })
      const data = await response.json()
      if (!response.ok || data.accepted !== true) throw new Error(data.error || 'Unable to submit your message.')
      if (requestRef.current !== controller) return
      setForm(initialForm)
      setNotice('Message submitted to the email service. Thank you for reaching out.')
    } catch (error) {
      if (requestRef.current === controller) {
        setFailed(true)
        setNotice(error.name === 'AbortError' ? 'The request timed out. Your message is still here; you can send it using your email app below.' : `${error.message} Your message is still here. You can use your email app below.`)
      }
    } finally {
      clearTimeout(timeout)
      if (requestRef.current === controller) { requestRef.current = null; setIsSubmitting(false) }
    }
  }

  const fieldProps = (name) => ({
    id: name, name, value: form[name], onChange: handleChange,
    onBlur: () => setErrors((current) => ({ ...current, [name]: validateField(name, form[name]) })),
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': name === 'message' ? 'message-help message-count' : errors[name] ? `${name}-error` : undefined,
    className: `form-control${errors[name] ? ' is-invalid' : ''}`, disabled: isSubmitting,
  })
  const fieldError = (name) => errors[name] && <div id={`${name}-error`} className="invalid-feedback">{errors[name]}</div>

  return (
    <div className="card border-0 shadow-lg">
      <div className="card-body p-4 p-lg-5">
        <h2 className="h4 mb-3">Get in touch</h2>
        <p className="text-secondary small" id="contact-method">
          {canSend ? 'Send a message directly, or use your email app.' : 'Prepare an email draft, then send it from your email app.'}
        </p>
        {notice && <div className={`alert alert-${failed ? 'danger' : 'info'}`} role={failed ? 'alert' : 'status'}>{notice}</div>}
        <form ref={formRef} className="row g-3" noValidate onSubmit={handleSubmit}
          aria-describedby="contact-method" aria-busy={isSubmitting}
          onReset={() => { if (!isSubmitting) { setForm(initialForm); setErrors({}); setNotice(''); setFailed(false) } }}>
          <div className="col-md-6">
            <label htmlFor="name" className="form-label">Your Name</label>
            <input {...fieldProps('name')} type="text" autoComplete="name" maxLength={100} placeholder="Full name" required />
            {fieldError('name')}
          </div>
          <div className="col-md-6">
            <label htmlFor="phone" className="form-label">Phone (optional)</label>
            <input {...fieldProps('phone')} type="tel" autoComplete="tel" maxLength={40} placeholder="+880..." />
            {fieldError('phone')}
          </div>
          <div className="col-md-6">
            <label htmlFor="email" className="form-label">Email Address</label>
            <input {...fieldProps('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
            {fieldError('email')}
          </div>
          <div className="col-md-6">
            <label htmlFor="subject" className="form-label">Subject</label>
            <input {...fieldProps('subject')} type="text" maxLength={150} placeholder="Project discussion" required />
            {fieldError('subject')}
          </div>
          <div className="col-12">
            <label htmlFor="message" className="form-label">Message</label>
            <textarea {...fieldProps('message')} rows={5} maxLength={500} placeholder="Write your message here..." required />
            <div className="d-flex justify-content-between mt-1 text-secondary small">
              <span id="message-help">{errors.message || 'Use 10 to 500 characters.'}</span>
              <span id="message-count">{form.message.length} / 500</span>
            </div>
          </div>
          <div className="visually-hidden" aria-hidden="true">
            <label htmlFor="website">Website</label>
            <input id="website" name="website" value={form.website} onChange={handleChange} tabIndex={-1} autoComplete="off" />
          </div>
          <div className="col-12 form-check ms-2">
            <input className={`form-check-input${errors.consent ? ' is-invalid' : ''}`} type="checkbox" id="consent" name="consent"
              checked={form.consent} onChange={handleChange} required disabled={isSubmitting}
              aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
            <label className="form-check-label" htmlFor="consent">I agree to be contacted regarding this message.</label>
            {fieldError('consent')}
          </div>
          <div className="col-12 d-flex flex-wrap gap-2 pt-2">
            <Button type="submit" loading={isSubmitting}>{canSend ? 'Send Message' : 'Prepare Email Draft'}</Button>
            <Button type="reset" variant="outline-secondary" disabled={isSubmitting}>Clear Form</Button>
            {!isSubmitting && (failed || (!canSend && notice)) && Object.keys(validateForm(form)).length === 0 && (
              <a className="btn btn-outline-primary" href={buildMailto(form, resume.email)}>Open Email App</a>
            )}
          </div>
        </form>
        <p className="small text-secondary mt-3 mb-0">You can also email <a href={`mailto:${resume.email}`}>{resume.email}</a> directly.</p>
      </div>
    </div>
  )
}

export default ContactForm
