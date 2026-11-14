import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Table({
  className,
  density,
  flush,
  overflow,
  stickyHeader,
  children,
  ...rest
}: Props) {
  return (
    <table
      className={cx([
        "ui-table",
        { "ui-flush": flush, "ui-sticky-header": stickyHeader },
        density && density !== "normal" && `ui-${density}`,
        overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </table>
  )
}
