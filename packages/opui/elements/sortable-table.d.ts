export type SortDirection = "ascending" | "descending"

export type SortDetail = {
  column: number
  direction: SortDirection
  header: HTMLTableCellElement
}

export declare class SortableTableElement extends HTMLElement {
  readonly table: HTMLTableElement | null
  sort(header: HTMLTableCellElement, direction?: SortDirection): void
}

declare global {
  interface HTMLElementTagNameMap {
    "opui-sortable-table": SortableTableElement
  }
}
