import { createUniqueId, For, merge, omit, Show } from "solid-js"
import type { ClassicSelectProps } from "./types.solid"

export default function ClassicSelect(rawProps: ClassicSelectProps) {
  const props = merge({ items: [], variant: "outlined" }, rawProps)
  const rest = omit(
    props,
    "children",
    "class",
    "endText",
    "error",
    "id",
    "items",
    "label",
    "size",
    "variant",
  )

  const uid = createUniqueId()
  const labelId = createUniqueId()

  const selectId = () => props.id ?? uid

  return (
    <label
      class={[
        "ui-select",
        props.size && `ui-${props.size}`,
        { "ui-filled": props.variant === "filled" },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
    >
      <Show when={props.label}>
        <span class="ui-label" id={labelId}>
          {props.label}
        </span>
      </Show>
      <span class="ui-field">
        <select
          aria-labelledby={props.label ? labelId : undefined}
          id={selectId()}
          {...rest}
        >
          <For each={props.items}>
            {(item) => <option value={item.value}>{item.text}</option>}
          </For>
          {props.children}
        </select>
      </span>
      <Show when={props.endText}>
        <span class="ui-end-text">{props.endText}</span>
      </Show>
    </label>
  )
}
