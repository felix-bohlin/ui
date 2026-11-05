/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { omit, untrack } from "solid-js"
import { MenuContext, useMenuContext } from "./context.solid"
import { warnMissingId } from "../dev"
import { tagAttrs } from "../tag"
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
        {props.items?.map(
          ({
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
            const Tag = dynamic(() => tag)
            const closes = !href && !keepOpen && !disabled
            return (
              <li
                class={[{ "ui-border-top": borderTop }, color && `ui-${color}`]}
              >
                <Tag
                  {...tagAttrs(tag, disabled, href)}
                  command={closes ? "hide-popover" : undefined}
                  commandfor={closes ? rootId() : undefined}
                  {...itemRest}
                >
                  <div class="ui-text">
                    <p>{label}</p>
                  </div>
                  {shortcut && (
                    <div class="ui-end">
                      <kbd>{shortcut}</kbd>
                    </div>
                  )}
                </Tag>
              </li>
            )
          },
        )}
        {props.children}
      </menu>
    </MenuContext>
  )
}
