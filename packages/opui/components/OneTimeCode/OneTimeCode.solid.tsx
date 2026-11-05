/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
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
  const field = useFieldGroupContext()
  const length = () => props.length ?? 6

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
      {props.label && <span class="ui-label">{props.label}</span>}{" "}
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
      {props.endText && <span class="ui-end-text">{props.endText}</span>}
    </label>
  )
}
