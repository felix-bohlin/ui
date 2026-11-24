/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import { filled } from "../attrs"
import { cx } from "../cx"
import type { StepperItemProps as Props } from "./types.solid"

export default function StepperItem(props: Props) {
  const rest = omit(
    props,
    "aria-current",
    "class",
    "complete",
    "completeLabel",
    "current",
    "error",
    "errorLabel",
    "href",
    "description",
    "iconComplete",
    "label",
  )
  const resolvedDescription = children(() => props.description)
  const resolvedIconComplete = children(() => props.iconComplete)
  const resolvedLabel = children(() => props.label)
  const completeLabel = () =>
    props.completeLabel === undefined ? ", completed" : props.completeLabel
  const errorLabel = () =>
    props.errorLabel === undefined ? ", error" : props.errorLabel
  const state = () =>
    props.error ? errorLabel() : props.complete ? completeLabel() : undefined
  const link = () =>
    props.href && !props.current && (props.complete || props.error)

  return (
    <li
      aria-current={
        props["aria-current"] ?? (props.current ? "step" : undefined)
      }
      class={cx([
        { "ui-complete": props.complete, "ui-error": props.error },
        props.class,
      ])}
      {...rest}
    >
      {filled(resolvedIconComplete()) && (
        <span aria-hidden="true" class="ui-icon-complete">
          {resolvedIconComplete()}
        </span>
      )}{" "}
      {link() ? (
        <a href={props.href}>
          {resolvedLabel()}
          {state() && <span class="ui-sr-only">{state()}</span>}
        </a>
      ) : (
        <>
          {resolvedLabel()}
          {state() && <span class="ui-sr-only">{state()}</span>}
        </>
      )}{" "}
      {filled(resolvedDescription()) && (
        <span class="ui-description">{resolvedDescription()}</span>
      )}
    </li>
  )
}
