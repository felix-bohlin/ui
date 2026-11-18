/** @jsxImportSource @solidjs/web */
import { Dynamic } from "@solidjs/web"
import { children, For, omit, untrack } from "solid-js"
import "../../elements/close-on-navigate.js"
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
          props.side && props.side !== "block-end" && `ui-${props.side}`,
          props.class,
        ]}
        id={props.id}
        popover={popover() === "auto" ? "" : popover()}
        {...rest}
      >
        <For each={props.items}>
          {({
            borderTop,
            color,
            disabled,
            href,
            keepOpen,
            label,
            shortcut,
            ...itemRest
          }) => {
            const tag = href ? "a" : "button"
            const closes = !href && !keepOpen && !disabled
            const commandfor = () => (closes ? rootId() : undefined)
            const resolvedIconChecked = children(() => props.iconChecked)
            return (
              <li
                class={cx([
                  { "ui-border-top": borderTop },
                  color && `ui-${color}`,
                ])}
              >
                <Dynamic
                  component={tag}
                  {...tagAttrs(tag, disabled, href)}
                  command={closes ? "hide-popover" : undefined}
                  commandfor={commandfor()}
                  {...defined(itemRest)}
                >
                  <div class="ui-text">
                    <p>{label}</p>
                  </div>
                  {shortcut && (
                    <div class="ui-end">
                      <kbd>{shortcut}</kbd>
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
