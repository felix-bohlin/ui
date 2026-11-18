/** @jsxImportSource @solidjs/web */
import { dynamic } from "@solidjs/web"
import { createUniqueId, omit } from "solid-js"
import { defined } from "../attrs"
import { FieldsetContext } from "./context.solid"
import { autoLabelledBy } from "../id"
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
      : autoLabelledBy(rest, `${rest.id || `fieldset-${uid}`}-legend`)
  const tagRole = () => (isFieldset() ? undefined : "group")

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
        role={tagRole()}
        {...defined(rest as object)}
      >
        {props.children}
      </Tag>
    </FieldsetContext>
  )
}
