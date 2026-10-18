import { createElement, type ComponentType } from "react"
import { createRoot } from "react-dom/client"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: ComponentType }>(
  "../../component-examples/*/*.react.tsx",
)

mountExamples("react", ".react.tsx", loaders, (el, mod, id) => {
  createRoot(el, {
    identifierPrefix: `${id.replace(/[^\w-]/g, "-")}-`,
  }).render(createElement(mod.default))
})
