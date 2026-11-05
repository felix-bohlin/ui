/** @jsxImportSource @solidjs/web */
import { children, omit, Show } from "solid-js"
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
  const resolvedDescription = children(() => props.description)
  const resolvedIconChecked = children(() => props.iconChecked)
  const resolvedLabel = children(() => props.label)
  const completedLabel = () =>
    props.completedLabel === undefined ? ", completed" : props.completedLabel
  const errorLabel = () =>
    props.errorLabel === undefined ? ", error" : props.errorLabel
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
      {resolvedIconChecked() && (
        <span aria-hidden="true" class="ui-icon-checked">
          {resolvedIconChecked()}
        </span>
      )}{" "}
      {link() ? (
        <a href={props.href}>
          {resolvedLabel()}
          {
            <Show when={state()}>
              {(state) => <span class="ui-sr-only">{state()}</span>}
            </Show>
          }
        </a>
      ) : (
        <>
          {resolvedLabel()}
          {
            <Show when={state()}>
              {(state) => <span class="ui-sr-only">{state()}</span>}
            </Show>
          }
        </>
      )}{" "}
      {resolvedDescription() && (
        <span class="ui-description">{resolvedDescription()}</span>
      )}
    </li>
  )
}
