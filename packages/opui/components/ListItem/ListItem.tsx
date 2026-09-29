import { children, omit, Show } from "solid-js"
import { Dynamic } from "@solidjs/web"
import type { JSX } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function ListItem(props: Props) {
  const rest = omit(
    props,
    "as",
    "borderTop",
    "children",
    "class",
    "description",
    "end",
    "for",
    "headline",
    "inset",
    "start",
    "text",
    "type",
  )

  const end = children(() => props.end)
  const start = children(() => props.start)
  const text = children(() => props.text)

  const hasLabel = () =>
    props.type === "checkbox" ||
    props.type === "radio" ||
    props.type === "switch"
  const hasText = () => !!(props.headline || props.description || text())
  const Tag = () => props.as

  const Start = () => (
    <Show when={start()}>
      <div class="ui-start">{start()}</div>
    </Show>
  )
  const End = () => (
    <Show when={end()}>
      <div class="ui-end">{end()}</div>
    </Show>
  )
  const Text = (textProps: { children?: JSX.Element }) => (
    <div class="ui-text">
      <Show when={props.headline}>
        <p>{props.headline}</p>
      </Show>
      <Show when={props.description}>
        <p>{props.description}</p>
      </Show>
      {text()}
      {textProps.children}
    </div>
  )

  return (
    <li
      class={[
        {
          "ui-border-top": !!props.borderTop,
          "ui-inset": !!props.inset,
        },
        props.class,
      ]}
      {...(Tag() ? {} : rest)}
    >
      <Show
        when={hasLabel()}
        fallback={
          <Show
            when={Tag()}
            fallback={
              <>
                <Start />
                <Show when={hasText()} fallback={props.children}>
                  <Text>{props.children}</Text>
                </Show>
                <End />
              </>
            }
          >
            <Dynamic component={Tag()} {...rest}>
              <Start />
              <Show when={hasText()} fallback={props.children}>
                <Text>{props.children}</Text>
              </Show>
              <End />
            </Dynamic>
          </Show>
        }
      >
        <label class={props.type && `ui-${props.type}`} for={props.for}>
          <Start />
          <Show when={hasText()}>
            <Text />
          </Show>
          <End />
          {props.children}
        </label>
      </Show>
    </li>
  )
}
