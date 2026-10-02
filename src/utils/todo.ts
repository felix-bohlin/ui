export type TodoNote =
  | { code: string; kind: "code"; level: number }
  | { kind: "comment" | "item" | "text"; level: number; text: string }

export type TodoItem = {
  line: string
  notes: TodoNote[]
  severity?: number
  status: string
  text: string
}

export type TodoSection = {
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
        line,
        notes: parseNotes(indented.map((note) => note.slice(2))),
        severity: item[2] ? Number(item[2]) : undefined,
        status: item[1],
        text: item[3],
      })
      continue
    }

    if (!section && line.trim()) intro.push(line)
  }

  return {
    intro,
    sections: sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.status !== "x"),
      }))
      .filter((section) => section.items.length),
  }
}

const indentOf = (line: string) => line.length - line.trimStart().length

export const parseNotes = (lines: string[]) => {
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
