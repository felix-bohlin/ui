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

const root = path.resolve(import.meta.dirname, "../..")
const packageDir = path.join(root, "packages/opui")
const fixturesDir = path.join(root, "tests/package/fixtures")

type Command = { args: string[]; bin?: string; package: string }

const FIXTURES: {
  build: Command
  check: Command
  framework: string
}[] = [
  {
    build: { args: ["build"], package: "astro" },
    check: { args: ["check"], package: "astro" },
    framework: "astro",
  },
  {
    build: { args: ["build"], package: "vite" },
    check: { args: ["--noEmit", "-p", "."], bin: "tsc", package: "typescript" },
    framework: "react",
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

const DEEP_IMPORTS = {
  react: ["Dialog/Dialog.react", "Dialog/DialogTitle.react"],
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
    "astro/index.ts",
    "bin/opui-css.mjs",
    "components/Button/Button.astro",
    "components/Button/Button.react.tsx",
    "components/Button/Button.svelte",
    "components/Button/Button.vue",
    "core/normalize.css",
    "css/compat.css",
    "css/compat/avatar.css",
    "css/components/button.css",
    "css/imports.css",
    "css/js/checkbox.js",
    "css/js/range.js",
    "dist/op.css",
    "dist/opui.baseline-2023.css",
    "dist/opui.components.css",
    "dist/opui.css",
    "dist/opui.no-compat.css",
    "elements/character-count.js",
    "elements/copy.js",
    "elements/number-field.js",
    "elements/select-all.js",
    "elements/sortable-table.js",
    "elements/text-field.js",
    "elements/toaster.js",
    "env.d.ts",
    "open-props.css",
    "package.json",
    "react/index.ts",
    "skills/opui/SKILL.md",
    "skills/opui/references/index.md",
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

test("every compiled component file has a deep import, with its types", () => {
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
        [specifier, inPackage(require.resolve(specifier)), file],
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

test("every compiled file has a source map to a source in the package", () => {
  const compiled = files.filter(
    (file) =>
      /^dist\/(components|react|svelte|vue)\/.+\.(d\.ts|js)$/.test(file) &&
      !file.endsWith("/elements.d.ts"),
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

test("every opui-css specifier in the README resolves in the tarball", () => {
  const readme = readFileSync(path.join(unpacked, "README.md"), "utf8")
  const specifiers = [
    ...new Set(
      [...readme.matchAll(/(?<![\w@/.-])opui-css\/([\w/<>.*-]+)/g)].map(
        ([, subpath]) => subpath.replace(/\.$/, ""),
      ),
    ),
  ].toSorted()
  expect(specifiers.length).toBeGreaterThan(0)

  const consumer = path.join(work, "readme")
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
  const shipped = files.flatMap((file) => [file, file.replace(/\.[^./]+$/, "")])
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
  expect(candidates("components/*.react")).toContain(
    "components/Button/Button.react",
  )
  expect(candidates("components/<Name>.react")).toEqual([])
  expect(
    specifiers.filter((subpath) => !candidates(subpath).some(resolves)),
    "the README names opui-css/... imports the package doesn't export",
  ).toEqual([])
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
  ])("$name prints the usage and fails", ({ args }) => {
    const { output, status } = opui(...args)
    expect(status).not.toBe(0)
    expect(output).toContain("Usage: npx opui-css skill")
  })
})

describe.each(FIXTURES)("$framework fixture", ({ build, check, framework }) => {
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
      framework === "astro" ? /class="ui-button/ : /<script type="module"/,
    )
    const css = readdirSync(dist, { recursive: true })
      .map(String)
      .filter((file) => file.endsWith(".css"))
      .map((file) => readFileSync(path.join(dist, file), "utf8"))
      .join("\n")
    expect(css).toContain("@layer openprops")
    expect(css).toContain(".ui-button")
    expect(lightDarkProblems(css)).toEqual([])
  })

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
      const lines = run("node", ["vite-resolve.mjs", JSON.stringify(ids)], dir)
        .trim()
        .split("\n")
      expect(lines).toHaveLength(ids.length * 2)
      expect(
        lines.filter((line) => !/ dist\/\S+\.(js|svelte)$/.test(line)),
        "these resolve outside dist, so a deep import and the entry point would load two copies",
      ).toEqual([])
    },
  )

  test.runIf(framework === "svelte")(
    "the dev server pre-bundles the package and serves it",
    () => {
      writeFileSync(path.join(dir, "dev-check.mjs"), DEV_CHECK)
      expect(run("node", ["dev-check.mjs"], dir)).toMatch(
        /^[1-9]\d* pre-bundled dependencies served$/m,
      )
    },
  )
})

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
