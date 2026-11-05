"use client"

import { type ElementType, useId } from "react"
import { cx } from "../cx"
import { FieldsetContext } from "./context.react"
import { autoLabelledBy, createIds } from "../id"
import type { Props } from "./types.react"

export default function Fieldset({ as, className, children, ...rest }: Props) {
  const uid = useId()
  const Tag: ElementType = as || "fieldset"
  const isFieldset = Tag === "fieldset"
  const legendId = isFieldset
    ? undefined
    : autoLabelledBy(rest, createIds(uid, "fieldset", rest.id)("legend"))

  return (
    <FieldsetContext value={{ legendId }}>
      <Tag
        aria-labelledby={legendId}
        className={cx(["ui-fieldset", className])}
        role={isFieldset ? undefined : "group"}
        {...(rest as object)}
      >
        {children}
      </Tag>
    </FieldsetContext>
  )
}
