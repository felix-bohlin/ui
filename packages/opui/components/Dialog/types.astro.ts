import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dialog">

export type DialogContentProps = Base.DialogContentProps & HTMLAttributes<"div">

export type DialogFooterProps = Base.DialogFooterProps & HTMLAttributes<"div">

export type DialogHeaderProps = Base.DialogHeaderProps & HTMLAttributes<"div">

export type DialogTitleProps = Base.DialogTitleProps & HTMLAttributes<"h2">
