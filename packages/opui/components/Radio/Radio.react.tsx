import { useId } from "react"
import { cx } from "../cx"
import { warnUnnamed } from "../dev"
import { idRefs } from "../id"
import RadioInput from "./RadioInput.react"
import type { RadioProps as Props } from "./types.react"

export default function Radio({
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
    "Radio",
    children || rest["aria-label"] || rest["aria-labelledby"],
  )

  return (
    <label
      className={cx([
        "ui-radio",
        size && `ui-${size}`,
        {
          "ui-stack": stack,
          "ui-spread": spread,
        },
        className,
      ])}
    >
      <RadioInput
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
