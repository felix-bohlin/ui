import { filled } from "../attrs"
import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Breadcrumb({
  className,
  items,
  overflow,
  size,
  children,
  separator,
  ...rest
}: Props) {
  const lastIndex = items ? items.length - 1 : -1

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
        {items?.map(({ current, href, label }, index) => {
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
                className={cx([href && "ui-link"])}
                href={href}
              >
                {label}
              </ItemTag>
            </li>
          )
        })}
        {children}
      </ol>
    </nav>
  )
}
