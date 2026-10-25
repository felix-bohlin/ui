import { cx } from "../cx"
import type { TableHeaderCellProps as Props } from "./types.react"

export default function TableHeaderCell({
  className,
  numeric,
  ...rest
}: Props) {
  return <th className={cx([{ "ui-numeric": numeric }, className])} {...rest} />
}
