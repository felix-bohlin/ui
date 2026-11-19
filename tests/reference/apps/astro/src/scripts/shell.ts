const KEY = "reference-theme"

const savedTheme = () => {
  try {
    return localStorage.getItem(KEY)
  } catch {
    return null
  }
}

const applySavedTheme = () => {
  const theme = savedTheme()
  if (theme) document.documentElement.dataset.theme = theme
}

const setTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem(KEY, theme)
  } catch {}
}

applySavedTheme()

document.addEventListener("astro:after-swap", applySavedTheme)

document.addEventListener("astro:page-load", () => {
  document.documentElement.dataset.hydrated = ""
})

document.addEventListener("click", (event) => {
  const choice = (event.target as Element).closest<HTMLElement>(
    "[data-theme-choice]",
  )
  if (choice?.dataset.themeChoice) setTheme(choice.dataset.themeChoice)
})
