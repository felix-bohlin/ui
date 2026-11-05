/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { createUniqueId, omit } from "solid-js"
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import Button from "../Button/Button.solid"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { defaultValueProp } from "../solid"
import { createIds, idRefs } from "../id"
import { hidePath, showPath } from "./icons"
import type { Props } from "./types.solid"

export default function TextField(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "autoFit",
    "characterCount",
    "characterCountLabel",
    "class",
    "error",
    "hideLabel",
    "id",
    "inputmode",
    "name",
    "passwordToggle",
    "passwordToggleLabel",
    "pattern",
    "size",
    "spread",
    "style",
    "type",
    "variant",
    "children",
    "bottom",
    "end",
    "endText",
    "iconChecked",
    "iconUnchecked",
    "label",
    "start",
    "startText",
    "top",
  )
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const passwordToggleLabel = () => props.passwordToggleLabel ?? "Show password"
  const type = () => props.type ?? "text"
  const ids = () => createIds(uid, "text-field", props.id)
  const root = () => (props.passwordToggle ? "opui-text-field" : "label")
  const Root = dynamic(root)
  const labelTag = () => (props.passwordToggle ? "label" : "span")
  const Label = dynamic(labelTag)
  const hasStartText = () => Boolean(props.startText)
  const hasEndText = () => Boolean(props.endText || props.characterCount)
  const inputId = () => (props.passwordToggle ? ids()() : props.id)
  const startTextId = () =>
    props.passwordToggle && hasStartText() ? ids()("start-text") : undefined
  const endTextId = () =>
    props.passwordToggle && hasEndText() ? ids()("end-text") : undefined

  return (
    <Root
      class={[
        "ui-text-field",
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
        <Label
          class={[props.hideLabel ? "ui-sr-only" : "ui-label"]}
          for={props.passwordToggle ? inputId() : undefined}
        >
          {props.label}
        </Label>
      )}{" "}
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {props.startText}
        </span>
      )}{" "}
      <span class="ui-field">
        <input
          {...rest}
          aria-describedby={idRefs(
            startTextId(),
            endTextId(),
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          id={inputId()}
          inputmode={
            props.inputmode ?? (type() === "numeric" ? "numeric" : undefined)
          }
          name={props.name ?? field?.name}
          pattern={
            props.pattern ?? (type() === "numeric" ? "[0-9]*" : undefined)
          }
          type={type() === "numeric" ? "text" : type()}
          {...defaultValueProp(props.value)}
        />{" "}
        {props.start && <span class="ui-start">{props.start}</span>}{" "}
        {(props.end || props.passwordToggle) && (
          <span class="ui-end">
            {props.end}
            {props.passwordToggle && (
              <Button
                aria-label={passwordToggleLabel()}
                aria-pressed="false"
                command="--toggle-password"
                commandfor={inputId()}
                round
              >
                {props.iconUnchecked ? (
                  <span aria-hidden="true" class="ui-icon-unchecked">
                    {props.iconUnchecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    class="ui-icon-unchecked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="currentColor" d={showPath} />
                  </svg>
                )}
                {props.iconChecked ? (
                  <span aria-hidden="true" class="ui-icon-checked">
                    {props.iconChecked}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    class="ui-icon-checked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path fill="currentColor" d={hidePath} />
                  </svg>
                )}
              </Button>
            )}
          </span>
        )}{" "}
        {props.top && <span class="ui-top">{props.top}</span>}{" "}
        {props.bottom && <span class="ui-bottom">{props.bottom}</span>}
      </span>{" "}
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
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
    </Root>
  )
}
