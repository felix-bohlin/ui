/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultCheckedProp } from "../solid"
import type { SwitchInputProps as Props } from "./types.solid"

export default function SwitchInput(props: Props) {
  const rest = omit(props, "name")
  const field = useFieldGroupContext()

  return (
    <input
      type="checkbox"
      role="switch"
      name={props.name ?? field?.name}
      {...rest}
      {...defaultCheckedProp(() => props.checked)}
    />
  )
}
