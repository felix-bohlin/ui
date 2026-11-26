import { filled } from "../attrs"
import { cx } from "../cx"
import type { BreadcrumbItemProps as Props } from "./types.react"

export default function BreadcrumbItem({
  className,
  current,
  href,
  label,
  children,
  separator,
  ...rest
}: Props) {
  const Tag = href ? "a" : "span"

  return (
    <li className={cx([className])} {...rest}>
      {filled(separator) && (
        <span aria-hidden="true" className="ui-separator">
          {separator}
        </span>
      )}{" "}
      <Tag
        aria-current={current ? "page" : undefined}
        className={cx([href && "ui-link"])}
        href={href}
      >
        {label}
        {children}
      </Tag>
    </li>
  )
}
