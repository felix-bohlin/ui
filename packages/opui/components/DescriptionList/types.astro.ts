import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dl">

export type TermProps = Base.Props & HTMLAttributes<"dt">

export type DescriptionProps = Base.Props & HTMLAttributes<"dd">

export type ItemProps = Base.Props & HTMLAttributes<"div">
