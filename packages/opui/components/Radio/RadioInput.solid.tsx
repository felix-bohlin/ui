/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { control } from "../solid"
import type { RadioInputProps as Props } from "./types.solid"

export default function RadioInput(props: Props) {
  const rest = omit(props, "checked", "name", "ref")
  const field = useFieldGroupContext()
  const checkedControl = control(() => props.checked)

  return (
    <input
      type="radio"
      name={props.name ?? field?.name}
      {...checkedControl.server}
      ref={[props.ref, checkedControl.ref]}
      {...defined(rest)}
    />
  )
}
