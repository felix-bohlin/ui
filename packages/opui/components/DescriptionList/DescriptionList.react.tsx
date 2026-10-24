import { cx } from "../cx"
import type { Props } from "./types.react"

export default function DescriptionList({
  bordered,
  className,
  orientation,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-description-list",
        bordered && `ui-bordered-${bordered}`,
        orientation && orientation !== "auto" && `ui-${orientation}`,
        className,
      ])}
      {...rest}
    />
  )
}
