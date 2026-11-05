/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import "../../elements/character-count.js"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultValueProp } from "../solid"
import type { Props } from "./types.solid"

export default function Textarea(props: Props) {
  const rest = omit(
    props,
    "aria-invalid",
    "autoFit",
    "characterCount",
    "characterCountLabel",
    "class",
    "error",
    "hideLabel",
    "id",
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

  return (
    <label
      class={[
        "ui-textarea",
        {
          "ui-auto-fit": props.autoFit,
          "ui-filled": props.variant === "filled",
          "ui-spread": props.spread,
        },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      {props.label && (
        <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
          {props.label}
        </span>
      )}{" "}
      {props.startText && <span class="ui-start-text">{props.startText}</span>}{" "}
      <span class="ui-field">
        <textarea
          {...rest}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          id={props.id}
          name={props.name ?? field?.name}
          {...defaultValueProp(() => props.value)}
        />{" "}
        {props.start && <span class="ui-start">{props.start}</span>}{" "}
        {props.end && <span class="ui-end">{props.end}</span>}{" "}
        {props.top && <span class="ui-top">{props.top}</span>}{" "}
        {props.bottom && <span class="ui-bottom">{props.bottom}</span>}
      </span>{" "}
      {(props.endText || props.characterCount) && (
        <span class="ui-end-text">
          {props.endText}
          {props.characterCount && (
            <opui-character-count
              aria-hidden="true"
              class="ui-value"
              label={props.characterCountLabel}
            />
          )}
        </span>
      )}{" "}
      {props.children}
    </label>
  )
}
