import { useId } from "react"
import { cx } from "../cx"
import type { CommandGroupProps as Props } from "./types.react"

export default function CommandGroup({
  className,
  label,
  children,
  ...rest
}: Props) {
  const uid = useId()
  const labelId = label ? `command-group-label-${uid}` : undefined

  return (
    <div className={cx(["ui-command-group", className])} {...rest}>
      {label && (
        <p className="ui-label" id={labelId}>
          {label}
        </p>
      )}
      <ul aria-labelledby={labelId} className="ui-list ui-transparent">
        {children}
      </ul>
    </div>
  )
}
