import type * as Base from "./types"
import type { JSX } from "solid-js"

export type RangeProps = Base.RangeProps &
  Partial<Base.RangeSlots<JSX.Element>> &
  JSX.InputHTMLAttributes<HTMLInputElement>
