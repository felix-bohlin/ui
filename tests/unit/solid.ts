import { renderSolid as render } from "../../src/components/Example/render-solid"

export type SolidComponent<P = Record<string, unknown>> = (props: P) => unknown

export const renderSolid = <P extends Record<string, unknown>>(
  Component: SolidComponent<P>,
  props = {} as P,
) => render(Component as never, "solid-", props)
