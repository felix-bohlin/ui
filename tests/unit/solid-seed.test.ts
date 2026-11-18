import { describe, expect, test } from "vitest"
import { createRoot } from "solid-js"
import {
  callHandler,
  control,
  seedChecked,
} from "../../packages/opui/components/solid"

const inputOf = (
  type: string,
  value: string,
  state: { checked: boolean; defaultChecked: boolean },
) => ({ ...state, type, value }) as HTMLInputElement

const seeded = () => {
  const reported: string[] = []
  const report = (input: HTMLInputElement) => {
    reported.push(input.value)
  }
  return { report, reported }
}

describe("seedChecked", () => {
  test("a radio picked before hydration reports itself, and the one it unchecked doesn't", async () => {
    const { report, reported } = seeded()
    const profile = inputOf("radio", "profile", {
      checked: false,
      defaultChecked: true,
    })
    const settings = inputOf("radio", "settings", {
      checked: true,
      defaultChecked: false,
    })
    seedChecked(report)(profile)
    seedChecked(report)(settings)
    await Promise.resolve()
    expect(reported).toEqual(["settings"])
    expect([profile.checked, settings.checked]).toEqual([false, true])
  })

  test("a box ticked or unticked before hydration reports itself", async () => {
    const { report, reported } = seeded()
    seedChecked(report)(
      inputOf("checkbox", "bold", { checked: true, defaultChecked: false }),
    )
    seedChecked(report)(
      inputOf("checkbox", "italic", { checked: false, defaultChecked: true }),
    )
    await Promise.resolve()
    expect(reported).toEqual(["bold", "italic"])
  })

  test("an untouched input, and one rendered on the client, reports nothing", async () => {
    const { report, reported } = seeded()
    seedChecked(report)(
      inputOf("radio", "profile", { checked: true, defaultChecked: true }),
    )
    seedChecked(report)(
      inputOf("checkbox", "bold", { checked: false, defaultChecked: false }),
    )
    await Promise.resolve()
    expect(reported).toEqual([])
  })
})

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

  test("the server render hands a control its first state under the HTML name, and leaves the key out when there is none", () => {
    expect(server("value", () => "a", "b")).toEqual({ value: "b" })
    expect(server("value", () => undefined, ["a", "c"])).toEqual({
      value: ["a", "c"],
    })
    expect(server("checked", () => true, false)).toEqual({ checked: false })
    expect(server("selected", undefined, true)).toEqual({ selected: true })
    expect(server("value", () => "a")).toEqual({})
    expect(server("selected", undefined, undefined)).toEqual({})
  })
})
