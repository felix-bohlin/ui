import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const changelogPath = path.join(root, "packages/opui/CHANGELOG.md")
const packagePath = path.join(root, "packages/opui/package.json")

const fail = (message) => {
  console.error(message)
  process.exit(1)
}
const run = (command, args, cwd = root) =>
  execFileSync(command, args, { cwd, encoding: "utf8", stdio: "inherit" })
const read = (command, args) =>
  execFileSync(command, args, { cwd: root, encoding: "utf8" }).trim()

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"))
const bump = (level) => {
  const [major, minor, patch] = pkg.version.split(".").map(Number)
  if (level === "major") return `${major + 1}.0.0`
  if (level === "minor") return `${major}.${minor + 1}.0`
  return `${major}.${minor}.${patch + 1}`
}
const argument = process.argv[2]
if (!argument) {
  fail("Usage: node scripts/release.mjs <version | major | minor | patch>")
}
const version = /^(major|minor|patch)$/.test(argument)
  ? bump(argument)
  : argument
if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
  fail(`Not a version: ${version}`)
}

const branch = read("git", ["branch", "--show-current"])
if (branch !== "main") fail(`Release from main, not from ${branch}`)
if (read("git", ["status", "--porcelain"])) {
  fail("Commit or stash your changes first, the working tree isn't clean")
}
if (read("git", ["tag", "--list", version])) fail(`Tag ${version} exists`)

const heading = `## ${version} - Unreleased`
const changelog = fs.readFileSync(changelogPath, "utf8")
if (!changelog.includes(`\n${heading}\n`)) {
  fail(`packages/opui/CHANGELOG.md has no "${heading}" heading`)
}
const date = new Date().toISOString().slice(0, 10)
fs.writeFileSync(
  changelogPath,
  changelog.replace(`\n${heading}\n`, `\n## ${version} - ${date}\n`),
)
pkg.version = version
fs.writeFileSync(packagePath, `${JSON.stringify(pkg, null, 2)}\n`)

run("pnpm", ["check"])
run("git", ["add", "--all"])
run("git", ["commit", "--message", `chore: release ${version}`])
run("pnpm", ["publish", "--provenance"], path.join(root, "packages/opui"))
run("git", ["tag", "--annotate", version, "--message", version])
run("git", ["push", "--follow-tags"])

console.log(`Published opui-css@${version} and pushed the ${version} tag.`)
console.log(
  "Next: check the CDN URL and the docs deploy, write the GitHub release, then regenerate the released guards (RELEASING.md).",
)
