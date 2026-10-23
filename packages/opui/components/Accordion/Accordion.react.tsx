import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Accordion({
  className,
  markerAnimation = "rotate",
  variant,
  ...rest
}: Props) {
  return (
    <details
      className={cx([
        "ui-accordion",
        "ui-card",
        markerAnimation && `ui-marker-${markerAnimation}`,
        variant && variant !== "transparent" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
