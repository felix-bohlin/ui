import { omit } from "solid-js"
import type { CheckboxInputProps } from "./types.solid"

export default function CheckboxInput(props: CheckboxInputProps) {
  const rest = omit(props, "indeterminate")

  return (
    <input
      type="checkbox"
      data-indeterminate={props.indeterminate || undefined}
      prop:indeterminate={!!props.indeterminate}
      {...rest}
    />
  )
}
