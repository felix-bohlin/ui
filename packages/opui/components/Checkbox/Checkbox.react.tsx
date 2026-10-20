import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import CheckboxInput from "./CheckboxInput.react"
import type { Props } from "./types.react"

export default function Checkbox({
  className,
  error,
  hideLabel,
  size,
  spread,
  stack,
  style,
  children,
  endText,
  ...rest
}: Props) {
  warnUnnamed(
    "Checkbox",
    children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-checkbox",
        {
          "ui-spread": spread,
          "ui-stack": stack,
        },
        size && `ui-${size}`,
        className,
      ])}
      style={style}
    >
      <CheckboxInput
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
