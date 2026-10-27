import { execFileSync } from "node:child_process"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))
const CHANGELOG = "packages/opui/CHANGELOG.md"
const PACKAGE = "packages/opui/package.json"

const escape = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

export const unreleasedHeading = (version) => `## ${version} - Unreleased`

export const nextVersion = (current, level, changelog) => {
  const [base, pre] = current.split("-")
  const [major, minor, patch] = base.split(".").map(Number)
  if (level === "prerelease") {
    if (pre) return `${base}-rc.${Number(pre.match(/\d+$/)?.[0] ?? 0) + 1}`
    if (changelog.includes(`\n${unreleasedHeading(base)}\n`)) {
      return `${base}-rc.1`
    }
    return `${major}.${minor}.${patch + 1}-rc.1`
  }
  if (level === "major") {
    return pre && minor === 0 && patch === 0 ? base : `${major + 1}.0.0`
  }
  if (level === "minor") {
    return pre && patch === 0 ? base : `${major}.${minor + 1}.0`
  }
  return pre ? base : `${major}.${minor}.${patch + 1}`
}

export const isVersion = (version) => /^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)

export const distTag = (version) => (version.includes("-") ? "next" : "latest")

export const releaseTitle = (version) => `chore: release ${version}`

export const isReleaseSubject = (subject, version) =>
  new RegExp(`^${escape(releaseTitle(version))}( \\(#\\d+\\))?$`).test(subject)

export const releaseCommit = (log, version) =>
  log.find(({ subject }) => isReleaseSubject(subject, version))?.sha

export const isReady = (changelog, version) => {
  const [base] = version.split("-")
  return base === version
    ? new RegExp(`^## ${escape(version)} - \\d{4}-\\d{2}-\\d{2}$`, "m").test(
        changelog,
      )
    : changelog.includes(`\n${unreleasedHeading(base)}\n`)
}

export const repositorySlug = (url) =>
  url.match(/([^/:]+\/[^/]+?)(?:\.git)?\/?$/)?.[1]

const fail = (message) => {
  console.error(message)
  process.exit(1)
}
const run = (command, args, cwd = root) =>
  execFileSync(command, args, { cwd, encoding: "utf8", stdio: "inherit" })
const read = (command, args) =>
  execFileSync(command, args, { cwd: root, encoding: "utf8" }).trim()
const output = (values) => {
  if (!process.env.GITHUB_OUTPUT) return
  fs.appendFileSync(
    process.env.GITHUB_OUTPUT,
    Object.entries(values)
      .map(([key, value]) => `${key}=${value}\n`)
      .join(""),
  )
}
const onOrigin = (ref) => read("git", ["ls-remote", "origin", ref]) !== ""
const clean = () => {
  if (read("git", ["status", "--porcelain"])) {
    fail("Commit or stash your changes first, the working tree isn't clean")
  }
}

const prepare = (argument) => {
  const pkg = JSON.parse(fs.readFileSync(path.join(root, PACKAGE), "utf8"))
  const changelog = fs.readFileSync(path.join(root, CHANGELOG), "utf8")
  const version = /^(major|minor|patch|prerelease)$/.test(argument)
    ? nextVersion(pkg.version, argument, changelog)
    : argument
  if (!isVersion(version)) fail(`Not a version: ${version}`)
  const [base] = version.split("-")
  const prerelease = version !== base
  const branch = `release/${version}`

  const current = read("git", ["branch", "--show-current"])
  if (current !== "main") fail(`Release from main, not from ${current}`)
  clean()
  run("git", ["fetch", "--quiet", "origin", "main"])
  if (
    read("git", ["rev-parse", "HEAD"]) !==
    read("git", ["rev-parse", "origin/main"])
  ) {
    fail("main isn't up to date with origin/main, pull or push first")
  }
  if (
    read("git", ["tag", "--list", version]) ||
    onOrigin(`refs/tags/${version}`)
  ) {
    fail(`Tag ${version} exists`)
  }
  if (onOrigin(`refs/heads/${branch}`)) {
    fail(`${branch} exists on origin, merge or delete its pull request first`)
  }
  const heading = unreleasedHeading(base)
  if (!changelog.includes(`\n${heading}\n`)) {
    fail(`${CHANGELOG} has no "${heading}" heading`)
  }

  run("git", ["switch", "--quiet", "--create", branch])
  if (!prerelease) {
    const date = new Date().toISOString().slice(0, 10)
    fs.writeFileSync(
      path.join(root, CHANGELOG),
      changelog.replace(`\n${heading}\n`, `\n## ${version} - ${date}\n`),
    )
  }
  pkg.version = version
  fs.writeFileSync(
    path.join(root, PACKAGE),
    `${JSON.stringify(pkg, null, 2)}\n`,
  )

  try {
    run("pnpm", ["check"])
  } catch {
    fail(
      `pnpm check failed and nothing was pushed. Fix it on main, then run git switch --discard-changes main && git branch -D ${branch}`,
    )
  }
  run("git", ["add", "--all"])
  run("git", ["commit", "--quiet", "--message", releaseTitle(version)])
  run("git", ["push", "--quiet", "--set-upstream", "origin", branch])

  const repository =
    process.env.GITHUB_REPOSITORY ??
    repositorySlug(read("git", ["remote", "get-url", "origin"]))
  const compare = `${process.env.GITHUB_SERVER_URL ?? "https://github.com"}/${repository}/compare/main...${branch}?expand=1`
  const body = [
    `Releases \`opui-css@${version}\` to the \`${distTag(version)}\` dist-tag.`,
    "",
    `- CI runs \`check\` and \`e2e\` on this commit. If the checks are missing, run the CI workflow on \`${branch}\` from the Actions tab.`,
    "- Keep the branch up to date with `main`, so the commit that gets tagged is the one CI checked.",
    `- Merging tags the \`${releaseTitle(version)}\` commit \`${version}\` (the \`Release\` workflow)${prerelease ? "" : ", and the `After release` workflow opens the pull request with the released guards"}.`,
    `- The \`Publish\` workflow then publishes the tag to \`${distTag(version)}\` with provenance (RELEASING.md).`,
  ].join("\n")
  let url = ""
  try {
    url = read("gh", [
      "pr",
      "create",
      "--base",
      "main",
      "--head",
      branch,
      "--title",
      releaseTitle(version),
      "--body",
      body,
    ])
  } catch (error) {
    console.error(error.stderr?.trim() || error.message)
  }
  output({ branch, compare, pr: url, version })
  console.log(
    url
      ? `Opened ${url} for ${version}.`
      : `Pushed ${branch}. Open the pull request from ${compare}`,
  )
  console.log(
    `Next: merge it once CI is green. The Publish workflow publishes the ${version} tag (RELEASING.md).`,
  )
}

const tag = () => {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, PACKAGE), "utf8"),
  )
  if (onOrigin(`refs/tags/${version}`)) {
    console.log(`Tag ${version} exists, nothing to tag.`)
    return
  }
  const log = read("git", ["log", "--max-count=200", "--format=%H %s"])
    .split("\n")
    .map((line) => ({
      sha: line.slice(0, line.indexOf(" ")),
      subject: line.slice(line.indexOf(" ") + 1),
    }))
  const sha = releaseCommit(log, version)
  if (!sha) {
    console.log(`No "${releaseTitle(version)}" commit, nothing to tag.`)
    return
  }
  const released = JSON.parse(read("git", ["show", `${sha}:${PACKAGE}`]))
  if (released.version !== version) {
    fail(`${PACKAGE} says ${released.version} in ${sha}, not ${version}`)
  }
  if (!isReady(read("git", ["show", `${sha}:${CHANGELOG}`]), version)) {
    fail(
      `${CHANGELOG} in ${sha} doesn't have the heading release.mjs writes for ${version}`,
    )
  }
  run("git", ["tag", "--annotate", version, "--message", version, sha])
  run("git", ["push", "--quiet", "origin", `refs/tags/${version}`])
  output({ prerelease: String(version.includes("-")), version })
  console.log(`Tagged ${sha} as ${version} and pushed the tag.`)
}

const publish = () => {
  const { version } = JSON.parse(
    fs.readFileSync(path.join(root, PACKAGE), "utf8"),
  )
  if (process.env.GITHUB_ACTIONS !== "true") {
    fail(
      `The Publish workflow publishes ${version} once the ${version} tag is pushed (RELEASING.md)`,
    )
  }
  if (
    !read("git", ["tag", "--points-at", "HEAD"]).split("\n").includes(version)
  ) {
    fail(
      `Run the Publish workflow on the ${version} tag, not on ${process.env.GITHUB_REF_NAME}`,
    )
  }
  if (read("git", ["status", "--porcelain", "--", "packages/opui"])) {
    fail(
      "pnpm check changed packages/opui, so the tarball wouldn't match the tagged commit",
    )
  }
  const destination = fs.mkdtempSync(path.join(os.tmpdir(), "opui-css-"))
  run(
    "pnpm",
    ["pack", "--pack-destination", destination],
    path.join(root, "packages/opui"),
  )
  const [tarball] = fs.readdirSync(destination)
  run("npm", [
    "publish",
    path.join(destination, tarball),
    "--provenance",
    "--tag",
    distTag(version),
  ])
  console.log(`Published opui-css@${version} to ${distTag(version)}.`)
  console.log(
    version.includes("-")
      ? `Next: try it in fresh projects with npm install opui-css@next (docs/releases), then release ${version.split("-")[0]}.`
      : "Next: check the CDN URL and the docs deploy, write the GitHub release, and merge the released guards pull request that the After release workflow opens (RELEASING.md).",
  )
}

const main = () => {
  const argument = process.argv[2]
  if (argument === "publish") return publish()
  if (argument === "tag") return tag()
  if (!argument) {
    fail(
      "Usage: node scripts/release.mjs <version | major | minor | patch | prerelease | tag | publish>",
    )
  }
  prepare(argument)
}

if (
  process.argv[1] &&
  fs.realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
