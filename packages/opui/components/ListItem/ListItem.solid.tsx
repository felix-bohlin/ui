/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { children, omit, Show } from "solid-js"
import { tagAttrs } from "../tag"
import type { Props } from "./types.solid"

export default function ListItem(props: Props) {
  const rest = omit(
    props,
    "as",
    "borderTop",
    "class",
    "color",
    "disabled",
    "for",
    "href",
    "inset",
    "type",
    "children",
    "description",
    "end",
    "label",
    "start",
    "submenu",
  )
  const resolvedChildren = children(() => props.children)
  const resolvedDescription = children(() => props.description)
  const resolvedEnd = children(() => props.end)
  const resolvedLabel = children(() => props.label)
  const resolvedStart = children(() => props.start)
  const hasControl = () =>
    props.type === "checkbox" ||
    props.type === "radio" ||
    props.type === "switch"
  const tag = () =>
    hasControl() ? "label" : (props.as ?? (props.href ? "a" : undefined))
  const Tag = dynamic(tag)
  const restOnItem = () => hasControl() || !tag()
  const hasLabel = () => !!resolvedLabel() || resolvedLabel()
  const hasDescription = () => !!resolvedDescription() || resolvedDescription()

  return (
    <li
      class={[
        { "ui-border-top": props.borderTop, "ui-inset": props.inset },
        props.color && `ui-${props.color}`,
        props.class,
      ]}
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
          </>
        }
      >
        {(tag) => (
          <Tag
            class={[hasControl() && `ui-${props.type}`]}
            for={hasControl() ? props.for : undefined}
            {...(hasControl()
              ? {}
              : tagAttrs(tag(), props.disabled, props.href))}
            {...(restOnItem() ? {} : (rest as object))}
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
          </Tag>
        )}
      </Show>
      {props.submenu}
    </li>
  )
}
