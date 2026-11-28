"use client"

import { useMemo } from "react"
import "../../elements/close-on-navigate.js"
import "../../elements/menu.js"
import { defined, filled } from "../attrs"
import { cx } from "../cx"
import { MenuContext, useMenuContext } from "./context.react"
import { DEV, warnMissingId } from "../dev"
import { disabledLink, tagAttrs } from "../tag"
import type { Props } from "./types.react"
import type { Context } from "./types"

export default function Menu({
  align,
  bordered,
  className,
  dense,
  id,
  items,
  orientation,
  popover = "auto",
  side,
  children,
  iconChecked,
  ...rest
}: Props) {
  const parent = useMenuContext()
  const rootId = parent?.rootId ?? id
  if (DEV) warnMissingId("Menu", id)
  const context = useMemo<Context>(() => ({ rootId }), [rootId])

  return (
    <MenuContext value={context}>
      <menu
        className={cx([
          "ui-menu",
          {
            "ui-align-end": align === "end",
            "ui-bordered": bordered,
            "ui-dense": dense,
          },
          orientation && orientation !== "vertical" && `ui-${orientation}`,
          side && side !== "block-end" && `ui-${side}`,
          className,
        ])}
        id={id}
        popover={popover === "auto" ? "" : popover}
        {...rest}
      >
        {items?.map(
          (
            {
              as,
              borderTop,
              color,
              disabled,
              href,
              keepOpen,
              label,
              shortcut,
              ...itemRest
            },
            index,
          ) => {
            const Tag = disabledLink(as, disabled)
              ? "a"
              : (as ?? (href ? "a" : "button"))
            const closes =
              !href &&
              !keepOpen &&
              !disabled &&
              itemRest.type !== "submit" &&
              itemRest.type !== "reset"
            return (
              <li
                key={index}
                className={cx([
                  { "ui-border-top": borderTop },
                  color && `ui-${color}`,
                ])}
              >
                <Tag
                  {...tagAttrs(Tag, disabled, href)}
                  command={closes ? "hide-popover" : undefined}
                  commandfor={closes ? rootId : undefined}
                  data-keep-open={keepOpen ? "" : undefined}
                  {...defined(itemRest)}
                >
                  <div className="ui-text">
                    <p>{label}</p>
                  </div>
                  {shortcut && (
                    <div className="ui-end">
                      <kbd>{shortcut}</kbd>
                    </div>
                  )}
                  {filled(iconChecked) && (
                    <span aria-hidden="true" className="ui-icon-checked">
                      {iconChecked}
                    </span>
                  )}
                </Tag>
              </li>
            )
          },
        )}
        {children}
      </menu>
    </MenuContext>
  )
}
