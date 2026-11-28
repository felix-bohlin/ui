import { cx } from "../cx"
import type { Props } from "./types.react"

export default function DescriptionList({
  className,
  leader,
  orientation,
  children,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-description-list",
        leader && `ui-leader-${leader}`,
        orientation && orientation !== "auto" && `ui-${orientation}`,
        className,
      ])}
      {...rest}
    >
      {children}
    </dl>
  )
}
