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
}
