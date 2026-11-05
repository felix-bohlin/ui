/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit } from "solid-js"
import "../../elements/number-field.js"
import Button from "../Button/Button.solid"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultValueProp } from "../solid"
import { createIds, idRefs } from "../id"
import { minusPath, plusPath } from "./icons"
import type { Props } from "./types.solid"

export default function NumberField(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "class",
    "decreaseLabel",
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
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const decreaseLabel = () => props.decreaseLabel ?? "Decrease"
  const increaseLabel = () => props.increaseLabel ?? "Increase"
  const ids = () => createIds(uid, "number-field", props.id)
  const inputId = () => ids()()
  const startTextId = () => (props.startText ? ids()("start-text") : undefined)
  const endTextId = () => (props.endText ? ids()("end-text") : undefined)

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
      {props.label && (
        <label
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          for={inputId()}
        >
          {props.label}
        </label>
      )}{" "}
      {props.startText && (
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      )}{" "}
      <span class="ui-field">
        <span class="ui-start">
          <Button
            aria-label={decreaseLabel()}
            command="--step-down"
            commandfor={inputId()}
            round
          >
            {props.decreaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={minusPath} />
              </svg>
            ) : (
              props.decreaseIcon
            )}
          </Button>
        </span>{" "}
        <input
          {...rest}
          aria-describedby={idRefs(
            startTextId(),
            endTextId(),
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          id={inputId()}
          name={props.name ?? field?.name}
          type="number"
          {...defaultValueProp(() => props.value)}
        />{" "}
        <span class="ui-end">
          <Button
            aria-label={increaseLabel()}
            command="--step-up"
            commandfor={inputId()}
            round
          >
            {props.increaseIcon === undefined ? (
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d={plusPath} />
              </svg>
            ) : (
              props.increaseIcon
            )}
          </Button>
        </span>
      </span>{" "}
      {props.endText && (
        <span class="ui-end-text" id={endTextId()}>
          {props.endText}
        </span>
      )}
    </opui-number-field>
  )
}
