import { cx } from "../cx"
import type { AvatarGroupProps as Props } from "./types.react"

export default function AvatarGroup({
  className,
  role,
  children,
  ...rest
}: Props) {
  return (
    <div
      className={cx(["ui-avatar-group", className])}
      role={role ?? "group"}
      {...rest}
    >
      {children}
    </div>
  )
}
