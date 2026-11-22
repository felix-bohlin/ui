import { globSync, readFileSync } from "node:fs"
import { parseFragment, type DefaultTreeAdapterMap } from "parse5"
import { describe, expect, test } from "vitest"

type Element = DefaultTreeAdapterMap["element"]
type Node = DefaultTreeAdapterMap["childNode"] | Element

const PARTS = ["start-text", "top", "start", "end", "bottom", "end-text"]

const ROOTS = ["ui-field", "ui-one-time-code"]

const CONTROLS = ["input", "select", "textarea"]

const children = (node: Node) =>
  "childNodes" in node
    ? node.childNodes.filter((child): child is Element => "tagName" in child)
    : []

const descendants = (node: Node): Element[] =>
  children(node).flatMap((child) => [child, ...descendants(child)])

const attribute = (element: Element | undefined, name: string) =>
  element?.attrs.find((attr) => attr.name === name)?.value

const hasClass = (element: Element, name: string) =>
  (attribute(element, "class") ?? "").split(/\s+/).includes(name)

const BUTTON_COMMANDS = ["--step-down", "--step-up", "--toggle-password"]

const buttonsOnly = (element: Element): boolean =>
  children(element).length > 0 &&
  children(element).every((child) =>
    ["opui-password-toggle", "opui-step-button"].includes(child.tagName)
      ? buttonsOnly(child)
      : BUTTON_COMMANDS.includes(attribute(child, "command") ?? ""),
  )

export const wiringProblems = (html: string) =>
  descendants(parseFragment(html) as unknown as Node)
    .filter((element) => ROOTS.some((root) => hasClass(element, root)))
    .flatMap((root) => {
      const field = children(root).find((child) =>
        hasClass(child, "ui-field-container"),
      )
      const input =
        field &&
        children(field).find((child) => CONTROLS.includes(child.tagName))
      const id = attribute(input, "id")
      if (!input || !id) {
        return [
          "no <input>, <select> or <textarea> with an id directly in .ui-field-container",
        ]
      }
      const problems: string[] = []
      const label = children(root).find((child) => child.tagName === "label")
      if (label && attribute(label, "for") !== id) {
        problems.push(
          `the label points at ${attribute(label, "for")}, not ${id}`,
        )
      }
      const shown = PARTS.flatMap((part) => {
        const element = [...children(root), ...children(field!)].find((child) =>
          hasClass(child, `ui-${part}`),
        )
        if (!element) return []
        const partId = attribute(element, "id")
        if (["end", "start"].includes(part) && buttonsOnly(element)) {
          return []
        }
        if (partId !== `${id}-${part}`) {
          problems.push(`.ui-${part} has the id ${partId}, not ${id}-${part}`)
        }
        return [`${id}-${part}`]
      })
      const described = (attribute(input, "aria-describedby") ?? "")
        .split(/\s+/)
        .filter((token) => token.startsWith(`${id}-`))
      if (described.join(" ") !== shown.join(" ")) {
        problems.push(
          `${id} is described by "${described.join(" ")}", not "${shown.join(" ")}"`,
        )
      }
      return problems
    })

const FILES = globSync("src/{blocks,component-examples}/*/*.html").toSorted()

describe("every field in the HTML examples and blocks points at the control you write", () => {
  test("covers the files with a text field", () => {
    expect(
      FILES.filter((file) =>
        ROOTS.some((root) => readFileSync(file, "utf8").includes(root)),
      ).length,
    ).toBeGreaterThan(20)
  })

  test.each(FILES)("%s", (file) => {
    expect(wiringProblems(readFileSync(file, "utf8"))).toEqual([])
  })

  test("a sample the check must flag: a part the input doesn't point at, a wrong part id and a label pointing elsewhere", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="y">Name</label><span class="ui-field-container"><input id="x" aria-describedby="x-end-text"><span class="ui-end" id="z">kg</span></span><span class="ui-start-text" id="x-start-text">Hint</span><span class="ui-end-text" id="x-end-text">Error</span></div>',
      ),
    ).toEqual([
      "the label points at y, not x",
      ".ui-end has the id z, not x-end",
      'x is described by "x-end-text", not "x-start-text x-end x-end-text"',
    ])
  })

  test("a sample the check must flag: no input in the field", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><span class="ui-field-container"><span><input id="x"></span></span></div>',
      ),
    ).toEqual([
      "no <input>, <select> or <textarea> with an id directly in .ui-field-container",
    ])
  })

  test("start and end parts that only hold step buttons stay out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Quantity</label><span class="ui-field-container"><span class="ui-start" id="x-start"><opui-step-button><button command="--step-down" commandfor="x"></button></opui-step-button></span><input id="x" type="number"><span class="ui-end" id="x-end"><opui-step-button><button command="--step-up" commandfor="x"></button></opui-step-button></span></span></div>',
      ),
    ).toEqual([])
  })

  test("an end part that only holds a password toggle stays out of the description", () => {
    expect(
      wiringProblems(
        '<div class="ui-field"><label class="ui-label" for="x">Password</label><span class="ui-field-container"><input id="x" type="password"><span class="ui-end" id="x-end"><opui-password-toggle><button command="--toggle-password" commandfor="x"></button></opui-password-toggle></span></span></div>',
      ),
    ).toEqual([])
  })
})
