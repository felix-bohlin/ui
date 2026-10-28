import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dl">

export type DescriptionListDescriptionProps = HTMLAttributes<"dd">

export type DescriptionListItemProps = Base.DescriptionListItemProps &
  HTMLAttributes<"div">

export type DescriptionListTermProps = HTMLAttributes<"dt">
