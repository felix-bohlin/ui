import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Accordion({
  className,
  markerAnimation = "rotate",
  name,
  open,
  variant,
  ...rest
}: Props) {
  return (
    <details
      name={name}
      className={cx([
        "ui-accordion",
        "ui-card",
        markerAnimation && `ui-marker-${markerAnimation}`,
        variant && `ui-${variant}`,
        className,
      ])}
      open={open}
      {...rest}
    />
  )
}
