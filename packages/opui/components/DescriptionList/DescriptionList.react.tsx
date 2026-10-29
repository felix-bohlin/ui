import { cx } from "../cx"
import type { Props } from "./types.react"

export default function DescriptionList({
  bordered,
  className,
  dotted,
  orientation,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-description-list",
        {
          "ui-bordered": bordered,
          "ui-dotted": dotted,
        },
        orientation && orientation !== "auto" && `ui-${orientation}`,
        className,
      ])}
      {...rest}
    />
  )
}
