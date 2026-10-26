import { readFileSync, readdirSync } from "node:fs"
import ts from "typescript"
import { features } from "web-features"
import { expect, test } from "vitest"
import { posts } from "../../src/utils/learn-posts"

const REGISTRY = "src/utils/learn-posts.ts"
const BUILDS = "src/components/UnderTheHood"

const sorted = (items: string[]) =>
  items.join() === items.toSorted().join() &&
  new Set(items).size === items.length

const registryProblems = (source: string) => {
  const file = ts.createSourceFile(REGISTRY, source, ts.ScriptTarget.Latest)
  const arrays: ts.ArrayLiteralExpression[] = []
  const visit = (node: ts.Node) => {
    if (ts.isArrayLiteralExpression(node)) arrays.push(node)
    else ts.forEachChild(node, visit)
  }
  visit(file)
  const entries = arrays[0].elements.filter(ts.isObjectLiteralExpression)
  const problems: string[] = []
  const rows = entries.map((entry) => {
    const properties = entry.properties.filter(ts.isPropertyAssignment)
    const keys = properties.map((property) => property.name.getText(file))
    const value = (key: string) =>
      properties.find((property) => property.name.getText(file) === key)
        ?.initializer
    const text = (key: string) => {
      const node = value(key)
      return node && ts.isStringLiteral(node) ? node.text : ""
    }
    const list = (key: string) => {
      const node = value(key)
      return node && ts.isArrayLiteralExpression(node)
        ? node.elements.filter(ts.isStringLiteral).map(({ text }) => text)
        : []
    }
    const slug = text("slug")
    if (!sorted(keys)) {
      problems.push(`${slug}: sort the keys (${keys.toSorted().join(", ")})`)
    }
    for (const key of ["features", "topics"]) {
      if (!sorted(list(key))) {
        problems.push(
          `${slug}: sort ${key} without duplicates (${[...new Set(list(key))].toSorted().join(", ")})`,
        )
      }
    }
    return { component: text("component"), slug }
  })
  const order = rows.map(({ slug }) => slug)
  const expected = rows
    .toSorted(
      (a, b) =>
        a.component.localeCompare(b.component, "en") ||
        a.slug.localeCompare(b.slug, "en"),
    )
    .map(({ slug }) => slug)
  if (order.join() !== expected.join()) {
    problems.push(
      `order the posts by component, then slug, with the posts without a component first: ${expected.join(", ")}`,
    )
  }
  return problems
}

const unknownFeatures = (ids: string[]) =>
  ids
    .filter((id) => features[id]?.kind !== "feature")
    .map((id) => {
      const entry = features[id]
      return entry && "redirect_target" in entry
        ? `"${id}" moved to "${entry.redirect_target}"`
        : `"${id}" is not a web-features id`
    })

const stepFeatures = readdirSync(BUILDS)
  .filter((file) => file.endsWith("Build.astro"))
  .toSorted()
  .flatMap((file) =>
    [
      ...readFileSync(`${BUILDS}/${file}`, "utf8").matchAll(
        /\bfeatures:\s*\[([^\]]*)\]/g,
      ),
    ].flatMap(([, ids]) =>
      [...ids.matchAll(/"([^"]+)"/g)].map(([, id]) => `${file}: ${id}`),
    ),
  )

test("the Learn registry is in order", () => {
  expect(posts.length).toBeGreaterThan(10)
  expect(registryProblems(readFileSync(REGISTRY, "utf8"))).toEqual([])
})

test("every post and Under the hood step names web-features ids", () => {
  expect(stepFeatures.length).toBeGreaterThan(50)
  expect(
    [
      ...posts.flatMap((post) =>
        unknownFeatures(post.features ?? []).map(
          (problem) => `${post.slug}: ${problem}`,
        ),
      ),
      ...stepFeatures.flatMap((entry) => {
        const [file, id] = entry.split(": ")
        return unknownFeatures([id]).map((problem) => `${file}: ${problem}`)
      }),
    ].toSorted(),
  ).toEqual([])
})

test("the registry checks catch unsorted posts, keys and lists, and unknown ids", () => {
  expect(
    registryProblems(`export const posts = [
      { component: "tabs", slug: "tabs-radio", topics: ["selectors", "layout"] },
      { slug: "accordion-auto", component: "accordion", features: ["has", "has"] },
    ]`),
  ).toEqual([
    "tabs-radio: sort topics without duplicates (layout, selectors)",
    "accordion-auto: sort the keys (component, features, slug)",
    "accordion-auto: sort features without duplicates (has)",
    "order the posts by component, then slug, with the posts without a component first: accordion-auto, tabs-radio",
  ])
  expect(unknownFeatures(["display-grid-lanes", "has", "no-such-id"])).toEqual([
    '"display-grid-lanes" moved to "grid-lanes"',
    '"no-such-id" is not a web-features id',
  ])
})
