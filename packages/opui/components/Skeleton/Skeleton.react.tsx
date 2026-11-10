import { defined } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Skeleton({
  className,
  line,
  shape = "rounded",
  ...rest
}: Props) {
  return (
    <span
      aria-hidden="true"
      className={cx([
        "ui-skeleton",
        { "ui-line": line },
        shape !== "rounded" && `ui-${shape}`,
        className,
      ])}
      {...defined(rest)}
    />
  )
}
