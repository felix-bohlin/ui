import { execFileSync } from "node:child_process"
import {
  cpSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  realpathSync,
  rmSync,
  symlinkSync,
} from "node:fs"
import { tmpdir } from "node:os"
import path from "node:path"
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
    "components/Button/Button.astro",
    "components/Button/Button.react.tsx",
    "components/Button/Button.svelte",
    "components/Button/Button.vue",
    "core/normalize.css",
    "css/components/button.css",
    "css/imports.css",
    "css/js/checkbox.js",
    "css/js/range.js",
    "dist/op.css",
    "dist/opui.components.css",
    "dist/opui.css",
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

test("dist/opui.css starts with the layer order", () => {
  const layers = readFileSync(path.join(packageDir, "css/layers.css"), "utf8")
    .trim()
    .split("\n")
  const css = readFileSync(path.join(unpacked, "dist/opui.css"), "utf8")
  expect(layers[0]).toMatch(/^@layer openprops, theme, /)
  expect(css.split("\n").slice(0, layers.length)).toEqual(layers)
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
  })
})
