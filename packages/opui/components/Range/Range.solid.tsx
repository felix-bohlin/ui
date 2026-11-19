/** @jsxImportSource @solidjs/web */
import { children, createUniqueId, For, omit, untrack } from "solid-js"
import "../../css/js/range.js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { idRefs } from "../id"
import { formatValue, middleValue } from "./value"
import { control } from "../solid"
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
    "lang",
    "list",
    "max",
    "min",
    "name",
    "ref",
    "size",
    "spread",
    "step",
    "style",
    "value",
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
  const valueControl = control(
    "value",
    () => props.value,
    untrack(() => props.value),
  )
  const value = () => props.value ?? props.defaultValue
  const base = () => props.id || `range-${uid}`
  const hasLabel = () => !!resolvedLabel()
  const hasStartText = () => !!resolvedStartText()
  const hasEndText = () => !!resolvedEndText()
  const hasValueText = () => resolvedValueText()
  const hasValue = () => props.valueSuffix !== undefined || hasValueText()
  const hasDatalist = () => !!props.items || resolvedDatalist()
  const current = () =>
    value() ?? middleValue({ max: props.max, min: props.min, step: props.step })
  const readout = () =>
    `${formatValue(current(), { lang: props.lang, min: props.min, step: props.step })}${props.valueSuffix ?? ""}`
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
  const inputId = () => props.id || (hasValue() ? base() : undefined)
  const labelId = () => (hasLabel() ? `${base()}-label` : undefined)
  const startTextId = () =>
    hasStartText() ? `${base()}-start-text` : undefined
  const endTextId = () => (hasEndText() ? `${base()}-end-text` : undefined)
  const listId = () =>
    props.list ?? (hasDatalist() ? `${base()}-list` : undefined)
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
      lang={props.lang}
      style={props.style}
    >
      {hasLabel() && (
        <span
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          id={labelId()}
        >
          {resolvedLabel()}
        </span>
      )}
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
      )}
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}
      <input
        {...valueControl.server}
        ref={[props.ref, valueControl.ref]}
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
      />
      {hasDatalist() && (
        <datalist aria-hidden="true" id={listId()}>
          <For each={props.items} keyed={false}>
            {(item) => {
              const row = () => {
                const option = item()
                return typeof option === "object" ? (
                  <option value={option.value} label={option.label} />
                ) : (
                  <option value={option} />
                )
              }
              return <>{row()}</>
            }}
          </For>
          {resolvedDatalist()}
        </datalist>
      )}
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
        </span>
      )}
    </label>
  )
}
