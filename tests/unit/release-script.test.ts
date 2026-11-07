import { describe, expect, test } from "vitest"
import {
  distTag,
  isReady,
  isReleaseSubject,
  isVersion,
  nextVersion,
  releaseCommit,
  releaseTitle,
  repositorySlug,
} from "../../scripts/release.mjs"

const changelog = [
  "# Changelog",
  "",
  "## 6.0.0 - Unreleased",
  "",
  "## 5.4.3 - 2025-11-02",
  "",
].join("\n")

describe("nextVersion", () => {
  test.each([
    ["5.4.3", "patch", "5.4.4"],
    ["5.4.3", "minor", "5.5.0"],
    ["5.4.3", "major", "6.0.0"],
    ["6.0.0", "prerelease", "6.0.0-rc.1"],
    ["5.4.3", "prerelease", "5.4.4-rc.1"],
    ["6.0.0-rc.1", "prerelease", "6.0.0-rc.2"],
    ["6.0.0-rc.2", "patch", "6.0.0"],
    ["6.0.0-rc.2", "minor", "6.0.0"],
    ["6.0.0-rc.2", "major", "6.0.0"],
    ["6.1.0-rc.1", "major", "7.0.0"],
  ])("%s with %s gives %s", (current, level, expected) => {
    expect(nextVersion(current, level, changelog)).toBe(expected)
  })
})

describe("isVersion", () => {
  test.each([
    ["6.0.0", true],
    ["6.0.0-rc.1", true],
    ["v6.0.0", false],
    ["6.0", false],
    ["latest", false],
  ])("%s: %s", (version, expected) => {
    expect(isVersion(version)).toBe(expected)
  })
})

test("a candidate goes to next, a release to latest", () => {
  expect(distTag("6.0.0-rc.1")).toBe("next")
  expect(distTag("6.0.0")).toBe("latest")
})

describe("isReleaseSubject", () => {
  test.each([
    ["chore: release 6.0.0", true],
    ["chore: release 6.0.0 (#412)", true],
    ["chore: release 6.0.0-rc.1", false],
    ["chore: release 6x0x0", false],
    ["Merge pull request #412 from felix-bohlin/release/6.0.0", false],
    ["fix: chore: release 6.0.0", false],
  ])("%s: %s", (subject, expected) => {
    expect(isReleaseSubject(subject, "6.0.0")).toBe(expected)
  })
})

describe("releaseCommit", () => {
  const log = [
    {
      sha: "c3",
      subject: "Merge pull request #412 from felix-bohlin/release/6.0.0",
    },
    { sha: "c2", subject: "feat: something merged meanwhile" },
    { sha: "c1", subject: releaseTitle("6.0.0") },
    { sha: "c0", subject: releaseTitle("6.0.0-rc.1") },
  ]

  test("finds the release commit behind a merge commit", () => {
    expect(releaseCommit(log, "6.0.0")).toBe("c1")
  })

  test("finds a candidate's commit", () => {
    expect(releaseCommit(log, "6.0.0-rc.1")).toBe("c0")
  })

  test("finds nothing for a version without a release commit", () => {
    expect(releaseCommit(log, "6.0.1")).toBeUndefined()
  })
})

describe("isReady", () => {
  test("a release needs its dated heading", () => {
    expect(isReady(changelog, "6.0.0")).toBe(false)
    expect(
      isReady(
        changelog.replace("6.0.0 - Unreleased", "6.0.0 - 2026-11-01"),
        "6.0.0",
      ),
    ).toBe(true)
  })

  test("a candidate needs the unreleased heading of its version", () => {
    expect(isReady(changelog, "6.0.0-rc.1")).toBe(true)
    expect(isReady(changelog, "6.1.0-rc.1")).toBe(false)
  })
})

describe("repositorySlug", () => {
  test.each([
    ["https://github.com/felix-bohlin/ui", "felix-bohlin/ui"],
    ["https://github.com/felix-bohlin/ui.git", "felix-bohlin/ui"],
    ["git@github.com:felix-bohlin/ui.git", "felix-bohlin/ui"],
    ["http://proxy@127.0.0.1:8080/git/felix-bohlin/ui", "felix-bohlin/ui"],
  ])("%s", (url, expected) => {
    expect(repositorySlug(url)).toBe(expected)
  })
})
