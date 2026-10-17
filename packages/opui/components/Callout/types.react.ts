import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"article">

export type CalloutContentProps = Base.CalloutContentProps &
  ComponentProps<"div">

export type CalloutIconProps = Base.CalloutIconProps & ComponentProps<"svg">
