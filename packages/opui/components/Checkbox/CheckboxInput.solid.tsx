/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../css/js/checkbox.js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultCheckedProp } from "../solid"
import type { CheckboxInputProps as Props } from "./types.solid"

export default function CheckboxInput(props: Props) {
  const rest = omit(props, "indeterminate", "name")
  const field = useFieldGroupContext()

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate ? "" : undefined}
      name={props.name ?? field?.name}
      {...rest}
      {...defaultCheckedProp(() => props.checked)}
    />
  )
}
