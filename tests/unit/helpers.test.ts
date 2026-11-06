import { describe, expect, test } from "vitest"
import { cx } from "../../packages/opui/components/cx"
import { toggleInGroup } from "../../packages/opui/components/group"
import {
  autoLabelledBy,
  createId,
  createIds,
  idRefs,
} from "../../packages/opui/components/id"
import {
  counterLabel,
  cssString,
  mergeStyle,
  styleVars,
} from "../../packages/opui/components/style"
import { tagAttrs } from "../../packages/opui/components/tag"
import { exampleIdBase } from "../../src/utils/id"

describe("cx", () => {
  test("joins strings, arrays and truthy object keys", () => {
    expect(
      cx([
        "ui-button",
        ["ui-small", false],
        { "ui-filled": true, "ui-round": 0 },
      ]),
    ).toBe("ui-button ui-small ui-filled")
  })

  test("returns undefined instead of an empty class", () => {
    expect(cx([false, null, undefined, "", { "ui-filled": false }])).toBe(
      undefined,
    )
  })
})

describe("styleVars and mergeStyle", () => {
  test("styleVars drops undefined and empty values, keeps 0", () => {
    expect(
      styleVars({ "--_a": undefined, "--_b": "", "--_c": 0, "--_d": "1rem" }),
    ).toBe("--_c: 0; --_d: 1rem;")
  })

  test("mergeStyle appends a string style after the vars", () => {
    expect(mergeStyle({ "--_a": 1 }, "color: red")).toBe("--_a: 1; color: red")
    expect(mergeStyle({ "--_a": undefined }, "color: red")).toBe("color: red")
  })

  test("mergeStyle spreads an object style over the vars", () => {
    expect(mergeStyle({ "--_a": 1 }, { "--_a": 2, color: "red" })).toEqual({
      "--_a": 2,
      color: "red",
    })
  })

  test("mergeStyle returns undefined when there is nothing to set", () => {
    expect(mergeStyle({ "--_a": undefined })).toBe(undefined)
    expect(mergeStyle({}, null)).toBe(undefined)
  })
})

describe("cssString and counterLabel", () => {
  test("cssString quotes text and escapes quotes, backslashes and line breaks", () => {
    expect(cssString("Nästa")).toBe('"Nästa"')
    expect(cssString('Say "hi"\\\n')).toBe('"Say \\"hi\\"\\\\\\a "')
  })

  test("counterLabel puts the counter where {count} is", () => {
    expect(counterLabel("Slide {count}", "x")).toBe('"Slide " counter(x)')
    expect(counterLabel("{count}. dia", "x")).toBe('counter(x) ". dia"')
    expect(counterLabel("Page {count} of the tour", "x")).toBe(
      '"Page " counter(x) " of the tour"',
    )
    expect(counterLabel("Slide", "x")).toBe('"Slide"')
  })
})

describe("tagAttrs", () => {
  test("a button gets type and disabled, no href or aria-disabled", () => {
    expect(tagAttrs("button", true, "/x")).toEqual({
      "aria-disabled": undefined,
      disabled: true,
      href: undefined,
      type: "button",
    })
  })

  test("a disabled link loses its href and gets aria-disabled and the link role", () => {
    expect(tagAttrs("a", true, "/x")).toEqual({
      "aria-disabled": "true",
      disabled: undefined,
      href: undefined,
      role: "link",
      type: undefined,
    })
    expect(tagAttrs("a", false, "/x")).toMatchObject({
      "aria-disabled": undefined,
      href: "/x",
    })
    expect(tagAttrs("a", false, "/x")).not.toHaveProperty("role")
  })

  test("other tags get none of them", () => {
    expect(tagAttrs("span", true, "/x")).toEqual({
      "aria-disabled": undefined,
      disabled: undefined,
      href: undefined,
      type: undefined,
    })
  })
})

describe("ids", () => {
  test("autoLabelledBy only labels a root that has no name of its own", () => {
    expect(autoLabelledBy({}, "title")).toBe("title")
    expect(autoLabelledBy({ "aria-label": "Name" }, "title")).toBe(undefined)
    expect(autoLabelledBy({ "aria-labelledby": "other" }, "title")).toBe(
      undefined,
    )
  })

  test("idRefs joins the ids that are set", () => {
    expect(idRefs("a", undefined, false, null, "b")).toBe("a b")
    expect(idRefs(undefined, "")).toBe(undefined)
  })

  test("createIds asks for one base per instance, only when a part needs it", () => {
    const calls: string[] = []
    const locals = {
      $id: (prefix: string) => {
        calls.push(prefix)
        return `${prefix}-${calls.length}`
      },
    }
    const ids = createIds(locals, "select")
    expect(calls).toEqual([])
    expect([ids("label"), ids("end-text"), ids()]).toEqual([
      "select-1-label",
      "select-1-end-text",
      "select-1",
    ])
    expect(createIds(locals, "select", "x")("label")).toBe("x-label")
    expect(calls).toEqual(["select"])
  })

  test("createId uses the page's generator or a random suffix", () => {
    expect(createId({ $id: (prefix) => `${prefix}-1` })("field")).toBe(
      "field-1",
    )
    const id = createId({})
    expect(id("field")).toMatch(/^field-[0-9a-f]{8}$/)
    expect(id("field")).not.toBe(id("field"))
  })
})

describe("example ids", () => {
  test("exampleIdBase is the slug and the kebab-case name without Code", () => {
    expect(exampleIdBase("select/Spread")).toBe("select-spread")
    expect(exampleIdBase("button/IconAndLabelCode")).toBe(
      "button-icon-and-label",
    )
  })
})

describe("toggleInGroup", () => {
  test("adds a value when on and removes it when off", () => {
    expect(toggleInGroup(["a"], "b", true)).toEqual(["a", "b"])
    expect(toggleInGroup(["a", "b"], "a", false)).toEqual(["b"])
    expect(toggleInGroup(["a"], "b", false)).toEqual(["a"])
  })

  test("doesn't change the group it gets", () => {
    const group = ["a"]
    toggleInGroup(group, "b", true)
    expect(group).toEqual(["a"])
  })
})
