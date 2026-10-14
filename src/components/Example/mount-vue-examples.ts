import { createApp } from "vue"
import { mountExamples } from "./mount-examples"

const loaders = import.meta.glob("../../component-examples/**/*.vue") as Record<
  string,
  () => Promise<{ default: Parameters<typeof createApp>[0] }>
>

mountExamples("vue", ".vue", loaders, (el, mod, id) => {
  const app = createApp(mod.default)
  app.config.idPrefix = id.replace(/[^\w-]/g, "-")
  app.mount(el)
})
