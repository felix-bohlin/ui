import { cx } from "../cx"
import type { DialogActionsProps as Props } from "./types.react"

export default function DialogActions({ align, className, ...rest }: Props) {
  return (
    <div
      className={cx(["ui-actions", align && `ui-align-${align}`, className])}
      {...rest}
    />
  )
}
