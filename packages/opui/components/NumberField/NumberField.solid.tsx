/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, omit, untrack } from "solid-js"
import "../../elements/number-field.js"
import Button from "../Button/Button.solid"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { fieldDescribedBy } from "../id"
import type { Props } from "./types.solid"

export default function NumberField(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "class",
    "decreaseLabel",
    "disabled",
    "error",
    "hideLabel",
    "id",
    "increaseLabel",
    "name",
    "size",
    "spread",
    "stretch",
    "style",
    "variant",
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
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const decreaseLabel = () =>
    props.decreaseLabel === undefined ? "Decrease" : props.decreaseLabel
  const increaseLabel = () =>
    props.increaseLabel === undefined ? "Increase" : props.increaseLabel
  const base = () => props.id || `number-field-${uid}`
  const inputId = () => base()
  const startTextId = () =>
    resolvedStartText() ? `${base()}-start-text` : undefined
  const endTextId = () => (resolvedEndText() ? `${base()}-end-text` : undefined)

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
      style={props.style}
    >
      {resolvedLabel() && (
        <label
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          for={inputId()}
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
          <Button
            aria-controls={inputId()}
            aria-label={decreaseLabel()}
            command="--step-down"
            commandfor={inputId()}
            disabled={props.disabled}
            round
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
          </Button>
        </span>
        <input
          defaultValue={untrack(() => props.value)}
          {...rest}
          aria-describedby={fieldDescribedBy(
            { endText: endTextId(), startText: startTextId() },
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          disabled={props.disabled}
          id={inputId()}
          name={props.name ?? field?.name}
          type="number"
        />
        <span class="ui-end">
          <Button
            aria-controls={inputId()}
            aria-label={increaseLabel()}
            command="--step-up"
            commandfor={inputId()}
            disabled={props.disabled}
            round
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
          </Button>
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
