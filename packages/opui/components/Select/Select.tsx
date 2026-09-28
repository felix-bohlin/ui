import { createUniqueId, For, merge, omit, Show, useContext } from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { Props } from "./types.solid"

export default function Select(rawProps: Props) {
  const props = merge({ items: [], variant: "outlined" }, rawProps)
  const fieldGroup = useContext(FieldGroupContext)
  const rest = omit(
    props,
    "children",
    "class",
    "dense",
    "description",
    "endText",
    "error",
    "footer",
    "header",
    "id",
    "items",
    "label",
    "name",
    "prefix",
    "size",
    "spread",
    "suffix",
    "variant",
  )

  const uid = createUniqueId()
  const labelId = createUniqueId()
  const endTextId = createUniqueId()

  const selectId = () => props.id ?? uid

  return (
    <label
      class={[
        "ui-select",
        props.size && `ui-${props.size}`,
        {
          "ui-filled": props.variant === "filled",
          "ui-spread": !!props.spread,
        },
        props.class,
      ]}
      data-invalid={props.error || undefined}
    >
      <Show when={props.label}>
        <span class="ui-label" id={labelId}>
          {props.label}
        </span>
      </Show>
      <Show when={props.description}>
        <span class="ui-start-text">{props.description}</span>
      </Show>
      <span class="ui-field">
        <select
          aria-labelledby={props.label ? labelId : undefined}
          id={selectId()}
          name={props.name ?? fieldGroup.name}
          {...rest}
        >
          <button>
            <selectedcontent></selectedcontent>
          </button>
          <div class={["ui-list", { "ui-dense": !!props.dense }]}>
            <For each={props.items}>
              {(item) => <option value={item.value}>{item.text}</option>}
            </For>
            {props.children}
          </div>
        </select>
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
      <Show when={props.endText}>
        <span id={endTextId} class="ui-end-text">
          {props.endText}
        </span>
      </Show>
    </label>
  )
}
