import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & Omit<ComponentProps<"div">, "id" | "popover">

export type PopoverContentProps = Base.PopoverContentProps &
  ComponentProps<"div">

export type PopoverFooterProps = Base.PopoverFooterProps & ComponentProps<"div">

export type PopoverHeaderProps = Base.PopoverHeaderProps &
  Base.PopoverHeaderSlots<ReactNode> &
  ComponentProps<"div">

export type PopoverTitleProps = Base.PopoverTitleProps & ComponentProps<"h2">
