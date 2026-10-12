import { useId } from "react"
import { cx } from "../cx"
import CheckboxInput from "./CheckboxInput.react"
import type { CheckboxProps as Props } from "./types.react"

export default function Checkbox({
  className,
  error,
  hideLabel,
  size,
  spread,
  stack,
  children,
  endText,
  ...rest
}: Props) {
  const uid = useId()
  const endTextId = endText ? `end-text-${uid}` : undefined
  const describedBy =
    [endTextId, rest["aria-describedby"]].filter(Boolean).join(" ") || undefined

  return (
    <label
      className={cx([
        "ui-checkbox",
        size && `ui-${size}`,
        {
          "ui-stack": stack,
          "ui-spread": spread,
        },
        className,
      ])}
    >
      <CheckboxInput
        {...rest}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
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
