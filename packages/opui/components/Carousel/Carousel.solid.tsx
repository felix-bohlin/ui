/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { counterLabel, cssString, mergeStyle } from "../style"
import type { Props } from "./types.solid"

export default function Carousel(props: Props) {
  const rest = omit(
    props,
    "align",
    "aspectRatio",
    "buttons",
    "class",
    "itemsPerView",
    "markerLabel",
    "markers",
    "nextLabel",
    "orientation",
    "peek",
    "persistentButtons",
    "previousLabel",
    "stretch",
    "style",
    "children",
  )

  return (
    <ul
      class={[
        "ui-carousel",
        {
          "ui-persistent-buttons": props.persistentButtons,
          "ui-peek": props.peek,
          "ui-stretch": props.stretch,
          "ui-vertical": props.orientation === "vertical",
          "ui-markers": props.markers,
        },
        props.align && props.align !== "start" && `ui-align-${props.align}`,
        props.buttons &&
          props.buttons !== "inside" &&
          `ui-buttons-${props.buttons}`,
        props.class,
      ]}
      style={mergeStyle(
        {
          "--_button-next-label": props.nextLabel && cssString(props.nextLabel),
          "--_button-prev-label":
            props.previousLabel && cssString(props.previousLabel),
          "--_items-per-view": props.itemsPerView,
          "--_marker-label":
            props.markerLabel &&
            counterLabel(props.markerLabel, "ui-carousel-item"),
          "--_media-aspect-ratio": props.aspectRatio,
        },
        props.style,
      )}
      {...rest}
    >
      {props.children}
    </ul>
  )
}
