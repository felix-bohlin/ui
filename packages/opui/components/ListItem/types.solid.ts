import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

// prettier-ignore
export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  (
    | ({ as?: never; href?: never } & JSX.HTMLAttributes<HTMLLIElement>)
    | ({ as?: "a"; href: string } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
