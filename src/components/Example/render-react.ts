import { createElement, type ComponentType } from "react"
import { renderToString } from "react-dom/server"

export const renderHydratableReact = (
  Component: ComponentType,
  identifierPrefix: string,
) => renderToString(createElement(Component), { identifierPrefix })
