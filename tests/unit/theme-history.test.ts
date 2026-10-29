import { describe, expect, test } from "vitest"
import { createHistory } from "../../src/utils/theme-history"

const theme = (radius: string) => ({
  preset: null,
  tokens: { "--ui-radius": radius },
})

describe("createHistory", () => {
  test("starts empty and ignores a repeated state", () => {
    const history = createHistory()
    expect(history.canUndo).toBe(false)
    expect(history.push(theme("0"), 0)).toBe(true)
    expect(history.push(theme("0"), 1000)).toBe(false)
    expect(history.canUndo).toBe(false)
  })

  test("undoes and redoes in order", () => {
    const history = createHistory()
    history.push(theme("0"), 0)
    history.push(theme("1rem"), 1000)
    history.push(theme("2rem"), 2000)
    expect(history.undo()).toEqual(theme("1rem"))
    expect(history.undo()).toEqual(theme("0"))
    expect(history.undo()).toBeNull()
    expect(history.canRedo).toBe(true)
    expect(history.redo()).toEqual(theme("1rem"))
    expect(history.redo()).toEqual(theme("2rem"))
    expect(history.redo()).toBeNull()
  })

  test("a new change after an undo drops the redo branch", () => {
    const history = createHistory()
    history.push(theme("0"), 0)
    history.push(theme("1rem"), 1000)
    history.undo()
    history.push(theme("3rem"), 2000)
    expect(history.canRedo).toBe(false)
    expect(history.undo()).toEqual(theme("0"))
  })

  test("merges changes that follow within 400ms, like a slider drag", () => {
    const history = createHistory()
    history.push(theme("0"), 0)
    history.push(theme("0.1rem"), 1000)
    history.push(theme("0.2rem"), 1100)
    history.push(theme("0.3rem"), 1200)
    expect(history.undo()).toEqual(theme("0"))
    expect(history.redo()).toEqual(theme("0.3rem"))
  })

  test("keeps at most the limit", () => {
    const history = createHistory(2)
    for (let index = 0; index < 5; index++) {
      history.push(theme(`${index}rem`), index * 1000)
    }
    expect(history.undo()).toEqual(theme("3rem"))
    expect(history.undo()).toEqual(theme("2rem"))
    expect(history.undo()).toBeNull()
  })
})
