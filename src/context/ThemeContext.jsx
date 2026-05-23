/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ThemeContext = createContext({
  darkMode: false,
  toggleTheme: () => {},
})

function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage('theme', 'light')
  const darkMode = theme === 'dark'

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggleTheme = () => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return <ThemeContext.Provider value={{ darkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
export default ThemeProvider
