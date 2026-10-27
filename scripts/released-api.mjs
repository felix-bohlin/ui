import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { format } from "prettier"
import ts from "typescript"
import { PACKAGE_FRAMEWORK_IDS } from "../src/utils/framework.js"
import {
  BARREL_TYPES,
  barrelExports,
  classNamesIn,
} from "../src/utils/package-source.js"

const OLDER_TYPE_FILES = { vue: ["types.d.vue.ts"] }

export const releasedApi = (tree, inputsRoot) => {
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

  const barrel = (framework) =>
    path.resolve(tree, "packages/opui", framework, "index.ts")
  const shipped = PACKAGE_FRAMEWORK_IDS.filter((framework) =>
    fs.existsSync(barrel(framework)),
  )
  const exported = new Set(
    shipped.flatMap((framework) =>
      barrelExports(fs.readFileSync(barrel(framework), "utf8")).map(
        ({ name }) => name,
      ),
    ),
  )

  const componentsRoot = path.resolve(tree, "packages/opui/components")
  const typeFiles = shipped.flatMap((framework) => [
    `${BARREL_TYPES[framework]}.ts`,
    ...(OLDER_TYPE_FILES[framework] ?? []),
  ])
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

  const classes = classNamesIn(
    ["css", "core"]
      .map((dir) => path.resolve(tree, "packages/opui", dir))
      .filter((dir) => fs.existsSync(dir)),
  )

  return { classes, inputs, props }
}

const sorted = (object) =>
  Object.fromEntries(
    Object.entries(object)
      .toSorted(([a], [b]) => a.localeCompare(b))
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value : sorted(value),
      ]),
  )

const main = async () => {
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
  const { classes, inputs, props } = releasedApi(cache, inputsRoot)

  const output = "tests/unit/released-api.json"
  fs.writeFileSync(
    output,
    await format(
      JSON.stringify(
        {
          classes: [...classes].toSorted(),
          inputs,
          inputsVersion,
          props: sorted(props),
          version,
        },
        null,
        2,
      ),
      { filepath: output },
    ),
  )
  fs.rmSync(cache, { force: true, recursive: true })
  console.log(
    `Wrote tests/unit/released-api.json for ${version}${inputsVersion === version ? "" : `, with the documented inputs of the working tree (${inputsVersion}), enforced from that release on`}`,
  )
}

if (
  process.argv[1] &&
  fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
