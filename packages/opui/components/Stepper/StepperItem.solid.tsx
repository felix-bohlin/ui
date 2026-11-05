/** @jsxImportSource @solidjs/web */
import { omit, Show } from "solid-js"
import type { StepperItemProps as Props } from "./types.solid"

export default function StepperItem(props: Props) {
  const rest = omit(
    props,
    "class",
    "complete",
    "completedLabel",
    "current",
    "error",
    "errorLabel",
    "href",
    "description",
    "iconChecked",
    "label",
  )
  const completedLabel = () => props.completedLabel ?? ", completed"
  const errorLabel = () => props.errorLabel ?? ", error"
  const state = () =>
    props.error ? errorLabel() : props.complete ? completedLabel() : undefined
  const link = () =>
    props.href && !props.current && (props.complete || props.error)

  return (
    <li
      aria-current={props.current ? "step" : undefined}
      class={[
        { "ui-complete": props.complete, "ui-error": props.error },
        props.class,
      ]}
      {...rest}
    >
      {props.iconChecked && (
        <span aria-hidden="true" class="ui-icon-checked">
          {props.iconChecked}
        </span>
      )}{" "}
      {link() ? (
        <a href={props.href}>
          {props.label}
          {
            <Show when={state()}>
              {(state) => <span class="ui-sr-only">{state()}</span>}
            </Show>
          }
        </a>
      ) : (
        <>
          {props.label}
          {
            <Show when={state()}>
              {(state) => <span class="ui-sr-only">{state()}</span>}
            </Show>
          }
        </>
      )}{" "}
      {props.description && (
        <span class="ui-description">{props.description}</span>
      )}
    </li>
  )
}
