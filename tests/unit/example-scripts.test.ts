import { existsSync, readdirSync, readFileSync } from "node:fs"
import { parseFragment } from "parse5"
import type { DefaultTreeAdapterMap } from "parse5"
import { describe, expect, test } from "vitest"

type Node = DefaultTreeAdapterMap["node"]
type Element = DefaultTreeAdapterMap["element"]

const EXAMPLES = "src/component-examples"

const elementsOf = (node: Node): Element[] => [
  ...("tagName" in node ? [node] : []),
  ...("childNodes" in node ? node.childNodes : []).flatMap(elementsOf),
  ...("content" in node ? node.content.childNodes : []).flatMap(elementsOf),
]

const hasAttribute = (element: Element, name: string) =>
  element.attrs.some((attr) => attr.name === name)

const hasClass = (element: Element, name: string) =>
  element.attrs
    .find((attr) => attr.name === "class")
    ?.value.split(/\s+/)
    .includes(name) ?? false

const inside = (element: Element, name: string): boolean => {
  const parent = element.parentNode
  return (
    !!parent &&
    "tagName" in parent &&
    (hasClass(parent, name) || inside(parent, name))
  )
}

const HOOKS = [
  {
    hook: "an <opui-*> element",
    module: (element: Element) =>
      element.tagName.startsWith("opui-")
        ? `opui-css/elements/${element.tagName.slice("opui-".length)}.js`
        : undefined,
  },
  {
    hook: "an input[data-indeterminate]",
    module: (element: Element) =>
      element.tagName === "input" && hasAttribute(element, "data-indeterminate")
        ? "opui-css/css/js/checkbox.js"
        : undefined,
  },
  {
    hook: "an output.ui-value[data-live] in a .ui-range",
    module: (element: Element) =>
      element.tagName === "output" &&
      hasClass(element, "ui-value") &&
      hasAttribute(element, "data-live") &&
      inside(element, "ui-range")
        ? "opui-css/css/js/range.js"
        : undefined,
  },
  {
    hook: "a datalist option[label] in a .ui-range",
    module: (element: Element) =>
      element.tagName === "option" &&
      hasAttribute(element, "label") &&
      element.parentNode?.nodeName === "datalist" &&
      inside(element, "ui-range")
        ? "opui-css/css/js/range.js"
        : undefined,
  },
  {
    hook: "an element with [data-close-on-navigate]",
    module: (element: Element) =>
      hasAttribute(element, "data-close-on-navigate")
        ? "opui-css/elements/close-on-navigate.js"
        : undefined,
  },
]

const IMPORT = /\bimport\s+(?:[^"';]*?\sfrom\s+)?["']([^"']+)["'];?/g

const scriptsOf = (source: string) =>
  [...source.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].map(
    ([, body]) => body,
  )

const ownCode = (source: string) =>
  scriptsOf(source).some((body) => body.replace(IMPORT, "").trim() !== "")

const problemsOf = ({
  astro,
  html,
  name,
}: {
  astro?: string
  html: string
  name: string
}) => {
  const needed = new Map<string, string>()
  for (const element of elementsOf(parseFragment(html))) {
    for (const { hook, module } of HOOKS) {
      const path = module(element)
      if (path) needed.set(path, hook)
    }
  }
  const imported = new Set(
    scriptsOf(html).flatMap((body) =>
      [...body.matchAll(IMPORT)]
        .map(([, path]) => path)
        .filter((path) => path.startsWith("opui-css/")),
    ),
  )
  return [
    ...[...needed]
      .filter(([path]) => !imported.has(path))
      .map(
        ([path, hook]) =>
          `${name}.html has ${hook} but doesn't import "${path}"`,
      ),
    ...[...imported]
      .filter((path) => !needed.has(path))
      .map(
        (path) =>
          `${name}.html imports "${path}" but has no element that needs it`,
      ),
    ...(astro && ownCode(astro) && !ownCode(html)
      ? [
          `${name}.html has no script of its own, while ${name}.astro has one: add the same behavior`,
        ]
      : []),
  ]
}

const examples = readdirSync(EXAMPLES, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap(({ name: component }) =>
    readdirSync(`${EXAMPLES}/${component}`)
      .filter((file) => file.endsWith(".html"))
      .map((file) => `${component}/${file.slice(0, -".html".length)}`),
  )
  .toSorted()

describe("example scripts", () => {
  test("each HTML example imports what its markup needs and runs what its Astro example runs", () => {
    expect(
      examples.flatMap((name) => {
        const astro = `${EXAMPLES}/${name}.astro`
        return problemsOf({
          astro: existsSync(astro) ? readFileSync(astro, "utf8") : undefined,
          html: readFileSync(`${EXAMPLES}/${name}.html`, "utf8"),
          name,
        })
      }),
    ).toEqual([])
  })

  test("flags a missing import, an import without its element and a missing script", () => {
    expect(
      problemsOf({
        html: '<opui-copy class="ui-copy"></opui-copy>',
        name: "a/Missing",
      }),
    ).toEqual([
      'a/Missing.html has an <opui-*> element but doesn\'t import "opui-css/elements/copy.js"',
    ])
    expect(
      problemsOf({
        html: '<label class="ui-range"><output class="ui-value" data-live></output></label><input data-indeterminate>',
        name: "a/Hooks",
      }),
    ).toEqual([
      'a/Hooks.html has an output.ui-value[data-live] in a .ui-range but doesn\'t import "opui-css/css/js/range.js"',
      'a/Hooks.html has an input[data-indeterminate] but doesn\'t import "opui-css/css/js/checkbox.js"',
    ])
    expect(
      problemsOf({
        html: '<label class="ui-range"><input list="a" type="range"><datalist id="a"><option label="Low" value="0"></option></datalist></label><label class="ui-text-field"><input list="b"><datalist id="b"><option label="Low" value="Low"></option></datalist></label>',
        name: "a/Ticks",
      }),
    ).toEqual([
      'a/Ticks.html has a datalist option[label] in a .ui-range but doesn\'t import "opui-css/css/js/range.js"',
    ])
    expect(
      problemsOf({
        html: '<dialog class="ui-drawer" data-close-on-navigate></dialog>',
        name: "a/Drawer",
      }),
    ).toEqual([
      'a/Drawer.html has an element with [data-close-on-navigate] but doesn\'t import "opui-css/elements/close-on-navigate.js"',
    ])
    expect(
      problemsOf({
        html: '<div class="ui-popover" data-close-on-navigate popover></div>',
        name: "a/Popover",
      }),
    ).toEqual([
      'a/Popover.html has an element with [data-close-on-navigate] but doesn\'t import "opui-css/elements/close-on-navigate.js"',
    ])
    expect(
      problemsOf({
        html: '<p></p><script type="module">import { toast } from "opui-css/elements/toaster.js"</script>',
        name: "a/Unused",
      }),
    ).toEqual([
      'a/Unused.html imports "opui-css/elements/toaster.js" but has no element that needs it',
    ])
    expect(
      problemsOf({
        astro: '<p></p><script>document.querySelector("p")?.remove()</script>',
        html: '<p></p><script type="module">import "opui-css/elements/copy.js"</script>',
        name: "a/Script",
      }),
    ).toEqual([
      'a/Script.html imports "opui-css/elements/copy.js" but has no element that needs it',
      "a/Script.html has no script of its own, while a/Script.astro has one: add the same behavior",
    ])
  })
})
