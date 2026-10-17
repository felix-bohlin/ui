import { cx } from "../cx"
import type { Props } from "./types.react"

export default function DescriptionList({
  bordered,
  className,
  inline,
  ...rest
}: Props) {
  return (
    <dl
      className={cx([
        "ui-description-list",
        {
          "ui-bordered": bordered,
          "ui-dotted": bordered === "dotted",
          "ui-inline": inline,
        },
        className,
      ])}
      {...rest}
    />
  )
}
