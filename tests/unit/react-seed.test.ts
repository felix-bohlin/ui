import { describe, expect, test } from "vitest"
import { seedChecked } from "../../packages/opui/components/react"

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
    const ticked = inputOf("checkbox", "bold", {
      checked: true,
      defaultChecked: false,
    })
    const unticked = inputOf("checkbox", "italic", {
      checked: false,
      defaultChecked: true,
    })
    seedChecked(report)(ticked)
    seedChecked(report)(unticked)
    expect(reported).toEqual(["bold", "italic"])
  })

  test("an untouched input reports nothing", () => {
    const { report, reported } = seeded()
    seedChecked(report)(
      inputOf("radio", "profile", { checked: true, defaultChecked: true }),
    )
    seedChecked(report)(
      inputOf("checkbox", "bold", { checked: false, defaultChecked: false }),
    )
    expect(reported).toEqual([])
  })

  test("an input reports once, however often its ref runs, and a detach reports nothing", () => {
    const { report, reported } = seeded()
    const input = inputOf("checkbox", "bold", {
      checked: true,
      defaultChecked: false,
    })
    seedChecked(report)(input)
    seedChecked(report)(null)
    seedChecked(report)(input)
    input.checked = false
    seedChecked(report)(input)
    expect(reported).toEqual(["bold"])
  })
})
