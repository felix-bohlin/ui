import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props &
  Omit<JSX.SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  Base.Slots<JSX.Element>
