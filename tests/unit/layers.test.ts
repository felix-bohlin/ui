import { readFileSync, readdirSync } from "node:fs"
import { expect, test } from "vitest"

const ALLOWED: Record<string, string[]> = {
  "Extended components": ["components.extended", "components.root"],
  "Root components": ["components.prose", "components.root"],
  Utilities: ["utils"],
}

const groups = [
  ...readFileSync("packages/opui/css/components.css", "utf8").matchAll(
    /\/\*\*\* ([^(]+?) \(([^)]*)\)\s*\*\/\n((?:@import "[^"]+";\n)+)/g,
  ),
].map(([, group, layers, imports]) => ({
  files: [...imports.matchAll(/@import "\.\/components\/([^"]+)";/g)].map(
    ([, file]) => file,
  ),
  group,
  layers: layers.split(", "),
}))

const layersOf = (file: string) =>
  new Set(
    [
      ...readFileSync(`packages/opui/css/components/${file}`, "utf8").matchAll(
        /^@layer ([\w.]+) \{/gm,
      ),
    ].map(([, layer]) => layer),
  )

test("components.css lists every stylesheet once, in one of the four groups", () => {
  expect(groups.map((group) => group.group).toSorted()).toEqual(
    Object.keys(ALLOWED),
  )
  for (const group of groups) {
    expect(group.layers, group.group).toEqual(ALLOWED[group.group])
  }
  const listed = groups.flatMap((group) => group.files)
  expect(listed.toSorted()).toEqual(
    readdirSync("packages/opui/css/components")
      .filter((file) => file.endsWith(".css"))
      .toSorted(),
  )
  expect(new Set(listed).size).toBe(listed.length)
})

test("each stylesheet declares only the layers its group allows", () => {
  const problems = groups.flatMap((group) =>
    group.files.flatMap((file) => {
      const layers = [...layersOf(file)]
      expect(layers.length, file).toBeGreaterThan(0)
      return layers
        .filter((layer) => !ALLOWED[group.group].includes(layer))
        .map((layer) => `${file} declares ${layer} in ${group.group}`)
    }),
  )
  expect(problems).toEqual([])
})
