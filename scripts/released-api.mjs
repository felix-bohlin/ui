import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import ts from "typescript"
import { barrelExports, classNamesIn } from "../src/utils/package-source.js"

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
  `git archive ${version} packages/opui $(git ls-tree -d --name-only ${version} src/component-api/custom-properties) | tar -x -C "${cache}"`,
])

const inputsRoot = fs.existsSync(
  path.join(cache, "src/component-api/custom-properties"),
)
  ? path.join(cache, "src/component-api/custom-properties")
  : "src/component-api/custom-properties"
const inputsVersion = inputsRoot.startsWith(cache)
  ? version
  : JSON.parse(fs.readFileSync("packages/opui/package.json", "utf8")).version
const inputs = Object.fromEntries(
  fs
    .readdirSync(inputsRoot)
    .filter((file) => file.endsWith(".ts"))
    .toSorted()
    .map((file) => [
      file.replace(/\.ts$/, ""),
      [
        ...fs
          .readFileSync(path.join(inputsRoot, file), "utf8")
          .matchAll(/"(--_[\w-]+)":\s*\{[\s\S]*?kind:\s*"input"/g),
      ]
        .map(([, name]) => name)
        .toSorted(),
    ])
    .filter(([, names]) => names.length > 0),
)

const exported = new Set(
  ["astro", "vue"].flatMap((framework) => {
    const barrel = path.join(cache, "packages/opui", framework, "index.ts")
    if (!fs.existsSync(barrel)) return []
    return barrelExports(fs.readFileSync(barrel, "utf8")).map(
      ({ name }) => name,
    )
  }),
)

const componentsRoot = path.join(cache, "packages/opui/components")
const typeFiles = ["types.astro.ts", "types.d.vue.ts", "types.vue-props.ts"]
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

const classes = classNamesIn([path.join(cache, "packages/opui/css")])

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
    {
      classes: [...classes].toSorted(),
      inputs,
      inputsVersion,
      props: sorted(props),
      version,
    },
    null,
    2,
  )}\n`,
)
fs.rmSync(cache, { force: true, recursive: true })
console.log(
  `Wrote tests/unit/released-api.json for ${version}${inputsVersion === version ? "" : `, with the documented inputs of the working tree (${inputsVersion}), enforced from that release on`}`,
)
