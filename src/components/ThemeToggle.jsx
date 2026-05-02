function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      type="button"
      className="btn btn-outline-light btn-sm"
      onClick={onToggle}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}

export default ThemeToggle
