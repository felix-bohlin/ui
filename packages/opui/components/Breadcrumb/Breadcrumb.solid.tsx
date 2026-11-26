/** @jsxImportSource @solidjs/web */
import { Dynamic } from "@solidjs/web"
import { children, For, omit } from "solid-js"
import { filled } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.solid"

export default function Breadcrumb(props: Props) {
  const rest = omit(
    props,
    "class",
    "items",
    "overflow",
    "size",
    "children",
    "separator",
  )
  const lastIndex = () => (props.items ? props.items.length - 1 : -1)

  return (
    <nav
      class={[
        "ui-breadcrumb",
        props.overflow &&
          props.overflow !== "wrap" &&
          `ui-overflow-${props.overflow}`,
        props.size && props.size !== "medium" && `ui-${props.size}`,
        props.class,
      ]}
      {...rest}
    >
      <ol>
        <For each={props.items} keyed={false}>
          {(item, index) => {
            const itemTag = () => (item().href ? "a" : "span")
            const resolvedSeparator = children(() => props.separator)
            const itemTagCurrent = () =>
              (item().current ?? index === lastIndex()) ? "page" : undefined
            return (
              <li>
                {index > 0 && filled(resolvedSeparator()) && (
                  <span aria-hidden="true" class="ui-separator">
                    {resolvedSeparator()}
                  </span>
                )}
                <Dynamic
                  component={itemTag()}
                  aria-current={itemTagCurrent()}
                  class={cx([item().href && "ui-link"])}
                  href={item().href}
                >
                  {item().label}
                </Dynamic>
              </li>
            )
          }}
        </For>
        {props.children}
      </ol>
    </nav>
  )
}
