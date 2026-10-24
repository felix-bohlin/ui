import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Omit<Base.Props, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, "size" | "type">

export type RadioInputProps = Base.RadioInputProps &
  Omit<ComponentProps<"input">, "type">
