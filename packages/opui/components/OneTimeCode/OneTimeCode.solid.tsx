/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import type { Props } from "./types.solid"

export default function OneTimeCode(props: Props) {
  const rest = omit(
    props,
    "class",
    "for",
    "grouped",
    "size",
    "children",
    "endText",
    "label",
  )
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const hasLabel = () => Boolean(resolvedLabel())
  const hasEndText = () => Boolean(resolvedEndText())
  const endTextId = () => (hasEndText() ? `${props.for}-end-text` : undefined)

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
        <label class="ui-label" for={props.for}>
          {resolvedLabel()}
        </label>
      )}
      <span class="ui-field">{props.children}</span>
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </div>
  )
}
