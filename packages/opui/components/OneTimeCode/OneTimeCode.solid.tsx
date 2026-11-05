/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultValueProp } from "../solid"
import type { Props } from "./types.solid"

export default function OneTimeCode(props: Props) {
  const rest = omit(
    props,
    "alphanumeric",
    "aria-invalid",
    "class",
    "error",
    "grouped",
    "length",
    "name",
    "size",
    "style",
    "endText",
    "label",
  )
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const field = useFieldGroupContext()
  const length = () => (props.length === undefined ? 6 : props.length)

  return (
    <label
      class={[
        "ui-text-field",
        "ui-one-time-code",
        { "ui-grouped": props.grouped },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      {resolvedLabel() && <span class="ui-label">{resolvedLabel()}</span>}{" "}
      <span class="ui-field">
        <input
          autocapitalize={props.alphanumeric ? "characters" : undefined}
          autocomplete="one-time-code"
          inputmode={props.alphanumeric ? undefined : "numeric"}
          pattern={
            props.alphanumeric
              ? `[A-Za-z0-9]{${length()}}`
              : `[0-9]{${length()}}`
          }
          spellcheck={props.alphanumeric ? "false" : undefined}
          {...rest}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          maxlength={length()}
          name={props.name ?? field?.name}
          type="text"
          {...defaultValueProp(() => props.value)}
        />
      </span>{" "}
      {resolvedEndText() && (
        <span class="ui-end-text">{resolvedEndText()}</span>
      )}
    </label>
  )
}
