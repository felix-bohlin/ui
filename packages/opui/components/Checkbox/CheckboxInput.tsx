import { splitProps, type JSX } from "solid-js"
import type { CheckboxInputProps } from "./types.solid"

export default function CheckboxInput(props: CheckboxInputProps) {
  const [local, rest] = splitProps(props, ["indeterminate"])

  return (
    <input
      type="checkbox"
      data-indeterminate={local.indeterminate || undefined}
      {...rest}
    />
  )
}
