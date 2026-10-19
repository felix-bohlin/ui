const files = import.meta.glob<string>("../../packages/opui/themes/*.css", {
  eager: true,
  import: "default",
  query: "?raw",
})

export const REFERENCE_THEMES = Object.entries(files)
  .map(([path, css]) => {
    const name = path.match(/themes\/([^/]+)\.css$/)![1]
    return {
      css,
      label: `${name[0].toUpperCase()}${name.slice(1)}`,
      name,
      tokens: Object.fromEntries(
        [...css.matchAll(/^\s*(--[\w-]+):\s*([^;]+);/gm)].map(
          ([, token, value]) => [token, value.trim()],
        ),
      ),
    }
  })
  .toSorted((a, b) => a.name.localeCompare(b.name))

export const referenceTheme = (name?: string | null) =>
  REFERENCE_THEMES.find((theme) => theme.name === name)
