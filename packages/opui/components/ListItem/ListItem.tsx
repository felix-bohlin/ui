import { children, omit, Show } from "solid-js"
import { dynamic } from "@solidjs/web"
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
    "submenu",
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
  const tag = () => props.as ?? (props.href ? "a" : undefined)
  const Tag = dynamic(tag)

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
  const Content = () => (
    <>
      <Start />
      <Show when={hasText()} fallback={props.children}>
        <Text>{props.children}</Text>
      </Show>
      <End />
    </>
  )

  return (
    <li
      class={[
        {
          "ui-border-top": props.borderTop,
          "ui-inset": props.inset,
        },
        props.class,
      ]}
      {...((tag() ? {} : rest) as JSX.HTMLAttributes<HTMLLIElement>)}
    >
      <Show
        when={hasLabel()}
        fallback={
          <Show when={tag()} fallback={<Content />}>
            <Tag {...(rest as JSX.HTMLAttributes<HTMLDivElement>)}>
              <Content />
            </Tag>
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
      {props.submenu}
    </li>
  )
}
