import { cx } from "../cx"
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
  const vars = {
    ...(itemsPerView ? { "--_items-per-view": itemsPerView } : {}),
    ...(aspectRatio ? { "--_media-aspect-ratio": aspectRatio } : {}),
  }

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
      style={itemsPerView || aspectRatio ? { ...vars, ...style } : style}
      {...rest}
    >
      {children}
    </ul>
  )
}
