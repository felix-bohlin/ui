/** @jsxImportSource @solidjs/web */
import { createUniqueId, omit } from "solid-js"
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
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const ids = () => createIds(uid, "range", props.id || undefined)
  const hasLabel = () => !!props.label || props.label
  const hasStartText = () => !!props.startText || props.startText
  const hasEndText = () => !!props.endText || props.endText
  const hasValueText = () => props.valueText
  const hasValue = () => props.valueSuffix !== undefined || hasValueText()
  const hasDatalist = () => !!props.items || props.datalist
  const readout = () =>
    `${props.value ?? defaultValue({ max: props.max, min: props.min, step: props.step })}${props.valueSuffix ?? ""}`
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
          {props.label}
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
          {props.valueText === undefined ? readout() : props.valueText}
        </output>
      )}{" "}
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      )}{" "}
      <input
        {...rest}
        aria-describedby={describedBy()}
        aria-invalid={props.error ? "true" : props["aria-invalid"]}
        aria-labelledby={labelId() ?? props["aria-labelledby"]}
        aria-valuetext={
          props["aria-valuetext"] ??
          (props.valueSuffix && !hasValueText() ? readout() : undefined)
        }
        id={inputId()}
        list={listId()}
        max={props.max}
        min={props.min}
        name={props.name ?? field?.name}
        step={props.step}
        type="range"
        {...defaultValueProp(props.value)}
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
          {props.datalist}
        </datalist>
      )}{" "}
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {props.endText}
        </span>
      )}
    </label>
  )
}
