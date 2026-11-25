import { readdirSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import nunjucks from "nunjucks"
import { cx } from "../packages/opui/components/cx.ts"
import { trimEdges } from "../packages/opui/components/whitespace.ts"

const { markSafe, SafeString } = nunjucks.runtime

const componentsDir = fileURLToPath(
  new URL("../packages/opui/components/", import.meta.url),
)

const UNREGISTERED = new Set([
  "checkedValues",
  "createId",
  "createIds",
  "resetWarnings",
  "selectionOf",
])

export const helperModules = () =>
  readdirSync(componentsDir, { recursive: true })
    .map((file) => file.split("\\").join("/"))
    .filter(
      (file) =>
        /(^|\/)[a-z][\w-]*\.ts$/.test(file) &&
        !/(^|\/)(context|types)\b/.test(file) &&
        !/(^|\/)(react|solid|svelte|vue)\.ts$/.test(file) &&
        !/\.(react|solid|svelte|vue)\.ts$/.test(file),
    )
    .toSorted()

const helpersOf = (modules) => {
  const entries = modules.flatMap((module) =>
    Object.entries(module).filter(
      ([name, value]) => typeof value === "function" && !UNREGISTERED.has(name),
    ),
  )
  const names = entries.map(([name]) => name)
  const repeated = names.find((name, index) => names.indexOf(name) !== index)
  if (repeated) {
    throw new Error(
      `scripts/nunjucks-runtime.mjs registers two helpers named ${repeated}`,
    )
  }
  return Object.fromEntries(entries.toSorted(([a], [b]) => (a < b ? -1 : 1)))
}

export const HELPERS = helpersOf(
  await Promise.all(
    helperModules().map(
      (file) => import(pathToFileURL(join(componentsDir, file)).href),
    ),
  ),
)

const BOOLEAN_ATTRIBUTES =
  /^(?:allowfullscreen|async|autofocus|autoplay|checked|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|inert|loop|muted|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|selected|itemscope)$/i
const INVALID_NAME = /[\s"'>/=]/
const ELEMENT_NAME = /^[a-zA-Z][\w\-.:\u00B7\u00C0-\u{EFFFF}]*/u

export const elementName = (name) => {
  const tagName = String(name)
  const whole = ELEMENT_NAME.exec(tagName)?.[0]
  if (whole !== undefined && whole.length === tagName.length) return tagName
  const trimmed = ELEMENT_NAME.exec(tagName.trim())?.[0]
  if (!trimmed) {
    throw new Error(`Invalid element name: ${JSON.stringify(tagName)}`)
  }
  return trimmed
}

const attributeText = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;")

const kebab = (key) =>
  key.toLowerCase() === key
    ? key
    : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

const styleText = (value) =>
  Object.keys(value)
    .filter(
      (key) =>
        (typeof value[key] === "string" && value[key].trim()) ||
        typeof value[key] === "number",
    )
    .map((key) =>
      key[0] !== "-" && key[1] !== "-"
        ? `${kebab(key)}:${value[key]}`
        : `${key}:${value[key]}`,
    )
    .join(";")

const classValue = (value) => {
  if (!value) return ""
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }
  if (typeof value !== "object") return ""
  if (Array.isArray(value)) {
    return value.map(classValue).filter(Boolean).join(" ")
  }
  const names = []
  for (const key in value) if (value[key]) names.push(key)
  return names.join(" ")
}

const booleanAttribute = (key, value, tagName) => {
  if (key === "popover") return value ? ` ${key}` : ""
  if (tagName.includes("-")) return ` ${key}="${attributeText(value)}"`
  return value ? ` ${key}` : ""
}

const attribute = (value, key, tagName) => {
  if (value == null) return ""
  if (INVALID_NAME.test(key)) return ""
  if (key === "set:html" || key === "set:text") return ""
  if (key === "class:list") {
    const list = attributeText(classValue(value))
    return list ? ` class="${list}"` : ""
  }
  if (key === "style" && !(value instanceof SafeString)) {
    if (Array.isArray(value) && value.length === 2) {
      return ` style="${attributeText(`${styleText(value[0])};${value[1]}`)}"`
    }
    if (typeof value === "object") {
      return ` style="${attributeText(styleText(value))}"`
    }
  }
  if (key === "className") return ` class="${attributeText(value)}"`
  if (BOOLEAN_ATTRIBUTES.test(key)) {
    return booleanAttribute(key, value, tagName)
  }
  if (
    (key === "popover" || key === "download" || key === "hidden") &&
    typeof value === "boolean"
  ) {
    return booleanAttribute(key, value, tagName)
  }
  if (value === "") return ` ${key}`
  return ` ${key}="${attributeText(value)}"`
}

const attributesOf = (part, tagName) =>
  part && typeof part === "object"
    ? Object.keys(part)
        .map((key) => attribute(part[key], key, tagName))
        .join("")
    : ""

export const FILTERS = {
  opuiAttributes: (value, tagName) =>
    markSafe(attributesOf(value, tagName ? elementName(tagName) : "")),
  opuiClass: (value) => cx([value]),
  opuiOmit: (value, names) =>
    Object.fromEntries(
      Object.entries(value ?? {}).filter(([name]) => !names.includes(name)),
    ),
  opuiTag: elementName,
  opuiTrim: (value) => {
    const trimmed = trimEdges(String(value ?? ""))
    return trimmed ? markSafe(trimmed) : ""
  },
}

const counter = () => {
  const counts = new Map()
  return (prefix) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
}

export const createRuntime = ({ id = counter() } = {}) => {
  let store = new Map()
  return {
    ...HELPERS,
    context: (key) => store.get(key),
    id,
    ids: (prefix, given) => {
      let base = given === false ? undefined : given
      return (part) => {
        base ||= id(prefix)
        return part ? `${base}-${part}` : base
      }
    },
    merge: (...parts) => Object.assign({}, ...parts),
    provide: (key, value, render) => {
      if (typeof render !== "function") return ""
      const previous = store
      store = new Map(store)
      store.set(key, value)
      try {
        return render()
      } finally {
        store = previous
      }
    },
  }
}

export const configure = (env, options = {}) => {
  const { autoescape, lstripBlocks, throwOnUndefined, trimBlocks } = env.opts
  if (!autoescape || lstripBlocks || throwOnUndefined || trimBlocks) {
    throw new Error(
      "The opui Nunjucks macros need autoescape on and lstripBlocks, throwOnUndefined and trimBlocks off",
    )
  }
  env.addGlobal("opui", createRuntime(options))
  for (const [name, filter] of Object.entries(FILTERS)) {
    env.addFilter(name, filter)
  }
  return env
}

export const createEnvironment = (templates, options = {}) =>
  configure(
    new nunjucks.Environment(
      {
        getSource: (name) =>
          Object.hasOwn(templates, name)
            ? { noCache: true, path: name, src: templates[name] }
            : null,
      },
      { autoescape: true },
    ),
    options,
  )
