import { describe, expect, test } from "vitest"
import { createRoot } from "solid-js"
import {
  callHandler,
  control,
  optionSelected,
} from "../../packages/opui/components/solid"

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

  test("the server render hands a control its value, or its default when there is no value, under the HTML name, and leaves the key out when there is neither", () => {
    expect(server("value", () => "a", "b")).toEqual({ value: "a" })
    expect(server("value", () => undefined, ["a", "c"])).toEqual({
      value: ["a", "c"],
    })
    expect(server("checked", () => true, false)).toEqual({ checked: true })
    expect(server("checked", () => undefined, false)).toEqual({
      checked: false,
    })
    expect(server("value", () => "a")).toEqual({ value: "a" })
    expect(server("value", () => undefined)).toEqual({})
  })

  test("the server render hands an option its selected state, and leaves the key out when there is none", () => {
    expect(optionSelected(true).server).toEqual({ selected: true })
    expect(optionSelected(false).server).toEqual({ selected: false })
    expect(optionSelected(undefined).server).toEqual({})
  })
})
