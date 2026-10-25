export type Props = {
  density?: "dense" | "normal" | "spacious"
  flush?: boolean
  overflow?: "scroll" | "wrap"
  stickyHeader?: boolean
}

export type TableCellProps = {
  numeric?: boolean
}

export type TableColumnProps = {
  width?: string
}
