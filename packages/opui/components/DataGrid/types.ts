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
  dense: string
  density: string
  descending: string
  details: string
  empty: string
  filter: string
  hideColumn: string
  menu: string
  rowNumber: string
  rows: string
  select: string
  selected: string
  sortAscending: string
  sortBy: string
  sortDescending: string
  spacious: string
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
  density?: "dense" | "spacious" | "standard"
  densityToggle?: boolean
  filters?: DataGridFilter[]
  footer?: boolean
  form?: string
  headerMenus?: boolean
  label: string
  labels?: Partial<DataGridLabels>
  loading?: boolean
  maxBlockSize?: string
  numbered?: boolean
  pinEnd?: boolean
  pinStart?: boolean
  resizable?: boolean
  rowKey?: string
  rows: DataGridRow[]
  selectable?: boolean
  sort?: DataGridSort
  wrap?: boolean
}

export type Slots<S> = {
  actions?: S
  detail?: S
  empty?: S
}
