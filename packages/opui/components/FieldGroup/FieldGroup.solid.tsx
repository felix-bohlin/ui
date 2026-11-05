/** @jsxImportSource @solidjs/web */
import { omit } from "solid-js"
import { FieldGroupContext, useFieldGroupContext } from "./context.solid"
import type { Props } from "./types.solid"

export default function FieldGroup(props: Props) {
  const rest = omit(props, "class", "name", "orientation", "children")
  const parent = useFieldGroupContext()

  return (
    <FieldGroupContext
      value={{
        get name() {
          return props.name || parent?.name
        },
      }}
    >
      <div
        class={[
          "ui-field-group",
          props.orientation &&
            props.orientation !== "auto" &&
            `ui-${props.orientation}`,
          props.class,
        ]}
        {...rest}
      >
        {props.children}
      </div>
    </FieldGroupContext>
  )
}
