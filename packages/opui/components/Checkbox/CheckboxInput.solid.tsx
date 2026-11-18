/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import "../../css/js/checkbox.js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { control } from "../solid"
import type { CheckboxInputProps as Props } from "./types.solid"

export default function CheckboxInput(props: Props) {
  const rest = omit(props, "checked", "indeterminate", "name", "ref")
  const field = useFieldGroupContext()
  const checkedControl = control(
    "checked",
    () => props.checked,
    untrack(() => props.checked),
  )

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate ? "" : undefined}
      name={props.name ?? field?.name}
      {...checkedControl.server}
      ref={[props.ref, checkedControl.ref]}
      {...defined(rest)}
    />
  )
}
