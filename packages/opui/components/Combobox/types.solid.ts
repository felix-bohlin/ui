import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  JSX.HTMLAttributes<HTMLDivElement> &
  Base.Slots<JSX.Element>
