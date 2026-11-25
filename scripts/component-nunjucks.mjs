import { readFileSync } from "node:fs"
import { readdir } from "node:fs/promises"
import { join, relative } from "node:path"
import { parseArgs } from "node:util"
import { fileURLToPath } from "node:url"
import { slotProp } from "../src/component-api/frameworks.ts"
import {
  COMPILER,
  KEYWORDS,
  nunjucksExpression,
  nunjucksName,
  nunjucksString,
  nunjucksStatement,
} from "./component-nunjucks-expression.mjs"
import { readComponent } from "./component-reader.mjs"
import { root, unsupported } from "./component-shared.mjs"
import { VOID_ELEMENTS } from "./html-tokens.mjs"
import { HELPERS } from "./nunjucks-runtime.mjs"

const RESERVED = new Set(["caller", "loop", "opui", "props", ...KEYWORDS])

const TEMPLATE_START = /\{(?=[{%#])/g

const text = (value) => value.replace(TEMPLATE_START, '{{ "\\{" }}')

const staticValue = (value) =>
  text(value.replace(/&/g, "&amp;").replace(/"/g, "&quot;"))

const importedNames = (lines) =>
  lines.flatMap((line) =>
    (/\{([^}]*)\}/.exec(line)?.[1] ?? "")
      .split(",")
      .map((name) =>
        name
          .trim()
          .split(/\s+as\s+/)
          .at(-1),
      )
      .filter(Boolean),
  )

const trimmedTag = (tag, { after = true, before = true } = {}) =>
  `${tag.slice(0, 2)}${before ? "-" : ""}${tag.slice(2, -2)}${after ? "-" : ""}${tag.slice(-2)}`

export const toNunjucks = (component) => {
  const { file } = component
  const reserve = (name) => {
    if (RESERVED.has(name) || name.startsWith("__")) {
      throw unsupported(
        "BC705",
        file,
        `the name ${name}`,
        "rename the local",
        COMPILER,
      )
    }
    return name
  }
  const defaulted = component.props.filter((prop) => prop.default !== undefined)
  const locals = new Set(
    [
      component.rest,
      ...defaulted.map((prop) => prop.local),
      ...component.reads.map((read) => read.name),
      ...component.trimmedSlots.map((slot) => slot.local),
      ...component.derived.map((value) => value.name),
    ]
      .filter(Boolean)
      .map(reserve),
  )
  const scope = {
    file,
    helpers: new Set(Object.keys(HELPERS)),
    idBases: new Map(component.idBases),
    idPrefixes: new Set(component.idPrefixes),
    imports: new Set(importedNames(component.imports)),
    locals,
    props: new Map(
      component.props
        .filter((prop) => prop.default === undefined)
        .map((prop) => [prop.local, prop.prop]),
    ),
  }
  const expression = (code, inner = scope) => nunjucksExpression(code, inner)
  const contextKey = (context) =>
    `${context.folder ?? component.folder}/${context.name}`
  const preamble = [
    ...(component.rest
      ? [
          `{% set ${component.rest} = opui.rest(props, [${component.props
            .map((prop) => nunjucksString(prop.prop))
            .join(", ")}]) %}`,
        ]
      : []),
    ...defaulted.map(({ default: value, local, prop }) => {
      const read = `props${nunjucksName(prop)}`
      return `{% set ${local} = (${read} if ${read} is defined else ${expression(value)}) %}`
    }),
    ...component.reads.map(
      ({ context, name }) =>
        `{% set ${name} = opui.context(${nunjucksString(contextKey(context))}) %}`,
    ),
    ...component.trimmedSlots.map(({ local, slot }) => {
      const key = nunjucksString(slotProp(slot))
      return `{% set ${local} = (opui.trimEdges(opui.slot(props, ${key})) if opui.has(props, ${key}) else "") %}`
    }),
    ...component.derived.map(
      ({ code, name }) => `{% set ${name} = ${expression(code)} %}`,
    ),
    ...component.warnings.map((code) => nunjucksStatement(code, scope)),
    ...(component.item
      ? [
          nunjucksStatement(
            `warnGroupedChecked(${JSON.stringify(component.name)}, ${component.item.grouped}, ${component.item.checked ?? "undefined"}, ${JSON.stringify(component.item.group)})`,
            scope,
          ),
        ]
      : []),
    ...(component.provide
      ? [
          `{% set __provided = { ${component.provide.value
            .map(
              ({ code, key }) => `${nunjucksString(key)}: ${expression(code)}`,
            )
            .join(", ")} } %}`,
        ]
      : []),
  ]
  const part = (item, variable, inner) => {
    if (item.kind === "class") {
      return `{ "class": opui.cx(${expression(item.code, inner)}) }`
    }
    if (item.kind === "expression") {
      return `{ ${nunjucksString(item.name)}: ${expression(item.code, inner)} }`
    }
    if (item.kind === "static" && variable) {
      return `{ ${nunjucksString(item.name)}: ${nunjucksString(item.value)} }`
    }
    if (item.kind === "boolean" && variable) {
      return `{ ${nunjucksString(item.name)}: true }`
    }
    const spread = expression(item.code, inner)
    const chosen =
      item.condition === undefined
        ? spread
        : item.negated
          ? `({} if ${expression(item.condition, inner)} else ${spread})`
          : `(${spread} if ${expression(item.condition, inner)} else {})`
    return item.defined ? `opui.defined(${chosen})` : chosen
  }
  const attributes = (node, inner) => {
    if (node.variable || node.custom) {
      const tag = node.variable
        ? expression(node.tag, inner)
        : nunjucksString(node.tag)
      const parts = node.attributes.map((item) => part(item, true, inner))
      return parts.length
        ? `{{ opui.elementAttrs(${tag}, opui.merge(${parts.join(", ")})) }}`
        : ""
    }
    const output = []
    let run = []
    const flush = () => {
      if (run.length) output.push(`{{ opui.attrs(${run.join(", ")}) }}`)
      run = []
    }
    for (const item of node.attributes) {
      if (item.kind === "static") {
        flush()
        output.push(` ${item.name}="${staticValue(item.value)}"`)
      } else if (item.kind === "boolean") {
        flush()
        output.push(` ${item.name}`)
      } else {
        run.push(part(item, false, inner))
      }
    }
    flush()
    return output.join("")
  }
  const provided = (name) => component.provide?.slot === name
  const slot = (node, inner) => {
    if (node.name === "default") {
      if (provided("default")) {
        return `{{ opui.provide(${nunjucksString(contextKey(component.provide.context))}, __provided, caller) }}`
      }
      return node.fallback.length
        ? `{% if caller is defined %}{{ caller() }}{% else %}${emit(node.fallback, inner)}{% endif %}`
        : "{{ caller() if caller }}"
    }
    if (provided(node.name)) {
      throw unsupported(
        "BC703",
        file,
        `a context provided around the slot ${node.name}`,
        "provide the context around the default slot",
        COMPILER,
      )
    }
    const trimmed = component.trimmedSlots.find(
      (item) => item.slot === node.name,
    )
    if (node.trimmed && trimmed) return `{{ ${trimmed.local} }}`
    const key = nunjucksString(slotProp(node.name))
    return node.fallback.length
      ? `{% if opui.has(props, ${key}) %}{{ opui.slot(props, ${key}) }}{% else %}${emit(node.fallback, inner)}{% endif %}`
      : `{{ opui.slot(props, ${key}) }}`
  }
  const loop = (node, inner) => {
    if (!/^[A-Za-z_$][\w$]*$/.test(node.item)) {
      throw unsupported(
        "BC701",
        file,
        `the loop item ${node.item}`,
        "name the item and read its fields in the loop",
        COMPILER,
      )
    }
    const names = [
      node.item,
      node.index,
      ...node.consts.map(({ name }) => name),
    ]
      .filter(Boolean)
      .map(reserve)
    const loopScope = { ...inner, locals: new Set([...inner.locals, ...names]) }
    const sets = [
      ...(node.index ? [`{% set ${node.index} = loop.index0 %}`] : []),
      ...node.consts.map(
        ({ code, name }) =>
          `{% set ${name} = ${expression(code, loopScope)} %}`,
      ),
    ]
    return `{% for ${node.item} in ${expression(node.list, inner)} %}${sets.join("")}${emit(node.children, loopScope)}{% endfor %}`
  }
  const element = (node, inner) => {
    if (node.component) {
      throw unsupported(
        "BC704",
        file,
        `the component ${node.tag}`,
        "write the inner markup in place, or teach the prototype to call the inner macro",
        COMPILER,
      )
    }
    const tag = node.variable
      ? `{{ opui.tag(${expression(node.tag, inner)}) }}`
      : node.tag
    const open = `<${tag}${attributes(node, inner)}`
    if (node.children.length === 0 && !node.variable && !node.custom) {
      if (VOID_ELEMENTS.has(node.tag)) return `${open}>`
      if (node.foreign) return `${open}/>`
    }
    return `${open}>${emit(node.children, inner)}</${tag}>`
  }
  const emit = (nodes, inner) =>
    nodes
      .map((node) => {
        if (node.type === "text") return text(node.value)
        if (node.type === "expression") {
          return `{{ ${expression(node.code, inner)} }}`
        }
        if (node.type === "slot") return slot(node, inner)
        if (node.type === "if") {
          const test = expression(node.test, inner)
          const consequent = emit(node.consequent, inner)
          return node.alternate
            ? `{% if ${test} %}${consequent}{% else %}${emit(node.alternate, inner)}{% endif %}`
            : `{% if ${test} %}${consequent}{% endif %}`
        }
        if (node.type === "each") return loop(node, inner)
        return element(node, inner)
      })
      .join("")
  const body = emit(component.tree, scope)
  const head = `{% macro ${component.name}(props = {}) %}`
  if (preamble.length === 0) return `${head}${body}{% endmacro %}\n`
  return `${trimmedTag(head, { before: false })}\n${preamble
    .map((tag, index) =>
      trimmedTag(tag, { after: index < preamble.length - 1 }),
    )
    .join("\n")}${body}{% endmacro %}\n`
}

export const compileNunjucks = async (source, file) => {
  const parts = file.split("/")
  const component = await readComponent(source, file)
  return toNunjucks({
    ...component,
    file,
    folder: parts.at(-2),
    name: parts.at(-1).replace(/\.astro$/, ""),
  })
}

export const nunjucksTemplates = async (files) =>
  Object.fromEntries(
    await Promise.all(
      files.map(async (file) => [
        `opui/${file
          .split("/")
          .at(-1)
          .replace(/\.astro$/, "")}.njk`,
        await compileNunjucks(readFileSync(join(root, file), "utf8"), file),
      ]),
    ),
  )

const componentsDir = join(root, "packages/opui/components")

export const componentFiles = async () =>
  (await readdir(componentsDir, { recursive: true }))
    .filter((file) => /^[A-Z][^/]*\/[A-Z][^/]*\.astro$/.test(file))
    .map((file) => relative(root, join(componentsDir, file)))
    .toSorted()

export const nunjucksCensus = async () => {
  const compiled = []
  const refused = []
  for (const file of await componentFiles()) {
    try {
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file)
      compiled.push(file)
    } catch (error) {
      if (!error.code) throw error
      refused.push({ code: error.code, file, message: error.message })
    }
  }
  return { compiled, refused }
}

const report = ({ compiled, refused }) => {
  const codes = [...new Set(refused.map(({ code }) => code))].toSorted()
  return [
    `${compiled.length} of ${compiled.length + refused.length} components compile to Nunjucks macros. The first construct each refused file can't compile:`,
    ...codes.flatMap((code) => {
      const files = refused.filter((item) => item.code === code)
      return [
        "",
        `${code} (${files.length})`,
        ...files.map(
          ({ file, message }) =>
            `  ${file}: ${(/ uses ([\s\S]*?), which /.exec(message)?.[1] ?? message).replace(/\s+/g, " ")}`,
        ),
      ]
    }),
  ].join("\n")
}

const main = async () => {
  const { values } = parseArgs({
    options: { print: { type: "string" }, report: { type: "boolean" } },
  })
  if (values.print) {
    const file = (await componentFiles()).find((item) =>
      item.endsWith(`/${values.print}.astro`),
    )
    if (!file) throw new Error(`No component ${values.print}`)
    process.stdout.write(
      await compileNunjucks(readFileSync(join(root, file), "utf8"), file),
    )
    return
  }
  if (values.report) {
    console.log(report(await nunjucksCensus()))
    return
  }
  console.log(
    "Usage: node scripts/component-nunjucks.mjs --print <Name> | --report",
  )
}

if (process.argv[1] === fileURLToPath(import.meta.url)) await main()
