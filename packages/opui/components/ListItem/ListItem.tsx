/* @jsxImportSource solid-js */
import { splitProps, type JSX, Show, createMemo } from "solid-js"
import { Dynamic } from "solid-js/web"
import type { Props } from "./types.solid"

export default function ListItem(props: Props) {
  const [local, rest] = splitProps(props, [
    "borderTop",
    "for",
    "inset",
    "type",
    "as",
    "href",
    "headline",
    "description",
    "start",
    "end",
    "text",
    "class",
    "children",
  ])

  const hasLabel = () =>
    local.type &&
    (local.type === "checkbox" ||
      local.type === "radio" ||
      local.type === "switch")

  const labelClass = () => local.type || ""
  const Tag = () => local.as

  return (
    <li
      class={`${local.borderTop ? "ui-border-top" : ""} ${local.inset ? "ui-inset" : ""} ${local.class || ""}`.trim() || undefined}
      {...(Tag() || hasLabel() ? {} : rest)}
    >
      <Show when={hasLabel()}>
        <label
          class={labelClass() ? `ui-${labelClass()}` : undefined}
          for={local.for}
        >
          <Show when={local.start}>
            <div class="ui-start">{local.start}</div>
          </Show>
          <Show when={local.text || local.headline || local.description}>
            <div class="ui-text">
              <Show when={local.headline}><p>{local.headline}</p></Show>
              <Show when={local.description}><p>{local.description}</p></Show>
              {local.text}
            </div>
          </Show>
          <Show when={local.end}>
            <div class="ui-end">{local.end}</div>
          </Show>
          {local.children}
        </label>
      </Show>

      <Show when={!hasLabel() && Tag()}>
        <Dynamic component={Tag() as any} href={local.href} {...rest}>
          <Show when={local.start}>
            <div class="ui-start">{local.start}</div>
          </Show>
          <Show
            when={local.text || local.headline || local.description}
            fallback={local.children}
          >
            <div class="ui-text">
              <Show when={local.headline}><p>{local.headline}</p></Show>
              <Show when={local.description}><p>{local.description}</p></Show>
              {local.text}
              {local.children}
            </div>
          </Show>
          <Show when={local.end}>
            <div class="ui-end">{local.end}</div>
          </Show>
        </Dynamic>
      </Show>

      <Show when={!hasLabel() && !Tag()}>
        <>
          <Show when={local.start}>
            <div class="ui-start">{local.start}</div>
          </Show>
          <Show
            when={local.text || local.headline || local.description}
            fallback={local.children}
          >
            <div class="ui-text">
              <Show when={local.headline}><p>{local.headline}</p></Show>
              <Show when={local.description}><p>{local.description}</p></Show>
              {local.text}
              {local.children}
            </div>
          </Show>
          <Show when={local.end}>
            <div class="ui-end">{local.end}</div>
          </Show>
        </>
      </Show>
    </li>
  )
}
