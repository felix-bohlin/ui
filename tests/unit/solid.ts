import { createComponent, NoHydration, renderToString } from "@solidjs/web"

export type SolidComponent<P = Record<string, unknown>> = (props: P) => unknown

export const renderSolid = <P extends Record<string, unknown>>(
  Component: SolidComponent<P>,
  props = {} as P,
) =>
  renderToString(
    () =>
      createComponent(NoHydration, {
        get children() {
          return createComponent(Component as never, props)
        },
      }),
    { renderId: "solid-" },
  )
