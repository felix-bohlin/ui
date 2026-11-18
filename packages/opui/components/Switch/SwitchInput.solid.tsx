/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { bound } from "../solid"
import type { SwitchInputProps as Props } from "./types.solid"

export default function SwitchInput(props: Props) {
  const rest = omit(props, "checked", "name", "ref")
  const field = useFieldGroupContext()
  const initialChecked = untrack(() => props.checked)
  const checkedRef = bound("checked", () => props.checked)

  return (
    <input
      type="checkbox"
      role="switch"
      name={props.name ?? field?.name}
      defaultChecked={initialChecked}
      ref={[props.ref, checkedRef]}
      {...defined(rest)}
    />
  )
}
