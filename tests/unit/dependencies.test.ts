import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { expect, test } from "vitest"

const PINNED = ["@playwright/test"]

const pinned = (manifest: string, versions: Record<string, string>) =>
  Object.entries(versions)
    .filter(
      ([name, version]) =>
        !PINNED.includes(name) &&
        /^[=v]?\d+\.\d+\.\d+(?:[-+][\w.-]+)?$/.test(version),
    )
    .map(([name, version]) => `${manifest}: ${name} ${version}`)

const manifests = execFileSync(
  "git",
  ["ls-files", "package.json", "**/package.json"],
  {
    encoding: "utf-8",
  },
)
  .split("\n")
  .filter(Boolean)

const catalogOf = (yaml: string) =>
  [
    ...[...yaml.matchAll(/^catalogs?:\n((?:[ \t]+.*\n?)+)/gm)]
      .map(([, block]) => block)
      .join("\n")
      .matchAll(/^[ \t]+["']?([^"':\s]+)["']?:[ \t]*["']?([^"'\s#]+)/gm),
  ].map(([, name, version]) => ({ [name]: version }))

const catalog = catalogOf(readFileSync("pnpm-workspace.yaml", "utf8"))

test("the check flags an exact version", () => {
  expect(
    pinned("package.json", { a: "1.2.3", b: "^1.2.3", c: "catalog:" }),
  ).toEqual(["package.json: a 1.2.3"])
  expect(
    catalogOf(
      "catalog:\n  a: \"1.2.3\"\n  b: ^1.2.3\n  c: '1.2.3'\n\ncatalogs:\n  legacy:\n    a: 1.2.3\n",
    ).flatMap((versions) => pinned("catalog", versions)),
  ).toEqual(["catalog: a 1.2.3", "catalog: c 1.2.3", "catalog: a 1.2.3"])
})

test("no dependency is pinned to an exact version", () => {
  expect(manifests.length).toBeGreaterThan(0)
  expect(catalog.length).toBeGreaterThan(0)
  expect(
    [
      ...manifests.flatMap((manifest) => {
        const pkg = JSON.parse(readFileSync(manifest, "utf8"))
        return [
          "dependencies",
          "devDependencies",
          "optionalDependencies",
          "peerDependencies",
        ].flatMap((field) => pinned(manifest, pkg[field] ?? {}))
      }),
      ...catalog.flatMap((versions) =>
        pinned("pnpm-workspace.yaml catalog", versions),
      ),
    ],
    `use a ^ range, so the dependency takes minor and patch updates. Only ${PINNED.join(", ")} is pinned, to the version of the CI container (tests/unit/playwright.test.ts)`,
  ).toEqual([])
})
