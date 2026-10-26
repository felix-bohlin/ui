import { execFileSync, spawnSync } from "node:child_process"
import { mkdirSync, mkdtempSync, readdirSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import stylelint from "stylelint"
import { describe, expect, test } from "vitest"
import { featureIds, patterns } from "../../packages/opui/scripts/features.mjs"
import {
  htmlFeatureIds,
  pageProblems,
} from "../../scripts/check-browser-support.mjs"
import { findProblems } from "../../scripts/check-characters.mjs"
import { problems } from "../../scripts/check-commits.mjs"
import {
  checkClassOrder,
  checkClassPrefix,
  checkClient,
  checkContext,
  checkDestructuring,
  checkExampleClient,
  checkExampleWrapper,
  checkIndexSignature,
  checkModel,
  checkPropsType,
  checkProvide,
  checkReactExample,
  checkRest,
  checkSortedKeys,
  checkTypeNames,
  checkTypesImport,
  checkVueAttrs,
} from "../../scripts/check-components.mjs"
import { colorProblems } from "../../scripts/check-colors.mjs"
import {
  allowlistErrors,
  customProperties,
  literals,
  primitives,
} from "../../scripts/check-css-vars.mjs"
import { fileProblems } from "../../scripts/check-file.mjs"
import {
  added,
  driftAdditions,
  entries,
  intended,
} from "../../scripts/check-ratchets.mjs"
import { indexProblems } from "../../scripts/generate-search-index.mjs"
import { localBaselines } from "../../scripts/check-screenshot-authors.mjs"
import { releasedApi } from "../../scripts/released-api.mjs"
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

describe("check-browser-support", () => {
  const samples: Record<string, string> = {
    "anchor-positioning": ".a { anchor-name: --a; }",
    attr: '.a { content: attr(data-label type(<string>), ""); }',
    "backdrop-filter": "::backdrop { backdrop-filter: blur(4px); }",
    "box-decoration-break": ".a { box-decoration-break: clone; }",
    "calc-size": ".a { block-size: calc-size(auto, size); }",
    "color-mix": ".a { color: color-mix(in oklch, red, blue); }",
    "container-queries": "@container (inline-size > 30em) { .a { gap: 0; } }",
    "container-scroll-state-queries":
      "@container scroll-state(stuck: top) { .a { gap: 0; } }",
    "container-style-queries":
      "@container not style(--ui-contrast: more) { .a { gap: 0; } }",
    "corner-shape": ".a { corner-shape: squircle; }",
    "customizable-select": "select { appearance: base-select; }",
    "details-content": "details::details-content { opacity: 0; }",
    "dir-pseudo": ".a:dir(rtl) { scale: -1 1; }",
    "display-animation": ".a { transition: display 1s allow-discrete; }",
    "exp-functions": ".a { font-size: calc(1rem * pow(1.2, 2)); }",
    "field-sizing": "textarea { field-sizing: content; }",
    has: ".a:has(> svg) { gap: 0; }",
    "interest-invokers": ".a { interest-delay: 0.5s; }",
    "interpolate-size": ":root { interpolate-size: allow-keywords; }",
    lh: ".a { block-size: 0.5lh; }",
    "light-dark": ".a { color: light-dark(white, black); }",
    marker: "li::marker { color: red; }",
    "nth-child-of": ".a:nth-child(2 of .b) { gap: 0; }",
    "open-pseudo": "select:open { gap: 0; }",
    "overflow-clip": ".a { overflow: clip; }",
    overlay: ".a { transition: opacity 1s, overlay 1s allow-discrete; }",
    popover: ".a:popover-open { opacity: 1; }",
    "progress-function": ".a { --p: progress(100vi, 20rem, 80rem); }",
    "registered-custom-properties":
      '@property --a { inherits: false; initial-value: 0; syntax: "<number>"; }',
    "relative-color": ".a { color: oklch(from red l c h); }",
    "round-mod-rem": ".a { line-height: round(up, 1.4em, 4px); }",
    scope: "@scope (.a) { p { gap: 0; } }",
    "scroll-buttons": ".a::scroll-button(inline-start) { content: ''; }",
    "scroll-driven-animations": ".a { animation-timeline: scroll(); }",
    "scroll-marker-targets": ".a::scroll-marker:target-current { gap: 0; }",
    "scroll-markers": ".a { scroll-marker-group: after; }",
    "scroll-snap": ".a { scroll-snap-type: x mandatory; }",
    "scrollbar-gutter": ".a { scrollbar-gutter: stable; }",
    "scrollbar-width": ".a { scrollbar-width: thin; }",
    "sibling-count": ".a { --n: sibling-count(); }",
    "starting-style": "@starting-style { .a { opacity: 0; } }",
    "text-box": ".a { text-box: trim-both cap alphabetic; }",
    "text-wrap-pretty": ".a { text-wrap: pretty; }",
    "transition-behavior": ".a { transition-behavior: allow-discrete; }",
    "trig-functions": ".a { inset: calc(50% * sin(45deg)); }",
    "user-pseudos": "input:user-invalid { color: red; }",
  }

  test("every pattern detects its feature", () => {
    expect(Object.keys(samples)).toEqual(patterns.map(({ id }) => id))
    expect(
      Object.entries(samples).filter(
        ([id, css]) => !featureIds(css).includes(id),
      ),
    ).toEqual([])
  })

  test("the patterns skip near misses", () => {
    expect(
      featureIds(
        ".a[open] { --_overlay: 1rlh; block-size: 2rem; overflow: hidden; transition: opacity 1s; }",
      ),
    ).toEqual([])
  })

  test("reads the HTML features from the attributes and elements of the examples", () => {
    expect(
      htmlFeatureIds([
        '<dialog closedby="any" id="d"><button commandfor="d" command="close" interestfor="t">Close</button></dialog>',
        '<div id="t" popover="hint"></div><details name="a"></details><datalist id="l"></datalist>',
      ]),
    ).toEqual([
      "datalist",
      "details-name",
      "dialog-closedby",
      "interest-invokers",
      "invoker-commands",
      "popover",
      "popover-hint",
    ])
    expect(
      htmlFeatureIds([
        '<div closedby="any" name="a"><input list="l" /><button popovertarget="p">Open</button></div>',
      ]),
    ).toEqual([])
  })

  test("reports missing, unused and undetected ids, and widely available ones only next to another", () => {
    expect(
      pageProblems({
        available: new Set(["light-dark"]),
        ids: ["light-dark", "popover", "scroll-snap", "zoom"],
        used: new Set(["has", "scroll-snap", "starting-style"]),
      }),
    ).toEqual({
      missing: ["has", "starting-style"],
      undetected: ["zoom"],
      unused: ["popover"],
    })
    expect(
      pageProblems({
        available: new Set(),
        ids: ["popover"],
        ignored: ["starting-style"],
        used: new Set(["has", "popover", "starting-style"]),
      }),
    ).toEqual({ missing: [], undetected: [], unused: [] })
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

  test("reports every absolute unit, not the units that scale with the type", () => {
    expect(
      literals(
        ".ui-a { margin: 1cm 2in 3mm 4pc; padding: 5pt 6Q 1em 2ex 3lh 4ch; }",
        new Set(),
      ),
    ).toEqual([
      "margin: 1cm",
      "margin: 2in",
      "margin: 3mm",
      "margin: 4pc",
      "padding: 5pt",
      "padding: 6Q",
    ])
  })

  test("reads style attributes and style blocks, and declares only what CSS or a style object sets", () => {
    const { declared, read } = customProperties(
      "src/A.astro",
      `---
const knob = (name: string) => name
const size = knob("--ui-tpyo")
---
<div style="--_gap: 1rem; color: var(--ui-text-strnog)"></div>
<div style={\`--count: \${size}\`}></div>
<p style={{ "--_size": size }}>{"--ui-string"}</p>
<style>
  @container style(--ui-contrast: more) {
    .a { --_accent: var(--ui-primary); }
  }
</style>
<script>
  element.style.setProperty("--_x", "1")
</script>`,
    )
    expect([...declared].toSorted()).toEqual([
      "--_accent",
      "--_gap",
      "--_size",
      "--_x",
      "--count",
    ])
    expect([...read].toSorted()).toEqual([
      "--ui-contrast",
      "--ui-primary",
      "--ui-text-strnog",
    ])
  })

  test("counts the optional tokens commented out in theme.css as declared", () => {
    expect([
      ...customProperties(
        "css/theme.css",
        ":root {\n  --ui-a: 1;\n  /* --ui-b: var(--ui-a); */\n  /* a note */\n}",
      ).declared,
    ]).toEqual(["--ui-b", "--ui-a"])
    expect([
      ...customProperties("css/a.css", "/* --ui-b: 1; */").declared,
    ]).toEqual([])
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

describe("check-colors", () => {
  test("reports colors outside comments, and skips tests and generated files", () => {
    expect(
      colorProblems("a.css", "/* #fff */\n.a {\n  color: rgb(0 0 0);\n}\n"),
    ).toEqual(["a.css:3: rgb(...)"])
    expect(colorProblems("tests/unit/a.test.ts", 'const a = "#fff"')).toEqual(
      [],
    )
    expect(colorProblems("notes.txt", "#fff")).toEqual([])
  })
})

describe("check-file", () => {
  test("reports nothing for a clean file", async () => {
    expect(
      await fileProblems(
        "packages/opui/css/components/a.css",
        ".a {\n  color: oklch(0 0 0);\n  inset: 0;\n}\n",
      ),
    ).toEqual([])
  })

  test("reports forbidden characters, colors and unsorted declarations with their fix", async () => {
    expect(
      await fileProblems(
        "packages/opui/css/components/a.css",
        `/* one ${EM_DASH} two */\n.a {\n  inset: 0;\n  color: #fff;\n}\n`,
      ),
    ).toEqual([
      "packages/opui/css/components/a.css:1: em dash (U+2014). Use a comma, a slash or parentheses instead.",
      "packages/opui/css/components/a.css:4: #fff is not OKLCH. Write it as oklch().",
      "packages/opui/css/components/a.css: CSS declarations are out of order. Run pnpm sort-css.",
    ])
  })

  test("only checks the declaration order inside the sort-css globs", async () => {
    expect(
      await fileProblems(
        "scripts/a.css",
        ".a {\n  inset: 0;\n  color: red;\n}\n",
      ),
    ).toEqual([])
  })
})

describe("check-screenshot-authors", () => {
  const BOT = "41898282+github-actions[bot]@users.noreply.github.com"

  test("reports the baselines whose last change isn't the bot's", () => {
    const log = [
      `\0${BOT}`,
      "",
      "a.png",
      "\0me@example.com",
      "",
      "a.png",
      "b.png",
      `\0${BOT}`,
      "",
      "b.png",
    ].join("\n")
    expect(localBaselines(["a.png", "b.png", "c.png"], log)).toEqual([
      { author: "me@example.com", file: "b.png" },
      { author: undefined, file: "c.png" },
    ])
  })

  test("reports nothing when the bot made every last change", () => {
    expect(localBaselines(["a.png"], `\0${BOT}\n\na.png`)).toEqual([])
  })
})

describe("released-api", () => {
  const api = releasedApi(".", "src/component-api/custom-properties")

  test("finds the props, classes and inputs of the working tree", () => {
    expect(api.props).toMatchObject({
      Button: {
        Button: expect.arrayContaining([
          "as",
          "color",
          "href",
          "size",
          "variant",
        ]),
      },
    })
    expect([...api.classes]).toContain(".ui-button")
    expect(Object.values(api.inputs).flat()).toContain("--_accent")
  })

  test("finds props for every component folder", () => {
    expect(Object.keys(api.props).toSorted()).toEqual(
      readdirSync("packages/opui/components", { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .map(({ name }) => name)
        .toSorted(),
    )
  })
})

describe("file discovery", () => {
  const UNSORTED = `/* one ${EM_DASH} two */\n.a {\n  inset: 0;\n  color: #fff;\n}\n`
  const SORTED = ".a {\n  color: oklch(100% 0 0);\n  inset: 0;\n}\n"

  const repo = (files: Record<string, string>) => {
    const root = mkdtempSync(join(tmpdir(), "opui-scan-"))
    execFileSync("git", ["init", "-q"], { cwd: root })
    for (const [file, text] of Object.entries({
      ".gitignore": "ignored/\n",
      "scripts/generated-files.json": '{ "files": ["generated/out.css"] }\n',
      ...files,
    })) {
      mkdirSync(dirname(join(root, file)), { recursive: true })
      writeFileSync(join(root, file), text)
    }
    return (script: string, ...args: string[]) => {
      const { status, stderr } = spawnSync("node", [script, ...args], {
        encoding: "utf-8",
        env: { ...process.env, OPUI_ROOT: root },
      })
      return { status, stderr }
    }
  }

  test("each check scans its own files and skips the rest", () => {
    const run = repo({
      "generated/out.css": UNSORTED,
      "ignored/a.css": UNSORTED,
      "notes/a.css": UNSORTED,
      "src/a.css": UNSORTED,
      "tests/a.css": UNSORTED,
    })
    const characters = run("scripts/check-characters.mjs")
    expect(characters.status).toBe(1)
    expect(characters.stderr).toContain("src/a.css:1: em dash")
    expect(characters.stderr).not.toContain("ignored/")

    const colors = run("scripts/check-colors.mjs")
    expect(colors.status).toBe(1)
    expect(colors.stderr).toContain("src/a.css:4: #fff")
    expect(colors.stderr).toContain("notes/a.css:4: #fff")
    expect(colors.stderr).not.toMatch(/generated\/|ignored\/|tests\//)

    const sorted = run("scripts/sort-css.mjs", "--check")
    expect(sorted.status).toBe(1)
    expect(sorted.stderr).toContain("src/a.css")
    expect(sorted.stderr).not.toContain("notes/a.css")
  })

  test("each check passes once its files are fixed", () => {
    const run = repo({ "notes/a.css": SORTED, "src/a.css": SORTED })
    expect(run("scripts/check-characters.mjs").status).toBe(0)
    expect(run("scripts/check-colors.mjs").status).toBe(0)
    expect(run("scripts/sort-css.mjs", "--check").status).toBe(0)
  })
})

describe("check-ratchets", () => {
  test("reports a new ledger key and a new rule under a known key", () => {
    expect(
      added(
        entries({ "light/html/a": ["region"] }),
        entries({
          "dark/html/b": ["list"],
          "light/html/a": ["color-contrast", "region"],
        }),
      ),
    ).toEqual(["dark/html/b: list", "light/html/a: color-contrast"])
  })

  test("reports a new drift file and new drift lines, not moved context or fewer lines", () => {
    const diff = "===\n--- astro\n+++ react\n@@ -1,2 +1,2 @@\n <a>\n-x\n+y\n"
    expect(
      driftAdditions(
        { "a.react.diff": diff, "b.vue.diff": diff, "c.vue.diff": diff },
        {
          "a.react.diff": diff.replace("@@ -1,2 +1,2 @@", "@@ -3,2 +3,2 @@"),
          "b.vue.diff": `${diff}-z\n`,
          "c.vue.diff": diff.replace("+y\n", ""),
          "d.svelte.diff": diff,
        },
      ),
    ).toEqual([
      "b.vue.diff gained 1 drift line",
      "d.svelte.diff records new drift",
    ])
  })

  test("accepts the trailer on any commit, in any case", () => {
    expect(intended("\n\nIntended\n")).toBe(true)
    expect(intended("\nnot intended\n")).toBe(false)
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

  test("props and slots are typed with the framework's types file", () => {
    const vue = (imports: string) =>
      `<script setup lang="ts">\nimport type { ${imports} } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\n</script>\n`
    expect(
      checkPropsType(
        "TabsItem.vue",
        vue("TabsItemProps as Props, TabsItemSlots as Slots"),
        "vue",
        "TabsItemProps",
      ),
    ).toEqual([])
    expect(
      checkPropsType(
        "TabsItem.vue",
        vue("TabsItemProps as Props, Slots"),
        "vue",
        "TabsItemProps",
      ),
    ).toEqual([])
    expect(
      checkPropsType(
        "TabsItem.vue",
        vue("TabsItemProps as Props, TabsItemProps as Slots"),
        "vue",
        "TabsItemProps",
      ),
    ).toEqual([
      'types defineSlots with Slots, not with Slots or TabsItemSlots from "./types.vue-props"',
    ])
    expect(
      checkPropsType(
        "Tabs.astro",
        '---\nimport type { Props as TabsProps } from "./types.astro"\nconst { ...rest } = Astro.props\n---\n',
        "astro",
        "Props",
      ),
    ).toEqual([
      "imports Props as TabsProps: import it as Props, the type Astro reads for Astro.props",
    ])
    expect(
      checkPropsType(
        "Tabs.react.tsx",
        'import type { Props } from "./types.react"\n\nexport default function Tabs({ ...rest }) {\n  return <div {...rest} />\n}\n',
        "react",
        "Props",
      ),
    ).toEqual([
      'does not type its props with Props from "./types.react": annotate the props parameter with it',
    ])
  })

  test("rest is captured and spread", () => {
    const astro = (body: string) =>
      `---\nconst { size, ...rest } = Astro.props\n---\n${body}\n`
    expect(checkRest("Badge.astro", astro("<span {...rest} />"))).toEqual([])
    expect(
      checkRest(
        "Badge.astro",
        astro("<span {...(size ? { ...rest, size } : rest)} />"),
      ),
    ).toEqual([])
    expect(checkRest("Badge.astro", astro("<span />"))).toEqual([
      expect.stringContaining("captures ...rest but never spreads it"),
    ])
    expect(
      checkRest(
        "Badge.astro",
        "---\nconst { size } = Astro.props\n---\n<span />\n",
      ),
    ).toEqual([expect.stringContaining("does not capture ...rest")])
    expect(
      checkRest(
        "TableHead.astro",
        "---\nconst { ...rest } = Astro.props\n---\n<thead><slot /></thead>\n",
      ),
    ).toEqual([
      expect.stringContaining("captures ...rest but never spreads it"),
    ])
    const svelte = (script: string, markup: string) =>
      `<script lang="ts">\n  let { class: className, ...rest } = $props()\n  ${script}\n</script>\n\n${markup}\n`
    const unspread = [
      expect.stringContaining("captures ...rest but never spreads it"),
    ]
    expect(
      checkRest(
        "A.svelte",
        svelte(
          'const attrs = $derived({ ...rest, "data-a": "" })',
          "<div class={className} {...attrs}></div>",
        ),
      ),
    ).toEqual([])
    expect(
      checkRest(
        "A.svelte",
        svelte(
          'const attrs = $derived({ ...rest, "data-a": "" })',
          "<div class={className}></div>",
        ),
      ),
    ).toEqual(unspread)
    expect(
      checkRest(
        "A.svelte",
        svelte(
          "$effect(() => {\n    hasName({ ...rest, label: className })\n  })",
          "<div class={className}></div>",
        ),
      ),
    ).toEqual(unspread)
    expect(
      checkRest(
        "A.react.tsx",
        "export default function A({ href, ...rest }: Props) {\n  const attrs = useMemo(() => ({ ...rest, href }), [rest, href])\n  return <a href={href} />\n}\n",
      ),
    ).toEqual(unspread)
  })

  test("Vue binds the attributes it stops inheriting", () => {
    const options = "defineOptions({ inheritAttrs: false })"
    expect(checkVueAttrs(`${options}\n<input v-bind="$attrs" />`)).toEqual([])
    expect(checkVueAttrs(`${options}\n<input />`)).toEqual([
      expect.stringContaining('bind them with v-bind="$attrs"'),
    ])
  })

  test("Svelte and Vue models match the api.ts model", () => {
    const api = { api: "api.ts", svelte: ["value"], vue: ["modelValue"] }
    expect(
      checkModel(
        "Tabs.svelte",
        '<script lang="ts">\n  let { value = $bindable(), ...rest } = $props()\n</script>\n',
        "svelte",
        api,
      ),
    ).toEqual([])
    expect(
      checkModel(
        "Tabs.svelte",
        '<script lang="ts">\n  let { open = $bindable(), ...rest } = $props()\n</script>\n',
        "svelte",
        api,
      ),
    ).toEqual([
      "binds open with $bindable(), but the model in api.ts lists value for Svelte: bind exactly those",
    ])
    expect(
      checkModel(
        "Tabs.vue",
        '<script setup lang="ts">\nconst model = defineModel<string>()\n</script>\n',
        "vue",
        api,
      ),
    ).toEqual([])
    expect(
      checkModel(
        "Tabs.vue",
        '<script setup lang="ts">\ndefineProps<Props>()\n</script>\n',
        "vue",
        api,
      ),
    ).toEqual([
      "calls defineModel 0 time(s), but the model in api.ts lists 1 for Vue: call it once per model entry",
    ])
  })

  test("Vue provides a reactive() context", () => {
    const vue = (body: string) =>
      `<script setup lang="ts">\nimport { provide, reactive } from "vue"\n${body}\n</script>\n`
    expect(
      checkProvide("Tabs.vue", vue("provide(TabsKey, reactive({ value }))")),
    ).toEqual([])
    expect(
      checkProvide(
        "Tabs.vue",
        vue("const context = reactive({ value })\nprovide(TabsKey, context)"),
      ),
    ).toEqual([])
    expect(
      checkProvide(
        "Tabs.vue",
        vue("const context = { value }\nprovide(TabsKey, context)"),
      ),
    ).toEqual([
      "provides TabsKey without reactive(): Vue provides the Context object as reactive({ ... })",
    ])
  })

  test("context files export their names, use the Context type and build on the framework", () => {
    const react = (imports: string) =>
      `import { ${imports} } from "react"\nimport type { Context } from "./types"\n\nexport const TabsContext = createContext<Context | undefined>(undefined)\n\nexport const useTabsContext = () => useContext(TabsContext)\n`
    expect(
      checkContext(
        "context.react.ts",
        react("createContext, useContext"),
        "Tabs",
      ),
    ).toEqual([])
    expect(
      checkContext("context.react.ts", react("createContext"), "Tabs"),
    ).toEqual([
      'does not import useContext from "react": build the context the way the other components do (copy Tabs)',
    ])
    expect(
      checkContext(
        "context.vue.ts",
        'import type { InjectionKey } from "vue"\n\nexport const Key = Symbol() as InjectionKey<string>\n',
        "Tabs",
      ),
    ).toEqual([
      "exports Key: a context.vue.ts exports TabsKey",
      "does not take its shape from the Context type in ./types",
    ])
    expect(
      checkContext(
        "context.react.ts",
        'import { createContext, useContext } from "react"\nimport type { Context } from "./types"\n\nconst TabsContext = createContext<Context | undefined>(undefined)\nconst useTabsContext = () => useContext(TabsContext)\n\nexport { TabsContext, useTabsContext }\n',
        "Tabs",
      ),
    ).toEqual([])
  })

  test('"use client" marks exactly the React examples with client hooks or function props', () => {
    const example = (body: string) =>
      `export default function A() {\n  ${body}\n}\n`
    const client = (body: string) => `"use client"\n\n${example(body)}`
    expect(
      checkExampleClient("A.react.tsx", example("const id = useId()")),
    ).toEqual([])
    expect(
      checkExampleClient(
        "A.react.tsx",
        example("return <List render={(item) => item} />"),
      ),
    ).toEqual([expect.stringContaining('start it with "use client"')])
    expect(
      checkExampleClient(
        "A.react.tsx",
        example(
          "const render = (item) => item\n  return <List render={render} />",
        ),
      ),
    ).toEqual([expect.stringContaining('start it with "use client"')])
    expect(
      checkExampleClient("A.react.tsx", example("const t = useToast()")),
    ).toEqual([expect.stringContaining('start it with "use client"')])
    expect(
      checkExampleClient(
        "A.react.tsx",
        `function valueText(value: number) {\n  return value\n}\n\n${example("return <Range valueText={valueText} />")}`,
      ),
    ).toEqual([expect.stringContaining('start it with "use client"')])
    expect(
      checkExampleClient(
        "A.react.tsx",
        example(
          "const valueText = useCallback((value) => value, [])\n  return <Range valueText={valueText} />",
        ),
      ),
    ).toEqual([expect.stringContaining('start it with "use client"')])
    expect(
      checkExampleClient("A.react.tsx", client("const id = useId()")),
    ).toEqual([
      'starts with "use client" but uses no hooks, event handlers or function props',
    ])
  })

  test("React examples default-export a function named after the file", () => {
    const source = (imports: string, name: string) =>
      `import { ${imports} } from "opui-css/react"\n\nexport default function ${name}() {\n  return null\n}\n`
    expect(
      checkReactExample(
        "Basics.react.tsx",
        "Basics",
        source("Badge", "Basics"),
      ),
    ).toEqual([])
    expect(
      checkReactExample(
        "FieldGroup.react.tsx",
        "FieldGroup",
        source("FieldGroup", "FieldGroupExample"),
      ),
    ).toEqual([])
    expect(
      checkReactExample("Basics.react.tsx", "Basics", source("Badge", "Demo")),
    ).toEqual(["must default-export `function Basics()`, named after the file"])
  })

  test("examples don't wrap all of their content in example-row or example-column", () => {
    const wrapped =
      '<div class="example-row">\n  <span>a</span>\n  <div>b</div>\n</div>\n'
    const message =
      'wraps all of its content in example-row; drop the wrapper and set row on <AutoExample name="A">'
    expect(checkExampleWrapper("A.html", "A", wrapped)).toEqual([message])
    expect(
      checkExampleWrapper(
        "A.vue",
        "A",
        `<template>\n${wrapped}</template>\n\n<style>\n  span { color: red; }\n</style>\n`,
      ),
    ).toEqual([message])
    expect(
      checkExampleWrapper(
        "A.react.tsx",
        "A",
        'export default function A() {\n  return (\n    <>\n      <div className="example-row">a</div>\n    </>\n  )\n}\n',
      ),
    ).toEqual([message])
    expect(
      checkExampleWrapper(
        "A.html",
        "A",
        '<div class="example-row">a</div>\n<div class="example-row">b</div>\n',
      ),
    ).toEqual([])
  })

  test("props types are named Props and <Root><Part>Props", () => {
    expect(
      checkTypeNames(
        "types.react.ts",
        "export type Props = {}\nexport type TabsItemProps = {}\n",
        ["TabsItem"],
      ),
    ).toEqual([])
    expect(
      checkTypeNames("types.react.ts", "export type ItemProps = {}\n", [
        "TabsItem",
      ]),
    ).toEqual([
      "exports ItemProps: name the root's props Props and each part's <Root><Part>Props (Props, TabsItemProps)",
    ])
  })
})

describe("generate-search-index", () => {
  const entry = (category: string, id = category) => ({
    category,
    description: "A page.",
    id,
    title: "Page",
  })

  test("reports a category without entries, an unknown category and an entry without a description", () => {
    expect(
      indexProblems([
        entry("API"),
        entry("Blocks"),
        entry("Component"),
        entry("Guide"),
        entry("Notes"),
        { ...entry("Guide", "guide-empty"), description: "" },
      ]),
    ).toEqual([
      "Unknown search categories: Notes",
      "Search categories without entries: Learn",
      "Search entries without a title or description: guide-empty",
    ])
  })

  test("accepts an index with every category", () => {
    expect(
      indexProblems(
        ["API", "Blocks", "Component", "Guide", "Learn"].map((id) => entry(id)),
      ),
    ).toEqual([])
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
