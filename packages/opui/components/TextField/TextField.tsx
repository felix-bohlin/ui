import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import type { Props } from "./types.solid"

export default function TextField(props: Props) {
  const [local, rest] = splitProps(props, [
    "autoFit",
    "critical",
    "description",
    "endText",
    "filled",
    "label",
    "small",
    "spread",
    "startText",
    "type",
    "prefix",
    "suffix",
    "header",
    "footer",
    "supportingText",
    "class",
    "children",
  ])

  const fieldId = () => rest.id || createUniqueId()
  const startTextValue = () => local.description || local.startText
  const typeValue = () => local.type || "text"

  return (
    <label
      class={`ui-text-field ${local.autoFit ? "ui-auto-fit" : ""} ${local.filled ? "ui-filled" : ""} ${local.spread ? "ui-spread" : ""} ${local.small ? "ui-small" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <Show when={local.label}>
        <span class="ui-label">{local.label}</span>
      </Show>

      <Show when={startTextValue()}>
        <span class="ui-start-text">{startTextValue()}</span>
      </Show>

      <span class="ui-field">
        <input
          id={fieldId()}
          inputmode={typeValue() === "numeric" ? "numeric" : undefined}
          pattern={typeValue() === "numeric" ? "[0-9]*" : undefined}
          type={typeValue() === "numeric" ? "text" : typeValue()}
          {...rest}
        />
        <Show when={local.prefix}>
          <span class="ui-prefix">{local.prefix}</span>
        </Show>
        <Show when={local.suffix}>
          <span class="ui-suffix">{local.suffix}</span>
        </Show>
        <Show when={local.header}>
          <span class="ui-header">{local.header}</span>
        </Show>
        <Show when={local.footer}>
          <span class="ui-footer">{local.footer}</span>
        </Show>
      </span>

      <Show when={local.endText || local.supportingText}>
        <span class="ui-end-text">
          {local.endText}
          {local.supportingText}
        </span>
      </Show>

      {local.children}
    </label>
  )
}
