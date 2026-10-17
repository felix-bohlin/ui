import { mount, type Component } from "svelte"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob(
  "../../component-examples/**/*.svelte",
) as Record<string, () => Promise<{ default: Component }>>

mountExamples("svelte", ".svelte", loaders, (el, mod) => {
  mount(mod.default, { target: el })
})
