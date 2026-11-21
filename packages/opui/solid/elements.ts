import type {} from "@solidjs/web/jsx-runtime"
import type { RemoveDetail, SelectDetail } from "../components/FileUpload/types"
import type { ReactionDetail } from "../components/Reactions/types"
import type { SortDetail } from "../components/SortableTable/types"

declare module "@solidjs/web/jsx-runtime" {
  namespace JSX {
    interface HTMLAttributes<T> {
      interestfor?: string | RemoveAttribute
    }

    interface IntrinsicElements {
      "opui-callout": HTMLAttributes<HTMLElement> & {
        onDismiss?: EventHandlerUnion<HTMLElement, Event>
      }
      "opui-character-count": HTMLAttributes<HTMLElement> & {
        label?: string | RemoveAttribute
      }
      "opui-copy": HTMLAttributes<HTMLElement> & {
        "copied-label"?: string | RemoveAttribute
        "failed-label"?: string | RemoveAttribute
      }
      "opui-file-upload": Omit<HTMLAttributes<HTMLElement>, "onSelect"> & {
        onRemove?: EventHandlerUnion<HTMLElement, CustomEvent<RemoveDetail>>
        onSelect?: EventHandlerUnion<HTMLElement, CustomEvent<SelectDetail>>
      }
      "opui-number-field": HTMLAttributes<HTMLElement>
      "opui-password-toggle": HTMLAttributes<HTMLElement>
      "opui-reactions": HTMLAttributes<HTMLElement> & {
        onReaction?: EventHandlerUnion<HTMLElement, CustomEvent<ReactionDetail>>
        "quick-label"?: string | RemoveAttribute
        "quick-text"?: string | RemoveAttribute
        "quick-value"?: string | RemoveAttribute
      }
      "opui-select-all": HTMLAttributes<HTMLElement>
      "opui-sortable-table": HTMLAttributes<HTMLElement> & {
        "ascending-label"?: string | RemoveAttribute
        "descending-label"?: string | RemoveAttribute
        onSort?: EventHandlerUnion<HTMLElement, CustomEvent<SortDetail>>
      }
      "opui-toaster": HTMLAttributes<HTMLElement> & {
        "close-label"?: string | RemoveAttribute
        duration?: number | RemoveAttribute
        limit?: number | RemoveAttribute
      }
    }
  }
}
