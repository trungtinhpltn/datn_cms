import useThemeContext from 'contexts/theme'

export interface IDarkModeSwitcherProps {}

export default function DarkModeSwitcher(props: IDarkModeSwitcherProps) {
  const { darkMode, setDarkMode } = useThemeContext()

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div
      data-url="side-menu-dark-dashboard-overview-2.html"
      className="dark-mode-switcher box fixed bottom-0 right-0 z-50 mb-10 mr-10 flex h-12 w-40 cursor-pointer items-center justify-center rounded-full border shadow-md"
    >
      <div className="mr-4 text-slate-600 dark:text-slate-200">Dark Mode</div>
      <div
        onClick={toggleDarkMode}
        className={`dark-mode-switcher__toggle border ${
          darkMode ? 'dark-mode-switcher__toggle--active' : null
        }`}
      />
    </div>
  )
}
