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
    "completeLabel",
    "current",
    "errorLabel",
    "href",
    "state",
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
  const stateLabel = () =>
    props.state === "error"
      ? errorLabel()
      : props.state === "complete"
        ? completeLabel()
        : undefined
  const link = () => props.href && !props.current && props.state

  return (
    <li
      aria-current={
        props["aria-current"] ?? (props.current ? "step" : undefined)
      }
      class={cx([props.state && `ui-state-${props.state}`, props.class])}
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
          {stateLabel() && <span class="ui-sr-only">{stateLabel()}</span>}
        </a>
      ) : (
        <>
          {resolvedLabel()}
          {stateLabel() && <span class="ui-sr-only">{stateLabel()}</span>}
        </>
      )}{" "}
      {filled(resolvedDescription()) && (
        <span class="ui-description">{resolvedDescription()}</span>
      )}
    </li>
  )
}
