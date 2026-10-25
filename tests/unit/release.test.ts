import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import opui from "../../packages/opui/package.json"
import released from "./released-api.json"
import {
  dated,
  isUnreleased,
  newer,
  packageVersion,
  prerelease,
  publishedVersion,
  releaseVersion,
  unreleased,
} from "../../src/utils/release"

const changelog = [
  "# Changelog",
  "",
  "## 6.0.0 - Unreleased",
  "",
  "## 5.4.3 - 2025-11-02",
].join("\n")

describe("newer", () => {
  test.each([
    ["6.0.0", "5.4.3", true],
    ["5.4.4", "5.4.3", true],
    ["5.10.0", "5.9.0", true],
    ["6.0.0-rc.1", "5.4.3", true],
    ["6.0.0", "6.0.0-rc.1", true],
    ["5.4.3", "5.4.3", false],
    ["5.4.2", "5.4.3", false],
    ["6.0.0-rc.1", "6.0.0", false],
  ])("%s is newer than %s: %s", (version, than, expected) => {
    expect(newer(version, than)).toBe(expected)
  })
})

describe("dated", () => {
  test("finds a dated heading", () => {
    expect(dated("5.4.3", changelog)).toBe(true)
  })

  test("skips an unreleased heading", () => {
    expect(dated("6.0.0", changelog)).toBe(false)
  })

  test("matches the whole version", () => {
    expect(dated("5.4", changelog)).toBe(false)
    expect(dated("5x4x3", changelog)).toBe(false)
  })
})

describe("isUnreleased", () => {
  test("a version newer than the published one without a date", () => {
    expect(isUnreleased("6.0.0", "5.4.3", changelog)).toBe(true)
  })

  test("a release candidate of the next version", () => {
    expect(isUnreleased("6.0.0-rc.1", "5.4.3", changelog)).toBe(true)
  })

  test("a version the release script dated, before the guards catch up", () => {
    expect(
      isUnreleased(
        "6.0.0",
        "5.4.3",
        changelog.replace("6.0.0 - Unreleased", "6.0.0 - 2026-11-01"),
      ),
    ).toBe(false)
  })

  test("the published version", () => {
    expect(isUnreleased("5.4.3", "5.4.3", changelog)).toBe(false)
  })
})

test("reads the package and the released guards", () => {
  expect(packageVersion).toBe(opui.version)
  expect(publishedVersion).toBe(released.version)
  expect(releaseVersion).toBe(opui.version.split("-")[0])
  expect(prerelease).toBe(opui.version.includes("-"))
  expect(unreleased).toBe(
    isUnreleased(
      opui.version,
      released.version,
      readFileSync("packages/opui/CHANGELOG.md", "utf8"),
    ),
  )
})
