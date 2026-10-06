import { createContext } from "solid-js"

export const DrawerContext = createContext<{
  headingId: () => string | undefined
  register: (heading: () => string | undefined) => () => void
}>({
  headingId: () => undefined,
  register: () => () => {},
})
