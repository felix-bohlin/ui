/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import Anchor from "../Anchor/Anchor.solid"
import { warnMissingId } from "../dev"
import type { Props } from "./types.solid"

export default function Tooltip(props: Props) {
  const rest = omit(props, "arrow", "class", "id", "positionArea", "children")
  untrack(() => {
    warnMissingId("Tooltip", props.id, "interestfor")
  })

  return (
    <Anchor
      class={["ui-tooltip", { "ui-arrow": props.arrow }, props.class]}
      id={props.id}
      positionArea={props.positionArea}
      trigger="hover"
      {...rest}
    >
      {props.children}
    </Anchor>
  )
}
