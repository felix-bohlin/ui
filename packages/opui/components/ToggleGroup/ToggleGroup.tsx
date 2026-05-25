/* @jsxImportSource solid-js */
import { splitProps, type JSX, createContext, createUniqueId } from "solid-js"
import type { Props } from "./types.solid"

export const ToggleGroupContext = createContext<{ name: string; type: "radio" | "checkbox" }>()

export default function ToggleGroup(props: Props) {
  const [local, rest] = splitProps(props, [
    "name",
    "orientation",
    "selection",
    "size",
    "class",
    "children",
  ])

  const groupName = () => local.name || createUniqueId()
  const inputType = () => (local.selection === "single" ? "radio" : "checkbox")

  return (
    <ToggleGroupContext.Provider value={{ name: groupName(), type: inputType() }}>
      <div
        class={`ui-toggle-group ${local.size && local.size !== "default" ? `ui-${local.size}` : ""} ${local.orientation ? `ui-${local.orientation}` : ""} ${local.class || ""}`.trim()}
        role={local.selection === "single" ? "radiogroup" : "group"}
        {...rest}
      >
        {local.children}
      </div>
    </ToggleGroupContext.Provider>
  )
}
