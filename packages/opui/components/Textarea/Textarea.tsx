/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show, createUniqueId } from "solid-js"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const [local, rest] = splitProps(props, [
    "autoFit",
    "critical",
    "description",
    "endText",
    "filled",
    "label",
    "small",
    "spread",
    "prefix",
    "suffix",
    "header",
    "footer",
    "startText",
    "supportingText",
    "class",
    "children",
  ])

  const fieldId = () => rest.id || createUniqueId()

  return (
    <label
      class={`ui-textarea ${local.autoFit ? "ui-auto-fit" : ""} ${local.filled ? "ui-filled" : ""} ${local.spread ? "ui-spread" : ""} ${local.small ? "ui-small" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <Show when={local.label}>
        <span class="ui-label">{local.label}</span>
      </Show>

      <Show when={local.description}>
        <span class="ui-start-text">{local.description}</span>
      </Show>

      <span class="ui-field">
        <textarea
          id={fieldId()}
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
