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
      "opui-character-count": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { label?: string | undefined }
      "opui-copy": DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
      "opui-number-field": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-select-all": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-sortable-table": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-text-field": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      >
      "opui-toaster": DetailedHTMLProps<
        HTMLAttributes<HTMLElement>,
        HTMLElement
      > & { duration?: number | undefined }
    }
  }
}
