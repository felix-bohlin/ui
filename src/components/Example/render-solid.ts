import { createComponent, NoHydration, renderToString } from "@solidjs/web"
import type { Component } from "solid-js"

export const renderSolid = <P extends Record<string, unknown>>(
  Component: Component<P>,
  renderId: string,
  props = {} as P,
) =>
  renderToString(
    () =>
      createComponent(NoHydration, {
        get children() {
          return createComponent(Component as never, props)
        },
      }),
    { noScripts: true, renderId },
  )

export const renderHydratableSolid = (Component: Component, renderId: string) =>
  renderToString(() => createComponent(Component, {}), { renderId })
