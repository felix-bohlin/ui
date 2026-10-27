export type WebFont = {
  category: "mono" | "sans" | "serif"
  family: string
  id: string
}

export const FONTSOURCE_CDN = "https://cdn.jsdelivr.net/fontsource/css"

export const FONT_WEIGHTS = [400, 500, 600, 700]

export const WEB_FONTS: WebFont[] = [
  { category: "serif", family: "Crimson Pro", id: "crimson-pro" },
  { category: "sans", family: "DM Sans", id: "dm-sans" },
  { category: "serif", family: "EB Garamond", id: "eb-garamond" },
  { category: "sans", family: "Figtree", id: "figtree" },
  { category: "mono", family: "Fira Code", id: "fira-code" },
  { category: "sans", family: "Fira Sans", id: "fira-sans" },
  { category: "serif", family: "Fraunces", id: "fraunces" },
  { category: "sans", family: "Geist", id: "geist" },
  { category: "mono", family: "IBM Plex Mono", id: "ibm-plex-mono" },
  { category: "sans", family: "IBM Plex Sans", id: "ibm-plex-sans" },
  { category: "sans", family: "Instrument Sans", id: "instrument-sans" },
  { category: "sans", family: "Inter", id: "inter" },
  { category: "mono", family: "JetBrains Mono", id: "jetbrains-mono" },
  { category: "sans", family: "Lato", id: "lato" },
  { category: "serif", family: "Libre Baskerville", id: "libre-baskerville" },
  { category: "serif", family: "Lora", id: "lora" },
  { category: "sans", family: "Manrope", id: "manrope" },
  { category: "serif", family: "Merriweather", id: "merriweather" },
  { category: "sans", family: "Montserrat", id: "montserrat" },
  { category: "sans", family: "Nunito", id: "nunito" },
  { category: "sans", family: "Open Sans", id: "open-sans" },
  { category: "sans", family: "Outfit", id: "outfit" },
  { category: "serif", family: "Playfair Display", id: "playfair-display" },
  { category: "sans", family: "Plus Jakarta Sans", id: "plus-jakarta-sans" },
  { category: "sans", family: "Poppins", id: "poppins" },
  { category: "sans", family: "Public Sans", id: "public-sans" },
  { category: "sans", family: "Raleway", id: "raleway" },
  { category: "sans", family: "Roboto", id: "roboto" },
  { category: "sans", family: "Rubik", id: "rubik" },
  { category: "mono", family: "Source Code Pro", id: "source-code-pro" },
  { category: "sans", family: "Source Sans 3", id: "source-sans-3" },
  { category: "serif", family: "Source Serif 4", id: "source-serif-4" },
  { category: "sans", family: "Space Grotesk", id: "space-grotesk" },
  { category: "sans", family: "Work Sans", id: "work-sans" },
]

export const BUNDLED_FONTS = ["dm-sans", "geist", "roboto"]

const FALLBACKS = {
  mono: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
  sans: "Inter, Roboto, Helvetica Neue, Arial Nova, Nimbus Sans, Arial, sans-serif",
  serif: 'Georgia, Cambria, "Times New Roman", Times, serif',
}

const quote = (family: string) =>
  /[^\w-]/.test(family) ? `"${family}"` : family

export const fontStack = (font: WebFont) =>
  `${quote(font.family)}, ${FALLBACKS[font.category]}`

export const firstFamily = (stack: string | undefined) =>
  stack
    ?.split(",")[0]
    .trim()
    .replace(/^["']|["']$/g, "") ?? ""

export const webFontOf = (stack: string | undefined) => {
  const family = firstFamily(stack).toLowerCase()
  return WEB_FONTS.find((font) => font.family.toLowerCase() === family)
}

export const fontCssUrls = (id: string) =>
  FONT_WEIGHTS.map((weight) => `${FONTSOURCE_CDN}/${id}@latest/${weight}.css`)

export const webFontIds = (stacks: (string | undefined)[]) =>
  [
    ...new Set(
      stacks.map(webFontOf).flatMap((font) => (font ? [font.id] : [])),
    ),
  ].toSorted()

export const fontImports = (ids: string[]) =>
  ids
    .flatMap((id) => fontCssUrls(id))
    .map((url) => `@import url("${url}");`)
    .join("\n")
