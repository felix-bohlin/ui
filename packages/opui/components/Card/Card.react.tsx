import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({ className, density, variant, ...rest }: Props) {
  return (
    <div
      className={cx([
        "ui-card",
        density && density !== "normal" && `ui-${density}`,
        variant && variant !== "plain" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
