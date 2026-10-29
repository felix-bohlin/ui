import { cx } from "../cx"
import { mergeStyle } from "../style"
import type { Props } from "./types.react"

export default function Carousel({
  align,
  aspectRatio,
  buttons,
  className,
  itemsPerView,
  markers,
  orientation,
  peek,
  persistentButtons,
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
          "--_items-per-view": itemsPerView,
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
