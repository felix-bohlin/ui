import { actionValues, fixOptions, parseTodo, replyOf } from "./todo.ts"

export const SECTIONS = [
  "Accessibility",
  "Bugs",
  "Docs",
  "Future plans",
  "Limitations",
  "Questions",
  "Suggestions",
  "To check",
]

const ITEM = /^- \[(.?)\] (?:\((\d+)\) )?(.*)$/
const ACTION =
  /^(?:Explain further and provide an example|Explain further|Fix with option [A-Z0-9]+|Fix|Remove issue)$/

type Block = {
  end: number
  key?: string
  line: string
  open: boolean
  section: string
  severity?: number
  start: number
}

const itemOf = (lines: string[]) => {
  const { done, sections } = parseTodo(`## Item\n\n${lines.join("\n")}`)
  return [...sections, ...done].flatMap(({ items }) => items)[0]
}

const keyOf = (line: string) => itemOf([line])?.key

const optionOf = (recommended = "") =>
  recommended.match(/^Fix with option ([A-Z0-9]+)/)?.[1]

const findBlock = (lines: string[], line: string) => {
  const found = find(blocksOf(lines), line)
  if (!found.block) {
    throw new Error(
      `${found.status === "missing" ? "No item" : "More than one item"} matches ${line}`,
    )
  }
  return found.block
}

const afterSummary = (lines: string[], start: number) =>
  start + (lines[start + 1]?.startsWith("  - Summary: ") ? 2 : 1)

const blocksOf = (lines: string[]) => {
  const blocks: Block[] = []
  let section = ""
  for (let index = 0; index < lines.length; index++) {
    const heading = lines[index].match(/^## (.+)$/)
    if (heading) {
      section = heading[1]
      continue
    }
    const item = lines[index].match(ITEM)
    if (!item || !section) continue
    let end = index
    while (
      end + 1 < lines.length &&
      (lines[end + 1].startsWith("  ") || !lines[end + 1].trim())
    ) {
      end++
    }
    while (end > index && !lines[end].trim()) end--
    blocks.push({
      end,
      key: keyOf(lines[index]),
      line: lines[index],
      open: item[1] !== "x",
      section,
      severity: item[2] ? Number(item[2]) : undefined,
      start: index,
    })
    index = end
  }
  return blocks
}

const PREFIX = 80

const find = (blocks: Block[], line: string, section?: string) => {
  const exact = blocks.filter((block) => block.line === line)
  const key = keyOf(line)
  const inSection = blocks.filter(
    (block) => !section || block.section === section,
  )
  const keyed = inSection.filter((block) => key && block.key === key)
  const similar =
    exact.length === 1
      ? exact
      : keyed.length
        ? keyed
        : inSection.filter((block) =>
            block.line.startsWith(line.slice(0, PREFIX)),
          )
  const [block] = similar
  if (similar.length === 1 && block) return { block }
  return {
    candidates: similar.map((block) => block.line),
    status: similar.length ? ("ambiguous" as const) : ("missing" as const),
  }
}

export const listItems = (source: string, { missingTriage = false } = {}) =>
  parseTodo(source).sections.flatMap(({ items, title }) =>
    items
      .filter((item) => !missingTriage || !item.summary || !item.recommended)
      .map((item) => ({
        component: item.component,
        files: item.files,
        line: item.line,
        options: fixOptions(item.notes).options,
        recommended: item.recommended,
        reply: replyOf(item.notes),
        section: title,
        severity: item.severity,
        summary: item.summary,
      })),
  )

export const parseAnswers = (text: string) => {
  const answers: { answer: string[]; line: string; section: string }[] = []
  let section = ""
  for (const line of text.split("\n")) {
    const heading = line.match(/^## (.+)$/)
    if (heading) section = heading[1]
    else if (ITEM.test(line)) answers.push({ answer: [], line, section })
    else if (/^ {2}>( |$)/.test(line) && answers.length) {
      answers.at(-1)!.answer.push(line)
    }
  }
  return answers
    .filter(({ answer }) => answer.length)
    .map((entry) => {
      const [first, ...rest] = entry.answer.map((line) =>
        line.replace(/^ {2}> ?/, ""),
      )
      const action = ACTION.test(first) ? first : undefined
      return {
        ...entry,
        action: action?.replace(/^Fix with option .+$/, "Fix with option"),
        comment: (action ? rest : [first, ...rest]).join("\n").trim(),
        option: action?.match(/^Fix with option (.+)$/)?.[1],
      }
    })
}

const lastAnswer = (lines: string[], block: Block) => {
  const answer: string[] = []
  for (let index = block.end; index > block.start; index--) {
    if (/^ {2}>( |$)/.test(lines[index])) answer.unshift(lines[index])
    else if (answer.length) break
  }
  return answer
}

export const applyAnswers = (source: string, text: string) => {
  const lines = source.split("\n")
  const report = []
  for (const { answer, line, section, ...rest } of parseAnswers(text)) {
    const found = find(blocksOf(lines), line, section)
    if (!found.block) {
      report.push({
        ...rest,
        candidates: found.candidates,
        line,
        section,
        status: found.status,
      })
      continue
    }
    const { block } = found
    if (lastAnswer(lines, block).join("\n") === answer.join("\n")) {
      report.push({ ...rest, line: block.line, section, status: "already" })
      continue
    }
    lines.splice(block.end + 1, 0, ...answer)
    report.push({ ...rest, line: block.line, section, status: "added" })
  }
  return { report, source: lines.join("\n") }
}

const OUTCOMES = {
  explained: { done: false, label: "Explained" },
  fixed: { done: true, label: "Fixed" },
  removed: { done: true, label: "Removed" },
  "still-open": { done: false, label: "Still open" },
}

type Option = { id: string; recommended?: boolean; text: string }

export type Outcome = {
  line: string
  note: string
  options?: Option[]
  outcome: keyof typeof OUTCOMES
  recommended?: string
}

const optionIds = (lines: string[]) =>
  fixOptions(itemOf(lines)?.notes ?? []).options.map(({ id }) => id)

export const resolveItems = (source: string, outcomes: Outcome[]) => {
  const lines = source.split("\n")
  const report = []
  for (const { line, note: text, options, outcome, recommended } of outcomes) {
    const kind = OUTCOMES[outcome]
    if (!kind) throw new Error(`Unknown outcome "${outcome}" for ${line}`)
    if (!text?.trim())
      throw new Error(`Outcome "${outcome}" for ${line} needs a note`)
    const block = findBlock(lines, line)
    const item = lines.slice(block.start, block.end + 1)
    const ids = options?.map(({ id }) => id) ?? optionIds(item)
    const option = optionOf(recommended)
    const problems = [
      ...((options || recommended) && kind.done
        ? [
            "only an explained or still-open item takes options or a recommended",
          ]
        : []),
      ...(options && optionIds(item).length
        ? ["it already has an Options list"]
        : []),
      ...(recommended
        ? triageProblems({ recommended, summary: "Summary." })
        : []),
      ...(option && !ids.includes(option)
        ? [`recommended names option ${option}, which the item lacks`]
        : []),
    ]
    if (problems.length) throw new Error(`${line}: ${problems.join("; ")}`)
    lines.splice(
      block.end + 1,
      0,
      ...note("  - ", `${kind.label}: ${text}`),
      ...(options ? optionsNote(options) : []),
    )
    if (recommended) {
      const at = item.findIndex((entry) =>
        entry.startsWith("  - Recommended: "),
      )
      const entry = `  - Recommended: ${recommended.trim()}`
      if (at > 0) lines[block.start + at] = entry
      else lines.splice(afterSummary(lines, block.start), 0, entry)
    }
    if (kind.done) lines[block.start] = block.line.replace(/^- \[.?\]/, "- [x]")
    report.push({ line: lines[block.start], outcome })
  }
  return { report, source: lines.join("\n") }
}

const triageProblems = ({
  recommended = "",
  summary = "",
}: {
  recommended?: string
  summary?: string
}) => {
  const [item] = parseTodo(
    `## Bugs\n\n- [ ] Item\n  - Summary: ${summary.trim()}\n  - Recommended: ${recommended.trim()}`,
  ).sections.flatMap(({ items }) => items)
  return [
    ...(summary.trim() && item?.summary ? [] : ["summary is required"]),
    ...(item?.recommended
      ? []
      : [
          `recommended must be ${actionValues.join(", ")} or Fix with option <id>, optionally followed by ". <reason>"`,
        ]),
  ]
}

export type Triage = { line: string; recommended?: string; summary?: string }

export const triageItems = (source: string, triages: Triage[]) => {
  const lines = source.split("\n")
  const report = []
  for (const { line, recommended, summary } of triages) {
    const block = findBlock(lines, line)
    const notes = lines.slice(block.start + 1, block.end + 1)
    const has = (label: string) =>
      notes.some((note) => note.startsWith(`  - ${label}: `))
    const problems = [
      ...(summary || recommended ? [] : ["give a summary or a recommended"]),
      ...(summary && has("Summary") ? ["it already has a Summary"] : []),
      ...(recommended && has("Recommended")
        ? ["it already has a Recommended"]
        : []),
      ...triageProblems({
        recommended: recommended ?? "Fix",
        summary: summary ?? "Summary.",
      }),
    ]
    if (problems.length) throw new Error(`${line}: ${problems.join("; ")}`)
    if (summary) {
      lines.splice(block.start + 1, 0, `  - Summary: ${summary.trim()}`)
    }
    if (recommended) {
      lines.splice(
        afterSummary(lines, block.start),
        0,
        `  - Recommended: ${recommended.trim()}`,
      )
    }
    report.push({ line: block.line })
  }
  return { report, source: lines.join("\n") }
}

export type Finding = {
  component: string
  files?: string[]
  fix?: string
  notes?: string[]
  options?: Option[]
  recommended: string
  section: string
  severity: number
  summary: string
  text: string
}

const note = (bullet: string, text: string) =>
  text
    .trim()
    .split("\n")
    .map((line, index) =>
      index === 0
        ? `${bullet}${line}`
        : line.trim()
          ? `${" ".repeat(bullet.length)}${line}`
          : "",
    )

const optionsNote = (options: Option[]) => [
  "  - Options:",
  ...options.flatMap(({ id, recommended, text }) =>
    note("    - ", `${id}${recommended ? " (recommended)" : ""}: ${text}`),
  ),
]

const formatFinding = (finding: Finding) => {
  const problems = [
    ...(SECTIONS.includes(finding.section)
      ? []
      : [`section must be one of ${SECTIONS.join(", ")}`]),
    ...(Number.isInteger(finding.severity) &&
    finding.severity >= 1 &&
    finding.severity <= 10
      ? []
      : ["severity must be a whole number from 1 to 10"]),
    ...(finding.component?.trim() ? [] : ["component is required"]),
    ...(finding.text?.trim() ? [] : ["text is required"]),
    ...triageProblems(finding),
  ]
  const option = optionOf(finding.recommended)
  if (option && !finding.options?.some(({ id }) => id === option)) {
    problems.push(`recommended names option ${option}, which options lacks`)
  }
  if (problems.length) {
    throw new Error(`${finding.text?.slice(0, 60)}: ${problems.join("; ")}`)
  }
  const files = finding.files?.length
    ? ` (${finding.files.map((file) => `\`${file}\``).join(", ")})`
    : ""
  return [
    `- [ ] (${finding.severity}) ${finding.component}: ${finding.text}${files}`,
    `  - Summary: ${finding.summary}`,
    `  - Recommended: ${finding.recommended}`,
    ...(finding.fix ? note("  - ", `Fix: ${finding.fix}`) : []),
    ...(finding.options?.length ? optionsNote(finding.options) : []),
    ...(finding.notes ?? []).flatMap((text) => note("  - ", text)),
  ]
}

const insertAt = (lines: string[], section: string, severity: number) => {
  const blocks = blocksOf(lines).filter((block) => block.section === section)
  const higher = blocks.find(
    (block) => block.open && (block.severity ?? 0) > severity,
  )
  if (higher) return higher.start
  if (blocks.length) return blocks.at(-1)!.end + 1
  const heading = lines.indexOf(`## ${section}`)
  if (heading === -1) throw new Error(`TODO.md has no ## ${section} section`)
  return heading + 2
}

export const addFindings = (source: string, findings: Finding[]) => {
  const formatted = findings.map((finding) => ({
    finding,
    lines: formatFinding(finding),
  }))
  const lines = source.split("\n")
  for (const { finding, lines: item } of formatted) {
    lines.splice(insertAt(lines, finding.section, finding.severity), 0, ...item)
  }
  return {
    report: formatted.map(({ finding, lines: item }) => ({
      line: item[0],
      section: finding.section,
    })),
    source: lines.join("\n"),
  }
}

export const sortItems = (source: string) => {
  const lines = source.split("\n")
  const moved: string[] = []
  for (;;) {
    const blocks = blocksOf(lines)
    const out = blocks.find((block, index) =>
      blocks
        .slice(0, index)
        .some(
          (before) =>
            before.section === block.section &&
            before.open &&
            block.open &&
            (before.severity ?? 0) > (block.severity ?? 0),
        ),
    )
    if (!out) break
    const target = blocks.find(
      (block) =>
        block.section === out.section &&
        block.open &&
        (block.severity ?? 0) > (out.severity ?? 0),
    )!
    const item = lines.splice(out.start, out.end - out.start + 1)
    lines.splice(target.start, 0, ...item)
    moved.push(out.line)
  }
  return { report: moved.map((line) => ({ line })), source: lines.join("\n") }
}
