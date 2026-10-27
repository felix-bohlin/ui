import { exampleTheme } from "./example-themes"
import type { Theme, ThemeTokens } from "./theme"

export const inlineTokens = (defaults: ThemeTokens, theme: Theme) =>
  Object.entries({
    ...defaults,
    ...exampleTheme(theme.preset)?.tokens,
    ...theme.tokens,
  })
    .map(([token, value]) => `${token}: ${value}`)
    .join("; ")
