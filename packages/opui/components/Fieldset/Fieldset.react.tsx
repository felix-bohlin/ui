"use client"

import { useId } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { FieldsetContext } from "./context.react"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.react"

export default function Fieldset({ as, className, children, ...rest }: Props) {
  const uid = useId()
  const Tag = as || "fieldset"
  const isFieldset = Tag === "fieldset"
  const legendId = isFieldset
    ? undefined
    : autoLabelledBy(rest, `${rest.id || `fieldset-${uid}`}-legend`)

  return (
    <FieldsetContext value={{ legendId }}>
      <Tag
        aria-labelledby={legendId}
        className={cx(["ui-fieldset", className])}
        role={isFieldset ? undefined : "group"}
        {...defined(rest as object)}
      >
        {children}
      </Tag>
    </FieldsetContext>
  )
}
