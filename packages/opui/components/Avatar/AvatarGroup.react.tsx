import { cx } from "../cx"
import type { AvatarGroupProps as Props } from "./types.react"

export default function AvatarGroup({ className, children, ...rest }: Props) {
  return (
    <div className={cx(["ui-avatar-group", className])} role="group" {...rest}>
      {children}
    </div>
  )
}
