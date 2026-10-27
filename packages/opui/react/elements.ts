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
      "opui-number-stepper": DetailedHTMLProps<
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
    }
  }
}
