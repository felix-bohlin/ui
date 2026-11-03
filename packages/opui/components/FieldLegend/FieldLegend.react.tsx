import type { ElementType } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function FieldLegend({
  as,
  className,
  children,
  ...rest
}: Props) {
  const Tag: ElementType = as || "legend"
  const isLegend = Tag === "legend"

  return (
    <Tag
      className={cx([{ "ui-legend": !isLegend }, className])}
      {...(rest as object)}
    >
      {children}
    </Tag>
  )
}
