import { cx } from "../cx"
import type { CardActionsProps as Props } from "./types.react"

export default function CardActions({ align, className, ...rest }: Props) {
  return (
    <div
      className={cx([
        "ui-actions",
        align && align !== "start" && `ui-align-${align}`,
        className,
      ])}
      {...rest}
    />
  )
}
