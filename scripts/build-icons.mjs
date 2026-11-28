import {
  existsSync,
  mkdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import {
  ICON_LIBRARIES,
  ICON_ROLES,
  iconCreditOf,
  iconUrl,
  SAMPLE_ICONS,
} from "../src/utils/icon-libraries.ts"
import { formatCode } from "./format.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))
export const ICON_SETS = `${root}src/utils/icon-sets.json`
export const ICON_SAMPLES = `${root}src/utils/icon-samples.json`
export const ICON_STYLESHEETS = `${root}packages/opui/icons`

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
    ...(library.packageNote && { packageNote: library.packageNote }),
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

export const splitSamples = (built) => ({
  samples: Object.fromEntries(
    Object.entries(built).map(([id, set]) => [id, set.samples]),
  ),
  sets: Object.fromEntries(
    Object.entries(built).map(([id, set]) => [
      id,
      Object.fromEntries(
        Object.entries(set).filter(([key]) => key !== "samples"),
      ),
    ]),
  ),
})

export const ICON_TOKEN_FILES = {
  "packages/opui/css/theme.css": "fluent",
  "packages/opui/themes/brutalist.css": "lucide",
  "packages/opui/themes/m3.css": "material-symbols",
  "packages/opui/themes/shadcn.css": "lucide",
}

export const syncIconTokens = (css, set, file) =>
  ICON_ROLES.reduce((text, role) => {
    const declaration = new RegExp(`(--ui-icon-${role}: )url\\("[^"]*"\\);`)
    if (!declaration.test(text)) {
      throw new Error(
        `${file} has no --ui-icon-${role} declaration; scripts/build-icons.mjs writes the ${set.name} icon there`,
      )
    }
    return text.replace(
      declaration,
      (_, start) => `${start}${iconUrl(set.icons[role])};`,
    )
  }, css)

const LAYERS = readFileSync(
  `${root}packages/opui/css/layers.css`,
  "utf8",
).trim()

export const iconStylesheet = (set) =>
  [
    "/*",
    ...iconCreditOf(set)
      .split("\n")
      .map((line) => ` * ${line}`),
    " */",
    LAYERS,
    "",
    "@layer theme.custom {",
    "  :where(html, .ui-scope, .ui-contrast-more) {",
    ...ICON_ROLES.map(
      (role) => `    --ui-icon-${role}: ${iconUrl(set.icons[role])};`,
    ),
    "  }",
    "}",
    "",
  ].join("\n")

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const { samples, sets } = splitSamples(buildIconSets())
  for (const [file, data] of [
    [ICON_SAMPLES, samples],
    [ICON_SETS, sets],
  ]) {
    writeFileSync(
      file,
      await formatCode(`${JSON.stringify(data, null, 2)}\n`, file),
    )
  }
  mkdirSync(ICON_STYLESHEETS, { recursive: true })
  for (const [id, set] of Object.entries(sets)) {
    writeFileSync(`${ICON_STYLESHEETS}/${id}.css`, iconStylesheet(set))
  }
  for (const [file, id] of Object.entries(ICON_TOKEN_FILES)) {
    const css = readFileSync(`${root}${file}`, "utf8")
    const synced = syncIconTokens(css, sets[id], file)
    if (synced !== css) writeFileSync(`${root}${file}`, synced)
  }
  console.log(
    `Wrote ${Object.keys(sets).length} icon libraries to ${ICON_SETS} and ${ICON_STYLESHEETS}`,
  )
}
