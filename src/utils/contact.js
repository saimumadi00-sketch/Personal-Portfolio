export const initialForm = { name: '', phone: '', email: '', subject: '', message: '', consent: false, website: '' }

export function validateField(name, value) {
  const text = typeof value === 'string' ? value.trim() : ''
  if (name === 'name' && (text.length < 2 || text.length > 100)) return 'Use 2 to 100 characters for your name.'
  if (name === 'email' && (text.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text))) return 'Enter a valid email address.'
  if (name === 'subject' && (text.length < 1 || text.length > 150)) return 'Use 1 to 150 characters for the subject.'
  if (name === 'message' && (text.length < 10 || text.length > 500)) return 'Use 10 to 500 characters for your message.'
  if (name === 'phone' && text.length > 40) return 'Phone number cannot exceed 40 characters.'
  if (name === 'consent' && value !== true) return 'Please agree to be contacted.'
  return ''
}

export function validateForm(form) {
  return Object.keys(initialForm).reduce((errors, name) => {
    const error = validateField(name, form[name])
    if (error) errors[name] = error
    return errors
  }, {})
}

export function normalizeForm(form) {
  return Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === 'string' ? value.trim() : value]))
}

export function buildMailto(form, recipient) {
  const data = normalizeForm(form)
  const body = `${data.message}\n\nFrom: ${data.name}\nEmail: ${data.email}${data.phone ? `\nPhone: ${data.phone}` : ''}`
  return `mailto:${recipient}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`
}
