import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import ts from "typescript"

const version = process.argv[2]
if (!version) {
  console.error("Usage: node scripts/released-api.mjs <tag>")
  process.exit(1)
}

const cache = path.resolve("node_modules/.cache/released-api", version)
fs.rmSync(cache, { force: true, recursive: true })
fs.mkdirSync(cache, { recursive: true })
execFileSync("sh", [
  "-c",
  `git archive ${version} packages/opui | tar -x -C "${cache}"`,
])

const exported = new Set(
  ["astro", "vue"].flatMap((framework) => {
    const barrel = path.join(cache, "packages/opui", framework, "index.ts")
    if (!fs.existsSync(barrel)) return []
    return [
      ...fs
        .readFileSync(barrel, "utf8")
        .matchAll(/^export \{ default as (\w+) \}/gm),
    ].map(([, name]) => name)
  }),
)

const componentsRoot = path.join(cache, "packages/opui/components")
const typeFiles = ["types.astro.ts", "types.d.vue.ts"]
const files = fs
  .readdirSync(componentsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((entry) =>
    typeFiles
      .map((file) => path.join(componentsRoot, entry.name, file))
      .filter((file) => fs.existsSync(file)),
  )

const program = ts.createProgram(files, {
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  noEmit: true,
  skipLibCheck: true,
  strict: true,
  target: ts.ScriptTarget.ESNext,
  types: [],
})
const checker = program.getTypeChecker()
const root = componentsRoot.replaceAll("\\", "/")

const props = {}
for (const file of files) {
  const source = path.basename(path.dirname(file))
  const statements = program.getSourceFile(file)?.statements ?? []
  for (const alias of statements.filter(ts.isTypeAliasDeclaration)) {
    const match = alias.name.text.match(/^(\w*)Props$/)
    if (!match) continue
    const component = match[1] ? `${match[1]}` : source
    if (!exported.has(component)) continue
    const type = checker.getTypeAtLocation(alias)
    const names = [type, ...(type.isUnion() ? type.types : [])]
      .flatMap((member) => checker.getPropertiesOfType(member))
      .filter((symbol) =>
        symbol.declarations?.some((declaration) =>
          declaration
            .getSourceFile()
            .fileName.replaceAll("\\", "/")
            .startsWith(root),
        ),
      )
      .map((symbol) => symbol.name)
      .filter((name) => name !== "class")
    props[source] ??= {}
    props[source][component] = [
      ...new Set([...(props[source][component] ?? []), ...names]),
    ].toSorted()
  }
}

const classes = new Set()
const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(file)
    else if (file.endsWith(".css")) {
      for (const [, name] of fs
        .readFileSync(file, "utf8")
        .matchAll(/\.(ui-[a-z0-9-]+)/g)) {
        classes.add(`.${name}`)
      }
    }
  }
}
walk(path.join(cache, "packages/opui/css"))

const sorted = (object) =>
  Object.fromEntries(
    Object.entries(object)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value : sorted(value),
      ]),
  )

fs.writeFileSync(
  "tests/unit/released-api.json",
  `${JSON.stringify(
    { classes: [...classes].toSorted(), props: sorted(props), version },
    null,
    2,
  )}\n`,
)
fs.rmSync(cache, { force: true, recursive: true })
console.log(`Wrote tests/unit/released-api.json for ${version}`)
