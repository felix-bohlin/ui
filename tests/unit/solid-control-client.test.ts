import { describe, expect, test, vi } from "vitest"

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

const { control } = await import("../../packages/opui/components/solid")

describe("control on a client render", () => {
  test("writes checked to the property and leaves the default alone", () => {
    const input: Record<string, unknown> = {}
    control(() => true, false).ref(input as unknown as Element)
    expect(input).toEqual({ checked: true })
  })

  test("writes only a default to the default property when there is no value", () => {
    const box: Record<string, unknown> = {}
    control(() => undefined, true).ref(box as unknown as Element)
    expect(box).toEqual({ defaultChecked: true })
  })

  test("writes nothing when there is neither, and only into the first node", () => {
    const first: Record<string, unknown> = {}
    const second: Record<string, unknown> = {}
    const { ref } = control(() => undefined)
    ref(first as unknown as Element)
    expect(first).toEqual({})
    const checked = control(() => true)
    checked.ref(first as unknown as Element)
    checked.ref(second as unknown as Element)
    expect(second).toEqual({})
  })
})
