import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLDivElement> & {
  actions?: JSX.Element
  header?: JSX.Element
  content?: JSX.Element
}
