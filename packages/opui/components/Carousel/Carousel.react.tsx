import { cx } from "../cx"
import { counterLabel, cssString, mergeStyle } from "../style"
import type { Props } from "./types.react"

export default function Carousel({
  align,
  aspectRatio,
  buttons,
  className,
  itemsPerView,
  markerLabel,
  markers,
  nextLabel,
  orientation,
  peek,
  persistentButtons,
  previousLabel,
  stretch,
  style,
  children,
  ...rest
}: Props) {
  return (
    <ul
      className={cx([
        "ui-carousel",
        {
          "ui-persistent-buttons": persistentButtons,
          "ui-peek": peek,
          "ui-stretch": stretch,
          "ui-vertical": orientation === "vertical",
          "ui-markers": markers,
        },
        align && align !== "start" && `ui-align-${align}`,
        buttons && buttons !== "inside" && `ui-buttons-${buttons}`,
        className,
      ])}
      style={mergeStyle(
        {
          "--_button-next-label": nextLabel && cssString(nextLabel),
          "--_button-prev-label": previousLabel && cssString(previousLabel),
          "--_items-per-view": itemsPerView,
          "--_marker-label":
            markerLabel && counterLabel(markerLabel, "ui-carousel-item"),
          "--_media-aspect-ratio": aspectRatio,
        },
        style ?? {},
      )}
      {...rest}
    >
      {children}
    </ul>
  )
}
