import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Slots = Base.Slots<ReactNode>

export type Props = Omit<Base.Props, keyof Slots> &
  Slots &
  Omit<ComponentProps<"input">, "size" | "type">

export type CheckboxInputProps = Base.CheckboxInputProps &
  Omit<ComponentProps<"input">, "type">
