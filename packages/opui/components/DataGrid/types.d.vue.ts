import type { HTMLAttributes, Slot } from "vue"
import type { DataGridColumn, DataGridRow, Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  actions?: Slot
  [name: `cell-${string}`]: Slot<{
    column: DataGridColumn
    row: DataGridRow
    value: unknown
  }>
  detail?: Slot<{ row: DataGridRow }>
  empty?: Slot
}
