/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, createUniqueId, omit } from "solid-js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import type { SelectItem } from "./types"
import { createIds, idRefs } from "../id"
import type { Props } from "./types.solid"

export default function Select(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "autoFit",
    "class",
    "dense",
    "error",
    "hideLabel",
    "id",
    "items",
    "name",
    "size",
    "spread",
    "style",
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
  const items = () => (props.items === undefined ? [] : props.items)
  const variant = () =>
    props.variant === undefined ? "outlined" : props.variant
  const selectedContent = () => "selectedcontent"
  const SelectedContent = dynamic(selectedContent)
  const ids = () => createIds(uid, "select", props.id)
  const labelId = () => ids()("label")
  const startTextId = () =>
    resolvedStartText() ? ids()("start-text") : undefined
  const endTextId = () => (resolvedEndText() ? ids()("end-text") : undefined)
  const topId = () => (resolvedTop() ? ids()("top") : undefined)
  const bottomId = () => (resolvedBottom() ? ids()("bottom") : undefined)
  const describedBy = () =>
    idRefs(
      topId(),
      startTextId(),
      endTextId(),
      bottomId(),
      props["aria-describedby"],
    )
  const isSelected = (item: SelectItem) =>
    props.value === undefined
      ? item.selected
      : Array.isArray(props.value)
        ? props.value.some((selected) => selected === item.value)
        : item.value === props.value

  return (
    <label
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
      {resolvedLabel() && (
        <span
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          id={labelId()}
        >
          {resolvedLabel()}
        </span>
      )}{" "}
      {resolvedStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}{" "}
      <span class="ui-field">
        <select
          {...rest}
          aria-describedby={describedBy()}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={
            resolvedLabel() ? labelId() : props["aria-labelledby"]
          }
          id={props.id}
          name={props.name ?? field?.name}
        >
          <button>
            <SelectedContent />
          </button>
          <div class={["ui-list", { "ui-dense": props.dense }]}>
            {items().map((item) => (
              <option
                selected={isSelected(item) || undefined}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
            {props.children}
          </div>
        </select>{" "}
        {resolvedStart() && <span class="ui-start">{resolvedStart()}</span>}{" "}
        {resolvedEnd() && <span class="ui-end">{resolvedEnd()}</span>}{" "}
        {resolvedTop() && (
          <span class="ui-top" id={topId()}>
            {resolvedTop()}
          </span>
        )}{" "}
        {resolvedBottom() && (
          <span class="ui-bottom" id={bottomId()}>
            {resolvedBottom()}
          </span>
        )}
      </span>{" "}
      {resolvedEndText() && (
        <span id={endTextId()} class="ui-end-text">
          {resolvedEndText()}
        </span>
      )}
    </label>
  )
}
