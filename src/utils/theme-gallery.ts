import type { Theme } from "./theme"
import { shareUrl } from "./theme-share"

export type GalleryEntry = {
  author: string
  description: string
  id: string
  name: string
  theme: Theme
}

export const GALLERY: GalleryEntry[] = [
  {
    author: "opui",
    description: "Warm neutrals, rounded corners and a terracotta brand.",
    id: "clay",
    name: "Clay",
    theme: {
      preset: null,
      tokens: {
        "--ui-button-radius": "var(--ui-radius-round)",
        "--ui-chip-radius": "var(--ui-radius)",
        "--ui-dialog-radius": "var(--ui-radius)",
        "--ui-field-radius": "var(--ui-radius)",
        "--ui-font-body":
          '"DM Sans", Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
        "--ui-gray-chroma": "0.012",
        "--ui-gray-hue": "55",
        "--ui-menu-radius": "var(--ui-radius)",
        "--ui-palette-source": "oklch(0.6 0.14 45)",
        "--ui-primary-source":
          "light-dark(oklch(0.6 0.14 45), oklch(0.72 0.14 45))",
        "--ui-radius": "1rem",
        "--ui-radius-small": "min(5px, var(--ui-radius))",
        "--ui-radius-x-small": "min(2px, var(--ui-radius))",
      },
    },
  },
  {
    author: "opui",
    description:
      "A dense, square, high-contrast console look on the brutalist preset.",
    id: "console",
    name: "Console",
    theme: {
      preset: "brutalist",
      tokens: {
        "--ui-density": "0.875",
        "--ui-font-body":
          "Geist, Inter, Roboto, Helvetica Neue, Arial Nova, Nimbus Sans, Arial, sans-serif",
        "--ui-palette-source": "oklch(0.62 0.18 150)",
        "--ui-primary-source":
          "light-dark(oklch(0.52 0.18 150), oklch(0.78 0.18 150))",
      },
    },
  },
  {
    author: "opui",
    description: "Material surfaces with a violet brand and soft shadows.",
    id: "orchid",
    name: "Orchid",
    theme: {
      preset: "m3",
      tokens: {
        "--ui-gray-chroma": "0.012",
        "--ui-gray-hue": "300",
        "--ui-palette-source": "oklch(0.56 0.19 306)",
        "--ui-primary-source":
          "light-dark(oklch(0.56 0.19 306), oklch(0.74 0.16 306))",
      },
    },
  },
  {
    author: "opui",
    description:
      "Serif headings, loose underlines and no shadows for long reading.",
    id: "paper",
    name: "Paper",
    theme: {
      preset: null,
      tokens: {
        "--ui-button-hover-shadow": "none",
        "--ui-button-hover-translate": "revert-layer",
        "--ui-font-heading":
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        "--ui-gray-chroma": "0.012",
        "--ui-gray-hue": "70",
        "--ui-line-height": "1.6",
        "--ui-line-height-relaxed": "1.75",
        "--ui-palette-source": "oklch(0.5 0.1 60)",
        "--ui-primary-source":
          "light-dark(oklch(0.5 0.1 60), oklch(0.76 0.1 60))",
        "--ui-radius": "0.25rem",
        "--ui-shadow-control": "none",
        "--ui-shadow-elevated": "none",
        "--ui-shadow-field": "none",
        "--ui-shadow-overlay": "none",
        "--ui-shadow-scroll": "none",
        "--ui-shadow-selected": "none",
        "--ui-shadow-surface": "none",
        "--ui-underline-offset": "4px",
        "--ui-underline-thickness-hover": "1px",
      },
    },
  },
  {
    author: "opui",
    description: "Cool slate grays and a deep blue brand on the shadcn preset.",
    id: "slate",
    name: "Slate",
    theme: {
      preset: "shadcn",
      tokens: {
        "--ui-gray-chroma": "0.012",
        "--ui-gray-hue": "250",
        "--ui-palette-source": "oklch(0.55 0.19 262)",
        "--ui-primary-source":
          "light-dark(oklch(0.55 0.19 262), oklch(0.74 0.15 262))",
      },
    },
  },
]

export const galleryUrl = (entry: GalleryEntry, base: string) =>
  shareUrl(entry.theme, base)
