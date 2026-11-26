import nunjucks from "nunjucks"
import { cx } from "../components/cx"
import { trimEdges } from "../components/whitespace"
import { BOOLEAN_ATTRIBUTES, BOOLEAN_WHEN_BOOLEAN } from "./attributes"
import { attributes, components, helpers, templates } from "./macros"
import { normalizeProps, restProps, type PropsMeta } from "./props"

type Environment = nunjucks.Environment

type Settings = {
  autoescape?: boolean
  lstripBlocks?: boolean
  throwOnUndefined?: boolean
  trimBlocks?: boolean
}

type Loader = {
  cache?: Record<string, unknown>
  getSource: (name: string) => nunjucks.LoaderSource | null
}

type Internals = Environment & { loaders: Loader[]; opts: Settings }

export type Options = {
  id?: (prefix: string) => string
}

const { SafeString } = nunjucks.runtime

const markSafe = (text: string) => new SafeString(text)

const ENTITIES: Record<string, string> = {
  '"': "&quot;",
  "&": "&amp;",
  "'": "&#39;",
  "<": "&lt;",
  ">": "&gt;",
}

const escape = (text: string) => text.replace(/[&"'<>]/g, (c) => ENTITIES[c])

const INVALID_NAME = /[\s"'>/=]/
const ELEMENT_NAME = /^[a-zA-Z][\w\-.:\u00B7\u00C0-\u{EFFFF}]*/u

const elementName = (name: unknown) => {
  const tagName = String(name)
  const whole = ELEMENT_NAME.exec(tagName)?.[0]
  if (whole !== undefined && whole.length === tagName.length) return tagName
  const trimmed = ELEMENT_NAME.exec(tagName.trim())?.[0]
  if (!trimmed) {
    throw new Error(`Invalid element name: ${JSON.stringify(tagName)}`)
  }
  return trimmed
}

const attributeText = (value: unknown) =>
  String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;")

const kebab = (key: string) =>
  key.toLowerCase() === key
    ? key
    : key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`)

const styleText = (value: Record<string, unknown>) =>
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

const classValue = (value: unknown): string => {
  if (!value) return ""
  if (typeof value === "string" || typeof value === "number") {
    return String(value)
  }
  if (typeof value !== "object") return ""
  if (Array.isArray(value)) {
    return value.map(classValue).filter(Boolean).join(" ")
  }
  const names = []
  for (const [key, on] of Object.entries(value)) if (on) names.push(key)
  return names.join(" ")
}

const booleanAttribute = (key: string, value: unknown, tagName: string) => {
  if (key === "popover") return value ? ` ${key}` : ""
  if (tagName.includes("-")) return ` ${key}="${attributeText(value)}"`
  return value ? ` ${key}` : ""
}

const attribute = (value: unknown, key: string, tagName: string) => {
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
      return ` style="${attributeText(styleText(value as Record<string, unknown>))}"`
    }
  }
  if (key === "className") return ` class="${attributeText(value)}"`
  if (
    BOOLEAN_ATTRIBUTES.has(key.toLowerCase()) ||
    (BOOLEAN_WHEN_BOOLEAN.has(key) && typeof value === "boolean")
  ) {
    return booleanAttribute(key, value, tagName)
  }
  if (value === "") return ` ${key}`
  return ` ${key}="${attributeText(value)}"`
}

const attributesOf = (part: unknown, tagName: string) =>
  part && typeof part === "object"
    ? Object.entries(part)
        .map(([key, value]) => attribute(value, key, tagName))
        .join("")
    : ""

const textOf = (value: unknown): unknown => {
  if (value instanceof SafeString || typeof value === "string") return value
  if (value == null || value === false || value === "") return ""
  if (Array.isArray(value)) {
    const parts = value.map(textOf)
    return parts.some((part) => part instanceof SafeString)
      ? markSafe(
          parts
            .map((part) =>
              part instanceof SafeString ? String(part) : escape(String(part)),
            )
            .join(""),
        )
      : parts.join("")
  }
  if (typeof value === "function") return textOf(value())
  return String(value)
}

type Name = keyof typeof components

const known = new Map<Name, Set<string>>()

const knownOf = (name: Name) => {
  const { added, removed } = components[name]
  let names = known.get(name)
  if (!names) {
    names = new Set([
      ...attributes.filter((item) => !(removed as string[]).includes(item)),
      ...added,
    ])
    known.set(name, names)
  }
  return names
}

const metaOf = (name: Name, filter: string): PropsMeta => {
  const meta = components[name]
  if (!meta) throw new Error(`${filter} has no component named ${name}`)
  return meta
}

const FILTERS = {
  opuiAttributes: (value: unknown, tagName?: string) =>
    markSafe(attributesOf(value, tagName ? elementName(tagName) : "")),
  opuiClass: (value: unknown) => cx([value as string]),
  opuiOmit: (value: Record<string, unknown> | undefined, names: string[]) =>
    Object.fromEntries(
      Object.entries(value ?? {}).filter(([name]) => !names.includes(name)),
    ),
  opuiProps: (value: unknown, name: Name) =>
    normalizeProps(value, metaOf(name, "opuiProps"), name),
  opuiRest: (value: unknown, name: Name) =>
    restProps(value, metaOf(name, "opuiRest"), name, knownOf(name)),
  opuiTag: elementName,
  opuiText: textOf,
  opuiTrim: (value: unknown) => {
    const trimmed = trimEdges(String(value ?? ""))
    return trimmed ? markSafe(trimmed) : ""
  },
}

const counter = () => {
  const counts = new Map<string, number>()
  return (prefix: string) => {
    const count = (counts.get(prefix) ?? 0) + 1
    counts.set(prefix, count)
    return `${prefix}-${count}`
  }
}

const runtime = ({ id = counter() }: Options) => {
  let store = new Map<unknown, unknown>()
  return {
    ...helpers,
    context: (key: unknown) => store.get(key),
    id,
    ids: (prefix: string, given?: string | false) => {
      let base = given === false ? undefined : given
      return (part?: string) => {
        base ||= id(prefix)
        return part ? `${base}-${part}` : base
      }
    },
    merge: (...parts: object[]) => Object.assign({}, ...parts),
    provide: (key: unknown, value: unknown, render: unknown) => {
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

const loader: Loader = {
  getSource: (name) =>
    Object.hasOwn(templates, name)
      ? {
          noCache: false,
          path: name,
          src: templates[name as keyof typeof templates],
        }
      : null,
}

export const configure = <Env extends Environment>(
  env: Env,
  options: Options = {},
) => {
  if (!(env instanceof nunjucks.Environment)) {
    throw new Error(
      "The Environment passed to configure comes from another copy of nunjucks than opui-css/nunjucks loads, so the two can't tell each other's safe strings apart: install one copy of nunjucks, for example with pnpm dedupe or npm dedupe",
    )
  }
  const internals = env as Env & Internals
  const { autoescape, lstripBlocks, throwOnUndefined, trimBlocks } =
    internals.opts
  if (!autoescape || lstripBlocks || throwOnUndefined || trimBlocks) {
    throw new Error(
      "The opui Nunjucks macros need autoescape on and lstripBlocks, throwOnUndefined and trimBlocks off",
    )
  }
  if (!internals.loaders.some((item) => item.getSource === loader.getSource)) {
    internals.loaders.push({ ...loader, cache: {} })
  }
  env.addGlobal("opui", runtime(options))
  for (const [name, filter] of Object.entries(FILTERS)) {
    env.addFilter(name, filter)
  }
  return env
}
