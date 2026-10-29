import { cx } from "../cx"
import type { TableHeaderCellProps as Props } from "./types.react"

export default function TableHeaderCell({
  className,
  numeric,
  sortable,
  children,
  ...rest
}: Props) {
  return (
    <th
      className={cx([{ "ui-numeric": numeric }, className])}
      data-sort={sortable ? "" : undefined}
      {...rest}
    >
      {sortable ? <button type="button">{children}</button> : children}
    </th>
  )
}
