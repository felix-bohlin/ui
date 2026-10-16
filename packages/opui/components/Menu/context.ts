import { getContext, setContext } from "svelte"

export type MenuContext = {
  rootId?: string
}

const key = Symbol()

export const getMenuContext = () => getContext<MenuContext | undefined>(key)
export const setMenuContext = (context: MenuContext) => setContext(key, context)
