import { cx } from "../cx"
import type { Props } from "./types.react"

export default function FieldGroup({
  className,
  orientation,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx([
        "ui-field-group",
        orientation && orientation !== "auto" && `ui-${orientation}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </div>
  )
}
