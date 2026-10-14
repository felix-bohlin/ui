import { cx } from "../cx"
import { cssString } from "./css-string"
import type { Props } from "./types.react"

export default function Stepper({
  className,
  complete,
  completedLabel,
  current,
  items,
  label,
  orientation,
  size,
  style,
  check,
  children,
  ...rest
}: Props) {
  const done =
    complete ||
    (current !== undefined && items !== undefined && current >= items.length)

  return (
    <ol
      aria-label={label}
      className={cx([
        "ui-stepper",
        { "ui-complete": done, "ui-vertical": orientation === "vertical" },
        size && `ui-${size}`,
        className,
      ])}
      style={
        completedLabel
          ? { "--_completed-label": cssString(completedLabel), ...style }
          : style
      }
      {...rest}
    >
      {items?.map(({ description, href, label: stepLabel }, index) => (
        <li aria-current={index === current ? "step" : undefined} key={index}>
          {check && (
            <span aria-hidden="true" className="ui-check">
              {check}
            </span>
          )}
          {href && (done || (current !== undefined && index < current)) ? (
            <a href={href}>{stepLabel}</a>
          ) : (
            stepLabel
          )}
          {description && <span className="ui-description">{description}</span>}
        </li>
      ))}
      {children}
    </ol>
  )
}
