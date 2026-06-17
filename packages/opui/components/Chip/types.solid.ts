import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Partial<Base.Slots<JSX.Element>> &
  (
    | ({ as?: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as?: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
