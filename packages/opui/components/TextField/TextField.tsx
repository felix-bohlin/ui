import { createUniqueId, merge, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { Props } from "./types.solid"

export default function TextField(rawProps: Props) {
  const props = merge({ type: "text" }, rawProps)
  const fieldGroup = useContext(FieldGroupContext)
  const rest = omit(
    props,
    "aria-describedby",
    "autoFit",
    "children",
    "class",
    "description",
    "endText",
    "error",
    "footer",
    "header",
    "label",
    "name",
    "prefix",
    "size",
    "spread",
    "startText",
    "style",
    "suffix",
    "supportingText",
    "type",
    "variant",
  )

  const uid = createUniqueId()
  const isNumeric = () => props.type === "numeric"
  const startTextValue = () => props.description || props.startText
  const hasEndText = () => !!(props.endText || props.supportingText)
  const endTextId = () => (hasEndText() ? uid : undefined)
  const describedBy = () =>
    [endTextId(), props["aria-describedby"]].filter(Boolean).join(" ") ||
    undefined

  return (
    <label
      class={[
        "ui-text-field",
        props.size && `ui-${props.size}`,
        {
          "ui-auto-fit": props.autoFit,
          "ui-filled": props.variant === "filled",
          "ui-spread": props.spread,
        },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
      style={props.style}
    >
      <Show when={props.label}>
        <span class="ui-label">{props.label}</span>
      </Show>

      <Show when={startTextValue()}>
        <span class="ui-start-text">{startTextValue()}</span>
      </Show>

      <span class="ui-field">
        <input
          aria-describedby={describedBy()}
          aria-invalid={props.error ? "true" : undefined}
          inputmode={isNumeric() ? "numeric" : undefined}
          name={props.name ?? fieldGroup.name}
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

      <Show when={hasEndText()}>
        <span class="ui-end-text" id={endTextId()}>
          {props.endText}
          {props.supportingText}
        </span>
      </Show>

      {props.children}
    </label>
  )
}
