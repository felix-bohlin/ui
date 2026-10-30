import { readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { stripTypeScriptTypes } from "node:module"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import { parse } from "@astrojs/compiler"
import { parseFragment } from "parse5"
import postcss from "postcss"
import { format, resolveConfig } from "prettier"
import ts from "typescript"
import { slotProp } from "../src/component-api/frameworks.ts"
import { clean } from "../src/utils/clean-html.ts"
import { createExampleIdGenerator } from "../src/utils/id.ts"
import {
  generatedTargets,
  readHandWritten,
  staleProblems,
  TARGETS,
} from "./example-targets.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
const examplesDir = join(root, "src/component-examples")
const componentsDir = join(root, "packages/opui/components")
const cssDir = join(root, "packages/opui/css/components")

const REACT_ATTRIBUTES = {
  allowfullscreen: "allowFullScreen",
  autocomplete: "autoComplete",
  class: "className",
  colspan: "colSpan",
  for: "htmlFor",
  maxlength: "maxLength",
  minlength: "minLength",
  playsinline: "playsInline",
  readonly: "readOnly",
  referrerpolicy: "referrerPolicy",
  rowspan: "rowSpan",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "stroke-width": "strokeWidth",
  tabindex: "tabIndex",
}

export const REACT_DEFAULT_VALUE = [
  "ColorField",
  "NumberStepper",
  "Range",
  "Select",
  "Tabs",
  "TextField",
  "Textarea",
  "ToggleGroup",
]

const NUMERIC_ATTRIBUTES = [
  "colspan",
  "maxlength",
  "minlength",
  "rows",
  "rowspan",
  "span",
  "tabindex",
]

const VOID_ELEMENTS = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "source",
  "track",
  "wbr",
])

const MAP_KEYS = ["id", "name", "title"]

const unsupported = (file, what, target) =>
  new Error(
    `${file} uses ${what}, which scripts/build-examples.mjs can't convert${target ? ` to ${target}` : ""}: support it there, or list the file in scripts/hand-written-examples.json with the reason`,
  )

const isLiteral = (node) =>
  ts.isStringLiteral(node) ||
  ts.isNoSubstitutionTemplateLiteral(node) ||
  ts.isNumericLiteral(node) ||
  node.kind === ts.SyntaxKind.TrueKeyword ||
  node.kind === ts.SyntaxKind.FalseKeyword ||
  (ts.isArrayLiteralExpression(node) && node.elements.every(isLiteral)) ||
  (ts.isObjectLiteralExpression(node) &&
    node.properties.every(
      (property) =>
        ts.isPropertyAssignment(property) && isLiteral(property.initializer),
    ))

const readFrontmatter = (code, file) => {
  const sourceFile = ts.createSourceFile(
    "frontmatter.ts",
    code,
    ts.ScriptTarget.Latest,
    true,
  )
  const imports = []
  const consts = []
  for (const statement of sourceFile.statements) {
    if (
      ts.isImportDeclaration(statement) &&
      statement.moduleSpecifier.text === "opui-css/astro" &&
      statement.importClause?.namedBindings &&
      ts.isNamedImports(statement.importClause.namedBindings)
    ) {
      imports.push(
        ...statement.importClause.namedBindings.elements.map(
          (element) => element.name.text,
        ),
      )
      continue
    }
    if (
      ts.isVariableStatement(statement) &&
      statement.declarationList.flags & ts.NodeFlags.Const
    ) {
      for (const declaration of statement.declarationList.declarations) {
        if (
          !ts.isIdentifier(declaration.name) ||
          !declaration.initializer ||
          !isLiteral(declaration.initializer)
        ) {
          throw unsupported(file, `\`${declaration.getText(sourceFile)}\``)
        }
        consts.push({
          code: declaration.initializer.getText(sourceFile),
          name: declaration.name.text,
          value: ts.isStringLiteralLike(declaration.initializer)
            ? declaration.initializer.text
            : undefined,
        })
      }
      continue
    }
    throw unsupported(
      file,
      `the frontmatter statement \`${statement.getText(sourceFile).split("\n")[0]}\``,
    )
  }
  return { consts, imports }
}

const attribute = (node, name) =>
  node.attributes?.find((candidate) => candidate.name === name)

const textOf = (node) =>
  node.children
    .map((child) => (child.type === "text" ? child.value : ""))
    .join("")

const SIMPLE_EXPRESSION = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*)*$/

const MAP_START =
  /^\s*([A-Za-z_$][\w$.]*)\.map\(\s*\(?\s*(\{[^}]*\}|[A-Za-z_$][\w$]*)\s*\)?\s*=>\s*\(\s*$/

const SVG_TEXT = new Set(["desc", "text", "title"])

const svgChildren = (children) => {
  const nodes = children.filter(
    (node) => !(node.type === "text" && !node.value.trim()),
  )
  return !nodes.some((node) => node.type === "element")
    ? nodes
    : nodes
        .flatMap((node) => [{ type: "text", value: "\n" }, node])
        .concat({
          type: "text",
          value: "\n",
        })
}

const toTree = (nodes, context) =>
  nodes.flatMap((node) => {
    if (node.type === "text") return [{ type: "text", value: node.value }]
    if (node.type === "comment") return [{ type: "comment", value: node.value }]
    if (node.type === "expression") return [expressionNode(node, context)]
    if (node.type === "fragment") {
      const html = attribute(node, "set:html")
      if (html?.kind === "expression") {
        const markup = context.markup.get(html.value.trim())
        if (!markup) {
          throw unsupported(context.file, `set:html={${html.value}}`)
        }
        markup.uses++
        return [{ name: html.value.trim(), type: "html" }]
      }
      const slot = attribute(node, "slot")
      if (!slot || node.attributes.length !== 1) {
        throw unsupported(context.file, "a <Fragment> without a slot")
      }
      return [
        {
          children: toTree(node.children, context),
          slot: slot.value,
          type: "fragment",
        },
      ]
    }
    if (node.type === "element" || node.type === "component") {
      if (node.type === "component" && !context.imports.includes(node.name)) {
        throw unsupported(context.file, `<${node.name}>, which isn't imported`)
      }
      if (node.name === "script" || node.name === "style") {
        throw unsupported(context.file, `a nested <${node.name}>`)
      }
      const attributes = node.attributes.map((item) => {
        if (item.name.includes(":")) {
          throw unsupported(context.file, `the directive ${item.name}`)
        }
        if (item.kind === "quoted") {
          return { kind: "string", name: item.name, value: item.value }
        }
        if (item.kind === "empty") return { kind: "boolean", name: item.name }
        if (item.kind === "expression" || item.kind === "template-literal") {
          return {
            kind: "expression",
            name: item.name,
            value:
              item.kind === "template-literal"
                ? `\`${item.value}\``
                : item.value.trim(),
          }
        }
        throw unsupported(context.file, `the attribute ${item.name}`)
      })
      const slot = attributes.find((item) => item.name === "slot")
      const children = toTree(node.children, {
        ...context,
        svg: SVG_TEXT.has(node.name)
          ? false
          : context.svg || node.name === "svg",
      })
      return [
        {
          attributes: attributes.filter((item) => item !== slot),
          children:
            context.svg || node.name === "svg"
              ? svgChildren(children)
              : children,
          component: node.type === "component",
          name: node.name,
          slot: slot?.value,
          type: "element",
        },
      ]
    }
    throw unsupported(context.file, `a ${node.type} node`)
  })

const expressionNode = (node, context) => {
  const elements = node.children.filter((child) => child.type !== "text")
  if (elements.length === 0) {
    const code = textOf(node).trim()
    const literal = code.match(/^"([^"\\]*)"$/)
    if (literal) return { type: "text", value: literal[1] }
    if (SIMPLE_EXPRESSION.test(code)) return { code, type: "expression" }
    throw unsupported(context.file, `the expression {${code}}`)
  }
  const [first, ...rest] = node.children
  const last = rest.pop()
  const start = first?.type === "text" ? first.value.match(MAP_START) : null
  const body = rest.filter(
    (child) => !(child.type === "text" && !child.value.trim()),
  )
  if (
    !start ||
    last?.type !== "text" ||
    !/^\s*\)\s*\)\s*$/.test(last.value) ||
    body.length !== 1 ||
    body[0].type !== "element"
  ) {
    throw unsupported(context.file, "an expression with markup other than .map")
  }
  const [, array, params] = start
  const names = params.startsWith("{")
    ? params
        .slice(1, -1)
        .split(",")
        .map((name) => name.trim())
    : [params]
  const key = params.startsWith("{")
    ? MAP_KEYS.find((name) => names.includes(name))
    : params
  if (!key) {
    throw unsupported(context.file, `${array}.map without an id, name or title`)
  }
  return {
    array,
    child: toTree([body[0]], context)[0],
    key,
    params,
    type: "map",
  }
}

const parseExample = async (source, file = "Example.astro") => {
  const { ast } = await parse(source, { position: false })
  const frontmatter =
    ast.children.find((node) => node.type === "frontmatter")?.value ?? ""
  const { consts, imports } = readFrontmatter(frontmatter, file)
  const usedAsHtml = new Set(
    [...source.matchAll(/set:html=\{\s*([\w$]+)\s*\}/g)].map(
      (match) => match[1],
    ),
  )
  const markup = new Map()
  for (const item of consts.filter(({ name }) => usedAsHtml.has(name))) {
    if (item.value === undefined) {
      throw unsupported(file, `set:html={${item.name}} with a non-string`)
    }
    const { ast: parsed } = await parse(item.value, { position: false })
    markup.set(item.name, { nodes: parsed.children, uses: 0 })
  }
  const context = { file, imports, markup }
  const styles = []
  const scripts = []
  const body = []
  for (const node of ast.children) {
    if (node.type === "frontmatter") continue
    if (node.type === "element" && node.name === "script") {
      scripts.push(textOf(node))
      continue
    }
    if (node.type === "element" && node.name === "style") {
      styles.push(dedent(textOf(node)))
      continue
    }
    body.push(node)
  }
  const tree = toTree(body, context)
  for (const [name, item] of markup) {
    item.tree = toTree(item.nodes, context)
    item.name = name
    item.shared = item.uses > 1 || markup.size > 1
  }
  return {
    consts: consts.filter(({ name }) => !markup.has(name)),
    imports,
    markup,
    scripts,
    styles,
    tree: trimTree(tree),
  }
}

const trimTree = (tree) => {
  const nodes = [...tree]
  while (nodes[0]?.type === "text" && !nodes[0].value.trim()) nodes.shift()
  while (nodes.at(-1)?.type === "text" && !nodes.at(-1).value.trim()) {
    nodes.pop()
  }
  return nodes
}

const dedent = (text) => {
  const lines = text
    .replace(/^\s*\n/, "")
    .trimEnd()
    .split("\n")
  const indent = Math.min(
    ...lines
      .filter((line) => line.trim())
      .map((line) => line.match(/^ */)[0].length),
  )
  return lines.map((line) => line.slice(indent)).join("\n")
}

const indent = (text, spaces) =>
  text
    .split("\n")
    .map((line) => (line ? " ".repeat(spaces) + line : line))
    .join("\n")

const usedComponents = (example) => {
  const names = new Set()
  const walk = (nodes) => {
    for (const node of nodes) {
      if (node.type === "element" && node.component) names.add(node.name)
      if (node.children) walk(node.children)
      if (node.type === "map") walk([node.child])
    }
  }
  walk(example.tree)
  for (const item of example.markup.values()) walk(item.tree)
  return example.imports.filter((name) => names.has(name))
}

const importLine = (example, framework) => {
  const names = usedComponents(example)
  if (names.length === 0) return ""
  return `import { ${names.join(", ")} } from "opui-css/${framework}"`
}

const attributeValue = (value) =>
  value.replace(/&(?=[a-zA-Z#][a-zA-Z0-9]*;)/g, "&amp;").replace(/"/g, "&quot;")

const markupAttributes = (node, expression, braces) =>
  node.attributes
    .map((item) => {
      if (item.kind === "boolean") return item.name
      if (braces && node.component && NUMERIC_ATTRIBUTES.includes(item.name)) {
        if (item.kind === "string" && /^-?\d+$/.test(item.value)) {
          return expression({ ...item, kind: "expression" })
        }
      }
      if (item.kind === "string" && !(braces && /[{}]/.test(item.value))) {
        if (!item.value.includes('"') || item.value.includes("'")) {
          return `${item.name}="${attributeValue(item.value)}"`
        }
        return braces
          ? expression({ ...item, value: `'${item.value}'` })
          : `${item.name}='${item.value}'`
      }
      return expression(
        item.kind === "string"
          ? { ...item, value: JSON.stringify(item.value) }
          : item,
      )
    })
    .join(" ")

const openTag = (name, attributes) =>
  attributes ? `<${name} ${attributes}` : `<${name}`

const singleQuoted = (code) => {
  const scanner = ts.createScanner(ts.ScriptTarget.Latest, false)
  scanner.setText(code)
  let result = ""
  let position = 0
  for (
    let token = scanner.scan();
    token !== ts.SyntaxKind.EndOfFileToken;
    token = scanner.scan()
  ) {
    if (token === ts.SyntaxKind.StringLiteral) {
      const start = scanner.getTokenStart()
      const text = scanner.getTokenValue()
      result += code.slice(position, start)
      result += `'${text.replace(/\\/g, "\\\\").replace(/'/g, "\\'")}'`
      position = scanner.getTokenEnd()
    }
  }
  return result + code.slice(position)
}

const markupTarget = (framework) => {
  const vue = framework === "vue"
  const emit = (nodes, html) =>
    nodes
      .map((node) => {
        if (node.type === "text") return node.value
        if (node.type === "comment") return `<!--${node.value}-->`
        if (node.type === "expression") {
          return vue ? `{{ ${node.code} }}` : `{${node.code}}`
        }
        if (node.type === "html") {
          const item = html.get(node.name)
          return item.shared && !vue
            ? `{@render ${node.name}()}`
            : emit(item.tree, html)
        }
        if (node.type === "map") {
          if (vue) {
            return element(
              {
                ...node.child,
                attributes: [
                  {
                    kind: "string",
                    name: "v-for",
                    value: `${node.params} in ${node.array}`,
                  },
                  { kind: "expression", name: "key", value: node.key },
                  ...node.child.attributes,
                ],
              },
              html,
            )
          }
          const params = node.params.startsWith("{")
            ? node.params.replace(/^\{\s*/, "{ ").replace(/\s*\}$/, " }")
            : node.params
          return `{#each ${node.array} as ${params} (${node.key})}\n${element(node.child, html)}\n{/each}`
        }
        if (node.type === "fragment") {
          return slotWrapper(node.slot, emit(node.children, html))
        }
        return node.slot
          ? slotWrapper(node.slot, element({ ...node, slot: undefined }, html))
          : element(node, html)
      })
      .join("")
  const slotWrapper = (slot, content) =>
    vue
      ? `<template #${slot}>${content}</template>`
      : `{#snippet ${slotProp(slot)}()}${content}{/snippet}`
  const expression = (item) =>
    vue
      ? item.name === "v-for"
        ? `v-for="${item.value}"`
        : `:${item.name}="${attributeValue(singleQuoted(item.value))}"`
      : `${item.name}={${item.value}}`
  const element = (node, html) => {
    const attributes = markupAttributes(node, expression, !vue)
    const children = emit(node.children, html)
    if (VOID_ELEMENTS.has(node.name)) {
      return `${openTag(node.name, attributes)} />`
    }
    if (!children && node.component) {
      return `${openTag(node.name, attributes)} />`
    }
    return `${openTag(node.name, attributes)}>${children}</${node.name}>`
  }
  return emit
}

const toSvelte = (example) => {
  const emit = markupTarget("svelte")
  const snippets = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) =>
        `{#snippet ${item.name}()}\n${emit(item.tree, example.markup)}\n{/snippet}\n\n`,
    )
    .join("")
  const script = [
    importLine(example, "svelte"),
    ...example.consts.map(({ code, name }) => `const ${name} = ${code}`),
  ]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n  :global {\n${indent(css, 4)}\n  }\n</style>`)
    .join("")
  return `${script ? `<script lang="ts">\n${script}\n</script>\n\n` : ""}${snippets}${emit(example.tree, example.markup)}${styles}\n`
}

const toVue = (example) => {
  const emit = markupTarget("vue")
  const script = [
    importLine(example, "vue"),
    ...example.consts.map(({ code, name }) => `const ${name} = ${code}`),
  ]
    .filter(Boolean)
    .join("\n\n")
  const styles = example.styles
    .map((css) => `\n\n<style>\n${css}\n</style>`)
    .join("")
  return `${script ? `<script setup lang="ts">\n${script}\n</script>\n\n` : ""}<template>\n${emit(example.tree, example.markup)}\n</template>${styles}\n`
}

const styleObject = (css) =>
  `{{ ${css
    .split(";")
    .map((declaration) => declaration.trim())
    .filter(Boolean)
    .map((declaration) => {
      const colon = declaration.indexOf(":")
      const property = declaration.slice(0, colon).trim()
      const key = property.startsWith("--")
        ? JSON.stringify(property)
        : property.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
      return `${key}: ${JSON.stringify(declaration.slice(colon + 1).trim())}`
    })
    .join(", ")} }}`

const isSorted = (names) =>
  names.length > 1 &&
  names.every(
    (name, index) =>
      index === 0 || names[index - 1].localeCompare(name, "en") <= 0,
  )

const jsxText = (value) =>
  value.replace(/[{}>]/g, (character) => `{${JSON.stringify(character)}}`)

const jsxString = (name, value) =>
  !value.includes('"')
    ? `${name}="${value}"`
    : !value.includes("'")
      ? `${name}='${value}'`
      : `${name}={${JSON.stringify(value)}}`

const reactProps = (node, context) => {
  const selected =
    node.name === "Select"
      ? node.children
          .filter(
            (child) => child.type === "element" && child.name === "option",
          )
          .find((option) =>
            option.attributes.some((item) => item.name === "selected"),
          )
      : undefined
  const readonly = node.attributes.some((item) => item.name === "readonly")
  const props = node.attributes.map((item) => {
    let name = REACT_ATTRIBUTES[item.name] ?? item.name
    if (item.name === "checked") name = "defaultChecked"
    if (
      item.name === "value" &&
      !readonly &&
      (REACT_DEFAULT_VALUE.includes(node.name) ||
        (!node.component && ["input", "textarea"].includes(node.name)))
    ) {
      name = "defaultValue"
    }
    if (name.includes("-") && !/^(aria|data)-/.test(name)) {
      throw unsupported(context.file, `the attribute ${item.name}`, "React")
    }
    if (item.kind === "boolean") return { code: name, name }
    if (
      NUMERIC_ATTRIBUTES.includes(item.name) &&
      item.kind === "string" &&
      /^-?\d+$/.test(item.value)
    ) {
      return { code: `${name}={${item.value}}`, name }
    }
    if (item.name === "style" && item.kind === "string") {
      return { code: `${name}=${styleObject(item.value)}`, name }
    }
    if (item.kind === "string") {
      return { code: jsxString(name, item.value), name }
    }
    return { code: `${name}={${item.value}}`, name }
  })
  if (selected) {
    const value =
      selected.attributes.find((item) => item.name === "value")?.value ??
      selected.children
        .map((child) => child.value ?? "")
        .join("")
        .trim()
    props.push({
      code: `defaultValue=${JSON.stringify(value)}`,
      name: "defaultValue",
    })
  }
  const slots = node.children
    .filter((child) => child.slot)
    .map((child) => {
      const name = slotProp(child.slot)
      const content =
        child.type === "fragment"
          ? trimTree(child.children)
          : [{ ...child, slot: undefined }]
      if (content.every((item) => item.type === "text")) {
        const text = content
          .map((item) => item.value)
          .join("")
          .replace(/\s+/g, " ")
          .trim()
        return { code: jsxString(name, text), name }
      }
      const elements = content.filter(
        (item) => !(item.type === "text" && !item.value.trim()),
      )
      return {
        code:
          elements.length === 1 && elements[0].type === "element"
            ? `${name}={${reactNodes(elements, context)}}`
            : `${name}={<>${reactNodes(content, context)}</>}`,
        name,
      }
    })
  const all = isSorted(node.attributes.map(({ name }) => name))
    ? [...props, ...slots].toSorted((a, b) =>
        a.name.localeCompare(b.name, "en"),
      )
    : [...props, ...slots]
  return all.map(({ code }) => code).join(" ")
}

const reactChildren = (nodes) => {
  const merged = []
  for (const node of nodes) {
    const previous = merged.at(-1)
    if (node.type === "text" && previous?.type === "text") {
      merged[merged.length - 1] = {
        type: "text",
        value: previous.value + node.value,
      }
    } else {
      merged.push(node)
    }
  }
  return merged
}

const reactNodes = (nodes, context) => {
  const children = reactChildren(nodes.filter((node) => !node.slot))
  return children
    .map((node, index) => {
      if (node.type === "text") {
        if (!node.value.trim()) {
          if (!/\n/.test(node.value)) return " "
          return /\n[^\n]*\n/.test(node.value) ? "\n\n" : "\n"
        }
        let text = node.value.replace(/\s+/g, " ")
        if (index === 0) text = text.trimStart()
        if (index === children.length - 1) text = text.trimEnd()
        return jsxText(text)
      }
      if (node.type === "comment") return `{/*${node.value}*/}`
      if (node.type === "expression") return `{${node.code}}`
      if (node.type === "html") {
        const item = context.markup.get(node.name)
        return item.shared ? `{${node.name}}` : reactNodes(item.tree, context)
      }
      if (node.type === "map") {
        return `{${node.array}.map((${node.params}) => (${reactElement(node.child, context, node.key)}))}`
      }
      if (node.type === "fragment") {
        throw unsupported(context.file, "a slot outside a component", "React")
      }
      return reactElement(node, context)
    })
    .join("")
}

const reactElement = (node, context, key) => {
  const props = reactProps(node, context)
  const attributes = key ? `key={${key}}${props ? ` ${props}` : ""}` : props
  const children =
    node.name === "Select"
      ? node.children.map((child) =>
          child.type === "element" && child.name === "option"
            ? {
                ...child,
                attributes: child.attributes.filter(
                  (item) => item.name !== "selected",
                ),
              }
            : child,
        )
      : node.children
  const content = reactNodes(children, context)
  if (VOID_ELEMENTS.has(node.name) || (!content.trim() && node.component)) {
    return `${openTag(node.name, attributes)} />`
  }
  return `${openTag(node.name, attributes)}>${content}</${node.name}>`
}

const toReact = (example, name, file = `${name}.astro`) => {
  const context = { file, markup: example.markup }
  const components = usedComponents(example)
  const functionName = components.includes(name) ? `${name}Example` : name
  const shared = [...example.markup.values()]
    .filter((item) => item.shared)
    .map(
      (item) =>
        `const ${item.name} = (${reactNodes(item.tree, context).trim()})`,
    )
  const header = [
    importLine(example, "react"),
    ...example.consts.map(({ code, name }) => `const ${name} = ${code}`),
    ...shared,
  ]
    .filter(Boolean)
    .join("\n\n")
  const roots = example.tree.filter(
    (node) => !(node.type === "text" && !node.value.trim()),
  )
  const styles = example.styles.map(
    (css) => `\n<style>{\`\n${indent(css, 8)}\n      \`}</style>`,
  )
  const markup = reactNodes(example.tree, context)
  const body =
    roots.length > 1 || styles.length > 0
      ? `<>${markup}${styles.join("")}</>`
      : markup
  return `${header ? `${header}\n\n` : ""}export default function ${functionName}() {\n  return (${body})\n}\n`
}

const prettierFormat = async (code, file) => {
  const options = await resolveConfig(file)
  const formatted = await format(code, { ...options, filepath: file })
  if ((await format(formatted, { ...options, filepath: file })) !== formatted) {
    throw new Error(
      `${file}: Prettier doesn't format the generated code stably`,
    )
  }
  return formatted
}

const reactStyleIndent = (code) =>
  code.replace(
    /^( *)<style>\{`\n([\s\S]*?)\n *`\}<\/style>/gm,
    (_, spaces, css) =>
      `${spaces}<style>{\`\n${indent(dedent(css), spaces.length + 2)}\n${spaces}\`}</style>`,
  )

export const convertExample = async (source, framework, file) => {
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const example = await parseExample(source, file)
  if (example.scripts.length > 0) {
    throw unsupported(file, "a client <script>", framework)
  }
  const target = file.replace(/\.astro$/, TARGETS[framework])
  if (framework === "react") {
    return reactStyleIndent(
      await prettierFormat(toReact(example, name, file), target),
    )
  }
  if (framework === "svelte") {
    return prettierFormat(toSvelte(example), target)
  }
  return prettierFormat(toVue(example), target)
}

const componentScripts = async () => {
  const paths = new Set()
  for (const folder of await readdir(componentsDir, { withFileTypes: true })) {
    if (!folder.isDirectory()) continue
    for (const file of await readdir(join(componentsDir, folder.name))) {
      if (!file.endsWith(".astro")) continue
      const source = await readFile(
        join(componentsDir, folder.name, file),
        "utf8",
      )
      for (const [, path] of source.matchAll(
        /import\s+(?:\{[^}]*\}\s+from\s+)?"\.\.\/\.\.\/((?:elements|css\/js)\/[\w-]+\.js)"/g,
      )) {
        paths.add(path)
      }
    }
  }
  return [...paths].toSorted()
}

export const HTML_SCRIPT_RULES = [
  {
    match: (html) =>
      [...new Set([...html.matchAll(/<opui-([\w-]+)/g)].map((m) => m[1]))]
        .toSorted()
        .map((tag) => `import "opui-css/elements/${tag}.js"`),
    paths: /^elements\//,
  },
  {
    match: (html) =>
      /\bdata-indeterminate\b/.test(html)
        ? [
            'import { activateIndeterminate } from "opui-css/css/js/checkbox.js"',
            "",
            "activateIndeterminate()",
          ]
        : [],
    paths: /^css\/js\/checkbox\.js$/,
  },
  {
    match: (html) =>
      /<output\b[^>]*\bdata-live\b/.test(html)
        ? ['import "opui-css/css/js/range.js"']
        : [],
    paths: /^css\/js\/range\.js$/,
  },
]

const stripTypes = (code) => {
  const { emitWarning } = process
  process.emitWarning = () => {}
  try {
    return stripTypeScriptTypes(code)
  } finally {
    process.emitWarning = emitWarning
  }
}

const INLINE_PADDING = new RegExp(
  `(<(?!(?:${[...VOID_ELEMENTS].join("|")})\\b)[a-z][\\w-]*\\b[^<>]*>)\\s+(?=[^\\s<])|(?<=[^\\s>])\\s+(</[a-z][\\w-]*>)`,
  "g",
)

const topLevelBreaks = (html, blankLines) => {
  const nodes = parseFragment(html, {
    sourceCodeLocationInfo: true,
  }).childNodes.filter((node) => node.sourceCodeLocation)
  const elements = nodes.filter((node) => node.tagName)
  if (
    elements.length !== blankLines.length + 1 ||
    nodes.some((node) => !node.tagName && node.value?.trim())
  ) {
    return html
  }
  return elements
    .map((node, index) => {
      const { endOffset, startOffset } = node.sourceCodeLocation
      return `${index > 0 && blankLines[index - 1] ? "\n" : ""}${html.slice(startOffset, endOffset)}`
    })
    .join("\n")
}

const BOOLEAN_ATTRIBUTES = new Set([
  "allowfullscreen",
  "async",
  "autofocus",
  "autoplay",
  "checked",
  "controls",
  "default",
  "defer",
  "disabled",
  "formnovalidate",
  "hidden",
  "inert",
  "loop",
  "multiple",
  "muted",
  "nomodule",
  "novalidate",
  "open",
  "playsinline",
  "popover",
  "readonly",
  "required",
  "reversed",
  "selected",
])

const BLOCK_ELEMENTS =
  "address|article|aside|blockquote|caption|dd|details|dialog|div|dl|dt|fieldset|figcaption|figure|footer|form|h[1-6]|header|hgroup|hr|legend|li|main|nav|ol|p|pre|section|summary|table|tbody|td|tfoot|th|thead|tr|ul"

const tidyTag = (tag) =>
  tag.replace(
    /(\s+)([^\s=<>/"']+)(?:=("[^"]*"|'[^']*'|[^\s>]+))?/g,
    (match, space, name, value) => {
      if (name === "slot") return ""
      if (value !== undefined) {
        return `${space}${name}=${value.replace(/&amp;(?![a-zA-Z][a-zA-Z0-9]*;|#)/g, "&")}`
      }
      return BOOLEAN_ATTRIBUTES.has(name) || /^(aria|data)-/.test(name)
        ? match
        : `${space}${name}=""`
    },
  )

const tidyText = (text) => text.replace(/&quot;/g, '"').replace(/&#39;/g, "'")

const layoutClasses = async () => {
  const classes = new Map()
  for (const file of await readdir(cssDir)) {
    if (!file.endsWith(".css")) continue
    postcss
      .parse(await readFile(join(cssDir, file), "utf8"))
      .walkRules((rule) => {
        if (rule.parent?.type !== "atrule" || rule.parent.name !== "layer") {
          return
        }
        const display = rule.nodes.find(
          (node) => node.type === "decl" && node.prop === "display",
        )?.value
        if (!/^(inline-)?(flex|grid)$/.test(display ?? "")) return
        const selectors = rule.selector
          .replace(/^:where\(([\s\S]*)\)$/, "$1")
          .split(",")
          .map((selector) => selector.trim())
        if (selectors.every((selector) => /^\.ui-[\w-]+$/.test(selector))) {
          for (const selector of selectors) {
            classes.set(selector.slice(1), display)
          }
        }
      })
  }
  return classes
}

const BLOCK_TAGS = new RegExp(`^(?:${BLOCK_ELEMENTS})$`)

const spreadLayoutChildren = (html, classes) => {
  const edits = []
  const displays = (node) =>
    (node.attrs?.find(({ name }) => name === "class")?.value ?? "")
      .split(/\s+/)
      .map((name) => classes.get(name))
      .filter(Boolean)
  const isBlock = (node) =>
    !!node?.tagName &&
    (BLOCK_TAGS.test(node.tagName) ||
      displays(node).some((display) => !display.startsWith("inline")))
  const visit = (children, layout, endTag) => {
    children.forEach((child, index) => {
      const previous = children[index - 1]
      const location = child.sourceCodeLocation
      if (!location) return
      if (child.tagName) {
        if (
          (!previous && endTag !== undefined && (layout || isBlock(child))) ||
          (previous?.tagName && (layout || isBlock(child) || isBlock(previous)))
        ) {
          edits.push({ end: location.startOffset, start: location.startOffset })
        }
        visit(
          child.content?.childNodes ?? child.childNodes,
          displays(child).length > 0,
          child.sourceCodeLocation.endTag?.startOffset,
        )
      } else if (layout && child.value !== undefined && !child.value.trim()) {
        if (!child.value.includes("\n")) {
          edits.push({ end: location.endOffset, start: location.startOffset })
        }
      }
    })
    const last = children.at(-1)
    if (endTag !== undefined && last?.tagName && (layout || isBlock(last))) {
      edits.push({ end: endTag, start: endTag })
    }
  }
  visit(parseFragment(html, { sourceCodeLocationInfo: true }).childNodes, false)
  return edits
    .toSorted((a, b) => b.start - a.start)
    .reduce(
      (result, { end, start }) =>
        `${result.slice(0, start)}\n${result.slice(end)}`,
      html,
    )
}

const collapseWhitespace = (html) => {
  const kept = []
  return html
    .replace(
      /(<(pre|textarea)\b[^>]*>)([\s\S]*?)(<\/\2>)/g,
      (_, open, _tag, content, close) => {
        kept.push(content)
        return `${open}\uE000${kept.length - 1}\uE000${close}`
      },
    )
    .replace(/>\s*(<!--[\s\S]*?-->)\s*</g, ">$1<")
    .replace(/>\s+/g, ">\n")
    .replace(/\s+</g, "\n<")
    .replace(/[ \t]*\n\s*/g, "\n")
    .replace(INLINE_PADDING, (_, open, close) => open ?? close)
    .replace(/\uE000(\d+)\uE000/g, (_, index) => kept[index])
}

export const cleanRender = (html, blankLines = [], classes = new Map()) =>
  spreadLayoutChildren(
    topLevelBreaks(
      collapseWhitespace(
        clean(html)
          .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "")
          .replace(/<link\b[^>]*>/g, "")
          .replace(
            /<selectedcontent>(?!<\/selectedcontent>)/g,
            "$&</selectedcontent>",
          )
          .split(/(<!--[\s\S]*?-->|<[^<>]*>)/)
          .map((part, index) =>
            index % 2 === 0
              ? tidyText(part)
              : part.startsWith("<!--")
                ? part
                : tidyTag(part),
          )
          .join(""),
      ).trim(),
      blankLines,
    ),
    classes,
  )

export const htmlFromRender = async (rendered, source, file, classes) => {
  const example = await parseLoose(source)
  const markup = cleanRender(rendered, example.blankLines, classes)
  const imports = HTML_SCRIPT_RULES.flatMap((rule) => rule.match(markup))
  const own = example.scripts.map((script) => stripTypes(script).trim())
  const script = [imports.join("\n"), ...own].filter(Boolean).join("\n\n")
  const parts = [
    markup,
    ...example.styles.map((css) => `<style>\n${indent(css, 2)}\n</style>`),
    ...(script ? [`<script type="module">\n${script}\n</script>`] : []),
  ]
  return prettierFormat(
    `${parts.join("\n\n")}\n`,
    file.replace(/\.astro$/, ".html"),
  )
}

const createRenderer = async () => {
  const { getViteConfig } = await import("astro/config")
  const { createViteServer } = await import("vitest/node")
  const config = await getViteConfig(
    { logLevel: "error" },
    { logLevel: "error" },
  )({
    command: "serve",
    mode: "development",
  })
  const server = await createViteServer({
    ...config,
    appType: "custom",
    configFile: false,
    logLevel: "error",
    optimizeDeps: { noDiscovery: true },
    server: { hmr: false, middlewareMode: true, ws: false },
  })
  const { experimental_AstroContainer } =
    await server.ssrLoadModule("astro/container")
  const container = await experimental_AstroContainer.create()
  return {
    close: () => server.close().catch(() => {}),
    render: async (key, source) => {
      const module = await server.ssrLoadModule(
        `/src/component-examples/${key}.astro`,
      )
      return container.renderToString(module.default, {
        locals: { $id: createExampleIdGenerator(key, source) },
      })
    },
  }
}

const exampleKeys = async (only) => {
  const slugs = (await readdir(examplesDir)).toSorted()
  const unknown = only.filter((slug) => !slugs.includes(slug))
  if (unknown.length > 0) {
    throw new Error(`--only names no examples folder: ${unknown.join(", ")}`)
  }
  const keys = []
  for (const slug of slugs.filter(
    (slug) => only.length === 0 || only.includes(slug),
  )) {
    for (const file of (await readdir(join(examplesDir, slug))).toSorted()) {
      if (file.endsWith(".astro")) keys.push(`${slug}/${file.slice(0, -6)}`)
    }
  }
  return keys
}

const checkScriptRules = async () => {
  const missing = (await componentScripts()).filter(
    (path) => !HTML_SCRIPT_RULES.some((rule) => rule.paths.test(path)),
  )
  if (missing.length > 0) {
    throw new Error(
      `A component loads ${missing.join(", ")}, which no rule in HTML_SCRIPT_RULES (scripts/build-examples.mjs) adds to the HTML examples`,
    )
  }
}

/** @param {{ only?: string[], handWritten?: Record<string, string> }} [options] */
export const generate = async ({
  only = [],
  handWritten = readHandWritten(),
} = {}) => {
  await checkScriptRules()
  const keys = await exampleKeys(only)
  const classes = await layoutClasses()
  const renderer = await createRenderer()
  const outputs = new Map()
  const problems = []
  try {
    for (const key of keys) {
      const astroFile = `src/component-examples/${key}.astro`
      const source = await readFile(join(root, astroFile), "utf8")
      for (const framework of generatedTargets(key, source, handWritten)) {
        const target = `src/component-examples/${key}${TARGETS[framework]}`
        try {
          if (framework === "html") {
            outputs.set(
              target,
              await htmlFromRender(
                await renderer.render(key, source),
                source,
                astroFile,
                classes,
              ),
            )
          } else {
            outputs.set(
              target,
              await convertExample(source, framework, astroFile),
            )
          }
        } catch (error) {
          problems.push(`${target}: ${error.message}`)
        }
      }
    }
  } finally {
    await renderer.close()
  }
  return { outputs, problems }
}

const parseLoose = async (source) => {
  const { ast } = await parse(source, { position: false })
  const scripts = []
  const styles = []
  const blankLines = []
  let gap = ""
  let seen = false
  for (const node of ast.children) {
    if (node.type === "element" && node.name === "script") {
      scripts.push(textOf(node))
      continue
    }
    if (node.type === "element" && node.name === "style") {
      styles.push(dedent(textOf(node)))
      continue
    }
    if (node.type === "text") {
      gap += node.value
      continue
    }
    if (node.type === "frontmatter") continue
    if (seen) blankLines.push(/\n[^\S\n]*\n/.test(gap))
    seen = true
    gap = ""
  }
  return { blankLines, scripts, styles }
}

const main = async () => {
  const { values } = parseArgs({
    options: {
      check: { type: "boolean" },
      only: { type: "string" },
    },
    strict: true,
  })
  const { outputs, problems } = await generate({
    only: values.only?.split(",") ?? [],
  })
  const read = (file) => {
    try {
      return readFileSync(join(root, file), "utf8")
    } catch {
      return undefined
    }
  }
  const stale = staleProblems(outputs, read)
  if (values.check) {
    const errors = [...problems, ...stale]
    if (errors.length > 0) {
      console.error(errors.join("\n"))
      process.exit(1)
    }
    console.log(`Checked ${outputs.size} example files.`)
    return
  }
  for (const [file, code] of outputs) {
    if (read(file) === code) continue
    await writeFile(join(root, file), code)
    console.log(`Wrote ${file}`)
  }
  if (problems.length > 0) {
    console.error(problems.join("\n"))
    process.exit(1)
  }
  console.log(`Generated ${outputs.size} example files.`)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
