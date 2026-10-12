import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type SwitchProps = Base.SwitchProps &
  Base.SwitchSlots<ReactNode> &
  Omit<ComponentProps<"input">, "size">
export type SwitchInputProps = Base.SwitchInputProps & ComponentProps<"input">
