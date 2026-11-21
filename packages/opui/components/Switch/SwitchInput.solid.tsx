/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { control } from "../solid"
import type { SwitchInputProps as Props } from "./types.solid"

export default function SwitchInput(props: Props) {
  const rest = omit(props, "checked", "name", "ref")
  const field = useFieldGroupContext()
  const checkedControl = control("checked", () => props.checked)

  return (
    <input
      type="checkbox"
      role="switch"
      name={props.name ?? field?.name}
      {...checkedControl.server}
      ref={[props.ref, checkedControl.ref]}
      {...defined(rest)}
    />
  )
}
