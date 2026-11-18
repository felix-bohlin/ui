import { hydrate, render } from "@solidjs/web"
import { createComponent, type Component } from "solid-js"
import { hydratable, mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: Component }>(
  "../../component-examples/*/*.solid.tsx",
)

const renderIdOf = (el: HTMLElement) =>
  hydratable(el) ? el.dataset.solidRenderId : undefined

mountExamples("solid", ".solid.tsx", loaders, (el, mod) => {
  const renderId = renderIdOf(el)
  const app = () => createComponent(mod.default, {})
  if (renderId === undefined) render(app, el)
  else hydrate(app, el, { renderId })
})
