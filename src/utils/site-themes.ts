export const SITE_THEMES = [
  {
    description: "Warm monochrome, hairlines, sharp corners and light type.",
    text: "Architect",
    value: "architect",
  },
  {
    description: "The theme Open Props UI ships with.",
    text: "Default",
    value: "default",
  },
  {
    description: "Warm stationery, serif type and soft shadows.",
    text: "Paper",
    value: "paper",
  },
  {
    description:
      "Neobrutalist: thick outlines, hard shadows and loud flat color.",
    text: "Pixel",
    value: "pixel",
  },
  {
    description: "The shadcn/ui neutral theme, token for token.",
    text: "shadcn",
    value: "shadcn",
  },
  {
    description: "Everything you were told never to do.",
    text: "Tasteless",
    value: "tasteless",
  },
] as const

export type SiteTheme = (typeof SITE_THEMES)[number]["value"]
