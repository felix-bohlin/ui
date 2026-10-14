"use client"

import { useFieldContext } from "../FieldGroup/context.react"
import type { SwitchInputProps as Props } from "./types.react"

export default function SwitchInput({ name, ...rest }: Props) {
  const field = useFieldContext()

  return (
    <input type="checkbox" role="switch" name={name ?? field?.name} {...rest} />
  )
}
