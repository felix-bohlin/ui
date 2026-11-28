/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { defined } from "../attrs"
import { control } from "../solid"
import type { SwitchInputProps as Props } from "./types.solid"

export default function SwitchInput(props: Props) {
  const rest = omit(props, "checked", "ref")
  const checkedControl = control(() => props.checked)

  return (
    <input
      type="checkbox"
      role="switch"
      {...checkedControl.server}
      ref={[props.ref, checkedControl.ref]}
      {...defined(rest)}
    />
  )
}
