const setTheme = (theme: string) => {
  document.documentElement.dataset.theme = theme
  try {
    localStorage.setItem("reference-theme", theme)
  } catch {}
}

document.addEventListener("astro:page-load", () => {
  document.documentElement.dataset.hydrated = ""
})

document.addEventListener("click", (event) => {
  const choice = (event.target as Element).closest<HTMLElement>(
    "[data-theme-choice]",
  )
  if (choice?.dataset.themeChoice) setTheme(choice.dataset.themeChoice)
})
