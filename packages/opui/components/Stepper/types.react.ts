import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type StepperItemSlots = Base.StepperItemSlots<ReactNode>

export type Props = Base.Props & ComponentProps<"ol">

export type StepperItemProps = Omit<
  Base.StepperItemProps,
  keyof StepperItemSlots
> &
  StepperItemSlots &
  ComponentProps<"li">
