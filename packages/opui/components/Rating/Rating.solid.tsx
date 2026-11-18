/** @jsxImportSource @solidjs/web */
import { For, omit, untrack } from "solid-js"
import { mergeStyle, pluralLabel } from "../style"
import { checkedProps, restoreChecked, seedChecked } from "../solid"
import type { Props } from "./types.solid"

export default function Rating(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-label",
    "class",
    "clearLabel",
    "defaultValue",
    "disabled",
    "error",
    "label",
    "lang",
    "max",
    "name",
    "onValueChange",
    "required",
    "size",
    "starLabel",
    "style",
    "value",
  )
  const clearLabel = () =>
    props.clearLabel === undefined ? "No rating" : props.clearLabel
  const max = () => (props.max === undefined ? 5 : props.max)
  const starLabel = () =>
    props.starLabel === undefined
      ? { one: "{count} star", other: "{count} stars" }
      : props.starLabel
  const count = () => Number(max())
  const stars = () => Array.from({ length: count() }, (_, index) => index + 1)
  const current = () => Number(props.value ?? props.defaultValue)
  const invalid = () => (props.error ? "true" : props["aria-invalid"])
  const initialChecked = untrack(() => current() === 0)

  return (
    <>
      {props.name ? (
        <fieldset
          aria-label={props["aria-label"]}
          class={[
            "ui-rating",
            props.size && props.size !== "medium" && `ui-${props.size}`,
            props.class,
          ]}
          disabled={props.disabled}
          lang={props.lang}
          style={props.style}
          {...rest}
        >
          <legend>{props.label}</legend>
          {!props.required && (
            <input
              aria-describedby={props["aria-describedby"]}
              aria-invalid={invalid()}
              aria-label={clearLabel()}
              {...checkedProps(
                props.value === undefined ? undefined : current() === 0,
                initialChecked,
              )}
              onChange={(event) => {
                props.onValueChange?.(0)
                restoreChecked(event.currentTarget, () => props.value)
              }}
              ref={seedChecked((input) => {
                props.onValueChange?.(0)
                restoreChecked(input, () => props.value)
              })}
              name={props.name}
              type="radio"
              value={0}
            />
          )}
          <For each={stars()} keyed={false}>
            {(star) => {
              const initialItemChecked = untrack(() => current() === star())
              return (
                <input
                  aria-describedby={props["aria-describedby"]}
                  aria-invalid={invalid()}
                  aria-label={pluralLabel(starLabel(), star(), props.lang)}
                  {...checkedProps(
                    props.value === undefined
                      ? undefined
                      : current() === star(),
                    initialItemChecked,
                  )}
                  onChange={(event) => {
                    props.onValueChange?.(star())
                    restoreChecked(event.currentTarget, () => props.value)
                  }}
                  ref={seedChecked((input) => {
                    props.onValueChange?.(star())
                    restoreChecked(input, () => props.value)
                  })}
                  name={props.name}
                  required={props.required}
                  type="radio"
                  value={star()}
                />
              )
            }}
          </For>
        </fieldset>
      ) : (
        <meter
          aria-describedby={props["aria-describedby"]}
          aria-label={props["aria-label"] ?? props.label}
          class={[
            "ui-rating",
            props.size && props.size !== "medium" && `ui-${props.size}`,
            props.class,
          ]}
          lang={props.lang}
          max={max()}
          style={mergeStyle(
            { "--_max": count() === 5 ? undefined : count() },
            props.style,
          )}
          value={props.value ?? props.defaultValue ?? 0}
          {...rest}
        />
      )}
    </>
  )
}
