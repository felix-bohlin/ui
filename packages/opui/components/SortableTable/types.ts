import type { SortDetail } from "../../elements/sortable-table.js"

export type Props = {
  ascendingLabel?: string
  descendingLabel?: string
}

export type Events = {
  sort: CustomEvent<SortDetail>
}

export type { SortDetail }
