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

const references = (file: string) =>
  [...readFileSync(file, "utf8").matchAll(/["'`]([^"'`\s$]+)["'`]/g)]
    .map(([, path]) =>
      normalize(/^\.\.?\//.test(path) ? join(dirname(file), path) : path),
    )
    .filter(isFile)

const reached = new Set<string>()
const queue = TESTS.flatMap(references)
while (queue.length) {
  const file = queue.pop()!
  if (reached.has(file)) continue
  reached.add(file)
  if (/\.(?:c?js|mjs|ts)$/.test(file)) queue.push(...references(file))
}

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
