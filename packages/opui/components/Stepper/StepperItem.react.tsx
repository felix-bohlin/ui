import { filled } from "../attrs"
import { cx } from "../cx"
import type { StepperItemProps as Props } from "./types.react"

export default function StepperItem({
  "aria-current": ariaCurrent,
  className,
  completeLabel = ", completed",
  current,
  errorLabel = ", error",
  href,
  state,
  description,
  iconComplete,
  label,
  ...rest
}: Props) {
  const stateLabel =
    state === "error"
      ? errorLabel
      : state === "complete"
        ? completeLabel
        : undefined
  const link = href && !current && state

  return (
    <li
      aria-current={ariaCurrent ?? (current ? "step" : undefined)}
      className={cx([state && `ui-state-${state}`, className])}
      {...rest}
    >
      {filled(iconComplete) && (
        <span aria-hidden="true" className="ui-icon-complete">
          {iconComplete}
        </span>
      )}{" "}
      {link ? (
        <a href={href}>
          {label}
          {stateLabel && <span className="ui-sr-only">{stateLabel}</span>}
        </a>
      ) : (
        <>
          {label}
          {stateLabel && <span className="ui-sr-only">{stateLabel}</span>}
        </>
      )}{" "}
      {filled(description) && (
        <span className="ui-description">{description}</span>
      )}
    </li>
  )
}
