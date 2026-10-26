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
  })
})
