import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import { FRAMEWORK_AGNOSTIC_EXAMPLES } from "../../src/utils/framework.js"
import allowlist from "./example-copy-allowlist.json"
import { astroMarkup, htmlMarkup, type Markup } from "./example-markup"

const TEXT_PROPS = [
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

export const textsOf = ({ strings, tags, texts }: Markup) =>
  [
    ...texts,
    ...tags.flatMap(({ props }) =>
      props.flatMap(({ name, value }) =>
        TEXT_PROPS.includes(name) && value !== undefined ? [value] : [],
      ),
    ),
    ...strings.flatMap(({ key, value }) =>
      TEXT_PROPS.includes(key) ? [value] : [],
    ),
  ]
    .map((text) => text.replace(/\s+/g, " ").trim())
    .filter(Boolean)

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
    /^This is an? |\bClick anywhere\b|\bNotice (?:how|the)\b|\bLook at that\b|\bWorks too\b/i,
  ],
]

export const problemsOf = async (
  source: string,
  format: "astro" | "html" = "astro",
) => [
  ...new Set(
    textsOf(
      format === "html" ? htmlMarkup(source) : await astroMarkup(source),
    ).flatMap((text) =>
      RULES.filter(([, rule]) => rule.test(text)).map(
        ([name]) => `${name}: ${text}`,
      ),
    ),
  ),
]

const root = "src/component-examples"
const files = [
  ...readdirSync(root)
    .toSorted()
    .flatMap((folder) =>
      readdirSync(join(root, folder))
        .filter((file) => file.endsWith(".astro"))
        .toSorted()
        .map((file) => `${folder}/${file}`),
    ),
  ...FRAMEWORK_AGNOSTIC_EXAMPLES.map((example) => `${example}.html`),
]
const found: Record<string, string[]> = Object.fromEntries(
  (
    await Promise.all(
      files.map(async (file) => [
        file,
        await problemsOf(
          readFileSync(join(root, file), "utf8"),
          file.endsWith(".html") ? "html" : "astro",
        ),
      ]),
    )
  ).filter(([, problems]) => problems.length > 0),
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

  test("reads the end and start text props", async () => {
    expect(
      await problemsOf(
        '<Radio endText="Supporting text" />\n<TextField startText="Option 1" />',
      ),
    ).toEqual([
      "a placeholder label: Supporting text",
      "a placeholder label: Option 1",
    ])
  })

  test("flags placeholders, filler, short exclamations and text about the example, and reads text, attributes and items", async () => {
    expect(
      await problemsOf(
        '---\nconst items = [{ label: "Option 1" }, { label: "Archive" }]\n---\n<Checkbox label="Checkbox 1" />\n<p>Lorem ipsum dolor sit amet</p>\n<Callout>This is a tonal callout</Callout>\n<p>Plans for any team. Click anywhere on the card.</p>\n<p>Pick me!</p>\n<p>The deck is out. Thanks for the help, everyone!</p>\n<Menu label="Options" />\n<script>if (!ok) console.log("Label")</script>',
      ),
    ).toEqual([
      "placeholder Latin: Lorem ipsum dolor sit amet",
      "text about the example: This is a tonal callout",
      "text about the example: Plans for any team. Click anywhere on the card.",
      "a short exclamation: Pick me!",
      "a placeholder label: Checkbox 1",
      "a placeholder label: Option 1",
    ])
  })

  test("reads every way an Astro example writes copy, and no names or code inside other attributes and scripts", async () => {
    expect(
      await problemsOf(
        [
          "---",
          "const photos = [{ alt: 'Lorem ipsum' }]",
          'const note = "<p>This is a note</p>"',
          "---",
          "Option 2",
          "<Checkbox label='Checkbox 3' />",
          '<Radio endText={"Supporting text"} />',
          "<p>{`Click anywhere on the card.`}</p>",
          "<p>Thanks for the jam, {name}. See you on Friday!</p>",
          "<Fragment set:html={note} />",
          "<Chip description='Set label=\"Option 1\" on each chip' />",
          '<p>{items.map((item) => <span title="Label">{item}</span>)}</p>',
        ].join("\n"),
      ),
    ).toEqual([
      "a placeholder label: Option 2",
      "text about the example: Click anywhere on the card.",
      "text about the example: This is a note",
      "a placeholder label: Checkbox 3",
      "a placeholder label: Supporting text",
      "a placeholder label: Label",
      "placeholder Latin: Lorem ipsum",
    ])
  })

  test("reads the HTML of the examples that have no Astro file", async () => {
    expect(files).toEqual(expect.arrayContaining(["typography/Default.html"]))
    expect(
      await problemsOf(
        '<article class="ui-rich-text">\n  <h1>Fixie beard</h1>\n  <p>Kitsch tbh knausgaard tousled.</p>\n  <img alt="Lorem ipsum" src="a.jpg" />\n</article>',
        "html",
      ),
    ).toEqual([
      "filler ipsum: Kitsch tbh knausgaard tousled.",
      "placeholder Latin: Lorem ipsum",
    ])
  })
})
