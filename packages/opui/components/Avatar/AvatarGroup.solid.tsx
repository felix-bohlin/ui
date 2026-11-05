/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { AvatarGroupProps as Props } from "./types.solid"

export default function AvatarGroup(props: Props) {
  const rest = omit(props, "class", "children")

  return (
    <div class={["ui-avatar-group", props.class]} role="group" {...rest}>
      {props.children}
    </div>
  )
}
