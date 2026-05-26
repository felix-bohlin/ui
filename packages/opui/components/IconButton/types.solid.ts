import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & (
  | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
  | ({ as: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
)
