import { getContext, setContext } from "svelte"

export type DrawerContext = {
  headingId: string
}

const key = Symbol()

export const getDrawerContext = () => getContext<DrawerContext | undefined>(key)
export const setDrawerContext = (context: DrawerContext) =>
  setContext(key, context)
