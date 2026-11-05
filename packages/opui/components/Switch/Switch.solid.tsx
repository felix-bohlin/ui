/** @jsxImportSource @solidjs/web */
import { children, omit, untrack } from "solid-js"
import SwitchInput from "./SwitchInput.solid"
import { hasName, warnUnnamed } from "../dev"
import type { Props } from "./types.solid"

export default function Switch(props: Props) {
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
    "iconChecked",
    "iconUnchecked",
  )
  const resolvedChildren = children(() => props.children)
  const resolvedEndText = children(() => props.endText)
  const resolvedIconChecked = children(() => props.iconChecked)
  const resolvedIconUnchecked = children(() => props.iconUnchecked)
  untrack(() => {
    warnUnnamed(
      "Switch",
      hasName({ ...rest, label: props.label }, resolvedChildren()),
    )
  })

  return (
    <label
      class={[
        "ui-switch",
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
      {resolvedIconUnchecked() && (
        <span class="ui-icon-unchecked" aria-hidden="true">
          {resolvedIconUnchecked()}
        </span>
      )}{" "}
      {resolvedIconChecked() && (
        <span class="ui-icon-checked" aria-hidden="true">
          {resolvedIconChecked()}
        </span>
      )}{" "}
      <SwitchInput
        {...rest}
        aria-invalid={props.error ? "true" : props["aria-invalid"]}
      />{" "}
      {(props.label || resolvedChildren()) && (
        <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
          {props.label}
          {resolvedChildren()}
        </span>
      )}{" "}
      {resolvedEndText() && (
        <span class="ui-end-text">{resolvedEndText()}</span>
      )}
    </label>
  )
}
