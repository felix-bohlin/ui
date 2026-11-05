/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit, Show } from "solid-js"
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
  const hasControl = () =>
    props.type === "checkbox" ||
    props.type === "radio" ||
    props.type === "switch"
  const tag = () =>
    hasControl() ? "label" : (props.as ?? (props.href ? "a" : undefined))
  const Tag = dynamic(tag)
  const restOnItem = () => hasControl() || !tag()
  const hasLabel = () => !!props.label || props.label
  const hasDescription = () => !!props.description || props.description

  return (
    <li
      class={[
        { "ui-border-top": props.borderTop, "ui-inset": props.inset },
        props.color && `ui-${props.color}`,
        props.class,
      ]}
      {...(restOnItem() ? (rest as object) : {})}
    >
      {
        <Show
          when={tag()}
          fallback={
            <>
              {props.start && <div class="ui-start">{props.start}</div>}
              {hasLabel() || hasDescription() ? (
                <div class="ui-text">
                  {hasLabel() && <p>{props.label}</p>}
                  {hasDescription() && <p>{props.description}</p>}
                  {props.children}
                </div>
              ) : (
                props.children
              )}
              {props.end && <div class="ui-end">{props.end}</div>}
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
              {props.start && <div class="ui-start">{props.start}</div>}
              {hasLabel() || hasDescription() ? (
                <div class="ui-text">
                  {hasLabel() && <p>{props.label}</p>}
                  {hasDescription() && <p>{props.description}</p>}
                  {props.children}
                </div>
              ) : (
                props.children
              )}
              {props.end && <div class="ui-end">{props.end}</div>}
            </Tag>
          )}
        </Show>
      }
      {props.submenu}
    </li>
  )
}
