"use client"

import { useEffect } from "react"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { CheckboxInputProps as Props } from "./types.react"

export default function CheckboxInput({ indeterminate, name, ...rest }: Props) {
  const field = useFieldGroupContext()
  useEffect(() => {
    void import("../../css/js/checkbox.js")
  }, [])

  return (
    <input
      type="checkbox"
      data-indeterminate={indeterminate ? "" : undefined}
      name={name ?? field?.name}
      {...defined(rest)}
    />
  )
}
