declare module "svelte/elements" {
  interface HTMLAttributes<T extends EventTarget> {
    interestfor?: string | undefined | null
  }

  interface SvelteHTMLElements {
    "opui-character-count": HTMLAttributes<HTMLElement> & {
      label?: string | undefined | null
    }
    "opui-command": HTMLAttributes<HTMLElement> & {
      "empty-label"?: string | undefined | null
      filter?: "none" | undefined | null
    }
    "opui-copy": HTMLAttributes<HTMLElement> & {
      "copied-label"?: string | undefined | null
      "failed-label"?: string | undefined | null
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
