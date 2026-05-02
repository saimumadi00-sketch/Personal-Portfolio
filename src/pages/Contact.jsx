import ContactForm from '../components/ContactForm'

function Contact({ onToast }) {
  return (
    <div className="container">
      <section className="mb-4">
        <h1 className="display-6 fw-semibold mb-2">Contact Me</h1>
        <p className="text-secondary mb-0">Reach out for collaboration, internship opportunities, or project discussions.</p>
      </section>

      <section>
        <div className="row g-4">
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm h-100 hover-card">
              <div className="card-body p-4">
                <h2 className="h5 mb-3">Contact Information</h2>
                <div className="alert alert-light border mb-3">I usually respond within 24 to 48 hours.</div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item px-0"><strong>Name:</strong> Md Saimum Al Mahmud</li>
                  <li className="list-group-item px-0"><strong>Location:</strong> Dhaka, Bangladesh</li>
                  <li className="list-group-item px-0"><strong>University:</strong> North South University</li>
                  <li className="list-group-item px-0">
                    <strong>GitHub:</strong>{' '}
                    <a href="https://github.com/saimumadi00-sketch" className="link-primary">
                      github.com/saimumadi00-sketch
                    </a>
                  </li>
                  <li className="list-group-item px-0">
                    <strong>LinkedIn:</strong> <a href="https://linkedin.com/in/saimum" className="link-primary">linkedin.com/in/saimum</a>
                  </li>
                </ul>
                <div className="mt-3">
                  <span className="badge text-bg-primary me-1">Open to Work</span>
                  <span className="badge text-bg-success">Student Developer</span>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-7">
            <ContactForm onSuccess={() => onToast('Message sent!', 'success')} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
