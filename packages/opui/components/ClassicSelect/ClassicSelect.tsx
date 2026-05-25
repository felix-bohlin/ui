import { splitProps, type JSX, Show, createUniqueId, For } from "solid-js"
import type { ClassicSelectProps } from "./types.solid"

export default function ClassicSelect(props: ClassicSelectProps) {
  const [local, rest] = splitProps(props, [
    "items",
    "variant",
    "id",
    "label",
    "disabled",
    "name",
    "required",
    "size",
    "endText",
    "critical",
    "class",
    "children",
  ])

  const selectId = () => local.id || createUniqueId()
  const labelId = createUniqueId()

  const items = () => local.items || []

  return (
    <label
      class={`ui-select ${local.size ? `ui-${local.size}` : ""} ${local.variant === "filled" ? "ui-filled" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <Show when={local.label}>
        <span class="ui-label" id={labelId}>{local.label}</span>
      </Show>
      <span class="ui-field">
        <select
          aria-labelledby={local.label ? labelId : undefined}
          disabled={local.disabled}
          id={selectId()}
          name={local.name}
          required={local.required}
          {...rest}
        >
          <For each={items()}>
            {(item) => <option value={item.value}>{item.text}</option>}
          </For>
          {local.children}
        </select>
      </span>
      <Show when={local.endText}>
        <span class="ui-end-text">{local.endText}</span>
      </Show>
    </label>
  )
}
