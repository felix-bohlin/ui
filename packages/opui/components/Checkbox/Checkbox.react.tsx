import { useId } from "react"
import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import { idRefs } from "../id"
import CheckboxInput from "./CheckboxInput.react"
import type { Props } from "./types.react"

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
  const describedBy = idRefs(endTextId, rest["aria-describedby"])

  warnUnnamed(
    "Checkbox",
    children || rest["aria-label"] || rest["aria-labelledby"],
  )

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
