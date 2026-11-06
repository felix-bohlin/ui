import { execFileSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { dirname, join, relative, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"
import ts from "typescript"
import { compileScript, parse, registerTS } from "vue/compiler-sfc"

const here = dirname(fileURLToPath(import.meta.url))
const require = createRequire(import.meta.url)

const FRAMEWORKS = ["react", "svelte", "vue"]

const OUTPUTS = ["components", ...FRAMEWORKS]

const SPECIFIER =
  /(\bfrom\s*|\bimport\s*\(\s*|\bimport\s+)(["'])(\.{1,2}\/[^"']*)\2/g

const isFile = (file) => existsSync(file) && statSync(file).isFile()

const toPosix = (path) => path.split(sep).join("/")

const relativeSpecifier = (fromDir, to) => {
  const path = toPosix(relative(fromDir, to))
  return path.startsWith(".") ? path : `./${path}`
}

export const specifiersOf = (code) =>
  [...code.matchAll(SPECIFIER)].map(([, , , specifier]) => specifier)

const resolveSource = (from, specifier) => {
  const base = resolve(dirname(from), specifier)
  return [base, `${base}.ts`, `${base}.tsx`, `${base}.js`].find(isFile)
}

export const reachable = (entries) => {
  const seen = new Set()
  const queue = [...entries]
  while (queue.length > 0) {
    const file = queue.shift()
    if (seen.has(file)) continue
    seen.add(file)
    if (file.endsWith(".d.ts")) continue
    for (const specifier of specifiersOf(readFileSync(file, "utf8"))) {
      const target = resolveSource(file, specifier)
      if (!target) {
        throw new Error(`${file} imports ${specifier}, which doesn't exist`)
      }
      queue.push(target)
    }
  }
  return [...seen].toSorted()
}

const compiles = (root, file) =>
  !file.endsWith(".d.ts") &&
  OUTPUTS.includes(toPosix(relative(root, file)).split("/")[0])

const outPath = (root, dist, file) =>
  join(dist, relative(root, file)).replace(/\.tsx?$/, ".js")

export const sourceOf = (root, target) => {
  const path = toPosix(relative(join(root, "dist"), join(root, target)))
  if (!OUTPUTS.includes(path.split("/")[0])) return undefined
  const base = join(root, path.replace(/\.(d\.ts|js)$/, ""))
  return [base, `${base}.ts`, `${base}.tsx`, `${base}.js`].find(
    (file) => isFile(file) && !file.endsWith(".d.ts"),
  )
}

const write = (file, code) => {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, code)
}

const transpile = (code, fileName) =>
  ts.transpileModule(code, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      verbatimModuleSyntax: true,
    },
    fileName,
  }).outputText

const compilerOptions = (root, dist) => ({
  declaration: true,
  jsx: ts.JsxEmit.ReactJSX,
  lib: ["lib.dom.d.ts", "lib.dom.iterable.d.ts", "lib.es2023.d.ts"],
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  outDir: dist,
  rootDir: root,
  skipLibCheck: true,
  strict: true,
  target: ts.ScriptTarget.ES2022,
  types: [],
  verbatimModuleSyntax: true,
})

const report = (diagnostics) => {
  if (diagnostics.length === 0) return
  throw new Error(
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (name) => name,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => "\n",
    }),
  )
}

export const isAugmentation = (code) => /^declare (global|module)\b/m.test(code)

const buildReact = (root, dist, files) => {
  const augmentations = new Set(
    files.filter((file) => isAugmentation(readFileSync(file, "utf8"))),
  )
  const program = ts.createProgram(
    [join(root, "react/index.ts")],
    compilerOptions(root, dist),
  )
  report(
    [
      ...ts.getPreEmitDiagnostics(program),
      ...program.emit().diagnostics,
    ].filter(({ file }) => !file || !augmentations.has(resolve(file.fileName))),
  )
}

const keepAugmentations = (root, dist, files) => {
  for (const file of files) {
    const code = readFileSync(file, "utf8")
    if (isAugmentation(code)) {
      const out = outPath(root, dist, file)
      rmSync(out, { force: true })
      write(out.replace(/\.js$/, ".d.ts"), code)
      continue
    }
    const imports = [
      ...code.matchAll(/^import type \{\} from (["'])(\.{1,2}\/[^"']*)\1$/gm),
    ]
      .filter(([, , specifier]) =>
        isAugmentation(readFileSync(resolveSource(file, specifier), "utf8")),
      )
      .map(([line]) => line)
    if (imports.length === 0) continue
    const declaration = outPath(root, dist, file).replace(/\.js$/, ".d.ts")
    const emitted = readFileSync(declaration, "utf8")
    const missing = imports.filter((line) => !emitted.includes(line))
    if (missing.length > 0) {
      writeFileSync(declaration, `${missing.join("\n")}\n${emitted}`)
    }
  }
}

const typeConfig = (root, dist, entry, extra = {}) => ({
  compilerOptions: {
    declaration: true,
    emitDeclarationOnly: true,
    jsx: "preserve",
    lib: ["DOM", "DOM.Iterable", "ES2023"],
    module: "ESNext",
    moduleResolution: "Bundler",
    outDir: dist,
    rootDir: root,
    skipLibCheck: true,
    strict: true,
    target: "ES2022",
    types: [],
    verbatimModuleSyntax: true,
    ...extra,
  },
  files: [join(root, entry)],
})

const KNOWN_VUE_WARNINGS = [
  / cannot be child of <select>, according to HTML specifications\./,
]

const withWarnings = (file, compile) => {
  const warnings = []
  const { warn } = console
  console.warn = (...args) => warnings.push(args.join(" "))
  let result
  try {
    result = compile()
  } finally {
    console.warn = warn
  }
  const unknown = warnings.filter(
    (message) => !KNOWN_VUE_WARNINGS.some((known) => known.test(message)),
  )
  if (unknown.length > 0) {
    throw new Error(`${file}\n${unknown.join("\n")}`)
  }
  return result
}

const buildVue = (root, dist, files) => {
  registerTS(() => ts)
  const fs = {
    fileExists: isFile,
    readFile: (file) => (isFile(file) ? readFileSync(file, "utf8") : undefined),
    realpath: ts.sys.realpath,
  }
  for (const file of files) {
    const source = readFileSync(file, "utf8")
    if (file.endsWith(".vue")) {
      const { descriptor, errors } = parse(source, { filename: file })
      if (errors.length > 0) throw errors[0]
      const { content } = withWarnings(file, () =>
        compileScript(descriptor, {
          fs,
          id: relative(root, file),
          inlineTemplate: true,
          isProd: true,
        }),
      )
      write(`${join(dist, relative(root, file))}.js`, transpile(content, file))
    } else if (compiles(root, file)) {
      write(outPath(root, dist, file), transpile(source, file))
    }
  }
  const config = join(tmpdir(), `opui-vue-${process.pid}.json`)
  writeFileSync(config, JSON.stringify(typeConfig(root, dist, "vue/index.ts")))
  try {
    execFileSync(
      process.execPath,
      [require.resolve("vue-tsc/bin/vue-tsc.js"), "-p", config],
      { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    )
  } catch (error) {
    throw new Error(`vue-tsc failed\n${error.stdout}\n${error.stderr}`)
  } finally {
    rmSync(config, { force: true })
  }
}

const buildSvelte = async (root, dist, files) => {
  for (const file of files) {
    const source = readFileSync(file, "utf8")
    if (file.endsWith(".svelte")) {
      write(join(dist, relative(root, file)), source)
    } else if (compiles(root, file)) {
      write(outPath(root, dist, file), transpile(source, file))
    }
  }
  const config = join(root, `tsconfig.svelte-dts-${process.pid}.json`)
  writeFileSync(
    config,
    JSON.stringify(
      typeConfig(root, dist, "svelte/index.ts", { allowJs: true }),
    ),
  )
  const { emitDts } = await import("svelte2tsx")
  try {
    await emitDts({
      declarationDir: dist,
      libRoot: root,
      svelteShimsPath: require.resolve("svelte2tsx/svelte-shims-v4.d.ts"),
      tsconfig: config,
    })
  } finally {
    rmSync(config, { force: true })
  }
}

const filesIn = (dir) =>
  readdirSync(dir, { recursive: true })
    .map((file) => join(dir, String(file)))
    .filter(isFile)

export const rewriteSpecifiers = (code, file, root, dist) =>
  code.replace(SPECIFIER, (_match, before, quote, specifier) => {
    const fromDir = dirname(file)
    const base = resolve(fromDir, specifier)
    const inDist = [
      [base, specifier],
      [`${base}.js`, `${specifier}.js`],
      [`${base}.d.ts`, `${specifier}.js`],
    ].find(([target]) => isFile(target))
    if (inDist) return `${before}${quote}${inDist[1]}${quote}`
    const source = resolve(join(root, relative(dist, fromDir)), specifier)
    if (!isFile(source)) {
      throw new Error(`${file} imports ${specifier}, which doesn't exist`)
    }
    return `${before}${quote}${relativeSpecifier(fromDir, source)}${quote}`
  })

export const buildFrameworks = async (root = resolve(here, "..")) => {
  const dist = join(root, "dist")
  for (const folder of OUTPUTS) {
    rmSync(join(dist, folder), { force: true, recursive: true })
  }
  const files = Object.fromEntries(
    FRAMEWORKS.map((framework) => [
      framework,
      reachable([join(root, framework, "index.ts")]),
    ]),
  )
  buildReact(root, dist, files.react)
  await buildSvelte(root, dist, files.svelte)
  buildVue(root, dist, files.vue)
  for (const framework of FRAMEWORKS) {
    keepAugmentations(root, dist, files[framework])
  }
  for (const entry of readdirSync(dist, { withFileTypes: true })) {
    if (entry.isDirectory() && !OUTPUTS.includes(entry.name)) {
      rmSync(join(dist, entry.name), { force: true, recursive: true })
    }
  }
  for (const folder of OUTPUTS) {
    for (const file of filesIn(join(dist, folder))) {
      if (!/\.(js|svelte|d\.ts)$/.test(file)) continue
      const code = readFileSync(file, "utf8")
      const rewritten = rewriteSpecifiers(code, file, root, dist)
      if (rewritten !== code) writeFileSync(file, rewritten)
    }
  }
}
