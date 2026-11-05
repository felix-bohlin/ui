import { render } from "@solidjs/web"
import { createComponent, type Component } from "solid-js"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: Component }>(
  "../../component-examples/*/*.solid.tsx",
)

mountExamples("solid", ".solid.tsx", loaders, (el, mod) => {
  render(() => createComponent(mod.default, {}), el)
})
