import { omit, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { RadioInputProps } from "./types.solid"

export default function RadioInput(props: RadioInputProps) {
  const rest = omit(props, "name")
  const fieldGroup = useContext(FieldGroupContext)

  return <input type="radio" name={props.name ?? fieldGroup.name} {...rest} />
}
