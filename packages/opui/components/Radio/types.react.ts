import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.RadioSlots<ReactNode>

export type RadioProps = Omit<Base.RadioProps, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, "size" | "type">

export type RadioInputProps = Base.RadioInputProps &
  Omit<ComponentProps<"input">, "type">
