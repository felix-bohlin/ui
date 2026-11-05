import { createComponent, NoHydration, renderToString } from "@solidjs/web"
import type { Component } from "solid-js"

export const renderSolid = (Component: Component, renderId: string) =>
  renderToString(
    () =>
      createComponent(NoHydration, {
        get children() {
          return createComponent(Component, {})
        },
      }),
    { noScripts: true, renderId },
  )
