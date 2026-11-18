/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, omit, untrack } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { fieldDescribedBy } from "../id"
import { bound } from "../solid"
import type { Props } from "./types.solid"

export default function OneTimeCode(props: Props) {
  const rest = omit(
    props,
    "alphanumeric",
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "autocapitalize",
    "class",
    "error",
    "grouped",
    "id",
    "inputmode",
    "length",
    "name",
    "pattern",
    "ref",
    "size",
    "spellcheck",
    "style",
    "value",
    "endText",
    "label",
  )
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const initialValue = untrack(() => props.value)
  const valueRef = bound("value", () => props.value)
  const length = () => (props.length === undefined ? 6 : props.length)
  const hasLabel = () => Boolean(resolvedLabel())
  const hasEndText = () => Boolean(resolvedEndText())
  const base = () => props.id || `one-time-code-${uid}`
  const inputId = () => (hasLabel() ? base() : props.id)
  const endTextId = () => (hasEndText() ? `${base()}-end-text` : undefined)

  return (
    <div
      class={[
        "ui-one-time-code",
        { "ui-grouped": props.grouped },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      {hasLabel() && (
        <label class="ui-label" for={inputId()}>
          {resolvedLabel()}
        </label>
      )}
      <span class="ui-field">
        <input
          autocapitalize={
            props.autocapitalize ??
            (props.alphanumeric ? "characters" : undefined)
          }
          inputmode={
            props.inputmode ?? (props.alphanumeric ? undefined : "numeric")
          }
          pattern={
            props.pattern ??
            (props.alphanumeric
              ? `[A-Za-z0-9]{${length()}}`
              : `[0-9]{${length()}}`)
          }
          spellcheck={
            props.spellcheck ?? (props.alphanumeric ? "false" : undefined)
          }
          defaultValue={initialValue}
          ref={[props.ref, valueRef]}
          {...rest}
          aria-describedby={fieldDescribedBy(
            { endText: endTextId() },
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={props["aria-labelledby"]}
          autocomplete="one-time-code"
          id={inputId()}
          maxlength={length()}
          name={props.name ?? field?.name}
          type="text"
        />
      </span>
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </div>
  )
}
