import { Component } from 'react'

export default class PageErrorBoundary extends Component {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    if (!this.state.failed) return this.props.children
    return (
      <section className="container py-5" role="alert">
        <h1 className="h3">This page could not load</h1>
        <p>Please check your connection and reload. You can also email <a href="mailto:saimumadi00@gmail.com">saimumadi00@gmail.com</a>.</p>
        <button className="btn btn-primary" type="button" onClick={() => window.location.reload()}>Reload page</button>
      </section>
    )
  }
}
