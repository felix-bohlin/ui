import type * as Base from "./types"
import type { JSX } from "solid-js"

// prettier-ignore
export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: "li" } & JSX.HTMLAttributes<HTMLLIElement>)
    | ({ as: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
