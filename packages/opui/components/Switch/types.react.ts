import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.SwitchSlots<ReactNode>

export type SwitchProps = Omit<Base.SwitchProps, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<ComponentProps<"input">, "type">
