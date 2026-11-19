import type {} from "react"

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: number | string | undefined
  }

  interface HTMLAttributes<T> {
    command?: string | undefined
    commandfor?: string | undefined
    interestfor?: string | undefined
  }

  namespace JSX {
    interface IntrinsicElements {
      "opui-callout": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-character-count": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { label?: string | undefined }
      "opui-copy": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "copied-label"?: string | undefined
        "failed-label"?: string | undefined
      }
      "opui-file-upload": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-number-field": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-reactions": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "quick-label"?: string | undefined
        "quick-text"?: string | undefined
        "quick-value"?: string | undefined
      }
      "opui-select-all": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-sortable-table": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "ascending-label"?: string | undefined
        "descending-label"?: string | undefined
      }
      "opui-text-field": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-toaster": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "close-label"?: string | undefined
        duration?: number | undefined
        limit?: number | undefined
      }
    }
  }
}
