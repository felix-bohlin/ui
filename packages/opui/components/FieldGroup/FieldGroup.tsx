import { omit, useContext } from "solid-js"
import { FieldGroupContext } from "./context"
import type { Props } from "./types.solid"

export default function FieldGroup(props: Props) {
  const rest = omit(props, "children", "class", "direction", "name")
  const parent = useContext(FieldGroupContext)

  return (
    <FieldGroupContext value={{ name: props.name || parent.name }}>
      <div
        class={[
          "ui-field-group",
          props.direction && `ui-${props.direction}`,
          props.class,
        ]}
        {...rest}
        role="group"
      >
        {props.children}
      </div>
    </FieldGroupContext>
  )
}
