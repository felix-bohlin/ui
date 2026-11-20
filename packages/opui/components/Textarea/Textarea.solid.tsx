/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import "../../elements/character-count.js"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const rest = omit(
    props,
    "autoFit",
    "characterCount",
    "characterCountLabel",
    "class",
    "for",
    "hideLabel",
    "size",
    "spread",
    "variant",
    "children",
    "bottom",
    "end",
    "endText",
    "label",
    "start",
    "startText",
    "top",
  )
  const resolvedBottom = children(() => props.bottom)
  const resolvedEnd = children(() => props.end)
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const resolvedStartText = children(() => props.startText)
  const resolvedTop = children(() => props.top)
  const hasLabel = () => Boolean(resolvedLabel())
  const hasStartText = () => Boolean(resolvedStartText())
  const hasEndText = () => Boolean(resolvedEndText() || props.characterCount)
  const startId = () => (resolvedStart() ? `${props.for}-start` : undefined)
  const endId = () => (resolvedEnd() ? `${props.for}-end` : undefined)
  const topId = () => (resolvedTop() ? `${props.for}-top` : undefined)
  const bottomId = () => (resolvedBottom() ? `${props.for}-bottom` : undefined)
  const startTextId = () =>
    hasStartText() ? `${props.for}-start-text` : undefined
  const endTextId = () => (hasEndText() ? `${props.for}-end-text` : undefined)

  return (
    <div
      class={[
        "ui-textarea",
        {
          "ui-auto-fit": props.autoFit,
          "ui-filled": props.variant === "filled",
          "ui-spread": props.spread,
        },
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
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}
      <span class="ui-field">
        {resolvedTop() && (
          <span class="ui-top" id={topId()}>
            {resolvedTop()}
          </span>
        )}
        {resolvedStart() && (
          <span class="ui-start" id={startId()}>
            {resolvedStart()}
          </span>
        )}
        {props.children}
        {resolvedEnd() && (
          <span class="ui-end" id={endId()}>
            {resolvedEnd()}
          </span>
        )}
        {resolvedBottom() && (
          <span class="ui-bottom" id={bottomId()}>
            {resolvedBottom()}
          </span>
        )}
      </span>
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
          {props.characterCount && (
            <opui-character-count
              aria-hidden="true"
              class="ui-value"
              label={props.characterCountLabel}
            />
          )}
        </span>
      )}
    </div>
  )
}
