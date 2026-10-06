import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  (
    | ({ as?: "form" } & JSX.FormHTMLAttributes<HTMLFormElement>)
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
