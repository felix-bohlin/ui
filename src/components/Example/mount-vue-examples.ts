import { createApp, createSSRApp } from "vue"
import { hydratable, idPrefixOf, mountExamples } from "./mount-examples"

const loaders = import.meta.glob<{
  default: Parameters<typeof createApp>[0]
}>("../../component-examples/*/*.vue")

mountExamples("vue", ".vue", loaders, (el, mod, id) => {
  const app = hydratable(el)
    ? createSSRApp(mod.default)
    : createApp(mod.default)
  app.config.idPrefix = idPrefixOf(id)
  app.mount(el)
})
