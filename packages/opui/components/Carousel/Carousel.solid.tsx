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
    "role",
    "stretch",
    "style",
    "children",
  )

  return (
    <ul
      class={[
        "ui-carousel",
        {
          "ui-markers": props.markers,
          "ui-peek": props.peek,
          "ui-persistent-buttons": props.persistentButtons,
          "ui-stretch": props.stretch,
          "ui-vertical": props.orientation === "vertical",
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
          "--_button-previous-label":
            props.previousLabel && cssString(props.previousLabel),
          "--_items-per-view": props.itemsPerView,
          "--_marker-label":
            props.markerLabel &&
            counterLabel(props.markerLabel, "ui-carousel-item"),
          "--_media-aspect-ratio": props.aspectRatio,
        },
        props.style,
      )}
      role={props.role ?? "list"}
      {...rest}
    >
      {props.children}
    </ul>
  )
}
