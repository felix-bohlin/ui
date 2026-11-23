import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Base.Slots<JSX.Element> &
  JSX.DetailsHtmlAttributes<HTMLDetailsElement>
