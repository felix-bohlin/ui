import { AsyncLocalStorage } from "node:async_hooks"

const storage = new AsyncLocalStorage<Map<symbol, unknown>>()

export const createContext = <T>() => {
  const key = Symbol()
  return {
    get: () => storage.getStore()?.get(key) as T | undefined,
    provide: (value: T, render: () => Promise<string>) => {
      const store = new Map(storage.getStore())
      store.set(key, value)
      return storage.run(store, render)
    },
  }
}
