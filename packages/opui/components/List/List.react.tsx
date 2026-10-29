import { cx } from "../cx"
import type { Props } from "./types.react"

export default function List({
  bordered,
  className,
  dense,
  flush,
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
          "ui-flush": flush,
        },
        variant && variant !== "filled" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
