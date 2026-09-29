import type { JSX } from "@solidjs/web"
import type * as Base from "./types"

type Slots = Base.RangeSlots<JSX.Element>

export type RangeProps = Omit<Base.RangeProps, keyof Slots> &
  Slots & {
    children?: JSX.Element
  } & JSX.InputHTMLAttributes<HTMLInputElement>
