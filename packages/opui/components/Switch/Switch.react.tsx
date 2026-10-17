import { useId } from "react"
import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import SwitchInput from "./SwitchInput.react"
import type { SwitchProps as Props } from "./types.react"

export default function Switch({
  className,
  error,
  hideLabel,
  size,
  spread,
  stack,
  children,
  endText,
  iconChecked,
  iconUnchecked,
  ...rest
}: Props) {
  const uid = useId()
  const endTextId = endText ? `end-text-${uid}` : undefined
  const describedBy =
    [endTextId, rest["aria-describedby"]].filter(Boolean).join(" ") || undefined

  warnUnnamed(
    "Switch",
    children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-switch",
        size && `ui-${size}`,
        {
          "ui-stack": stack,
          "ui-spread": spread,
        },
        className,
      ])}
    >
      {iconUnchecked && (
        <span className="ui-icon-unchecked" aria-hidden="true">
          {iconUnchecked}
        </span>
      )}
      {iconChecked && (
        <span className="ui-icon-checked" aria-hidden="true">
          {iconChecked}
        </span>
      )}
      <SwitchInput
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
      />
      {children && (
        <span className={hideLabel ? "ui-sr-only" : "ui-label"}>
          {children}
        </span>
      )}
      {endText && (
        <span id={endTextId} className="ui-end-text">
          {endText}
        </span>
      )}
    </label>
  )
}
