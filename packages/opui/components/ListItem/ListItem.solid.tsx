/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, omit, Show } from "solid-js"
import { defined } from "../attrs"
import { tagAttrs } from "../tag"
import { cx } from "../cx"
import type { Props } from "./types.solid"

export default function ListItem(props: Props) {
  const rest = omit(
    props,
    "as",
    "borderTop",
    "choice",
    "class",
    "color",
    "disabled",
    "for",
    "href",
    "inset",
    "children",
    "description",
    "end",
    "iconChecked",
    "label",
    "start",
    "submenu",
  )
  const resolvedChildren = children(() => props.children)
  const resolvedDescription = children(() => props.description)
  const resolvedEnd = children(() => props.end)
  const resolvedIconChecked = children(() => props.iconChecked)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const hasControl = () =>
    props.choice === "checkbox" ||
    props.choice === "radio" ||
    props.choice === "switch"
  const tag = () =>
    hasControl() ? "label" : (props.as ?? (props.href ? "a" : undefined))
  const Tag = dynamic(tag)
  const restOnItem = () => hasControl() || !tag()
  const hasLabel = () => !!resolvedLabel()
  const hasDescription = () => !!resolvedDescription()
  const tagFor = () => (hasControl() ? props.for : undefined)

  return (
    <li
      class={cx([
        { "ui-border-top": props.borderTop, "ui-inset": props.inset },
        props.color && `ui-${props.color}`,
        props.class,
      ])}
      {...(restOnItem() ? (rest as object) : {})}
    >
      <Show
        when={tag()}
        fallback={
          <>
            {resolvedStart() && <div class="ui-start">{resolvedStart()}</div>}
            {hasLabel() || hasDescription() ? (
              <div class="ui-text">
                {hasLabel() && <p>{resolvedLabel()}</p>}
                {hasDescription() && <p>{resolvedDescription()}</p>}
                {resolvedChildren()}
              </div>
            ) : (
              resolvedChildren()
            )}
            {resolvedEnd() && <div class="ui-end">{resolvedEnd()}</div>}
            {resolvedIconChecked() && (
              <span aria-hidden="true" class="ui-icon-checked">
                {resolvedIconChecked()}
              </span>
            )}
          </>
        }
      >
        {(shownTag) => (
          <Tag
            class={cx([hasControl() && `ui-${props.choice}`])}
            for={tagFor()}
            {...(hasControl()
              ? {}
              : tagAttrs(shownTag(), props.disabled, props.href))}
            {...defined(restOnItem() ? {} : (rest as object))}
          >
            {resolvedStart() && <div class="ui-start">{resolvedStart()}</div>}
            {hasLabel() || hasDescription() ? (
              <div class="ui-text">
                {hasLabel() && <p>{resolvedLabel()}</p>}
                {hasDescription() && <p>{resolvedDescription()}</p>}
                {resolvedChildren()}
              </div>
            ) : (
              resolvedChildren()
            )}
            {resolvedEnd() && <div class="ui-end">{resolvedEnd()}</div>}
            {resolvedIconChecked() && (
              <span aria-hidden="true" class="ui-icon-checked">
                {resolvedIconChecked()}
              </span>
            )}
          </Tag>
        )}
      </Show>
      {props.submenu}
    </li>
  )
}
