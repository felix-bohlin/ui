export const SITE_THEMES = [
  {
    description: "Blueprint grid, hairlines and square corners.",
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
    description: "Chunky borders, hard shadows and stepped motion.",
    text: "Pixel",
    value: "pixel",
  },
  {
    description: "Everything you were told never to do.",
    text: "Tasteless",
    value: "tasteless",
  },
] as const

export type SiteTheme = (typeof SITE_THEMES)[number]["value"]
