import type * as Base from "./types"
import type { HTMLAttributes } from "astro/types"

export type Props = Base.Props & HTMLAttributes<"table">

export type SectionProps = Base.SectionProps &
  (
    | HTMLAttributes<"tr">
    | HTMLAttributes<"tbody">
    | HTMLAttributes<"thead">
    | HTMLAttributes<"th">
    | HTMLAttributes<"td">
    | HTMLAttributes<"colgroup">
  )

export type ColumnProps = Base.ColumnProps & HTMLAttributes<"col">
