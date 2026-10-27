export type SortDirection = "ascending" | "descending"

export type SortDetail = {
  column: number
  direction: SortDirection
  header: HTMLTableCellElement
}

export declare class SortableTable extends HTMLElement {
  readonly table: HTMLTableElement | null
  sort(header: HTMLTableCellElement, direction?: SortDirection): void
}
