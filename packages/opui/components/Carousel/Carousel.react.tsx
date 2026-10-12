import { cx } from "../cx"
import type { Props } from "./types.react"

export default function Carousel({
  align,
  aspectRatio,
  buttons = true,
  className,
  label,
  markers,
  orientation,
  peek,
  persistentButtons,
  perView,
  stretch,
  style,
  children,
  ...rest
}: Props) {
  const vars = {
    ...(perView ? { "--_per-view": perView } : {}),
    ...(aspectRatio ? { "--_media-aspect-ratio": aspectRatio } : {}),
  }

  return (
    <ul
      aria-label={label}
      className={cx([
        "ui-carousel",
        {
          "ui-buttons-outside": buttons === "outside",
          "ui-buttons-persistent": persistentButtons,
          "ui-peek": peek,
          "ui-stretch": stretch,
          "ui-vertical": orientation === "vertical",
          "ui-with-buttons": buttons,
          "ui-with-markers": markers,
        },
        align && align !== "start" && `ui-align-${align}`,
        className,
      ])}
      style={perView || aspectRatio ? { ...vars, ...style } : style}
      {...rest}
    >
      {children}
    </ul>
  )
}
