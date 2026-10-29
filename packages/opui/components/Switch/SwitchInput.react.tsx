"use client"

import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { SwitchInputProps as Props } from "./types.react"

export default function SwitchInput({ name, ...rest }: Props) {
  const field = useFieldGroupContext()

  return (
    <input type="checkbox" role="switch" name={name ?? field?.name} {...rest} />
  )
}
