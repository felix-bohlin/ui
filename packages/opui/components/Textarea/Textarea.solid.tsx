/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, omit } from "solid-js"
import "../../elements/character-count.js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { fieldDescribedBy } from "../id"
import { control } from "../solid"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "autoFit",
    "characterCount",
    "characterCountLabel",
    "class",
    "error",
    "hideLabel",
    "id",
    "name",
    "ref",
    "size",
    "spread",
    "style",
    "value",
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
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const valueControl = control("value", () => props.value)
  const base = () => props.id || `textarea-${uid}`
  const hasLabel = () => Boolean(resolvedLabel())
  const hasStartText = () => Boolean(resolvedStartText())
  const hasEndText = () => Boolean(resolvedEndText() || props.characterCount)
  const textareaId = () => (hasLabel() ? base() : props.id)
  const startId = () => (resolvedStart() ? `${base()}-start` : undefined)
  const endId = () => (resolvedEnd() ? `${base()}-end` : undefined)
  const topId = () => (resolvedTop() ? `${base()}-top` : undefined)
  const bottomId = () => (resolvedBottom() ? `${base()}-bottom` : undefined)
  const startTextId = () =>
    hasStartText() ? `${base()}-start-text` : undefined
  const endTextId = () => (hasEndText() ? `${base()}-end-text` : undefined)

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
      style={props.style}
    >
      {hasLabel() && (
        <label
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          for={textareaId()}
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
        <textarea
          {...valueControl.server}
          ref={[props.ref, valueControl.ref]}
          {...rest}
          aria-describedby={fieldDescribedBy(
            {
              bottom: bottomId(),
              end: endId(),
              endText: endTextId(),
              start: startId(),
              startText: startTextId(),
              top: topId(),
            },
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={props["aria-labelledby"]}
          id={textareaId()}
          name={props.name ?? field?.name}
        />
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
      {props.children}
    </div>
  )
}
