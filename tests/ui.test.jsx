import test, { beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { JSDOM } from 'jsdom'
import { act } from 'react'
import { MemoryRouter } from 'react-router-dom'
import ContactForm from '../src/components/ContactForm.jsx'
import Navbar from '../src/components/Navbar.jsx'

const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', { url: 'https://saimum-aditto.vercel.app', pretendToBeVisual: true })
const queries = new Map()
Object.assign(globalThis, { window: dom.window, document: dom.window.document, HTMLElement: dom.window.HTMLElement,
  requestAnimationFrame: dom.window.requestAnimationFrame.bind(dom.window), cancelAnimationFrame: dom.window.cancelAnimationFrame.bind(dom.window), IS_REACT_ACT_ENVIRONMENT: true })
window.scrollTo = () => {}
window.matchMedia = (query) => {
  if (!queries.has(query)) {
    const listeners = new Set()
    queries.set(query, { matches: false, addEventListener: (_, fn) => listeners.add(fn), removeEventListener: (_, fn) => listeners.delete(fn), emit(matches) { this.matches = matches; for (const fn of listeners) fn() } })
  }
  return queries.get(query)
}
const { createRoot } = await import('react-dom/client')
let root
beforeEach(() => { root = createRoot(document.getElementById('root')); globalThis.fetch = async () => ({ ok: true, json: async () => ({ configured: false }) }) })
afterEach(async () => { await act(async () => root.unmount()); queries.clear(); document.body.style.overflow = '' })
const mount = async (component) => act(async () => { root.render(component) })
const click = async (selector) => act(async () => document.querySelector(selector).click())
async function type(selector, value) {
  const element = document.querySelector(selector)
  const prototype = element instanceof window.HTMLTextAreaElement ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype
  await act(async () => { Object.getOwnPropertyDescriptor(prototype, 'value').set.call(element, value); element.dispatchEvent(new window.Event('input', { bubbles: true })) })
}
async function completeForm() {
  await type('#name', 'Test Visitor'); await type('#email', 'visitor@example.com'); await type('#subject', 'Project discussion')
  await type('#message', 'Hello, I would like to discuss a project.'); await click('#consent')
}
const submit = async () => act(async () => document.querySelector('form').dispatchEvent(new window.Event('submit', { bubbles: true, cancelable: true })))

test('contact preserves typed spaces, focuses errors, and exposes error descriptions', async () => {
  await mount(<ContactForm />); await type('#name', 'Test Visitor')
  assert.equal(document.querySelector('#name').value, 'Test Visitor')
  await submit()
  const email = document.querySelector('#email')
  assert.equal(document.activeElement, email); assert.equal(email.getAttribute('aria-invalid'), 'true')
  assert.equal(email.getAttribute('aria-describedby'), 'email-error'); assert.ok(document.querySelector('#email-error').textContent)
})
test('unconfigured contact prepares a draft and retains the message', async () => {
  await mount(<ContactForm />); await completeForm(); await submit()
  assert.match(document.querySelector('[role="status"]').textContent, /draft is ready/)
  assert.equal(document.querySelector('#name').value, 'Test Visitor')
  const draft = document.querySelector('a[href^="mailto:"][class]')
  assert.ok(draft); assert.match(new URL(draft.href).searchParams.get('body'), /Test Visitor/)
  assert.doesNotMatch(document.body.textContent, /Message sent|Message received/)
})
test('provider failure retains a draft and offers email fallback', async () => {
  globalThis.fetch = async (_, options) => ({ ok: !options?.method, json: async () => options?.method ? { error: 'Delivery failed.' } : { configured: true } })
  await mount(<ContactForm />); await completeForm(); await submit()
  assert.match(document.querySelector('[role="alert"]').textContent, /Delivery failed/)
  assert.equal(document.querySelector('#message').value, 'Hello, I would like to discuss a project.')
  assert.ok(document.querySelector('a[href^="mailto:"][class]'))
})
test('only accepted provider responses clear the form', async () => {
  globalThis.fetch = async (_, options) => ({ ok: true, json: async () => options?.method ? { accepted: true } : { configured: true } })
  await mount(<ContactForm />); await completeForm(); await submit()
  assert.match(document.querySelector('[role="status"]').textContent, /Message submitted/)
  assert.equal(document.querySelector('#message').value, '')
})
test('closed mobile navigation is inert; Escape restores toggle focus and scrolling', async () => {
  await mount(<MemoryRouter><Navbar /></MemoryRouter>)
  assert.ok(document.querySelector('#mobileMenu').hasAttribute('inert'))
  await click('.nav-hamburger'); await act(async () => new Promise((resolve) => setTimeout(resolve, 25)))
  assert.ok(!document.querySelector('#mobileMenu').hasAttribute('inert'))
  assert.equal(document.activeElement, document.querySelector('#mobileMenu a'))
  assert.equal(document.body.style.overflow, 'hidden')
  await act(async () => document.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true })))
  assert.equal(document.activeElement, document.querySelector('.nav-hamburger'))
  assert.equal(document.body.style.overflow, '')
})
test('resizing to desktop closes the mobile menu and releases scroll lock', async () => {
  await mount(<MemoryRouter><Navbar /></MemoryRouter>); await click('.nav-hamburger')
  await act(async () => queries.get('(min-width: 992px)').emit(true))
  assert.ok(document.querySelector('#mobileMenu').hasAttribute('inert')); assert.equal(document.body.style.overflow, '')
})
