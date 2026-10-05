import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
    | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as?: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
  )
