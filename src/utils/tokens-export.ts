import { formatOklch, parseOklch } from "./color-utils"
import { exampleTheme } from "./example-themes"
import type { Theme } from "./theme"
import { themeTokens } from "./theme-tokens"
import { tokenType } from "./tokens-json"

export type ResolvedTokens = Record<"dark" | "light", Record<string, string>>

export const resolveTokens = (root: Element): ResolvedTokens => {
  const names = themeTokens().map((token) => token.name)
  const result: ResolvedTokens = { dark: {}, light: {} }
  for (const scheme of ["dark", "light"] as const) {
    const host = document.createElement("div")
    host.className = `ui-${scheme}`
    host.hidden = true
    host.style.color = "transparent"
    host.style.forcedColorAdjust = "none"
    const probes = names.map((name) => {
      const probe = document.createElement("div")
      if (tokenType(name) === "color") {
        probe.style.color = `oklch(from var(${name}) l c h / alpha)`
      }
      host.append(probe)
      return probe
    })
    root.append(host)
    const hostStyle = getComputedStyle(host)
    names.forEach((name, index) => {
      const probe = probes[index]
      if (tokenType(name) === "color") {
        const parsed = parseOklch(getComputedStyle(probe).color)
        result[scheme][name] = parsed
          ? formatOklch(parsed, parsed.alpha)
          : hostStyle.getPropertyValue(name).trim()
      } else {
        result[scheme][name] = hostStyle.getPropertyValue(name).trim()
      }
    })
    host.remove()
  }
  return result
}

export const tokensExport = (theme: Theme, resolved: ResolvedTokens) =>
  `${JSON.stringify(
    {
      $description:
        "opui theme tokens resolved per color scheme by the Theme builder.",
      changes: theme.tokens,
      preset: exampleTheme(theme.preset)?.label ?? "Default",
      tokens: resolved,
    },
    null,
    2,
  )}\n`
