declare module "svelte/elements" {
  interface HTMLAttributes<T extends EventTarget> {
    interestfor?: string | undefined | null
  }

  interface SvelteHTMLElements {
    "opui-character-count": HTMLAttributes<HTMLElement> & {
      label?: string | undefined | null
    }
    "opui-color-field": HTMLAttributes<HTMLElement> & {
      "blackness-label"?: string | undefined | null
      "blue-label"?: string | undefined | null
      "chroma-label"?: string | undefined | null
      "contrast-label"?: string | undefined | null
      "copied-label"?: string | undefined | null
      "green-label"?: string | undefined | null
      "hue-label"?: string | undefined | null
      "invalid-text"?: string | undefined | null
      "lightness-label"?: string | undefined | null
      "p3-text"?: string | undefined | null
      "red-label"?: string | undefined | null
      "saturation-label"?: string | undefined | null
      "srgb-text"?: string | undefined | null
      "whiteness-label"?: string | undefined | null
      "wide-text"?: string | undefined | null
    }
    "opui-copy": HTMLAttributes<HTMLElement> & {
      "copied-label"?: string | undefined | null
    }
    "opui-number-field": HTMLAttributes<HTMLElement>
    "opui-select-all": HTMLAttributes<HTMLElement>
    "opui-sortable-table": HTMLAttributes<HTMLElement>
    "opui-text-field": HTMLAttributes<HTMLElement>
    "opui-toaster": HTMLAttributes<HTMLElement> & {
      "close-label"?: string | undefined | null
      duration?: number | undefined | null
    }
  }
}

export {}
