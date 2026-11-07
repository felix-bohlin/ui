import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { posix } from "node:path"
import { expect, test } from "vitest"

const tracked = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { encoding: "utf8" },
)
  .split("\n")
  .filter(Boolean)
const files = new Set(tracked)
const dirs = new Set(
  tracked.flatMap((file) =>
    file
      .split("/")
      .slice(0, -1)
      .map((_, index, parts) => parts.slice(0, index + 1).join("/")),
  ),
)
const top = new Set(tracked.map((file) => file.split("/")[0]))
const entries = [...files, ...[...dirs].map((dir) => `${dir}/`)]

const guides = tracked
  .filter(
    (file) =>
      file === "AGENTS.md" ||
      file.endsWith("/AGENTS.md") ||
      /^\.claude\/(agents|skills)\/.+\.md$/.test(file),
  )
  .toSorted((a, b) => a.localeCompare(b, "en"))

const ABSENT: Record<string, string[]> = {
  "packages/opui/components/AGENTS.md": ["types.d.vue.ts", "types.vue.ts"],
}

const EXTENSION =
  /\.(astro|css|diff|html|js|json|md|mjs|sh|svelte|ts|tsx|vue|yaml|yml)$/

const exists = (path: string) =>
  files.has(path) || dirs.has(path.replace(/\/$/, ""))

const escape = (text: string) => text.replace(/[.+?^$()|\\]/g, "\\$&")

const pattern = (path: string) => {
  let source = ""
  for (let index = 0; index < path.length; index++) {
    const char = path[index]
    if (char === "<" || char === "[") {
      index = path.indexOf(char === "<" ? ">" : "]", index)
      source += "[^/]+"
    } else if (char === "{") {
      const end = path.indexOf("}", index)
      const inner = path.slice(index + 1, end)
      source += inner.includes(",")
        ? `(?:${inner.split(",").map(escape).join("|")})`
        : "[^/]+"
      index = end
    } else if (path.startsWith("**", index)) {
      source += ".*"
      index += path[index + 2] === "/" ? 2 : 1
    } else if (char === "*") {
      source += "[^/]*"
    } else if (path.startsWith("...", index)) {
      source += ".*"
      index += 2
    } else {
      source += escape(char)
    }
  }
  return source
}

const matches = (path: string, rooted: boolean) => {
  const trail = path.endsWith("/") ? "" : "/?"
  const regex = new RegExp(
    `${rooted ? "^" : "(?:^|/)"}${pattern(path)}${trail}$`,
  )
  return entries.some((entry) => regex.test(entry))
}

const lineCount = (path: string) =>
  readFileSync(path, "utf8").trimEnd().split("\n").length

const headingSlugs = (path: string) =>
  readFileSync(path, "utf8")
    .replace(/^(`{3,})[\s\S]*?^\1/gm, "")
    .split("\n")
    .filter((line) => /^#{1,6} /.test(line))
    .map((line) =>
      line
        .replace(/^#+ /, "")
        .toLowerCase()
        .replace(/`/g, "")
        .replace(/[^\p{L}\p{N}\s_-]/gu, "")
        .replace(/\s/g, "-"),
    )

const problemsIn = (guide: string, source = readFileSync(guide, "utf8")) => {
  const absent = ABSENT[guide] ?? []
  const problems: string[] = []
  const text = source.replace(/^(\s*)(`{3,})[\s\S]*?^\s*\2\s*$/gm, (block) =>
    block.replace(/[^\n]/g, " "),
  )

  text.split("\n").forEach((line, index) => {
    const at = `${guide}:${index + 1}`

    for (const [, raw] of line.matchAll(/\]\(([^)\s]+)\)/g)) {
      const target = decodeURIComponent(raw)
      if (/^[a-z]+:/.test(target) || target.startsWith("/")) continue
      const [path, hash] = target.split("#")
      const resolved = path
        ? posix.normalize(posix.join(posix.dirname(guide), path))
        : guide
      if (!exists(resolved)) {
        problems.push(`${at} links to ${raw}, which resolves to ${resolved}`)
      } else if (
        hash &&
        resolved.endsWith(".md") &&
        !headingSlugs(resolved).includes(hash)
      ) {
        problems.push(`${at} links to #${hash}, no heading in ${resolved}`)
      }
    }

    const outsideLinks = line.replace(/\]\([^)\s]*\)/g, "]")
    for (const [, code] of outsideLinks.matchAll(/`([^`]+)`/g)) {
      for (const raw of code.split(/\s+/)) {
        let word = raw.replace(/^["'(]+|["'),;.]+$/g, "")
        const cite = word.match(/^(.+?):(\d+)(?:-(\d+))?$/)
        if (cite) word = cite[1]
        if (
          !word ||
          absent.includes(word) ||
          /^(https?:|\/|@|\$|-|#|\.\.?\/|path\/to\/)/.test(word) ||
          /^\.[a-z.]+$/.test(word)
        ) {
          continue
        }
        const rooted = top.has(word.split("/")[0])
        if (!rooted && !EXTENSION.test(word) && !word.endsWith("/")) continue
        if (!(rooted && exists(word)) && !matches(word, rooted)) {
          problems.push(`${at} names \`${word}\`, which matches no file`)
        } else if (cite && files.has(word)) {
          const count = lineCount(word)
          if (Number(cite[3] ?? cite[2]) > count) {
            problems.push(`${at} cites ${raw}, but ${word} has ${count} lines`)
          }
        }
      }
    }

    const prose = outsideLinks.replace(/`[^`]*`/g, "")
    for (let [word] of prose.matchAll(
      /(?<![\w/.@-])(?:\.claude|\.github|docs|packages|scripts|src|tests)\/[\w./<>[\]{},*-]*[\w/>\]}*]/g,
    )) {
      if (!word.includes("[")) word = word.replace(/\]$/, "")
      if (!exists(word) && !matches(word, true)) {
        problems.push(`${at} names ${word}, which matches no file`)
      }
    }
  })

  return problems
}

test("finds the guides", () => {
  expect(guides).toEqual(expect.arrayContaining(["AGENTS.md"]))
  expect(guides.length).toBeGreaterThan(4)
})

test.each(guides)("%s names files and headings that exist", (guide) => {
  expect(
    problemsIn(guide),
    "fix the path or drop the mention; a file a guide says must not exist goes in ABSENT",
  ).toEqual([])
})

test("the checker flags names, links and citations that don't resolve", () => {
  expect(
    problemsIn(
      "AGENTS.md",
      [
        "Run `scripts/nope.mjs` and read [the guide](nope.md).",
        "See `AGENTS.md:99999`, src/nope/file.ts and [Testing](AGENTS.md#no-such-heading).",
        "These exist: `TODO.md`, `scripts/todo.mjs`, [Testing](AGENTS.md#testing).",
      ].join("\n"),
    ),
  ).toEqual([
    "AGENTS.md:1 links to nope.md, which resolves to nope.md",
    "AGENTS.md:1 names `scripts/nope.mjs`, which matches no file",
    "AGENTS.md:2 links to #no-such-heading, no heading in AGENTS.md",
    expect.stringMatching(
      /^AGENTS\.md:2 cites AGENTS\.md:99999, but AGENTS\.md has \d+ lines$/,
    ),
    "AGENTS.md:2 names src/nope/file.ts, which matches no file",
  ])
})

test("ABSENT only lists names a guide still mentions and no file has", () => {
  expect(
    Object.entries(ABSENT).flatMap(([guide, names]) =>
      names.filter(
        (name) =>
          !readFileSync(guide, "utf8").includes(`\`${name}\``) ||
          tracked.some((file) => file.endsWith(`/${name}`)),
      ),
    ),
  ).toEqual([])
})
