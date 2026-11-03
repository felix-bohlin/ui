import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & Omit<ComponentProps<"opui-command">, "filter">

export type CommandGroupProps = Omit<Base.CommandGroupProps, "label"> &
  Base.CommandGroupSlots<ReactNode> &
  Omit<ComponentProps<"div">, "label">

export type CommandInputProps = Base.CommandInputProps &
  Base.CommandInputName &
  ComponentProps<"input">

export type CommandListProps = Base.CommandListProps & ComponentProps<"div">
