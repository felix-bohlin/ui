/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import "../../elements/toaster.js"
import { warnMissingId } from "../dev"
import type { Props } from "./types.solid"

export default function Toaster(props: Props) {
  const rest = omit(
    props,
    "align",
    "class",
    "closeLabel",
    "duration",
    "id",
    "side",
  )
  untrack(() => {
    warnMissingId("Toaster", props.id)
  })

  return (
    <opui-toaster
      class={[
        "ui-toaster",
        props.side && props.side !== "block-end" && `ui-${props.side}`,
        props.align && props.align !== "end" && `ui-align-${props.align}`,
        props.class,
      ]}
      close-label={props.closeLabel}
      duration={props.duration}
      id={props.id}
      {...rest}
    >
      <ol popover="manual" />
      <div class="ui-sr-only" role="status" />
    </opui-toaster>
  )
}
