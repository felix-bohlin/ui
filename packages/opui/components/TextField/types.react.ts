import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type InputProps = {
  type?: ComponentProps<"input">["type"] | "numeric"
} & Omit<ComponentProps<"input">, "size" | "type">

type Slots = Base.Slots<ReactNode>

export type Props = Omit<Base.Props, keyof Slots> &
  Omit<InputProps, keyof Slots> &
  Slots
