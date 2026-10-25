import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"
import { describe, expect, test } from "vitest"

const PACKAGE = "packages/opui"
const SKILL = path.join(PACKAGE, "skills/opui")
const REFERENCES = path.join(SKILL, "references")
const GUIDES = ["customizing", "getting-started", "theming"]

const skill = readFileSync(path.join(SKILL, "SKILL.md"), "utf8")
const manifest = JSON.parse(
  readFileSync(path.join(PACKAGE, "package.json"), "utf8"),
) as { exports: Record<string, string | Record<string, string>> }
const read = (file: string) => readFileSync(path.join(PACKAGE, file), "utf8")
const or = (items: string[]) =>
  new Intl.ListFormat("en-GB", { type: "disjunction" }).format(items)

const pages = readdirSync("src/docs/components")
  .filter((file) => file.endsWith(".astro"))
  .map((file) => file.replace(/\.astro$/, ""))
  .toSorted()

const references = readdirSync(REFERENCES, { withFileTypes: true })
const referenceFiles = references
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .toSorted()

test("SKILL.md names every example theme", () => {
  const themes = readdirSync(path.join(PACKAGE, "themes"))
    .filter((file) => file.endsWith(".css"))
    .toSorted()
  expect(themes.length).toBeGreaterThan(0)
  expect(themes.filter((theme) => !skill.includes(`\`${theme}\``))).toEqual([])
})

test("SKILL.md gives the layer order of layers.css", () => {
  const [order, sublayers, ...rest] = [
    ...read("css/layers.css").matchAll(/^@layer ([^;]+);$/gm),
  ].map(([, layers]) => layers)
  expect(rest).toEqual([])
  expect(skill).toContain(`cascade layers (\`${order}\`)`)
  expect(skill).toContain(`the sublayers \`${sublayers}\``)
})

describe("SKILL.md import advice", () => {
  const advice =
    skill
      .split("\n")
      .find((line) => line.includes('`@import "opui-css/css/imports.css"`')) ??
    ""

  test("lists the files in the order of imports.css", () => {
    const order = [
      ...read("css/imports.css").matchAll(/^@import "([^"]+)";$/gm),
    ].map(([, specifier]) => path.posix.join("css", specifier))
    const named = [...advice.matchAll(/`opui-css\/([\w/<>.-]+\.css)`/g)].map(
      ([, file]) =>
        file.replace("css/components/<name>.css", "css/components.css"),
    )
    expect(named).toEqual(order)
  })

  test("puts layers.css first and utils.css last", () => {
    expect(advice).toContain("`opui-css/css/layers.css` first")
    expect(advice).toContain("`opui-css/core/utils.css` last")
  })

  test("pairs choice.css with the controls it styles", () => {
    const controls = [
      ...new Set(
        [
          ...read("css/components/choice.css").matchAll(
            /\.ui-(checkbox|radio|switch)\b/g,
          ),
        ].map(([, name]) => `${name}.css`),
      ),
    ].toSorted()
    expect(controls).toEqual(["checkbox.css", "radio.css", "switch.css"])
    expect(advice).toContain(
      `(\`choice.css\` with ${or(controls.map((file) => `\`${file}\``))})`,
    )
  })
})

test("SKILL.md names only entry points the package exports", () => {
  const named = [
    ...new Set(
      [...skill.matchAll(/(?<![\w@/.-])opui-css\/([\w/<>.*-]+)/g)].map(
        ([, subpath]) => subpath.replace(/\.$/, ""),
      ),
    ),
  ].toSorted()
  expect(named.length).toBeGreaterThan(0)
  const missing = named.filter((subpath) => {
    if (subpath.endsWith("/")) {
      return !Object.keys(manifest.exports).some((key) =>
        key.startsWith(`./${subpath}`),
      )
    }
    const concrete = `./${subpath.replace(/<[^>]+>/g, "button")}`
    const target = Object.entries(manifest.exports).flatMap(([key, value]) => {
      const pattern = new RegExp(
        `^${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace("\\*", "(.+)")}$`,
      )
      const match = concrete.match(pattern)
      if (!match) return []
      const file = typeof value === "string" ? value : value.default
      return [file.replace("*", match[1] ?? "")]
    })[0]
    return !target || !existsSync(path.join(PACKAGE, target))
  })
  expect(missing).toEqual([])
})

test("SKILL.md names references that exist", () => {
  const named = [
    ...new Set(
      [...skill.matchAll(/`references\/([\w-]+\.md)`/g)].map(
        ([, file]) => file,
      ),
    ),
  ]
  expect(named.length).toBeGreaterThan(0)
  expect(named.filter((file) => !referenceFiles.includes(file))).toEqual([])
})

test("the references are files, not folders", () => {
  expect(
    references.filter((entry) => !entry.isFile()).map((entry) => entry.name),
  ).toEqual([])
})

test("every component page has a reference", () => {
  expect(
    pages.filter((page) => !referenceFiles.includes(`${page}.md`)),
  ).toEqual([])
})

test("no reference is orphaned", () => {
  const expected = new Set(
    [...pages, ...GUIDES, "index"].map((name) => `${name}.md`),
  )
  expect(referenceFiles.filter((file) => !expected.has(file))).toEqual([])
})

test("the index lists every component reference", () => {
  const index = readFileSync(path.join(REFERENCES, "index.md"), "utf8")
  expect(pages.filter((page) => !index.includes(`\`${page}.md\``))).toEqual([])
})
