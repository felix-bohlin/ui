"use client"

import { cx } from "../cx"
import { MenuContext, useMenuContext } from "./context.react"
import { warnMissingId } from "../dev"
import { tagAttrs } from "../tag"
import type { Props } from "./types.react"

export default function Menu({
  align,
  bordered,
  className,
  dense,
  id,
  items,
  popover = "auto",
  side,
  children,
  ...rest
}: Props) {
  const parent = useMenuContext()
  const rootId = parent?.rootId ?? id
  warnMissingId("Menu", id)

  return (
    <MenuContext value={{ rootId }}>
      <menu
        className={cx([
          "ui-menu",
          {
            "ui-align-end": align === "end",
            "ui-bordered": bordered,
            "ui-dense": dense,
          },
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
            const Tag = href ? "a" : "button"
            const closes = !href && !keepOpen && !disabled
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
                  {...itemRest}
                >
                  <div className="ui-text">
                    <p>{label}</p>
                  </div>
                  {shortcut && (
                    <div className="ui-end">
                      <kbd>{shortcut}</kbd>
                    </div>
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
