import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Omit<Base.Slots<ReactNode>, "valueSuffix"> & {
  valueText?: (value: number) => ReactNode
}

export type Props = Omit<Base.Props, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, keyof Base.Props | keyof Slots>
