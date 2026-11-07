"use client"

import { cx } from "../cx"
import { useFieldsetContext } from "../Fieldset/context.react"
import { warnReplacedId } from "../dev"
import type { Props } from "./types.react"

export default function FieldLegend({
  as,
  className,
  children,
  ...rest
}: Props) {
  const fieldset = useFieldsetContext()
  const Tag = as || "legend"
  const isLegend = Tag === "legend"
  warnReplacedId("FieldLegend", "Fieldset", rest.id, fieldset?.legendId)

  return (
    <Tag
      className={cx([{ "ui-legend": !isLegend }, className])}
      {...(rest as object)}
      id={fieldset?.legendId ?? rest.id}
    >
      {children}
    </Tag>
  )
}
