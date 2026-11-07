// @ts-check
import fs from "node:fs"
import path from "node:path"
import postcss from "postcss"

export const BARREL_TYPES = {
  astro: "types.astro",
  react: "types.react",
  svelte: "types.svelte",
  vue: "types.vue-props",
}

const BARREL_EXPORT = /^export \{ default as (\w+) \} from "([^"]+)"/gm
const COMPONENT_FOLDER = /^\.\.\/components\/([^/]+)\//
const CLASS_NAME = /\.(ui-[a-z0-9-]+)/g
const COMMENT = /\/\*[\s\S]*?\*\//g

/**
 * @param {string} source
 * @returns {{ folder: string, from: string, name: string }[]}
 */
export const barrelExports = (source) =>
  [...source.matchAll(BARREL_EXPORT)].map(([, name, from]) => ({
    folder: from.match(COMPONENT_FOLDER)?.[1] ?? "",
    from,
    name,
  }))

/** @param {string} css */
export const classNames = (css) =>
  [...css.matchAll(CLASS_NAME)].map(([, name]) => `.${name}`)

/** @param {string[]} dirs */
export const classNamesIn = (dirs) => {
  const names = new Set()
  /** @param {string} dir */
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const file = path.join(dir, entry.name)
      if (entry.isDirectory()) walk(file)
      else if (file.endsWith(".css")) {
        for (const name of classNames(fs.readFileSync(file, "utf8"))) {
          names.add(name)
        }
      }
    }
  }
  dirs.forEach(walk)
  return names
}

/** @param {string} source */
export const stripComments = (source) => source.replaceAll(COMMENT, "")

/** @param {string} css */
export const declaredProperties = (css) => {
  /** @type {string[]} */
  const names = []
  postcss.parse(css).walkDecls(({ prop }) => {
    if (prop.startsWith("--")) names.push(prop)
  })
  return names
}
