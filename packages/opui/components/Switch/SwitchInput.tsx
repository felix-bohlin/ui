import { omit, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { SwitchInputProps } from "./types.solid"

export default function SwitchInput(props: SwitchInputProps) {
  const rest = omit(props, "name")
  const fieldGroup = useContext(FieldGroupContext)

  return (
    <input
      type="checkbox"
      name={props.name ?? fieldGroup.name}
      role="switch"
      {...rest}
    />
  )
}
