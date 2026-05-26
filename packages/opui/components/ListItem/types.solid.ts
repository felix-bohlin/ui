import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLLIElement> & {
  headline?: JSX.Element
  description?: JSX.Element
  start?: JSX.Element
  end?: JSX.Element
  text?: JSX.Element
}
