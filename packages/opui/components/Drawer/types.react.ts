import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props &
  Omit<ComponentProps<"dialog">, "closedby" | "id">

export type DrawerContentProps = Base.DrawerContentProps & ComponentProps<"div">

export type DrawerFooterProps = Base.DrawerFooterProps & ComponentProps<"div">

export type DrawerHeaderProps = Base.DrawerHeaderProps & ComponentProps<"div">

export type DrawerTitleProps = Base.DrawerTitleProps & ComponentProps<"h2">
