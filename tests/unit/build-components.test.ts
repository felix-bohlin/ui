import { existsSync, readFileSync } from "node:fs"
import { format, resolveConfig } from "prettier"
import { beforeAll, describe, expect, test } from "vitest"
import {
  astroSourceOf,
  compileComponent,
  generate,
  handWrittenProblems,
  PORTS,
  readComponent,
  readHandWritten,
  toTypes,
  TYPE_FILES,
} from "../../scripts/build-components.mjs"

const sampleFile = (name = "Sample") =>
  `packages/opui/components/Sample/${name}.astro`

const astro = (body: string, frontmatter = "", name = "Sample") =>
  `---\nimport type { ${name === "Sample" ? "Props" : `${name}Props as Props`} } from "./types.astro"\n${frontmatter}\nconst { class: className, ...rest } = Astro.props\n---\n\n${body}\n`

const compile = async (source: string, name = "Sample") => {
  const { outputs } = await compileComponent(source, sampleFile(name))
  return Object.fromEntries(
    [...outputs].map(([file, code]) => [
      file.split(".").slice(1).join("."),
      code,
    ]),
  ) as Record<"react.tsx" | "svelte" | "vue", string>
}

describe("the three ports of a sample", () => {
  test("a wrapper: class list, rest and the default slot", async () => {
    const ports = await compile(
      astro(
        '<div class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</div>',
      ),
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, children, ...rest }: Props) {\n  return (\n    <div className={cx(["ui-sample", className])} {...rest}>\n      {children}\n    </div>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n</script>\n\n<div class={["ui-sample", className]} {...rest}>\n  {@render children?.()}\n</div>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport type { Props, Slots } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <div :class="[\'ui-sample\', $props.class]">\n    <slot></slot>\n  </div>\n</template>\n',
    )
  })

  test("casts rest on an element that isn't the one the types extend", async () => {
    const { outputs } = await compileComponent(
      astro(
        '{Astro.slots.has("default") ? (<div class:list={["ui-sample", className]} {...rest}><slot /></div>) : (<hr class:list={["ui-sample", className]} {...rest} />)}',
      ),
      sampleFile(),
      {
        types:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"hr">\n',
      },
    )
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain(
      'import type { SvelteHTMLElements } from "svelte/elements"',
    )
    expect(svelte).toContain(
      '<div\n    class={["ui-sample", className]}\n    {...rest as SvelteHTMLElements["div"]}\n  >',
    )
    expect(svelte).toContain(
      '<hr class={["ui-sample", className]} {...rest} />',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      '<div className={cx(["ui-sample", className])} {...rest}>',
    )
  })

  test("a variable tag with a default and a rest cast", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\nimport { cx } from "../cx"\n\nconst { as: Tag = "fieldset", class: className, ...rest } = Astro.props\n---\n\n<Tag class={cx(["ui-sample", className])} role={Tag === "fieldset" ? undefined : "group"} {...rest}>\n  <slot />\n</Tag>\n`,
    )
    expect(ports["react.tsx"]).toContain(
      'export default function Sample({ as, className, children, ...rest }: Props) {\n  const Tag: ElementType = as || "fieldset"',
    )
    expect(ports["react.tsx"]).toContain("{...(rest as object)}")
    expect(ports.svelte).toContain('as: Tag = "fieldset",')
    expect(ports.svelte).toContain(
      '<svelte:element\n  this={Tag}\n  class={["ui-sample", className]}\n  role={Tag === "fieldset" ? undefined : "group"}\n  {...rest}\n>',
    )
    expect(ports.vue).toContain(
      'const { as = "fieldset" } = defineProps<Props>()',
    )
    expect(ports.vue).toContain(
      "<component\n    :is=\"as\"\n    :class=\"['ui-sample', $props.class]\"\n    :role=\"as === 'fieldset' ? undefined : 'group'\"\n  >",
    )
  })

  test("a root without a class list keeps the class in Vue", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { ...rest } = Astro.props\n---\n\n<tbody {...rest}>\n  <slot />\n</tbody>\n`,
    )
    expect(ports.vue).toContain('<tbody :class="$props.class">')
    expect(ports["react.tsx"]).toContain("<tbody {...rest}>")
  })

  test("conditions, ternaries, a named slot and a text expression", async () => {
    const ports = await compile(
      astro(
        '<th class:list={[{ "ui-numeric": numeric }, className]} data-sort={sortable ? "" : undefined} {...rest}>\n  {sortable ? (<button type="button"><slot /></button>) : (<slot />)}\n  {label && <span class="ui-label">{label}<slot name="end-text" /></span>}\n</th>',
      ).replace(
        "const { class: className, ...rest }",
        "const { class: className, label, numeric, sortable, ...rest }",
      ),
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  label,\n  numeric,\n  sortable,\n  children,\n  endText,\n  ...rest\n}: Props) {\n  return (\n    <th\n      className={cx([{ "ui-numeric": numeric }, className])}\n      data-sort={sortable ? "" : undefined}\n      {...rest}\n    >\n      {sortable ? <button type="button">{children}</button> : <>{children}</>}\n      {label && (\n        <span className="ui-label">\n          {label}\n          {endText}\n        </span>\n      )}\n    </th>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n    numeric,\n    sortable,\n\n    // Snippets\n    children,\n    endText,\n    ...rest\n  }: Props = $props()\n</script>\n\n<th\n  class={[{ "ui-numeric": numeric }, className]}\n  data-sort={sortable ? "" : undefined}\n  {...rest}\n>\n  {#if sortable}<button type="button">{@render children?.()}</button\n    >{:else}{@render children?.()}{/if}\n  {#if label}<span class="ui-label">{label}{@render endText?.()}</span>{/if}\n</th>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label, numeric, sortable } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <th\n    :class="[{ \'ui-numeric\': numeric }, $props.class]"\n    :data-sort="sortable ? \'\' : undefined"\n  >\n    <button v-if="sortable" type="button"><slot></slot></button\n    ><slot v-else></slot>\n    <span v-if="label" class="ui-label"\n      >{{ label }}<slot name="end-text"></slot\n    ></span>\n  </th>\n</template>\n',
    )
  })

  test("a slot with fallback content, an icon import and a nested component", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\nimport { markerPath } from "./icons"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<summary class:list={[className]} {...rest}>\n  <slot />{" "}<slot name="marker"><svg aria-hidden="true"><path d={markerPath} /></svg></slot>\n  <Button round size="small">Close</Button>\n</summary>\n`,
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport Button from "../Button/Button.react"\nimport { markerPath } from "./icons"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  children,\n  marker,\n  ...rest\n}: Props) {\n  return (\n    <summary className={cx([className])} {...rest}>\n      {children}{" "}\n      {marker === undefined ? (\n        <svg aria-hidden="true">\n          <path d={markerPath} />\n        </svg>\n      ) : (\n        marker\n      )}\n      <Button round size="small">\n        Close\n      </Button>\n    </summary>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import Button from "../Button/Button.svelte"\n  import { markerPath } from "./icons"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n\n    // Snippets\n    children,\n    marker,\n    ...rest\n  }: Props = $props()\n</script>\n\n<summary class={[className]} {...rest}>\n  {@render children?.()}{" "}{#if marker}{@render marker()}{:else}<svg\n      aria-hidden="true"><path d={markerPath} /></svg\n    >{/if}\n  <Button round size="small">Close</Button>\n</summary>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport Button from "../Button/Button.vue"\nimport { markerPath } from "./icons"\nimport type { Props, Slots } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <summary :class="[$props.class]">\n    <slot></slot>{{ " "\n    }}<slot name="marker"\n      ><svg aria-hidden="true"><path :d="markerPath"></path></svg\n    ></slot>\n    <Button round size="small">Close</Button>\n  </summary>\n</template>\n',
    )
  })

  test("a part with a named slot types its Vue slots after the part", async () => {
    const ports = await compile(
      astro(
        '<p {...rest}>\n  <slot name="marker" />\n</p>',
        "",
        "SampleSummary",
      ),
      "SampleSummary",
    )
    expect(ports.vue).toContain(
      'import type {\n  SampleSummaryProps as Props,\n  SampleSummarySlots,\n} from "./types.vue-props"',
    )
    expect(ports.vue).toContain("defineSlots<SampleSummarySlots>()")
  })

  test.each([
    [
      "<div {...rest}>\n  <slot />\n</div>\n<p>Two</p>",
      "a template that isn't one element",
    ],
    [
      "<div>\n  <slot />\n</div>",
      "a template that doesn't spread rest on each root or on one inner element",
    ],
    [
      "<div {...rest}>\n  <slot />\n</div>\n\n<script>\n  init()\n</script>",
      "a <script>",
    ],
    [
      "<div {...rest}>{items.map((item) => <b>{item}</b>)}</div>",
      "the expression {items.map((item) => __markup0)}",
    ],
    ["<div {...rest} set:html={html} />", "the directive set:html"],
  ])("rejects %s", async (body, reason) => {
    await expect(compileComponent(astro(body), sampleFile())).rejects.toThrow(
      reason,
    )
  })

  test.each([
    [
      'const isLegend = Tag === "legend"',
      "the frontmatter statement `const isLegend",
    ],
    [
      'import { trimEdges } from "../whitespace"',
      "the import of ../whitespace",
    ],
    [
      'import { fieldGroupContext } from "../FieldGroup/context.astro"',
      "the import of ../FieldGroup/context.astro",
    ],
  ])("rejects the frontmatter %s", async (line, reason) => {
    await expect(
      readComponent(
        astro("<div {...rest}>\n  <slot />\n</div>", line),
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })
})

describe("toTypes", () => {
  const base =
    'export type Props = {\n  variant?: "a" | "b"\n}\n\nexport type SamplePartProps = {}\n'

  test("writes the three type files from types.ts and types.astro.ts", () => {
    const types = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n\nexport type SamplePartProps = HTMLAttributes<"dd">\n',
        base,
      },
      { Sample: ["default"], SamplePart: ["default"] },
    )
    expect(types.react).toBe(
      'import type * as Base from "./types"\nimport type { ComponentProps } from "react"\n\nexport type Props = Base.Props & ComponentProps<"div">\n\nexport type SamplePartProps = ComponentProps<"dd">\n',
    )
    expect(types.svelte).toBe(
      'import type * as Base from "./types"\nimport type { SvelteHTMLElements } from "svelte/elements"\n\nexport type Props = Base.Props & SvelteHTMLElements["div"]\n\nexport type SamplePartProps = SvelteHTMLElements["dd"]\n',
    )
    expect(types.vue).toBe(
      'import type { Class, DefaultSlots } from "../vue"\nimport type {\n  Props as BaseProps,\n} from "./types"\n\nexport type Props = BaseProps & Class\n\nexport type SamplePartProps = Class\n\nexport type Slots = DefaultSlots\n',
    )
  })

  test("a polymorphic root lists its tags for Vue", () => {
    const { vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "fieldset" } & HTMLAttributes<"fieldset">)\n  | (Base.Props & { as: "div" } & HTMLAttributes<"div">)\n',
        base,
      },
      { Sample: ["default"] },
    )
    expect(vue).toContain(
      'export type Props = BaseProps & Class & { as?: "div" | "fieldset" }',
    )
  })

  const simple =
    'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n'

  test("a Slots type joins the props in every framework", () => {
    const types = toTypes(
      "Sample",
      { astro: simple, base: `${base}\nexport type Slots<S> = { end?: S }\n` },
      { Sample: ["default", "end"] },
    )
    expect(types.react).toContain(
      'import type { ComponentProps, ReactNode } from "react"',
    )
    expect(types.react).toContain(
      'export type Props = Base.Props & Base.Slots<ReactNode> & ComponentProps<"div">',
    )
    expect(types.svelte).toContain('import type { Snippet } from "svelte"')
    expect(types.svelte).toContain(
      'export type Props = Base.Props & Base.Slots<Snippet> & SvelteHTMLElements["div"]',
    )
    expect(types.vue).toContain('import type { Slot } from "vue"')
    expect(types.vue).toContain(
      "export type Slots = BaseSlots<Slot> & DefaultSlots",
    )
  })

  test.each([
    [
      { astro: simple, base },
      { Sample: ["default", "end-text"] },
      "the slot end-text of Sample, which types.ts has no Slots type for",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { variant?: string | S }\n`,
      },
      { Sample: ["default", "variant"] },
      "a prop and a slot both named variant",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { "end-text"?: S } | { children: S }\n`,
      },
      { Sample: ["default", "end-text"] },
      "the type Slots, which is a union or sits on a union",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { endText?: S }\n`,
      },
      { Sample: ["default", "endText"] },
      "the slot endText, whose Vue name is kebab-case",
    ],
  ])("rejects %j", (files, slots, reason) => {
    expect(() => toTypes("Sample", files, slots)).toThrow(reason)
  })
})

describe("the compiled components", () => {
  let all: Awaited<ReturnType<typeof generate>>
  let unledgered: Awaited<ReturnType<typeof generate>>
  const handWritten = readHandWritten()

  beforeAll(async () => {
    all = await generate()
    unledgered = await generate({ handWritten: {} })
  }, 300_000)

  const read = (file: string) =>
    existsSync(file) ? readFileSync(file, "utf8") : undefined

  test("every component compiles or is in the ledger", () => {
    expect(all.problems).toEqual([])
    expect(all.outputs.size).toBeGreaterThan(100)
  })

  test("every compiled file is up to date", () => {
    expect(
      [...all.outputs]
        .filter(([file, code]) => read(file) !== code)
        .map(([file]) => file),
    ).toEqual([])
  })

  test("the ledger is sorted, names files that exist and only files the compiler refuses or that differ from its output", () => {
    expect(
      handWrittenProblems(handWritten, (file: string) => existsSync(file)),
    ).toEqual([])
    const refused = new Set(
      unledgered.problems.flatMap((problem) => {
        const match =
          /^packages\/opui\/components\/([^/]+)\/([^ ]+) uses /.exec(problem)
        if (!match) return []
        const [, folder, file] = match
        return file === "types.astro.ts"
          ? Object.values(TYPE_FILES).map((typeFile) => `${folder}/${typeFile}`)
          : Object.values(PORTS).map(
              (extension) => `${folder}/${file.replace(/\.astro$/, extension)}`,
            )
      }),
    )
    expect(
      Object.keys(handWritten).filter(
        (file) =>
          !refused.has(file) &&
          unledgered.outputs.get(`packages/opui/components/${file}`) ===
            read(`packages/opui/components/${file}`),
      ),
      "these files compile to what is committed: remove them from scripts/hand-written-components.json",
    ).toEqual([])
  })

  test("handWrittenProblems reports an unsorted ledger and a missing file", () => {
    expect(
      handWrittenProblems({ "b/B.vue": "r", "a/A.vue": "r" }, () => true),
    ).toEqual(["scripts/hand-written-components.json is not sorted"])
    expect(handWrittenProblems({ "a/Gone.vue": "r" }, () => false)).toEqual([
      "scripts/hand-written-components.json names a/Gone.vue, which doesn't exist",
    ])
  })

  test("astroSourceOf names the source of a compiled file and nothing for a hand-written one", () => {
    const exists = () => true
    expect(
      astroSourceOf(
        "packages/opui/components/Card/CardActions.vue",
        exists,
        {},
      ),
    ).toBe("packages/opui/components/Card/CardActions.astro")
    expect(
      astroSourceOf(
        "packages/opui/components/Card/types.svelte.ts",
        exists,
        {},
      ),
    ).toBe("packages/opui/components/Card/types.astro.ts")
    expect(
      astroSourceOf("packages/opui/components/Card/CardActions.vue", exists, {
        "Card/CardActions.vue": "reason",
      }),
    ).toBe(undefined)
    expect(
      astroSourceOf("packages/opui/components/Card/Card.astro", exists, {}),
    ).toBe(undefined)
    expect(
      astroSourceOf("src/component-examples/card/Default.vue", exists, {}),
    ).toBe(undefined)
  })

  test("the source formatted at printWidth 40 and 200 compiles to the same files", async () => {
    const sources = [
      ...new Set(
        [...all.outputs.keys()].map((file) =>
          astroSourceOf(file, () => true, {})!,
        ),
      ),
    ]
      .filter((file) => file.endsWith(".astro"))
      .toSorted()
    expect(sources.length).toBeGreaterThan(30)
    for (const file of sources) {
      const source = readFileSync(file, "utf8")
      const options = { ...(await resolveConfig(file)), filepath: file }
      for (const printWidth of [40, 200]) {
        const { outputs } = await compileComponent(
          await format(source, { ...options, printWidth }),
          file,
        )
        for (const [target, code] of outputs) {
          if (!all.outputs.has(target)) continue
          expect(
            code,
            `${target} from ${file} at printWidth ${printWidth}`,
          ).toBe(all.outputs.get(target))
        }
      }
    }
  }, 300_000)
})
