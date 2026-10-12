import { cx } from "../cx"
import type { FieldLabelProps as Props } from "./types.react"

export default function FieldLabel({
  className,
  visuallyHidden,
  ...rest
}: Props) {
  return (
    <span
      className={cx([visuallyHidden ? "ui-sr-only" : "ui-label", className])}
      {...rest}
    />
  )
}
