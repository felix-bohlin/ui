import { describe, expect, test } from "vitest"
import { createRoot } from "solid-js"
import { callHandler, control } from "../../packages/opui/components/solid"

describe("callHandler", () => {
  test("calls a function handler and a bound [handler, data] pair, and ignores anything else", () => {
    const calls: unknown[][] = []
    const event = new Event("change")
    callHandler((...args: unknown[]) => calls.push(args), event)
    callHandler([(...args: unknown[]) => calls.push(args), "data"], event)
    callHandler(undefined, event)
    expect(calls).toEqual([[event], ["data", event]])
  })
})

describe("control", () => {
  const server = (...args: Parameters<typeof control>) =>
    createRoot((dispose) => {
      const result = control(...args).server
      dispose()
      return result
    })

  test("the server render hands a control its checked state, or its default when there is none, and leaves the key out when there is neither", () => {
    expect(server(() => true, false)).toEqual({ checked: true })
    expect(server(() => undefined, false)).toEqual({ checked: false })
    expect(server(() => false)).toEqual({ checked: false })
    expect(server(() => undefined)).toEqual({})
  })
})
