import { useEffect, useState } from 'react'

function getInitialValue(key, defaultValue) {
  try {
    const item = window.localStorage.getItem(key)
    if (item === null) return defaultValue

    try {
      return JSON.parse(item)
    } catch {
      return typeof defaultValue === 'string' ? item : defaultValue
    }
  } catch {
    return defaultValue
  }
}

function useLocalStorage(key, defaultValue) {
  const [storedValue, setStoredValue] = useState(() => getInitialValue(key, defaultValue))

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
    } catch {
      // Ignore storage errors so UI state can still update in restricted browsers.
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}

export default useLocalStorage
