/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, createUniqueId, omit, untrack } from "solid-js"
import "../../elements/character-count.js"
import "../../elements/text-field.js"
import Button from "../Button/Button.solid"
import { useFieldGroupContext } from "../FieldGroup/context.solid"
import { fieldDescribedBy } from "../id"
import { control } from "../solid"
import type { Props } from "./types.solid"

export default function TextField(props: Props) {
  const rest = omit(
    props,
    "aria-describedby",
    "aria-invalid",
    "aria-labelledby",
    "autoFit",
    "characterCount",
    "characterCountLabel",
    "class",
    "disabled",
    "dropZone",
    "error",
    "hideLabel",
    "id",
    "name",
    "passwordToggle",
    "passwordToggleLabel",
    "ref",
    "size",
    "spread",
    "style",
    "type",
    "value",
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
  const resolvedBottom = children(() => props.bottom)
  const resolvedEnd = children(() => props.end)
  const resolvedEndText = children(() => props.endText)
  const resolvedIconChecked = children(() => props.iconChecked)
  const resolvedIconUnchecked = children(() => props.iconUnchecked)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const resolvedStartText = children(() => props.startText)
  const resolvedTop = children(() => props.top)
  const field = useFieldGroupContext()
  const uid = createUniqueId()
  const valueControl = control(
    "value",
    () => props.value,
    untrack(() => props.value),
  )
  const passwordToggleLabel = () =>
    props.passwordToggleLabel === undefined
      ? "Show password"
      : props.passwordToggleLabel
  const type = () => (props.type === undefined ? "text" : props.type)
  const base = () => props.id || `text-field-${uid}`
  const hasLabel = () => Boolean(resolvedLabel())
  const root = () => (props.passwordToggle ? "opui-text-field" : "div")
  const Root = dynamic(root)
  const hasStartText = () => Boolean(resolvedStartText())
  const hasEndText = () => Boolean(resolvedEndText() || props.characterCount)
  const inputId = () => (hasLabel() || props.passwordToggle ? base() : props.id)
  const startId = () => (resolvedStart() ? `${base()}-start` : undefined)
  const endId = () => (resolvedEnd() ? `${base()}-end` : undefined)
  const topId = () => (resolvedTop() ? `${base()}-top` : undefined)
  const bottomId = () => (resolvedBottom() ? `${base()}-bottom` : undefined)
  const startTextId = () =>
    hasStartText() ? `${base()}-start-text` : undefined
  const endTextId = () => (hasEndText() ? `${base()}-end-text` : undefined)

  return (
    <Root
      class={[
        "ui-text-field",
        {
          "ui-auto-fit": props.autoFit,
          "ui-drop-zone": props.dropZone,
          "ui-filled": props.variant === "filled",
          "ui-spread": props.spread,
        },
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      style={props.style}
    >
      {hasLabel() && (
        <label
          class={props.hideLabel ? "ui-sr-only" : "ui-label"}
          for={inputId()}
        >
          {resolvedLabel()}
        </label>
      )}
      {hasStartText() && (
        <span class="ui-start-text" id={startTextId()}>
          {resolvedStartText()}
        </span>
      )}
      <span class="ui-field">
        {resolvedTop() && (
          <span class="ui-top" id={topId()}>
            {resolvedTop()}
          </span>
        )}
        {resolvedStart() && (
          <span class="ui-start" id={startId()}>
            {resolvedStart()}
          </span>
        )}
        <input
          {...valueControl.server}
          ref={[props.ref, valueControl.ref]}
          {...rest}
          aria-describedby={fieldDescribedBy(
            {
              bottom: bottomId(),
              end: endId(),
              endText: endTextId(),
              start: startId(),
              startText: startTextId(),
              top: topId(),
            },
            props["aria-describedby"],
          )}
          aria-invalid={props.error ? "true" : props["aria-invalid"]}
          aria-labelledby={props["aria-labelledby"]}
          disabled={props.disabled}
          id={inputId()}
          name={props.name ?? field?.name}
          type={type()}
        />
        {(resolvedEnd() || props.passwordToggle) && (
          <span class="ui-end" id={endId()}>
            {resolvedEnd()}
            {props.passwordToggle && (
              <Button
                aria-label={passwordToggleLabel()}
                aria-pressed="false"
                command="--toggle-password"
                commandfor={inputId()}
                disabled={props.disabled}
                round
              >
                {resolvedIconUnchecked() ? (
                  <span aria-hidden="true" class="ui-icon-unchecked">
                    {resolvedIconUnchecked()}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    class="ui-icon-unchecked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
                {resolvedIconChecked() ? (
                  <span aria-hidden="true" class="ui-icon-checked">
                    {resolvedIconChecked()}
                  </span>
                ) : (
                  <svg
                    aria-hidden="true"
                    class="ui-icon-checked"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  />
                )}
              </Button>
            )}
          </span>
        )}
        {resolvedBottom() && (
          <span class="ui-bottom" id={bottomId()}>
            {resolvedBottom()}
          </span>
        )}
      </span>
      {hasEndText() && (
        <span class="ui-end-text" id={endTextId()}>
          {resolvedEndText()}
          {props.characterCount && (
            <opui-character-count
              aria-hidden="true"
              class="ui-value"
              label={props.characterCountLabel}
            />
          )}
        </span>
      )}
      {props.children}
    </Root>
  )
}
