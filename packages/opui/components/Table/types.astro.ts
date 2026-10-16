import type * as Base from "./types"
import type { HTMLAttributes, HTMLTag } from "astro/types"

type Section =
  "caption" | "colgroup" | "tbody" | "td" | "tfoot" | "th" | "thead" | "tr"

type Attributes<T extends HTMLTag> = T extends HTMLTag
  ? HTMLAttributes<T>
  : never

export type Props = Base.Props & HTMLAttributes<"table">
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  Attributes<T>
export type TableColumnProps = Base.TableColumnProps & HTMLAttributes<"col">
