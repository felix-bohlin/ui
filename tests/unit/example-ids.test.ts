import { existsSync, globSync, readFileSync } from "node:fs"
import { experimental_AstroContainer as AstroContainer } from "astro/container"
import { describe, expect, test } from "vitest"
import {
  assignExampleIds,
  createExampleIdPlaceholders,
} from "../../scripts/example-ids.mjs"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { exampleIdBase } from "../../src/utils/id"
import AwaitsIds from "./fixtures/AwaitsIds.astro"

type Node = ReturnType<typeof parseHtml>[number]

const $ = (n: number) => `opui-example-id-${n}`

describe("assignExampleIds", () => {
  test("numbers ids in document order, parts with their base", () => {
    expect(
      assignExampleIds(
        `<label for="${$(2)}"><span id="${$(2)}-label"></span><input id="${$(2)}" aria-describedby="${$(2)}-end-text"></label><p id="${$(1)}-title"></p>`,
        "select/Spread",
      ),
    ).toBe(
      '<label for="select-spread-1"><span id="select-spread-1-label"></span><input id="select-spread-1" aria-describedby="select-spread-1-end-text"></label><p id="select-spread-2-title"></p>',
    )
  })

  test("skips the numbers the example writes itself", () => {
    expect(
      assignExampleIds(
        `<button commandfor="dialog-a-1"></button><dialog id="dialog-a-1"></dialog><p id="${$(1)}"></p><a href="#dialog-a-3"></a><p id="${$(2)}"></p>`,
        "dialog/A",
      ),
    ).toBe(
      '<button commandfor="dialog-a-1"></button><dialog id="dialog-a-1"></dialog><p id="dialog-a-2"></p><a href="#dialog-a-3"></a><p id="dialog-a-4"></p>',
    )
  })

  test("group names share the counter with ids", () => {
    expect(
      assignExampleIds(
        `<input name="${$(1)}" id="${$(2)}"><input name="${$(1)}" id="${$(3)}">`,
        "tabs/Basics",
      ),
    ).toBe(
      '<input name="tabs-basics-1" id="tabs-basics-2"><input name="tabs-basics-1" id="tabs-basics-3">',
    )
  })

  test("a sample it must flag: an id outside an attribute", () => {
    expect(() => assignExampleIds(`<p>${$(1)}</p>`, "select/Spread")).toThrow(
      "an id from Astro.locals.$id ended up outside an attribute",
    )
  })

  test("follows the document, not the order components ask for ids", async () => {
    const container = await AstroContainer.create()
    const rendered = await container.renderToString(AwaitsIds, {
      locals: {
        $id: createExampleIdPlaceholders(),
        framework: "astro",
        link: (path: string) => path,
      },
    })
    expect(rendered).toBe(`<p id="${$(2)}">30</p><p id="${$(1)}">0</p>`)
    expect(assignExampleIds(rendered, "sample/Awaits")).toBe(
      '<p id="sample-awaits-1">30</p><p id="sample-awaits-2">0</p>',
    )
  })
})

const ID_REFERENCES = [
  "aria-controls",
  "aria-describedby",
  "aria-labelledby",
  "commandfor",
  "for",
  "interestfor",
  "list",
  "popovertarget",
]

const OWNERS = [
  "ui-color-field",
  "ui-dialog",
  "ui-drawer",
  "ui-number-stepper",
  "ui-range",
  "ui-select",
  "ui-text-field",
]

const GROUPS = ["ui-tabs", "ui-toggle-group"]

const attribute = (node: Node, name: string) =>
  node.attrs.find((attr: { name: string }) => attr.name === name)?.value as
    | string
    | undefined

const hasClass = (node: Node, names: string[]) =>
  (attribute(node, "class") ?? "")
    .split(/\s+/)
    .some((name) => names.includes(name))

const elements = (nodes: Node[]): Node[] =>
  nodes.flatMap((node) =>
    node.type === "element" ? [node, ...elements(node.children)] : [],
  )

export const idProblems = (html: string) => {
  const all = elements(parseHtml(html))
  const ids = all.flatMap((node) => attribute(node, "id") ?? [])
  const problems = ids
    .filter((id, index) => ids.indexOf(id) !== index)
    .map((id) => `the id ${id} is used twice`)
  for (const node of all) {
    for (const name of ID_REFERENCES) {
      for (const reference of attribute(node, name)?.split(/\s+/) ?? []) {
        if (reference && !ids.includes(reference)) {
          problems.push(`${name}="${reference}" points at no id`)
        }
      }
    }
  }
  return problems
}

export const ownerProblems = (html: string, key: string, source = "") => {
  const own = new RegExp(`^${exampleIdBase(key)}-(\\d+)`)
  const owners = new Map<string, Set<Node>>()
  const generated = new Set<string>()
  const visit = (nodes: Node[], owner?: Node) => {
    for (const node of nodes) {
      if (node.type !== "element") continue
      const inner = owner ?? (hasClass(node, OWNERS) ? node : undefined)
      const id = attribute(node, "id") ?? ""
      const number = own.exec(id)?.[1]
      if (number && !source.includes(`"${id}"`)) generated.add(number)
      if (number) {
        owners.set(
          number,
          new Set([...(owners.get(number) ?? []), inner ?? node]),
        )
      }
      visit(node.children, inner)
    }
  }
  visit(parseHtml(html))
  const problems = [...owners]
    .filter(([number, nodes]) => generated.has(number) && nodes.size > 1)
    .map(
      ([number, nodes]) =>
        `the number ${number} names ${nodes.size} elements or components`,
    )
  const numbers = new Map<Node, string[]>()
  for (const [number, nodes] of owners) {
    for (const node of nodes)
      numbers.set(node, [...(numbers.get(node) ?? []), number])
  }
  for (const [node, list] of numbers) {
    if (hasClass(node, OWNERS) && list.length > 1) {
      problems.push(
        `one ${attribute(node, "class")} holds the ids of instances ${list.join(" and ")}`,
      )
    }
  }
  return problems
}

export const radioNames = (html: string) => {
  const groups = new Map<string, Set<Node | undefined>>()
  const visit = (nodes: Node[], group?: Node) => {
    for (const node of nodes) {
      if (node.type !== "element") continue
      const inner = hasClass(node, GROUPS) ? node : group
      const name = attribute(node, "name")
      if (node.tag === "input" && attribute(node, "type") === "radio" && name) {
        groups.set(name, new Set([...(groups.get(name) ?? []), inner]))
      }
      visit(node.children, inner)
    }
  }
  visit(parseHtml(html))
  return groups
}

describe("the ids in the HTML examples", () => {
  const files = globSync("src/component-examples/**/*.html").toSorted()
  const keyOf = (file: string) =>
    file.replace("src/component-examples/", "").replace(/\.html$/, "")

  test("are unique and every reference points at one", () => {
    const problems = files.flatMap((file) =>
      idProblems(readFileSync(file, "utf8")).map(
        (problem) => `${file}: ${problem}`,
      ),
    )
    expect(problems).toEqual([])
  })

  test("a sample it must flag: a duplicate and a dangling reference", () => {
    expect(
      idProblems('<p id="a"></p><p id="a"></p><label for="b"></label>'),
    ).toEqual(["the id a is used twice", 'for="b" points at no id'])
  })

  test("belong to the component instance they name", () => {
    const problems = files.flatMap((file) =>
      ownerProblems(
        readFileSync(file, "utf8"),
        keyOf(file),
        readFileSync(
          existsSync(file.replace(/\.html$/, ".astro"))
            ? file.replace(/\.html$/, ".astro")
            : file,
          "utf8",
        ),
      ).map((problem) => `${file}: ${problem}`),
    )
    expect(problems).toEqual([])
  })

  test("a sample it must flag: another instance's end text", () => {
    expect(
      ownerProblems(
        '<label class="ui-text-field"><input id="text-field-a-2"><span id="text-field-a-1-end-text"></span></label>',
        "text-field/A",
      ),
    ).toEqual(["one ui-text-field holds the ids of instances 2 and 1"])
  })

  test("a sample it must flag: a written id and a component sharing a number", () => {
    expect(
      ownerProblems(
        '<form id="form-a-1"><label class="ui-select"><span id="form-a-1-label"></span></label></form>',
        "form/A",
        '<Form id="form-a-1">',
      ),
    ).toEqual(["the number 1 names 2 elements or components"])
  })

  test("give every tabs and toggle group its own radio name, also across the examples of a page", () => {
    const owners = new Map<string, string>()
    const problems: string[] = []
    for (const file of files) {
      for (const [name, groups] of radioNames(readFileSync(file, "utf8"))) {
        const page = `${keyOf(file).split("/")[0]}:${name}`
        if ([...groups].some(Boolean) && groups.size > 1) {
          problems.push(`${file}: ${groups.size} groups share the name ${name}`)
        }
        if (owners.has(page) && owners.get(page) !== file) {
          problems.push(`${file}: ${owners.get(page)} also uses ${name}`)
        }
        owners.set(page, file)
      }
    }
    expect(problems).toEqual([])
  })

  test("a sample it must flag: two tabs with one name", () => {
    const groups = radioNames(
      '<div class="ui-tabs"><input type="radio" name="t"></div><div class="ui-tabs"><input type="radio" name="t"></div>',
    )
    expect(groups.get("t")?.size).toBe(2)
  })
})
