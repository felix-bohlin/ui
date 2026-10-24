import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Table({
  className,
  density,
  stickyHeader,
  ...rest
}: Props) {
  return (
    <table
      className={cx([
        "ui-table",
        { "ui-sticky-header": stickyHeader },
        density && density !== "normal" && `ui-${density}`,
        className,
      ])}
      {...rest}
    />
  )
}
