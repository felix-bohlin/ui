import { createElement, type ComponentType } from "react"
import { createRoot } from "react-dom/client"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob(
  "../../component-examples/**/*.react.tsx",
) as Record<string, () => Promise<{ default: ComponentType }>>

mountExamples("react", ".react.tsx", loaders, (el, mod, id) => {
  createRoot(el, {
    identifierPrefix: `${id.replace(/[^\w-]/g, "-")}-`,
  }).render(createElement(mod.default))
})
