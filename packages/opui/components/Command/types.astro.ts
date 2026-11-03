import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"div">

export type CommandGroupProps = Base.CommandGroupProps & HTMLAttributes<"div">

export type CommandInputProps = Base.CommandInputProps &
  Base.CommandInputName &
  HTMLAttributes<"input">

export type CommandListProps = Base.CommandListProps & HTMLAttributes<"div">
