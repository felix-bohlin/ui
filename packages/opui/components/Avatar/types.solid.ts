import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  Pick<JSX.ImgHTMLAttributes<HTMLImageElement>, Base.ImageProps> &
  (
    | ({ as?: "a" } & JSX.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ as?: "button" } & JSX.ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as?: "div" } & JSX.HTMLAttributes<HTMLDivElement>)
  )
