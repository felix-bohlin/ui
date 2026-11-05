/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Divider(props: Props) {
  const rest = omit(props, "align", "class", "color", "variant", "children")

  return (
    <>
      {props.children ? (
        <div
          class={[
            "ui-divider",
            props.align &&
              props.align !== "center" &&
              `ui-align-${props.align}`,
            props.color && `ui-${props.color}`,
            props.variant &&
              props.variant !== "outlined" &&
              `ui-${props.variant}`,
            props.class,
          ]}
          {...(rest as object)}
        >
          {props.children}
        </div>
      ) : (
        <hr
          class={[
            "ui-divider",
            props.color && `ui-${props.color}`,
            props.variant &&
              props.variant !== "outlined" &&
              `ui-${props.variant}`,
            props.class,
          ]}
          {...rest}
        />
      )}
    </>
  )
}
