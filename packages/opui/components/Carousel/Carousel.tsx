import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Carousel(props: Props) {
  const rest = omit(
    props,
    "align",
    "buttons",
    "children",
    "class",
    "label",
    "markers",
    "orientation",
    "peek",
    "persistentButtons",
    "perView",
    "stretch",
    "style",
  )

  const buttons = () => props.buttons ?? true

  const style = () => {
    const perViewStyle = props.perView ? `--_per-view: ${props.perView};` : ""

    if (typeof props.style === "string" || !props.style) {
      return `${perViewStyle}${props.style ?? ""}` || undefined
    }
    return {
      ...(props.perView ? { "--_per-view": props.perView } : {}),
      ...props.style,
    }
  }

  return (
    <ul
      aria-label={props.label}
      class={[
        "ui-carousel",
        {
          "ui-buttons-outside": buttons() === "outside",
          "ui-buttons-persistent": props.persistentButtons,
          "ui-peek": props.peek,
          "ui-stretch": props.stretch,
          "ui-vertical": props.orientation === "vertical",
          "ui-with-buttons": !!buttons(),
          "ui-with-markers": props.markers,
        },
        props.align && props.align !== "start" && `ui-align-${props.align}`,
        props.class,
      ]}
      style={style()}
      {...rest}
    >
      {props.children}
    </ul>
  )
}
