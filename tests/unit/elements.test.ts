import { execFileSync } from "node:child_process"
import { globSync, readFileSync } from "node:fs"
import { pathToFileURL } from "node:url"
import { expect, expectTypeOf, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import type { CalloutElement } from "../../packages/opui/elements/callout.js"
import type { CharacterCountElement } from "../../packages/opui/elements/character-count.js"
import type { CopyElement } from "../../packages/opui/elements/copy.js"
import { watchValue } from "../../packages/opui/elements/internal/field-part.js"
import { removeOnNullish } from "../../packages/opui/elements/internal/nullish.js"
import type { PasswordToggleElement } from "../../packages/opui/elements/password-toggle.js"
import type { ReactionsElement } from "../../packages/opui/elements/reactions.js"
import type { SelectAllElement } from "../../packages/opui/elements/select-all.js"
import type { SortableTableElement } from "../../packages/opui/elements/sortable-table.js"
import type { StepButtonElement } from "../../packages/opui/elements/step-button.js"
import type { ToasterElement } from "../../packages/opui/elements/toaster.js"

const importErrors = (urls: string[]) =>
  JSON.parse(
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        `const errors = {}
for (const url of ${JSON.stringify(urls)}) {
  try {
    await import(url)
  } catch (error) {
    errors[url] = String(error)
  }
}
console.log(JSON.stringify(errors))`,
      ],
      { encoding: "utf8" },
    ),
  )

const iconTokens = (source: string) =>
  [...source.matchAll(/(?:-image|mask): var\(--ui-icon-([a-z-]+)\)/g)]
    .map(([, role]) => role)
    .toSorted()

test("callout.css draws the icons of a toast from the icon tokens, and toaster.css draws none of its own", () => {
  expect(
    iconTokens(
      readFileSync("packages/opui/css/components/callout.css", "utf8"),
    ),
  ).toEqual(["close", "critical", "info", "success", "warning"])
  expect(
    readFileSync("packages/opui/css/components/toaster.css", "utf8"),
  ).not.toMatch(/\bmask\b|-image\b/)
})

test("the icon reader flags an icon that isn't a token", () => {
  expect(iconTokens("mask: var(--ui-icon-info) center;")).toEqual(["info"])
  expect(
    iconTokens(`mask: url("data:image/svg+xml,%3Csvg/%3E") center;`),
  ).toEqual([])
})

test("the elements and the css/js scripts import in Node, which has no DOM", () => {
  const sample = "data:text/javascript,document.title"
  expect(Object.keys(importErrors([sample]))).toEqual([sample])

  const scripts = globSync(
    "packages/opui/{css/js,elements,elements/internal}/*.js",
  ).toSorted()
  expect(scripts).toContain("packages/opui/elements/internal/field-part.js")
  expect(
    importErrors(scripts.map((file) => pathToFileURL(file).href)),
    "a server render that imports these fails: reach the DOM only inside a function or class, and define an element only when customElements exists",
  ).toEqual({})
})

class Control {
  #value = ""
  get value() {
    return this.#value
  }
  set value(next) {
    this.#value = next
  }
}

test("watchValue calls each update when a script sets the value, through one wrapper per control, and gives the control its value back after the last unwatch", () => {
  const control = new Control()
  const calls: string[] = []
  const stopA = watchValue(control, () => calls.push(`a ${control.value}`))
  const stopB = watchValue(control, () => calls.push(`b ${control.value}`))
  const wrapper = Object.getPrototypeOf(control)
  expect(wrapper).not.toBe(Control.prototype)
  expect(Object.getPrototypeOf(wrapper)).toBe(Control.prototype)
  control.value = "x"
  stopA()
  expect(Object.getPrototypeOf(control)).toBe(wrapper)
  control.value = "y"
  stopB()
  control.value = "z"
  expect(calls).toEqual(["a x", "b x", "b y"])
  expect(control.value).toBe("z")
  expect(Object.getPrototypeOf(control)).toBe(Control.prototype)
  expect(Object.getOwnPropertySymbols(control)).toEqual([])
})

test("watchValue wraps a value property the control has of its own, as React's value tracker sets, and puts it back", () => {
  const control = new Control()
  const tracked: string[] = []
  const own = {
    configurable: true,
    get(this: Control) {
      return Reflect.get(Control.prototype, "value", this)
    },
    set(this: Control, next: string) {
      tracked.push(next)
      Reflect.set(Control.prototype, "value", next, this)
    },
  }
  Object.defineProperty(control, "value", own)
  const calls: string[] = []
  const stop = watchValue(control, () => calls.push(control.value))
  control.value = "x"
  stop()
  control.value = "y"
  expect([calls, tracked]).toEqual([["x"], ["x", "y"]])
  expect(Object.getOwnPropertyDescriptor(control, "value")).toEqual({
    ...own,
    enumerable: false,
  })
  expect(Object.getPrototypeOf(control)).toBe(Control.prototype)
})

test("two copies of the field part module share one wrapper per control", () => {
  const url = pathToFileURL(
    "packages/opui/elements/internal/field-part.js",
  ).href
  const result = JSON.parse(
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        `const [one, two] = await Promise.all([
  import(${JSON.stringify(`${url}?one`)}),
  import(${JSON.stringify(`${url}?two`)}),
])
class Control {
  #value = ""
  get value() {
    return this.#value
  }
  set value(next) {
    this.#value = next
  }
}
const control = new Control()
const calls = []
const stopOne = one.watchValue(control, () => calls.push("one"))
const stopTwo = two.watchValue(control, () => calls.push("two"))
const depth = (object) => {
  let count = 0
  for (let proto = Object.getPrototypeOf(object); proto !== Control.prototype; proto = Object.getPrototypeOf(proto)) count++
  return count
}
const wrappers = depth(control)
control.value = "x"
stopOne()
stopTwo()
console.log(JSON.stringify({ calls, copies: one !== two, unwrapped: depth(control), wrappers }))`,
      ],
      { encoding: "utf8" },
    ),
  )
  expect(result).toEqual({
    calls: ["one", "two"],
    copies: true,
    unwrapped: 0,
    wrappers: 1,
  })
})

test("removeOnNullish makes a global attribute property set to null or undefined remove the attribute, and passes other values on", () => {
  const removed: string[] = []
  const assigned: [string, unknown][] = []
  class Base {
    removeAttribute(name: string) {
      removed.push(name)
    }
  }
  for (const name of ["className", "id", "tabIndex"]) {
    Object.defineProperty(Base.prototype, name, {
      configurable: true,
      get: () => "",
      set(value) {
        assigned.push([name, value])
      },
    })
  }
  class AElement extends Base {}
  removeOnNullish(AElement)
  Object.assign(new AElement(), {
    className: null,
    id: undefined,
    tabIndex: 0,
    title: null,
  })
  expect(removed).toEqual(["class", "id"])
  expect(assigned).toEqual([["tabIndex", 0]])
  expect(Object.hasOwn(AElement.prototype, "title")).toBe(false)
})

const NULLISH = {
  className: "class",
  id: "id",
  lang: "lang",
  tabIndex: "tabindex",
  title: "title",
}

type Definitions = Record<string, { keeps: string[]; tag: string }[]>

const definitions = (modules: Record<string, string>): Definitions =>
  JSON.parse(
    execFileSync(
      process.execPath,
      [
        "--input-type=module",
        "--eval",
        `const removed = []
class HTMLElement {
  removeAttribute(name) {
    removed.push(name)
  }
}
const names = ${JSON.stringify(NULLISH)}
for (const name of Object.keys(names)) {
  Object.defineProperty(HTMLElement.prototype, name, {
    configurable: true,
    get() {},
    set() {},
  })
}
globalThis.HTMLElement = HTMLElement
const registry = new Map()
let defined = []
globalThis.customElements = {
  define(tag, element) {
    const instance = Object.create(element.prototype)
    const keeps = Object.entries(names).filter(([name, attribute]) =>
      [null, undefined].some((value) => {
        removed.length = 0
        instance[name] = value
        return !removed.includes(attribute)
      }),
    )
    defined.push({ keeps: keeps.map(([name]) => name), tag })
    registry.set(tag, element)
  },
  get: (tag) => registry.get(tag),
}
const result = {}
for (const [name, url] of Object.entries(${JSON.stringify(modules)})) {
  defined = []
  await import(url)
  result[name] = defined
}
console.log(JSON.stringify(result))`,
      ],
      { encoding: "utf8" },
    ),
  )

const nullishProblems = (defined: Definitions) =>
  Object.entries(defined).flatMap(([file, list]) =>
    list
      .filter(({ keeps }) => keeps.length > 0)
      .map(
        ({ keeps, tag }) =>
          `${file} defines <${tag}> before an assignment of null or undefined to ${keeps.join(", ")} removes the attribute`,
      ),
  )

test("every element removes a global attribute set to null or undefined, through removeOnNullish called before it is defined", () => {
  const defined = definitions(
    Object.fromEntries(
      globSync("packages/opui/elements/*.js")
        .toSorted()
        .map((file) => [file, pathToFileURL(file).href]),
    ),
  )
  expect(
    Object.values(defined).filter((list) => list.length > 0).length,
  ).toBeGreaterThan(5)
  expect(
    nullishProblems(defined),
    "import removeOnNullish from ./internal/nullish.js and call it on the class right before customElements.define",
  ).toEqual([])
})

test("the nullish check flags an element defined without the hook, or with the hook only after it is defined", () => {
  const nullish = pathToFileURL(
    "packages/opui/elements/internal/nullish.js",
  ).href
  const module = (name: string, body: string) =>
    `data:text/javascript,${encodeURIComponent(`import { removeOnNullish } from ${JSON.stringify(nullish)}\nexport class ${name} extends HTMLElement {}\n${body}`)}`
  const defined = definitions({
    "a.js": module("AElement", 'customElements.define("opui-a", AElement)'),
    "b.js": module(
      "BElement",
      'customElements.define("opui-b", BElement)\nremoveOnNullish(BElement)',
    ),
    "c.js": module(
      "CElement",
      'removeOnNullish(CElement)\ncustomElements.define("opui-c", CElement)',
    ),
  })
  expect(defined["c.js"]).toEqual([{ keeps: [], tag: "opui-c" }])
  expect(nullishProblems(defined)).toEqual([
    "a.js defines <opui-a> before an assignment of null or undefined to className, id, lang, tabIndex, title removes the attribute",
    "b.js defines <opui-b> before an assignment of null or undefined to className, id, lang, tabIndex, title removes the attribute",
  ])
})

const typingProblems = (file: string, script: string, types: string) =>
  [...script.matchAll(/customElements\.define\("([\w-]+)", (\w+)\)/g)].flatMap(
    ([, tag, name]) => [
      ...(name.endsWith("Element")
        ? []
        : [
            `${file}.js defines <${tag}> as ${name}, which doesn't end in Element`,
          ]),
      ...(types.includes(`export declare class ${name} extends HTMLElement`)
        ? []
        : [`${file}.d.ts doesn't declare the class ${name}`]),
      ...(new RegExp(
        `declare global \\{\\s*interface HTMLElementTagNameMap \\{[^}]*"${tag}": ${name}\\n`,
      ).test(types)
        ? []
        : [
            `${file}.d.ts doesn't map "${tag}" to ${name} in HTMLElementTagNameMap`,
          ]),
    ],
  )

test("each element module exports a class named <Component>Element, and its types map the tag to it", () => {
  const scripts = globSync("packages/opui/elements/*.js").toSorted()
  expect(
    scripts.filter((file) =>
      readFileSync(file, "utf8").includes("customElements.define("),
    ).length,
  ).toBeGreaterThan(0)
  expect(
    scripts.flatMap((file) =>
      typingProblems(
        file.replace(/\.js$/, ""),
        readFileSync(file, "utf8"),
        readFileSync(file.replace(/\.js$/, ".d.ts"), "utf8"),
      ),
    ),
    "querySelector finds the class through HTMLElementTagNameMap",
  ).toEqual([])
})

test("the typing check flags a class without the suffix and a tag missing from HTMLElementTagNameMap", () => {
  expect(
    typingProblems(
      "a",
      'customElements.define("opui-a", A)',
      "export declare class A extends HTMLElement {}",
    ),
  ).toEqual([
    "a.js defines <opui-a> as A, which doesn't end in Element",
    'a.d.ts doesn\'t map "opui-a" to A in HTMLElementTagNameMap',
  ])
  expect(
    typingProblems(
      "b",
      'customElements.define("opui-b", BElement)',
      'export declare class BElement extends HTMLElement {}\n\ndeclare global {\n  interface HTMLElementTagNameMap {\n    "opui-b": BElement\n  }\n}\n',
    ),
  ).toEqual([])
})

const apis = Object.values(
  import.meta.glob<{ default: ComponentApi }>(
    "../../src/component-api/*/api.ts",
    { eager: true },
  ),
).map((module) => module.default)

const publicApi = (script: string, types: string) => {
  const body =
    /export declare class \w+ extends HTMLElement \{([^}]*)\}/.exec(
      types,
    )?.[1] ?? ""
  return {
    attributes: [
      ...script.matchAll(/this\.(?:get|has)Attribute\(\s*(["'`])(.+?)\1/g),
    ].map(([, , name]) => name!),
    exports: [
      ...script.matchAll(/^export (?:async )?(?:const|function) (\w+)/gm),
    ].map(([, name]) => name!),
    members: [
      ...[...body.matchAll(/^\s+(?:readonly\s+)?(\w+)(\()?/gm)].map(
        ([, name, call]) => `${call ? "method" : "property"} ${name}`,
      ),
      ...[...script.matchAll(/^.*new (?:Custom)?Event\("([\w-]+)".*$/gm)]
        .filter(([line]) => !/\b(?!this\b)\w+\.dispatchEvent\(/.test(line))
        .map(([, name]) => `event ${name}`),
    ].toSorted(),
    tag: /customElements\.define\("([\w-]+)"/.exec(script)?.[1],
  }
}

const named = (text: string, name: string) =>
  new RegExp(
    `[\`[]${name
      .split(/\$\{[^}]*\}/)
      .map((part) => part.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("[\\w-]+")}[\`\\]=(]`,
  ).test(text)

const documentationProblems = (
  file: string,
  script: string,
  types: string,
  documenting: ComponentApi[],
) => {
  const { attributes, exports, members, tag } = publicApi(script, types)
  if (!tag) return []
  const pages = documenting.filter((api) =>
    api.elements?.some((element) => element.tag === tag),
  )
  if (pages.length === 0) {
    return [`no api.ts lists <${tag}> from ${file} in elements`]
  }
  return pages.flatMap((api) => {
    const element = api.elements!.find((entry) => entry.tag === tag)!
    const documented = element.members
      .map((member) => `${member.kind} ${member.name.replace(/\(.*/, "")}`)
      .toSorted()
    const text = JSON.stringify(api)
    const names = element.members.map((member) => member.name)
    return [
      ...members
        .filter((member) => !documented.includes(member))
        .map(
          (member) =>
            `${api.component} doesn't document the ${member} of <${tag}>`,
        ),
      ...documented
        .filter((member) => !members.includes(member))
        .map(
          (member) =>
            `${api.component} documents a ${member} that <${tag}> doesn't have`,
        ),
      ...attributes
        .filter((name) => !named(text, name))
        .map(
          (name) =>
            `${api.component} doesn't name the ${name} attribute that <${tag}> reads`,
        ),
      ...exports
        .filter((name) => !named(text, name))
        .map(
          (name) =>
            `${api.component} doesn't name ${name}, which ${file} exports`,
        ),
      ...(names.join() === names.toSorted().join()
        ? []
        : [`${api.component} lists the members of <${tag}> out of order`]),
    ]
  })
}

test("the component page of each element documents its attributes, events, properties, methods and exports", () => {
  const scripts = globSync("packages/opui/elements/*.js").toSorted()
  expect(apis.filter((api) => api.elements).length).toBeGreaterThan(0)
  expect(
    scripts.flatMap((file) =>
      documentationProblems(
        file,
        readFileSync(file, "utf8"),
        readFileSync(file.replace(/\.js$/, ".d.ts"), "utf8"),
        apis,
      ),
    ),
    "list each member in the elements of the api.ts, and name each attribute and export in backticks",
  ).toEqual([])
})

test("the documentation check flags a member, an event, an attribute and an export that no api.ts names", () => {
  const script =
    'export class AElement {\n  open() {\n    this.getAttribute(`${side}-label`)\n    this.hasAttribute("data-busy")\n    this.dispatchEvent(new Event("open"))\n    input.dispatchEvent(new Event("input"))\n  }\n}\nexport function show() {}\ncustomElements.define("opui-a", AElement)\n'
  const types =
    "export declare class AElement extends HTMLElement {\n  readonly input: HTMLInputElement | null\n  open(): void\n}\n"
  const api = {
    component: "A",
    elements: [
      {
        members: [
          { description: "", kind: "method", name: "open()" },
          { description: "", kind: "method", name: "close()" },
        ],
        tag: "opui-a",
      },
    ],
    options: [{ attribute: "[start-label]", description: "", prop: "x" }],
    parts: [],
    root: { description: "", selector: "opui-a" },
  } satisfies ComponentApi
  expect(documentationProblems("a.js", script, types, [api])).toEqual([
    "A doesn't document the event open of <opui-a>",
    "A doesn't document the property input of <opui-a>",
    "A documents a method close that <opui-a> doesn't have",
    "A doesn't name the data-busy attribute that <opui-a> reads",
    "A doesn't name show, which a.js exports",
    "A lists the members of <opui-a> out of order",
  ])
  expect(documentationProblems("a.js", script, types, [])).toEqual([
    "no api.ts lists <opui-a> from a.js in elements",
  ])
})

const typedAttributes = (types: string, tag: string) => {
  const from = types.indexOf(`"${tag}":`)
  if (from === -1) return undefined
  const rest = types.slice(from + tag.length + 3)
  const next = rest.search(/\n\s*"opui-[\w-]+":/)
  return [
    ...rest
      .slice(0, next === -1 ? undefined : next)
      .matchAll(/(?:"([\w-]+)"|\b(\w+))\?:/g),
  ].map(([, quoted, bare]) => quoted ?? bare ?? "")
}

const attributeTypeProblems = (
  script: string,
  frameworks: Record<string, string>,
) => {
  const { attributes, tag } = publicApi(script, "")
  if (!tag) return []
  const own = [...new Set(attributes)].filter(
    (name) => !/^(?:aria|data)-/.test(name),
  )
  return Object.entries(frameworks).flatMap(([file, types]) => {
    const typed = typedAttributes(types, tag)
    if (!typed) return [`${file} doesn't type <${tag}>`]
    return own
      .filter(
        (name) =>
          !typed.some((key) =>
            new RegExp(`^${name.replace(/\$\{[^}]*\}/g, "[\\w-]+")}$`).test(
              key,
            ),
          ),
      )
      .map(
        (name) =>
          `${file} doesn't type the ${name} attribute that <${tag}> reads`,
      )
  })
}

test("react/elements.ts, solid/elements.ts and svelte/elements.ts type every attribute an element reads", () => {
  const scripts = globSync("packages/opui/elements/*.js").toSorted()
  const frameworks = {
    "react/elements.ts": readFileSync(
      "packages/opui/react/elements.ts",
      "utf8",
    ),
    "solid/elements.ts": readFileSync(
      "packages/opui/solid/elements.ts",
      "utf8",
    ),
    "svelte/elements.ts": readFileSync(
      "packages/opui/svelte/elements.ts",
      "utf8",
    ),
  }
  expect(
    scripts.flatMap((file) =>
      attributeTypeProblems(readFileSync(file, "utf8"), frameworks),
    ),
    "type the attribute on the element's tag in every file, so a component's props reach it in React, Solid and Svelte",
  ).toEqual([])
})

test("the attribute type check flags an attribute one framework leaves out, and a tag it doesn't type", () => {
  const script =
    'this.getAttribute("close-label")\nthis.getAttribute(`${side}-label`)\nthis.hasAttribute("data-busy")\ncustomElements.define("opui-a", AElement)\n'
  expect(
    attributeTypeProblems(script, {
      "react/elements.ts":
        '"opui-a": Props & { "start-label"?: string }\n"opui-b": Props & { "close-label"?: string }',
      "svelte/elements.ts":
        '"opui-a": Props & {\n  "close-label"?: string\n  "end-label"?: string\n}',
      "vue/elements.ts": '"opui-b": Props',
    }),
  ).toEqual([
    "react/elements.ts doesn't type the close-label attribute that <opui-a> reads",
    "vue/elements.ts doesn't type <opui-a>",
  ])
})

test("querySelector returns the element class of an opui tag", () => {
  const query = (root: ParentNode) => ({
    callout: root.querySelector("opui-callout"),
    characterCount: root.querySelector("opui-character-count"),
    copy: root.querySelector("opui-copy"),
    passwordToggle: root.querySelector("opui-password-toggle"),
    reactions: root.querySelector("opui-reactions"),
    selectAll: root.querySelector("opui-select-all"),
    sortableTable: root.querySelector("opui-sortable-table"),
    stepButton: root.querySelector("opui-step-button"),
    toaster: root.querySelector("opui-toaster"),
  })
  expectTypeOf(query).returns.toEqualTypeOf<{
    callout: CalloutElement | null
    characterCount: CharacterCountElement | null
    copy: CopyElement | null
    passwordToggle: PasswordToggleElement | null
    reactions: ReactionsElement | null
    selectAll: SelectAllElement | null
    sortableTable: SortableTableElement | null
    stepButton: StepButtonElement | null
    toaster: ToasterElement | null
  }>()
})
