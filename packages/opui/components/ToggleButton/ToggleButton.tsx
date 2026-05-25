import { splitProps, type JSX, useContext, createUniqueId } from "solid-js"
import { ToggleGroupContext } from "../ToggleGroup/ToggleGroup"
import type { Props } from "./types.solid"

export default function ToggleButton(props: Props) {
  const [local, rest] = splitProps(props, [
    "disabled",
    "id",
    "label",
    "name",
    "pressed",
    "size",
    "type",
    "value",
    "class",
    "children",
  ])

  const group = useContext(ToggleGroupContext)
  const finalName = () => local.name || group?.name
  const finalType = () => local.type || group?.type || "checkbox"
  const inputId = () => local.id || createUniqueId()

  return (
    <label
      class={`ui-toggle-button ${local.disabled ? "ui-disabled" : ""} ${local.size ? `ui-${local.size}` : ""} ${local.class || ""}`.trim()}
    >
      <input
        aria-pressed={finalType() === "checkbox" ? local.pressed : undefined}
        checked={local.pressed}
        disabled={local.disabled}
        id={inputId()}
        name={finalName()}
        type={finalType()}
        value={local.value || local.label}
        {...rest}
      />
      {local.children}
    </label>
  )
}
