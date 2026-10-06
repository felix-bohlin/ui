import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

type Slots = Omit<Base.RangeSlots<JSX.Element>, "valueSuffix">

export type RangeProps = Omit<Base.RangeProps, keyof Slots> &
  Slots & {
    children?: JSX.Element
  } & JSX.InputHTMLAttributes<HTMLInputElement>
