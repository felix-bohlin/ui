import { cx } from "../cx"
import SwitchInput from "./SwitchInput.react"
import { hasName, warnUnnamed } from "../dev"
import type { Props } from "./types.react"

export default function Switch({
  "aria-invalid": ariaInvalid,
  card,
  className,
  error,
  hideLabel,
  label,
  orientation,
  size,
  spread,
  style,
  variant,
  children,
  endText,
  iconChecked,
  iconUnchecked,
  ...rest
}: Props) {
  warnUnnamed("Switch", hasName({ ...rest, label }, children))

  return (
    <label
      className={cx([
        "ui-switch",
        { "ui-card": card, "ui-spread": spread },
        card && variant && variant !== "outlined" && `ui-${variant}`,
        orientation && orientation !== "horizontal" && `ui-${orientation}`,
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
      <SwitchInput {...rest} aria-invalid={error ? "true" : ariaInvalid} />
      {(label || children) && (
        <span className={cx([hideLabel ? "ui-sr-only" : "ui-label"])}>
          {label}
          {children}
        </span>
      )}
      {endText && <span className="ui-end-text">{endText}</span>}
    </label>
  )
}
