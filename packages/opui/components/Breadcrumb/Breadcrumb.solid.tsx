/** @jsxImportSource @solidjs/web */
import { Dynamic } from "@solidjs/web"
import { children, createUniqueId, For, omit } from "solid-js"
import { filled } from "../attrs"
import Button from "../Button/Button.solid"
import Menu from "../Menu/Menu.solid"
import { collapsedLevels } from "./collapsed"
import type { Props } from "./types.solid"

export default function Breadcrumb(props: Props) {
  const rest = omit(
    props,
    "class",
    "items",
    "menuLabel",
    "overflow",
    "size",
    "children",
    "separator",
  )
  const resolvedSeparator = children(() => props.separator)
  const uid = createUniqueId()
  const lastIndex = () => (props.items ? props.items.length - 1 : -1)
  const collapsed = () =>
    props.overflow === "menu" && props.items ? collapsedLevels(props.items) : []
  const collapsing = () => collapsed().length > 0
  const menuId = `breadcrumb-menu-${uid}`
  const head = () => (collapsing() ? props.items?.slice(0, 1) : props.items)
  const tail = () => (collapsing() ? props.items?.slice(1) : undefined)

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
        <For each={head()} keyed={false}>
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
                  href={item().href}
                >
                  {item().label}
                </Dynamic>
              </li>
            )
          }}
        </For>
        {collapsing() && (
          <li>
            {filled(resolvedSeparator()) && (
              <span aria-hidden="true" class="ui-separator">
                {resolvedSeparator()}
              </span>
            )}
            <Button
              aria-label={props.menuLabel}
              command="toggle-popover"
              commandfor={menuId}
              round
              size="x-small"
            >
              …
            </Button>
            <Menu id={menuId} items={collapsed()} />
          </li>
        )}
        <For each={tail()} keyed={false}>
          {(item, index) => {
            const tailTag = () => (item().href ? "a" : "span")
            const resolvedSeparator = children(() => props.separator)
            const tailTagCurrent = () =>
              (item().current ?? index === lastIndex() - 1) ? "page" : undefined
            return (
              <li>
                {filled(resolvedSeparator()) && (
                  <span aria-hidden="true" class="ui-separator">
                    {resolvedSeparator()}
                  </span>
                )}
                <Dynamic
                  component={tailTag()}
                  aria-current={tailTagCurrent()}
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
