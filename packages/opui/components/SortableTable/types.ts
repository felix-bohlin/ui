export type Props = {
  ascendingLabel?: string
  descendingLabel?: string
}

export type SortDetail = {
  column: number
  direction: "ascending" | "descending"
  header: HTMLTableCellElement
}
