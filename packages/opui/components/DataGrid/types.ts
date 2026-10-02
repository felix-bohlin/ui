export type DataGridColumn = {
  editable?: boolean
  fit?: boolean
  hideable?: boolean
  key: string
  label: string
  numeric?: boolean
  rowHeader?: boolean
  sortable?: boolean
  sum?: boolean
  width?: string
}

export type DataGridColumnGroup = {
  label: string
  span: number
}

export type DataGridFilter = {
  label: string
  match: "selected" | ((row: DataGridRow) => boolean)
}

export type DataGridLabels = {
  all: string
  ascending: string
  columns: string
  comfortable: string
  compact: string
  density: string
  descending: string
  details: string
  empty: string
  filter: string
  rows: string
  select: string
  selected: string
  sortBy: string
  standard: string
  total: string
}

export type DataGridRow = Record<string, unknown>

export type DataGridSort = {
  direction: "asc" | "desc"
  key: string
}

export type Props = {
  columnGroups?: DataGridColumnGroup[]
  columns: DataGridColumn[]
  columnsMenu?: boolean
  density?: "comfortable" | "compact" | "standard"
  densityToggle?: boolean
  filters?: DataGridFilter[]
  footer?: boolean
  label: string
  labels?: Partial<DataGridLabels>
  loading?: boolean
  maxBlockSize?: string
  pinEnd?: boolean
  pinStart?: boolean
  resizable?: boolean
  rows: DataGridRow[]
  selectable?: boolean
  sort?: DataGridSort
  wrap?: boolean
}

export type Slots<S> = {
  detail?: S
}
