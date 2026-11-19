/** @jsxImportSource @solidjs/web */
import { Dynamic } from "@solidjs/web"
import { children, For, omit, untrack } from "solid-js"
import "../../elements/close-on-navigate.js"
import "../../elements/menu.js"
import { defined } from "../attrs"
import { MenuContext, useMenuContext } from "./context.solid"
import { warnMissingId } from "../dev"
import { tagAttrs } from "../tag"
import { cx } from "../cx"
import type { Props } from "./types.solid"

export default function Menu(props: Props) {
  const rest = omit(
    props,
    "align",
    "bordered",
    "class",
    "dense",
    "id",
    "items",
    "orientation",
    "popover",
    "side",
    "children",
    "iconChecked",
  )
  const parent = useMenuContext()
  const popover = () => (props.popover === undefined ? "auto" : props.popover)
  const rootId = () => parent?.rootId ?? props.id
  untrack(() => {
    warnMissingId("Menu", props.id)
  })

  return (
    <MenuContext
      value={{
        get rootId() {
          return rootId()
        },
      }}
    >
      <menu
        class={[
          "ui-menu",
          {
            "ui-align-end": props.align === "end",
            "ui-bordered": props.bordered,
            "ui-dense": props.dense,
          },
          props.orientation &&
            props.orientation !== "vertical" &&
            `ui-${props.orientation}`,
          props.side && props.side !== "block-end" && `ui-${props.side}`,
          props.class,
        ]}
        id={props.id}
        popover={popover() === "auto" ? "" : popover()}
        {...rest}
      >
        <For each={props.items} keyed={false}>
          {(item) => {
            const itemRest = () =>
              omit(
                item(),
                "borderTop",
                "color",
                "disabled",
                "href",
                "keepOpen",
                "label",
                "shortcut",
              )
            const tag = () => (item().href ? "a" : "button")
            const closes = () =>
              !item().href &&
              !item().keepOpen &&
              !item().disabled &&
              itemRest().type !== "submit" &&
              itemRest().type !== "reset"
            const command = () => (closes() ? "hide-popover" : undefined)
            const commandfor = () => (closes() ? rootId() : undefined)
            const tagKeepOpen = () => (item().keepOpen ? "" : undefined)
            const resolvedIconChecked = children(() => props.iconChecked)
            return (
              <li
                class={cx([
                  { "ui-border-top": item().borderTop },
                  item().color && `ui-${item().color}`,
                ])}
              >
                <Dynamic
                  component={tag()}
                  {...tagAttrs(tag(), item().disabled, item().href)}
                  command={command()}
                  commandfor={commandfor()}
                  data-keep-open={tagKeepOpen()}
                  {...defined(itemRest())}
                >
                  <div class="ui-text">
                    <p>{item().label}</p>
                  </div>
                  {item().shortcut && (
                    <div class="ui-end">
                      <kbd>{item().shortcut}</kbd>
                    </div>
                  )}
                  {resolvedIconChecked() && (
                    <span aria-hidden="true" class="ui-icon-checked">
                      {resolvedIconChecked()}
                    </span>
                  )}
                </Dynamic>
              </li>
            )
          }}
        </For>
        {props.children}
      </menu>
    </MenuContext>
  )
}
