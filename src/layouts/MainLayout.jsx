import BackToTop from '../components/BackToTop'
import Navbar from '../components/Navbar'
import Toast from '../components/Toast'

function MainLayout({ darkMode, onThemeToggle, toasts, children }) {
  return (
    <div className={darkMode ? 'site-shell site-shell-dark' : 'site-shell site-shell-light'}>
      <Navbar darkMode={darkMode} onThemeToggle={onThemeToggle} />
      <main className="py-5">{children}</main>
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0 small">&copy; 2026 Md Saimum Al Mahmud. All rights reserved.</p>
        </div>
      </footer>
      <BackToTop />
      <Toast toasts={toasts} />
    </div>
  )
}

export default MainLayout
