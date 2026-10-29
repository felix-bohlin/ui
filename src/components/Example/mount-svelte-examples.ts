import { mount, type Component } from "svelte"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: Component }>(
  "../../component-examples/*/*.svelte",
)

mountExamples("svelte", ".svelte", loaders, (el, mod) => {
  mount(mod.default, { target: el })
})
