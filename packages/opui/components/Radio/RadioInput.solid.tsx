/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { RadioInputProps as Props } from "./types.solid"

export default function RadioInput(props: Props) {
  const rest = omit(props, "name")
  const field = useFieldGroupContext()

  return (
    <input
      type="radio"
      name={props.name ?? field?.name}
      defaultChecked={untrack(() => props.checked)}
      {...defined(rest)}
    />
  )
}
