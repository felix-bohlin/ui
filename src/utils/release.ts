import { readFileSync } from "node:fs"
import opui from "../../packages/opui/package.json" with { type: "json" }
import released from "../../tests/unit/released-api.json" with { type: "json" }

const numbers = (version: string) =>
  version.split("-")[0].split(".").map(Number)

export const newer = (version: string, than: string) => {
  const [a, b] = [numbers(version), numbers(than)]
  const index = a.findIndex((part, i) => part !== b[i])
  if (index !== -1) return a[index] > b[index]
  return than.includes("-") && !version.includes("-")
}

export const dated = (version: string, changelog: string) =>
  new RegExp(
    `^## ${version.replaceAll(".", "\\.")} - \\d{4}-\\d{2}-\\d{2}$`,
    "m",
  ).test(changelog)

export const isUnreleased = (
  version: string,
  published: string,
  changelog: string,
) => newer(version, published) && !dated(version, changelog)

export const packageVersion = opui.version
export const publishedVersion = released.version
export const releaseVersion = packageVersion.split("-")[0]
export const prerelease = packageVersion !== releaseVersion
export const majorPublished =
  numbers(packageVersion)[0] === numbers(publishedVersion)[0]
export const unreleased = isUnreleased(
  packageVersion,
  publishedVersion,
  readFileSync("packages/opui/CHANGELOG.md", "utf8"),
)
