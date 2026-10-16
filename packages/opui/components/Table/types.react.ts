import type * as Base from "./types"
import type { ComponentProps } from "react"

type Section =
  "caption" | "colgroup" | "tbody" | "td" | "tfoot" | "th" | "thead" | "tr"

export type Props = Base.Props & ComponentProps<"table">
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  ComponentProps<T>
export type TableColumnProps = Base.TableColumnProps & ComponentProps<"col">
