/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import "../../elements/number-field.js"
import type { Props } from "./types.solid"

export default function NumberField(props: Props) {
  const rest = omit(
    props,
    "class",
    "decreaseLabel",
    "for",
    "hideLabel",
    "increaseLabel",
    "size",
    "spread",
    "stretch",
    "variant",
    "children",
    "decreaseIcon",
    "endText",
    "increaseIcon",
    "label",
    "startText",
  )
  const resolvedDecreaseIcon = children(() => props.decreaseIcon)
  const resolvedEndText = children(() => props.endText)
  const resolvedIncreaseIcon = children(() => props.increaseIcon)
  const resolvedLabel = children(() => props.label)
  const resolvedStartText = children(() => props.startText)
  const decreaseLabel = () =>
    props.decreaseLabel === undefined ? "Decrease" : props.decreaseLabel
  const increaseLabel = () =>
    props.increaseLabel === undefined ? "Increase" : props.increaseLabel
  const startTextId = () =>
    resolvedStartText() ? `${props.for}-start-text` : undefined
  const endTextId = () =>
    resolvedEndText() ? `${props.for}-end-text` : undefined

  return (
    <opui-number-field
      class={[
        "ui-number-field",
        {
          "ui-filled": props.variant === "filled",
          "ui-spread": props.spread,
          "ui-stretch": props.stretch,
        },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      {resolvedLabel() && (
        <label
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          for={props.for}
        >
          {resolvedLabel()}
        </label>
      )}
      {resolvedStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}
      <span class="ui-field">
        <span class="ui-start">
          <button
            class="ui-button ui-round"
            type="button"
            aria-controls={props.for}
            aria-label={decreaseLabel()}
            command="--step-down"
            commandfor={props.for}
          >
            {resolvedDecreaseIcon() === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              />
            ) : (
              resolvedDecreaseIcon()
            )}
          </button>
        </span>
        {props.children}
        <span class="ui-end">
          <button
            class="ui-button ui-round"
            type="button"
            aria-controls={props.for}
            aria-label={increaseLabel()}
            command="--step-up"
            commandfor={props.for}
          >
            {resolvedIncreaseIcon() === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              />
            ) : (
              resolvedIncreaseIcon()
            )}
          </button>
        </span>
      </span>
      {resolvedEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </opui-number-field>
  )
}
