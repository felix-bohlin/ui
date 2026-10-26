import stylelint from "stylelint"
import { describe, expect, test } from "vitest"
import { findProblems } from "../../scripts/check-characters.mjs"
import { problems } from "../../scripts/check-commits.mjs"
import {
  checkClassOrder,
  checkClassPrefix,
  checkClient,
  checkDestructuring,
  checkIndexSignature,
  checkSortedKeys,
  checkTypesImport,
} from "../../scripts/check-components.mjs"
import {
  allowlistErrors,
  literals,
  primitives,
} from "../../scripts/check-css-vars.mjs"
import { sortSource } from "../../scripts/sort-css.mjs"
import logicalShorthands from "../../scripts/stylelint-logical-shorthands.mjs"

const EM_DASH = String.fromCodePoint(0x2014)
const MIDDLE_DOT = String.fromCodePoint(0x00b7)

describe("sort-css", () => {
  test("sorts declarations alphabetically, with --_motion first among the private ones", async () => {
    expect(
      await sortSource(
        "a.css",
        ".a {\n  --_size: 1;\n  --_accent: red;\n  --_motion: 1;\n  color: red;\n  background: blue;\n}\n",
      ),
    ).toBe(
      ".a {\n  --_motion: 1;\n  --_accent: red;\n  --_size: 1;\n  background: blue;\n  color: red;\n}\n",
    )
  })

  test("sorts the <style> blocks of a component and leaves the markup", async () => {
    const source =
      '---\nconst b = 1\n---\n<p style="color: red; background: blue">b</p>\n<style>\n  p {\n    color: red;\n    background: blue;\n  }\n</style>\n'
    expect(await sortSource("A.astro", source)).toBe(
      source.replace(
        "    color: red;\n    background: blue;",
        "    background: blue;\n    color: red;",
      ),
    )
  })

  test("leaves sorted CSS as it is", async () => {
    const sorted =
      ".a {\n  --_motion: 1;\n  --_accent: red;\n  background: blue;\n  color: red;\n}\n"
    expect(await sortSource("a.css", sorted)).toBe(sorted)
  })
})

describe("check-characters", () => {
  test("reports each forbidden character on a line once, with its file and line", () => {
    expect(
      findProblems(
        `a.md:3:one ${EM_DASH} two ${EM_DASH}\nb.ts:12:const time = "a${MIDDLE_DOT}b: c"\n`,
      ),
    ).toEqual(["a.md:3: em dash (U+2014)", "b.ts:12: middle dot (U+00B7)"])
  })

  test("reports nothing without matches", () => {
    expect(findProblems("")).toEqual([])
  })
})

describe("check-commits", () => {
  test("accepts a prefixed subject", () => {
    expect(problems("fix: keep the menu open\n\nWith a body.")).toEqual([])
    expect(problems("feat!: drop IconButton")).toEqual([])
  })

  test("reports a missing prefix, a long subject and a forbidden character", () => {
    expect(problems(`Update ${"the menu ".repeat(12)}${EM_DASH}`)).toEqual([
      expect.stringContaining("must start with chore, docs, feat"),
      "must have a subject of at most 100 characters, not 116",
      expect.stringContaining("em dash"),
    ])
  })

  test("only checks the characters of a merge commit", () => {
    expect(problems(`Merge branch 'main' ${"a".repeat(100)}`, true)).toEqual([])
    expect(problems(`Merge branch 'main'\n\n${MIDDLE_DOT}`, true)).toEqual([
      expect.stringContaining("middle dot"),
    ])
  })
})

describe("check-css-vars", () => {
  test("reports literal lengths but not zero", () => {
    expect(
      literals(".ui-a { margin: 0px; padding: 4px 0.5rem; }", new Set()),
    ).toEqual(["padding: 4px", "padding: 0.5rem"])
  })

  test("skips a documented input's :where() default, round() steps, @property initial values and / 1rem divisors", () => {
    const source = `
      @property --_angle { inherits: false; initial-value: 2px; syntax: "<length>"; }
      :where(.ui-a) {
        --_size: 2.5rem;
        inline-size: round(var(--_x), 1px);
        line-height: calc(var(--_y) / 1rem);
      }
      .ui-a.ui-large { --_size: 3rem; }
    `
    expect(literals(source, new Set(["--_size"]))).toEqual(["--_size: 3rem"])
    expect(literals(source, new Set())).toEqual([
      "--_size: 2.5rem",
      "--_size: 3rem",
    ])
  })

  test("reports palette steps and Open Props, not roles or private properties", () => {
    expect(
      primitives(
        new Set([
          "--_size",
          "--size-2",
          "--ui-color-7",
          "--ui-font-size-3",
          "--ui-gray-3",
          "--ui-text",
        ]),
        new Set(["--size-2"]),
      ),
    ).toEqual(["--size-2", "--ui-color-7", "--ui-font-size-3", "--ui-gray-3"])
  })

  test("reports reads the allowlist doesn't list, and entries that are gone", () => {
    expect(
      allowlistErrors(
        {
          "css/components/a.css": {
            literals: ["margin: 2px", "padding: 4px"],
            primitives: [],
          },
        },
        {
          "css/components/a.css": { literals: ["margin: 2px"] },
          "css/components/b.css": { primitives: ["--ui-gray-3"] },
        },
      ),
    ).toEqual([
      expect.stringMatching(
        /^padding: 4px in css\/components\/a\.css is a literal length/,
      ),
      expect.stringMatching(
        /^--ui-gray-3 is listed for css\/components\/b\.css .* no longer there/,
      ),
    ])
  })
})

describe("check-components", () => {
  test("types come from the component's own types file", () => {
    expect(
      checkTypesImport(
        "Badge.react.tsx",
        'import type { Props } from "./types.astro"',
      ),
    ).toEqual([
      "imports types from ./types.astro; import them from ./types.react",
    ])
    expect(
      checkTypesImport(
        "Badge.react.tsx",
        'import type { Props } from "./types.react"',
      ),
    ).toEqual([])
  })

  test("classes start with ui-, and className comes last", () => {
    const lists = [
      [
        "className",
        '"ui-badge"',
        '{ "ui-small": small, large: isLarge }',
        'size === "s" ? "ui-s" : "big"',
      ],
    ]
    expect(checkClassPrefix(lists, "cx")).toEqual([
      'cx has the class "large"; prefix it with ui-',
      'cx has the class "big"; prefix it with ui-',
    ])
    expect(checkClassOrder(lists, "cx")).toEqual([
      "className must be the last entry in cx",
    ])
    expect(checkClassOrder([['"ui-badge"', "className"]], "cx")).toEqual([])
  })

  test('"use client" marks exactly the React components with state or handlers', () => {
    const stateful =
      "export default function A() {\n  const [open] = useState(false)\n  return open\n}\n"
    const plain = "export default function A() {\n  return null\n}\n"
    expect(checkClient(`"use client"\n\n${stateful}`)).toEqual([])
    expect(checkClient(plain)).toEqual([])
    expect(checkClient(stateful)).toEqual([
      expect.stringContaining('start it with "use client"'),
    ])
    expect(checkClient(`"use client"\n\n${plain}`)).toEqual([
      expect.stringContaining("uses no context, state"),
    ])
  })

  test("props are declared, not taken from an index signature", () => {
    expect(
      checkIndexSignature("type Props = {\n  [key: string]: unknown\n}"),
    ).toEqual(["uses an index signature; declare the props explicitly"])
    expect(checkIndexSignature("type Props = {\n  label: string\n}")).toEqual(
      [],
    )
  })

  test("type keys are sorted", () => {
    expect(
      checkSortedKeys(
        "types.ts",
        "export type Props = { size?: string; color?: string }",
      ),
    ).toEqual(["Props keys are not sorted: expected color, size"])
    expect(
      checkSortedKeys(
        "types.ts",
        "export type Props = { color?: string; size?: string }",
      ),
    ).toEqual([])
  })

  test("props are destructured in order, slots last", () => {
    expect(
      checkDestructuring(
        "Badge.astro",
        "---\nconst { size, color, ...rest } = Astro.props\n---\n<span />\n",
      ),
    ).toEqual(["props are not destructured in order: expected color, size"])
    expect(
      checkDestructuring(
        "Badge.astro",
        "---\nconst { color, size, ...rest } = Astro.props\n---\n<span />\n",
      ),
    ).toEqual([])
    expect(
      checkDestructuring(
        "Badge.react.tsx",
        "export default function Badge({ children, size, color, ...rest }: Props) {\n  return null\n}\n",
        ["children"],
      ),
    ).toEqual([
      "props are not destructured in order, slots last: expected color, size, children",
    ])
  })
})

describe("stylelint logical shorthands", () => {
  const lint = async (code: string) => {
    const { results } = await stylelint.lint({
      code,
      config: {
        plugins: [logicalShorthands],
        rules: { "opui/logical-shorthands": true },
      },
    })
    return results[0].warnings.map(({ text }) => text)
  }

  test("rejects a physical shorthand with more than one value", async () => {
    expect(await lint(".a { inset: 0 auto; margin: 1px 2px; }")).toEqual([
      expect.stringContaining('"inset" with more than one value'),
      expect.stringContaining('"margin" with more than one value'),
    ])
  })

  test("accepts one value, logical shorthands and one function", async () => {
    expect(
      await lint(
        ".a { margin: 1px !important; margin-inline: 1px 2px; padding: calc(1px + 2px); }",
      ),
    ).toEqual([])
  })
})
