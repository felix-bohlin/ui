import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  JSX.HTMLAttributes<HTMLDivElement>
