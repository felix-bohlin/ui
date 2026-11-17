import { describe, expect, test } from "vitest"
import {
  callHandler,
  checkedProps,
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
  test("a radio picked before hydration reports itself, and the one it unchecked doesn't", () => {
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
    expect(reported).toEqual(["settings"])
    expect([profile.checked, settings.checked]).toEqual([false, true])
  })

  test("a box ticked or unticked before hydration reports itself", () => {
    const { report, reported } = seeded()
    seedChecked(report)(
      inputOf("checkbox", "bold", { checked: true, defaultChecked: false }),
    )
    seedChecked(report)(
      inputOf("checkbox", "italic", { checked: false, defaultChecked: true }),
    )
    expect(reported).toEqual(["bold", "italic"])
  })

  test("an untouched input, and one rendered on the client, reports nothing", () => {
    const { report, reported } = seeded()
    seedChecked(report)(
      inputOf("radio", "profile", { checked: true, defaultChecked: true }),
    )
    seedChecked(report)(
      inputOf("checkbox", "bold", { checked: false, defaultChecked: false }),
    )
    expect(reported).toEqual([])
  })
})

describe("checkedProps", () => {
  test("a checked state binds checked and keeps the default in step, so a client render and a form reset agree with it", () => {
    expect(checkedProps(true, false)).toEqual({
      checked: true,
      defaultChecked: true,
    })
    expect(checkedProps(false, true)).toEqual({
      checked: false,
      defaultChecked: false,
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
