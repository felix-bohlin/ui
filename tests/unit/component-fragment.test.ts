import ts from "typescript"
import { describe, expect, test } from "vitest"
import {
  devOnly,
  groupWarning,
  rewriteFragment,
  rewriteStatementFragment,
} from "../../scripts/component-emit.mjs"
import {
  code,
  declaration,
  declaredIn,
  fragment,
  importsOf,
  join,
  named,
  needed,
  needsOf,
  reads,
  slotReads,
  typed,
  uses,
} from "../../scripts/component-fragment.mjs"

const CX = named("../cx", "cx")
const DEFINED = named("../attrs", "defined")
const FILLED = named("../attrs", "filled")

const lines = (
  parts: Parameters<typeof importsOf>[0],
  ...modules: string[]
) => {
  const imports = importsOf(parts)
  return modules.flatMap((module) => imports.line(module))
}

describe("composing fragments", () => {
  test("code and join keep the text of strings and fragments and the needs of every part", () => {
    const attribute = uses(
      fragment("class={cx(list)}", {
        declarations: ["list"],
        slots: [{ scope: "top", slot: "children" }],
      }),
      CX,
    )
    const element = code`<div ${join([attribute, 'id="x"'], " ")}>`
    expect(element.code).toBe('<div class={cx(list)} id="x">')
    expect(needsOf([element])).toEqual({
      declarations: ["list"],
      imports: [CX],
      slots: [{ scope: "top", slot: "children" }],
    })
  })

  test("a line names what it declares, and reads names what it reads", () => {
    const line = declaration(
      "label",
      reads("const label = () => text()", "text"),
    )
    expect(line.code).toBe("const label = () => text()")
    expect(line.declarations).toEqual(["text"])
    expect(declaredIn([line, fragment("if (DEV) warn()")])).toEqual(["label"])
  })
})

describe("imports from the fragments", () => {
  test("a module's line names each import once, sorted, and is a type import only when every name is a type", () => {
    const parts = [
      uses("a", named("react", "useMemo"), typed("react", "ComponentProps")),
      uses("b", named("react", "useId"), named("react", "useMemo")),
      uses("c", typed("./types", "Context")),
    ]
    expect(lines(parts, "react", "./types")).toEqual([
      'import { type ComponentProps, useId, useMemo } from "react"',
      'import type { Context } from "./types"',
    ])
  })

  test("a port that writes every type inline keeps one form", () => {
    const parts = [uses("a", typed("vue", "IntrinsicElementAttributes"))]
    expect(importsOf(parts).line("vue", { typeOnly: false })).toEqual([
      'import { type IntrinsicElementAttributes } from "vue"',
    ])
  })

  test("a name one fragment needs as a value and another as a type imports as a value", () => {
    const parts = [
      uses("a", typed("vue", "Ref")),
      uses("b", named("vue", "Ref")),
    ]
    expect(lines(parts, "vue")).toEqual(['import { Ref } from "vue"'])
  })

  test("an import no kept fragment needs isn't written, and a module is written once", () => {
    const parts = [uses("a", DEFINED)]
    const imports = importsOf(parts)
    expect(imports.line("../cx")).toEqual([])
    expect(imports.line("../attrs")).toEqual([
      'import { defined } from "../attrs"',
    ])
    expect(imports.line("../attrs")).toEqual([])
  })

  test("the rest are the modules no line took yet, ordered by their first name, without the ones left for later", () => {
    const parts = [
      uses("a", named("../group", "toggleInGroup")),
      uses("b", named("../svelte", "relayChecked")),
      uses("c", named("svelte", "untrack")),
      uses("d", named("../dev", "DEV")),
    ]
    const imports = importsOf(parts)
    expect(imports.line("svelte")).toEqual(['import { untrack } from "svelte"'])
    expect(imports.rest(["../dev"])).toEqual([
      'import { relayChecked } from "../svelte"',
      'import { toggleInGroup } from "../group"',
    ])
    expect(imports.rest()).toEqual(['import { DEV } from "../dev"'])
  })

  test("merged adds the names to the source's own import of the module, or appends a line for it", () => {
    const parts = [
      uses("a", named("../dev", "DEV")),
      uses("b", named("../dev", "warnGroupedChecked")),
      uses("c", named("../cx", "cx")),
    ]
    expect(
      importsOf(parts).merged(
        ['import { warnUnnamed } from "../dev"'],
        ["../dev", "../cx"],
      ),
    ).toEqual([
      'import { DEV, warnGroupedChecked, warnUnnamed } from "../dev"',
      'import { cx } from "../cx"',
    ])
  })
})

describe("declarations from the fragments", () => {
  test("a declaration is kept only when a root or a kept declaration reads it", () => {
    const first = declaration("first", "const first = 1")
    const second = declaration(
      "second",
      reads("const second = first + 1", "first"),
    )
    const unread = declaration(
      "unread",
      reads("const unread = second", "second"),
    )
    const markup = reads("{{ second }}", "second")
    expect(needed([markup], [first, second, unread])).toEqual([first, second])
    expect(needed([fragment("<div />")], [first, second, unread])).toEqual([])
  })

  test("the imports of a declaration nobody reads aren't needed", () => {
    const line = declaration(
      "items",
      uses("const items = computed(() => list)", named("vue", "computed")),
    )
    const kept = needed([fragment("<ul />")], [line])
    expect(lines(kept, "vue")).toEqual([])
    expect(lines(needed([reads("items", "items")], [line]), "vue")).toEqual([
      'import { computed } from "vue"',
    ])
  })
})

describe("slot reads from the fragments", () => {
  test("slotReads counts the reads of each slot in the scopes it is asked about", () => {
    const loop = {}
    const read = (slot: string, scope: unknown) =>
      fragment(`props.${slot}`, { slots: [{ scope, slot }] })
    const parts = [
      code`filled(${read("children", "top")})`,
      code`{${read("children", "top")}}`,
      code`<For>{${read("children", loop)}}</For>`,
      read("icon", "top"),
    ]
    expect(slotReads(parts, (scope: unknown) => scope === "top")).toEqual(
      new Map([
        ["children", 2],
        ["icon", 1],
      ]),
    )
    expect(slotReads(parts, () => true)).toEqual(
      new Map([
        ["children", 3],
        ["icon", 1],
      ]),
    )
  })
})

describe("the needs of rewritten code", () => {
  const top = { scope: "top", slot: "children" }
  const slotted = fragment("props.children", { slots: [top] })

  test("a rename and a slot check carry their needs into the code they write", () => {
    const rewritten = rewriteFragment('label && Astro.slots.has("default")', {
      rename: new Map([["label", reads("label()", "label")]]),
      slotHas: () => uses(code`filled(${slotted})`, FILLED),
    })
    expect(rewritten.code).toBe("label() && filled(props.children)")
    expect(needsOf([rewritten])).toEqual({
      declarations: ["label"],
      imports: [FILLED],
      slots: [top],
    })
  })

  test("each written read counts, and one the || simplification drops doesn't", () => {
    const rename = new Map([["content", slotted]])
    const twice = rewriteFragment("content ? [content] : []", { rename })
    expect(twice.slots).toEqual([top, top])
    const once = rewriteFragment("content || content", { rename })
    expect(once.code).toBe("props.children")
    expect(once.slots).toEqual([top])
  })

  test("a read of a declared name is a need, unless a parameter shadows it or it names a property", () => {
    const options = { declared: new Set(["items", "size"]) }
    expect(
      rewriteFragment("items.map((size) => size + width)", options)
        .declarations,
    ).toEqual(["items"])
    expect(
      rewriteFragment("({ size: other.size, items })", options).declarations,
    ).toEqual(["items"])
  })

  test("a rename written as a function gets the read it replaces, and two reads that write the same code keep their own needs", () => {
    const rename = new Map([
      [
        "rest",
        (read: ts.Node) =>
          fragment("attrs", {
            declarations: [
              ts.isPropertyAccessExpression(read.parent) ? "member" : "whole",
            ],
          }),
      ],
    ])
    const rewritten = rewriteFragment("rest.title ?? use(rest)", { rename })
    expect(rewritten.code).toBe("attrs.title ?? use(attrs)")
    expect(rewritten.declarations).toEqual(["member", "whole"])
  })

  test("an object of the rest spread and the props read by their own names is the props object", () => {
    const wholeProps = {
      props: (name: string) => name === "label",
      rest: "rest",
    }
    const rename = new Map([
      ["label", "props.label"],
      ["size", "size()"],
    ])
    expect(
      rewriteStatementFragment('warn("Sample", { ...rest, label })', {
        rename,
        wholeProps,
      }).code,
    ).toBe('warn("Sample", props);')
    expect(
      rewriteStatementFragment('warn("Sample", { ...rest, size })', {
        rename,
        wholeProps,
      }).code,
    ).toBe('warn("Sample", { ...rest, size: size() });')
  })

  test("the framework's uid is a read of uid", () => {
    const ids = { bases: new Map(), prefixes: new Set(["createId"]) }
    expect(
      rewriteFragment('createId("panel")', { declared: new Set(), ids })
        .declarations,
    ).toEqual(["uid"])
  })

  test("a dev-only warning needs DEV, and the group warning its helper, with the needs of what they read", () => {
    const warning = devOnly(
      groupWarning(
        { name: "Sample" },
        { group: "Tabs", grouped: "grouped" },
        reads("checked()", "checked"),
      ),
    )
    expect(warning.code).toBe(
      'if (DEV)\n    warnGroupedChecked("Sample", grouped, checked(), "Tabs");',
    )
    expect(needsOf([warning])).toEqual({
      declarations: ["checked"],
      imports: [named("../dev", "warnGroupedChecked"), named("../dev", "DEV")],
      slots: [],
    })
  })
})
