export type TodoNote =
  | { code: string; kind: "code"; level: number }
  | { kind: "comment" | "item" | "text"; level: number; text: string }

export const actionValues = [
  "Explain further",
  "Explain further and provide an example",
  "Fix",
  "Remove issue",
] as const

type TodoItem = {
  component?: string
  files: string[]
  headline: string
  line: string
  notes: TodoNote[]
  recommended?: { action: string; reason?: string }
  severity?: number
  status: string
  summary?: string
  text: string
}

type TodoSection = {
  items: TodoItem[]
  title: string
}

const itemPattern = /^- \[(.?)\] (?:\((\d+)\) )?(.*)$/

export const parseTodo = (source: string) => {
  const intro: string[] = []
  const sections: TodoSection[] = []

  const lines = source.split("\n")

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    const heading = line.match(/^## (.+)$/)
    if (heading) {
      sections.push({ items: [], title: heading[1] })
      continue
    }

    const item = line.match(itemPattern)
    const section = sections.at(-1)
    if (item && section) {
      const indented = []
      while (
        index + 1 < lines.length &&
        (lines[index + 1].startsWith("  ") || !lines[index + 1].trim())
      ) {
        indented.push(lines[++index])
      }
      while (indented.length && !indented.at(-1)!.trim()) {
        index--
        indented.pop()
      }
      section.items.push({
        ...splitHeadline(item[3]),
        ...triage(parseNotes(indented.map((note) => note.slice(2)))),
        line,
        severity: item[2] ? Number(item[2]) : undefined,
        status: item[1],
        text: item[3],
      })
      continue
    }

    if (!section && line.trim()) intro.push(line)
  }

  const byStatus = (done: boolean) =>
    sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => (item.status === "x") === done),
      }))
      .filter((section) => section.items.length)

  return {
    done: byStatus(true),
    intro,
    sections: byStatus(false),
  }
}

const componentPattern = /^[A-Z][A-Za-z0-9]*(?:(?:, | )[A-Za-z0-9]+)*$/
const filePattern = /^`[\w./-]+(?::[\d,-]+)?`$/

const splitHeadline = (text: string) => {
  const colon = text.indexOf(": ")
  const prefix = colon > 0 && colon <= 40 ? text.slice(0, colon) : undefined
  const component = prefix && componentPattern.test(prefix) ? prefix : undefined
  let headline = component ? text.slice(colon + 2) : text

  const refs = headline.match(/ \(([^()]+)\)$/)
  const entries = refs ? refs[1].split(", ") : []
  const files =
    entries.length && entries.every((entry) => filePattern.test(entry))
      ? entries.map((entry) => entry.slice(1, -1))
      : []
  if (files.length) headline = headline.slice(0, -refs![0].length)
  if (component) headline = headline.charAt(0).toUpperCase() + headline.slice(1)

  return { component, files, headline }
}

const recommendedPattern =
  /^Recommended: (Explain further and provide an example|Explain further|Fix with option [A-Z0-9]+|Fix|Remove issue)(?:\. (.+))?$/

const triage = (notes: TodoNote[]) => {
  let recommended: TodoItem["recommended"]
  let summary: string | undefined
  const rest = notes.filter((note) => {
    if (note.kind !== "item" || note.level) return true
    const summaryMatch = note.text.match(/^Summary: (.+)$/)
    if (summaryMatch && !summary) {
      summary = summaryMatch[1]
      return false
    }
    const match = note.text.match(recommendedPattern)
    if (match && !recommended) {
      recommended = { action: match[1], reason: match[2] }
      return false
    }
    return true
  })
  return { notes: rest, recommended, summary }
}

const indentOf = (line: string) => line.length - line.trimStart().length

const parseNotes = (lines: string[]) => {
  const notes: TodoNote[] = []

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    const text = line.trim()
    if (!text) continue

    const level = Math.floor(indentOf(line) / 2)

    if (text.startsWith("```")) {
      const code = []
      while (
        index + 1 < lines.length &&
        !lines[index + 1].trim().startsWith("```")
      ) {
        code.push(lines[++index].slice(indentOf(line)))
      }
      index++
      notes.push({ code: code.join("\n"), kind: "code", level })
      continue
    }

    const comment = text.match(/^>\s?(?:- )?(.*)$/)
    if (comment) {
      notes.push({ kind: "comment", level, text: comment[1] })
      continue
    }

    const listItem = text.match(/^(?:-|\d+\.) (.*)$/)
    notes.push(
      listItem
        ? { kind: "item", level, text: listItem[1] }
        : { kind: "text", level, text },
    )
  }

  return notes
}

const optionPattern = /^([A-Z])(?: \(([^)]+)\))?[:,] (.*)$/s

const tidy = (text: string) => {
  const trimmed = text.trim().replace(/[;,]$/, "")
  const single = trimmed.endsWith(".") && !trimmed.slice(0, -1).includes(". ")
  const clause = single ? trimmed.slice(0, -1) : trimmed
  return clause.charAt(0).toUpperCase() + clause.slice(1)
}

const toOption = (text: string, index: number, notes: TodoNote[] = []) => {
  const match = text.trim().match(optionPattern)
  return match
    ? {
        id: match[1],
        note: match[2],
        notes,
        text: tidy(match[3]),
        value: `Fix with option ${match[1]}`,
      }
    : {
        id: String(index + 1),
        note: undefined,
        notes,
        text: tidy(text),
        value: `Fix with option ${index + 1}`,
      }
}

type FixOption = ReturnType<typeof toOption>

const lettered = (texts: string[]) =>
  texts.map((text, index) => {
    const id = String.fromCharCode(65 + index)
    return {
      ...toOption(text, index),
      id,
      value: `Fix with option ${id}: ${tidy(text)}`,
    }
  })

const topLevel = (text: string) => {
  const indexes: number[] = []
  let code = false
  let depth = 0

  for (let index = 0; index < text.length; index++) {
    const char = text[index]
    if (char === "`") code = !code
    else if (code) continue
    else if (char === "(") depth++
    else if (char === ")") depth = Math.max(0, depth - 1)
    else if (!depth) indexes.push(index)
  }

  return indexes
}

const splitAt = (text: string, indexes: number[]) =>
  indexes.map((index, i) => text.slice(index, indexes[i + 1]))

const listOptions = (notes: TodoNote[], index: number) => {
  const { level } = notes[index]
  const options: FixOption[] = []
  let end = index + 1

  for (; end < notes.length && notes[end].level > level; end++) {
    const note = notes[end]
    if (note.kind === "item" && note.level === level + 1)
      options.push(toOption(note.text, options.length))
    else if (options.length)
      options
        .at(-1)!
        .notes.push({ ...note, level: Math.max(0, note.level - level - 2) })
    else return
  }

  return { end, options }
}

const letteredOptions = (text: string) => {
  const markers: number[] = []

  for (const index of topLevel(text)) {
    const letter = String.fromCharCode(65 + markers.length)
    const before = text.slice(0, index)
    const marker = text.slice(index).match(/^[A-Z](?: \([^)]+\))?([:,]) /)
    if (
      text[index] === letter &&
      marker &&
      (marker[1] === ":"
        ? !before || before.endsWith(" ")
        : before.endsWith(markers.length ? "; " : "Options: "))
    )
      markers.push(index)
  }

  if (markers.length < 2) return
  return {
    options: splitAt(text, markers).map((option, index) =>
      toOption(option, index),
    ),
    preamble: text.slice(0, markers[0]),
  }
}

const alternativeOptions = (text: string) => {
  if (text.includes("?")) return
  const top = topLevel(text)
  const options = top.find((index) => text.startsWith("Options: ", index))
  const start =
    options === undefined
      ? text.match(/^Fix(?: [^:`]*)?: /)?.[0].length
      : options + "Options: ".length
  if (start === undefined) return

  const separator =
    options === undefined ? /^(, or |; or |\. Or,? )/ : /^, (or )?/
  const cuts = top.flatMap((index) => {
    const match = index > start && text.slice(index).match(separator)
    return match ? [{ index, length: match[0].length }] : []
  })
  if (!cuts.length || (options === undefined && cuts.length > 1)) return

  return {
    options: lettered(
      [{ index: start, length: 0 }, ...cuts].map((cut, i) =>
        text.slice(cut.index + cut.length, cuts[i]?.index),
      ),
    ),
    preamble: text.slice(0, start),
  }
}

export const fixOptions = (notes: TodoNote[]) => {
  let found = {
    legend: "Fix with",
    notes,
    options: [] as FixOption[],
  }

  for (let index = 0; index < notes.length; index++) {
    const note = notes[index]
    if (note.kind === "code" || note.kind === "comment") continue

    const header = note.text.match(/^Options(?: (if [^:]+))?:?$/)
    if (header) {
      const list = listOptions(notes, index)
      if (list && list.options.length > 1) {
        found = {
          legend: header[1] ? `Fix ${header[1]}, with` : "Fix with",
          notes: [...notes.slice(0, index), ...notes.slice(list.end)],
          options: list.options,
        }
        index = list.end - 1
      }
      continue
    }

    const inline = letteredOptions(note.text) ?? alternativeOptions(note.text)
    if (!inline) continue

    const preamble = inline.preamble.replace(/\s*(Fix|Options):\s*$/, "").trim()
    const condition = preamble.match(/^Fix (if [^:]+):$/)
    found = {
      legend: condition ? `Fix ${condition[1]}, with` : "Fix with",
      notes: notes.flatMap((other) =>
        other !== note
          ? [other]
          : preamble && !condition
            ? [{ ...note, text: preamble }]
            : [],
      ),
      options: inline.options,
    }
  }

  return found
}

export const splitLinks = (text: string) =>
  text
    .split(/(\[[^\]]+\]\([^)]+\))/)
    .filter(Boolean)
    .map((part) => {
      const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
      return link
        ? { href: link[2], value: link[1] }
        : { href: undefined, value: part }
    })

export const splitInlineCode = (text: string) =>
  text.split("`").map((value, index) => ({ code: index % 2 === 1, value }))

export const stressRefs = (text: string) =>
  [...text.matchAll(/\(([^()]*)\)/g)].flatMap(([, group]) =>
    splitInlineCode(group).flatMap((part, index, parts) =>
      part.code
        ? (parts[index + 1]?.value ?? "")
            .split(",")
            .map((name) => name.trim())
            .filter((name) => /^[A-Z][A-Za-z0-9]*$/.test(name))
            .map((example) => ({ example, page: part.value }))
        : [],
    ),
  )

export const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

export const plainText = (text: string) =>
  splitInlineCode(text)
    .map((part) => part.value)
    .join("")
