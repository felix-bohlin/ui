import { cx } from "../cx"
import type { CalloutActionsProps as Props } from "./types.react"

export default function CalloutActions({
  className,
  children,
  ...rest
}: Props) {
  return (
    <div className={cx(["ui-actions", className])} {...rest}>
      {children}
    </div>
  )
}
