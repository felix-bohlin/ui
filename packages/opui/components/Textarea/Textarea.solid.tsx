/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, omit } from "solid-js"
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
  const resolvedBottom = children(() => props.bottom)
  const resolvedEnd = children(() => props.end)
  const resolvedEndText = children(() => props.endText)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const resolvedStartText = children(() => props.startText)
  const resolvedTop = children(() => props.top)
  const field = useFieldGroupContext()
  const root = () => (resolvedLabel() ? "label" : "div")
  const Root = dynamic(root)

  return (
    <Root
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
      {resolvedLabel() && (
        <span class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}>
          {resolvedLabel()}
        </span>
      )}{" "}
      {resolvedStartText() && (
        <span class="ui-start-text">{resolvedStartText()}</span>
      )}{" "}
      <span class="ui-field">
        <textarea
          {...rest}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          id={props.id}
          name={props.name ?? field?.name}
          {...defaultValueProp(() => props.value)}
        />{" "}
        {resolvedStart() && <span class="ui-start">{resolvedStart()}</span>}{" "}
        {resolvedEnd() && <span class="ui-end">{resolvedEnd()}</span>}{" "}
        {resolvedTop() && <span class="ui-top">{resolvedTop()}</span>}{" "}
        {resolvedBottom() && <span class="ui-bottom">{resolvedBottom()}</span>}
      </span>{" "}
      {(resolvedEndText() || props.characterCount) && (
        <span class="ui-end-text">
          {resolvedEndText()}
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
    </Root>
  )
}
