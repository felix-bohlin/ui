import { createElement, type ComponentType } from "react"
import { createRoot, hydrateRoot } from "react-dom/client"
import { flushSync } from "react-dom"
import { hydratable, idPrefixOf, mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: ComponentType }>(
  "../../component-examples/*/*.react.tsx",
)

mountExamples("react", ".react.tsx", loaders, (el, mod, id) => {
  const identifierPrefix = `${idPrefixOf(id)}-`
  const example = createElement(mod.default)
  flushSync(() => {
    if (hydratable(el)) hydrateRoot(el, example, { identifierPrefix })
    else createRoot(el, { identifierPrefix }).render(example)
  })
})
