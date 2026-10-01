import themeSource from "@opui/css/theme.css?raw"

export type ThemeToken = {
  dark?: string
  name: string
  optional?: boolean
  value: string
}

export type ThemeSection = {
  note?: string
  number: number
  title: string
  tokens: ThemeToken[]
}

const HEADER = /^\s*\/\*\s*(\d+)\.\s*(.*?)\s*\*\/\s*$/
const DECLARATION = /^(\s*)(--[\w-]+):\s*(.*)$/
const OPTIONAL = /^\s*\/\*\s*(--[\w-]+):\s*(.*?);?\s*\*\/\s*$/
const DARK_SCOPE = /\.ui-dark|prefers-color-scheme:\s*dark/
const THEME_SCOPE = /\bhtml\b/

type Line =
  | { kind: "comment" }
  | { kind: "close" }
  | {
      kind: "declaration"
      dark: boolean
      end: number
      indent: string
      name: string
      value: string
    }
  | { kind: "header"; note?: string; number: number; title: string }
  | { kind: "optional"; name: string; value: string }
  | { kind: "open" }
  | { kind: "other" }

function* walk(lines: string[]): Generator<[number, Line]> {
  const scopes: string[] = []
  let inComment = false
  for (let index = 0; index < lines.length; index++) {
    const line = lines[index]
    if (inComment) {
      if (line.includes("*/")) inComment = false
      yield [index, { kind: "comment" }]
      continue
    }
    const header = line.match(HEADER)
    if (header) {
      const [title, note] = header[2].split(/\s+-\s+/, 2)
      yield [index, { kind: "header", note, number: Number(header[1]), title }]
      continue
    }
    if (line.includes("/*") && !line.includes("*/")) {
      inComment = true
      yield [index, { kind: "comment" }]
      continue
    }
    const optional = line.match(OPTIONAL)
    if (optional && scopes.some((scope) => THEME_SCOPE.test(scope))) {
      yield [
        index,
        { kind: "optional", name: optional[1], value: optional[2].trim() },
      ]
      continue
    }
    if (/^\s*\/\*.*\*\/\s*$/.test(line)) {
      yield [index, { kind: "comment" }]
      continue
    }
    if (line.trimEnd().endsWith("{")) {
      scopes.push(line)
      yield [index, { kind: "open" }]
      continue
    }
    if (line.trim() === "}") {
      scopes.pop()
      yield [index, { kind: "close" }]
      continue
    }
    const declaration = line.match(DECLARATION)
    if (!declaration || !scopes.some((scope) => THEME_SCOPE.test(scope))) {
      yield [index, { kind: "other" }]
      continue
    }
    const start = index
    let value = declaration[3]
    while (!value.trimEnd().endsWith(";") && index + 1 < lines.length) {
      value += ` ${lines[++index].trim()}`
    }
    yield [
      start,
      {
        dark: scopes.some((scope) => DARK_SCOPE.test(scope)),
        end: index,
        indent: declaration[1],
        kind: "declaration",
        name: declaration[2],
        value: value.trim().replace(/;$/, ""),
      },
    ]
  }
}

export const parseThemeTokens = (css = themeSource): ThemeSection[] => {
  const sections: ThemeSection[] = []
  let section: ThemeSection | undefined
  for (const [, line] of walk(css.split("\n"))) {
    if (line.kind === "header") {
      section = sections.find((candidate) => candidate.number === line.number)
      if (!section) {
        section = {
          note: line.note,
          number: line.number,
          title: line.title,
          tokens: [],
        }
        sections.push(section)
      }
      continue
    }
    if (line.kind === "optional" && section) {
      if (!themeTokensIn(sections).some((token) => token.name === line.name)) {
        section.tokens.push({
          name: line.name,
          optional: true,
          value: line.value,
        })
      }
      continue
    }
    if (line.kind !== "declaration" || !section) continue
    const existing = sections
      .flatMap((candidate) => candidate.tokens)
      .find((token) => token.name === line.name)
    if (existing?.optional && !line.dark) {
      existing.optional = undefined
      existing.value = line.value
      continue
    }
    if (existing) {
      if (line.dark) existing.dark = line.value
      continue
    }
    if (line.dark) continue
    section.tokens.push({ name: line.name, value: line.value })
  }
  return sections.toSorted((a, b) => a.number - b.number)
}

const themeTokensIn = (sections: ThemeSection[]) =>
  sections.flatMap((section) => section.tokens)

export const themeTokens = (css = themeSource) =>
  parseThemeTokens(css).flatMap((section) => section.tokens)

export const setThemeToken = (css: string, name: string, value: string) => {
  const lines = css.split("\n")
  for (const [index, line] of walk(lines)) {
    if (line.kind !== "declaration" || line.dark || line.name !== name) continue
    lines.splice(
      index,
      line.end - index + 1,
      `${line.indent}${name}: ${value};`,
    )
    return lines.join("\n")
  }
  throw new Error(`${name} is not declared in theme.css`)
}

export const setDarkThemeTokens = (
  css: string,
  tokens: readonly (readonly [string, string])[],
) => {
  const body = (indent: string) =>
    tokens.map(([name, value]) => `${indent}${name}: ${value};`).join("\n")
  return css
    .replace(
      /(:where\(html\.ui-dark\) \{\n)[\s\S]*?(\n {2}\})/,
      (_, open, close) => `${open}${body("    ")}${close}`,
    )
    .replace(
      /(:where\(html:not\(\.ui-light\)\) \{\n)[\s\S]*?(\n {4}\})/,
      (_, open, close) => `${open}${body("      ")}${close}`,
    )
}
