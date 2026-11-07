export const RENAME_KINDS = [
  "class",
  "custom property",
  "import",
  "prop",
  "slot",
  "token",
] as const

export type RenameKind = (typeof RENAME_KINDS)[number]

export type Rename = {
  from: string
  kind: RenameKind
  scope?: string
  sections: { anchor: string; title: string }[]
  to: string
}

type Pair = { from: string; kind: RenameKind; scope?: string; to: string }

const CODE = "`[^`]+`"
const LIST = `${CODE}(?:(?:, | and )${CODE})*`
const BEFORE = new RegExp(
  `(${LIST})(?: \\((${CODE})\\))?(?: (?:in|on) ${CODE})?(?: (?:class|prop|slot))?$`,
)
const AFTER = new RegExp(`^(${LIST})(?: \\((${CODE})\\))?`)
const KEYWORD = / (?:is now|is|are|replaces?|instead of) /g
const GONE_USE = new RegExp(
  `(${CODE})(?: \\([^)]*\\))? is gone\\. Use (${CODE})(?=\\.| like)`,
  "g",
)
const NO_LONGER_TAKES = new RegExp(
  `no longer takes (${CODE})\\. Use (${CODE})(?: \\((${CODE})\\))?`,
  "g",
)

export const anchorOf = (heading: string) =>
  heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const codes = (list: string) =>
  [...list.matchAll(/`([^`]+)`/g)].map(([, code]) => code)

const kindOf = (name: string, slotContext: boolean) => {
  if (name.startsWith("--_")) return "custom property"
  if (name.startsWith("--")) return "token"
  if (name.startsWith(".ui-")) return "class"
  if (/^[A-Z][A-Za-z]*(\.[A-Z][A-Za-z]*)?$/.test(name)) return "import"
  if (/^[\w./-]+\.(astro|css|js|ts)$/.test(name)) return "import"
  if (/^[a-z]+(-[a-z]+)+$/.test(name)) return "slot"
  if (/^[a-z][A-Za-z]*(="[^"]*")?$/.test(name)) {
    return slotContext ? "slot" : "prop"
  }
  return undefined
}

const pairOf = (
  from: string,
  to: string,
  slotContext: boolean,
  scope?: string,
): Pair | undefined => {
  if (from === to) return undefined
  const fromKind = kindOf(from, slotContext)
  const toKind = kindOf(to, slotContext)
  if (!fromKind || !toKind) return undefined
  if (fromKind === "token" && toKind === "custom property") {
    return { from, kind: "custom property", scope, to }
  }
  if (fromKind === "custom property" && toKind === "token") {
    return { from, kind: "token", scope, to }
  }
  if (fromKind !== toKind) return undefined
  if (
    toKind === "token" &&
    (from.startsWith("--ui-") || !to.startsWith("--ui-"))
  )
    return undefined
  return { from, kind: toKind, scope, to }
}

const zip = (
  from: string[],
  to: string[],
  slotContext: boolean,
  scope?: string,
) =>
  from.length === to.length
    ? from
        .map((name, index) => pairOf(name, to[index], slotContext, scope))
        .filter((pair) => pair !== undefined)
    : []

const parseTable = (lines: string[]) => {
  const cells = (line: string) =>
    line
      .slice(1, -1)
      .split("|")
      .map((cell) => cell.trim())
  const header = cells(lines[0]).map((cell) => cell.toLowerCase())
  const fromIndex = header.findIndex((cell) => cell === "v5" || cell === "old")
  const toIndex = header.findIndex((cell) => cell === "v6" || cell === "new")
  const scopeIndex = header.indexOf("component")
  const pairs: Pair[] = []
  const unparsed: string[] = []
  if (fromIndex === -1 || toIndex === -1) return { pairs, unparsed: [lines[0]] }
  for (const line of lines.slice(2)) {
    const row = cells(line)
    const from = row[fromIndex].match(AFTER)
    const to = row[toIndex].match(AFTER)
    if (row[toIndex].startsWith("removed")) continue
    const scope = scopeIndex === -1 ? undefined : row[scopeIndex]
    const found =
      from && to ? zip(codes(from[1]), codes(to[1]), false, scope) : []
    if (found.length === 0) unparsed.push(line)
    pairs.push(...found)
  }
  return { pairs, unparsed }
}

const parseProse = (paragraph: string) => {
  const pairs: Pair[] = []
  let text = paragraph
  const consume = (names: string[]) => {
    for (const name of names) {
      text = text.replace(`\`${name}\``, "#".repeat(name.length + 2))
    }
  }
  const slotContext = (index: number) =>
    /slot/.test(
      text
        .slice(0, index)
        .split(/[.:;] /)
        .at(-1) ?? "",
    )
  for (const match of paragraph.matchAll(KEYWORD)) {
    const index = match.index
    const before = text.slice(0, index).match(BEFORE)
    const after = text.slice(index + match[0].length).match(AFTER)
    if (!before || !after) continue
    const left = codes(before[1])
    const right = codes(after[1]).slice(0, left.length)
    if (right.length !== left.length) continue
    const swap = /^(?:instead of|replaces?)$/.test(match[0].trim())
    const [from, to] = swap ? [right, left] : [left, right]
    const found = zip(from, to, slotContext(index))
    if (before[2] && after[2]) {
      const parenthesized = pairOf(
        swap ? after[2].slice(1, -1) : before[2].slice(1, -1),
        swap ? before[2].slice(1, -1) : after[2].slice(1, -1),
        slotContext(index),
      )
      if (parenthesized) found.push(parenthesized)
    }
    if (found.length > 0) consume([...left, ...right])
    pairs.push(...found)
  }
  for (const [, from, to] of paragraph.matchAll(GONE_USE)) {
    const pair = pairOf(from.slice(1, -1), to.slice(1, -1), false)
    if (pair) pairs.push(pair)
  }
  for (const [, from, to, toClass] of paragraph.matchAll(NO_LONGER_TAKES)) {
    const pair = pairOf(from.slice(1, -1), to.slice(1, -1), false)
    if (pair) pairs.push(pair)
    if (pair && toClass) {
      const className = toClass.slice(1, -1)
      const fromClass = `.ui-${pair.from}`
      const classPair = pairOf(fromClass, className, false)
      if (classPair && paragraph.includes(`\`${fromClass}\``)) {
        pairs.push(classPair)
      }
    }
  }
  return pairs
}

const parseSection = (body: string) => {
  const pairs: Pair[] = []
  const unparsed: string[] = []
  const blocks = body.replace(/```[\s\S]*?```/g, "").split(/\n{2,}/)
  for (const block of blocks) {
    const lines = block.trim().split("\n")
    if (lines[0]?.startsWith("|")) {
      const table = parseTable(lines)
      pairs.push(...table.pairs)
      unparsed.push(...table.unparsed)
    } else {
      pairs.push(...parseProse(lines.join(" ")))
    }
  }
  return { pairs, unparsed }
}

const key = (pair: Pair) => `${pair.kind}\n${pair.from}\n${pair.to}`

export function parseRenames(markdown: string) {
  const renames = new Map<string, Rename>()
  const sectionsWithoutPairs: string[] = []
  const unparsedRows: { row: string; section: string }[] = []
  const sections = markdown.split(/^(?=## )/m).slice(1)
  for (const section of sections) {
    const [heading, ...rest] = section.split("\n")
    const title = heading.replace(/^## /, "").trim()
    const anchor = anchorOf(title)
    const { pairs, unparsed } = parseSection(rest.join("\n"))
    if (pairs.length === 0) sectionsWithoutPairs.push(title)
    for (const row of unparsed) unparsedRows.push({ row, section: title })
    for (const pair of pairs) {
      const existing = renames.get(key(pair))
      if (existing) {
        if (!existing.sections.some((s) => s.anchor === anchor)) {
          existing.sections.push({ anchor, title })
        }
      } else {
        renames.set(key(pair), { ...pair, sections: [{ anchor, title }] })
      }
    }
  }
  const list = [...renames.values()].sort(
    (a, b) =>
      a.from.localeCompare(b.from, "en") ||
      a.kind.localeCompare(b.kind, "en") ||
      a.to.localeCompare(b.to, "en"),
  )
  return { renames: list, sectionsWithoutPairs, unparsedRows }
}
