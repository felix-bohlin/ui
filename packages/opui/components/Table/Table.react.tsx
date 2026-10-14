import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Table({
  className,
  stickyHeader,
  variant,
  ...rest
}: Props) {
  return (
    <table
      className={cx([
        "ui-table",
        { "ui-sticky-header": stickyHeader },
        variant && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
