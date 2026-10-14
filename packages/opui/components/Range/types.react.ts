import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Omit<Base.RangeSlots<ReactNode>, "valueSuffix">

type WithoutSlots<T> = T extends unknown ? Omit<T, keyof Slots> : never

export type RangeProps = WithoutSlots<Base.RangeProps> &
  Slots &
  Omit<ComponentProps<"input">, keyof Base.RangeProps | keyof Slots>
