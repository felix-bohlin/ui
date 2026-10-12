"use client"

import { useCallback, useLayoutEffect, useRef } from "react"
import { useFieldContext } from "../FieldGroup/context.react"
import type { CheckboxInputProps as Props } from "./types.react"

export default function CheckboxInput({
  indeterminate,
  name,
  ref,
  ...rest
}: Props) {
  const field = useFieldContext()
  const inputRef = useRef<HTMLInputElement>(null)

  useLayoutEffect(() => {
    if (inputRef.current)
      inputRef.current.indeterminate = Boolean(indeterminate)
  }, [indeterminate])

  const setRef = useCallback(
    (input: HTMLInputElement | null) => {
      inputRef.current = input
      if (typeof ref === "function") return ref(input)
      if (ref) ref.current = input
    },
    [ref],
  )

  return (
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
      ref={setRef}
      {...rest}
    />
  )
}
