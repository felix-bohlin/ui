/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import { filled } from "../attrs"
import { warnControlAttributes } from "../dev"
import type { Props } from "./types.solid"

export default function OneTimeCode(props: Props) {
  const rest = omit(
    props,
    "class",
    "for",
    "grouped",
    "hideLabel",
    "size",
    "children",
    "endText",
    "label",
  )
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const hasLabel = () => Boolean(resolvedLabel())
  const hasEndText = () => Boolean(filled(resolvedEndText()))
  const endTextId = () => (hasEndText() ? `${props.for}-end-text` : undefined)
  untrack(() => {
    warnControlAttributes("OneTimeCode", rest)
  })

  return (
    <div
      class={[
        "ui-one-time-code",
        { "ui-grouped": props.grouped },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      {hasLabel() && (
        <label
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          for={props.for}
        >
          {resolvedLabel()}
        </label>
      )}
      <span class="ui-field-container">{props.children}</span>
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </div>
  )
}
