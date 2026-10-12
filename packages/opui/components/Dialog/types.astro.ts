import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dialog">

export type DialogActionsProps = Base.DialogActionsProps & HTMLAttributes<"div">

export type DialogContentProps = Base.DialogContentProps & HTMLAttributes<"div">

export type DialogHeaderProps = Base.DialogHeaderProps &
  HTMLAttributes<"hgroup">
