import type { SortDetail } from "../components/SortableTable/types"

declare module "svelte/elements" {
  interface HTMLAttributes<T extends EventTarget> {
    interestfor?: string | undefined | null
  }

  interface SvelteHTMLElements {
    "opui-callout": HTMLAttributes<HTMLElement> & {
      ondismiss?: EventHandler<Event, HTMLElement> | undefined | null
    }
    "opui-character-count": HTMLAttributes<HTMLElement> & {
      label?: string | undefined | null
    }
    "opui-copy": HTMLAttributes<HTMLElement> & {
      "copied-label"?: string | undefined | null
      "failed-label"?: string | undefined | null
    }
    "opui-number-field": HTMLAttributes<HTMLElement>
    "opui-select-all": HTMLAttributes<HTMLElement>
    "opui-sortable-table": HTMLAttributes<HTMLElement> & {
      "ascending-label"?: string | undefined | null
      "descending-label"?: string | undefined | null
      onsort?:
        | EventHandler<CustomEvent<SortDetail>, HTMLElement>
        | undefined
        | null
    }
    "opui-text-field": HTMLAttributes<HTMLElement>
    "opui-toaster": HTMLAttributes<HTMLElement> & {
      "close-label"?: string | undefined | null
      duration?: number | undefined | null
      limit?: number | undefined | null
    }
  }
}
