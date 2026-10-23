import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import SwitchInput from "./SwitchInput.react"
import type { Props } from "./types.react"

export default function Switch({
  className,
  error,
  hideLabel,
  size,
  spread,
  stack,
  style,
  children,
  endText,
  iconChecked,
  iconUnchecked,
  ...rest
}: Props) {
  warnUnnamed(
    "Switch",
    children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-switch",
        {
          "ui-spread": spread,
          "ui-stack": stack,
        },
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
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
        aria-invalid={error ? "true" : rest["aria-invalid"]}
      />
      {children && (
        <span className={hideLabel ? "ui-sr-only" : "ui-label"}>
          {children}
        </span>
      )}
      {endText && <span className="ui-end-text">{endText}</span>}
    </label>
  )
}
