import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & ComponentProps<"dialog">

export type DrawerContentProps = Base.DrawerContentProps & ComponentProps<"div">

export type DrawerFooterProps = Base.DrawerFooterProps & ComponentProps<"div">

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  Base.DrawerHeaderSlots<ReactNode> &
  ComponentProps<"div">

export type DrawerTitleProps = Base.DrawerTitleProps & ComponentProps<"h2">
