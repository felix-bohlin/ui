import { describe, expect, test } from "vitest"
import { seedChecked } from "../../packages/opui/components/svelte"

const inputOf = (
  type: string,
  value: string,
  state: { checked: boolean; defaultChecked: boolean },
) => ({ ...state, type, value }) as HTMLInputElement

const seeded = () => {
  const reported: string[] = []
  const check = (input: HTMLInputElement) => {
    reported.push(input.value)
  }
  return { check, reported }
}

describe("seedChecked", () => {
  test("a radio picked before hydration reports itself, and the one it unchecked keeps its state", () => {
    const { check, reported } = seeded()
    const profile = inputOf("radio", "profile", {
      checked: false,
      defaultChecked: true,
    })
    const settings = inputOf("radio", "settings", {
      checked: true,
      defaultChecked: false,
    })
    seedChecked(() => true, check)(profile)
    seedChecked(() => false, check)(settings)
    expect(reported).toEqual(["settings"])
    expect([profile.checked, settings.checked]).toEqual([false, true])
  })

  test("a box ticked or unticked before hydration reports itself", () => {
    const { check, reported } = seeded()
    const ticked = inputOf("checkbox", "bold", {
      checked: true,
      defaultChecked: false,
    })
    const unticked = inputOf("checkbox", "italic", {
      checked: false,
      defaultChecked: true,
    })
    seedChecked(() => false, check)(ticked)
    seedChecked(() => true, check)(unticked)
    expect(reported).toEqual(["bold", "italic"])
    expect([ticked.checked, unticked.checked]).toEqual([true, false])
  })

  test("an untouched input takes the state, and so does every later run", () => {
    const { check, reported } = seeded()
    let state = true
    const attach = seedChecked(() => state, check)
    const input = inputOf("checkbox", "bold", {
      checked: false,
      defaultChecked: false,
    })
    attach(input)
    expect(input.checked).toBe(true)
    state = false
    attach(input)
    expect(input.checked).toBe(false)
    expect(reported).toEqual([])
  })
})
