import { themeTokenDescriptions } from "./theme-token-descriptions"
import { themeTokenPromises } from "./theme-token-promises"
import { parseThemeTokens, tokenTier } from "./theme-tokens"

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const tokensJson = () =>
  Object.fromEntries(
    parseThemeTokens()
      .filter((section) => section.tokens.length > 0)
      .map((section) => [
        slug(section.title),
        Object.fromEntries(
          section.tokens.map((token) => [
            token.name.replace(/^--/, ""),
            {
              $description: themeTokenDescriptions[token.name] ?? "",
              $extensions: {
                opui: {
                  cssVar: token.name,
                  ...(token.dark && { dark: token.dark }),
                  ...(token.optional && { optional: true }),
                  ...(themeTokenPromises[token.name] && {
                    promise: themeTokenPromises[token.name],
                  }),
                  tier: tokenTier(token.name),
                },
              },
              $value: token.value,
            },
          ]),
        ),
      ]),
  )
