import { createUniqueId, For, merge, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { ClassicSelectProps } from "./types.solid"

export default function ClassicSelect(rawProps: ClassicSelectProps) {
  const props = merge({ items: [], variant: "outlined" }, rawProps)
  const fieldGroup = useContext(FieldGroupContext)
  const rest = omit(
    props,
    "children",
    "class",
    "endText",
    "error",
    "id",
    "items",
    "label",
    "name",
    "size",
    "value",
    "variant",
  )

  const uid = createUniqueId()
  const endTextUid = createUniqueId()
  const selectId = () => props.id || uid
  const endTextId = () => (props.endText ? endTextUid : undefined)

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
        <span class="ui-label">{props.label}</span>
      </Show>
      <span class="ui-field">
        <select
          aria-describedby={endTextId()}
          aria-invalid={props.error ? "true" : undefined}
          id={selectId()}
          name={props.name ?? fieldGroup.name}
          {...rest}
        >
          <For each={props.items}>
            {(item) => (
              <option
                selected={item.value === props.value || undefined}
                value={item.value}
              >
                {item.text}
              </option>
            )}
          </For>
          {props.children}
        </select>
      </span>
      <Show when={props.endText}>
        <span class="ui-end-text" id={endTextId()}>
          {props.endText}
        </span>
      </Show>
    </label>
  )
}
