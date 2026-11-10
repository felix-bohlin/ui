import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import allowlist from "./example-copy-allowlist.json"

const TEXT_ATTRIBUTES = [
  "alt",
  "aria-label",
  "description",
  "end-text",
  "endText",
  "label",
  "placeholder",
  "start-text",
  "startText",
  "title",
  "value",
]

export const textsOf = (source: string) => {
  const [, front = "", body = source] =
    source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/) ?? []
  const markup = body
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<svg\b[\s\S]*?<\/svg>/g, "")
  return [
    ...[...markup.matchAll(/>([^<>{}]+)</g)].map(([, text]) => text),
    ...[
      ...markup.matchAll(
        new RegExp(`\\s(?:${TEXT_ATTRIBUTES.join("|")})="([^"]*)"`, "g"),
      ),
    ].map(([, text]) => text),
    ...[...front.matchAll(/\b(?:description|label|title):\s*"([^"]*)"/g)].map(
      ([, text]) => text,
    ),
  ]
    .map((text) => text.replace(/\s+/g, " ").trim())
    .filter(Boolean)
}

const RULES: [string, RegExp][] = [
  [
    "placeholder Latin",
    /\b(?:lorem|ipsum|dolor sit|consectetur|adipiscing)\b/i,
  ],
  [
    "filler ipsum",
    /\b(?:bacon|biltong|cornhole|gastropub|hipster|knausgaard|mustache|prosciutto|semiotics|stumptown|tenderloin|waistcoat)\b/i,
  ],
  [
    "a placeholder label",
    /^(?:Label|Legend|Option|Supporting text|(?:Button|Card|Checkbox|Item|Label|Link|Option|Radio|Step|Switch|Tab) \d+|Option (?:One|Two|Three)|One|Two|Three|Four|Five|Six|First|Second|Third)$/,
  ],
  ["a short exclamation", /^.{1,30}!$/],
  [
    "text about the example",
    /^This is an? |\bNotice (?:how|the)\b|\bLook at that\b|\bWorks too\b/i,
  ],
]

export const problemsOf = (source: string) => [
  ...new Set(
    textsOf(source).flatMap((text) =>
      RULES.filter(([, rule]) => rule.test(text)).map(
        ([name]) => `${name}: ${text}`,
      ),
    ),
  ),
]

const root = "src/component-examples"
const found: Record<string, string[]> = Object.fromEntries(
  readdirSync(root)
    .toSorted()
    .flatMap((folder) =>
      readdirSync(join(root, folder))
        .filter((file) => file.endsWith(".astro"))
        .toSorted()
        .map((file) => [
          `${folder}/${file}`,
          problemsOf(readFileSync(join(root, folder, file), "utf8")),
        ]),
    )
    .filter(([, problems]) => problems.length > 0),
)

const allowed = allowlist as Record<string, string[]>

describe("example copy", () => {
  test("examples read like content a reader could ship", () => {
    expect(
      Object.entries(found).flatMap(([file, problems]) =>
        problems
          .filter((problem) => !allowed[file]?.includes(problem))
          .map((problem) => `${file}: ${problem}`),
      ),
      "write short realistic copy, such as the settings, people and orders the other examples use, instead of placeholders, filler, jokes or text about the example",
    ).toEqual([])
  })

  test("the allowlist only lists copy the examples still have", () => {
    expect(
      Object.entries(allowed).flatMap(([file, problems]) =>
        problems
          .filter((problem) => !found[file]?.includes(problem))
          .map((problem) => `${file}: ${problem}`),
      ),
      "the example changed: remove these from tests/unit/example-copy-allowlist.json",
    ).toEqual([])
  })

  test("reads the end and start text props", () => {
    expect(
      problemsOf(
        '<Radio endText="Supporting text" />\n<TextField startText="Option 1" />',
      ),
    ).toEqual([
      "a placeholder label: Supporting text",
      "a placeholder label: Option 1",
    ])
  })

  test("flags placeholders, filler, short exclamations and text about the example, and reads text, attributes and items", () => {
    expect(
      problemsOf(
        '---\nconst items = [{ label: "Option 1" }, { label: "Archive" }]\n---\n<Checkbox label="Checkbox 1" />\n<p>Lorem ipsum dolor sit amet</p>\n<Callout>This is a tonal callout</Callout>\n<p>Pick me!</p>\n<p>The deck is out. Thanks for the help, everyone!</p>\n<Menu label="Options" />\n<script>if (!ok) console.log("Label")</script>',
      ),
    ).toEqual([
      "placeholder Latin: Lorem ipsum dolor sit amet",
      "text about the example: This is a tonal callout",
      "a short exclamation: Pick me!",
      "a placeholder label: Checkbox 1",
      "a placeholder label: Option 1",
    ])
  })
})
