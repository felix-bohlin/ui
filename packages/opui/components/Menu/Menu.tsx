import { createUniqueId, For, omit, Show } from "solid-js"
import { dynamic } from "@solidjs/web"
import type { Props } from "./types.solid"

export default function Menu(props: Props) {
  const rest = omit(
    props,
    "align",
    "children",
    "class",
    "dense",
    "id",
    "items",
    "placement",
    "popover",
  )

  const uid = createUniqueId()
  const menuId = () => props.id || uid
  const popover = () => props.popover ?? "auto"

  return (
    <menu
      class={[
        "ui-menu",
        "ui-list",
        { "ui-align-end": props.align === "end", "ui-dense": props.dense },
        props.placement &&
          props.placement !== "block-end" &&
          `ui-${props.placement}`,
        props.class,
      ]}
      id={menuId()}
      popover={popover() === "auto" ? "" : popover()}
      {...rest}
    >
      <For each={props.items}>
        {(item) => {
          const itemRest = omit(
            item,
            "borderTop",
            "closeOnClick",
            "critical",
            "disabled",
            "href",
            "label",
            "shortcut",
          )
          const closes = () =>
            !item.href && (item.closeOnClick ?? true) && !item.disabled
          const Tag = dynamic(() => (item.href ? "a" : "button"))

          return (
            <li
              class={{
                "ui-border-top": item.borderTop,
                "ui-critical": item.critical,
              }}
            >
              <Tag
                aria-disabled={item.href && item.disabled ? "true" : undefined}
                command={closes() ? "hide-popover" : undefined}
                commandfor={closes() ? menuId() : undefined}
                disabled={!item.href && item.disabled ? true : undefined}
                href={item.href && !item.disabled ? item.href : undefined}
                type={item.href ? undefined : "button"}
                {...itemRest}
              >
                <div class="ui-text">
                  <p>{item.label}</p>
                </div>
                <Show when={item.shortcut}>
                  <div class="ui-end">
                    <kbd>{item.shortcut}</kbd>
                  </div>
                </Show>
              </Tag>
            </li>
          )
        }}
      </For>
      {props.children}
    </menu>
  )
}
