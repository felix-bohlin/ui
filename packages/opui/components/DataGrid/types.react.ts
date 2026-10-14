import type * as Base from "./types"
import type { ComponentProps, ReactNode } from "react"

export type Props = Base.Props & {
  actions?: ReactNode
  cells?: Record<
    string,
    (
      row: Base.DataGridRow,
      column: Base.DataGridColumn & { position: number },
    ) => ReactNode
  >
  detail?: (row: Base.DataGridRow) => ReactNode
  empty?: ReactNode
} & ComponentProps<"div">
