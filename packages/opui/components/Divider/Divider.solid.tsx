/** @jsxImportSource @solidjs/web */
import { children, omit } from "solid-js"
import type { Props } from "./types.solid"

export default function Divider(props: Props) {
  const rest = omit(props, "align", "class", "color", "variant", "children")
  const resolvedChildren = children(() => props.children)

  return (
    <>
      {resolvedChildren() ? (
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
          {resolvedChildren()}
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
