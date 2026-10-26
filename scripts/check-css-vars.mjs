import { realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { basename, dirname, extname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import postcss from "postcss"
import { format } from "prettier"
import { declaredProperties } from "../src/utils/package-source.js"

const root = fileURLToPath(new URL("..", import.meta.url))
const opuiDir = join(root, "packages/opui")
const srcDir = join(root, "src")
const openPropsEntry = join(opuiDir, "open-props.css")
const compatDir = join(opuiDir, "css/compat")
const componentsDir = join(opuiDir, "css/components")
const coreDir = join(opuiDir, "core")
const docsDir = join(srcDir, "component-api/custom-properties")
const allowlistFile = join(root, "scripts/css-vars-allowlist.json")

const CONSUMER_SET = ["--ui-anchor-position-area"]
const PALETTE_STEP = /^--ui-(?:color|font-size|gray)-\d+$/
const AT_PROPERTY = /@property\s+[\w-]+\s*\{[^}]*\}/g
const LENGTH = /(?<![\w.-]|\/\s*)(-?\d*\.?\d+)(px|rem)\b/g
const INPUT = /"(--_[\w-]+)":\s*\{[^}]*kind:\s*"input"/g
const PIXEL_STEP = /^\s*\d*\.?\d+px\s*$/

const BASES = {
  "badge.css": ["avatar.css"],
  "button-group.css": ["button.css"],
  "checkbox.css": ["choice.css"],
  "dialog.css": ["card.css"],
  "radio.css": ["choice.css"],
  "select.css": ["text-field.css"],
  "textarea.css": ["text-field.css"],
  "toggle-group.css": ["toggle-button.css"],
}

const READ = /var\(\s*(--[\w-]+)/g
const IMPORT = /@import\s+["']([^"']+)["']/g
const STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g

const listFiles = async (dir, extensions) => {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name)
      if (entry.isDirectory()) {
        return ["dist", "node_modules"].includes(entry.name)
          ? []
          : listFiles(path, extensions)
      }
      return extensions.includes(extname(entry.name)) ? [path] : []
    }),
  )
  return files.flat()
}

const resolveImport = (from, specifier) =>
  specifier.startsWith(".") || from.includes("node_modules")
    ? resolve(dirname(from), specifier)
    : join(root, "node_modules", specifier)

const collectImports = async (file, seen = new Set()) => {
  if (seen.has(file)) return seen
  seen.add(file)
  const source = await readFile(file, "utf8")
  for (const [, specifier] of source.matchAll(IMPORT)) {
    await collectImports(resolveImport(file, specifier), seen)
  }
  return seen
}

const scan = async (dir, extensions, css = (_, source) => source) =>
  Promise.all(
    (await listFiles(dir, extensions)).toSorted().map(async (file) => {
      const source = await readFile(file, "utf8")
      return {
        declared: new Set(declaredProperties(source)),
        file,
        read: new Set(
          [...css(file, source).matchAll(READ)].map(([, name]) => name),
        ),
      }
    }),
  )

const styles = (file, source) =>
  extname(file) === ".css"
    ? source
    : [...source.matchAll(STYLE)].map(([, css]) => css).join("\n")

const declaredIn = (files) => files.flatMap(({ declared }) => [...declared])

const basesOf = (file) => {
  const names = BASES[basename(file)] ?? []
  return dirname(file) === compatDir
    ? [basename(file), ...names].map((name) => join(componentsDir, name))
    : names.map((name) => join(dirname(file), name))
}

const withoutRoundSteps = (value) => {
  let result = value
  let start = result.indexOf("round(")
  while (start !== -1) {
    let depth = 0
    let lastComma = -1
    let end = start + "round".length
    for (; end < result.length; end++) {
      if (result[end] === "(") depth++
      if (result[end] === "," && depth === 1) lastComma = end
      if (result[end] === ")" && --depth === 0) break
    }
    if (lastComma !== -1 && PIXEL_STEP.test(result.slice(lastComma + 1, end))) {
      result = result.slice(0, lastComma) + result.slice(end)
    }
    start = result.indexOf("round(", start + 1)
  }
  return result
}
const ruleOf = (node) =>
  node.parent?.type === "rule"
    ? node.parent
    : node.parent && ruleOf(node.parent)
export const literals = (source, inputs) => {
  const result = []
  postcss.parse(source.replaceAll(AT_PROPERTY, "")).walkDecls((declaration) => {
    const { prop, value } = declaration
    if (inputs.has(prop) && ruleOf(declaration)?.selector.startsWith(":where("))
      return
    result.push(
      ...[...withoutRoundSteps(value).matchAll(LENGTH)]
        .filter(([, number]) => Number(number) !== 0)
        .map(([, number, unit]) => `${prop}: ${number}${unit}`),
    )
  })
  return result
}

export const primitives = (read, openPropsNames) =>
  [...read]
    .filter((name) => openPropsNames.has(name) || PALETTE_STEP.test(name))
    .toSorted()

export const allowlistErrors = (found, allowed) => {
  const errors = []
  for (const file of new Set([
    ...Object.keys(found),
    ...Object.keys(allowed),
  ])) {
    for (const kind of ["literals", "primitives"]) {
      const actual = new Set(found[file]?.[kind] ?? [])
      const listed = new Set(allowed[file]?.[kind] ?? [])
      for (const entry of actual) {
        if (!listed.has(entry)) {
          errors.push(
            kind === "primitives"
              ? `${entry} is read in ${file}: components read --ui-* roles, not palette steps or Open Props`
              : `${entry} in ${file} is a literal length: use a --ui-* role, an em, ex, lh or ch value, or a documented --_* input in its :where() default rule`,
          )
        }
      }
      for (const entry of listed) {
        if (!actual.has(entry)) {
          errors.push(
            `${entry} is listed for ${file} in scripts/css-vars-allowlist.json but no longer there: remove the entry`,
          )
        }
      }
    }
  }
  return errors
}

const main = async () => {
  const update = process.argv.includes("--update")
  const openProps = await Promise.all(
    [...(await collectImports(openPropsEntry))].map(async (file) =>
      declaredProperties(await readFile(file, "utf8")),
    ),
  )
  const packageFiles = await scan(opuiDir, [
    ".astro",
    ".css",
    ".svelte",
    ".tsx",
    ".vue",
  ])
  const srcFiles = await scan(
    srcDir,
    [".astro", ".css", ".html", ".svelte", ".tsx", ".vue"],
    styles,
  )

  const packageDefined = new Set([
    ...openProps.flat(),
    ...declaredIn(packageFiles),
    ...CONSUMER_SET,
  ])
  const srcDefined = new Set([...packageDefined, ...declaredIn(srcFiles)])
  const declaredBy = new Map(
    packageFiles.map(({ declared, file }) => [file, declared]),
  )

  const undefinedReads = new Map()
  const addUndefined = (name, file) => {
    if (!undefinedReads.has(name)) undefinedReads.set(name, new Set())
    undefinedReads.get(name).add(relative(root, file))
  }

  const privateErrors = []

  for (const { declared, file, read } of packageFiles) {
    const bases = basesOf(file).map((base) => relative(dirname(file), base))
    const local = new Set([
      ...declared,
      ...bases.flatMap((base) => [
        ...(declaredBy.get(join(dirname(file), base)) ?? []),
      ]),
    ])
    for (const name of read) {
      if (!name.startsWith("--_")) {
        if (!packageDefined.has(name)) addUndefined(name, file)
      } else if (!local.has(name)) {
        privateErrors.push(
          `${name} is read in ${relative(root, file)} but not defined there${bases.length > 0 ? ` or in ${bases.join(", ")}` : ""}`,
        )
      }
    }
  }

  for (const { file, read } of srcFiles) {
    for (const name of read) {
      if (!srcDefined.has(name)) addUndefined(name, file)
    }
  }

  const openPropsNames = new Set(openProps.flat())
  const documentedInputs = async (file) => {
    const docs = [basename(file), ...(BASES[basename(file)] ?? [])].map(
      (name) => join(docsDir, `${basename(name, ".css")}.ts`),
    )
    const sources = await Promise.all(
      docs.map((doc) => readFile(doc, "utf8").catch(() => "")),
    )
    return new Set(
      sources.flatMap((source) =>
        [...source.matchAll(INPUT)].map(([, name]) => name),
      ),
    )
  }

  const found = Object.fromEntries(
    await Promise.all(
      packageFiles
        .filter(
          ({ file }) =>
            file.startsWith(componentsDir) ||
            dirname(file) === compatDir ||
            file === join(coreDir, "normalize.css"),
        )
        .map(async ({ file, read }) => [
          relative(opuiDir, file),
          {
            literals: [
              ...new Set(
                literals(
                  await readFile(file, "utf8"),
                  await documentedInputs(file),
                ),
              ),
            ].toSorted(),
            primitives: primitives(read, openPropsNames),
          },
        ]),
    ),
  )

  const allowed = JSON.parse(await readFile(allowlistFile, "utf8"))
  const tierErrors = allowlistErrors(found, allowed)

  if (update) {
    const next = Object.fromEntries(
      Object.entries(found)
        .map(([file, lists]) => [
          file,
          {
            literals: lists.literals.filter((entry) =>
              allowed[file]?.literals?.includes(entry),
            ),
            primitives: lists.primitives.filter((entry) =>
              allowed[file]?.primitives?.includes(entry),
            ),
          },
        ])
        .filter(
          ([, lists]) => lists.literals.length + lists.primitives.length > 0,
        )
        .toSorted(([a], [b]) => a.localeCompare(b)),
    )
    await writeFile(
      allowlistFile,
      await format(JSON.stringify(next), { filepath: allowlistFile }),
    )
  }

  const errors = [
    ...[...undefinedReads]
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(
        ([name, files]) =>
          `${name} is read but never defined (${[...files].toSorted().join(", ")})`,
      ),
    ...privateErrors.toSorted(),
    ...(update
      ? tierErrors.filter((error) => !error.includes("no longer there"))
      : tierErrors
    ).toSorted(),
  ]

  if (errors.length > 0) {
    console.error(errors.join("\n"))
    process.exit(1)
  }

  const checked = new Set(
    [...packageFiles, ...srcFiles].flatMap(({ read }) => [...read]),
  )
  console.log(`Checked ${checked.size} custom properties`)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
