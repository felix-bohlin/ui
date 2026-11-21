/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { CalloutActionsProps as Props } from "./types.solid"

export default function CalloutActions(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-actions", props.class]} {...rest}>
      {props.children}
    </div>
  )
}
