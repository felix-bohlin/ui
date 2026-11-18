import type * as Base from "./types"
import type { ComponentProps, JSX } from "@solidjs/web"

export type Props = Base.Props &
  Base.Slots<JSX.Element> & {
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
