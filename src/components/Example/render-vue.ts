import { createSSRApp, type Component } from "vue"
import { renderToString } from "vue/server-renderer"

export const renderHydratableVue = (Component: Component, idPrefix: string) => {
  const app = createSSRApp(Component)
  app.config.idPrefix = idPrefix
  return renderToString(app)
}
