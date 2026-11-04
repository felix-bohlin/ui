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

const catalog = Object.fromEntries(
  [
    ...(
      readFileSync("pnpm-workspace.yaml", "utf8").match(
        /^catalog:\n((?:[ \t]+.*\n?)+)/m,
      )?.[1] ?? ""
    ).matchAll(/^[ \t]+"?([^":\s]+)"?:[ \t]*(\S+)/gm),
  ].map(([, name, version]) => [name, version]),
)

test("the check flags an exact version", () => {
  expect(
    pinned("package.json", { a: "1.2.3", b: "^1.2.3", c: "catalog:" }),
  ).toEqual(["package.json: a 1.2.3"])
})

test("no dependency is pinned to an exact version", () => {
  expect(manifests.length).toBeGreaterThan(0)
  expect(Object.keys(catalog).length).toBeGreaterThan(0)
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
      ...pinned("pnpm-workspace.yaml catalog", catalog),
    ],
    `use a ^ range, so the dependency takes minor and patch updates. Only ${PINNED.join(", ")} is pinned, to the version of the CI container (tests/unit/playwright.test.ts)`,
  ).toEqual([])
})
