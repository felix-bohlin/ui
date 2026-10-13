import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.CheckboxSlots<ReactNode>

export type CheckboxProps = Omit<Base.CheckboxProps, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, "size">

export type CheckboxInputProps = Base.CheckboxInputProps &
  ComponentProps<"input">
