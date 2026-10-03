import type {
  DataGridColumn,
  DataGridFilter,
  DataGridLabels,
  DataGridRow,
  Props,
} from "./types"

export const defaultLabels: DataGridLabels = {
  all: "All",
  ascending: "ascending",
  columns: "Columns",
  compact: "Compact",
  density: "Density",
  descending: "descending",
  details: "Show details for",
  empty: "No rows",
  filter: "Filter rows",
  rowNumber: "Row number",
  rows: "rows",
  select: "Select",
  selected: "selected",
  sortBy: "Sort by",
  spacious: "Spacious",
  standard: "Standard",
  total: "Total",
}

const collator = new Intl.Collator("en", { numeric: true })

const compare = (a: unknown, b: unknown) =>
  typeof a === "number" && typeof b === "number"
    ? a - b
    : collator.compare(String(a ?? ""), String(b ?? ""))

const ranksFor = (rows: DataGridRow[], key: string) => {
  const ranks: number[] = []
  rows
    .map((row, index) => ({ index, value: row[key] }))
    .toSorted((a, b) => compare(a.value, b.value))
    .forEach(({ index }, rank) => (ranks[index] = rank + 1))
  return ranks
}

const declarations = (entries: (string | false | undefined)[]) =>
  entries.filter(Boolean).join("; ") || undefined

export const filterValue = (filter: DataGridFilter, index: number) =>
  filter.match === "selected" ? "selected" : String(index + 1)

export function createGrid(
  props: Pick<
    Props,
    | "columns"
    | "filters"
    | "labels"
    | "maxBlockSize"
    | "numbered"
    | "rows"
    | "selectable"
    | "sort"
  > & { expandable?: boolean },
) {
  const {
    columns,
    expandable,
    filters = [],
    numbered,
    rows,
    selectable,
    sort,
  } = props
  const labels = { ...defaultLabels, ...props.labels }
  const offset =
    Number(!!numbered) + Number(!!selectable) + Number(!!expandable)
  const position = (index: number) => index + offset + 1
  const rowHeader = columns.find((column) => column.rowHeader) ?? columns[0]
  const ranks = new Map(
    columns
      .filter((column) => column.sortable)
      .map((column) => [column.key, ranksFor(rows, column.key)]),
  )

  return {
    columns: columns.map((column, index) => ({
      ...column,
      position: position(index),
    })),
    filters: filters.map((filter, index) => ({
      ...filter,
      value: filterValue(filter, index),
    })),
    hasSum: columns.some((column) => column.sum),
    labels,
    rowFilters: (row: DataGridRow) =>
      filters
        .map((filter, index) =>
          typeof filter.match === "function" && filter.match(row)
            ? filterValue(filter, index)
            : undefined,
        )
        .filter(Boolean)
        .join(" ") || undefined,
    rowName: (row: DataGridRow) => String(row[rowHeader?.key] ?? ""),
    rowStyle: (row: DataGridRow, rowIndex: number) =>
      declarations(
        columns.flatMap((column, index) => [
          column.sortable &&
            `--_rank-${position(index)}: ${ranks.get(column.key)![rowIndex]}`,
          column.sum &&
            `--_sum-${position(index)}: ${Math.round(Number(row[column.key]) || 0)}`,
        ]),
      ),
    sorted: (column: DataGridColumn, direction: "asc" | "desc") =>
      sort?.key === column.key && sort.direction === direction,
    style: declarations([
      ...columns.map(
        (column, index) =>
          column.width && `--_col-${position(index)}: ${column.width}`,
      ),
      props.maxBlockSize && `--_max-block-size: ${props.maxBlockSize}`,
    ]),
    utilityCells: [
      selectable && "ui-row-select",
      numbered && "ui-row-number",
      expandable && "ui-expand",
    ].filter((name): name is string => !!name),
  }
}
