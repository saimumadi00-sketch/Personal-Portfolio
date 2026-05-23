import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ScrollReveal from '../components/ScrollReveal'
import SectionToggle from '../components/SectionToggle'
import SEOHead from '../components/SEOHead'
import Timeline from '../components/Timeline'
import timelineData from '../data/timeline'
import { pageVariants } from '../utils/variants'

function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <SEOHead title="About" />
      <PageHeader
        title="About Me"
        subtitle="The person behind the code"
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About' },
        ]}
      />

      <div className="container py-5">
        <div className="row g-4">
          <div className="col-lg-8">
            <ScrollReveal direction="left">
              <div className="card border-0 shadow-lg mb-4 hover-card">
                <div className="row g-0">
                  <div className="col-md-4 bg-primary-subtle d-flex align-items-center justify-content-center">
                    <div className="text-center p-4">
                      <div className="profile-avatar rounded-circle bg-primary text-white fw-bold d-inline-flex align-items-center justify-content-center mb-3">
                        SM
                      </div>
                      <p className="small text-secondary mb-0">North South University</p>
                    </div>
                  </div>
                  <div className="col-md-8">
                    <div className="card-body p-4">
                      <h2 className="h3 card-title mb-2">About Me</h2>
                      <p className="text-secondary">
                        I am Md Saimum Al Mahmud, a final-year Computer Science student in Dhaka, Bangladesh. I enjoy
                        building web products that are simple, functional, and user-friendly.
                      </p>
                      <div className="mb-3">
                        <span className="badge text-bg-primary me-1 mb-1">Web Development</span>
                        <span className="badge text-bg-success me-1 mb-1">Problem Solving</span>
                        <span className="badge text-bg-secondary me-1 mb-1">Clean Code</span>
                        <span className="badge text-bg-warning mb-1">Continuous Learning</span>
                      </div>
                      <div className="d-flex flex-wrap gap-2">
                        <Link className="btn btn-primary" to="/projects">
                          See My Work
                        </Link>
                        <Link className="btn btn-outline-secondary" to="/contact">
                          Contact
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up">
              <div className="alert alert-success border-0 shadow-sm">
                I believe strong software should be both technically solid and easy for people to use.
              </div>
            </ScrollReveal>

            <SectionToggle title="Personal Details" defaultVisible={true}>
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body p-4">
                  <div className="table-responsive">
                    <table className="table table-striped table-hover align-middle mb-0">
                      <thead className="table-dark">
                        <tr>
                          <th scope="col">Field</th>
                          <th scope="col">Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Full Name</td>
                          <td>Md Saimum Al Mahmud</td>
                        </tr>
                        <tr>
                          <td>Location</td>
                          <td>Dhaka, Bangladesh</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>Available on request</td>
                        </tr>
                        <tr>
                          <td>University</td>
                          <td>North South University</td>
                        </tr>
                        <tr>
                          <td>Major</td>
                          <td>Computer Science</td>
                        </tr>
                        <tr>
                          <td>Year</td>
                          <td>4th Year</td>
                        </tr>
                        <tr>
                          <td>Interests</td>
                          <td>Web Development, UI Design, Software Engineering</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </SectionToggle>

            <section className="mt-5">
              <h2 className="h4 mb-4">My Journey</h2>
              <Timeline items={timelineData} />
            </section>
          </div>

          <div className="col-lg-4">
            <ScrollReveal direction="right">
              <div className="card border-0 shadow-sm mb-4 hover-card">
                <div className="card-body">
                  <h2 className="h5 mb-3">Education</h2>
                  <p className="fw-semibold mb-1">North South University</p>
                  <p className="text-secondary mb-3">B.Sc. in Computer Science (Ongoing)</p>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item px-0">Data Structures and Algorithms</li>
                    <li className="list-group-item px-0">Web Technologies</li>
                    <li className="list-group-item px-0">Database Systems</li>
                    <li className="list-group-item px-0">Software Engineering</li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1}>
              <div className="card border-0 shadow-sm hover-card">
                <div className="card-body">
                  <h2 className="h5 mb-3">Interests</h2>
                  {['Frontend Architecture', 'Responsive UI', 'Developer Tools', 'Open Source'].map((interest) => (
                    <span className="badge rounded-pill text-bg-light border text-dark mb-2 me-1" key={interest}>
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default About
