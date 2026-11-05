/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { mergeStyle } from "../style"
import type { Props } from "./types.solid"

export default function Rating(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "class",
    "clearLabel",
    "disabled",
    "error",
    "label",
    "max",
    "name",
    "required",
    "size",
    "starLabel",
    "style",
    "value",
  )
  const clearLabel = () => props.clearLabel ?? "No rating"
  const max = () => props.max ?? 5
  const starLabel = () =>
    props.starLabel ??
    ((value: number) => (value === 1 ? "1 star" : `${value} stars`))
  const count = () => Number(max())
  const stars = () => Array.from({ length: count() }, (_, index) => index + 1)
  const current = () => Number(props.value)
  const invalid = () => (props.error ? "true" : props["aria-invalid"])

  return (
    <>
      {props.name ? (
        <fieldset
          class={[
            "ui-rating",
            props.size && props.size !== "medium" && `ui-${props.size}`,
            props.class,
          ]}
          disabled={props.disabled}
          style={props.style}
          {...rest}
        >
          <legend>{props.label}</legend>
          {!props.required && (
            <input
              aria-describedby={props["aria-describedby"]}
              aria-invalid={invalid()}
              aria-label={clearLabel()}
              checked={current() === 0}
              name={props.name}
              type="radio"
              value="0"
            />
          )}
          {stars().map((star) => (
            <input
              aria-describedby={props["aria-describedby"]}
              aria-invalid={invalid()}
              aria-label={starLabel()(star)}
              checked={current() === star}
              name={props.name}
              required={props.required}
              type="radio"
              value={star}
            />
          ))}
        </fieldset>
      ) : (
        <meter
          aria-describedby={props["aria-describedby"]}
          aria-label={props.label}
          class={[
            "ui-rating",
            props.size && props.size !== "medium" && `ui-${props.size}`,
            props.class,
          ]}
          max={max()}
          style={mergeStyle(
            { "--_max": count() === 5 ? undefined : count() },
            props.style,
          )}
          value={props.value ?? 0}
          {...rest}
        />
      )}
    </>
  )
}
