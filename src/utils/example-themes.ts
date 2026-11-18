const files = import.meta.glob<string>("../../packages/opui/themes/*.css", {
  eager: true,
  import: "default",
  query: "?raw",
})

const LABELS = new Map([["govuk", "GOV.UK"]])

export const EXAMPLE_THEMES = Object.entries(files)
  .map(([path, css]) => {
    const name = path.match(/themes\/([^/]+)\.css$/)![1]
    const tokens = Object.fromEntries(
      [
        ...(css.match(/:where\(html[^)]*\)\s*\{([^}]*)\}/)?.[1] ?? "").matchAll(
          /^\s*(--[\w-]+):\s*([^;]+);/gm,
        ),
      ].map(([, token, value]) => [
        token,
        value
          .replace(/\s+/g, " ")
          .replace(/\(\s/g, "(")
          .replace(/\s\)/g, ")")
          .trim(),
      ]),
    )
    return {
      css,
      label: LABELS.get(name) ?? `${name[0].toUpperCase()}${name.slice(1)}`,
      name,
      tokens,
    }
  })
  .toSorted((a, b) => a.name.localeCompare(b.name))

export const exampleTheme = (name?: string | null) =>
  EXAMPLE_THEMES.find((theme) => theme.name === name)
