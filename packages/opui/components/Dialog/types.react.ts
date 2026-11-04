import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"dialog">

export type DialogContentProps = Base.DialogContentProps & ComponentProps<"div">

export type DialogFooterProps = Base.DialogFooterProps & ComponentProps<"div">

export type DialogHeaderProps = Base.DialogHeaderProps & ComponentProps<"div">

export type DialogTitleProps = Base.DialogTitleProps & ComponentProps<"h2">
