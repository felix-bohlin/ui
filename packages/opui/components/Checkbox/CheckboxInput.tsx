import { omit, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { CheckboxInputProps } from "./types.solid"

export default function CheckboxInput(props: CheckboxInputProps) {
  const rest = omit(props, "indeterminate", "name")
  const fieldGroup = useContext(FieldGroupContext)

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate ? "" : undefined}
      name={props.name ?? fieldGroup.name}
      prop:indeterminate={!!props.indeterminate}
      {...rest}
    />
  )
}
