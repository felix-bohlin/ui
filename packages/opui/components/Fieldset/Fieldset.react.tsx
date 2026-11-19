"use client"

import { type HTMLAttributes, useId, useMemo } from "react"
import { defined } from "../attrs"
import { cx } from "../cx"
import { FieldsetContext } from "./context.react"
import { autoLabelledBy } from "../id"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function Fieldset({ as, className, children, ...rest }: Props) {
  const uid = useId()
  const Tag = as || "fieldset"
  const isFieldset = Tag === "fieldset"
  const legendId = isFieldset
    ? undefined
    : autoLabelledBy(rest, `${rest.id || `fieldset-${uid}`}-legend`)
  const attrs = defined(rest as HTMLAttributes<HTMLElement>)
  const context = useMemo<Context>(() => ({ legendId }), [legendId])

  return (
    <FieldsetContext value={context}>
      <Tag
        aria-labelledby={legendId}
        className={cx(["ui-fieldset", className])}
        role={isFieldset ? undefined : "group"}
        {...attrs}
      >
        {children}
      </Tag>
    </FieldsetContext>
  )
}
