"use client"

import { useFieldContext } from "../FieldGroup/context.react"
import type { CheckboxInputProps as Props } from "./types.react"

export default function CheckboxInput({
  indeterminate,
  name,
  ref,
  ...rest
}: Props) {
  const field = useFieldContext()

  return (
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
      ref={(input) => {
        if (input) input.indeterminate = Boolean(indeterminate)
        if (typeof ref === "function") return ref(input)
        if (ref) ref.current = input
      }}
      {...rest}
    />
  )
}
