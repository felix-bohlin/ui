import { cx } from "../cx"
import type { StepperItemProps as Props } from "./types.react"

export default function StepperItem({
  className,
  complete,
  completedLabel = ", completed",
  current,
  description,
  error,
  errorLabel = ", error",
  href,
  label,
  iconChecked,
  ...rest
}: Props) {
  const state = error ? errorLabel : complete ? completedLabel : undefined
  const text = (
    <>
      {label}
      {state && (
        <>
          {" "}
          <span className="ui-sr-only">{state}</span>
        </>
      )}
    </>
  )

  return (
    <li
      aria-current={current ? "step" : undefined}
      className={cx([
        { "ui-complete": complete, "ui-error": error },
        className,
      ])}
      {...rest}
    >
      {iconChecked && (
        <span aria-hidden="true" className="ui-icon-checked">
          {iconChecked}
        </span>
      )}
      {href && !current && (complete || error) ? (
        <a href={href}>{text}</a>
      ) : (
        text
      )}
      {description && (
        <>
          {" "}
          <span className="ui-description">{description}</span>
        </>
      )}
    </li>
  )
}
