import { cx } from "../cx"
import type { Props } from "./types.react"

export default function DescriptionList({
  border,
  className,
  orientation,
  children,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-description-list",
        border && `ui-border-${border}`,
        orientation && orientation !== "auto" && `ui-${orientation}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </dl>
  )
}
