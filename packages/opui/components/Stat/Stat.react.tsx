import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Stat({
  className,
  size,
  children,
  description,
  label,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-stat",
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      <dt className="ui-label">{label}</dt>
      <dd className="ui-value">{children}</dd>
      {description && <dd className="ui-description">{description}</dd>}
    </dl>
  )
}
