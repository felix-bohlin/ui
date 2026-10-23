import { themeTokenDescriptions } from "./theme-token-descriptions"
import { themeTokenPromises } from "./theme-token-promises"
import { parseThemeTokens, tokenTier } from "./theme-tokens"

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const TYPES: [RegExp, string][] = [
  [
    /-(alpha-accent|alpha-dark|alpha-light|chroma|hue|hue-rotate-by|lightness|opacity|scale)$|^--ui-(density|motion|shadow-strength)$|line-height/,
    "number",
  ],
  [/^--ui-font-(body|code|heading)$/, "fontFamily"],
  [/font-weight/, "fontWeight"],
  [/^--ui-duration/, "duration"],
  [/^--ui-ease/, "cubicBezier"],
  [/shadow(?!-color$)/, "shadow"],
  [/-style$/, "strokeStyle"],
  [
    /-accent$|^(?!--ui-shadow-color$).*-color(-|$)|^--ui-(blue|critical|green|info|invalid|neutral|on|orange|palette|primary|red|selected|success|surface|text|warning)(-|$)/,
    "color",
  ],
  [
    /blur|gap|height|inset|offset|radius|size|space|spacing|step|thickness|width/,
    "dimension",
  ],
]

export const tokenType = (name: string) =>
  TYPES.find(([pattern]) => pattern.test(name))?.[1]

export const tokensJson = () =>
  Object.fromEntries(
    parseThemeTokens()
      .filter((section) => section.tokens.length > 0)
      .map((section) => [
        slug(section.title),
        Object.fromEntries(
          section.tokens.map((token) => {
            const type = tokenType(token.name)
            const modes = {
              ...(token.dark && { dark: token.dark }),
              ...(token.moreContrast &&
                token.moreContrast !== token.value && {
                  "more-contrast": token.moreContrast,
                }),
            }
            return [
              token.name.replace(/^--/, ""),
              {
                $description: themeTokenDescriptions[token.name] ?? "",
                $extensions: {
                  opui: {
                    cssVar: token.name,
                    ...(token.optional && { example: token.value }),
                    ...(Object.keys(modes).length > 0 && { modes }),
                    ...(token.optional && { optional: true }),
                    ...(themeTokenPromises[token.name] && {
                      promise: themeTokenPromises[token.name],
                    }),
                    tier: tokenTier(token.name),
                  },
                },
                ...(type && { $type: type }),
                ...(!token.optional && { $value: token.value }),
              },
            ]
          }),
        ),
      ]),
  )
