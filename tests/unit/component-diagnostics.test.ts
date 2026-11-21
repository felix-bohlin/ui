import { spawnSync } from "node:child_process"
import { readdirSync, readFileSync } from "node:fs"
import { beforeAll, expect, test } from "vitest"
import { compileComponent, loadApis } from "../../scripts/build-components.mjs"
import {
  DIAGNOSTICS,
  diagnosticProblems,
  explain,
} from "../../scripts/component-diagnostics.mjs"
import { unsupported } from "../../scripts/component-shared.mjs"

const compilerSources = () =>
  Object.fromEntries(
    [
      "scripts/build-components.mjs",
      ...readdirSync("scripts")
        .filter(
          (file) =>
            /^component-.+\.mjs$/.test(file) &&
            file !== "component-diagnostics.mjs",
        )
        .map((file) => `scripts/${file}`),
    ]
      .toSorted()
      .map((file) => [file, readFileSync(file, "utf8")]),
  )

beforeAll(async () => {
  await loadApis()
})

test("every refusal passes a listed code, and every listed code is thrown", () => {
  expect(diagnosticProblems(compilerSources())).toEqual([])
})

test("diagnosticProblems flags a call without a code, an unlisted code, an unused code and unsorted codes", () => {
  const codes = Object.keys(DIAGNOSTICS)
  const thrown = codes
    .map((code) => `throw unsupported("${code}", file, "x")`)
    .join("\n")
  expect(
    diagnosticProblems({
      "a.mjs": `${thrown}\nthrow unsupported(file, "y")\nthrow unsupported(\n  "BC999",\n  file,\n)`,
    }),
  ).toEqual([
    `a.mjs:${codes.length + 1} calls unsupported() without a code: pass a code from scripts/component-diagnostics.mjs first`,
    `a.mjs:${codes.length + 3} uses BC999, which scripts/component-diagnostics.mjs doesn't list`,
  ])
  expect(diagnosticProblems({ "a.mjs": "" })).toContain(
    "BC101 in scripts/component-diagnostics.mjs is never thrown: remove it",
  )
  expect(codes).toEqual(codes.toSorted())
})

test("unsupported() ends its message with the code and refuses an unlisted one", () => {
  const error = unsupported("BC202", "a.astro", "the expression {x}")
  expect(error.code).toBe("BC202")
  expect(error.message).toMatch(
    /^a\.astro uses the expression \{x\}, .* \[BC202\]$/,
  )
  expect(() => unsupported("BC999", "a.astro", "x")).toThrow(
    "unsupported() takes a code from scripts/component-diagnostics.mjs, not BC999",
  )
})

test("a refusal of the compiler carries its code", async () => {
  await expect(
    compileComponent(
      "---\nconst { ...rest } = Astro.props\n---\n\n<div {...rest} />\n",
      "packages/opui/components/Sample/Sample.astro",
    ),
  ).rejects.toMatchObject({ code: "BC104" })
})

test("--explain prints a code's title and explanation, and fails on an unknown code", () => {
  const known = spawnSync(
    "node",
    ["scripts/build-components.mjs", "--explain", "BC210"],
    { encoding: "utf8" },
  )
  expect(known.status).toBe(0)
  expect(known.stdout).toBe(`${explain("BC210")}\n`)
  expect(known.stdout).toContain(DIAGNOSTICS.BC210.title)
  const unknown = spawnSync(
    "node",
    ["scripts/build-components.mjs", "--explain", "BC999"],
    { encoding: "utf8" },
  )
  expect(unknown.status).toBe(1)
  expect(unknown.stdout).toMatch(/^BC999 is no build-components code/)
})
