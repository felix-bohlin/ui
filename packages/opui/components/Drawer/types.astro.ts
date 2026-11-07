import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dialog">

export type DrawerContentProps = Base.DrawerContentProps & HTMLAttributes<"div">

export type DrawerFooterProps = Base.DrawerFooterProps & HTMLAttributes<"div">

export type DrawerHeaderProps = Base.DrawerHeaderProps & HTMLAttributes<"div">

export type DrawerTitleProps = Base.DrawerTitleProps & HTMLAttributes<"h2">
