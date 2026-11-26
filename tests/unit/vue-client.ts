import ts from "typescript"
import * as Vue from "vue"
import { compileScript, parse } from "vue/compiler-sfc"
import * as helpers from "../../packages/opui/components/vue"

type Node = {
  attrs: Record<string, string>
  children: Node[]
  parentNode: Node | null
  tag: string
  text: string
}

export const node = (tag: string, text = ""): Node => ({
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

export const { createApp } = Vue.createRenderer<Node, Node>({
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

export const html = (target: Node): string =>
  target.tag === "#text"
    ? target.text
    : target.tag === "#comment"
      ? ""
      : `<${target.tag}${Object.entries(target.attrs)
          .map(([key, value]) => ` ${key}="${value}"`)
          .join("")}>${target.children.map(html).join("")}</${target.tag}>`

export const clientComponent = (source: string, types: string) => {
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
      /import \{([^}]+)\} from ["'](vue|\.\.\/vue)["'];?/g,
      (_, names: string, module: string) =>
        `const {${names.replace(/ as /g, ": ")}} = ${module === "vue" ? "Vue" : "helpers"};`,
    )
    .replace(/export default /, "return ")
  return new Function("Vue", "helpers", code)(Vue, helpers) as Vue.Component
}
