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
    /-(alpha-accent|alpha-dark|alpha-light|chroma|hue|hue-rotate-by|lightness|opacity|scale|strength|strength-dark|strength-light)$|^--ui-(density|fluid-progress|motion)$|line-height/,
    "number",
  ],
  [/^--ui-font-(body|code|heading)$/, "fontFamily"],
  [/font-weight/, "fontWeight"],
  [/^--ui-duration/, "duration"],
  [/^--ui-ease/, "cubicBezier"],
  [/shadow(?!-color$)/, "shadow"],
  [/-style$/, "strokeStyle"],
  [
    /-accent(-|$)|^(?!--ui-color-scheme$).*-color(-|$)|^--ui-(blue|critical|green|info|invalid|neutral|on|orange|palette|primary|red|selected|success|surface|text|warning)(-|$)/,
    "color",
  ],
  [
    /blur|gap|height|inset|offset|padding|radius|size|space|spacing|step|thickness|width/,
    "dimension",
  ],
]

export const tokenType = (name: string) =>
  TYPES.find(([pattern]) => pattern.test(name))?.[1]

const NUMBER = /^-?\d*\.?\d+$/
const LENGTH = /^(-?\d*\.?\d+)(px|rem)$/
const ALIAS = /^var\((--ui-[\w-]+)\)$/

export const tokenValue = (
  value: string,
  type: string | undefined,
  paths: Map<string, string>,
) => {
  if (type === "number" && NUMBER.test(value)) return Number(value)
  const length = type === "dimension" ? value.match(LENGTH) : null
  if (length) return { unit: length[2], value: Number(length[1]) }
  const alias = value.match(ALIAS)
  if (alias && paths.has(alias[1])) return `{${paths.get(alias[1])}}`
  return value
}

export const tokensJson = () => {
  const sections = parseThemeTokens().filter(
    (section) => section.tokens.length > 0,
  )
  const paths = new Map(
    sections.flatMap((section) =>
      section.tokens.map((token) => [
        token.name,
        `${slug(section.title)}.${token.name.replace(/^--/, "")}`,
      ]),
    ),
  )
  return Object.fromEntries(
    sections.map((section) => [
      slug(section.title),
      Object.fromEntries(
        section.tokens.map((token) => {
          const type = tokenType(token.name)
          const value = tokenValue(token.value, type, paths)
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
                  ...(!token.optional &&
                    value !== token.value && { css: token.value }),
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
              ...(!token.optional && { $value: value }),
            },
          ]
        }),
      ),
    ]),
  )
}
