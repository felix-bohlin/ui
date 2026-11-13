import { defined } from "../attrs"
import { cx } from "../cx"
import type { StepperItemProps as Props } from "./types.react"

export default function StepperItem({
  className,
  complete,
  completeLabel = ", completed",
  current,
  error,
  errorLabel = ", error",
  href,
  description,
  iconComplete,
  label,
  ...rest
}: Props) {
  const state = error ? errorLabel : complete ? completeLabel : undefined
  const link = href && !current && (complete || error)

  return (
    <li
      aria-current={current ? "step" : undefined}
      className={cx([
        { "ui-complete": complete, "ui-error": error },
        className,
      ])}
      {...defined(rest)}
    >
      {iconComplete && (
        <span aria-hidden="true" className="ui-icon-complete">
          {iconComplete}
        </span>
      )}{" "}
      {link ? (
        <a href={href}>
          {label}
          {state && <span className="ui-sr-only">{state}</span>}
        </a>
      ) : (
        <>
          {label}
          {state && <span className="ui-sr-only">{state}</span>}
        </>
      )}{" "}
      {description && <span className="ui-description">{description}</span>}
    </li>
  )
}
