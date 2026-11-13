import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"div">

export type CalloutActionsProps = Base.CalloutActionsProps &
  HTMLAttributes<"div">

export type CalloutContentProps = Base.CalloutContentProps &
  HTMLAttributes<"div">

export type CalloutIconProps = Base.CalloutIconProps & HTMLAttributes<"svg">
