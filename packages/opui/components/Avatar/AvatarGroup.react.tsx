import { cx } from "../cx"
import type { AvatarGroupProps as Props } from "./types.react"

export default function AvatarGroup({ className, ...rest }: Props) {
  return (
    <div
      className={cx(["ui-avatar-group", className])}
      role="group"
      {...rest}
    />
  )
}
