import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import CheckboxInput from "./CheckboxInput.react"
import type { Props } from "./types.react"

export default function Checkbox({
  card,
  className,
  error,
  hideLabel,
  label,
  orientation,
  size,
  spread,
  variant,
  style,
  children,
  endText,
  ...rest
}: Props) {
  warnUnnamed(
    "Checkbox",
    label || children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-checkbox",
        {
          "ui-card": card,
          "ui-spread": spread,
        },
        card && variant && variant !== "outlined" && `ui-${variant}`,
        orientation && orientation !== "horizontal" && `ui-${orientation}`,
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      <CheckboxInput
        {...rest}
        aria-invalid={error ? "true" : rest["aria-invalid"]}
      />
      {(label || children) && (
        <span className={hideLabel ? "ui-sr-only" : "ui-label"}>
          {label}
          {children}
        </span>
      )}
      {endText && <span className="ui-end-text">{endText}</span>}
    </label>
  )
}
