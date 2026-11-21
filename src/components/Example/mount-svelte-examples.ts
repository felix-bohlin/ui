import { hydrate, mount, type Component } from "svelte"
import { hydratable, mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{ default: Component }>(
  "../../component-examples/*/*.svelte",
)

mountExamples("svelte", ".svelte", loaders, (el, mod) => {
  if (hydratable(el)) hydrate(mod.default, { target: el })
  else mount(mod.default, { target: el })
})
