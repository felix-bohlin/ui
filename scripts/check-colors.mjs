import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))

const GENERATED = JSON.parse(
  readFileSync(join(root, "scripts/generated-files.json"), "utf-8"),
)

const SKIPPED = ["tests/"]

const CODE = /\.(?:cjs|css|js|json|mjs|svg|ts|tsx)$/
const MARKUP = /\.(?:astro|html|svelte|vue)$/
const MARKDOWN = /\.mdx?$/

const COLOR =
  /(?<![\w&#./[\\-])#(?:[\da-f]{8}|[\da-f]{6}|[\da-f]{3,4})(?![\w-])|\b(?:hsla?|hwb|lab|lch|rgba?)\((?!\s*\))/gi

const blank = (text) => text.replace(/[^\n]/g, " ")

const withoutComments = (text) =>
  text
    .replace(/\/\*[\s\S]*?\*\//g, blank)
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/(?<![:"'`\w/\\])\/\/[^\n]*/g, blank)

const keep = (text, patterns) => {
  const kept = Array.from(text, (char) => (char === "\n" ? "\n" : " "))
  for (const pattern of patterns) {
    for (const match of text.matchAll(pattern)) {
      for (let index = 0; index < match[0].length; index++) {
        kept[match.index + index] = text[match.index + index]
      }
    }
  }
  return kept.join("")
}

const MARKUP_PARTS = [
  /^---\n[\s\S]*?\n---/g,
  /<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,
  /\sstyle=(?:"[^"]*"|'[^']*'|\{[^}]*\})/gi,
  /\s(?:bgcolor|color|fill|flood-color|lighting-color|stop-color|stroke)=(?:"[^"]*"|'[^']*'|\{[^}]*\})/gi,
]

const MARKDOWN_PARTS = [/```[\s\S]*?```/g, /`[^`\n]+`/g]

const unreleased = (file, text) => {
  if (!file.endsWith("CHANGELOG.md")) return text
  const released = text.search(/^## .* - \d{4}-\d{2}-\d{2}\s*$/m)
  return released === -1 ? text : text.slice(0, released)
}

const checked = (file, text) => {
  if (CODE.test(file)) return withoutComments(text)
  if (MARKUP.test(file)) return keep(withoutComments(text), MARKUP_PARTS)
  if (MARKDOWN.test(file)) {
    return keep(
      unreleased(file, text).replace(/<!--[\s\S]*?-->/g, blank),
      MARKDOWN_PARTS,
    )
  }
  return null
}

const files = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  { cwd: root, encoding: "utf8" },
)
  .split("\n")
  .filter(
    (file) =>
      file &&
      !GENERATED.some((path) => file === path || file.startsWith(`${path}/`)) &&
      !SKIPPED.some((path) => file.startsWith(path)),
  )

const problems = files.flatMap((file) => {
  let text
  try {
    text = readFileSync(join(root, file), "utf8")
  } catch {
    return []
  }
  const source = checked(file, text)
  if (source === null) return []
  return [...source.matchAll(COLOR)].map((match) => {
    const line = source.slice(0, match.index).split("\n").length
    const found = match[0].endsWith("(") ? `${match[0]}...)` : match[0]
    return `${file}:${line}: ${found}`
  })
})

if (problems.length > 0) {
  console.error(problems.join("\n"))
  console.error(
    `\n${problems.length} color(s) not in OKLCH. Write them as oklch().`,
  )
  process.exit(1)
}

console.log("Every color is OKLCH.")
