import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as?: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
