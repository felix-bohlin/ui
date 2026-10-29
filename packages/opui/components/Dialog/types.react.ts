import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & Omit<ComponentProps<"dialog">, "closedby">

export type DialogContentProps = Base.DialogContentProps & ComponentProps<"div">

export type DialogFooterProps = Base.DialogFooterProps & ComponentProps<"div">

export type DialogHeaderProps = Base.DialogHeaderProps & ComponentProps<"div">

export type DialogTitleProps = Base.DialogTitleProps & ComponentProps<"h2">
