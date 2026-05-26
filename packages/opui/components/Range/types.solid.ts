import type * as Base from "./types"
import type { JSX } from "solid-js"

export type RangeProps = Base.RangeProps & JSX.InputHTMLAttributes<HTMLInputElement> & {
  startText?: JSX.Element
  endText?: JSX.Element
  valueSuffix?: JSX.Element
  valueText?: JSX.Element
  datalist?: JSX.Element
}
