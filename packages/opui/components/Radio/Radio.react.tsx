import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import RadioInput from "./RadioInput.react"
import type { Props } from "./types.react"

export default function Radio({
  className,
  error,
  hideLabel,
  label,
  orientation,
  size,
  spread,
  style,
  children,
  endText,
  ...rest
}: Props) {
  warnUnnamed(
    "Radio",
    label || children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-radio",
        {
          "ui-spread": spread,
        },
        orientation && orientation !== "horizontal" && `ui-${orientation}`,
        size && size !== "medium" && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      <RadioInput
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
