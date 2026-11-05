/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { useAnchorContext } from "./context.solid"
import type { AnchorContentProps as Props } from "./types.solid"

export default function AnchorContent(props: Props) {
  const rest = omit(props, "class", "children")
  const anchor = useAnchorContext()

  return (
    <span
      class={["ui-floating", props.class]}
      id={anchor?.floatingId}
      popover={anchor?.popover}
      {...rest}
    >
      {props.children}
    </span>
  )
}
