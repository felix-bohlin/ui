import type { HTMLAttributes, Slot } from "vue"
import type { DataGridColumn, DataGridRow, Props as BaseProps } from "./types"

export type Props = BaseProps & {
  class?: HTMLAttributes["class"]
}

export type Slots = {
  actions?: Slot
  [name: `cell-${string}`]: Slot<{
    column: DataGridColumn & { position: number }
    row: DataGridRow
  }>
  detail?: Slot<{ row: DataGridRow }>
  empty?: Slot
}
