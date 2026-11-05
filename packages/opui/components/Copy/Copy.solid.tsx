/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import "../../elements/copy.js"
import { warnMissingId } from "../dev"
import type { Props } from "./types.solid"

export default function Copy(props: Props) {
  const rest = omit(
    props,
    "class",
    "copiedLabel",
    "failedLabel",
    "id",
    "children",
  )
  untrack(() => {
    warnMissingId("Copy", props.id)
  })

  return (
    <opui-copy
      class={["ui-copy", props.class]}
      copied-label={props.copiedLabel}
      failed-label={props.failedLabel}
      id={props.id}
      {...rest}
    >
      {props.children} <span class="ui-sr-only" role="status" />{" "}
      <span aria-hidden="true" class="ui-floating" popover />
    </opui-copy>
  )
}
