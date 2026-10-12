"use client"

import { useFieldRoot } from "../Field/context.react"
import { useFieldContext } from "../FieldGroup/context.react"
import type { TextFieldInputProps as Props } from "./types.react"

export default function TextFieldInput({
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  inputMode,
  name,
  pattern,
  type = "text",
  ...rest
}: Props) {
  const field = useFieldRoot()
  const group = useFieldContext()

  return (
    <input
      {...rest}
      aria-describedby={
        [field?.describedBy, ariaDescribedBy].filter(Boolean).join(" ") ||
        undefined
      }
      aria-invalid={field?.invalid ? "true" : ariaInvalid}
      inputMode={inputMode ?? (type === "numeric" ? "numeric" : undefined)}
      name={name ?? group?.name}
      pattern={pattern ?? (type === "numeric" ? "[0-9]*" : undefined)}
      type={type === "numeric" ? "text" : type}
    />
  )
}
