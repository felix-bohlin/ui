/** @jsxImportSource @solidjs/web */
import { omit, untrack } from "solid-js"
import CheckboxInput from "./CheckboxInput.solid"
import { hasName, warnUnnamed } from "../dev"
import type { Props } from "./types.solid"

export default function Checkbox(props: Props) {
  const rest = omit(
    props,
    "aria-invalid",
    "card",
    "class",
    "error",
    "hideLabel",
    "label",
    "orientation",
    "size",
    "spread",
    "style",
    "variant",
    "children",
    "endText",
  )
  untrack(() => {
    warnUnnamed(
      "Checkbox",
      hasName({ ...rest, label: props.label }, props.children),
    )
  })

  return (
    <label
      class={[
        "ui-checkbox",
        { "ui-card": props.card, "ui-spread": props.spread },
        props.card &&
          props.variant &&
          props.variant !== "outlined" &&
          `ui-${props.variant}`,
        props.orientation &&
          props.orientation !== "horizontal" &&
          `ui-${props.orientation}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      <CheckboxInput
        {...rest}
        aria-invalid={props.error ? "true" : props["aria-invalid"]}
      />{" "}
      {(props.label || props.children) && (
        <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
          {props.label}
          {props.children}
        </span>
      )}{" "}
      {props.endText && <span class="ui-end-text">{props.endText}</span>}
    </label>
  )
}
