import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"dialog">

export type DialogActionsProps = Base.DialogActionsProps & ComponentProps<"div">

export type DialogContentProps = Base.DialogContentProps & ComponentProps<"div">

export type DialogHeaderProps = Base.DialogHeaderProps &
  ComponentProps<"hgroup">
