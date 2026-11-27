import type { Theme } from "./theme"
import { shareUrl } from "./theme-share"

type GalleryEntry = {
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
        "--ui-font-family-body":
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
        "--ui-font-family-body":
          "Geist, Inter, Roboto, Helvetica Neue, Arial Nova, Nimbus Sans, Arial, sans-serif",
        "--ui-palette-source": "oklch(0.62 0.18 150)",
        "--ui-primary-source":
          "light-dark(oklch(0.52 0.18 150), oklch(0.78 0.18 150))",
      },
    },
  },
  {
    author: "opui",
    description:
      "Sunset pinks on deep violet night surfaces, a peach call to action, pill buttons and a soft pink glow.",
    id: "dusk",
    name: "Dusk",
    theme: {
      preset: null,
      tokens: {
        "--ui-button-accent-filled":
          "light-dark(oklch(0.84 0.09 60), oklch(0.88 0.07 70))",
        "--ui-button-on-accent-filled": "oklch(0.24 0.05 300)",
        "--ui-button-radius": "var(--ui-radius-round)",
        "--ui-chip-radius": "var(--ui-radius-round)",
        "--ui-dialog-radius": "var(--ui-radius)",
        "--ui-field-radius": "var(--ui-radius)",
        "--ui-font-family-body":
          'Figtree, "DM Sans", Avenir, Montserrat, Corbel, URW Gothic, source-sans-pro, sans-serif',
        "--ui-gray-chroma": "0.04",
        "--ui-gray-hue": "295",
        "--ui-menu-radius": "var(--ui-radius)",
        "--ui-palette-source": "oklch(0.62 0.15 335)",
        "--ui-primary-source":
          "light-dark(oklch(0.52 0.17 340), oklch(0.86 0.07 355))",
        "--ui-radius": "1rem",
        "--ui-radius-small": "min(0.5rem, var(--ui-radius))",
        "--ui-radius-x-small": "min(0.25rem, var(--ui-radius))",
        "--ui-shadow-color":
          "light-dark(oklch(0.55 0.18 340 / 12%), oklch(0.05 0.04 300 / 60%))",
        "--ui-surface":
          "light-dark(oklch(0.97 0.015 330), oklch(0.21 0.035 290))",
        "--ui-surface-raised":
          "light-dark(oklch(1 0 0), oklch(0.26 0.045 292))",
        "--ui-surface-tonal":
          "light-dark(oklch(0.93 0.035 330), oklch(0.32 0.06 300))",
        "--ui-text-strong":
          "light-dark(oklch(0.22 0.07 300), oklch(0.97 0.02 320))",
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
        "--ui-field-shadow": "none",
        "--ui-font-family-heading":
          'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
        "--ui-gray-chroma": "0.012",
        "--ui-gray-hue": "70",
        "--ui-line-height-compact": "1.5",
        "--ui-line-height-body": "1.75",
        "--ui-palette-source": "oklch(0.5 0.1 60)",
        "--ui-primary-source":
          "light-dark(oklch(0.5 0.1 60), oklch(0.76 0.1 60))",
        "--ui-radius": "0.25rem",
        "--ui-shadow-control": "none",
        "--ui-shadow-elevated": "none",
        "--ui-shadow-overlay": "none",
        "--ui-shadow-scroll": "none",
        "--ui-shadow-selected": "none",
        "--ui-shadow-surface": "none",
        "--ui-underline-offset": "4px",
        "--ui-underline-hover-thickness": "1px",
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
