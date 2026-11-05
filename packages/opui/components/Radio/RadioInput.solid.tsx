/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { RadioInputProps as Props } from "./types.solid"

export default function RadioInput(props: Props) {
  const rest = omit(props, "name")
  const field = useFieldGroupContext()

  return <input type="radio" name={props.name ?? field?.name} {...rest} />
}
