import { existsSync, readFileSync, realpathSync } from "node:fs"
import { readdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"
import {
  exampleExtension,
  HYDRATED_FRAMEWORK_IDS,
  TYPES_FILES,
} from "../src/utils/framework.js"
import { DIAGNOSTICS, explain } from "./component-diagnostics.mjs"
import { toReact } from "./component-react.mjs"
import { apiOf, loadApis, readComponent } from "./component-reader.mjs"
import {
  componentFiles,
  NUNJUCKS_DIR,
  nunjucksOutputs,
} from "./component-nunjucks.mjs"
import { root, unsupported } from "./component-shared.mjs"
import { toSolid } from "./component-solid.mjs"
import { toSvelte } from "./component-svelte.mjs"
import {
  folderTypes,
  readTypes,
  toTypes,
  typeFactsOf,
} from "./component-types.mjs"
import { toVue } from "./component-vue.mjs"
import { formatStably } from "./format.mjs"

export { loadApis, readComponent, readTypes, toTypes }

const componentsDir = join(root, "packages/opui/components")

export const PORTS = Object.fromEntries(
  HYDRATED_FRAMEWORK_IDS.map((framework) => [
    framework,
    `.${exampleExtension(framework)}`,
  ]),
)

export const TYPE_FILES = Object.fromEntries(
  HYDRATED_FRAMEWORK_IDS.map((framework) => [
    framework,
    TYPES_FILES[framework],
  ]),
)

export const EMITTERS = {
  react: toReact,
  solid: toSolid,
  svelte: toSvelte,
  vue: toVue,
}

export const compileComponent = async (source, file, options = {}) => {
  const name = file
    .split("/")
    .at(-1)
    .replace(/\.astro$/, "")
  const folder = file.split("/").at(-2)
  const { api, types = folderTypes(folder) } = options
  const component = await readComponent(
    source,
    file,
    "api" in options ? api : await apiOf(folder, name),
  )
  const named = {
    ...component,
    folder,
    name,
    ...typeFactsOf(types, name, component),
  }
  const outputs = new Map()
  const refused = new Map()
  const ports = Object.entries(PORTS)
  for (const [framework, extension] of ports) {
    const target = `packages/opui/components/${folder}/${name}${extension}`
    try {
      const code = EMITTERS[framework](named)
      outputs.set(target, await formatStably(code, target))
    } catch (error) {
      refused.set(target, error)
    }
  }
  if (refused.size === ports.length) throw [...refused.values()][0]
  return { component: named, outputs, refused }
}

const handWrittenFile = join(root, "scripts/hand-written-components.json")

export const readHandWritten = () =>
  existsSync(handWrittenFile)
    ? JSON.parse(readFileSync(handWrittenFile, "utf8"))
    : {}

export const handWrittenProblems = (handWritten, exists) => {
  const files = Object.keys(handWritten)
  const list = "scripts/hand-written-components.json"
  return [
    ...(files.every((file, index) => !index || files[index - 1] < file)
      ? []
      : [`${list} is not sorted`]),
    ...files.flatMap((file) =>
      exists(`packages/opui/components/${file}`)
        ? []
        : [`${list} names ${file}, which doesn't exist`],
    ),
  ]
}

export const NUNJUCKS_EXTENSION = `.${exampleExtension("nunjucks")}`

const COMPILED_FILE = new RegExp(
  `^packages/opui/components/([^/]+)/(?:([^/]+)(${[
    ...Object.values(PORTS),
    NUNJUCKS_EXTENSION,
  ]
    .map((extension) => extension.replace(/\./g, "\\."))
    .join("|")})|(${Object.values(TYPE_FILES).join("|")}))$`,
)

const NUNJUCKS_FILES = new Set([
  `${NUNJUCKS_DIR}/index.njk`,
  `${NUNJUCKS_DIR}/macros.ts`,
])

export const isNunjucksLibrary = (file) => NUNJUCKS_FILES.has(file)

export const astroSourceOf = (
  file,
  exists,
  handWritten = readHandWritten(),
) => {
  const match = COMPILED_FILE.exec(file)
  if (!match) return undefined
  const [, folder, name, , typeFile] = match
  if (file.replace("packages/opui/components/", "") in handWritten) {
    return undefined
  }
  const source = typeFile
    ? `packages/opui/components/${folder}/types.astro.ts`
    : `packages/opui/components/${folder}/${name}.astro`
  return exists(source) ? source : undefined
}

export const generate = async ({
  only = [],
  handWritten = readHandWritten(),
} = {}) => {
  const folders = (await readdir(componentsDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .toSorted()
  const unknown = only.filter((name) => !folders.includes(name))
  if (unknown.length > 0) {
    throw new Error(`--only names no component folder: ${unknown.join(", ")}`)
  }
  const outputs = new Map()
  const problems = handWrittenProblems(handWritten, (file) =>
    existsSync(join(root, file)),
  )
  const skipped = []
  for (const folder of folders) {
    if (only.length > 0 && !only.includes(folder)) continue
    const files = (await readdir(join(componentsDir, folder))).toSorted()
    const types = folderTypes(folder)
    const components = []
    let allCompiled = true
    for (const file of files.filter((entry) => entry.endsWith(".astro"))) {
      const key = `${folder}/${file}`
      const relative = `packages/opui/components/${key}`
      try {
        const {
          component,
          outputs: compiled,
          refused,
        } = await compileComponent(
          await readFile(join(componentsDir, key), "utf8"),
          relative,
          { types },
        )
        for (const [target, error] of refused) {
          allCompiled = false
          const ledgerKey = target.replace("packages/opui/components/", "")
          const message = `${relative}: ${error.message}`
          if (ledgerKey in handWritten) skipped.push(message)
          else problems.push(message)
        }
        components.push(component)
        for (const [target, code] of compiled) {
          const ledgerKey = target.replace("packages/opui/components/", "")
          if (ledgerKey in handWritten) continue
          outputs.set(target, code)
        }
      } catch (error) {
        allCompiled = false
        const ledgerKeys = Object.values(PORTS).map(
          (extension) => `${folder}/${file.replace(/\.astro$/, extension)}`,
        )
        const message = error.message.startsWith(relative)
          ? error.message
          : `${relative}: ${error.message}`
        if (ledgerKeys.every((ledgerKey) => ledgerKey in handWritten)) {
          skipped.push(message)
        } else {
          problems.push(message)
        }
      }
    }
    try {
      if (!allCompiled) {
        throw unsupported(
          "BC606",
          types.file,
          "a folder with a hand-written component",
        )
      }
      const typeFiles = toTypes(types, components)
      for (const [framework, typeFile] of Object.entries(TYPE_FILES)) {
        const target = `packages/opui/components/${folder}/${typeFile}`
        if (`${folder}/${typeFile}` in handWritten) continue
        outputs.set(target, await formatStably(typeFiles[framework], target))
      }
    } catch (error) {
      const message = error.message.startsWith(types.file)
        ? error.message
        : `${types.file}: ${error.message}`
      if (
        Object.values(TYPE_FILES).every(
          (typeFile) => `${folder}/${typeFile}` in handWritten,
        )
      ) {
        skipped.push(message)
      } else {
        problems.push(message)
      }
    }
  }
  try {
    for (const [target, code] of await nunjucksOutputs(
      await componentFiles(),
    )) {
      const [, folder] = COMPILED_FILE.exec(target) ?? []
      if (folder && only.length > 0 && !only.includes(folder)) continue
      outputs.set(
        target,
        target.endsWith(".ts") ? await formatStably(code, target) : code,
      )
    }
  } catch (error) {
    problems.push(error.message)
  }
  return { outputs, problems, skipped }
}

const explainHint = (problems) =>
  problems.some((problem) => / \[BC\d{3}\]$/.test(problem))
    ? [
        "\nRun pnpm build-components --explain <code> for what a [BC...] code refuses and how to fix it.",
      ]
    : []

const main = async () => {
  const { values } = parseArgs({
    options: {
      check: { type: "boolean" },
      explain: { type: "string" },
      only: { type: "string" },
      report: { type: "boolean" },
    },
    strict: true,
  })
  if (values.explain) {
    console.log(explain(values.explain))
    if (!(values.explain in DIAGNOSTICS)) process.exitCode = 1
    return
  }
  const { outputs, problems, skipped } = await generate({
    only: values.only?.split(",") ?? [],
  })
  const read = (file) => {
    try {
      return readFileSync(join(root, file), "utf8")
    } catch {
      return undefined
    }
  }
  if (values.report) {
    console.log(skipped.join("\n"))
    console.log(
      `\n${outputs.size} files compile, ${skipped.length} stay hand-written.`,
    )
  }
  const stale = [...outputs]
    .filter(([file, code]) => read(file) !== code)
    .map(([file]) =>
      isNunjucksLibrary(file)
        ? `${file} is stale: run pnpm build-components`
        : `${file} is stale: edit ${astroSourceOf(file, () => true, {})} and run pnpm build-components`,
    )
  if (values.check) {
    const errors = [...problems, ...stale]
    if (errors.length > 0) {
      console.error([...errors, ...explainHint(problems)].join("\n"))
      process.exit(1)
    }
    console.log(`Checked ${outputs.size} component files.`)
    return
  }
  for (const [file, code] of outputs) {
    if (read(file) === code) continue
    await writeFile(join(root, file), code)
    console.log(`Wrote ${file}`)
  }
  if (problems.length > 0) {
    console.error([...problems, ...explainHint(problems)].join("\n"))
    process.exit(1)
  }
  console.log(`Generated ${outputs.size} component files.`)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main().catch((error) => {
    console.error(error.message)
    process.exit(1)
  })
}
