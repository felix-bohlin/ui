/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import "../../css/js/checkbox.js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { CheckboxInputProps as Props } from "./types.solid"

export default function CheckboxInput(props: Props) {
  const rest = omit(props, "indeterminate", "name")
  const field = useFieldGroupContext()

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate ? "" : undefined}
      name={props.name ?? field?.name}
      defaultChecked={untrack(() => props.checked)}
      {...defined(rest)}
    />
  )
}
