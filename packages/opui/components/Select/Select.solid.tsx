/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { createUniqueId, omit } from "solid-js"
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
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const items = () => props.items ?? []
  const variant = () => props.variant ?? "outlined"
  const selectedContent = () => "selectedcontent"
  const SelectedContent = dynamic(selectedContent)
  const ids = () => createIds(uid, "select", props.id)
  const labelId = () => ids()("label")
  const startTextId = () => (props.startText ? ids()("start-text") : undefined)
  const endTextId = () => (props.endText ? ids()("end-text") : undefined)
  const topId = () => (props.top ? ids()("top") : undefined)
  const bottomId = () => (props.bottom ? ids()("bottom") : undefined)
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
      {props.label && (
        <span
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          id={labelId()}
        >
          {props.label}
        </span>
      )}{" "}
      {props.startText && (
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      )}{" "}
      <span class="ui-field">
        <select
          {...rest}
          aria-describedby={describedBy()}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={props.label ? labelId() : props["aria-labelledby"]}
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
        {props.start && <span class="ui-start">{props.start}</span>}{" "}
        {props.end && <span class="ui-end">{props.end}</span>}{" "}
        {props.top && (
          <span class="ui-top" id={topId()}>
            {props.top}
          </span>
        )}{" "}
        {props.bottom && (
          <span class="ui-bottom" id={bottomId()}>
            {props.bottom}
          </span>
        )}
      </span>{" "}
      {props.endText && (
        <span id={endTextId()} class="ui-end-text">
          {props.endText}
        </span>
      )}
    </label>
  )
}
