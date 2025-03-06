export default function useUi() {
  // Functions
  const preferredTheme = (): string => {
    const theme = storedTheme()
    if (theme) {
      return theme
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  const storedTheme = (): string | null => {
    return localStorage.getItem('theme')
  }  
  const setTheme = (theme: string): void => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }
  return {
    preferredTheme,
    setTheme,
    storedTheme
  }
}