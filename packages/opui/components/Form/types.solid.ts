import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  (
    | ({ as?: "form" } & JSX.FormHTMLAttributes<HTMLFormElement>)
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
