import { spawnSync } from "node:child_process"
import { readdirSync, readFileSync } from "node:fs"
import { beforeAll, expect, test } from "vitest"
import {
  compileComponent,
  loadApis,
  refusalsOf,
} from "../../scripts/build-components.mjs"
import {
  DIAGNOSTICS,
  diagnosticProblems,
  explain,
} from "../../scripts/component-diagnostics.mjs"
import { at, unsupported } from "../../scripts/component-shared.mjs"

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

test("diagnosticProblems flags a call without a code, an unlisted code, an unused code, a code without a sample and unsorted codes", () => {
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
  expect(
    diagnosticProblems(
      { "a.mjs": 'throw unsupported("BC101", file, "x")' },
      { BC101: { explain: "", title: "" } },
    ),
  ).toEqual([
    "BC101 in scripts/component-diagnostics.mjs needs a sample the compiler refuses with it, or, when no source reaches it, the table it guards",
  ])
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

test("unsupported() names the line and column it is given", () => {
  const error = unsupported(
    "BC202",
    at("a.astro", { column: 3, line: 7 }),
    "the expression {x}",
  )
  expect(error).toMatchObject({ column: 3, file: "a.astro", line: 7 })
  expect(error.message).toMatch(/^a\.astro:7:3 uses the expression \{x\}/)
  expect(at("a.astro", undefined)).toBe("a.astro")
})

test.each([
  ["BC103", "Sample.astro:6:1"],
  ["BC201", "Sample.astro:7:6"],
  ["BC202", "Sample.astro:8:3"],
  ["BC204", "Sample.astro:8:3"],
  ["BC602", "types.astro.ts:4:34"],
  ["BC603", "types.ts:6:3"],
] as const)(
  "the refusal of the sample of %s names the line and column of the construct",
  async (code, place) => {
    const refusal = (await refusalsOf(DIAGNOSTICS[code].sample)).find(
      (error) => error.code === code,
    )
    expect(refusal?.message).toContain(`/Sample/${place} uses `)
  },
)

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
  expect(known.stdout).toContain(DIAGNOSTICS.BC210.sample.astro.trimEnd())
  const unknown = spawnSync(
    "node",
    ["scripts/build-components.mjs", "--explain", "BC999"],
    { encoding: "utf8" },
  )
  expect(unknown.status).toBe(1)
  expect(unknown.stdout).toMatch(/^BC999 is no build-components code/)
})

test.each(
  Object.entries(DIAGNOSTICS).flatMap(([code, diagnostic]) =>
    "sample" in diagnostic ? [[code, diagnostic.sample] as const] : [],
  ),
)("the sample of %s is refused with it", async (code, sample) => {
  const refusals = await refusalsOf(sample)
  expect(
    refusals.map((refusal) => refusal.code),
    `the sample of ${code} in scripts/component-diagnostics.mjs must be refused with ${code}`,
  ).toContain(code)
})

test("refusalsOf collects the refusals of the reader, each port, the types and the Nunjucks macro", async () => {
  const { sample } = DIAGNOSTICS.BC504
  expect((await refusalsOf(sample)).map((refusal) => refusal.code)).toEqual([
    "BC504",
    "BC706",
  ])
  expect(
    (
      await refusalsOf({
        astro: DIAGNOSTICS.BC601.sample.astro,
        types: DIAGNOSTICS.BC601.sample.types,
      })
    ).map((refusal) => refusal.code),
  ).toEqual(["BC601", "BC706"])
  expect(
    (
      await refusalsOf({
        astro:
          '---\nimport type { Props } from "./types.astro"\n\nconst { ...rest } = Astro.props\n---\n\n<div {...rest} />\n',
        file: "packages/opui/components/Tabs/Sample.astro",
      })
    ).map((refusal) => refusal.code),
  ).toEqual([])
})

test("--explain prints the table a code guards when no source reaches it", () => {
  const guarded = Object.keys(DIAGNOSTICS).find(
    (code) => "guards" in DIAGNOSTICS[code as keyof typeof DIAGNOSTICS],
  )
  expect(guarded).toBeDefined()
  expect(explain(guarded!)).toMatch(/\n\nNo source reaches it: it guards .+\.$/)
})
