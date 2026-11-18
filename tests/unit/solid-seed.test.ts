import { describe, expect, test } from "vitest"
import {
  callHandler,
  checkedProps,
  seedChecked,
  serverValue,
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

describe("checkedProps", () => {
  test("a checked state binds checked and keeps the default it started with, so a client render prints it and a change before hydration leaves the server's default alone", () => {
    expect(checkedProps(true, false)).toEqual({
      checked: true,
      defaultChecked: false,
    })
    expect(checkedProps(false, true)).toEqual({
      checked: false,
      defaultChecked: true,
    })
  })

  test("without a checked state only the default is set, so Solid never writes over what the user picked", () => {
    expect(checkedProps(undefined, true)).toEqual({ defaultChecked: true })
    expect(checkedProps(undefined)).toEqual({ defaultChecked: undefined })
    expect("checked" in checkedProps(undefined, true)).toBe(false)
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

describe("serverValue", () => {
  test("the server render hands a select its first value, which picks its options, and leaves the key out when there is none", () => {
    expect(serverValue("b")).toEqual({ value: "b" })
    expect(serverValue(["a", "c"])).toEqual({ value: ["a", "c"] })
    expect("value" in serverValue(undefined)).toBe(false)
  })
})
