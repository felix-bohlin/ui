"use client"

import { cx } from "../cx"
import { useFieldRoot } from "./context.react"
import type { FieldEndTextProps as Props } from "./types.react"

export default function FieldEndText({ className, ...rest }: Props) {
  const field = useFieldRoot()

  return (
    <span
      className={cx(["ui-end-text", className])}
      id={field?.endTextId}
      {...rest}
    />
  )
}
