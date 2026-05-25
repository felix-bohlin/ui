import { splitProps, type JSX, Show, createUniqueId, For } from "solid-js"
import type { RangeProps } from "./types.solid"

export default function Range(props: RangeProps) {
  const [local, rest] = splitProps(props, [
    "variant",
    "spread",
    "class",
    "id",
    "label",
    "valueSuffix",
    "valueText",
    "startText",
    "endText",
    "list",
    "options",
    "datalist",
    "value",
    "children",
  ])

  const inputId = () => local.id || createUniqueId()
  const labelId = createUniqueId()
  const startTextId = createUniqueId()
  const endTextId = createUniqueId()

  const describedBy = () => {
    return [
      local.startText ? startTextId : undefined,
      local.endText ? endTextId : undefined,
    ].filter(Boolean).join(" ") || undefined
  }

  return (
    <label
      class={`ui-range ${local.variant ? `ui-${local.variant}` : ""} ${local.spread ? "ui-spread" : ""} ${local.class || ""}`.trim()}
    >
      <Show when={local.label || local.children}>
        <span class="ui-label" id={labelId}>
          {local.children || local.label}
        </span>
      </Show>

      <Show when={local.valueSuffix !== undefined || local.valueText !== undefined}>
        <output class="ui-value" for={inputId()} data-suffix={local.valueSuffix}>
          {local.valueText ?? local.value}
        </output>
      </Show>

      <Show when={local.startText}>
        <span class="ui-start-text" id={startTextId}>
          {local.startText}
        </span>
      </Show>

      <input
        type="range"
        id={inputId()}
        aria-describedby={describedBy()}
        aria-labelledby={labelId}
        list={local.list}
        value={local.value}
        {...rest}
      />

      <Show when={local.options || local.datalist}>
        <datalist id={local.list}>
          <Show when={local.options}>
            <For each={local.options}>
              {(option) => (
                <option
                  value={typeof option === "object" ? option.value : option}
                  label={typeof option === "object" ? option.label : undefined}
                />
              )}
            </For>
          </Show>
          {local.datalist}
        </datalist>
      </Show>

      <Show when={local.endText}>
        <span class="ui-end-text" id={endTextId}>
          {local.endText}
        </span>
      </Show>
    </label>
  )
}
