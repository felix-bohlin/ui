import { useId } from "react"
import { filled } from "../attrs"
import { cx } from "../cx"
import Button from "../Button/Button.react"
import Menu from "../Menu/Menu.react"
import { collapsedLevels } from "./collapsed"
import type { Props } from "./types.react"

export default function Breadcrumb({
  className,
  items,
  menuLabel,
  overflow,
  size,
  children,
  separator,
  ...rest
}: Props) {
  const uid = useId()
  const lastIndex = items ? items.length - 1 : -1
  const collapsed = overflow === "menu" && items ? collapsedLevels(items) : []
  const collapsing = collapsed.length > 0
  const menuId = `breadcrumb-menu-${uid}`
  const head = collapsing ? items?.slice(0, 1) : items
  const tail = collapsing ? items?.slice(1) : undefined

  return (
    <nav
      className={cx([
        "ui-breadcrumb",
        overflow && overflow !== "wrap" && `ui-overflow-${overflow}`,
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      {...rest}
    >
      <ol>
        {head?.map(({ current, href, label }, index) => {
          const ItemTag = href ? "a" : "span"
          return (
            <li key={index}>
              {index > 0 && filled(separator) && (
                <span aria-hidden="true" className="ui-separator">
                  {separator}
                </span>
              )}
              <ItemTag
                aria-current={
                  (current ?? index === lastIndex) ? "page" : undefined
                }
                href={href}
              >
                {label}
              </ItemTag>
            </li>
          )
        })}
        {collapsing && (
          <li>
            {filled(separator) && (
              <span aria-hidden="true" className="ui-separator">
                {separator}
              </span>
            )}
            <Button
              aria-label={menuLabel}
              command="toggle-popover"
              commandfor={menuId}
              round
              size="x-small"
            >
              …
            </Button>
            <Menu id={menuId} items={collapsed} />
          </li>
        )}
        {tail?.map(({ current, href, label }, index) => {
          const TailTag = href ? "a" : "span"
          return (
            <li key={index}>
              {filled(separator) && (
                <span aria-hidden="true" className="ui-separator">
                  {separator}
                </span>
              )}
              <TailTag
                aria-current={
                  (current ?? index === lastIndex - 1) ? "page" : undefined
                }
                href={href}
              >
                {label}
              </TailTag>
            </li>
          )
        })}
        {children}
      </ol>
    </nav>
  )
}
