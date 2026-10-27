import type { Theme } from "./theme"

const key = (theme: Theme) => JSON.stringify(theme)

export const createHistory = (limit = 100) => {
  const past: string[] = []
  const future: string[] = []
  let current = ""
  let stamp = 0

  return {
    get canRedo() {
      return future.length > 0
    },

    get canUndo() {
      return past.length > 0
    },

    push(theme: Theme, now = Date.now()) {
      const next = key(theme)
      if (next === current) return false
      if (current !== "") {
        if (now - stamp < 400 && past.length > 0) {
          stamp = now
          current = next
          return true
        }
        past.push(current)
        if (past.length > limit) past.shift()
      }
      future.length = 0
      current = next
      stamp = now
      return true
    },

    redo(): Theme | null {
      const next = future.pop()
      if (next === undefined) return null
      past.push(current)
      current = next
      stamp = 0
      return JSON.parse(next)
    },

    undo(): Theme | null {
      const previous = past.pop()
      if (previous === undefined) return null
      future.push(current)
      current = previous
      stamp = 0
      return JSON.parse(previous)
    },
  }
}
