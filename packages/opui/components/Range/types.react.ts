import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Omit<Base.RangeSlots<ReactNode>, "valueSuffix"> & {
  valueText?: (value: number) => ReactNode
}

export type RangeProps = Omit<Base.RangeProps, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, keyof Base.RangeProps | keyof Slots>
