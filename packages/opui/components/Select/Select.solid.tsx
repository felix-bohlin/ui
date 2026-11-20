/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, For, omit, untrack } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { SelectItem } from "./types"
import { fieldDescribedBy } from "../id"
import { sameValue } from "./selection"
import { control, optionSelected } from "../solid"
import type { Props } from "./types.solid"

export default function Select(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "autoFit",
    "class",
    "defaultValue",
    "dense",
    "error",
    "hideLabel",
    "id",
    "items",
    "name",
    "ref",
    "size",
    "spread",
    "style",
    "value",
    "variant",
    "children",
    "bottom",
    "end",
    "endText",
    "label",
    "start",
    "startText",
    "top",
  )
  const resolvedBottom = children(() => props.bottom)
  const resolvedEnd = children(() => props.end)
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const resolvedStartText = children(() => props.startText)
  const resolvedTop = children(() => props.top)
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const valueControl = control(
    "value",
    () => props.value,
    untrack(() => props.value ?? props.defaultValue),
  )
  const value = () => props.value ?? props.defaultValue
  const items = () => (props.items === undefined ? [] : props.items)
  const variant = () =>
    props.variant === undefined ? "outlined" : props.variant
  const base = () => props.id || `select-${uid}`
  const startTextId = () =>
    resolvedStartText() ? `${base()}-start-text` : undefined
  const endTextId = () => (resolvedEndText() ? `${base()}-end-text` : undefined)
  const startId = () => (resolvedStart() ? `${base()}-start` : undefined)
  const endId = () => (resolvedEnd() ? `${base()}-end` : undefined)
  const topId = () => (resolvedTop() ? `${base()}-top` : undefined)
  const bottomId = () => (resolvedBottom() ? `${base()}-bottom` : undefined)
  const describedBy = () =>
    fieldDescribedBy(
      {
        bottom: bottomId(),
        end: endId(),
        endText: endTextId(),
        start: startId(),
        startText: startTextId(),
        top: topId(),
      },
      props["aria-describedby"],
    )
  const isSelected = (item: SelectItem) => {
    const current = value()
    return current === undefined
      ? item.selected
      : Array.isArray(current)
        ? current.some((selected) => sameValue(selected, item.value))
        : sameValue(item.value, current)
  }
  const hasLabel = () => Boolean(resolvedLabel())
  const selectId = () => (hasLabel() ? base() : props.id)

  return (
    <div
      class={[
        "ui-select",
        {
          "ui-auto-fit": props.autoFit,
          "ui-filled": variant() === "filled",
          "ui-spread": props.spread,
        },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      {hasLabel() && (
        <label
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          for={selectId()}
        >
          {resolvedLabel()}
        </label>
      )}
      {resolvedStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}
      <span class="ui-field">
        {resolvedTop() && (
          <span class="ui-top" id={topId()}>
            {resolvedTop()}
          </span>
        )}
        {resolvedStart() && (
          <span class="ui-start" id={startId()}>
            {resolvedStart()}
          </span>
        )}
        <select
          {...valueControl.server}
          ref={[props.ref, valueControl.ref]}
          {...rest}
          aria-describedby={describedBy()}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={props["aria-labelledby"]}
          id={selectId()}
          name={props.name ?? field?.name}
        >
          <button inert>
            <selectedcontent />
          </button>
          <div class={["ui-list", { "ui-dense": props.dense }]}>
            <For each={items()} keyed={(item) => item.value}>
              {(item) => {
                const itemSelected = optionSelected(
                  untrack(() => isSelected(item()) || undefined),
                )
                return (
                  <option
                    {...itemSelected.server}
                    ref={itemSelected.ref}
                    value={item().value}
                  >
                    {item().label}
                  </option>
                )
              }}
            </For>
            {props.children}
          </div>
        </select>
        {resolvedEnd() && (
          <span class="ui-end" id={endId()}>
            {resolvedEnd()}
          </span>
        )}
        {resolvedBottom() && (
          <span class="ui-bottom" id={bottomId()}>
            {resolvedBottom()}
          </span>
        )}
      </span>
      {resolvedEndText() && (
        <span id={endTextId()} class="ui-end-text">
          {resolvedEndText()}
        </span>
      )}
    </div>
  )
}
