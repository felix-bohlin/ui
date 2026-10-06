import {
  createSignal,
  createUniqueId,
  For,
  omit,
  Show,
  useContext,
} from "solid-js"
import { FieldGroupContext } from "../FieldGroup/context"
import type { RangeProps } from "./types.solid"

export default function Range(props: RangeProps) {
  const fieldGroup = useContext(FieldGroupContext)
  const rest = omit(
    props,
    "children",
    "class",
    "datalist",
    "endText",
    "error",
    "id",
    "label",
    "list",
    "name",
    "options",
    "spread",
    "startText",
    "value",
    "valueSuffix",
    "valueText",
    "variant",
  )

  const uid = createUniqueId()
  const labelUid = createUniqueId()
  const startTextUid = createUniqueId()
  const endTextUid = createUniqueId()

  const [current, setCurrent] = createSignal(() => props.value)

  const hasLabel = () => !!(props.label || props.children)
  const hasStartText = () => !!props.startText
  const hasEndText = () => !!props.endText
  const hasValue = () =>
    props.valueSuffix !== undefined || props.valueText !== undefined

  const defaultValue = () => {
    const min = Number(props.min ?? 0)
    const max = Math.max(min, Number(props.max ?? 100))
    const step = props.step === "any" ? 0 : Number(props.step ?? 1)
    const middle = min + (max - min) / 2
    if (!step) return middle
    const value = min + Math.round((middle - min) / step) * step
    return value > max ? value - step : value
  }

  const inputId = () => props.id || (hasValue() ? uid : undefined)
  const labelId = () => (hasLabel() ? labelUid : undefined)
  const startTextId = () => (hasStartText() ? startTextUid : undefined)
  const endTextId = () => (hasEndText() ? endTextUid : undefined)

  const describedBy = () =>
    [startTextId(), endTextId()].filter(Boolean).join(" ") || undefined

  return (
    <label
      class={[
        "ui-range",
        props.variant && `ui-${props.variant}`,
        { "ui-spread": props.spread },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
      onInput={(event) => {
        if (event.target instanceof HTMLInputElement) {
          setCurrent(event.target.value)
        }
      }}
    >
      <Show when={hasLabel()}>
        <span class="ui-label" id={labelId()}>
          {props.label}
          {props.children}
        </span>
      </Show>
      <Show when={hasValue()}>
        <output
          class="ui-value"
          data-suffix={props.valueSuffix}
          for={inputId()}
        >
          {props.valueText ??
            `${current() ?? defaultValue()}${props.valueSuffix ?? ""}`}
        </output>
      </Show>
      <Show when={hasStartText()}>
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      </Show>
      <input
        aria-describedby={describedBy()}
        aria-invalid={props.error ? "true" : undefined}
        aria-labelledby={labelId()}
        id={inputId()}
        list={props.list}
        name={props.name ?? fieldGroup.name}
        type="range"
        value={props.value}
        {...rest}
      />
      <Show when={props.options || props.datalist}>
        <datalist id={props.list}>
          <For each={props.options}>
            {(option) =>
              typeof option === "object" ? (
                <option value={option.value} label={option.label} />
              ) : (
                <option value={option} />
              )
            }
          </For>
          {props.datalist}
        </datalist>
      </Show>
      <Show when={hasEndText()}>
        <span class="ui-end-text" id={endTextId()}>
          {props.endText}
        </span>
      </Show>
    </label>
  )
}
