import { execFileSync } from "node:child_process"
import { readdirSync, readFileSync, realpathSync } from "node:fs"
import { matchesGlob } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))

const USAGE = `Usage: node scripts/audit-scope.mjs [all | <agent>... | <component>...] [--base=<ref>]

  (none)        the agents whose paths the current changes touch, with those files
  all           every agent, with the components its paths cover
  <agent>...    only those agents, with the components their paths cover
  <component>...  the agents whose paths cover those components, with their files

The current changes are the diff against the merge base with --base (origin/main) plus untracked files.`

export const parseAgent = (source) => {
  const [, frontmatter = ""] =
    String(source).match(/^---\n([\s\S]*?)\n---\n/) ?? []
  const lines = frontmatter.split("\n")
  const value = (key) =>
    lines.find((line) => line.startsWith(`${key}: `))?.slice(key.length + 2)
  const start = lines.indexOf("paths:")
  const end = lines.findIndex(
    (line, index) => index > start && !line.startsWith("  - "),
  )
  return {
    description: value("description"),
    name: value("name"),
    paths:
      start < 0
        ? undefined
        : lines
            .slice(start + 1, end < 0 ? undefined : end)
            .map((line) => line.slice(4)),
    tools: value("tools"),
  }
}

export const readAgents = (dir = `${root}.claude/agents`) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .toSorted()
    .map((file) => ({
      file,
      ...parseAgent(readFileSync(`${dir}/${file}`, "utf-8")),
    }))

const kebab = (segment) =>
  segment
    .split(".")[0]
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()

export const componentsOf = (file, pages) => {
  const segments = file.split("/").map(kebab)
  return pages.filter((page) =>
    segments.some(
      (segment) =>
        segment === page ||
        (segment.startsWith(`${page}-`) && !pages.includes(segment)),
    ),
  )
}

export const scopeOf = ({ agents, files, pages, slugs }) =>
  agents
    .map(({ name, paths = [] }) => ({
      paths,
      files: files.filter(
        (file) =>
          paths.some((glob) => matchesGlob(file, glob)) &&
          (!slugs?.length || componentsOf(file, slugs).length),
      ),
      name,
    }))
    .filter(({ files }) => files.length)
    .map(({ files, name, paths }) => ({
      components: [
        ...new Set(files.flatMap((file) => componentsOf(file, pages))),
      ].toSorted(),
      files,
      name,
      paths,
    }))

const main = () => {
  const args = process.argv.slice(2)
  const base =
    args.find((arg) => arg.startsWith("--base="))?.slice(7) ?? "origin/main"
  const words = args.filter((arg) => !arg.startsWith("--"))
  const agents = readAgents()
  const pages = readdirSync(`${root}src/docs/components`)
    .filter((file) => file.endsWith(".astro"))
    .map((file) => file.slice(0, -".astro".length))
    .toSorted()
  const names = words.filter((word) => agents.some(({ name }) => name === word))
  const slugs = words.filter((word) => pages.includes(word))
  const unknown = words.filter(
    (word) => word !== "all" && !names.includes(word) && !slugs.includes(word),
  )
  if (unknown.length) {
    console.error(
      `${unknown.join(", ")}: not an agent (${agents.map(({ name }) => name).join(", ")}) or a component (${pages.join(", ")})\n\n${USAGE}`,
    )
    process.exitCode = 1
    return
  }
  const git = (...args) =>
    execFileSync("git", args, { cwd: root, encoding: "utf-8" })
      .split("\n")
      .filter(Boolean)
  const chosen = names.length
    ? agents.filter(({ name }) => names.includes(name))
    : agents
  if (!words.length) {
    let mergeBase
    try {
      ;[mergeBase] = git("merge-base", "HEAD", base)
    } catch {
      console.error(
        `No merge base with ${base}: run git fetch origin main, and git fetch --unshallow in a shallow clone.`,
      )
      process.exitCode = 1
      return
    }
    const files = [
      ...new Set([
        ...git("diff", "--name-only", "--no-renames", mergeBase),
        ...git("ls-files", "--others", "--exclude-standard"),
      ]),
    ].toSorted()
    console.log(
      JSON.stringify(
        { agents: scopeOf({ agents, files, pages }), base: mergeBase },
        null,
        2,
      ),
    )
    return
  }
  const scope = scopeOf({
    agents: chosen,
    files: git("ls-files"),
    pages,
    slugs,
  })
  console.log(
    JSON.stringify(
      {
        agents: slugs.length
          ? scope
          : scope.map(({ components, name, paths }) => ({
              components,
              name,
              paths,
            })),
      },
      null,
      2,
    ),
  )
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
