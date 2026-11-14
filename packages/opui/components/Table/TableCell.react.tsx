import { cx } from "../cx"
import type { TableCellProps as Props } from "./types.react"

export default function TableCell({
  className,
  numeric,
  children,
  ...rest
}: Props) {
  return (
    <td className={cx([{ "ui-numeric": numeric }, className])} {...rest}>
      {children}
    </td>
  )
}
