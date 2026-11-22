/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function SelectButton(props: Props) {
  const rest = omit(props)

  return (
    <button {...rest}>
      <selectedcontent />
    </button>
  )
}
