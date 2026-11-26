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

test("components.css lists every stylesheet once, in one of the three groups", () => {
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

const BUILDS_ON: Record<string, string> = {
  "one-time-code.css": "text-field.css",
}

const orderProblems = (list: { files: string[]; group: string }[]) =>
  list.flatMap(({ files, group }) => {
    const rest = files.filter((file) => !(file in BUILDS_ON))
    return [
      ...(rest.join() === rest.toSorted().join()
        ? []
        : [`${group}: import ${rest.toSorted().join(", ")} in that order`]),
      ...Object.entries(BUILDS_ON)
        .filter(([file]) => files.includes(file))
        .filter(
          ([file, base]) => files.indexOf(file) !== files.indexOf(base) + 1,
        )
        .map(
          ([file, base]) =>
            `${group}: import ${file} right after ${base}, so its rules on the same elements win the ties with ${base} without repeating a class`,
        ),
    ]
  })

test("the import order check flags a sample out of order", () => {
  expect(
    orderProblems([
      {
        files: [
          "one-time-code.css",
          "select.css",
          "list.css",
          "text-field.css",
        ],
        group: "Extended components",
      },
    ]),
  ).toEqual([
    "Extended components: import list.css, select.css, text-field.css in that order",
    "Extended components: import one-time-code.css right after text-field.css, so its rules on the same elements win the ties with text-field.css without repeating a class",
  ])
})

test("each group imports its stylesheets in ascending order, and a stylesheet that builds on another right after it", () => {
  expect(orderProblems(groups)).toEqual([])
})
