declare module "svelte/elements" {
  interface HTMLAttributes<T extends EventTarget> {
    interestfor?: string | undefined | null
  }

  interface SvelteHTMLElements {
    "opui-character-count": HTMLAttributes<HTMLElement> & {
      label?: string | undefined | null
    }
    "opui-color-field": HTMLAttributes<HTMLElement> & {
      "invalid-text"?: string | undefined | null
      "p3-text"?: string | undefined | null
      "srgb-text"?: string | undefined | null
      "wide-text"?: string | undefined | null
    }
    "opui-copy": HTMLAttributes<HTMLElement> & {
      "copied-label"?: string | undefined | null
    }
    "opui-number-stepper": HTMLAttributes<HTMLElement>
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
