import { defined } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function List({
  as,
  bordered,
  className,
  dense,
  flush,
  variant,
  children,
  ...rest
}: Props) {
  const Tag = as || "ul"

  return (
    <Tag
      className={cx([
        "ui-list",
        { "ui-bordered": bordered, "ui-dense": dense, "ui-flush": flush },
        variant && variant !== "filled" && `ui-${variant}`,
        className,
      ])}
      role="list"
      {...defined(rest as object)}
    >
      {children}
    </Tag>
  )
}
