import type * as Base from "./types"
import type { ComponentProps } from "react"

export type Props = Base.Props & {
  onSort?: (event: Base.Events["sort"]) => void
} & Omit<ComponentProps<"opui-sortable-table">, "onSort">
