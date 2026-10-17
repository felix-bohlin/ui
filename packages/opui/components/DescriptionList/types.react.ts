import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"dl">

export type TermProps = ComponentProps<"dt">

export type DescriptionProps = ComponentProps<"dd">

export type ItemProps = ComponentProps<"div">
