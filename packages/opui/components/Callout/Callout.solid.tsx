/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { CalloutContext } from "./context.solid"
import type { Props } from "./types.solid"

export default function Callout(props: Props) {
  const rest = omit(props, "class", "severity", "variant", "children")

  return (
    <CalloutContext
      value={{
        get severity() {
          return props.severity
        },
      }}
    >
      <article
        class={[
          "ui-callout",
          props.severity && `ui-${props.severity}`,
          props.variant && props.variant !== "tonal" && `ui-${props.variant}`,
          props.class,
        ]}
        {...rest}
      >
        {props.children}
      </article>
    </CalloutContext>
  )
}
