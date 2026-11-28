import { asFragment, code, join, named, uses } from "./component-fragment.ts"
import { isBlank, SOLID_PRAGMA } from "./component-shared.mjs"
import { splitTopLevel } from "./example-display.mjs"
import {
  decodeText,
  decodeTextarea,
  jsxAttribute,
  jsxText,
} from "./example-encoders.mjs"
import {
  propsOf,
  REACT_ATTRIBUTE_NAMES,
  reactBareAttribute,
  reactKinds,
  resolveReactProp,
} from "./example-react-props.mjs"
import { selfCloses } from "./markup-nodes.ts"

export const SPACE = '{" "}'

const NO_PROPS = new Map()

const ASCII_WHITESPACE = /[\t\n\f\r ]+/g

const optionsOf = (nodes) =>
  nodes.flatMap((child) => {
    if (child.type !== "element" || child.component) return []
    if (child.tag === "option") return [child]
    return child.tag === "optgroup" ? optionsOf(child.children) : []
  })

const optionValue = (option) =>
  option.attributes.find((item) => item.name === "value")?.value ??
  decodeText(option.children.map((child) => child.value ?? "").join(""))
    .replace(ASCII_WHITESPACE, " ")
    .replace(/^ | $/g, "")

const withoutSelected = (nodes) =>
  nodes.map((child) => {
    if (child.type !== "element" || child.component) return child
    if (child.tag === "option") {
      return {
        ...child,
        attributes: child.attributes.filter((item) => item.name !== "selected"),
      }
    }
    return child.tag === "optgroup"
      ? { ...child, children: withoutSelected(child.children) }
      : child
  })

const formDefaults = (node, table, refuse) => {
  const attribute = (name) => node.attributes.find((item) => item.name === name)
  const where = `<${node.tag}>`
  const state = { children: node.children, extra: [] }
  const selected = optionsOf(node.children).filter((option) =>
    option.attributes.some((item) => item.name === "selected"),
  )
  if (selected.length > 0) {
    if (!table.has("defaultValue")) {
      throw refuse(
        `a selected <option> inside ${where}, which has no defaultValue`,
      )
    }
    if (attribute("value") || attribute("defaultValue")) {
      throw refuse(`a selected <option> next to a value on ${where}`)
    }
    const multiple = attribute("multiple")
    if (!multiple && selected.length > 1) {
      throw refuse(`several selected options in ${where} without multiple`)
    }
    const values = selected.map(optionValue)
    state.extra.push({
      code: multiple
        ? `defaultValue={${JSON.stringify(values)}}`
        : jsxAttribute("defaultValue", values[0]),
      name: "defaultValue",
    })
    state.children = withoutSelected(node.children)
  }
  if (!node.component && node.tag === "textarea") {
    if (node.children.some((child) => child.type !== "text")) {
      throw refuse("a <textarea> with markup")
    }
    const text = decodeTextarea(
      node.children.map((child) => child.value).join(""),
    )
    if (text) {
      state.extra.push({
        code: jsxAttribute("defaultValue", text),
        name: "defaultValue",
      })
    }
    state.children = []
  }
  return state
}

export const JSX_DIALECTS = {
  react: {
    clientFunctions: true,
    fallback: (name) => REACT_ATTRIBUTE_NAMES[name] ?? name,
    formState: formDefaults,
    framework: "React",
    id: "react",
    keyed: true,
    pragma: "",
    propsOf: (tag, component) => propsOf("react", tag, component),
    resolve: resolveReactProp,
    sharedMarkup: (markup) => code`(${markup})`,
    sharedRead: (name) => name,
    styleObjects: true,
  },
  solid: {
    clientFunctions: false,
    fallback: (name) => name,
    formState: (node) => ({ children: node.children, extra: [] }),
    framework: "Solid",
    id: "solid",
    keyed: false,
    pragma: `${SOLID_PRAGMA}\n`,
    propsOf: (tag, component) => propsOf("solid", tag, component),
    resolve: (table, name) =>
      table.has(name) || name.startsWith("data-") ? name : undefined,
    sharedMarkup: (markup) => code`() => (${markup})`,
    sharedRead: (name) => `${name}()`,
    styleObjects: false,
  },
}

export const jsxName = (dialect, table, name, policy) =>
  dialect.resolve(table ?? NO_PROPS, name) ??
  (policy === "keep" ? dialect.fallback(name) : undefined)

const styleObject = (css, refuse) =>
  `{{ ${splitTopLevel(css, ";")
    .map((declaration) => {
      const colon = declaration.indexOf(":")
      if (colon === -1) {
        throw refuse(
          `the style declaration ${JSON.stringify(declaration)} has no colon`,
        )
      }
      const property = declaration.slice(0, colon).trim()
      const key = property.startsWith("--")
        ? JSON.stringify(property)
        : property.replace(/-(\w)/g, (_, letter) => letter.toUpperCase())
      return `${key}: ${JSON.stringify(declaration.slice(colon + 1).trim())}`
    })
    .join(", ")} }}`

export const jsxAttributeCode = (
  dialect,
  { item, name, table = NO_PROPS, value = item.code, where },
  { policy, refuse },
) => {
  const kinds = reactKinds(table, name)
  const has = (...names) => names.some((kind) => kinds.has(kind))
  const fail = (what) =>
    refuse(
      `${what} for the prop ${name} of ${where}, which ${dialect.framework} types as ${[...kinds].join(" or ") || "nothing"}`,
    )
  if (item.kind === "boolean") {
    const bare = reactBareAttribute(name, kinds)
    if (bare || policy === "keep") return bare ?? name
    throw fail("an attribute without a value")
  }
  if (item.kind === "static") {
    if (name === "style" && dialect.styleObjects) {
      return `${name}=${styleObject(item.value, refuse)}`
    }
    if (policy === "keep" || has("string", "any", "other")) {
      return jsxAttribute(name, item.value)
    }
    if (has("number") && /^-?\d+(\.\d+)?$/.test(item.value)) {
      return `${name}={${item.value}}`
    }
    throw fail(`the string ${JSON.stringify(item.value)}`)
  }
  return code`${name}={${value}}`
}

export const sourceText = (group) =>
  group
    .map((node) =>
      node.value === " " || node.inline ? SPACE : jsxText(node.value),
    )
    .join("")

const joinRuns = (parts) =>
  parts.reduce((joined, part) => {
    const previous = joined.at(-1)
    if (part.run !== undefined && previous?.run !== undefined) {
      joined[joined.length - 1] = {
        role:
          previous.role === "space" || part.role === "space" ? "space" : "drop",
        run: previous.run === "\n\n" || part.run === "\n\n" ? "\n\n" : part.run,
      }
    } else {
      joined.push(part)
    }
    return joined
  }, [])

export const renderedText = (textParts) => (group) =>
  jsxText(
    joinRuns(group.flatMap(textParts))
      .map(
        (part) =>
          part.text ??
          (part.role === "space" ? " " : part.run === "\n\n" ? "\n\n" : "\n"),
      )
      .join(""),
  )

const readParam = (param, written) =>
  /^[A-Za-z_$][\w$]*$/.test(param) &&
  !new RegExp(`(?<![\\w$.])${param.replaceAll("$", "\\$")}(?![\\w$])`).test(
    written,
  )
    ? ""
    : param

export const jsxPrinter = (
  dialect,
  {
    bare = () => undefined,
    each = (node) => ({ consts: [], list: node.list, parameters: node.item }),
    emptyElements,
    ignored = () => false,
    lists = "static",
    narrow = () => undefined,
    other,
    props,
    refuse,
    rewrite = (value) => value,
    tag = (node) => node.tag,
    text,
  },
) => {
  const keys = new Map()
  const branch = (nodes, scope, extra = "") => {
    const significant = nodes.filter(
      (node) => !node.slot && !isBlank(node) && !ignored(node),
    )
    const [only] = significant
    if (significant.length === 1 && !extra) {
      if (only.type === "element") return element(only, scope)
      if (only.type === "if") return conditional(only, scope)
      const alone = bare(only, scope)
      if (alone !== undefined) return asFragment(alone)
    }
    return code`<>${emit(nodes, scope)}${extra}</>`
  }
  const ternary = (node, scope) => {
    const test = rewrite(node.test, scope)
    const consequent = branch(node.consequent, scope)
    if (!node.alternate) return code`(${test}) && (${consequent})`
    return code`${test} ? (${consequent}) : (${branch(node.alternate, scope)})`
  }
  const conditional = (node, scope) =>
    narrow(node, scope, branch) ?? ternary(node, scope)
  const loop = (node, scope) => {
    const row = each(node, scope)
    if (dialect.keyed) keys.set(node.row, node.key)
    const body = branch(node.children, row.scope ?? scope)
    const returned = row.consts.length
      ? code`{\n${join(row.consts, "\n")}\nreturn (\n${body}\n)\n}`
      : code`(\n${body}\n)`
    if (!dialect.keyed && lists === "reactive") {
      return uses(
        code`<For each={${row.list}} keyed={false}>{(${row.parameters}) => ${returned}}</For>`,
        named("solid-js", "For"),
      )
    }
    const parameters = dialect.keyed
      ? row.parameters
      : readParam(row.parameters, body.code)
    return code`{${row.list}${node.optional ? "?" : ""}.map((${parameters}) => ${returned})}`
  }
  const element = (node, scope) => {
    const { attributes, children = node.children } = props(node, scope)
    const key = keys.get(node)
    const listed = join(
      [...(key === undefined ? [] : [`key={${key}}`]), ...attributes],
      " ",
    )
    const name = tag(node, scope)
    const content = emit(children, scope)
    const open = code`<${name}${listed.code ? code` ${listed}` : ""}`
    return selfCloses(node, content.code, emptyElements)
      ? code`${open} />`
      : code`${open}>${content}</${name}>`
  }
  const print = (node, scope, siblings) => {
    if (node.type === "comment") {
      if (node.value.includes("*/")) throw refuse("a comment that contains */")
      return `{/*${node.value}*/}`
    }
    if (node.type === "expression") return code`{${rewrite(node.code, scope)}}`
    if (node.type === "if") {
      return narrow(node, scope, branch) ?? code`{${ternary(node, scope)}}`
    }
    if (node.type === "each") return loop(node, scope)
    if (node.type === "element") return element(node, scope)
    return other(node, scope, { branch, emit, siblings })
  }
  const emit = (nodes, scope) => {
    const content = nodes.filter((node) => !node.slot)
    const parts = []
    for (let index = 0; index < content.length; index++) {
      if (content[index].type !== "text") {
        parts.push(print(content[index], scope, content))
        continue
      }
      const group = [content[index]]
      while (content[index + 1]?.type === "text") group.push(content[++index])
      parts.push(text(group, scope))
    }
    return join(parts)
  }
  const render = (tree, scope) =>
    tree[0].type === "if" ? conditional(tree[0], scope) : emit(tree, scope)
  return { branch, render }
}
