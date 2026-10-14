import type * as Base from "./types"
import type { HTMLAttributes, HTMLTag } from "astro/types"

type Section = "colgroup" | "tbody" | "td" | "th" | "thead" | "tr"

type Attributes<T extends HTMLTag> = T extends HTMLTag
  ? HTMLAttributes<T>
  : never

export type ColumnProps = Base.ColumnProps & HTMLAttributes<"col">
export type Props = Base.Props & HTMLAttributes<"table">
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  Attributes<T>
