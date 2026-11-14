import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props &
  Base.Slots<ReactNode> & {
    onDismiss?: (event: Base.Events["dismiss"]) => void
  } & ComponentProps<"article">

export type CalloutActionsProps = Base.CalloutActionsProps &
  ComponentProps<"div">

export type CalloutContentProps = Base.CalloutContentProps &
  ComponentProps<"div">

export type CalloutIconProps = Base.CalloutIconProps &
  Omit<
    ComponentProps<"svg">,
    "aria-hidden" | "children" | "height" | "viewBox" | "width" | "xmlns"
  >
