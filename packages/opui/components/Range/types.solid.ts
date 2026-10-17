import type * as Base from "./types"
import type { JSX } from "solid-js"

export type RangeProps = Base.RangeProps &
  Partial<Base.RangeSlots<JSX.Element>> & {
    valueText?: (value: number) => JSX.Element
  } & JSX.InputHTMLAttributes<HTMLInputElement>
