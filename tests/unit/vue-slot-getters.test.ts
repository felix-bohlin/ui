import ts from "typescript"
import { beforeAll, expect, test } from "vitest"
import * as Vue from "vue"
import { compileScript, parse } from "vue/compiler-sfc"
import { compileComponent } from "../../scripts/build-components.mjs"
import { loadApis } from "../../scripts/component-reader.mjs"

type Node = {
  attrs: Record<string, string>
  children: Node[]
  parentNode: Node | null
  tag: string
  text: string
}

const node = (tag: string, text = ""): Node => ({
  attrs: {},
  children: [],
  parentNode: null,
  tag,
  text,
})

const detach = (child: Node) => {
  const siblings = child.parentNode?.children
  if (siblings) siblings.splice(siblings.indexOf(child), 1)
  child.parentNode = null
}

const { createApp } = Vue.createRenderer<Node, Node>({
  createComment: (text) => node("#comment", text),
  createElement: (tag) => node(tag),
  createText: (text) => node("#text", text),
  insert: (child, parent, anchor) => {
    detach(child)
    const index = anchor ? parent.children.indexOf(anchor) : -1
    parent.children.splice(
      index === -1 ? parent.children.length : index,
      0,
      child,
    )
    child.parentNode = parent
  },
  nextSibling: (child) => {
    const siblings = child.parentNode?.children ?? []
    return siblings[siblings.indexOf(child) + 1] ?? null
  },
  parentNode: (child) => child.parentNode,
  patchProp: (element, key, _, value) => {
    if (/^on[A-Z]/.test(key)) return
    if (value === undefined || value === null || value === false) {
      delete element.attrs[key]
    } else {
      element.attrs[key] = String(value)
    }
  },
  remove: detach,
  setElementText: (element, text) => {
    element.children = [{ ...node("#text", text), parentNode: element }]
  },
  setText: (child, text) => {
    child.text = text
  },
})

const html = (target: Node): string =>
  target.tag === "#text"
    ? target.text
    : target.tag === "#comment"
      ? ""
      : `<${target.tag}${Object.entries(target.attrs)
          .map(([key, value]) => ` ${key}="${value}"`)
          .join("")}>${target.children.map(html).join("")}</${target.tag}>`

const clientComponent = (source: string, types: string) => {
  const { descriptor } = parse(
    source.replace(/import type \{[^}]+\} from "\.\/types\.vue-props"/, types),
  )
  const { content } = compileScript(descriptor, {
    id: "sample",
    inlineTemplate: true,
  })
  const code = ts
    .transpileModule(content, {
      compilerOptions: {
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
    })
    .outputText.replace(
      /import \{([^}]+)\} from ["']vue["'];?/g,
      (_, names: string) => `const {${names.replace(/ as /g, ": ")}} = Vue;`,
    )
    .replace(/export default /, "return ")
  return new Function("Vue", code)(Vue) as Vue.Component
}

beforeAll(async () => {
  await loadApis()
})

test("a provided value that reads a slot is refused in Vue", async () => {
  const { outputs, refused } = await compileComponent(
    '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n\nconst hasLabel = Boolean(label || Astro.slots.has("label"))\nconst html = await sampleContext.provide({ labelled: hasLabel }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <slot name="label" />\n  <Fragment set:html={html} />\n</div>\n',
    "packages/opui/components/Sample/Sample.astro",
  )
  expect([...refused.keys()]).toEqual([
    "packages/opui/components/Sample/Sample.vue",
  ])
  expect(
    refused.get("packages/opui/components/Sample/Sample.vue")?.message,
  ).toContain("the provided `labelled`, which reads a slot")
  expect(outputs.has("packages/opui/components/Sample/Sample.react.tsx")).toBe(
    true,
  )
})

test("a Vue value that reads a slot follows a slot the parent adds after mount", async () => {
  const { outputs } = await compileComponent(
    '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, endText, ...rest } = Astro.props\n\nconst hasEndText = Boolean(endText || Astro.slots.has("end-text"))\nconst Root = hasEndText ? "label" : "div"\nconst endTextId = hasEndText ? "sample-end-text" : undefined\n---\n\n<Root class:list={["ui-sample", className]} {...rest}>\n  <input aria-describedby={endTextId} />\n  {hasEndText && (\n    <span class="ui-end-text" id={endTextId}>{endText}<slot name="end-text" /></span>\n  )}\n</Root>\n',
    "packages/opui/components/Sample/Sample.astro",
  )
  const source = outputs.get("packages/opui/components/Sample/Sample.vue")
  expect(source).toContain("const hasEndText = () =>")
  expect(source).toContain('v-if="hasEndText()"')
  expect(source).toContain(':is="Root()"')
  const Sample = clientComponent(
    source!,
    'type Props = { class?: string; endText?: string }\ntype Slots = { "end-text"?: () => unknown }',
  )
  const shown = Vue.ref(false)
  const root = node("main")
  createApp({
    setup: () => () =>
      Vue.h(
        Sample,
        null,
        shown.value ? { "end-text": () => "Use at least 8 characters" } : {},
      ),
  }).mount(root)
  expect(html(root)).toBe(
    '<main><div class="ui-sample"><input></input> </div></main>',
  )
  shown.value = true
  await Vue.nextTick()
  expect(html(root)).toBe(
    '<main><label class="ui-sample"><input aria-describedby="sample-end-text"></input> <span class="ui-end-text" id="sample-end-text">Use at least 8 characters</span></label></main>',
  )
})
