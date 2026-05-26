import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & (
  | ({ as?: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as?: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
) & {
  start?: JSX.Element
  end?: JSX.Element
}
