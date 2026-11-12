export type Props = {
  ascendingLabel?: string
  descendingLabel?: string
}

export type Events = {
  sort: CustomEvent<SortDetail>
}

export type SortDetail = {
  column: number
  direction: "ascending" | "descending"
  header: HTMLTableCellElement
}
