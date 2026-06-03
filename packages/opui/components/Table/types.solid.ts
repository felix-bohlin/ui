import type * as Base from "./types"
import type { JSX } from "solid-js"

export type Props = Base.Props & JSX.HTMLAttributes<HTMLTableElement>
export type SectionProps = Base.SectionProps &
  JSX.HTMLAttributes<HTMLTableSectionElement>
export type ColumnProps = Base.ColumnProps &
  JSX.HTMLAttributes<HTMLTableColElement>
