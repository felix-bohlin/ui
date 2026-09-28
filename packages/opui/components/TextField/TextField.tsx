import { createUniqueId, merge, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { Props } from "./types.solid"

export default function TextField(rawProps: Props) {
  const props = merge({ type: "text" }, rawProps)
  const fieldGroup = useContext(FieldGroupContext)
  const rest = omit(
    props,
    "autoFit",
    "children",
    "class",
    "description",
    "endText",
    "error",
    "filled",
    "footer",
    "header",
    "id",
    "label",
    "name",
    "prefix",
    "small",
    "spread",
    "startText",
    "suffix",
    "supportingText",
    "type",
  )

  const uid = createUniqueId()
  const fieldId = () => props.id || uid
  const isNumeric = () => props.type === "numeric"
  const startTextValue = () => props.description || props.startText

  return (
    <label
      class={[
        "ui-text-field",
        {
          "ui-auto-fit": !!props.autoFit,
          "ui-filled": !!props.filled,
          "ui-spread": !!props.spread,
          "ui-small": !!props.small,
        },
        props.class,
      ]}
      data-invalid={props.error ? "true" : undefined}
    >
      <Show when={props.label}>
        <span class="ui-label">{props.label}</span>
      </Show>

      <Show when={startTextValue()}>
        <span class="ui-start-text">{startTextValue()}</span>
      </Show>

      <span class="ui-field">
        <input
          id={fieldId()}
          name={props.name ?? fieldGroup.name}
          inputmode={isNumeric() ? "numeric" : undefined}
          pattern={isNumeric() ? "[0-9]*" : undefined}
          type={isNumeric() ? "text" : props.type}
          {...rest}
        />
        <Show when={props.prefix}>
          <span class="ui-prefix">{props.prefix}</span>
        </Show>
        <Show when={props.suffix}>
          <span class="ui-suffix">{props.suffix}</span>
        </Show>
        <Show when={props.header}>
          <span class="ui-header">{props.header}</span>
        </Show>
        <Show when={props.footer}>
          <span class="ui-footer">{props.footer}</span>
        </Show>
      </span>

      <Show when={props.endText || props.supportingText}>
        <span class="ui-end-text">
          {props.endText}
          {props.supportingText}
        </span>
      </Show>

      {props.children}
    </label>
  )
}
