import { existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { ICON_LIBRARIES, ICON_ROLES } from "../src/utils/icon-libraries.ts"
import { formatCode } from "./format.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
export const ICON_SETS = `${root}src/utils/icon-sets.json`

const ROOT_ATTRIBUTES = new Set([
  "clip-rule",
  "fill",
  "fill-rule",
  "stroke",
  "stroke-linecap",
  "stroke-linejoin",
  "stroke-width",
  "viewBox",
])

const attributesOf = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)\s*=\s*"([^"]*)"/g)].map(([, name, value]) => [
      name,
      value,
    ]),
  )

const paintsNothing = (element) => {
  const attributes = attributesOf(element)
  return attributes.fill === "none" && attributes.stroke === "none"
}

export const cleanSvg = (svg, source = "the SVG") => {
  const text = svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .trim()
  const match = /^<svg\b([^>]*)>([\s\S]*)<\/svg>$/.exec(text)
  if (!match) {
    throw new Error(`${source} is not a single <svg> element`)
  }
  const attributes = attributesOf(match[1])
  if (!attributes.viewBox) {
    throw new Error(`${source} has no viewBox`)
  }
  const kept = Object.keys(attributes)
    .filter((name) => ROOT_ATTRIBUTES.has(name))
    .toSorted((a, b) =>
      a === "viewBox" ? -1 : b === "viewBox" ? 1 : a.localeCompare(b),
    )
    .map((name) => ` ${name}="${attributes[name]}"`)
    .join("")
  const body = match[2]
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s*\/>/g, "/>")
    .replace(/<(\w+)\b[^>]*\/>/g, (element) =>
      paintsNothing(element) ? "" : element,
    )
    .trim()
  return `<svg xmlns="http://www.w3.org/2000/svg"${kept}>${body}</svg>`
}

export const copyrightOf = (license) =>
  license
    ?.split("\n")
    .map((line) => line.trim())
    .find((line) => /^copyright\b/i.test(line))

export const buildIconSet = (id, library, readPackageFile) => {
  const mapped = Object.keys(library.icons)
  const unknown = mapped.filter((role) => !ICON_ROLES.includes(role))
  if (unknown.length > 0) {
    throw new Error(
      `${id}: ${unknown.join(", ")} is not an icon role (ICON_ROLES in src/utils/icon-libraries.ts)`,
    )
  }
  const missing = ICON_ROLES.filter((role) => !mapped.includes(role))
  if (missing.length > 0) {
    throw new Error(
      `${id}: no icon for ${missing.join(", ")} in ICON_LIBRARIES (src/utils/icon-libraries.ts)`,
    )
  }
  const icons = Object.fromEntries(
    ICON_ROLES.map((role) => {
      const file = library.icons[role]
      const svg = readPackageFile(file)
      if (svg === undefined) {
        throw new Error(
          `${id}: the ${role} icon, ${file}, is not in ${library.package}`,
        )
      }
      return [role, cleanSvg(svg, `${library.package}/${file}`)]
    }),
  )
  const manifest = JSON.parse(readPackageFile("package.json"))
  const copyright = copyrightOf(readPackageFile("LICENSE")) ?? library.copyright
  if (!copyright) {
    throw new Error(
      `${id}: ${library.package} has no LICENSE with a copyright line; give the library a copyright in ICON_LIBRARIES`,
    )
  }
  return {
    copyright,
    frameworks: library.frameworks,
    icons,
    license: library.license,
    name: library.name,
    package: library.package,
    url: library.url,
    version: manifest.version,
  }
}

const require = createRequire(import.meta.url)

const packageReader = (name) => {
  const directory = dirname(require.resolve(`${name}/package.json`))
  return (file) => {
    const path = join(directory, file)
    return existsSync(path) ? readFileSync(path, "utf8") : undefined
  }
}

export const buildIconSets = (readerFor = packageReader) =>
  Object.fromEntries(
    Object.entries(ICON_LIBRARIES)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([id, library]) => [
        id,
        buildIconSet(id, library, readerFor(library.package)),
      ]),
  )

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const sets = buildIconSets()
  writeFileSync(
    ICON_SETS,
    await formatCode(`${JSON.stringify(sets, null, 2)}\n`, ICON_SETS),
  )
  console.log(
    `Wrote ${Object.keys(sets).length} icon libraries to ${ICON_SETS}`,
  )
}
