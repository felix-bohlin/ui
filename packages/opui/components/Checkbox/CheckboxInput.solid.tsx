/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../css/js/checkbox.js"
import { defined } from "../attrs"
import { control } from "../solid"
import type { CheckboxInputProps as Props } from "./types.solid"

export default function CheckboxInput(props: Props) {
  const rest = omit(props, "checked", "indeterminate", "ref")
  const checkedControl = control(() => props.checked)

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate ? "" : undefined}
      {...checkedControl.server}
      ref={[props.ref, checkedControl.ref]}
      {...defined(rest)}
    />
  )
}
