"use client"

import "../../css/js/checkbox.js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { CheckboxInputProps as Props } from "./types.react"

export default function CheckboxInput({ indeterminate, name, ...rest }: Props) {
  const field = useFieldGroupContext()

  return (
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
      {...defined(rest)}
    />
  )
}
