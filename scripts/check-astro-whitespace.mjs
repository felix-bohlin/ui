import { globSync, readFileSync, writeFileSync } from "node:fs"

const INLINE_TAGS = [
  "a",
  "abbr",
  "Anchor",
  "b",
  "Badge",
  "Chip",
  "cite",
  "code",
  "dfn",
  "DocLink",
  "em",
  "i",
  "kbd",
  "mark",
  "q",
  "s",
  "samp",
  "small",
  "span",
  "strong",
  "sub",
  "sup",
  "time",
  "u",
  "var",
]
const BLOCK_START =
  /^<\/?(article|aside|blockquote|br|button|dd|details|div|dl|dt|fieldset|figcaption|figure|footer|form|Fragment|h[1-6]|header|hgroup|hr|iframe|img|input|label|legend|li|main|menu|nav|ol|option|p|path|pre|script|section|select|slot|style|summary|svg|table|tbody|td|template|textarea|th|thead|tr|ul|video)\b/
const ENDS_WITH_TEXT = /[\p{L}\p{N}.,;:!?)'"’…]$/u
const ENDS_WITH_INLINE = new RegExp(`</(${INLINE_TAGS.join("|")})>$`)
const STARTS_WITH_INLINE = new RegExp(
  `^<(${INLINE_TAGS.join("|")})[\\s>/]|^<(${INLINE_TAGS.join("|")})$`,
)
const STARTS_WITH_TEXT = /^[\p{L}\p{N}(“"'‘]/u

const fix = process.argv.includes("--fix")
const files = [
  ...globSync("src/**/*.astro"),
  ...globSync("packages/opui/components/**/*.astro"),
].toSorted()
const problems = []

for (const file of files) {
  const lines = readFileSync(file, "utf8").split("\n")
  const start = lines[0] === "---" ? lines.indexOf("---", 1) + 1 : 0
  let block = null
  let depth = 0
  let inTag = false
  let inTemplate = false
  let changed = false

  for (let index = start; index < lines.length - 1; index++) {
    const line = lines[index]
    if (block) {
      if (line.includes(`</${block}>`)) block = null
      continue
    }
    const opened = line.match(/<(pre|script|style)\b/)
    if (opened && !line.includes(`</${opened[1]}>`)) {
      block = opened[1]
      continue
    }
    if ((line.match(/`/g) ?? []).length % 2) {
      inTemplate = !inTemplate
      continue
    }
    if (inTemplate) continue

    const depthBefore = depth
    for (const char of line.replace(/"[^"]*"|'[^']*'/g, "")) {
      if (char === "{") depth++
      if (char === "}") depth--
    }
    const markup = line.replace(/"[^"]*"|'[^']*'|\{[^{}]*\}/g, "")
    const tagWasOpen = inTag
    const lastOpen = markup.lastIndexOf("<")
    const lastClose = markup.lastIndexOf(">")
    if (lastOpen > lastClose) inTag = true
    else if (lastClose > -1) inTag = false
    if (
      depthBefore > 0 ||
      depth > 0 ||
      inTag ||
      (tagWasOpen && lastClose === -1)
    )
      continue

    const current = line.trimEnd()
    const next = lines[index + 1].trim()
    if (!current.trim() || !next || current.endsWith('{" "}')) continue

    const textThenInline =
      ENDS_WITH_TEXT.test(current) &&
      !/[>}]$/.test(current) &&
      STARTS_WITH_INLINE.test(next)
    const inlineThenText =
      ENDS_WITH_INLINE.test(current) &&
      STARTS_WITH_TEXT.test(next) &&
      !BLOCK_START.test(next)
    if (!textThenInline && !inlineThenText) continue

    problems.push(`${file}:${index + 1}: ${current.trim()} ⏎ ${next}`)
    if (fix) {
      lines[index] = `${current}{" "}`
      changed = true
    }
  }

  if (changed) writeFileSync(file, lines.join("\n"))
}

if (problems.length > 0 && !fix) {
  console.error(
    `${problems.length} line breaks between text and inline elements render without a space. Add {" "} at the end of the line, or run with --fix:\n${problems.join("\n")}`,
  )
  process.exit(1)
}

console.log(
  fix
    ? `Added {" "} to ${problems.length} line breaks.`
    : `Checked ${files.length} Astro files.`,
)
