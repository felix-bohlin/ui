import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function FieldLegend({ as, className, ...rest }: Props) {
  const Tag: ElementType = as || "legend"

  return (
    <Tag
      className={cx([{ "ui-legend": Tag !== "legend" }, className])}
      {...(rest as object)}
    />
  )
}
