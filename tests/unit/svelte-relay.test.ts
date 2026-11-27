import { afterEach, describe, expect, test, vi } from "vitest"
import { relayChecked } from "../../packages/opui/components/svelte"

type Listener = (event: { defaultPrevented: boolean; target: unknown }) => void

const documentListeners: Record<string, Listener[]> = {}
const ownerDocument = {
  addEventListener: (type: string, listener: Listener) => {
    ;(documentListeners[type] ??= []).push(listener)
  },
}

const inputOf = (
  type: string,
  value: string,
  state: { checked: boolean; defaultChecked: boolean },
) => {
  const listeners: Record<string, (() => void)[]> = {}
  return {
    ...state,
    addEventListener: (name: string, listener: () => void) => {
      ;(listeners[name] ??= []).push(listener)
    },
    fire: (name: string) => listeners[name]?.forEach((listener) => listener()),
    ownerDocument,
    removeEventListener: (name: string, listener: () => void) => {
      listeners[name] = (listeners[name] ?? []).filter(
        (entry) => entry !== listener,
      )
    },
    type,
    value,
  } as unknown as HTMLInputElement & { fire: (name: string) => void }
}

const relayed = () => {
  const reported: [string, boolean][] = []
  const write = (input: HTMLInputElement) => {
    reported.push([input.value, input.checked])
  }
  return { reported, write }
}

afterEach(() => {
  vi.useRealTimers()
})

describe("relayChecked", () => {
  test("a radio picked before hydration reports itself, and the one it unchecked keeps its state", () => {
    const { reported, write } = relayed()
    const profile = inputOf("radio", "profile", {
      checked: false,
      defaultChecked: true,
    })
    const settings = inputOf("radio", "settings", {
      checked: true,
      defaultChecked: false,
    })
    relayChecked(write, () => true)(profile)
    relayChecked(write, () => false)(settings)
    expect(reported).toEqual([["settings", true]])
    expect([profile.checked, settings.checked]).toEqual([false, true])
  })

  test("a box ticked or unticked before hydration reports itself", () => {
    const { reported, write } = relayed()
    const ticked = inputOf("checkbox", "bold", {
      checked: true,
      defaultChecked: false,
    })
    const unticked = inputOf("checkbox", "italic", {
      checked: false,
      defaultChecked: true,
    })
    relayChecked(write, () => false)(ticked)
    relayChecked(write, () => true)(unticked)
    expect(reported).toEqual([
      ["bold", true],
      ["italic", false],
    ])
    expect([ticked.checked, unticked.checked]).toEqual([true, false])
  })

  test("an untouched input takes the first value it is given, and hands its own state to a value that has none", () => {
    const { reported, write } = relayed()
    const given = inputOf("checkbox", "bold", {
      checked: false,
      defaultChecked: false,
    })
    relayChecked(
      write,
      () => undefined,
      () => true,
    )(given)
    expect(given.checked).toBe(true)
    const own = inputOf("checkbox", "italic", {
      checked: true,
      defaultChecked: true,
    })
    relayChecked(write, () => undefined)(own)
    expect(reported).toEqual([["italic", true]])
  })

  test("a later run writes a value only when it changes, and never undefined, so what the user entered stays", () => {
    const { reported, write } = relayed()
    let state: boolean | undefined = false
    const attach = relayChecked(write, () => state)
    const input = inputOf("checkbox", "bold", {
      checked: false,
      defaultChecked: false,
    })
    attach(input)
    input.checked = true
    state = undefined
    attach(input)
    expect(input.checked).toBe(true)
    state = false
    attach(input)
    expect(input.checked).toBe(false)
    attach(input)
    input.checked = true
    attach(input)
    expect(input.checked).toBe(true)
    expect(reported).toEqual([])
  })

  test("a change reports the input, once per change even after a later run", () => {
    const { reported, write } = relayed()
    let state = false
    const attach = relayChecked(write, () => state)
    const input = inputOf("checkbox", "bold", {
      checked: false,
      defaultChecked: false,
    })
    const cleanup = attach(input)
    input.checked = true
    input.fire("change")
    cleanup()
    state = true
    attach(input)
    input.checked = false
    input.fire("change")
    expect(reported).toEqual([
      ["bold", true],
      ["bold", false],
    ])
  })

  test("a form reset reports each input whose reset state differs from its value, in the task after the reset", () => {
    vi.useFakeTimers()
    const { reported, write } = relayed()
    const bold = inputOf("checkbox", "bold", {
      checked: false,
      defaultChecked: false,
    })
    const italic = inputOf("checkbox", "italic", {
      checked: false,
      defaultChecked: false,
    })
    relayChecked(write, () => false)(bold)
    relayChecked(write, () => true)(italic)
    expect(italic.checked).toBe(true)
    italic.checked = false
    const reset = (defaultPrevented: boolean) => {
      for (const listener of documentListeners.reset ?? []) {
        listener({ defaultPrevented, target: { elements: [bold, italic] } })
      }
    }
    reset(true)
    vi.runAllTimers()
    expect(reported).toEqual([])
    reset(false)
    expect(reported).toEqual([])
    vi.runAllTimers()
    expect(reported).toEqual([["italic", false]])
  })
})
