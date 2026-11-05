/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { createUniqueId, omit } from "solid-js"
import { FieldsetContext } from "./context.solid"
import { autoLabelledBy, createIds } from "../id"
import type { Props } from "./types.solid"

export default function Fieldset(props: Props) {
  const rest = omit(props, "as", "class", "children")
  const uid = createUniqueId()
  const tag = () => props.as || "fieldset"
  const Tag = dynamic(tag)
  const isFieldset = () => tag() === "fieldset"
  const legendId = () =>
    isFieldset()
      ? undefined
      : autoLabelledBy(rest, createIds(uid, "fieldset", rest.id)("legend"))

  return (
    <FieldsetContext
      value={{
        get legendId() {
          return legendId()
        },
      }}
    >
      <Tag
        aria-labelledby={legendId()}
        class={["ui-fieldset", props.class]}
        role={isFieldset() ? undefined : "group"}
        {...(rest as object)}
      >
        {props.children}
      </Tag>
    </FieldsetContext>
  )
}
