import { cx } from "../cx"
import type { DrawerActionsProps as Props } from "./types.react"

export default function DrawerActions({ align, className, ...rest }: Props) {
  return (
    <div
      className={cx([
        "ui-actions",
        align && align !== "end" && `ui-align-${align}`,
        className,
      ])}
      {...rest}
    />
  )
}
