import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dialog">

export type DrawerHeaderProps = Base.DrawerHeaderProps &
  HTMLAttributes<"div">

export type DrawerFooterProps = Base.DrawerFooterProps &
  HTMLAttributes<"div">
