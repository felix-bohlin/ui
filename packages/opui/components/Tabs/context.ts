import { createContext } from "solid-js"

export const CurrentPanelIdContext = createContext<() => string | undefined>(
  () => undefined,
)

export const CurrentTabIdContext = createContext<() => string | undefined>(
  () => undefined,
)

export const TabsGroupNameContext = createContext<() => string | undefined>(
  () => undefined,
)
