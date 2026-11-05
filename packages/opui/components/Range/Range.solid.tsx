/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, omit } from "solid-js"
import "../../css/js/range.js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultValueProp } from "../solid"
import { createIds, idRefs } from "../id"
import { defaultValue } from "./value"
import type { Props } from "./types.solid"

export default function Range(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "aria-valuetext",
    "class",
    "error",
    "hideLabel",
    "id",
    "items",
    "list",
    "max",
    "min",
    "name",
    "size",
    "spread",
    "step",
    "style",
    "valueSuffix",
    "variant",
    "datalist",
    "endText",
    "label",
    "startText",
    "valueText",
  )
  const resolvedDatalist = children(() => props.datalist)
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const resolvedStartText = children(() => props.startText)
  const resolvedValueText = children(() => props.valueText)
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const ids = () => createIds(uid, "range", props.id || undefined)
  const hasLabel = () => !!resolvedLabel() || resolvedLabel()
  const hasStartText = () => !!resolvedStartText() || resolvedStartText()
  const hasEndText = () => !!resolvedEndText() || resolvedEndText()
  const hasValueText = () => resolvedValueText()
  const hasValue = () => props.valueSuffix !== undefined || hasValueText()
  const hasDatalist = () => !!props.items || resolvedDatalist()
  const current = () =>
    props.value ??
    defaultValue({ max: props.max, min: props.min, step: props.step })
  const readout = () => `${current()}${props.valueSuffix ?? ""}`
  const tick = () =>
    props.items?.find(
      (option) =>
        typeof option === "object" &&
        Number(option.value) === Number(current()),
    )
  const tickLabel = () => {
    const tickValue = tick()
    return props.valueSuffix || typeof tickValue !== "object"
      ? undefined
      : tickValue.label
  }
  const inputId = () => props.id || (hasValue() ? ids()() : undefined)
  const labelId = () => (hasLabel() ? ids()("label") : undefined)
  const startTextId = () => (hasStartText() ? ids()("start-text") : undefined)
  const endTextId = () => (hasEndText() ? ids()("end-text") : undefined)
  const listId = () => props.list ?? (hasDatalist() ? ids()("list") : undefined)
  const describedBy = () =>
    idRefs(startTextId(), endTextId(), props["aria-describedby"])

  return (
    <label
      class={[
        "ui-range",
        { "ui-spread": props.spread },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.variant && props.variant !== "outlined" && `ui-${props.variant}`,
        props.class,
      ]}
      for={hasValue() ? inputId() : undefined}
      style={props.style}
    >
      {hasLabel() && (
        <span
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          id={labelId()}
        >
          {resolvedLabel()}
        </span>
      )}{" "}
      {hasValue() && (
        <output
          aria-live="off"
          class="ui-value"
          data-live={hasValueText() ? undefined : ""}
          for={inputId()}
          data-suffix={props.valueSuffix}
        >
          {resolvedValueText() === undefined ? readout() : resolvedValueText()}
        </output>
      )}{" "}
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}{" "}
      <input
        {...rest}
        aria-describedby={describedBy()}
        aria-invalid={props.error ? "true" : props["aria-invalid"]}
        aria-labelledby={labelId() ?? props["aria-labelledby"]}
        aria-valuetext={
          props["aria-valuetext"] ??
          (props.valueSuffix && !hasValueText() ? readout() : tickLabel())
        }
        id={inputId()}
        list={listId()}
        max={props.max}
        min={props.min}
        name={props.name ?? field?.name}
        step={props.step}
        type="range"
        {...defaultValueProp(() => props.value)}
      />{" "}
      {hasDatalist() && (
        <datalist aria-hidden="true" id={listId()}>
          {props.items?.map((option) =>
            typeof option === "object" ? (
              <option value={option.value} label={option.label} />
            ) : (
              <option value={option} />
            ),
          )}
          {resolvedDatalist()}
        </datalist>
      )}{" "}
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </label>
  )
}
