import { afterEach, beforeEach, describe, expect, test, vi } from "vitest"

vi.mock("@solidjs/web", () => ({
  isServer: false,
  setProperty: (
    node: Record<string, unknown>,
    name: string,
    value: unknown,
  ) => {
    node[name] = value
  },
}))

const { control, optionSelected } =
  await import("../../packages/opui/components/solid")

class SelectStub {
  options: { defaultSelected: boolean; selected: boolean; value: string }[]
  value = ""
  constructor(values: string[]) {
    this.options = values.map((value) => ({
      defaultSelected: false,
      selected: false,
      value,
    }))
  }
}

describe("control on a client render", () => {
  beforeEach(() => {
    vi.stubGlobal("HTMLSelectElement", SelectStub)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  test("writes a value to the property and leaves the default alone", () => {
    const input: Record<string, unknown> = {}
    control("value", () => "a", "b").ref(input as unknown as Element)
    expect(input).toEqual({ value: "a" })
  })

  test("writes only a default to the default property when there is no value", () => {
    const input: Record<string, unknown> = {}
    control("value", () => undefined, "b").ref(input as unknown as Element)
    expect(input).toEqual({ defaultValue: "b" })
    const box: Record<string, unknown> = {}
    control("checked", () => undefined, true).ref(box as unknown as Element)
    expect(box).toEqual({ defaultChecked: true })
  })

  test("writes nothing when there is neither, and only into the first node", () => {
    const first: Record<string, unknown> = {}
    const second: Record<string, unknown> = {}
    const { ref } = control("checked", () => undefined)
    ref(first as unknown as Element)
    expect(first).toEqual({})
    const valued = control("value", () => "a")
    valued.ref(first as unknown as Element)
    valued.ref(second as unknown as Element)
    expect(second).toEqual({})
  })

  test("selects a select's default and marks the options it names as the default", async () => {
    const select = new SelectStub(["a", "b"])
    control("value", () => undefined, "b").ref(select as unknown as Element)
    expect(select.value).toBe("b")
    await Promise.resolve()
    expect(select.options.map((option) => option.defaultSelected)).toEqual([
      false,
      true,
    ])
  })

  test("an option takes its selected state as the property", () => {
    const option: Record<string, unknown> = {}
    optionSelected(true).ref(option as unknown as HTMLOptionElement)
    expect(option).toEqual({ selected: true })
    const unset: Record<string, unknown> = {}
    optionSelected(undefined).ref(unset as unknown as HTMLOptionElement)
    expect(unset).toEqual({})
  })
})
