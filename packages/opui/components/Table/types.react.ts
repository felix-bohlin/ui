import type * as Base from "./types"
import type { ComponentProps } from "react"

type Section = "colgroup" | "tbody" | "td" | "th" | "thead" | "tr"

export type ColumnProps = Base.ColumnProps & ComponentProps<"col">
export type Props = Base.Props & ComponentProps<"table">
export type SectionProps<T extends Section = Section> = Base.SectionProps &
  ComponentProps<T>
