import { cx } from "../cx"
import type { Props } from "./types.react"

export default function List({
  bordered,
  className,
  dense,
  gutterless,
  variant,
  ...rest
}: Props) {
  return (
    <ul
      className={cx([
        "ui-list",
        {
          "ui-bordered": bordered,
          "ui-dense": dense,
          "ui-gutterless": gutterless,
        },
        variant && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
