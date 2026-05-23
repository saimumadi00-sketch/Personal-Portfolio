import { useTheme } from '../context/ThemeContext'

function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="btn btn-outline-light btn-sm"
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <i className={`bi ${darkMode ? 'bi-sun' : 'bi-moon-stars'} me-1`} aria-hidden="true"></i>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeToggle
