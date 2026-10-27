import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { dirname, join, normalize } from "node:path"
import { expect, test } from "vitest"
import untested from "./untested-scripts.json"

const filesIn = (dir: string, keep: (file: string) => boolean) =>
  existsSync(dir)
    ? readdirSync(dir)
        .filter(keep)
        .map((file) => `${dir}/${file}`)
    : []

const SCRIPTS = [
  ...filesIn(".claude/hooks", (file) => file.endsWith(".mjs")),
  ...execFileSync("git", ["ls-files", ".githooks"], { encoding: "utf8" })
    .split("\n")
    .filter(Boolean),
  ...filesIn("packages/opui/bin", (file) => file.endsWith(".mjs")),
  ...filesIn("packages/opui/scripts", (file) => file.endsWith(".mjs")),
  ...filesIn("scripts", (file) => file.endsWith(".mjs")),
].toSorted()

const TESTS = readdirSync("tests", { recursive: true })
  .map(String)
  .filter(
    (file) =>
      file.endsWith(".ts") &&
      !/(^|\/)(fixtures|node_modules|__snapshots__)\//.test(file),
  )
  .map((file) => `tests/${file}`)

const isFile = (path: string) =>
  !path.startsWith("..") &&
  !path.includes("node_modules/") &&
  existsSync(path) &&
  statSync(path).isFile()

const literals = (source: string) => {
  const found: string[] = []
  for (let at = 0; at < source.length; at++) {
    const char = source[at]
    if (source.startsWith("//", at)) {
      const end = source.indexOf("\n", at)
      if (end === -1) break
      at = end
    } else if (source.startsWith("/*", at)) {
      const end = source.indexOf("*/", at + 2)
      if (end === -1) break
      at = end + 1
    } else if (char === '"' || char === "'" || char === "`") {
      let end = at + 1
      while (end < source.length && source[end] !== char) {
        if (source[end] === "\\") end++
        end++
      }
      found.push(source.slice(at + 1, end))
      at = end
    }
  }
  return found
}

export const referencesOf = (file: string, source: string) =>
  literals(source)
    .filter(
      (value) => /\.(?:mjs|sh)$/.test(value) || value.startsWith(".githooks/"),
    )
    .map((value) =>
      normalize(/^\.\.?\//.test(value) ? join(dirname(file), value) : value),
    )
    .filter(isFile)

export const reachedFrom = (tests: { file: string; source: string }[]) => {
  const reached = new Set<string>()
  const queue = tests.flatMap(({ file, source }) => referencesOf(file, source))
  while (queue.length) {
    const file = queue.pop()!
    if (reached.has(file)) continue
    reached.add(file)
    if (/\.(?:c?js|mjs|ts)$/.test(file)) {
      queue.push(...referencesOf(file, readFileSync(file, "utf8")))
    }
  }
  return reached
}

const reached = reachedFrom(
  TESTS.map((file) => ({ file, source: readFileSync(file, "utf8") })),
)

test("finds the scripts and the tests", () => {
  expect(SCRIPTS).toContain("scripts/check-dist.mjs")
  expect(TESTS).toContain("tests/unit/scripts.test.ts")
})

test("every script and hook is imported or run by a test", () => {
  expect(
    SCRIPTS.filter((file) => !reached.has(file) && !(file in untested)),
    "add a test that imports the script or runs it by its path, or, when only its output can be tested, list it with the reason in tests/unit/untested-scripts.json",
  ).toEqual([])
})

test("untested-scripts.json only lists scripts no test reaches", () => {
  expect(
    Object.keys(untested).filter(
      (file) => !SCRIPTS.includes(file) || reached.has(file),
    ),
    "remove the entry",
  ).toEqual([])
})

const sample = (source: string) =>
  reachedFrom([{ file: "tests/unit/sample.test.ts", source }])

test("a script counts as tested when a test imports it or names its path whole", () => {
  expect(
    sample('import { fileProblems } from "../../scripts/check-file.mjs"'),
  ).toContain("scripts/check-file.mjs")
  expect(sample('await import("../../scripts/check-file.mjs")')).toContain(
    "scripts/check-file.mjs",
  )
  expect(sample('spawnSync("node", ["scripts/todo.mjs", "list"])')).toContain(
    "scripts/todo.mjs",
  )
  expect(sample('spawnSync("sh", [".githooks/commit-msg", file])')).toContain(
    ".githooks/commit-msg",
  )
})

test("a script mentioned in a message, a comment or a missing path does not count", () => {
  expect(
    sample('expect(problems).toEqual(["see `scripts/todo.mjs` and run it"])'),
  ).toEqual(new Set())
  expect(sample('// spawnSync("node", ["scripts/todo.mjs"])')).toEqual(
    new Set(),
  )
  expect(sample('/* import "../../scripts/todo.mjs" */')).toEqual(new Set())
  expect(sample('const x = "scripts/nope.mjs"')).toEqual(new Set())
})

test("an import reaches the scripts the imported file imports", () => {
  expect(sample('import "../../scripts/check-file.mjs"')).toContain(
    "scripts/check-characters.mjs",
  )
})
