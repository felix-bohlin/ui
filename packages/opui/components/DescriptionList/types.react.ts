import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & ComponentProps<"dl">

export type DescriptionListDescriptionProps = ComponentProps<"dd">

export type DescriptionListItemProps = ComponentProps<"div">

export type DescriptionListTermProps = ComponentProps<"dt">
