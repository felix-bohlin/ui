/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { bound } from "../solid"
import type { RadioInputProps as Props } from "./types.solid"

export default function RadioInput(props: Props) {
  const rest = omit(props, "checked", "name", "ref")
  const field = useFieldGroupContext()
  const initialChecked = untrack(() => props.checked)
  const checkedRef = bound("checked", () => props.checked)

  return (
    <input
      type="radio"
      name={props.name ?? field?.name}
      defaultChecked={initialChecked}
      ref={[props.ref, checkedRef]}
      {...defined(rest)}
    />
  )
}
