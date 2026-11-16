import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

type Without<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never

export type Props = Without<Base.Props, "endText"> &
  Base.Slots<ReactNode> &
  Omit<ComponentProps<"input">, "role" | "size" | "type">

export type SwitchInputProps = Base.SwitchInputProps &
  Omit<ComponentProps<"input">, "children" | "role" | "type">
