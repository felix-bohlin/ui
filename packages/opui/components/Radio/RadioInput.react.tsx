"use client"

import { useFieldGroupContext } from "../FieldGroup/context.react"
import type { RadioInputProps as Props } from "./types.react"

export default function RadioInput({ name, ...rest }: Props) {
  const field = useFieldGroupContext()

  return <input type="radio" name={name ?? field?.name} {...rest} />
}
