import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  (
    | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
  )
