import { createContext, useContext, useEffect, useState } from 'react'

export const THEME_KEY = 'theme:darkMode'

export const ThemeContext = createContext<{
  darkMode?: boolean
  setDarkMode: (isDarkMode: boolean) => void
}>({
  setDarkMode: function (): void {
    throw new Error('Function not implemented.')
  }
})

export const useThemeContext = () => useContext(ThemeContext)

export const ThemeProvider = ({ children }: React.PropsWithChildren) => {
  const [darkMode, _setDarkMode] = useState<boolean>()

  const setDarkMode = (isDarkMode: boolean) => {
    _setDarkMode(isDarkMode)
    localStorage.setItem(THEME_KEY, isDarkMode ? '1' : '0')
    document.documentElement.classList.remove('dark', 'light')
    document.documentElement.classList.add(isDarkMode ? 'dark' : 'light')
  }

  useEffect(() => {
    const isDark = localStorage.getItem(THEME_KEY) === '1'
    setDarkMode(isDark)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        setDarkMode
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export default useThemeContext
