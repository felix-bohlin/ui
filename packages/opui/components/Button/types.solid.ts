import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  (
    | ({
        as?: "button"
        href?: never
      } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as?: "a"; href: string } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
  )
