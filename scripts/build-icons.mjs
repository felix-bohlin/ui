import { existsSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  ICON_LIBRARIES,
  ICON_ROLES,
  SAMPLE_ICONS,
} from "../src/utils/icon-libraries.ts"
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

const svgParts = (svg, source) => {
  const text = svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\?xml[\s\S]*?\?>/g, "")
    .trim()
  const match = /^<svg\b([^>]*)>([\s\S]*)<\/svg>$/.exec(text)
  if (!match) {
    throw new Error(`${source} is not a single <svg> element`)
  }
  if (!attributesOf(match[1]).viewBox) {
    throw new Error(`${source} has no viewBox`)
  }
  return { body: match[2], tag: match[1] }
}

const compact = (markup) =>
  markup
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/\s*\/>/g, "/>")
    .trim()

export const rawSvg = (svg, source = "the SVG") => {
  const { body, tag } = svgParts(svg, source)
  return `<svg ${compact(tag)}>${compact(body)}</svg>`
}

export const cleanSvg = (svg, source = "the SVG", overrides = {}) => {
  const { body, tag } = svgParts(svg, source)
  const attributes = { ...attributesOf(tag), ...overrides }
  const kept = Object.keys(attributes)
    .filter((name) => ROOT_ATTRIBUTES.has(name))
    .toSorted((a, b) =>
      a === "viewBox" ? -1 : b === "viewBox" ? 1 : a.localeCompare(b),
    )
    .map((name) => ` ${name}="${attributes[name]}"`)
    .join("")
  const shapes = compact(body).replace(/<(\w+)\b[^>]*\/>/g, (element) =>
    paintsNothing(element) ? "" : element,
  )
  return `<svg xmlns="http://www.w3.org/2000/svg"${kept}>${shapes}</svg>`
}

export const copyrightOf = (license) =>
  license
    ?.split("\n")
    .map((line) => line.trim())
    .find((line) => /^copyright\s+(\(c\)|©|\d)/i.test(line))

const checkNames = (id, mapped, names, list, what) => {
  const unknown = Object.keys(mapped).filter((name) => !names.includes(name))
  if (unknown.length > 0) {
    throw new Error(
      `${id}: ${unknown.join(", ")} is not ${what} (${list} in src/utils/icon-libraries.ts)`,
    )
  }
  const missing = names.filter((name) => !Object.hasOwn(mapped, name))
  if (missing.length > 0) {
    throw new Error(
      `${id}: no icon for ${missing.join(", ")} in ICON_LIBRARIES (src/utils/icon-libraries.ts)`,
    )
  }
}

const readIcon = (id, library, readPackageFile, name, file) => {
  const svg = readPackageFile(file)
  if (svg === undefined) {
    throw new Error(
      `${id}: the ${name} icon, ${file}, is not in ${library.package}`,
    )
  }
  return svg
}

export const buildIconSet = (id, library, readPackageFile) => {
  checkNames(id, library.icons, ICON_ROLES, "ICON_ROLES", "an icon role")
  checkNames(id, library.samples, SAMPLE_ICONS, "SAMPLE_ICONS", "a sample icon")
  const icons = Object.fromEntries(
    ICON_ROLES.map((role) => {
      const source = library.icons[role]
      const { attributes, file } =
        typeof source === "string" ? { attributes: {}, file: source } : source
      const svg = readIcon(id, library, readPackageFile, role, file)
      return [role, cleanSvg(svg, `${library.package}/${file}`, attributes)]
    }),
  )
  const samples = Object.fromEntries(
    SAMPLE_ICONS.map((name) => {
      const file = library.samples[name]
      const svg = readIcon(id, library, readPackageFile, name, file)
      return [name, rawSvg(svg, `${library.package}/${file}`)]
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
    samples,
    url: library.url,
    version: manifest.version,
  }
}

const packageReader = (name) => {
  const directory = join(root, "node_modules", name)
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
