import { createElement, type ComponentType } from "react"
import { createRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: ComponentType }>(
  "../../component-examples/*/*.react.tsx",
)

mountExamples("react", ".react.tsx", loaders, (el, mod, id) => {
  const root = createRoot(el, {
    identifierPrefix: `${id.replace(/[^\w-]/g, "-")}-`,
  })
  flushSync(() => root.render(createElement(mod.default)))
})
