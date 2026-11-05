import type {} from "@solidjs/web/jsx-runtime"
import type { SortDetail } from "../components/SortableTable/types"

declare module "@solidjs/web/jsx-runtime" {
  namespace JSX {
    interface HTMLAttributes<T> {
      interestfor?: string | RemoveAttribute
    }

    interface IntrinsicElements {
      "opui-character-count": HTMLAttributes<HTMLElement> & {
        label?: string | RemoveAttribute
      }
      "opui-copy": HTMLAttributes<HTMLElement> & {
        "copied-label"?: string | RemoveAttribute
        "failed-label"?: string | RemoveAttribute
      }
      "opui-number-field": HTMLAttributes<HTMLElement>
      "opui-select-all": HTMLAttributes<HTMLElement>
      "opui-sortable-table": HTMLAttributes<HTMLElement> & {
        "ascending-label"?: string | RemoveAttribute
        "descending-label"?: string | RemoveAttribute
        onSort?: EventHandlerUnion<HTMLElement, CustomEvent<SortDetail>>
      }
      "opui-text-field": HTMLAttributes<HTMLElement>
      "opui-toaster": HTMLAttributes<HTMLElement> & {
        "close-label"?: string | RemoveAttribute
        duration?: number | RemoveAttribute
      }
    }
  }
}
