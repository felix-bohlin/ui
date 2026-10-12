import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Card({ className, variant, ...rest }: Props) {
  return (
    <div
      className={cx(["ui-card", variant && `ui-${variant}`, className])}
      {...rest}
    />
  )
}
