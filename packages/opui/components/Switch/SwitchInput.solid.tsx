/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { defined } from "../attrs"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { SwitchInputProps as Props } from "./types.solid"

export default function SwitchInput(props: Props) {
  const rest = omit(props, "name")
  const field = useFieldGroupContext()

  return (
    <input
      type="checkbox"
      role="switch"
      name={props.name ?? field?.name}
      defaultChecked={untrack(() => props.checked)}
      {...defined(rest)}
    />
  )
}
