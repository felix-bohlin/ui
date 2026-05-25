/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show, createUniqueId, For } from "solid-js"
import type { Props } from "./types.solid"

export default function Select(props: Props) {
  const [local, rest] = splitProps(props, [
    "critical",
    "dense",
    "description",
    "items",
    "label",
    "spread",
    "size",
    "endText",
    "variant",
    "class",
    "prefix",
    "suffix",
    "header",
    "footer",
    "children",
  ])

  const selectId = () => rest.id || createUniqueId()
  const labelId = createUniqueId()
  const endTextId = createUniqueId()
  const items = () => local.items || []

  return (
    <label
      class={`ui-select ${local.size ? `ui-${local.size}` : ""} ${local.variant === "filled" ? "ui-filled" : ""} ${local.spread ? "ui-spread" : ""} ${local.class || ""}`.trim()}
      data-invalid={local.critical || undefined}
    >
      <Show when={local.label}>
        <span class="ui-label" id={labelId}>{local.label}</span>
      </Show>

      <Show when={local.description}>
        <span class="ui-start-text">{local.description}</span>
      </Show>

      <span class="ui-field">
        <select
          aria-labelledby={local.label ? labelId : undefined}
          id={selectId()}
          {...rest}
        >
          {/* @ts-ignore: custom element */}
          <button v-pre>
            {/* @ts-ignore: custom element */}
            <selectedcontent></selectedcontent>
          </button>
          <div class={`ui-list ${local.dense ? "ui-dense" : ""}`.trim()}>
            <For each={items()}>
              {(item) => <option value={item.value}>{item.text}</option>}
            </For>
            {local.children}
          </div>
        </select>
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

      <Show when={local.endText}>
        <span id={endTextId} class="ui-end-text">{local.endText}</span>
      </Show>
    </label>
  )
}
