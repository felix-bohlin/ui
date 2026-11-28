import nunjucks from "nunjucks"
import { WARNED_ONCE } from "../components/dev"

declare const process: { env: { NODE_ENV?: string } }

export type PropsMeta = {
  depths: Readonly<Record<string, number>>
  keepsNone: readonly string[]
  props: readonly string[]
  slots: readonly string[]
}

const { SafeString } = nunjucks.runtime

const DEV =
  typeof process === "undefined" || process.env.NODE_ENV !== "production"

const warned = new Set<string>()

const warnOnce = (message: string) => {
  if (warned.has(message)) return
  warned.add(message)
  console.warn(`${message} ${WARNED_ONCE}`)
}

const isDict = (value: unknown): value is Record<string, unknown> => {
  if (!value || typeof value !== "object") return false
  const proto = Object.getPrototypeOf(value)
  return proto === Object.prototype || proto === null
}

const dictOf = (value: unknown, name: string) => {
  if (value == null) return {}
  if (typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>
  }
  if (DEV) {
    throw new Error(
      `[OPUI ${name}] Pass the props as one dict: ${name}({ ... }), with the default slot as the body of {% call ${name}({ ... }) %}.`,
    )
  }
  return {}
}

const text = (
  value: unknown,
  depth: number,
  done: WeakMap<object, unknown>,
): unknown => {
  if (value instanceof SafeString) return String(value)
  if (depth <= 0 || !value || typeof value !== "object") return value
  if (done.has(value)) return done.get(value)
  if (!Array.isArray(value) && !isDict(value)) return value
  const copy: unknown[] | Record<string, unknown> = Array.isArray(value)
    ? []
    : {}
  done.set(value, copy)
  let changed = false
  for (const [key, item] of Object.entries(value)) {
    const next = text(item, depth - 1, done)
    Reflect.set(copy, key, next)
    if (next !== item) changed = true
  }
  if (changed) return copy
  done.set(value, value)
  return value
}

export const normalizeProps = (
  value: unknown,
  meta: PropsMeta,
  name: string,
) => {
  const given = dictOf(value, name)
  let result: Record<string, unknown> | undefined
  for (const [key, item] of Object.entries(given)) {
    if (key === "slots") continue
    const declared = meta.props.includes(key)
    const dropped = item === null && declared && !meta.keepsNone.includes(key)
    const next = dropped
      ? undefined
      : text(item, declared ? (meta.depths[key] ?? 0) : 0, new WeakMap())
    if (next === item) continue
    result ??= { ...given }
    if (dropped) delete result[key]
    else result[key] = next
  }
  return result ?? given
}

export const restProps = (
  value: unknown,
  meta: PropsMeta,
  name: string,
  known: ReadonlySet<string>,
) => {
  const result: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(dictOf(value, name))) {
    if (key === "slots") {
      for (const slot of DEV ? Object.keys(item ?? {}) : []) {
        if (!meta.slots.includes(slot)) {
          warnOnce(
            `[OPUI ${name}] Unknown slot "${slot}": ${name} has no slot by that name, so nothing renders it.`,
          )
        }
      }
      continue
    }
    if (meta.props.includes(key)) continue
    if (DEV && !known.has(key) && !/^(aria|data)-/.test(key)) {
      warnOnce(
        `[OPUI ${name}] Unknown prop "${key}": ${name} has no prop by that name and its element no attribute, so it renders as an attribute.`,
      )
    }
    result[key] = item
  }
  return result
}
