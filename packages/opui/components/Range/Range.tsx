import {
  createSignal,
  createUniqueId,
  For,
  omit,
  onSettled,
  Show,
} from "solid-js"
import type { RangeProps } from "./types.solid"

export default function Range(props: RangeProps) {
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

  let label: HTMLLabelElement | undefined
  const [current, setCurrent] = createSignal(() => props.value)

  const hasLabel = () => !!(props.label || props.children)
  const hasStartText = () => !!props.startText
  const hasEndText = () => !!props.endText
  const hasValue = () =>
    props.valueSuffix !== undefined || props.valueText !== undefined

  const inputId = () => props.id ?? (hasValue() ? uid : undefined)
  const labelId = () => (hasLabel() ? labelUid : undefined)
  const startTextId = () => (hasStartText() ? startTextUid : undefined)
  const endTextId = () => (hasEndText() ? endTextUid : undefined)

  const describedBy = () =>
    [startTextId(), endTextId()].filter(Boolean).join(" ") || undefined

  onSettled(() => {
    const input = label?.querySelector("input")
    if (input) setCurrent(input.value)
  })

  return (
    <label
      ref={(el) => (label = el)}
      class={[
        "ui-range",
        props.variant && `ui-${props.variant}`,
        { "ui-spread": !!props.spread },
        props.class,
      ]}
      data-invalid={props.error ? "" : undefined}
      onInput={(e) => {
        if (e.target instanceof HTMLInputElement) setCurrent(e.target.value)
      }}
    >
      <Show when={hasLabel()}>
        <span class="ui-label" id={labelId()}>
          {props.children ?? props.label}
        </span>
      </Show>
      <Show when={hasValue()}>
        <output
          class="ui-value"
          for={inputId()}
          data-suffix={props.valueSuffix}
        >
          {props.valueText ?? `${current() ?? ""}${props.valueSuffix ?? ""}`}
        </output>
      </Show>
      <Show when={hasStartText()}>
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      </Show>
      <input
        aria-describedby={describedBy()}
        aria-labelledby={labelId()}
        id={inputId()}
        list={props.list}
        type="range"
        {...rest}
        value={props.value}
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
