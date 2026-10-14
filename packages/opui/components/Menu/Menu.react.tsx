import { useId } from "react"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Menu({
  align,
  bordered,
  className,
  dense,
  id,
  items,
  placement,
  popover = "auto",
  children,
  ...rest
}: Props) {
  const uid = useId()
  const menuId = id || `menu-${uid}`

  return (
    <menu
      className={cx([
        "ui-menu",
        "ui-list",
        {
          "ui-align-end": align === "end",
          "ui-bordered": bordered,
          "ui-dense": dense,
        },
        placement && placement !== "block-end" && `ui-${placement}`,
        className,
      ])}
      id={menuId}
      popover={popover === "auto" ? "" : popover}
      {...rest}
    >
      {items?.map(
        (
          {
            borderTop,
            closeOnClick = true,
            critical,
            disabled,
            href,
            label,
            shortcut,
            ...itemRest
          },
          index,
        ) => {
          const Tag = href ? "a" : "button"
          const closes = !href && closeOnClick && !disabled

          return (
            <li
              className={cx([
                { "ui-border-top": borderTop, "ui-critical": critical },
              ])}
              key={index}
            >
              <Tag
                aria-disabled={href && disabled ? "true" : undefined}
                command={closes ? "hide-popover" : undefined}
                commandfor={closes ? menuId : undefined}
                disabled={!href && disabled ? true : undefined}
                href={href && !disabled ? href : undefined}
                type={href ? undefined : "button"}
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
  )
}
