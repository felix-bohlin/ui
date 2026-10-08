import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLOListElement>

export type TimelineItemProps = Base.TimelineItemProps &
  Partial<Base.Slots<JSX.Element>> &
  JSX.LiHTMLAttributes<HTMLLIElement>
