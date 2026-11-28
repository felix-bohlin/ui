/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import { useAnchorContext } from "./context.solid"
import { DEV, warnReplacedAnchorAttributes } from "../dev"
import type { AnchorContentProps as Props } from "./types.solid"

export default function AnchorContent(props: Props) {
  const rest = omit(props, "class", "id", "popover", "children")
  const anchor = useAnchorContext()
  if (DEV)
    untrack(() => {
      warnReplacedAnchorAttributes(
        props.id,
        props.popover,
        anchor?.floatingId,
        anchor?.popover,
      )
    })

  return (
    <span
      class={["ui-floating", props.class]}
      id={anchor?.floatingId ?? props.id}
      popover={anchor?.popover ?? props.popover}
      {...rest}
    >
      {props.children}
    </span>
  )
}
