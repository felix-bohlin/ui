/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/character-count.js"
import { defined } from "../attrs"
import type { Props } from "./types.solid"

export default function CharacterCount(props: Props) {
  const rest = omit(props, "class", "label")

  return (
    <opui-character-count
      aria-hidden="true"
      class={["ui-value", props.class]}
      label={props.label}
      {...defined(rest)}
    />
  )
}
