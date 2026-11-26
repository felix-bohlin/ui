import { execFileSync, spawnSync } from "node:child_process"
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  statSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import path from "node:path"
import ts from "typescript"
import { afterAll, beforeAll, describe, expect, test } from "vitest"
import * as dev from "../../packages/opui/components/dev"
import { HYDRATED_FRAMEWORK_IDS } from "../../src/utils/framework.js"
import { lightDarkSettings } from "./readme.ts"

const root = path.resolve(import.meta.dirname, "../..")
const packageDir = path.join(root, "packages/opui")
const fixturesDir = path.join(root, "tests/package/fixtures")

type Command = { args: string[]; bin?: string; package: string }

const FIXTURES: {
  build: Command
  check: Command
  framework: string
  server?: string
}[] = [
  {
    build: { args: ["build"], package: "astro" },
    check: { args: ["check"], package: "astro" },
    framework: "astro",
  },
  {
    build: { args: [], bin: "eleventy", package: "@11ty/eleventy" },
    check: { args: ["--noEmit", "-p", "."], bin: "tsc", package: "typescript" },
    framework: "nunjucks",
  },
  {
    build: { args: ["build"], package: "vite" },
    check: { args: ["--noEmit", "-p", "."], bin: "tsc", package: "typescript" },
    framework: "react",
  },
  {
    build: { args: ["build"], package: "vite" },
    check: { args: ["--noEmit", "-p", "."], bin: "tsc", package: "typescript" },
    framework: "solid",
    server: "src/entry-server.tsx",
  },
  {
    build: { args: ["build"], package: "vite" },
    check: {
      args: ["--tsconfig", "./tsconfig.json", "--fail-on-warnings"],
      package: "svelte-check",
    },
    framework: "svelte",
  },
  {
    build: { args: ["build"], package: "vite" },
    check: { args: ["--noEmit", "-p", "."], package: "vue-tsc" },
    framework: "vue",
  },
]

const run = (command: string, args: string[], cwd: string) => {
  try {
    return execFileSync(command, args, {
      cwd,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    })
  } catch (error) {
    const { stderr, stdout } = error as { stderr?: string; stdout?: string }
    throw new Error(
      `${command} ${args.join(" ")} failed in ${cwd}\n${stdout ?? ""}\n${stderr ?? ""}`,
    )
  }
}

const bin = (dir: string, { bin: name, package: pkg }: Command) => {
  const manifest = JSON.parse(
    readFileSync(path.join(dir, "node_modules", pkg, "package.json"), "utf8"),
  )
  const file =
    typeof manifest.bin === "string" ? manifest.bin : manifest.bin[name ?? pkg]
  return path.join(dir, "node_modules", pkg, file)
}

const linkModules = (from: string, to: string) => {
  mkdirSync(to, { recursive: true })
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    if (entry.name === "opui-css") continue
    const source = path.join(from, entry.name)
    const target = path.join(to, entry.name)
    if (entry.isSymbolicLink()) symlinkSync(realpathSync(source), target)
    else if (entry.isDirectory() && entry.name.startsWith("@")) {
      linkModules(source, target)
    } else cpSync(source, target, { recursive: true })
  }
}

const lightDarkProblems = (css: string) =>
  css.includes("var(--lightningcss-light")
    ? [
        ...(css.includes(
          ":where(html){--lightningcss-light:initial;--lightningcss-dark: ;",
        )
          ? []
          : [
              "the build lowers light-dark() but html doesn't define --lightningcss-light and --lightningcss-dark, so every theme color is invalid: keep a literal color-scheme before color-scheme: var(--ui-color-scheme) on :where(html)",
            ]),
        ...(css.includes(
          "@media (prefers-color-scheme:dark){:where(html){--lightningcss-light: ;--lightningcss-dark:initial;",
        )
          ? []
          : [
              "the build lowers light-dark() but the prefers-color-scheme: dark block doesn't switch --lightningcss-light and --lightningcss-dark on html, so dark mode keeps the light colors: keep color-scheme: dark before color-scheme: var(--ui-color-scheme) there",
            ]),
      ]
    : []

const DEV_CHECK = String.raw`
import { createServer } from "vite"

const server = await createServer({ logLevel: "silent", server: { port: 0 } })
await server.listen()
const base = server.resolvedUrls.local[0]
const get = async (path) => {
  const response = await fetch(new URL(path, base))
  if (!response.ok) {
    throw new Error([path, response.status, await response.text()].join(" "))
  }
  return response.text()
}
const deps = new Set()
for (const entry of ["src/main.ts", "src/App.svelte"]) {
  for (const [, dep] of (await get(entry)).matchAll(
    /from "(\/node_modules\/\.vite\/deps\/[^"]+)"/g,
  )) {
    deps.add(dep)
  }
}
for (const dep of deps) await get(dep)
await server.close()
console.log([deps.size, "pre-bundled dependencies served"].join(" "))
`

const SERVER_RENDER = {
  nunjucks: String.raw`
import { readFileSync } from "node:fs"
import nunjucks from "nunjucks"
import { configure } from "opui-css/nunjucks"

const env = configure(new nunjucks.Environment(null, { autoescape: true }))
const render = (source) => env.renderString(source, {})

console.log(
  render(
    '{% from "opui/index.njk" import Button %}{% call Button({ color: "primary", type: "submit", variant: "filled" }) %}Save{% endcall %}',
  ).replace(/>\s+/g, ">").replace(/\s+</g, "<"),
)
console.log(
  render('{% import "opui/index.njk" as ui %}{% for name, macro in ui %}.{% endfor %}').length,
  "components",
)
console.log(
  "deep imports share the entry point's modules:",
  env.getTemplate("opui/DialogTitle.njk").tmplStr ===
    readFileSync("node_modules/opui-css/components/Dialog/DialogTitle.njk", "utf8"),
)
`,
  react: String.raw`
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import * as opui from "opui-css/react"
import DeepDialogTitle from "opui-css/components/Dialog/DialogTitle.react"

console.log(
  renderToString(
    createElement(
      opui.Button,
      { color: "primary", type: "submit", variant: "filled" },
      "Save",
    ),
  ),
)
console.log(Object.keys(opui).length, "components")
console.log("deep imports share the entry point's modules:", DeepDialogTitle === opui.DialogTitle)
`,
  vue: String.raw`
import { createSSRApp, h } from "vue"
import { renderToString } from "vue/server-renderer"
import * as opui from "opui-css/vue"
import DeepDialogTitle from "opui-css/components/Dialog/DialogTitle.vue"

console.log(
  await renderToString(
    createSSRApp({
      render: () =>
        h(
          opui.Button,
          { color: "primary", type: "submit", variant: "filled" },
          () => "Save",
        ),
    }),
  ),
)
console.log(Object.keys(opui).length, "components")
console.log("deep imports share the entry point's modules:", DeepDialogTitle === opui.DialogTitle)
`,
}

const VITE_RESOLVE = String.raw`
import path from "node:path"
import { createServer } from "vite"

const ids = JSON.parse(process.argv[2])
const server = await createServer({
  appType: "custom",
  logLevel: "silent",
  optimizeDeps: { noDiscovery: true },
  server: { middlewareMode: true },
})
const importer = path.resolve("src/main.ts")
for (const environment of ["client", "ssr"]) {
  for (const id of ids) {
    const resolved = await server.environments[environment].pluginContainer.resolveId(id, importer)
    console.log([environment, id, resolved && path.relative("node_modules/opui-css", resolved.id.split("?")[0])].join(" "))
  }
}
await server.close()
`

const VITE_BUILD = String.raw`
import { build } from "vite"

const [outDir, settings] = process.argv.slice(2)
const config = JSON.parse(settings)
await build({ ...config, build: { ...config.build, outDir }, logLevel: "silent" })
`

const PRODUCTION_BUILD = String.raw`
process.env.NODE_ENV = "production"
const { build } = await import("vite")

const result = await build({
  build: {
    lib: { entry: process.argv[2], formats: ["es"] },
    minify: false,
    rollupOptions: {
      external: (id) => /^[^./\0]/.test(id) && !id.startsWith("opui-css"),
    },
    write: false,
  },
  logLevel: "silent",
  mode: "production",
})
process.stdout.write(
  [result]
    .flat()
    .flatMap(({ output }) => output)
    .map((chunk) => chunk.code ?? "")
    .join("\n"),
)
`

const DEV_ONLY = Object.keys(dev).filter(
  (name) => name === "hasName" || name.startsWith("warn"),
)

const devLeftovers = (code: string) => [
  ...(code.includes("[OPUI") ? ["[OPUI"] : []),
  ...DEV_ONLY.filter((name) => new RegExp(`\\b${name}\\(`).test(code)),
  ...new Set(
    [...code.matchAll(/^\s*(untrack|watchEffect)\(/gm)].map(([, name]) => name),
  ),
]

const cssIn = (dist: string) =>
  readdirSync(dist, { recursive: true })
    .map(String)
    .filter((file) => file.endsWith(".css"))
    .map((file) => readFileSync(path.join(dist, file), "utf8"))
    .join("\n")

const DEEP_IMPORTS = {
  react: ["Dialog/Dialog.react", "Dialog/DialogTitle.react"],
  solid: ["Dialog/Dialog.solid", "Dialog/DialogTitle.solid"],
  svelte: ["Dialog/Dialog.svelte", "Dialog/DialogTitle.svelte"],
  vue: ["Dialog/Dialog.vue", "Dialog/DialogTitle.vue"],
}

let work: string
let tarball: string
let files: string[]
let unpacked: string

beforeAll(() => {
  work = mkdtempSync(path.join(tmpdir(), "opui-package-"))
  const output = run(
    "npm",
    ["pack", "--json", "--pack-destination", work],
    packageDir,
  )
  const [result] = JSON.parse(output.slice(output.search(/^\[/m)))
  tarball = path.join(work, result.filename)
  files = result.files
    .map((file: { path: string }) => file.path)
    .toSorted() as string[]
  unpacked = path.join(work, "package")
  run("tar", ["-xzf", tarball, "-C", work], work)
})

afterAll(() => {
  if (work) rmSync(work, { force: true, recursive: true })
})

test("the tarball ships the package and nothing else", () => {
  for (const file of [
    "LICENSE",
    "README.md",
    "THIRD-PARTY-NOTICES",
    "astro/index.ts",
    "bin/opui-css.mjs",
    "components/Button/Button.astro",
    "components/Button/Button.react.tsx",
    "components/Button/Button.solid.tsx",
    "components/Button/Button.svelte",
    "components/Button/Button.vue",
    "core/normalize.css",
    "css/compat.css",
    "css/compat/avatar.css",
    "css/components/button.css",
    "css/imports.css",
    "css/js/checkbox.js",
    "dist/op.css",
    "dist/opui.baseline-2023.css",
    "dist/opui.components.css",
    "dist/opui.css",
    "dist/opui.no-compat.css",
    "elements/callout.js",
    "elements/character-count.js",
    "elements/copy.js",
    "elements/file-upload.js",
    "elements/password-toggle.js",
    "elements/reactions.js",
    "elements/select-all.js",
    "elements/sortable-table.js",
    "elements/step-button.js",
    "elements/toaster.js",
    "env.d.ts",
    "icons/lucide.css",
    "open-props.css",
    "package.json",
    "react/index.ts",
    "skills/opui/SKILL.md",
    "skills/opui/references/index.md",
    "solid/index.ts",
    "svelte/index.ts",
    "themes/m3.css",
    "tokens.json",
    "vue/index.ts",
  ]) {
    expect(files).toContain(file)
  }
  expect(
    files.filter((file) =>
      /(^|\/)(AGENTS\.md|CHECKS\.md|TODO\.md)$|^(scripts|tests)\//.test(file),
    ),
  ).toEqual([])
})

test("every entry point is in the tarball", () => {
  const manifest = JSON.parse(
    readFileSync(path.join(packageDir, "package.json"), "utf8"),
  )
  const targets = (entry: string, value: unknown): [string, string][] =>
    typeof value === "string"
      ? [[entry, value]]
      : Object.values(value as object).flatMap((nested) =>
          targets(entry, nested),
        )
  const missing = [
    ...targets("style", manifest.style),
    ...Object.entries(manifest.bin).flatMap(([name, value]) =>
      targets(`bin ${name}`, value),
    ),
    ...Object.entries(manifest.exports).flatMap(([entry, value]) =>
      targets(entry, value),
    ),
  ].filter(([, target]) => {
    const pattern = new RegExp(
      `^${target
        .replace(/^\.\//, "")
        .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
        .replaceAll("*", ".+")}$`,
    )
    return !files.some((file) => pattern.test(file))
  })
  expect(missing).toEqual([])
})

test("every compiled component file has a deep import, with its types, and Node takes the server build of a Vue file", () => {
  const consumer = path.join(work, "deep-imports")
  mkdirSync(path.join(consumer, "node_modules"), { recursive: true })
  writeFileSync(path.join(consumer, "package.json"), '{ "type": "module" }')
  symlinkSync(unpacked, path.join(consumer, "node_modules/opui-css"))
  const require = createRequire(path.join(consumer, "index.js"))
  const inPackage = (file: string) =>
    path.relative(realpathSync(unpacked), realpathSync(file))
  const typesOf = (specifier: string, resolution: "Bundler" | "NodeNext") => {
    const { resolvedModule } = ts.resolveModuleName(
      specifier,
      path.join(consumer, "index.ts"),
      {
        module: ts.ModuleKind[resolution === "Bundler" ? "ESNext" : "NodeNext"],
        moduleResolution: ts.ModuleResolutionKind[resolution],
      },
      ts.sys,
    )
    return resolvedModule && inPackage(resolvedModule.resolvedFileName)
  }
  const compiled = files.filter((file) =>
    /^dist\/components\/.+\.(react\.js|svelte|svelte\.js|vue\.js)$/.test(file),
  )
  expect(compiled.length).toBeGreaterThan(0)
  expect(
    compiled.flatMap((file) => {
      const specifier = `opui-css/${file
        .replace(/^dist\//, "")
        .replace(/\.(react|vue)\.js$/, ".$1")}`
      const declaration = file.replace(/(\.svelte)?(\.js)?$/, "$1.d.ts")
      return [
        [
          specifier,
          inPackage(require.resolve(specifier)),
          file.replace(/\.vue\.js$/, ".vue.server.js"),
        ],
        ...(["Bundler", "NodeNext"] as const).map((resolution) => [
          `${specifier} (types, ${resolution})`,
          typesOf(specifier, resolution),
          declaration,
        ]),
      ]
        .filter(([, resolved, expected]) => resolved !== expected)
        .map(([name, resolved]) => `${name} resolves to ${resolved}`)
    }),
    "a deep import that misses dist loads a second copy of the component next to the one the entry point loads",
  ).toEqual([])
})

test("every entry point's types and the declarations they import resolve with bundler, node16 and nodenext", () => {
  const consumer = path.join(work, "entry-types")
  mkdirSync(path.join(consumer, "node_modules"), { recursive: true })
  writeFileSync(path.join(consumer, "package.json"), '{ "type": "module" }')
  symlinkSync(unpacked, path.join(consumer, "node_modules/opui-css"))
  const index = path.join(consumer, "index.ts")
  const entries = [
    "opui-css/package.json",
    "opui-css/react",
    "opui-css/svelte",
    "opui-css/tokens.json",
    "opui-css/vue",
    ...files
      .filter((file) => /^(css\/js|elements)\/[^/]+\.js$/.test(file))
      .map((file) => `opui-css/${file}`),
  ]
  expect(entries).toContain("opui-css/elements/toaster.js")
  expect(entries).toContain("opui-css/css/js/checkbox.js")
  expect(
    (["Bundler", "Node16", "NodeNext"] as const).flatMap((resolution) => {
      const options = {
        module: ts.ModuleKind[resolution === "Bundler" ? "ESNext" : resolution],
        moduleResolution: ts.ModuleResolutionKind[resolution],
        resolveJsonModule: true,
      }
      const seen = new Set<string>()
      const unresolved: string[] = []
      const queue = entries.map((entry) => [entry, index] as const)
      for (const [specifier, from] of queue) {
        const resolved = ts.resolveModuleName(
          specifier,
          from,
          options,
          ts.sys,
          undefined,
          undefined,
          ts.ModuleKind.ESNext,
        ).resolvedModule?.resolvedFileName
        if (!resolved) {
          const importer =
            from === index
              ? "the consumer"
              : path.relative(realpathSync(unpacked), realpathSync(from))
          unresolved.push(`${resolution}: ${specifier} from ${importer}`)
          continue
        }
        if (seen.has(resolved) || !resolved.endsWith(".d.ts")) continue
        seen.add(resolved)
        for (const { fileName } of ts.preProcessFile(
          readFileSync(resolved, "utf8"),
          true,
          true,
        ).importedFiles) {
          if (fileName.startsWith(".")) queue.push([fileName, resolved])
        }
      }
      expect(seen.size).toBeGreaterThan(entries.length)
      return unresolved
    }),
    "an import TypeScript can't resolve makes the types it brings in any, and skipLibCheck hides the error",
  ).toEqual([])
})

const COMPILED = new RegExp(
  `^dist/(components|${HYDRATED_FRAMEWORK_IDS.join("|")})/.+\\.(d\\.ts|jsx?)$`,
)

test("every compiled file has a source map to a source in the package", () => {
  const compiled = files.filter(
    (file) => COMPILED.test(file) && !file.endsWith("/elements.d.ts"),
  )
  expect(compiled.length).toBeGreaterThan(0)
  expect(
    compiled.flatMap((file) => {
      const map = `${file}.map`
      const comment = `//# sourceMappingURL=${path.basename(map)}`
      const code = readFileSync(path.join(unpacked, file), "utf8")
      if (!code.trimEnd().endsWith(comment)) {
        return [`${file} doesn't end with ${comment}`]
      }
      if (!files.includes(map)) return [`${map} is missing`]
      const { sources } = JSON.parse(
        readFileSync(path.join(unpacked, map), "utf8"),
      ) as { sources: string[] }
      return sources
        .map((source) => path.posix.join(path.posix.dirname(file), source))
        .filter((source) => !files.includes(source))
        .map((source) => `${map} points to ${source}, which isn't shipped`)
    }),
  ).toEqual([])
})

test("dist/opui.css starts with the layer order", () => {
  const layers = readFileSync(path.join(packageDir, "css/layers.css"), "utf8")
    .trim()
    .split("\n")
  const css = readFileSync(path.join(unpacked, "dist/opui.css"), "utf8")
  expect(layers[0]).toMatch(/^@layer openprops, theme, /)
  expect(css.split("\n").slice(0, layers.length)).toEqual(layers)
})

test("dist/opui.no-compat.css leaves out the compat layer", () => {
  const css = (file: string) =>
    readFileSync(path.join(unpacked, "dist", file), "utf8")
  expect(css("opui.css")).toContain("@layer components.compat {")
  expect(css("opui.baseline-2023.css")).toContain("@layer components.compat {")
  expect(css("opui.no-compat.css")).not.toContain("@layer components.compat {")
})

test("dist/op.css has no palette, as MIGRATING.md promises", () => {
  const css = readFileSync(path.join(unpacked, "dist/op.css"), "utf8")
  expect(css.length).toBeGreaterThan(0)
  expect(
    [...css.matchAll(/(?<![\w-])(--(?:color|palette)-[\w-]*)\s*:/g)].map(
      ([, name]) => name,
    ),
    "open-props.css imports Open Props' palette again",
  ).toEqual([])
})

const specifiersIn = (text: string) => [
  ...new Set(
    [...text.matchAll(/(?<![\w@/.-])opui-css\/((?:[\w.*/-]|<[\w-]+>)+)/g)]
      .map(([, subpath = ""]) => subpath.replace(/\.+$/, ""))
      .filter(Boolean),
  ),
]

const DOCS_SOURCE = /\.(astro|html|md|mdx|svelte|ts|tsx|vue)$/

describe("every opui-css specifier resolves in the tarball", () => {
  let exported: (subpath: string) => boolean

  beforeAll(() => {
    const consumer = path.join(work, "specifiers")
    mkdirSync(path.join(consumer, "node_modules"), { recursive: true })
    symlinkSync(unpacked, path.join(consumer, "node_modules/opui-css"))
    const require = createRequire(path.join(consumer, "index.js"))
    const resolves = (subpath: string) => {
      try {
        require.resolve(`opui-css/${subpath}`)
        return true
      } catch {
        return false
      }
    }
    const PLACEHOLDER = /(\*)|<[^>]+>/
    const shipped = files.flatMap((file) => [
      file,
      file.replace(/\.[^./]+$/, ""),
    ])
    const candidates = (subpath: string) => {
      if (!PLACEHOLDER.test(subpath)) return [subpath]
      const pattern = new RegExp(
        `^${subpath
          .split(new RegExp(PLACEHOLDER, "g"))
          .map((part, index) =>
            index % 2 === 1
              ? part === "*"
                ? ".+"
                : "[^/]+"
              : (part ?? "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
          )
          .join("")}$`,
      )
      return shipped.filter((file) => pattern.test(file))
    }
    exported = (subpath) =>
      subpath.endsWith("/")
        ? files.some((file) => file.startsWith(subpath))
        : candidates(subpath).some(resolves)
    expect(candidates("components/*.react")).toContain(
      "components/Button/Button.react",
    )
    expect(candidates("components/<Name>.react")).toEqual([])
  })

  test("finds the specifiers in prose, code and markup, and flags a missing one", () => {
    expect(
      specifiersIn(
        'import "opui-css/css/imports.css" from opui-css/elements/, <code>opui-css/components/*</code>, opui-css/{script.file} and opui-css/....',
      ),
    ).toEqual(["css/imports.css", "elements/", "components/*"])
    expect(exported("css/imports.css")).toBe(true)
    expect(exported("css/components/<name>.css")).toBe(true)
    expect(exported("elements/")).toBe(true)
    expect(exported("css/nope.css")).toBe(false)
    expect(exported("nope/")).toBe(false)
  })

  test.each([
    {
      name: "the README",
      sources: () => [path.join(unpacked, "README.md")],
    },
    {
      name: "the agent skill",
      sources: () =>
        files
          .filter((file) => file.startsWith("skills/opui/"))
          .map((file) => path.join(unpacked, file)),
    },
    {
      name: "the docs",
      sources: () =>
        readdirSync(path.join(root, "src"), { recursive: true })
          .map(String)
          .filter((file) => DOCS_SOURCE.test(file))
          .map((file) => path.join(root, "src", file)),
    },
  ])("in $name", ({ sources }) => {
    const found = sources().flatMap((file) =>
      specifiersIn(readFileSync(file, "utf8")).map((subpath) => ({
        file,
        subpath,
      })),
    )
    expect(found.length).toBeGreaterThan(0)
    expect(
      found
        .filter(({ subpath }) => !exported(subpath))
        .map(
          ({ file, subpath }) =>
            `${path.relative(file.startsWith(unpacked) ? unpacked : root, file)}: ${subpath}`,
        ),
      "these opui-css/... paths aren't in the package or aren't exported",
    ).toEqual([])
  })
})

describe("the opui-css command", () => {
  let dir: string
  let skill: string[]

  const opui = (...args: string[]) => {
    const result = spawnSync(
      "node",
      [path.join(unpacked, "bin/opui-css.mjs"), ...args],
      { cwd: dir, encoding: "utf8" },
    )
    return { output: `${result.stdout}${result.stderr}`, status: result.status }
  }

  const files = (folder: string) =>
    readdirSync(folder, { recursive: true })
      .map(String)
      .filter((file) => statSync(path.join(folder, file)).isFile())
      .toSorted()

  beforeAll(() => {
    dir = path.join(work, "command")
    mkdirSync(dir)
    skill = files(path.join(unpacked, "skills/opui"))
  })

  test("the package declares it as a bin", () => {
    const manifest = JSON.parse(
      readFileSync(path.join(unpacked, "package.json"), "utf8"),
    )
    expect(manifest.bin).toEqual({ "opui-css": "./bin/opui-css.mjs" })
  })

  test("skill copies the skill into .claude/skills/opui", () => {
    const { output, status } = opui("skill")
    const target = path.join(dir, ".claude/skills/opui")
    expect(status).toBe(0)
    expect(output).toContain(".claude/skills/opui")
    expect(output).toContain(
      JSON.parse(readFileSync(path.join(unpacked, "package.json"), "utf8"))
        .version,
    )
    expect(files(target)).toEqual(skill)
    expect(skill).toContain("SKILL.md")
    expect(skill).toContain(path.join("references", "index.md"))
    expect(skill).toContain(path.join("references", "button.md"))
    expect(readFileSync(path.join(target, "SKILL.md"), "utf8")).toBe(
      readFileSync(path.join(unpacked, "skills/opui/SKILL.md"), "utf8"),
    )
  })

  test("skill refuses to replace a copy without --force", () => {
    const target = path.join(dir, ".claude/skills/opui")
    writeFileSync(path.join(target, "stale.md"), "")
    const refused = opui("skill")
    expect(refused.status).not.toBe(0)
    expect(refused.output).toContain("--force")
    expect(existsSync(path.join(target, "stale.md"))).toBe(true)
    expect(opui("skill", "--force").status).toBe(0)
    expect(files(target)).toEqual(skill)
  })

  test("skill --dir copies it into another skills folder", () => {
    const { output, status } = opui("skill", "--dir", "agents/skills")
    expect(status).toBe(0)
    expect(output).toContain(path.join("agents", "skills", "opui"))
    expect(files(path.join(dir, "agents/skills/opui"))).toEqual(skill)
  })

  test.each([
    { args: ["--help"], name: "--help" },
    { args: [], name: "no command" },
    { args: ["unknown"], name: "an unknown command" },
    { args: ["check"], name: "check without a file" },
    { args: ["check", "missing.html"], name: "check with a missing file" },
  ])("$name prints the usage and fails", ({ args }) => {
    const { output, status } = opui(...args)
    expect(status).not.toBe(0)
    expect(output).toContain("Usage: npx opui-css skill")
  })

  const FIELD = (id: string, labelFor = id) =>
    `<div class="ui-field"><label class="ui-label" for="${labelFor}">Quantity</label><span class="ui-field-container"><input aria-describedby="${id}-end-text" id="${id}" type="number"></span><span class="ui-end-text" id="${id}-end-text">Up to 10 per order.</span></div>`

  test("check without parse5 says how to install it", () => {
    writeFileSync(path.join(dir, "page.html"), FIELD("quantity"))
    const { output, status } = opui("check", "page.html")
    expect(status).not.toBe(0)
    expect(output).toContain("npm install --save-dev parse5")
  })

  describe("with parse5 installed", () => {
    beforeAll(() => {
      mkdirSync(path.join(work, "node_modules"))
      symlinkSync(
        realpathSync(path.join(root, "node_modules/parse5")),
        path.join(work, "node_modules/parse5"),
      )
    })

    afterAll(() => {
      rmSync(path.join(work, "node_modules"), { force: true, recursive: true })
    })

    test("check passes fields that follow their control's id", () => {
      const { output, status } = opui("check", "page.html")
      expect(status).toBe(0)
      expect(output).toContain("Checked 1 field in 1 file")
    })

    test("check names the file, line and problem of each field, and fails", () => {
      writeFileSync(
        path.join(dir, "broken.html"),
        `<!doctype html>\n<main>\n${FIELD("quantity", "amount")}\n</main>`,
      )
      const { output, status } = opui("check", "broken.html")
      expect(status).not.toBe(0)
      expect(output).toContain(
        'broken.html:3: #quantity: the label\'s for is "amount", not "quantity"',
      )
      expect(output).toContain("1 problem in 1 field in 1 file.")
    })

    test("check reads the .html files of a folder and skips node_modules", () => {
      mkdirSync(path.join(dir, "site/node_modules"), { recursive: true })
      writeFileSync(path.join(dir, "site/a.html"), FIELD("a"))
      writeFileSync(path.join(dir, "site/b.html"), FIELD("b"))
      writeFileSync(
        path.join(dir, "site/node_modules/c.html"),
        FIELD("c", "elsewhere"),
      )
      const { output, status } = opui("check", "site")
      expect(status).toBe(0)
      expect(output).toContain("Checked 2 fields in 2 files")
    })

    test("opui-css/check exports checkHtml, with its types", () => {
      symlinkSync(unpacked, path.join(work, "node_modules/opui-css"))
      const result = spawnSync(
        process.execPath,
        [
          "--input-type=module",
          "--eval",
          'import { checkHtml } from "opui-css/check"\nconsole.log(JSON.stringify(checkHtml(process.argv[1])))',
          FIELD("quantity", "amount"),
        ],
        { cwd: dir, encoding: "utf8" },
      )
      expect(JSON.parse(result.stdout)).toEqual({
        fields: 1,
        problems: [
          {
            line: 1,
            message: '#quantity: the label\'s for is "amount", not "quantity"',
          },
        ],
      })
      const { resolvedModule } = ts.resolveModuleName(
        "opui-css/check",
        path.join(dir, "index.ts"),
        {
          module: ts.ModuleKind.NodeNext,
          moduleResolution: ts.ModuleResolutionKind.NodeNext,
        },
        ts.sys,
      )
      expect(
        resolvedModule &&
          path.relative(
            realpathSync(unpacked),
            realpathSync(resolvedModule.resolvedFileName),
          ),
      ).toBe(path.join("bin", "check.d.mts"))
    })

    test("check says when the HTML has no fields", () => {
      writeFileSync(path.join(dir, "empty.html"), '<div id="root"></div>')
      const { output, status } = opui("check", "empty.html")
      expect(status).toBe(0)
      expect(output).toContain("Found no fields in 1 file.")
    })
  })
})

describe.each(FIXTURES)(
  "$framework fixture",
  ({ build, check, framework, server }) => {
    let dir: string

    beforeAll(() => {
      const fixture = path.join(fixturesDir, framework)
      dir = path.join(work, framework)
      cpSync(fixture, dir, {
        filter: (source) =>
          ![".astro", "dist", "node_modules"].includes(path.basename(source)),
        recursive: true,
      })
      linkModules(
        path.join(fixture, "node_modules"),
        path.join(dir, "node_modules"),
      )
      const target = path.join(dir, "node_modules/opui-css")
      mkdirSync(target)
      run("tar", ["-xzf", tarball, "--strip-components=1", "-C", target], dir)
    })

    test("type checks against the installed package", () => {
      run("node", [bin(dir, check), ...check.args], dir)
    })

    test("builds with the installed package", () => {
      run("node", [bin(dir, build), ...build.args], dir)
      const dist = path.join(dir, "dist")
      const html = readFileSync(path.join(dist, "index.html"), "utf8")
      expect(html).toMatch(
        framework === "astro" || framework === "nunjucks"
          ? /class="ui-button/
          : /<script type="module"/,
      )
      const css = cssIn(dist)
      expect(css).toContain("@layer openprops")
      expect(css).toContain(".ui-button")
      expect(lightDarkProblems(css)).toEqual([])
    })

    test.runIf(framework === "react")(
      "the README's vite.config setting keeps light-dark(), which the default build rewrites",
      () => {
        const { vite } = lightDarkSettings(
          readFileSync(path.join(unpacked, "README.md"), "utf8"),
        )
        writeFileSync(path.join(dir, "vite-build.mjs"), VITE_BUILD)
        const built = (outDir: string, settings: object) => {
          run("node", ["vite-build.mjs", outDir, JSON.stringify(settings)], dir)
          return cssIn(path.join(dir, outDir))
        }
        expect(
          built("dist-default", {}),
          "Vite's default build keeps light-dark() now: remove the vite.config block from the README's Builds that rewrite light-dark() section",
        ).not.toContain("light-dark(")
        const css = built("dist-readme", vite)
        expect(
          css,
          "the vite.config block in the README's Builds that rewrite light-dark() section no longer keeps light-dark()",
        ).toContain("light-dark(")
        expect(lightDarkProblems(css)).toEqual([])
      },
    )

    test.runIf(HYDRATED_FRAMEWORK_IDS.some((id) => id === framework))(
      "a production build leaves out the dev warnings and the code that computes what they check",
      () => {
        writeFileSync(path.join(dir, "production-build.mjs"), PRODUCTION_BUILD)
        writeFileSync(
          path.join(dir, "production-entry.js"),
          `export * from "opui-css/${framework}"\n`,
        )
        expect(
          devLeftovers(
            run("node", ["production-build.mjs", "production-entry.js"], dir),
          ),
          `the ${framework} components still call these in a production build: put each warning behind \`if (DEV)\` from components/dev.ts`,
        ).toEqual([])
      },
    )

    test.runIf(framework === "vue")(
      "the production check flags a warning without the flag, and an effect that only ran one",
      () => {
        writeFileSync(path.join(dir, "production-build.mjs"), PRODUCTION_BUILD)
        const leftovers = (name: string, call: string) => {
          writeFileSync(
            path.join(dir, `${name}.js`),
            `import { watchEffect } from "vue"\nimport { DEV, hasName, warnUnnamed } from "opui-css/dist/components/dev.js"\nexport const sample = (props) => {\n  ${call}\n  return [watchEffect, props.label]\n}\n`,
          )
          return devLeftovers(
            run("node", ["production-build.mjs", `${name}.js`], dir),
          )
        }
        expect(
          leftovers(
            "unguarded",
            'warnUnnamed("Sample", hasName(props, undefined))',
          ),
        ).toEqual(["hasName"])
        expect(
          leftovers(
            "effect",
            'watchEffect(() => warnUnnamed("Sample", props.label))',
          ),
        ).toEqual(["watchEffect"])
        expect(
          leftovers(
            "guarded",
            'if (DEV) warnUnnamed("Sample", hasName(props, undefined))',
          ),
        ).toEqual([])
      },
    )

    test.runIf(framework in SERVER_RENDER)(
      "renders on the server in Node, without a bundler",
      () => {
        writeFileSync(
          path.join(dir, "server-render.mjs"),
          SERVER_RENDER[framework as keyof typeof SERVER_RENDER],
        )
        const output = run("node", ["server-render.mjs"], dir).replaceAll(
          /<!--[[\]]-->/g,
          "",
        )
        expect(output).toMatch(
          /^<button class="ui-button ui-primary ui-filled" type="submit">Save<\/button>$/m,
        )
        expect(output).toMatch(/^[1-9]\d* components$/m)
        expect(output).toMatch(
          /^deep imports share the entry point's modules: true$/m,
        )
      },
    )

    test.runIf(framework in DEEP_IMPORTS)(
      "Vite resolves the entry point and deep imports into dist, on the client and the server",
      () => {
        writeFileSync(path.join(dir, "vite-resolve.mjs"), VITE_RESOLVE)
        const ids = [
          `opui-css/${framework}`,
          ...DEEP_IMPORTS[framework as keyof typeof DEEP_IMPORTS].map(
            (file) => `opui-css/components/${file}`,
          ),
        ]
        const lines = run(
          "node",
          ["vite-resolve.mjs", JSON.stringify(ids)],
          dir,
        )
          .trim()
          .split("\n")
        expect(lines).toHaveLength(ids.length * 2)
        expect(
          lines.filter((line) => !/ dist\/\S+\.(jsx?|svelte)$/.test(line)),
          "these resolve outside dist, so a deep import and the entry point would load two copies",
        ).toEqual([])
      },
    )

    test.runIf(server)("renders hydratable markup on the server", () => {
      run(
        "node",
        [bin(dir, build), "build", "--ssr", server!, "--outDir", "dist-server"],
        dir,
      )
      const html = run(
        "node",
        [
          "--input-type=module",
          "--eval",
          'const { render } = await import("./dist-server/entry-server.js"); process.stdout.write(render())',
        ],
        dir,
      )
      expect(html).toContain('class="ui-button')
      expect(html).toMatch(/<button _hk=\S+/)
    })

    test.runIf(framework === "svelte")(
      "the dev server pre-bundles the package and serves it",
      () => {
        writeFileSync(path.join(dir, "dev-check.mjs"), DEV_CHECK)
        expect(run("node", ["dev-check.mjs"], dir)).toMatch(
          /^[1-9]\d* pre-bundled dependencies served$/m,
        )
      },
    )
  },
)

test("a build that lowers light-dark() needs its variables on html", () => {
  const token = "--x:var(--lightningcss-light,a)var(--lightningcss-dark,b)"
  expect(
    lightDarkProblems(
      `:where(html){color-scheme:var(--ui-color-scheme);${token}}`,
    ),
  ).toHaveLength(2)
  expect(
    lightDarkProblems(
      `:where(html){--lightningcss-light:initial;--lightningcss-dark: ;color-scheme:light;color-scheme:var(--ui-color-scheme);${token}}@media (prefers-color-scheme:dark){:where(html){--lightningcss-light: ;--lightningcss-dark:initial;color-scheme:dark}}`,
    ),
  ).toEqual([])
  expect(lightDarkProblems(":where(html){--x:light-dark(a,b)}")).toEqual([])
})
