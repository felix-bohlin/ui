import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Accordion({
  className,
  markerAnimation,
  variant,
  ...rest
}: Props) {
  return (
    <details
      className={cx([
        "ui-accordion",
        markerAnimation &&
          markerAnimation !== "rotate" &&
          `ui-marker-animation-${markerAnimation}`,
        variant && variant !== "plain" && `ui-${variant}`,
        className,
      ])}
      {...rest}
    />
  )
}
