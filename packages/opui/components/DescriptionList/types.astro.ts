import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"dl">

export type TermProps = HTMLAttributes<"dt">

export type DescriptionProps = HTMLAttributes<"dd">

export type ItemProps = HTMLAttributes<"div">
