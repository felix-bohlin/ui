import { existsSync, readFileSync } from "node:fs"
import { beforeAll, describe, expect, test } from "vitest"
import {
  astroSourceOf,
  compileComponent,
  generate,
  handWrittenProblems,
  loadApis,
  PORTS,
  readComponent,
  readHandWritten,
  readTypes,
  toTypes,
  TYPE_FILES,
} from "../../scripts/build-components.mjs"
import {
  helpersCalled,
  importLinesOf,
  MODEL_KINDS,
} from "../../scripts/component-models.mjs"
import {
  classMayBeEmpty,
  isArrayType,
  unionMembers,
} from "../../scripts/component-shared.mjs"
import { formatCode } from "../../scripts/format.mjs"

type Kinds = Record<string, Record<string, Record<string, unknown>>>

const recordHookReads = (kinds: Kinds) => {
  const reads = new Map<string, Set<string>>()
  const originals = Object.entries(kinds).flatMap(([kind, frameworks]) =>
    Object.entries(frameworks).map(([framework, hooks]) => {
      const entry = `${kind}.${framework}`
      reads.set(entry, new Set())
      frameworks[framework] = new Proxy(hooks, {
        get: (target, key, receiver) => {
          if (typeof key === "string") reads.get(entry)!.add(key)
          return Reflect.get(target, key, receiver)
        },
      })
      return () => {
        frameworks[framework] = hooks
      }
    }),
  )
  return {
    reads,
    restore: () => {
      for (const restore of originals) restore()
    },
  }
}

const GENERIC_READS: Record<string, string> = {
  entries:
    "the type emitter asks the kind of every framework whether it takes defaultValue and onValueChange",
}

const hookProblems = (
  kinds: Kinds,
  reads: Map<string, Set<string>>,
  generic: Record<string, string> = {},
) => {
  const defined = new Map<string, Set<string>>()
  for (const frameworks of Object.values(kinds)) {
    for (const [framework, hooks] of Object.entries(frameworks)) {
      defined.set(
        framework,
        new Set([...(defined.get(framework) ?? []), ...Object.keys(hooks)]),
      )
    }
  }
  const unread = Object.entries(kinds).flatMap(([kind, frameworks]) =>
    Object.entries(frameworks).flatMap(([framework, hooks]) =>
      Object.keys(hooks)
        .filter((key) => !reads.get(`${kind}.${framework}`)?.has(key))
        .map(
          (key) =>
            `MODEL_KINDS.${kind}.${framework}.${key} is never read: remove it`,
        ),
    ),
  )
  const undefinedReads = [...reads].flatMap(([entry, keys]) => {
    const framework = entry.split(".")[1]!
    return [...keys]
      .filter((key) => !(key in generic) && !defined.get(framework)?.has(key))
      .map(
        (key) =>
          `the ${framework} emitter reads ${key}, which no model kind defines: remove the read`,
      )
  })
  const staleGeneric = Object.keys(generic)
    .filter((key) => ![...defined.values()].some((keys) => keys.has(key)))
    .map((key) => `${key} is a generic read no model kind defines: remove it`)
  return [
    ...new Set([...unread, ...undefinedReads, ...staleGeneric]),
  ].toSorted()
}

const sampleFile = (name = "Sample") =>
  `packages/opui/components/Sample/${name}.astro`

const astro = (body: string, frontmatter = "", name = "Sample") =>
  `---\nimport type { ${name === "Sample" ? "Props" : `${name}Props as Props`} } from "./types.astro"\n${frontmatter}\nconst { class: className, ...rest } = Astro.props\n---\n\n${body}\n`

type SampleFacts = {
  customTag?: string
  model?: Record<string, unknown>
  props?: string[]
  slots?: string[]
}

const typesOf = (
  files: { astro: string; base: string },
  components: Record<string, SampleFacts>,
) =>
  toTypes(
    readTypes("Sample", files),
    Object.entries(components).map(
      ([name, { props = [], slots = [], ...facts }]) => ({
        ...facts,
        name,
        props: props.map((prop) => ({ local: prop, prop })),
        slots,
      }),
    ),
  )

const compile = async (source: string, name = "Sample") => {
  const { outputs } = await compileComponent(source, sampleFile(name))
  return Object.fromEntries(
    [...outputs].map(([file, code]) => [
      file.split(".").slice(1).join("."),
      code,
    ]),
  ) as Record<"react.tsx" | "solid.tsx" | "svelte" | "vue", string>
}

beforeAll(async () => {
  await loadApis()
  await compileComponent(
    astro(
      '<button class:list={["ui-sample", className]} type="button" {...rest} />',
    ),
    sampleFile(),
  )
}, 120_000)

describe("the ports of a sample", () => {
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
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "children")\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      {props.children}\n    </div>\n  )\n}\n',
    )
  })

  test("a static value with quotes, a backslash, braces or a line break reads the same in each port", async () => {
    const title = async (attribute: string) => {
      const ports = await compile(
        astro(
          `<button class:list={["ui-sample", className]} type="button" ${attribute} {...rest} />`,
        ),
      )
      return Object.values(ports).map(
        (code) => code.match(/title=(\{[^\n]*\}|"[^"]*"|'[^']*')/)?.[1],
      )
    }
    expect(await title('title="say &quot;hi&quot;"')).toEqual([
      "'say \"hi\"'",
      "'say \"hi\"'",
      "{'say \"hi\"'}",
      "'say \"hi\"'",
    ])
    expect(await title(String.raw`title="a\b"`)).toEqual([
      String.raw`"a\b"`,
      String.raw`"a\b"`,
      String.raw`"a\b"`,
      String.raw`"a\b"`,
    ])
    expect(await title('title="{x}"')).toEqual([
      '"{x}"',
      '"{x}"',
      '{"{x}"}',
      '"{x}"',
    ])
    expect(await title('title="a&#10;b"')).toEqual([
      String.raw`{"a\nb"}`,
      String.raw`{"a\nb"}`,
      String.raw`{"a\nb"}`,
      '"a&#10;b"',
    ])
  })

  test("casts rest on an element that isn't the one the types extend", async () => {
    const { outputs } = await compileComponent(
      astro(
        '{Astro.slots.has("default") ? (<div class:list={["ui-sample", className]} {...rest}><slot /></div>) : (<hr class:list={["ui-sample", className]} {...rest} />)}',
      ),
      sampleFile(),
      {
        types: readTypes("Sample", {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"hr">\n',
        }),
      },
    )
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain(
      'import type { SvelteHTMLElements } from "svelte/elements"',
    )
    expect(svelte).toContain(
      '<div class={["ui-sample", className]} {...rest as SvelteHTMLElements["div"]}>\n    {@render children()}\n  </div>',
    )
    expect(svelte).toContain(
      '<hr class={["ui-sample", className]} {...rest} />',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      '<div className={cx(["ui-sample", className])} {...rest}>',
    )
  })

  test("a cast on a spread reads the same with or without parentheses", async () => {
    const compile = (spread: string) =>
      compileComponent(
        astro(`<button class:list={["ui-sample", className]} ${spread} />`),
        sampleFile(),
      )
    const bare = await compile('{...rest as HTMLAttributes<"button">}')
    const wrapped = await compile('{...(rest as HTMLAttributes<"button">)}')
    expect([...wrapped.outputs]).toEqual([...bare.outputs])
    expect(
      wrapped.outputs.get(sampleFile().replace(".astro", ".react.tsx")),
    ).toContain('<button className={cx(["ui-sample", className])} {...rest} />')
  })

  test("a variable tag with a default and a rest cast", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\nimport { cx } from "../cx"\n\nconst { as: Tag = "fieldset", class: className, ...rest } = Astro.props\n---\n\n<Tag class={cx(["ui-sample", className])} role={Tag === "fieldset" ? undefined : "group"} {...rest}>\n  <slot />\n</Tag>\n`,
    )
    expect(ports["react.tsx"]).toContain(
      'export default function Sample({ as, className, children, ...rest }: Props) {\n  const Tag = as || "fieldset"',
    )
    expect(ports["react.tsx"]).toContain(
      'import type { HTMLAttributes } from "react"\n',
    )
    expect(ports["react.tsx"]).toContain(
      "{...defined(rest as HTMLAttributes<HTMLElement>)}",
    )
    expect(ports.svelte).toContain('as: Tag = "fieldset",')
    expect(ports.svelte).toContain(
      '<svelte:element\n  this={Tag}\n  class={["ui-sample", className]}\n  role={Tag === "fieldset" ? undefined : "group"}\n  {...defined(rest)}\n>',
    )
    expect(ports.vue).toContain(
      'const { as: Tag = "fieldset" } = defineProps<Props>()',
    )
    expect(ports.vue).toContain(
      '<component\n    :is="Tag"\n    :class="[\'ui-sample\', $props.class]"\n    :role="Tag === \'fieldset\' ? undefined : \'group\'"\n    v-bind="defined(attrs)"\n  >',
    )
    expect(ports["solid.tsx"]).toContain(
      '  const rest = omit(props, "as", "class", "children")\n  const tag = () => props.as || "fieldset"\n  const Tag = dynamic(tag)\n  const role = () => (tag() === "fieldset" ? undefined : "group")\n',
    )
    expect(ports["solid.tsx"]).toContain(
      "role={role()}\n      {...defined(rest as object)}",
    )
  })

  test("a variable tag keeps its name and infers its type in React", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, wide, ...rest } = Astro.props\nconst Label = wide ? "div" : "span"\n---\n\n<Label class:list={["ui-sample", className]} {...rest}>{label}</Label>\n`,
    )
    expect(ports["react.tsx"]).toContain(
      'const Label = wide ? "div" : "span"\n\n  return (\n    <Label\n      className={cx(["ui-sample", className])}\n      {...(rest as HTMLAttributes<HTMLElement>)}\n    >',
    )
  })

  test("rest goes to the one element a condition picks, and a guarded tag renders through its guard", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, href, ...rest } = Astro.props\nconst Tag = href ? "a" : undefined\nconst onItem = !Tag\n---\n\n<li class:list={["ui-sample", className]} {...(onItem ? rest : {})}>\n  {Tag ? (\n    <Tag href={href} {...(onItem ? {} : rest)}><slot /></Tag>\n  ) : (\n    <slot />\n  )}\n</li>\n`,
    )
    expect(ports["react.tsx"]).toContain('const Tag = href ? "a" : undefined')
    expect(ports["react.tsx"]).not.toContain("ElementType")
    expect(ports["react.tsx"]).toContain(
      "{...(onItem ? (rest as object) : {})}",
    )
    expect(ports["react.tsx"]).toContain(
      "{...(onItem ? {} : (rest as HTMLAttributes<HTMLElement>))}",
    )
    expect(ports.svelte).toContain(
      '{...onItem ? (rest as SvelteHTMLElements["li"]) : {}}',
    )
    expect(ports.svelte).toContain("{...onItem ? {} : (rest as object)}")
    expect(ports.vue).toContain("inheritAttrs: false")
    expect(ports.vue).toContain("const attrs = useAttrs()\n")
    expect(ports.vue).toContain('v-bind="onItem ? attrs : {}"')
    expect(ports.vue).toContain('v-bind="onItem ? {} : attrs"')
  })

  test("a root without a class list keeps the class in Vue", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { ...rest } = Astro.props\n---\n\n<tbody {...rest}>\n  <slot />\n</tbody>\n`,
    )
    expect(ports.vue).toContain('<tbody v-bind="classAttrs($props.class)">')
    expect(ports.vue).toContain('import { classAttrs } from "../cx"')
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
      'import { defined } from "../attrs"\nimport { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  label,\n  numeric,\n  sortable,\n  children,\n  endText,\n  ...rest\n}: Props) {\n  return (\n    <th\n      className={cx([{ "ui-numeric": numeric }, className])}\n      data-sort={sortable ? "" : undefined}\n      {...defined(rest)}\n    >\n      {sortable ? <button type="button">{children}</button> : children}{" "}\n      {label && (\n        <span className="ui-label">\n          {label}\n          {endText}\n        </span>\n      )}\n    </th>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import { defined } from "../attrs"\n  import { classAttrs } from "../cx"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n    numeric,\n    sortable,\n\n    // Snippets\n    children,\n    endText,\n    ...rest\n  }: Props = $props()\n</script>\n\n<th\n  {...classAttrs([{ "ui-numeric": numeric }, className])}\n  data-sort={sortable ? "" : undefined}\n  {...defined(rest)}\n>\n  {#if sortable}\n    <button type="button">\n      {@render children?.()}\n    </button>\n  {:else}\n    {@render children?.()}\n  {/if}\n  {#if label}\n    <span class="ui-label">\n      {label}{@render endText?.()}\n    </span>\n  {/if}\n</th>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { useAttrs } from "vue"\nimport { defined } from "../attrs"\nimport { classAttrs } from "../cx"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label, numeric, sortable } = defineProps<Props>()\ndefineSlots<Slots>()\n\ndefineOptions({\n  inheritAttrs: false,\n})\n\nconst attrs = useAttrs()\n</script>\n\n<template>\n  <th\n    :data-sort="sortable ? \'\' : undefined"\n    v-bind="{\n      ...defined(attrs),\n      ...classAttrs([{ \'ui-numeric\': numeric }, $props.class]),\n    }"\n  >\n    <button v-if="sortable" type="button"><slot></slot></button>\n    <slot v-else></slot>{{ " "\n    }}<span v-if="label" class="ui-label"\n      >{{ label }}<slot name="end-text"></slot\n    ></span>\n  </th>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { children, omit } from "solid-js"\nimport { defined } from "../attrs"\nimport { cx } from "../cx"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(\n    props,\n    "class",\n    "label",\n    "numeric",\n    "sortable",\n    "children",\n    "endText",\n  )\n  const resolvedChildren = children(() => props.children)\n\n  return (\n    <th\n      class={cx([{ "ui-numeric": props.numeric }, props.class])}\n      data-sort={props.sortable ? "" : undefined}\n      {...defined(rest)}\n    >\n      {props.sortable ? (\n        <button type="button">{resolvedChildren()}</button>\n      ) : (\n        resolvedChildren()\n      )}{" "}\n      {props.label && (\n        <span class="ui-label">\n          {props.label}\n          {props.endText}\n        </span>\n      )}\n    </th>\n  )\n}\n',
    )
  })

  test("a slot with fallback content, an icon import and a nested component", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\nimport { markerPath } from "./icons"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<summary class:list={[className]} {...rest}>\n  <slot />{" "}<slot name="marker"><svg aria-hidden="true"><path d={markerPath} /></svg></slot>\n  <Button round size="small">Close</Button>\n</summary>\n`,
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport Button from "../Button/Button.react"\nimport { markerPath } from "./icons"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  children,\n  marker,\n  ...rest\n}: Props) {\n  return (\n    <summary className={cx([className])} {...rest}>\n      {children}{" "}\n      {marker === undefined ? (\n        <svg aria-hidden="true">\n          <path d={markerPath} />\n        </svg>\n      ) : (\n        marker\n      )}{" "}\n      <Button round size="small">\n        Close\n      </Button>\n    </summary>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import Button from "../Button/Button.svelte"\n  import { markerPath } from "./icons"\n  import { classAttrs } from "../cx"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n\n    // Snippets\n    children,\n    marker,\n    ...rest\n  }: Props = $props()\n</script>\n\n<summary {...classAttrs(className)} {...rest}>\n  {@render children?.()}{" "}{#if marker}\n    {@render marker()}\n  {:else}\n    <svg aria-hidden="true">\n      <path d={markerPath} />\n    </svg>\n  {/if}\n  <Button round size="small">Close</Button>\n</summary>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport Button from "../Button/Button.vue"\nimport { markerPath } from "./icons"\nimport { classAttrs } from "../cx"\nimport type { Props, Slots } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <summary v-bind="classAttrs($props.class)">\n    <slot></slot>{{ " " }}<slot v-if="$slots.marker" name="marker"></slot>\n    <svg v-else aria-hidden="true"><path :d="markerPath" /></svg>{{ " "\n    }}<Button round size="small">Close</Button>\n  </summary>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { children, omit } from "solid-js"\nimport Button from "../Button/Button.solid"\nimport { markerPath } from "./icons"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "children", "marker")\n  const resolvedMarker = children(() => props.marker)\n\n  return (\n    <summary class={props.class} {...rest}>\n      {props.children}{" "}\n      {resolvedMarker() === undefined ? (\n        <svg aria-hidden="true">\n          <path d={markerPath} />\n        </svg>\n      ) : (\n        resolvedMarker()\n      )}{" "}\n      <Button round size="small">\n        Close\n      </Button>\n    </summary>\n  )\n}\n',
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

  test("a context read and a provide around the default slot", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\nimport { fieldGroupContext } from "../FieldGroup/context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst field = fieldGroupContext.get()\nconst html = await sampleContext.provide(\n  { name: name || field?.name, open: true },\n  () => Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
    )
    expect(ports["react.tsx"]).toBe(
      '"use client"\n\nimport { useMemo } from "react"\nimport { cx } from "../cx"\nimport { SampleContext } from "./context.react"\nimport { useFieldGroupContext } from "../FieldGroup/context.react"\nimport type { Props } from "./types.react"\nimport type { Context } from "./types"\n\nexport default function Sample({ className, name, children, ...rest }: Props) {\n  const field = useFieldGroupContext()\n  const context = useMemo<Context>(\n    () => ({ name: name || field?.name, open: true }),\n    [field?.name, name],\n  )\n\n  return (\n    <SampleContext value={context}>\n      <div className={cx(["ui-sample", className])} {...rest}>\n        {children}\n      </div>\n    </SampleContext>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import { setSampleContext } from "./context.svelte"\n  import { getFieldGroupContext } from "../FieldGroup/context.svelte"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    name,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n\n  const field = getFieldGroupContext()\n  setSampleContext({\n    get name() {\n      return name || field?.name\n    },\n    get open() {\n      return true\n    },\n  })\n</script>\n\n<div class={["ui-sample", className]} {...rest}>\n  {@render children?.()}\n</div>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { computed, inject, provide, reactive } from "vue"\nimport { SampleKey } from "./context.vue"\nimport { FieldGroupKey } from "../FieldGroup/context.vue"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { name } = defineProps<Props>()\ndefineSlots<Slots>()\n\nconst field = inject(FieldGroupKey, undefined)\n\nprovide(\n  SampleKey,\n  reactive({\n    name: computed(() => name || field?.name),\n    open: computed(() => true),\n  }),\n)\n</script>\n\n<template>\n  <div :class="[\'ui-sample\', $props.class]">\n    <slot></slot>\n  </div>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport { SampleContext } from "./context.solid"\nimport { useFieldGroupContext } from "../FieldGroup/context.solid"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "name", "children")\n  const field = useFieldGroupContext()\n\n  return (\n    <SampleContext\n      value={{\n        get name() {\n          return props.name || field?.name\n        },\n        get open() {\n          return true\n        },\n      }}\n    >\n      <div class={["ui-sample", props.class]} {...rest}>\n        {props.children}\n      </div>\n    </SampleContext>\n  )\n}\n',
    )
  })

  test("a React provider reads defined(rest) into attrs above its memo", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst html = await sampleContext.provide({ name }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<section aria-label={name} class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</section>\n',
    )
    expect(ports["react.tsx"]).toContain(
      "  const attrs = defined(rest)\n  const context = useMemo<Context>(() => ({ name }), [name])\n",
    )
    expect(ports["react.tsx"]).toContain(
      '        className={cx(["ui-sample", className])}\n        {...attrs}\n',
    )
    expect(ports["react.tsx"]).not.toContain("{...defined(")
  })

  test("a React provider names its memo contextValue when the body holds a context", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst context = name || "sample"\nconst html = await sampleContext.provide({ name: context }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
    )
    expect(ports["react.tsx"]).toContain(
      '  const context = name || "sample"\n  const contextValue = useMemo<Context>(() => ({ name: context }), [context])\n',
    )
    expect(ports["react.tsx"]).toContain("<SampleContext value={contextValue}>")
  })

  test("refuses a const named Context in a provider for React only, which imports the type under that name", async () => {
    const result = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst Context = name || "sample"\nconst html = await sampleContext.provide({ name: Context }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
      sampleFile(),
    )
    expect([...result.refused.keys()]).toEqual([
      sampleFile().replace(".astro", ".react.tsx"),
    ])
    expect(
      result.refused.get(sampleFile().replace(".astro", ".react.tsx"))?.message,
    ).toContain(
      "the name `Context`, which the React port imports for the type of its provided value",
    )
  })

  test.each([
    [
      "",
      '{ label: rest["aria-label"], id: rest.id }',
      "`rest` itself in the provided context value, an object that is new on every render",
    ],
    [
      'const label = () => name + "!"\n',
      "{ label }",
      "the const `label` in the provided context value, a function, an object or an array that is new on every render",
    ],
    [
      "const label = { name }\n",
      "{ label }",
      "the const `label` in the provided context value, a function, an object or an array that is new on every render",
    ],
    [
      "const label = [name]\n",
      "{ label }",
      "the const `label` in the provided context value, a function, an object or an array that is new on every render",
    ],
    [
      "const label = name ? [name] : undefined\n",
      "{ label }",
      "the const `label` in the provided context value, a function, an object or an array that is new on every render",
    ],
    [
      "const box = { name }\nconst label = box\n",
      "{ label }",
      "the const `label` in the provided context value, a function, an object or an array that is new on every render",
    ],
  ])(
    "refuses a provider whose memo would never hold for React only: %s%s",
    async (lines, value, reason) => {
      const result = await compileComponent(
        `---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\n${lines}const html = await sampleContext.provide(${value}, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n`,
        sampleFile(),
      )
      expect([...result.refused.keys()]).toEqual([
        sampleFile().replace(".astro", ".react.tsx"),
      ])
      expect(
        result.refused.get(sampleFile().replace(".astro", ".react.tsx"))
          ?.message,
      ).toContain(reason)
    },
  )

  test("a React provider that reads a member of rest, a primitive const and a const from a call lists them as the memo's dependencies", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\nimport { autoLabelledBy } from "../id"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst groupName = name || "sample"\nconst labelledBy = autoLabelledBy(rest, groupName)\nconst html = await sampleContext.provide(\n  { id: rest.id, labelledBy, name: groupName },\n  () => Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
    )
    expect(ports["react.tsx"]).toContain(
      '  const groupName = name || "sample"\n  const labelledBy = autoLabelledBy(rest, groupName)\n  const context = useMemo<Context>(\n    () => ({ id: rest.id, labelledBy, name: groupName }),\n    [groupName, labelledBy, rest.id],\n  )\n',
    )
  })

  test("ids from the framework's uid and a warning behind an if", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { autoLabelledBy, createIds } from "../id"\nimport { warnMissingId } from "../dev"\n\nconst { class: className, id: idProp, ...rest } = Astro.props\n\nconst titleId = createIds(Astro.locals, "sample", idProp)("title")\nconst labelledBy = autoLabelledBy(rest, titleId)\nif (!labelledBy) {\n  warnMissingId("Sample", idProp)\n}\n---\n\n<section\n  aria-labelledby={labelledBy}\n  class:list={["ui-sample", className]}\n  id={idProp}\n  {...rest}\n>\n  <slot />\n</section>\n',
    )
    expect(ports["react.tsx"]).toBe(
      'import { useId } from "react"\nimport { defined } from "../attrs"\nimport { cx } from "../cx"\nimport { autoLabelledBy } from "../id"\nimport { warnMissingId } from "../dev"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  id: idProp,\n  children,\n  ...rest\n}: Props) {\n  const uid = useId()\n  const titleId = `${idProp || `sample-${uid}`}-title`\n  const labelledBy = autoLabelledBy(rest, titleId)\n  if (!labelledBy) {\n    warnMissingId("Sample", idProp)\n  }\n\n  return (\n    <section\n      aria-labelledby={labelledBy}\n      className={cx(["ui-sample", className])}\n      id={idProp}\n      {...defined(rest)}\n    >\n      {children}\n    </section>\n  )\n}\n',
    )
    expect(ports.svelte).toContain(
      '  const uid = $props.id()\n  const titleId = $derived(`${idProp || `sample-${uid}`}-title`)\n  const labelledBy = $derived(autoLabelledBy(rest, titleId))\n  untrack(() => {\n    if (!labelledBy) {\n      warnMissingId("Sample", idProp)\n    }\n  })\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { computed, type HTMLAttributes, useAttrs, useId } from "vue"\nimport { autoLabelledBy } from "../id"\nimport { warnMissingId } from "../dev"\nimport { defined } from "../attrs"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { id: idProp } = defineProps<Props>()\ndefineSlots<Slots>()\n\ndefineOptions({\n  inheritAttrs: false,\n})\n\nconst attrs = useAttrs() as HTMLAttributes\n\nconst uid = useId()\n\nconst titleId = computed(() => `${idProp || `sample-${uid}`}-title`)\n\nconst labelledBy = computed(() => autoLabelledBy(attrs, titleId.value))\n\nif (!labelledBy.value) {\n  warnMissingId("Sample", idProp)\n}\n</script>\n\n<template>\n  <section\n    :aria-labelledby="labelledBy"\n    :class="[\'ui-sample\', $props.class]"\n    :id="idProp"\n    v-bind="defined(attrs)"\n  >\n    <slot></slot>\n  </section>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toContain(
      '  const uid = createUniqueId()\n  const titleId = () => `${props.id || `sample-${uid}`}-title`\n  const labelledBy = () => autoLabelledBy(rest, titleId())\n  untrack(() => {\n    if (!labelledBy()) {\n      warnMissingId("Sample", props.id)\n    }\n  })\n',
    )
  })

  test("a base id names its parts, and createId a generated id", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { createId, createIds } from "../id"\n\nconst { class: className, id, label, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\nconst idOf = createId(Astro.locals)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <input aria-describedby={ids("hint")} id={ids()} />\n  <span id={ids("hint")}>{label}</span>\n  <span id={idOf("status")} role="status" />\n</div>\n',
    )
    expect(ports["react.tsx"]).toContain(
      "  const uid = useId()\n  const base = id || `sample-${uid}`\n",
    )
    expect(ports.svelte).toContain(
      "  const uid = $props.id()\n  const base = $derived(id || `sample-${uid}`)\n",
    )
    expect(ports.vue).toContain(
      "const uid = useId()\n\nconst base = computed(() => id || `sample-${uid}`)\n",
    )
    expect(ports["solid.tsx"]).toContain(
      "  const uid = createUniqueId()\n  const base = () => props.id || `sample-${uid}`\n",
    )
    for (const [port, attribute] of [
      [
        ports["react.tsx"],
        (name: string, value: string) => `${name}={${value}}`,
      ],
      [ports.svelte, (name: string, value: string) => `${name}={${value}}`],
      [ports.vue, (name: string, value: string) => `:${name}="${value}"`],
    ] as const) {
      expect(port).toContain(attribute("aria-describedby", "`${base}-hint`"))
      expect(port).toContain(attribute("id", "base"))
      expect(port).toContain(attribute("id", "`status-${uid}`"))
    }
    expect(ports["solid.tsx"]).toContain("aria-describedby={`${base()}-hint`}")
    expect(ports["solid.tsx"]).toContain("id={base()}")
    expect(ports["solid.tsx"]).toContain("id={`status-${uid}`}")
    for (const port of Object.values(ports)) {
      expect(port).not.toMatch(/createIds?\b/)
    }
  })

  test("an empty id falls back to the generated base with ||", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { createIds } from "../id"\n\nconst { class: className, id, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\n---\n\n<input class:list={["ui-sample", className]} id={ids()} {...rest} />\n',
    )
    expect(ports["react.tsx"]).toContain("const base = id || `sample-${uid}`")
    expect(ports["solid.tsx"]).toContain(
      "const base = () => props.id || `sample-${uid}`",
    )
  })

  test.each([
    ["ids(part)", "an id factory used as `ids(part)`"],
    ["[ids].map((id) => id())", "an id factory used as `[ids]"],
  ])("rejects the id factory read as %s", async (read, reason) => {
    await expect(
      readComponent(
        `---\nimport type { Props } from "./types.astro"\nimport { createIds } from "../id"\n\nconst { class: className, id, part, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\nconst described = ${read}\n---\n\n<div aria-describedby={described} {...rest} />\n`,
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })

  const layoutSample = (body: string) =>
    compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, value, ...rest } = Astro.props\n---\n\n${body}\n`,
    )

  test("whitespace between the children of a grid container goes", async () => {
    const ports = await layoutSample(
      '<label class:list={["ui-field", className]} {...rest}>\n  <span class="ui-label">{label}</span>\n  <input type="range" />\n  <slot />\n</label>',
    )
    expect(ports["react.tsx"]).toContain(
      '<span className="ui-label">{label}</span>\n      <input type="range" />\n      {children}\n',
    )
    expect(ports.vue).toContain(
      '<span class="ui-label">{{ label }}</span>\n    <input type="range" />\n    <slot></slot>\n',
    )
  })

  test.each([
    [
      "a rule on its own class gives it another display in some context",
      '<label class:list={["ui-toggle-button", className]} {...rest}>\n  <input type="checkbox" />\n  <slot />\n</label>',
      '<input type="checkbox" /> {children}',
    ],
    [
      "a neighbour can be display: contents",
      '<label class:list={["ui-field", className]} {...rest}>\n  <span class="ui-copy"><slot /></span>\n  <slot name="end" />\n</label>',
      '<span className="ui-copy">{children}</span> {end}',
    ],
    [
      "text sits on both sides",
      '<label class:list={["ui-field", className]} {...rest}>\n  {label} {value}\n  <input type="range" />\n</label>',
      "{label} {value}\n",
    ],
  ])("whitespace stays in a grid container when %s", async (_, body, kept) => {
    expect((await layoutSample(body))["react.tsx"]).toContain(kept)
  })

  test("Svelte and Vue put the content of an element or block on its own lines, and Svelte renders a guarded snippet without ?.", async () => {
    const ports = await layoutSample(
      '<p class:list={["ui-sample", className]} {...rest}>\n  {Astro.slots.has("end") && <span class="ui-end"><slot name="end" /></span>}\n  {label && <b><slot name="start" /></b>}\n</p>',
    )
    expect(ports.svelte).toContain(
      '  {#if end}\n    <span class="ui-end">\n      {@render end()}\n    </span>\n  {/if}\n  {#if label}\n    <b>\n      {@render start?.()}\n    </b>\n  {/if}\n',
    )
    expect(ports.vue).toContain(
      '<span v-if="$slots.end" class="ui-end"><slot name="end"></slot></span\n    >{{ " " }}<b v-if="label"><slot name="start"></slot></b>',
    )
  })

  test("a slot check on a prop of the same name drops the repeated read in React and Svelte, and Vue keeps the slot", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, ...rest } = Astro.props\nconst hasLabel = !!label || Astro.slots.has("label")\n---\n\n<p class:list={["ui-sample", className]} {...rest}>\n  {hasLabel && <b>{label}<slot name="label" /></b>}\n</p>\n',
    )
    expect(ports["react.tsx"]).toContain("const hasLabel = !!label\n")
    expect(ports.svelte).toContain("const hasLabel = $derived(!!label)\n")
    expect(ports.vue).toContain(
      "const hasLabel = () => !!label || slots.label\n",
    )
  })

  test("the content of a pre keeps its whitespace", async () => {
    const ports = await layoutSample(
      '<pre class:list={["ui-sample", className]} {...rest}><b>{label}</b> <i><slot /></i></pre>',
    )
    expect(ports.svelte).toContain(
      '<pre class={["ui-sample", className]} {...rest}><b>{label}</b>{" "}<i\n    >{@render children?.()}</i\n  ></pre>',
    )
    expect(ports.vue).toContain(
      '<pre\n    :class="[\'ui-sample\', $props.class]"\n  ><b>{{ label }}</b>{{ " " }}<i><slot></slot></i></pre>',
    )
    expect(ports["solid.tsx"]).toContain(
      '<pre class={["ui-sample", props.class]} {...rest}>\n      <b>{props.label}</b> <i>{props.children}</i>\n    </pre>',
    )
  })

  test("a dashed attribute of a declared prop needs no filter in Vue", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, closeLabel, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} close-label={closeLabel} {...rest}>\n  <slot />\n</opui-sample>\n',
    )
    expect(ports.vue).toContain(
      '<component\n    is="opui-sample"\n    :class="[\'ui-sample\', $props.class]"\n    :close-label="closeLabel"\n  >',
    )
    expect(ports.vue).not.toContain("inheritAttrs")
    expect(ports["react.tsx"]).toContain("{...defined(rest)}")
    expect(ports.svelte).toContain("{...defined(rest)}")
  })

  test("a side-effect script and a custom element", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} data-label={label} {...rest}>\n  <slot />\n  <span class="ui-sr-only" role="status"></span>\n</opui-sample>\n\n<script>\n  import "../../elements/sample.js"\n</script>\n',
    )
    expect(ports["react.tsx"]).toBe(
      '"use client"\n\nimport "../../elements/sample.js"\nimport { defined } from "../attrs"\nimport { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, label, children, ...rest }: Props) {\n  return (\n    <opui-sample\n      className={cx(["ui-sample", className])}\n      data-label={label}\n      {...defined(rest)}\n    >\n      {children} <span className="ui-sr-only" role="status" />\n    </opui-sample>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import "../../elements/sample.js"\n  import { defined } from "../attrs"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n</script>\n\n<opui-sample\n  class={["ui-sample", className]}\n  data-label={label}\n  {...defined(rest)}\n>\n  {@render children?.()}\n  <span class="ui-sr-only" role="status"></span>\n</opui-sample>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport "../../elements/sample.js"\nimport { useAttrs } from "vue"\nimport { defined } from "../attrs"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label } = defineProps<Props>()\ndefineSlots<Slots>()\n\ndefineOptions({\n  inheritAttrs: false,\n})\n\nconst attrs = useAttrs()\n</script>\n\n<template>\n  <component\n    is="opui-sample"\n    :class="[\'ui-sample\', $props.class]"\n    :data-label="label"\n    v-bind="defined(attrs)"\n  >\n    <slot></slot>{{ " " }}<span class="ui-sr-only" role="status"></span>\n  </component>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport "../../elements/sample.js"\nimport { defined } from "../attrs"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "label", "children")\n\n  return (\n    <opui-sample\n      class={["ui-sample", props.class]}\n      data-label={props.label}\n      {...defined(rest)}\n    >\n      {props.children} <span class="ui-sr-only" role="status" />\n    </opui-sample>\n  )\n}\n',
    )
  })

  test("Svelte re-creates a progress element whose value switches between a number and none, and React and Vue bind it", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, value, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]}>\n  <progress value={value} {...rest} />\n</div>\n',
    )
    expect(ports.svelte).toContain(
      '<div class={["ui-sample", className]}>\n  {#key value == null}\n    <progress {value} {...rest}></progress>\n  {/key}\n</div>\n',
    )
    expect(ports["react.tsx"]).toContain("<progress value={value} {...rest} />")
    expect(ports.vue).toContain(
      '<progress :value="value" v-bind="attrs"></progress>',
    )
  })

  test("two element scripts are two imports in React", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</opui-sample>\n\n<script>\n  import "../../elements/sample.js"\n  import "../../elements/other.js"\n</script>\n',
    )
    expect(ports["react.tsx"]).toContain(
      '"use client"\n\nimport "../../elements/sample.js"\nimport "../../elements/other.js"\n',
    )
    expect(ports["react.tsx"]).not.toContain("useEffect")
  })

  test("an event in types.ts listens on the root: a ref callback in React, a handler prop in Svelte, an emit in Vue and the on<Event> prop the rest spread carries in Solid, and each lifts data-hydrating from a custom element", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</opui-sample>\n\n<script>\n  import "../../elements/sample.js"\n</script>\n',
      sampleFile(),
      {
        types: readTypes("Sample", {
          base: "export type Props = {}\n\nexport type Events = {\n  close: Event\n}\n",
        }),
      },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension)) ?? ""
    expect(port(".react.tsx")).toBe(
      '"use client"\n\nimport "../../elements/sample.js"\nimport { cx } from "../cx"\nimport { useHydrated, useListener } from "../react"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  onClose,\n  ref,\n  children,\n  ...rest\n}: Props) {\n  const rootRef = useHydrated(useListener(ref, "close", onClose))\n\n  return (\n    <opui-sample\n      className={cx(["ui-sample", className])}\n      data-hydrating=""\n      ref={rootRef}\n      {...rest}\n    >\n      {children}\n    </opui-sample>\n  )\n}\n',
    )
    expect(port(".svelte")).toContain(
      "  let {\n    class: className,\n    onclose,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n",
    )
    expect(port(".svelte")).toContain(
      '  import { hydrated } from "../svelte"\n',
    )
    expect(port(".svelte")).toContain(
      '<opui-sample\n  class={["ui-sample", className]}\n  {onclose}\n  data-hydrating=""\n  {@attach hydrated}\n  {...rest}\n>',
    )
    expect(port(".vue")).toContain(
      'import type { Props, Emits, Slots } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\nconst emit = defineEmits<Emits>()\n',
    )
    expect(port(".vue")).toContain('import { vHydrated } from "../vue"\n')
    expect(port(".vue")).toContain(
      '    :class="[\'ui-sample\', $props.class]"\n    @close="emit(\'close\', $event)"\n    data-hydrating=""\n    v-hydrated\n  >',
    )
    expect(port(".solid.tsx")).toContain(
      'import { hydrated, hydrating } from "../solid"\n',
    )
    expect(port(".solid.tsx")).toContain(
      '  const rest = omit(props, "class", "ref", "children")\n',
    )
    expect(port(".solid.tsx")).toContain(
      '    <opui-sample\n      class={["ui-sample", props.class]}\n      {...hydrating()}\n      ref={[props.ref, hydrated]}\n      {...rest}\n    >',
    )
    expect(port(".solid.tsx")).not.toMatch(/data-hydrating|onClose/)
  })

  test("an event on a root tag that can be a custom element renders data-hydrating on the custom element only, and none on a plain root", async () => {
    const portsOf = async (source: string) => {
      const { outputs } = await compileComponent(source, sampleFile(), {
        types: readTypes("Sample", {
          base: "export type Props = {\n  open?: boolean\n}\n\nexport type Events = {\n  close: Event\n}\n",
        }),
      })
      return (extension: string) =>
        outputs.get(sampleFile().replace(".astro", extension)) ?? ""
    }
    const variablePort = await portsOf(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, open, ...rest } = Astro.props\n\nconst Root = open ? "opui-sample" : "section"\n---\n\n<Root class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</Root>\n',
    )
    const variable = variablePort(".react.tsx")
    expect(variable).toContain(
      'const rootRef = useHydrated(useListener(ref, "close", onClose))',
    )
    expect(variable).toContain(
      'data-hydrating={Root.includes("-") ? "" : undefined}\n      ref={rootRef}',
    )
    expect(variablePort(".solid.tsx")).toContain(
      '      {...hydrating(root().includes("-"))}\n      ref={[props.ref, hydrated]}\n',
    )
    expect(variablePort(".svelte")).toContain(
      '  data-hydrating={Root.includes("-") ? "" : undefined}\n  {@attach hydrated}\n',
    )
    expect(variablePort(".vue")).toContain(
      "    :data-hydrating=\"Root.includes('-') ? '' : undefined\"\n    v-hydrated\n",
    )
    const plainPort = await portsOf(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, open, ...rest } = Astro.props\n---\n\n<section class:list={["ui-sample", { "ui-open": open }, className]} {...rest}>\n  <slot />\n</section>\n',
    )
    const plain = plainPort(".react.tsx")
    expect(plain).toContain(
      'const rootRef = useListener(ref, "close", onClose)',
    )
    expect(plain).not.toMatch(/data-hydrating|useHydrated/)
    for (const extension of [".solid.tsx", ".svelte", ".vue"]) {
      expect(plainPort(extension)).not.toMatch(/hydrat/i)
    }
  })

  test("an event on a component with more than one root element is refused", async () => {
    await expect(
      compileComponent(
        astro(
          '<div class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</div>\n<p>After</p>',
        ),
        sampleFile(),
        {
          types: readTypes("Sample", {
            base: "export type Props = {}\n\nexport type Events = {\n  close: Event\n}\n",
          }),
        },
      ),
    ).rejects.toThrow(
      "the event close on a component whose root isn't one element",
    )
  })

  test("a native prop destructured under its HTML name takes its React name in React", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { "aria-describedby": ariaDescribedBy, class: className, inputmode, readonly, ...rest } = Astro.props\n---\n\n<input aria-describedby={ariaDescribedBy} class:list={["ui-sample", className]} inputmode={inputmode ?? "text"} readonly={readonly} {...rest} />\n',
      sampleFile(),
      {
        types: readTypes("Sample", {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"input">\n',
        }),
      },
    )
    const react = outputs.get(
      "packages/opui/components/Sample/Sample.react.tsx",
    )
    expect(react).toMatch(
      /\{\s*"aria-describedby": ariaDescribedBy,\s*className,\s*inputMode,\s*readOnly,\s*\.\.\.rest\s*\}/,
    )
    expect(react).toContain('inputMode={inputMode ?? "text"}')
    expect(react).toContain("readOnly={readOnly}")
    expect(react).not.toMatch(/inputmode|readonly/)
  })

  test("an object default prints on one line in every framework, however the source wraps it", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst {\n  class: className,\n  labels = {\n    one: "{count} item",\n    other: "{count} items",\n  },\n  ...rest\n} = Astro.props\n---\n\n<p class:list={["ui-sample", className]} {...rest}>{labels.other}</p>\n',
    )
    for (const [port, code] of Object.entries(ports)) {
      expect(code, port).toContain(
        port === "solid.tsx"
          ? '? { one: "{count} item", other: "{count} items" }'
          : 'labels = { one: "{count} item", other: "{count} items" }',
      )
    }
  })

  test("a class that is always one name skips cx in React", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { cx } from "../cx"\n\nconst { class: className, hideLabel, mark, ...rest } = Astro.props\n---\n\n<label class:list={["ui-sample", className]} {...rest}>\n  <span class={cx([hideLabel ? "ui-sr-only" : "ui-label"])}>Name</span>\n  <span class={cx([`ui-${mark}`])}>Mark</span>\n  <span class={cx([hideLabel && "ui-sr-only"])}>Hint</span>\n  <span class={cx([hideLabel ? ["ui-sr-only"] : "ui-label"])}>Note</span>\n</label>\n',
    )
    const react = ports["react.tsx"]
    expect(react).toContain(
      '<span className={hideLabel ? "ui-sr-only" : "ui-label"}>',
    )
    expect(react).toContain("<span className={`ui-${mark}`}>")
    expect(react).toContain(
      '<span className={cx([hideLabel && "ui-sr-only"])}>',
    )
    expect(react).toContain(
      '<span className={cx([hideLabel ? ["ui-sr-only"] : "ui-label"])}>',
    )
    expect(react).toContain('className={cx(["ui-sample", className])}')
  })

  test('set:html="" keeps React from hydrating content the page writes', async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} {...rest}>\n  <span class="ui-sr-only" role="status" set:html="" />\n</opui-sample>\n',
    )
    expect(ports["react.tsx"]).toMatch(
      /role="status"\s+dangerouslySetInnerHTML=\{\{ __html: "" \}\}\s+suppressHydrationWarning\s+\/>/,
    )
    expect(ports.svelte).toContain(
      '<span class="ui-sr-only" role="status"></span>',
    )
    expect(ports.vue).toContain(
      '<span class="ui-sr-only" role="status"></span>',
    )
    expect(ports["solid.tsx"]).toContain(
      '<span class="ui-sr-only" role="status" />',
    )
  })

  test("mergeStyle merges into an object in React and binds through styleAttrs in Vue", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { mergeStyle } from "../style"\n\nconst { class: className, style, width, ...rest } = Astro.props\n---\n\n<col class:list={[className]} style={mergeStyle({ width }, style)} {...rest} />\n',
    )
    expect(ports["react.tsx"]).toContain(
      "style={mergeStyle({ width }, style ?? {})}",
    )
    expect(ports.svelte).toContain("style={mergeStyle({ width }, style)}")
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { mergeStyle, styleAttrs } from "../style"\nimport { classAttrs } from "../cx"\nimport type { Props } from "./types.vue-props"\n\nconst { width } = defineProps<Props>()\n</script>\n\n<template>\n  <col\n    v-bind="{\n      ...classAttrs($props.class),\n      ...styleAttrs(mergeStyle({ width }, {})),\n    }"\n  />\n</template>\n',
    )
  })

  test("a trimmed slot renders through TrimmedSlot in Vue and tests as the slot", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { trimEdges } from "../whitespace"\n\nconst { class: className, label, ...rest } = Astro.props\n\nconst endSlot = Astro.slots.has("end")\n  ? trimEdges(await Astro.slots.render("end"))\n  : ""\n---\n\n<span class:list={["ui-sample", className]} {...rest}\n  >{label}<Fragment set:html={endSlot} />{\n    !label && endSlot && <i aria-hidden="true" set:html={endSlot} />\n  }</span\n>\n',
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, label, end, ...rest }: Props) {\n  return (\n    <span className={cx(["ui-sample", className])} {...rest}>\n      {label}\n      {end}\n      {!label && end && <i aria-hidden="true">{end}</i>}\n    </span>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n\n    // Snippets\n    end,\n    ...rest\n  }: Props = $props()\n</script>\n\n<span class={["ui-sample", className]} {...rest}>\n  {label}{@render end?.()}{#if !label && end}\n    <i aria-hidden="true">\n      {@render end()}\n    </i>\n  {/if}\n</span>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { TrimmedSlot } from "../whitespace.vue"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <span :class="[\'ui-sample\', $props.class]"\n    >{{ label }}<TrimmedSlot :nodes="$slots.end?.()" /><i\n      v-if="!label && $slots.end"\n      aria-hidden="true"\n      ><TrimmedSlot :nodes="$slots.end?.()" /></i\n  ></span>\n</template>\n',
    )
  })

  test("a set:html ternary over a trimmed slot renders it behind a condition", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { trimEdges } from "../whitespace"\n\nconst { class: className, hidden, ...rest } = Astro.props\n\nconst endSlot = Astro.slots.has("end")\n  ? trimEdges(await Astro.slots.render("end"))\n  : ""\n---\n\n<span class:list={[className]} {...rest}><Fragment set:html={hidden ? "" : endSlot} /></span>\n',
    )
    expect(ports["react.tsx"]).toContain("{!hidden && end}")
    expect(ports.svelte).toContain(
      "{#if !hidden}\n    {@render end?.()}\n  {/if}",
    )
    expect(ports.vue).toContain(
      '<span v-bind="classAttrs($props.class)">\n    <TrimmedSlot v-if="!hidden" :nodes="$slots.end?.()" />\n  </span>',
    )
  })

  test("two spreads on one element merge into one Vue v-bind in source order", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { tagAttrs } from "../tag"\n\nconst { class: className, disabled, extra, href, ...rest } = Astro.props\n---\n\n<li class:list={[className]} {...rest}>\n  <a {...tagAttrs("a", disabled, href)} aria-label="Open" tabindex={disabled ? -1 : 0} {...extra}>\n    <slot />\n  </a>\n</li>\n',
    )
    expect(ports.vue).toContain(
      "v-bind=\"{\n        ...tagAttrs('a', disabled, href),\n        'aria-label': 'Open',\n        tabindex: disabled ? -1 : 0,\n        ...extra,\n      }\"",
    )
    expect(ports["react.tsx"]).toContain(
      '<a\n        {...tagAttrs("a", disabled, href)}\n        aria-label="Open"\n        tabIndex={disabled ? -1 : 0}\n        {...extra}\n      >',
    )
  })

  test("a map callback with consts becomes a keyed each block", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {\n    items?.map(({ href, label, ...itemRest }) => {\n      const Tag = href ? "a" : "span"\n      return (\n        <li>\n          <Tag href={href} {...itemRest}>{label}</Tag>\n        </li>\n      )\n    })\n  }\n  <slot />\n</ul>\n',
    )
    expect(ports["react.tsx"]).toBe(
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, items, children, ...rest }: Props) {\n  return (\n    <ul className={cx(["ui-sample", className])} {...rest}>\n      {items?.map(({ href, label, ...itemRest }, index) => {\n        const Tag = href ? "a" : "span"\n        return (\n          <li key={index}>\n            <Tag href={href} {...itemRest}>\n              {label}\n            </Tag>\n          </li>\n        )\n      })}\n      {children}\n    </ul>\n  )\n}\n',
    )
    expect(ports.svelte).toContain(
      '{#each items as { href, label, ...itemRest }, index (index)}\n    {@const Tag = href ? "a" : "span"}\n    <li>\n      <svelte:element this={Tag} {href} {...itemRest}>{label}</svelte:element>\n    </li>\n  {/each}',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { items } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <ul :class="[\'ui-sample\', $props.class]">\n    <li v-for="({ href, label, ...itemRest }, index) in items" :key="index">\n      <component :is="href ? \'a\' : \'span\'" :href="href" v-bind="itemRest">{{\n        label\n      }}</component>\n    </li>\n    <slot></slot>\n  </ul>\n</template>\n',
    )
    expect(ports["solid.tsx"]).toContain(
      '      <For each={props.items} keyed={false}>\n        {(item) => {\n          const itemRest = () => omit(item(), "href", "label")\n          const tag = () => (item().href ? "a" : "span")\n          return (\n            <li>\n              <Dynamic component={tag()} href={item().href} {...itemRest()}>\n                {item().label}\n',
    )
  })

  test("a spread the Astro file filters with defined() stays filtered in every framework", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { defined } from "../attrs"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {\n    items?.map(({ label, ...itemRest }) => (\n      <li>\n        <button type="button" {...defined(itemRest)}>{label}</button>\n      </li>\n    ))\n  }\n</ul>\n',
    )
    for (const port of Object.values(ports)) {
      expect(port).toContain('import { defined } from "../attrs"')
    }
    expect(ports["react.tsx"]).toContain(
      '<button type="button" {...defined(itemRest)}>',
    )
    expect(ports.svelte).toContain(
      '<button type="button" {...defined(itemRest)}>',
    )
    expect(ports.vue).toContain(
      '<button type="button" v-bind="defined(itemRest)">',
    )
  })

  test("a tag that is sometimes Fragment compiles as a condition when its content is the condition's", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { trimEdges } from "../whitespace"\n\nconst hint = (text: string) => text.toUpperCase()\n\nconst { class: className, label, ...rest } = Astro.props as Props\n\nconst labelSlot = Astro.slots.has("label")\n  ? trimEdges(await Astro.slots.render("label"))\n  : ""\nconst LabelTag = label || labelSlot ? "span" : Fragment\n---\n\n<label class:list={["ui-sample", className]} data-hint={hint(label ?? "")} {...rest}>\n  <LabelTag class="ui-label">{label}<Fragment set:html={labelSlot} /></LabelTag>\n</label>\n',
    )
    expect(ports["react.tsx"]).toContain(
      "  const hint = (text: string) => text.toUpperCase()\n",
    )
    expect(ports["react.tsx"]).toContain(
      '      {label && <span className="ui-label">{label}</span>}\n',
    )
    expect(ports.svelte).toContain(
      "  const hint = (text: string) => text.toUpperCase()\n",
    )
    expect(ports.svelte).toContain(
      '  {#if label}\n    <span class="ui-label">\n      {@render content(label)}\n    </span>\n  {/if}\n',
    )
    expect(ports.vue).toContain(
      "const hint = (text: string) => text.toUpperCase()\n",
    )
    expect(ports.vue).toContain(
      '    <span v-if="label || $slots.label" class="ui-label"\n      >{{ label }}<TrimmedSlot :nodes="$slots.label?.()"\n    /></span>\n',
    )
  })

  test("a tag that is sometimes Fragment compiles as two branches around other content", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { trimEdges } from "../whitespace"\n\nconst { class: className, label, ...rest } = Astro.props\n\nconst labelSlot = Astro.slots.has("label")\n  ? trimEdges(await Astro.slots.render("label"))\n  : ""\nconst LabelTag = label || labelSlot ? "span" : Fragment\n---\n\n<label class:list={["ui-sample", className]} {...rest}>\n  <LabelTag class="ui-label">{label}<b>!</b></LabelTag>\n</label>\n',
    )
    expect(ports.svelte).toContain(
      '  {#if label}\n    <span class="ui-label">\n      {@render content(label)}<b>!</b>\n    </span>\n  {:else}\n    {@render content(label)}<b>!</b>\n  {/if}\n',
    )
    expect(ports.vue).toContain(
      '    <span v-if="label || $slots.label" class="ui-label"\n      >{{ label }}<b>!</b></span\n    >\n    <template v-else>{{ label }}<b>!</b></template>\n',
    )
  })

  test("a map callback that takes the index keys and reads it by its name", async () => {
    const ports = await compile(
      astro(
        '<ol class:list={["ui-sample", className]} {...rest}>\n  {items.map((item, step) => <li value={step + 1}>{item}</li>)}\n</ol>',
      ),
    )
    expect(ports["react.tsx"]).toContain(
      "{items.map((item, step) => (\n        <li key={step} value={step + 1}>",
    )
    expect(ports.svelte).toContain(
      "{#each items as item, step (step)}\n    <li value={step + 1}>",
    )
    expect(ports.vue).toContain(
      '<li v-for="(item, step) in items" :key="step" :value="step + 1">',
    )
    expect(ports["solid.tsx"]).toContain(
      "<For each={items} keyed={false}>\n        {(item, step) => <li value={step + 1}>{item()}</li>}\n      </For>",
    )
  })

  test("Solid reads a default only for undefined and tests an accessor with && where the content only prints it", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, size = "medium", ...rest } = Astro.props\n\nconst caption = label?.trim()\n---\n\n<div class:list={["ui-sample", size !== "medium" && `ui-${size}`, className]} {...rest}>\n  {caption && <span class="ui-caption">{caption}</span>}\n  <slot />\n</div>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "label", "size", "children")\n  const size = () => (props.size === undefined ? "medium" : props.size)\n  const caption = () => props.label?.trim()\n\n  return (\n    <div\n      class={["ui-sample", size() !== "medium" && `ui-${size()}`, props.class]}\n      {...rest}\n    >\n      {caption() && <span class="ui-caption">{caption()}</span>}{" "}\n      {props.children}\n    </div>\n  )\n}\n',
    )
  })

  test("Vue binds the attributes on a component root explicitly", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<Button class:list={["ui-sample", className]} {...rest}><slot /></Button>\n',
    )
    expect(ports.vue).toContain("defineOptions({\n  inheritAttrs: false,\n})")
    expect(ports.vue).toContain('v-bind="$attrs"')
  })

  test("Solid resolves a slot it reads twice once through children()", async () => {
    const ports = await compile(
      astro(
        '<div class:list={["ui-sample", className]} {...rest}>\n  {Astro.slots.has("default") && <span class="ui-label"><slot /></span>}\n</div>',
      ),
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { children, omit } from "solid-js"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "children")\n  const resolvedChildren = children(() => props.children)\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      {resolvedChildren() && <span class="ui-label">{resolvedChildren()}</span>}\n    </div>\n  )\n}\n',
    )
  })

  test("Solid reads an accessor once into a local where a derived value reads it twice, so TypeScript narrows it", async () => {
    const source =
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n\nconst first = items?.[0]\nconst caption = typeof first === "object" ? first.label : first\n---\n\n<div class:list={["ui-sample", className]} {...rest}>{caption}</div>\n'
    const ports = await compile(source)
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "items")\n  const first = () => props.items?.[0]\n  const caption = () => {\n    const firstValue = first()\n    return typeof firstValue === "object" ? firstValue.label : firstValue\n  }\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      {caption()}\n    </div>\n  )\n}\n',
    )
    const clash = await compileComponent(
      source.replace(
        "const first = items?.[0]\n",
        "const first = items?.[0]\nconst firstValue = 1\n",
      ),
      sampleFile(),
    )
    expect([...clash.refused.keys()]).toEqual([
      sampleFile().replace(".astro", ".solid.tsx"),
    ])
    expect(
      clash.refused.get(sampleFile().replace(".astro", ".solid.tsx"))?.message,
    ).toContain("uses the name firstValue")
  })

  test("Solid reads a ternary, &&, || or ?? in a component's prop through an accessor named after the attribute, since each read of the compiled prop takes a hydration id", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\n\nconst buttonTitle = "Close"\nconst { class: className, items, label, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Button title={label ? "Labelled" : rest.title}>Close</Button>\n  {items.map((item) => <Button title={item && label}>{item}</Button>)}\n  <p title={label ? buttonTitle : undefined} />\n</div>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { For, omit } from "solid-js"\nimport Button from "../Button/Button.solid"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "items", "label")\n  const buttonTitle = "Close"\n  const title = () => (props.label ? "Labelled" : rest.title)\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      <Button title={title()}>Close</Button>{" "}\n      <For each={props.items} keyed={false}>\n        {(item) => {\n          const itemTitle = () => item() && props.label\n          return <Button title={itemTitle()}>{item()}</Button>\n        }}\n      </For>\n      <p title={props.label ? buttonTitle : undefined} />\n    </div>\n  )\n}\n',
    )
    const logical = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Button id={label ?? rest.id} title={rest.title || label} type="button">Close</Button>\n</div>\n',
    )
    expect(logical["solid.tsx"]).toContain(
      '  const id = () => props.label ?? rest.id\n  const title = () => rest.title || props.label\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      <Button id={id()} title={title()} type="button">\n',
    )
  })

  test("Solid lists with For, reads the index as a number and builds a slot once per item, since a node has one parent", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {items.map((item, index) => (\n    <li value={index + 1}>\n      {item}\n      {Astro.slots.has("icon") && <span class="ui-icon"><slot name="icon" /></span>}\n      <slot name="end" />\n    </li>\n  ))}\n</ul>\n',
    )
    expect(ports["solid.tsx"]).toContain(
      'import { children, For, omit } from "solid-js"',
    )
    expect(ports["solid.tsx"]).toContain(
      '  const rest = omit(props, "class", "items", "end", "icon")\n\n  return (\n',
    )
    expect(ports["solid.tsx"]).toContain(
      '      <For each={props.items} keyed={false}>\n        {(item, index) => {\n          const resolvedIcon = children(() => props.icon)\n          return (\n            <li value={index + 1}>\n              {item()}\n              {resolvedIcon() && <span class="ui-icon">{resolvedIcon()}</span>}\n              {props.end}\n            </li>\n          )\n        }}\n      </For>\n',
    )
  })

  test("a list is keyed by index in every framework, an option row too, and Solid reads an item through an accessor", async () => {
    const options = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<select class:list={["ui-sample", className]} {...rest}>\n  {items.map((item) => <option value={item.value}>{item.label}</option>)}\n</select>\n',
    )
    expect(options["solid.tsx"]).toContain(
      "      <For each={props.items} keyed={false}>\n        {(item) => <option value={item().value}>{item().label}</option>}\n      </For>\n",
    )
    expect(options["react.tsx"]).toContain(
      "{items.map((item, index) => (\n        <option key={index}",
    )
    expect(options.svelte).toContain("{#each items as item, index (index)}")
    expect(options.vue).toContain(
      '<option v-for="(item, index) in items" :key="index" :value="item.value">',
    )
    const rows = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ol class:list={["ui-sample", className]} {...rest}>\n  {items.map(({ description, ...item }) => <li {...item}>{description}</li>)}\n</ol>\n',
    )
    expect(rows["solid.tsx"]).toContain(
      '      <For each={props.items} keyed={false}>\n        {(entry) => {\n          const item = () => omit(entry(), "description")\n          return <li {...item()}>{entry().description}</li>\n        }}\n      </For>\n',
    )
    const refused = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ol class:list={["ui-sample", className]} {...rest}>\n  {items.map(({ label = "x" }) => <li>{label}</li>)}\n</ol>\n',
      sampleFile(),
    )
    expect(
      refused.refused.get(sampleFile().replace(".astro", ".solid.tsx"))
        ?.message,
    ).toContain("which Solid reads through an accessor")
  })

  test("Solid resolves the slots of a component that provides a context under the provider, and writes a getter inline when nothing else reads its accessor", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, ...rest } = Astro.props\n\nconst groupName = name || "sample"\nconst hasIcon = Astro.slots.has("icon")\nconst html = await sampleContext.provide(\n  { name: groupName, open: true },\n  () => Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", { "ui-icon": hasIcon }, className]} {...rest}>\n  {Astro.slots.has("icon") && <span class="ui-icon"><slot name="icon" /></span>}\n  <Fragment set:html={html} />\n</div>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { children, omit } from "solid-js"\nimport { SampleContext } from "./context.solid"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "name", "children", "icon")\n  const content = () => {\n    const resolvedIcon = children(() => props.icon)\n    const hasIcon = () => resolvedIcon()\n    return (\n      <div\n        class={["ui-sample", { "ui-icon": hasIcon() }, props.class]}\n        {...rest}\n      >\n        {resolvedIcon() && <span class="ui-icon">{resolvedIcon()}</span>}{" "}\n        {props.children}\n      </div>\n    )\n  }\n\n  return (\n    <SampleContext\n      value={{\n        get name() {\n          return props.name || "sample"\n        },\n        get open() {\n          return true\n        },\n      }}\n    >\n      {content()}\n    </SampleContext>\n  )\n}\n',
    )
  })

  test("Solid narrows with Show only where the content takes the value as an argument or a tag", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { tagAttrs } from "../tag"\n\nconst { class: className, href, label, ...rest } = Astro.props\n\nconst caption = label?.trim()\nconst Tag = href ? "a" : undefined\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  {caption && <span class="ui-caption">{caption}</span>}\n  {Tag ? <Tag {...tagAttrs(Tag, false, href)}><slot /></Tag> : <slot />}\n</div>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { dynamic } from "@solidjs/web"\nimport { children, omit, Show } from "solid-js"\nimport { tagAttrs } from "../tag"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "href", "label", "children")\n  const resolvedChildren = children(() => props.children)\n  const caption = () => props.label?.trim()\n  const tag = () => (props.href ? "a" : undefined)\n  const Tag = dynamic(tag)\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      {caption() && <span class="ui-caption">{caption()}</span>}{" "}\n      <Show when={tag()} fallback={resolvedChildren()}>\n        {(shownTag) => (\n          <Tag {...tagAttrs(shownTag(), false, props.href)}>\n            {resolvedChildren()}\n          </Tag>\n        )}\n      </Show>\n    </div>\n  )\n}\n',
    )
  })

  test("Solid writes a tag that is one string as the element, a class list of one entry as the entry, and keeps cx for an entry that can be false", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n\nconst Content = "selectedcontent"\n---\n\n<button class:list={[label ? "ui-labelled" : "ui-sample"]} {...rest}>\n  <Content />\n  <span class:list={[className]} />\n  <i class:list={[label && "ui-label"]} />\n</button>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { omit } from "solid-js"\nimport { cx } from "../cx"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "label")\n\n  return (\n    <button class={props.label ? "ui-labelled" : "ui-sample"} {...rest}>\n      <selectedcontent /> <span class={props.class} />{" "}\n      <i class={cx([props.label && "ui-label"])} />\n    </button>\n  )\n}\n',
    )
  })

  test("Solid hoists a condition only when it reads something reactive, names it after the attribute or the tag and the attribute, and hands props to a helper that reads the rest and props", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport Button from "../Button/Button.astro"\nimport { hasName, warnUnnamed } from "../dev"\n\nconst { class: className, items, label, ...rest } = Astro.props\n\nconst title = "Close"\nwarnUnnamed("Sample", hasName({ ...rest, label }, Astro.slots.has("default")))\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Button aria-invalid={label ? "true" : rest["aria-invalid"]} title={label ? title : undefined}>Close</Button>\n  {items.map((item) => {\n    const closes = !item\n    return <Button command={closes ? "hide-popover" : undefined} title={closes ? label : undefined}>{item}</Button>\n  })}\n  <slot />\n</div>\n',
    )
    expect(ports["solid.tsx"]).toBe(
      '/** @jsxImportSource @solidjs/web */\nimport { children, For, omit, untrack } from "solid-js"\nimport Button from "../Button/Button.solid"\nimport { hasName, warnUnnamed } from "../dev"\nimport type { Props } from "./types.solid"\n\nexport default function Sample(props: Props) {\n  const rest = omit(props, "class", "items", "label", "children")\n  const resolvedChildren = children(() => props.children)\n  const title = "Close"\n  untrack(() => {\n    warnUnnamed("Sample", hasName(props, resolvedChildren()))\n  })\n  const invalid = () => (props.label ? "true" : rest["aria-invalid"])\n  const buttonTitle = () => (props.label ? title : undefined)\n\n  return (\n    <div class={["ui-sample", props.class]} {...rest}>\n      <Button aria-invalid={invalid()} title={buttonTitle()}>\n        Close\n      </Button>{" "}\n      <For each={props.items} keyed={false}>\n        {(item) => {\n          const closes = () => !item()\n          const command = () => (closes() ? "hide-popover" : undefined)\n          const itemTitle = () => (closes() ? props.label : undefined)\n          return (\n            <Button command={command()} title={itemTitle()}>\n              {item()}\n            </Button>\n          )\n        }}\n      </For>{" "}\n      {resolvedChildren()}\n    </div>\n  )\n}\n',
    )
  })

  test("Vue computes the consts of a loop once per row where one is read more than once, and writes a const read once where it is read", async () => {
    const twice = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, label, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {items.map(({ href, text, ...item }) => {\n    const closes = !href && !label\n    return <li data-command={closes ? "hide" : undefined} title={closes ? label : undefined} {...item}>{text}</li>\n  })}\n</ul>\n',
    )
    expect(twice.vue).toContain(
      "const rows = computed(() =>\n  items.map((entry) => {\n    const { href } = entry\n    const closes = !href && !label\n    return { closes, entry }\n  }),\n)\n",
    )
    expect(twice.vue).toContain(
      '      v-for="({ closes, entry: { href, text, ...item } }, index) in rows"\n      :key="index"\n      :data-command="closes ? \'hide\' : undefined"\n      :title="closes ? label : undefined"\n',
    )
    const once = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, label, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {items.map(({ href, text, ...item }) => {\n    const closes = !href && !label\n    return <li data-command={closes ? "hide" : undefined} {...item}>{text}</li>\n  })}\n</ul>\n',
    )
    expect(once.vue).not.toContain("computed")
    expect(once.vue).toContain("!href && !label ? 'hide' : undefined")
  })

  test("Vue keeps the consts of a loop where they are read when one reads a slot, which a computed list would read once and without $slots", async () => {
    const { vue } = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {items.map(({ href, text, ...item }) => {\n    const marked = !href && Astro.slots.has("icon")\n    return <li data-marked={marked ? "true" : undefined} title={marked ? text : undefined} {...item}>{text}</li>\n  })}\n  <slot name="icon" />\n</ul>\n',
    )
    expect(vue).not.toContain("computed")
    expect(vue).not.toMatch(/(?<![$\w])slots\b/)
    expect(vue).toContain(
      '      v-for="({ href, text, ...item }, index) in items"\n      :key="index"\n      :data-marked="!href && $slots.icon ? \'true\' : undefined"\n      :title="!href && $slots.icon ? text : undefined"\n',
    )
  })

  test("Vue keeps the consts of a nested loop where they are read when the list or a const reads the outer loop's item, which the script doesn't have", async () => {
    const { vue } = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<ul class:list={["ui-sample", className]} {...rest}>\n  {items.map((group) => <li>{group.items.map((entry) => {\n    const both = group.label + entry.label\n    return <span data-both={both} title={both}>{entry.label}</span>\n  })}</li>)}\n</ul>\n',
    )
    expect(vue).not.toContain("computed")
    expect(vue.split("<template>")[0]).not.toContain("group")
    expect(vue).toContain(
      '        v-for="(entry, index) in group.items"\n        :key="index"\n        :data-both="group.label + entry.label"\n        :title="group.label + entry.label"\n',
    )
  })

  test("accepts a helper import from another component folder", async () => {
    await expect(
      readComponent(
        astro(
          "<div {...rest}>\n  <slot />\n</div>",
          'import { isSelected } from "../ToggleGroup/selection"',
        ),
        sampleFile(),
      ),
    ).resolves.toMatchObject({
      imports: ['import { isSelected } from "../ToggleGroup/selection"'],
    })
  })

  const modelApi = (prop: string, selector: string) => ({
    component: "Sample",
    model: { description: "", prop, type: "number | string" },
    options: [],
    parts: [{ description: "", model: true, selector }],
  })

  test("a value read by radios that check themselves against it is a radio group in every framework", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, name, value, ...rest } = Astro.props\n\nconst stars = [1, 2]\nconst current = Number(value)\n---\n\n<fieldset class:list={["ui-sample", className]} {...rest}>\n  <input checked={current === 0} name={name} type="radio" value="0" />\n  {stars.map((star) => (\n    <input checked={current === star} name={name} type="radio" value={star} />\n  ))}\n</fieldset>\n',
      sampleFile(),
      { api: modelApi("value", 'input[value="1"]') },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension)) ?? ""
    const react = port(".react.tsx")
    expect(react).toMatch(/^"use client"\n/)
    expect(react).toContain("defaultValue,")
    expect(react).toContain("onValueChange,")
    expect(react).not.toContain("onChange,")
    expect(react).toContain("const current = Number(value ?? defaultValue)")
    expect(react).toContain(
      "checked={value !== undefined ? current === star : undefined}",
    )
    expect(react).toContain(
      "defaultChecked={value !== undefined ? undefined : current === star}",
    )
    expect(react).toContain('onChange={() => onValueChange?.("0")}')
    expect(react).toContain("onChange={() => onValueChange?.(star)}")
    expect(react).not.toContain("seedChecked")
    expect(react).not.toContain("ref=")
    const svelte = port(".svelte")
    expect(svelte).toContain("value = $bindable(),")
    expect(svelte).toContain('value = "0"')
    expect(svelte).toContain("value = star")
    const vue = port(".vue")
    expect(vue).toContain(
      "const modelValue = defineModel<number | string>()\n\nconst bound = useBound()\n\nconst model = computed(() => modelValue.value ?? value)",
    )
    expect(vue).not.toContain("@change")
    expect(vue.match(/v-if="bound"/g)).toHaveLength(2)
    expect(vue.match(/v-model="modelValue"/g)).toHaveLength(2)
    expect(vue).toContain('v-bind="defined({ checked: current === 0 })"')
    expect(vue).toContain('v-bind="defined({ checked: current === star })"')
    expect(vue).toContain("const current = computed(() => Number(model.value))")
    const solid = port(".solid.tsx")
    expect(solid).toContain(
      '    "defaultValue",\n    "name",\n    "onValueChange",\n',
    )
    expect(solid).toContain(
      "const current = () => Number(props.value ?? props.defaultValue)",
    )
    expect(solid).toContain(
      "const checkedControl = control(\n    () => (props.value === undefined ? undefined : current() === 0),\n    untrack(() => current() === 0),\n  )",
    )
    expect(solid).toContain(
      "const itemCheckedControl = control(\n            () =>\n              props.value === undefined ? undefined : current() === star(),\n            untrack(() => current() === star()),\n          )",
    )
    expect(solid).toContain("{...itemCheckedControl.server}\n")
    expect(solid).toContain('onChange={() => props.onValueChange?.("0")}')
    expect(solid).toContain("onChange={() => props.onValueChange?.(star())}")
    expect(solid).toContain('import { control } from "../solid"\n')
    expect(solid).toContain("ref={itemCheckedControl.ref}")
  })

  test("Vue keeps the hyphenated props a component reads out of the attrs its root spreads", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { "aria-describedby": ariaDescribedBy, class: className, ...rest } = Astro.props\n---\n\n<fieldset class:list={["ui-sample", className]} {...rest}>\n  <input aria-describedby={ariaDescribedBy} />\n</fieldset>\n',
    )
    expect(ports.vue).toContain("inheritAttrs: false")
    expect(ports.vue).toContain(
      'const { "aria-describedby": _ariaDescribedBy, ...rest } = attrs',
    )
    expect(ports.vue).toContain('v-bind="restAttrs"')
  })

  test("Vue binds a style that can be empty through styleAttrs, merged with the attrs in attribute order", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { mergeStyle } from "../style"\n\nconst { "aria-describedby": ariaDescribedBy, class: className, max, style, ...rest } = Astro.props\n---\n\n<fieldset class:list={["ui-sample", className]} style={mergeStyle({ "--_max": max }, style)} {...rest}>\n  <input aria-describedby={ariaDescribedBy} />\n</fieldset>\n',
    )
    expect(ports.vue).toContain(
      'import { computed, type HTMLAttributes, mergeProps, useAttrs } from "vue"',
    )
    expect(ports.vue).toContain(
      'import { mergeStyle, styleAttrs } from "../style"',
    )
    expect(ports.vue).toContain(
      "mergeProps(styleAttrs(mergeStyle({ '--_max': max }, {})), restAttrs)",
    )
    expect(ports.vue).not.toContain(":style=")
  })

  test.each(["input", "select", "textarea"])(
    "refuses a value model on its own <%s> in every framework",
    async (tag) => {
      await expect(
        compileComponent(
          `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<label class:list={["ui-sample", className]}>\n  <${tag} {...rest}></${tag}>\n</label>\n`,
          sampleFile(),
          { api: modelApi("value", tag) },
        ),
      ).rejects.toMatchObject({
        code: "BC406",
        message: expect.stringContaining(
          `the value model of Sample on its own <${tag}>, which scripts/build-components.mjs can't compile: a component no longer binds the value of its own control: the user writes the <input>, <select> or <textarea> in a Field`,
        ),
      })
    },
  )

  test.each([
    [
      '<input type="text" {...rest} />',
      modelApi("checked", "input"),
      "the checked model of Sample, which isn't a checked or radio model of a control",
    ],
    [
      '<span {...rest}><input type="text" /><input type="text" /></span>',
      modelApi("value", "input"),
      "the value model of Sample, whose part input matches 2 elements",
    ],
    [
      "<span {...rest}></span>",
      modelApi("value", "input"),
      "the value model of Sample, whose part input matches no element",
    ],
  ])(
    "refuses a model it can't bind in every framework: %s",
    async (body, api, reason) => {
      await expect(
        compileComponent(
          `---\nimport type { Props } from "./types.astro"\n\nconst { ...rest } = Astro.props\n---\n\n${body}\n`,
          sampleFile(),
          { api },
        ),
      ).rejects.toThrow(reason)
    },
  )

  test("React takes an element attribute by its React name, and Vue keeps a boolean one undefined until it is set", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { autocomplete = "off", class: className, spellcheck, ...rest } = Astro.props\n---\n\n<span class:list={["ui-sample", className]}>\n  <input {...rest} autocomplete={autocomplete} spellcheck={spellcheck ?? "false"} />\n  <span popover></span>\n  <input disabled />\n</span>\n',
      sampleFile(),
      {
        types: readTypes("Sample", {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Omit<HTMLAttributes<"input">, "maxlength">\n',
        }),
      },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension))
    expect(port(".react.tsx")).toContain('autoComplete = "off",')
    expect(port(".react.tsx")).toContain("autoComplete={autoComplete}")
    expect(port(".react.tsx")).toContain("spellCheck,")
    expect(port(".react.tsx")).toContain('<span popover="" />')
    expect(port(".react.tsx")).toContain("<input disabled />")
    expect(port(".vue")).toContain(
      'const { autocomplete = "off", spellcheck = undefined } = defineProps<Props>()',
    )
    expect(
      typesOf(
        {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Omit<HTMLAttributes<"input">, "maxlength">\n',
          base: "export type Props = {}\n",
        },
        { Sample: { slots: ["default"] } },
      ).react,
    ).toContain('Omit<ComponentProps<"input">, "maxLength">')
  })

  test("a model whose context shares something else is refused in every framework", async () => {
    await expect(
      compileComponent(
        '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, value, ...rest } = Astro.props\n\nconst html = await sampleContext.provide({ selected: value }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
        sampleFile(),
        { api: modelApi("value", "div") },
      ),
    ).rejects.toThrow(
      "the value model of Sample, which its context doesn't share",
    )
  })

  test("Vue reads a hyphenated prop from the attrs instead of declaring it", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { "aria-invalid": ariaInvalid, class: className, error, ...rest } = Astro.props\n---\n\n<span class:list={["ui-sample", className]}>\n  <input {...rest} aria-invalid={error ? "true" : ariaInvalid} />\n</span>\n',
    )
    expect(ports.vue).toContain("const { error } = defineProps<Props>()")
    expect(ports.vue).toContain(
      "<input\n      v-bind=\"attrs\"\n      :aria-invalid=\"error ? 'true' : attrs['aria-invalid']\"\n    />",
    )
    expect(ports["react.tsx"]).toContain('"aria-invalid": ariaInvalid,')
  })

  test("a slot typed string or S renders through content in Svelte", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <slot name="end" />\n</div>\n',
      sampleFile(),
      {
        types: readTypes("Sample", {
          base: "export type Props = {}\n\nexport type Slots<S> = {\n  end?: string | S\n}\n",
        }),
      },
    )
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain('import { content } from "../content.svelte"')
    expect(svelte).toContain("{@render content(end)}")
  })

  const inputApi = (
    prop: string,
    selector: string,
    svelte: { description: string; prop: string; type: string }[],
  ) => ({
    component: "Sample",
    model: {
      description: "",
      frameworks: { svelte },
      prop,
      type:
        prop === "checked"
          ? "boolean | (string | number)[]"
          : "string | number | boolean",
    },
    options: [],
    parts: [],
    root: { description: "", selector },
  })

  test("a checked model binds the group or the checked state", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { name, ...rest } = Astro.props\n---\n\n<input type="checkbox" name={name} {...rest} />\n',
      sampleFile(),
      {
        api: inputApi("checked", 'input[type="checkbox"]', [
          { description: "", prop: "checked", type: "boolean" },
          { description: "", prop: "group", type: "(string | number)[]" },
        ]),
      },
    )
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain('import { toggleInGroup } from "../group"')
    expect(svelte).toContain(
      "  let {\n    checked = $bindable(),\n    defaultChecked,\n    group = $bindable(),\n    name,\n    value,\n    ...rest\n  }: Props = $props()\n\n  const getChecked = () =>\n    group ? group.includes(value) : !!(checked ?? defaultChecked)\n  const setChecked = (isChecked: boolean) => {\n    if (group) group = toggleInGroup(group, value, isChecked)\n    else checked = isChecked\n  }\n",
    )
    expect(svelte).toContain(
      '<input\n  type="checkbox"\n  {name}\n  {...defined(rest)}\n  bind:checked={getChecked, setChecked}\n  {defaultChecked}\n  {value}\n/>',
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      'const attrs = useAttrs() as IntrinsicElementAttributes["input"]',
    )
    expect(vue).toContain(
      "const modelValue = defineModel<boolean | (string | number)[] | undefined>({\n  default: undefined,\n})\n\nconst bound = useBound()",
    )
    expect(vue).toContain(
      '<input\n    v-if="bound"\n    type="checkbox"\n    :name="name"\n    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"\n    v-model="modelValue"\n  />\n  <input\n    v-else\n    type="checkbox"\n    :name="name"\n    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"\n  />',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".solid.tsx"))).toContain(
      '  const rest = omit(props, "checked", "name", "ref")\n  const checkedControl = control(() => props.checked)\n\n  return (\n    <input\n      type="checkbox"\n      name={props.name}\n      {...checkedControl.server}\n      ref={[props.ref, checkedControl.ref]}\n      {...defined(rest)}\n',
    )
  })

  test("a radio model binds the group", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { ...rest } = Astro.props\n---\n\n<input type="radio" {...rest} />\n',
      sampleFile(),
      {
        api: inputApi("value", 'input[type="radio"]', [
          { description: "", prop: "group", type: "string | number | boolean" },
        ]),
      },
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      '<input\n  type="radio"\n  {...defined(rest)}\n  {@attach seedChecked(isChecked, check)}\n  defaultChecked={defaultChecked ?? initialChecked}\n  onchange={(event) => {\n    check()\n    onchange?.(event)\n  }}\n  {value}\n/>',
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).not.toContain("computed")
    expect(vue).toContain(
      '<input\n    v-if="bound"\n    type="radio"\n    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"\n    :value="attrs.value"\n    v-model="modelValue"\n  />\n  <input\n    v-else\n    type="radio"\n    v-bind="{ ...defined(attrs), ...classAttrs($props.class) }"\n  />',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".solid.tsx"))).toContain(
      '  const checkedControl = control(() => props.checked)\n\n  return (\n    <input\n      type="radio"\n      {...checkedControl.server}\n      ref={[props.ref, checkedControl.ref]}\n      {...defined(rest)}\n',
    )
  })

  test("a wrapper forwards its model to the component that holds it", async () => {
    await loadApis()
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport RadioInput from "../Radio/RadioInput.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<label class:list={["ui-sample", className]}>\n  <RadioInput {...rest} />\n  <slot />\n</label>\n',
      sampleFile(),
      {
        api: inputApi("value", "input", [
          { description: "", prop: "group", type: "string | number | boolean" },
        ]),
      },
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      "<RadioInput {...rest} bind:group />",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const model = defineModel<string | number | boolean | undefined>({\n  default: undefined,\n})",
    )
    expect(vue).toContain(
      '<RadioInput v-if="bound" v-bind="attrs" v-model="model" />\n    <RadioInput v-else v-bind="attrs" />',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".solid.tsx"))).toContain(
      "<RadioInput {...rest} />",
    )
  })

  test("a model the context shares compiles to a group with a change callback, and in Vue to a group that shares its model", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, name, value, ...rest } = Astro.props\n\nconst html = await sampleContext.provide({ name, value }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
      sampleFile(),
      {
        api: {
          component: "Sample",
          model: { description: "", prop: "value", type: "string" },
          options: [],
          parts: [],
        },
      },
    )
    const react = outputs.get(sampleFile().replace(".astro", ".react.tsx"))
    expect(react).toContain(
      "export default function Sample({\n  className,\n  defaultValue,\n  name,\n  onValueChange,\n  value,\n  children,\n  ...rest\n}: Props) {\n  const change = useCallback(\n    (input: HTMLInputElement) => {\n      onValueChange?.(input.value)\n    },\n    [onValueChange],\n  )\n",
    )
    expect(react).toContain("<SampleContext value={context}>")
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      "  setSampleContext({\n    change(input) {\n      if (value !== undefined) value = input.value\n    },\n    get name() {\n      return name\n    },\n    get value() {\n      return value\n    },\n  })\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const model = defineModel<string>()\n\nconst bound = useBound()\n\nprovide(\n  SampleKey,\n  reactive({ bound, name: computed(() => name), value: model }),\n)",
    )
    expect(vue).not.toContain("change")
    const solid = outputs.get(sampleFile().replace(".astro", ".solid.tsx"))
    expect(solid).toContain(
      "  const change = (input: HTMLInputElement) => {\n    props.onValueChange?.(input.value)\n  }\n",
    )
    expect(solid).not.toContain('from "../solid"')
    expect(solid).toContain(
      "        get value() {\n          return props.value\n        },\n",
    )
  })

  test.each(["parent!.value", 'parent?.["value"]', "parent"])(
    "refuses an item that reads the group as %s, whose defaultValue it couldn't find",
    async (read) => {
      await loadApis()
      await expect(
        compileComponent(
          `---\nimport type { Props } from "./types.astro"\nimport { isSelected } from "../ToggleGroup/selection"\nimport { tabsContext } from "../Tabs/context.astro"\n\nconst { checked, class: className, value, ...rest } = Astro.props\n\nconst parent = tabsContext.get()\nconst grouped = isSelected(${read}, value)\n---\n\n<input checked={grouped ?? checked} class:list={["ui-sample", className]} type="radio" value={value} {...rest} />\n<slot />\n`,
          sampleFile(),
        ),
      ).rejects.toThrow(`the group read as \`${read}\` in \`grouped\``)
    },
  )

  test("an item of a group wires its input's change to the group", async () => {
    await loadApis()
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { isSelected } from "../ToggleGroup/selection"\nimport { tabsContext } from "../Tabs/context.astro"\n\nconst { checked, class: className, value, ...rest } = Astro.props\n\nconst parent = tabsContext.get()\nconst grouped = isSelected(parent?.value, value)\n---\n\n<input checked={grouped ?? checked} class:list={["ui-sample", className]} type="radio" value={value} {...rest} />\n<slot />\n',
      sampleFile(),
    )
    const react = outputs.get(sampleFile().replace(".astro", ".react.tsx"))
    expect(react).toContain(
      '  warnGroupedChecked("Sample", grouped, checked ?? defaultChecked, "Tabs")\n',
    )
    expect(react).toContain(
      '    <>\n      <input\n        checked={grouped ?? checked}\n        defaultChecked={\n          grouped !== undefined\n            ? undefined\n            : checked === undefined\n              ? (isSelected(parent?.defaultValue, value) ?? defaultChecked)\n              : defaultChecked\n        }\n        className={cx(["ui-sample", className])}\n        type="radio"\n        value={value}\n        {...defined(rest)}\n        ref={ref}\n        onChange={(event) => {\n          parent?.change?.(event.currentTarget)\n          onChange?.(event)\n        }}\n      />\n      {children}\n    </>\n',
    )
    expect(react).not.toContain('from "../react"')
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain(
      '    warnGroupedChecked("Sample", grouped, checked ?? defaultChecked, "Tabs"),\n',
    )
    expect(svelte).toContain('  import { seedChecked } from "../svelte"\n')
    expect(svelte).toContain(
      "  const isChecked = () => grouped ?? checked ?? !!defaultChecked\n  const initialChecked = untrack(isChecked)\n  const change = (input: HTMLInputElement) => {\n    parent?.change?.(input)\n  }\n",
    )
    expect(svelte).toContain(
      "  {@attach seedChecked(isChecked, change)}\n  defaultChecked={grouped === undefined\n    ? (defaultChecked ?? initialChecked)\n    : initialChecked}\n",
    )
    expect(svelte).not.toMatch(/\schecked=\{/)
    expect(svelte).toContain(
      "  {...defined(rest)}\n  onchange={(event) => {\n    change(event.currentTarget)\n    onchange?.(event)\n  }}\n/>{@render children?.()}\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).not.toContain('from "../vue"')
    expect(vue).toContain(
      "const { checked = undefined, value } = defineProps<Props>()",
    )
    expect(vue).toContain(
      "const target = computed({\n  get: () => parent?.value,\n  set: (next) => {\n    if (parent) parent.value = next\n  },\n})",
    )
    expect(vue).not.toContain("@change")
    expect(vue).toContain(
      '    v-if="parent?.bound"\n    :class="[\'ui-sample\', $props.class]"\n    type="radio"\n    :value="value"\n    v-bind="defined(attrs)"\n    v-model="target"\n  />\n  <input\n    v-else\n    :class="[\'ui-sample\', $props.class]"\n    type="radio"\n    :value="value"\n    v-bind="{ ...defined({ checked: grouped ?? checked }), ...defined(attrs) }"\n  /><slot></slot>',
    )
    const solid = outputs.get(sampleFile().replace(".astro", ".solid.tsx"))
    expect(solid).toContain(
      '    "checked",\n    "class",\n    "defaultChecked",\n    "onChange",\n    "ref",\n    "value",\n    "children",\n  )\n  const parent = useTabsContext()\n  const grouped = () => isSelected(parent?.value, props.value)\n',
    )
    expect(solid).toContain(
      '      props.checked ?? props.defaultChecked,\n      "Tabs",\n',
    )
    expect(solid).toContain('import { callHandler, control } from "../solid"\n')
    expect(solid).toContain(
      "  const checkedControl = control(\n    () => grouped() ?? props.checked,\n    untrack(\n      () =>\n        isSelected(parent?.defaultValue, props.value) ?? props.defaultChecked,\n    ),\n  )\n",
    )
    expect(solid).toContain(
      '        {...checkedControl.server}\n        class={["ui-sample", props.class]}\n        type="radio"\n        value={props.value}\n        {...defined(rest)}\n        ref={[props.ref, checkedControl.ref]}\n',
    )
    expect(solid).toContain(
      "        onChange={(event) => {\n          parent?.change?.(event.currentTarget)\n          callHandler(props.onChange, event)\n        }}\n",
    )
  })

  test("a newline between two inline children renders as a space in React and Vue", async () => {
    const { outputs } = await compileComponent(
      astro(
        '<label class:list={["ui-sample", className]}>\n  <input type="checkbox" {...rest} />\n  <slot />\n</label>',
      ),
      sampleFile(),
    )
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      '<input type="checkbox" {...defined(rest)} /> {children}\n    </label>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      '<input type="checkbox" {...defined(rest)} />\n  {@render children?.()}\n</label>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".vue"))).toContain(
      '<input type="checkbox" v-bind="defined(attrs)" />{{ " " }}<slot></slot>',
    )
  })

  test("text with a newline at its edge renders a space before or after an inline sibling in React", async () => {
    const { outputs } = await compileComponent(
      astro(
        '<label class:list={["ui-sample", className]}>\n  Text\n  <input type="checkbox" {...rest} />\n  More\n</label>',
      ),
      sampleFile(),
    )
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      'Text <input type="checkbox" {...defined(rest)} /> More',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      '  >Text\n  <input type="checkbox" {...defined(rest)} />\n  More</label\n>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".vue"))).toContain(
      '>Text{{ " " }}<input type="checkbox" v-bind="defined(attrs)" />{{\n      " "\n    }}More</label',
    )
  })

  test("a block tag that a component class lays out inline-level keeps the space around it", async () => {
    const compile = (className: string) =>
      compileComponent(
        astro(
          `<label class:list={["ui-sample", className]} {...rest}>\n  <div class="${className}">a</div>\n  <span>b</span>\n</label>`,
        ),
        sampleFile(),
      )
    const inline = await compile("ui-toggle-group")
    expect(
      inline.outputs.get(sampleFile().replace(".astro", ".react.tsx")),
    ).toContain('<div className="ui-toggle-group">a</div> <span>b</span>')
    const block = await compile("ui-card")
    expect(
      block.outputs.get(sampleFile().replace(".astro", ".react.tsx")),
    ).toContain('<div className="ui-card">a</div>\n      <span>b</span>')
  })

  test("a group with an array value ties it to multiple in the Vue generic", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, multiple, value, ...rest } = Astro.props\n\nconst html = await sampleContext.provide({ value }, () =>\n  Astro.slots.render("default"),\n)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <Fragment set:html={html} />\n</div>\n',
      sampleFile(),
      {
        api: {
          component: "Sample",
          model: { description: "", prop: "value", type: "string | string[]" },
          options: [],
          parts: [],
        },
      },
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      '<script setup lang="ts" generic="Multiple extends boolean = false">',
    )
    expect(vue).toContain(
      "type Model = Multiple extends true ? string[] : string\n\nconst { multiple } = defineProps<Props & { multiple?: Multiple }>()",
    )
    expect(vue).toContain(
      "const model = defineModel<Model>()\n\nconst bound = useBound()\n\nprovide(SampleKey, reactive({ bound, value: model }))",
    )
    expect(vue).not.toContain("selectionOf")
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      "      if (multiple) onValueChange?.(checkedValues(input))\n      else onValueChange?.(input.value)\n    },\n    [multiple, onValueChange],\n",
    )
    expect(outputs.get(sampleFile().replace(".astro", ".solid.tsx"))).toContain(
      "    if (props.multiple) props.onValueChange?.(checkedValues(input))\n    else props.onValueChange?.(input.value)\n",
    )
  })

  test("an item with a checked model binds it when the group has no value, and in Vue binds the group's model when the group is bound", async () => {
    await loadApis()
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { isSelected } from "../ToggleGroup/selection"\nimport { toggleGroupContext } from "../ToggleGroup/context.astro"\n\nconst { checked, class: className, type, value, ...rest } = Astro.props\n\nconst group = toggleGroupContext.get()\nconst finalType = group?.inputType === "radio" ? "radio" : (type ?? "checkbox")\nconst grouped = isSelected(group?.value, value)\n---\n\n<label class:list={["ui-sample", className]}>\n  <input checked={grouped ?? checked} data-off={!checked} type={finalType} value={value} {...rest} />\n  <slot />\n</label>\n',
      sampleFile(),
      {
        api: {
          component: "Sample",
          model: { description: "", prop: "checked", type: "boolean" },
          options: [],
          parts: [
            { description: "", model: true, selector: ".ui-sample > input" },
          ],
        },
      },
    )
    const svelte = outputs.get(sampleFile().replace(".astro", ".svelte"))
    expect(svelte).toContain("    checked = $bindable(),\n")
    expect(svelte).not.toContain("toggleInGroup")
    expect(svelte).toContain(
      "  const change = (input: HTMLInputElement) => {\n    if (grouped === undefined) checked = input.checked\n    group?.change?.(input)\n  }\n",
    )
    expect(svelte).toContain("    {@attach seedChecked(isChecked, change)}\n")
    expect(svelte).toContain(
      "    onchange={(event) => {\n      change(event.currentTarget)\n      onchange?.(event)\n    }}\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const model = defineModel<boolean | undefined>({\n  default: undefined,\n})",
    )
    expect(vue).toContain(
      'warnGroupedChecked(\n    "Sample",\n    grouped.value,\n    checked ?? model.value,\n    "ToggleGroup",\n  )',
    )
    expect(vue).toContain(
      "const target = computed({\n  get: () => (group?.bound ? group.value : model.value),\n  set: (next) => {\n    if (group?.bound) group.value = next as typeof group.value\n    else model.value = next as typeof model.value\n  },\n})",
    )
    expect(vue).toContain('v-if="group?.bound || bound"')
    expect(vue).toContain('v-model="target"')
    expect(vue).toContain(
      "...defined({ checked: grouped ?? model ?? checked }),\n        ...defined(attrs),",
    )
    expect(vue.match(/:data-off="!\(model \?\? checked\)"/g)).toHaveLength(2)
    const solid = outputs.get(sampleFile().replace(".astro", ".solid.tsx"))
    expect(solid).toContain(
      "() => grouped() ?? props.checked,\n    untrack(\n      () =>\n        isSelected(group?.defaultValue, props.value) ?? props.defaultChecked,\n    ),\n",
    )
    expect(solid).toContain("data-off={!props.checked}")
    expect(solid).toContain("ref={[props.ref, checkedControl.ref]}")
    expect(solid).not.toMatch(/\schecked=\{/)
  })

  test("Solid refuses a name its checked model declares", async () => {
    const clash = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\nconst checkedControl = 1\n---\n\n<label class:list={["ui-sample", className]} data-middle={checkedControl}>\n  <input {...rest} type="checkbox" />\n</label>\n',
      sampleFile(),
      { api: modelApi("checked", "input") },
    )
    expect(
      clash.refused.get(sampleFile().replace(".astro", ".solid.tsx"))?.message,
    ).toContain(
      "the name `checkedControl`, which the Solid port also declares for its checked model",
    )
  })

  test.each([
    [
      "<div>\n  <slot />\n</div>\n<p>Two</p>",
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
      "<div {...rest}>{items.map((item) => (item.b ? <b>{item.b}</b> : item.b))}</div>",
      "map callback doesn't return one element",
    ],
    [
      "<div {...rest}>{items.map((item) => (item.b ? <b>{item.b}</b> : <i>{item}</i>))}</div>",
      "map callback doesn't return one element",
    ],
    [
      "<div {...rest}>{items.map((item, index, all) => <b>{all.length}</b>)}</div>",
      "map callback takes more than the item and its index",
    ],
    ["<div {...rest} set:html={html} />", "set:html={html}"],
    ['<div {...rest} set:html="text" />', "set:html={text}"],
    [
      "<div {...rest}><Fragment set:html={html} /></div>",
      "<Fragment set:html>",
    ],
    [
      '<div {...rest}>\n  <slot />\n</div>\n\n<script>\n  import { init } from "../../elements/sample.js"\n  init()\n</script>',
      "a <script> with more than side-effect imports",
    ],
    [
      "<div {...(open ? rest : {})}>\n  <b {...(open ? rest : {})} />\n</div>",
      "a rest spread behind a condition that doesn't pick one element",
    ],
    [
      "<div {...rest}>{Astro.slots.start && <b>start</b>}</div>",
      "an Astro reference the ports have no form for in `Astro.slots.start`",
    ],
  ])("rejects %s", async (body, reason) => {
    await expect(compileComponent(astro(body), sampleFile())).rejects.toThrow(
      reason,
    )
  })

  test("refuses a const with the `$` prefix for Svelte only", async () => {
    const result = await compileComponent(
      `---\nimport type { Props } from "./types.astro"\n\nconst { id, ...rest } = Astro.props\nconst $id = (part: string) => \`\${part}-\${id}\`\n---\n\n<div id={$id("root")} {...rest} />\n`,
      sampleFile(),
    )
    expect([...result.refused.keys()]).toEqual([
      sampleFile().replace(".astro", ".svelte"),
    ])
    expect(
      result.refused.get(sampleFile().replace(".astro", ".svelte"))?.message,
    ).toContain("the const `$id`, whose `$` prefix Svelte reserves")
  })

  test("a rest spread after an attribute drops the caller's undefined values in every framework, so it can't remove the attribute", async () => {
    const ports = await compile(
      astro(
        '<section role="group" class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</section>',
      ),
    )
    expect(ports["react.tsx"]).toContain('import { defined } from "../attrs"')
    expect(ports["react.tsx"]).toContain("{...defined(rest)}")
    expect(ports.svelte).toContain('import { defined } from "../attrs"')
    expect(ports.svelte).toContain("{...defined(rest)}")
    expect(ports.vue).toContain('import { defined } from "../attrs"')
    expect(ports.vue).toContain("defineOptions({\n  inheritAttrs: false,\n})")
    expect(ports.vue).toContain('v-bind="defined(attrs)"')
  })

  test("a rest spread after only the class or destructured props stays as it is", async () => {
    const ports = await compile(
      astro(
        '<section class:list={["ui-sample", className]} id={id} {...rest}>\n  <slot />\n</section>',
      ).replace(
        "const { class: className, ...rest }",
        "const { class: className, id, ...rest }",
      ),
    )
    for (const port of Object.values(ports))
      expect(port).not.toContain("defined")
    expect(ports.vue).not.toContain("inheritAttrs")
  })

  test("a rest spread behind a condition wraps the whole expression", async () => {
    const ports = await compile(
      astro(
        '<li role="listitem" {...(open ? rest : {})}>\n  <b role="note" {...(open ? {} : rest)} />\n</li>',
      ).replace(
        "const { class: className, ...rest }",
        "const { class: className, open, ...rest }",
      ),
    )
    expect(ports["react.tsx"]).toContain(
      "{...defined(open ? (rest as object) : {})}",
    )
    expect(ports.svelte).toContain(
      "{...defined(open ? (rest as SvelteHTMLElements[",
    )
    expect(ports.vue).toContain("...defined(open ? attrs : {})")
    expect(ports["solid.tsx"]).toContain(
      "{...defined(props.open ? (rest as object) : {})}",
    )
    expect(ports.vue).toContain('v-bind="defined(open ? {} : attrs)"')
  })

  test("a cast on a plain element's rest behind a condition carries over to React as ComponentProps", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport type { HTMLAttributes } from "astro/types"\n\nconst { class: className, open, ...rest } = Astro.props\n---\n\n<li class:list={["ui-sample", className]} {...((open ? rest : {}) as HTMLAttributes<"li">)}>\n  <b role="note" {...(open ? {} : rest)} />\n</li>\n',
    )
    expect(ports["react.tsx"]).toContain(
      'import type { ComponentProps } from "react"\n',
    )
    expect(ports["react.tsx"]).toContain(
      '{...(open ? (rest as ComponentProps<"li">) : {})}',
    )
    expect(ports["react.tsx"]).toContain(
      "{...defined(open ? {} : (rest as object))}",
    )
  })

  test("reads {...defined(rest)} in an Astro source as the rest spread and leaves the import to the ports", async () => {
    const source = astro(
      '<section role="group" {...defined(rest)}>\n  <slot />\n</section>',
      'import { defined } from "../attrs"\n',
    )
    const ports = await compile(source)
    expect(ports["react.tsx"]).toContain("{...defined(rest)}")
    expect(ports["react.tsx"].match(/from "\.\.\/attrs"/g)).toHaveLength(1)
    expect(ports.svelte).toContain("{...defined(rest)}")
    expect(ports.vue).toContain("...defined(attrs)")
    expect(ports["solid.tsx"]).toContain("{...defined(rest)}")
    expect(ports["solid.tsx"].match(/from "\.\.\/attrs"/g)).toHaveLength(1)
  })

  test("a root attribute that reads rest before the spread gets inheritAttrs off, so the fix 3 guard stays quiet", async () => {
    const result = await compileComponent(
      astro(
        '<div role="group" id={rest.id ?? "sample"} {...rest}><slot /></div>',
      ),
      sampleFile(),
    )
    expect([...result.refused.keys()]).toEqual([])
    const vue = result.outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain("inheritAttrs: false")
    expect(vue).toContain("...defined(attrs)")
  })

  test("refuses a root attribute that reads rest for Vue only, whose attributes fall through after it", async () => {
    const result = await compileComponent(
      astro('<div {...rest} id={rest.id ?? "sample"}><slot /></div>'),
      sampleFile(),
    )
    expect([...result.refused.keys()]).toEqual([
      sampleFile().replace(".astro", ".vue"),
    ])
    expect(
      result.refused.get(sampleFile().replace(".astro", ".vue"))?.message,
    ).toContain("the attribute `id` on the root element, which reads `rest`")
  })

  test("refuses an import named like a prop the Svelte model adds", async () => {
    const result = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\nimport { defaultChecked } from "./checked"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<label class:list={["ui-sample", className]} data-middle={defaultChecked}>\n  <input {...rest} type="checkbox" />\n</label>\n',
      sampleFile(),
      { api: modelApi("checked", "input") },
    )
    expect([...result.refused.keys()]).toEqual([
      sampleFile().replace(".astro", ".svelte"),
    ])
    expect(
      result.refused.get(sampleFile().replace(".astro", ".svelte"))?.message,
    ).toContain(
      "the name `defaultChecked`, which the Svelte port also declares as a prop",
    )
  })

  test.each([
    [
      "export const other = 1",
      "the frontmatter statement `export const other = 1`",
    ],
    ['import { getContext } from "../context"', "the import of ../context"],
  ])("rejects the frontmatter %s", async (line, reason) => {
    await expect(
      readComponent(
        astro("<div {...rest}>\n  <slot />\n</div>", line),
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })

  test.each([
    [
      "const rootId = sampleContext.get()?.rootId ?? className",
      "a context get() inside `const rootId",
    ],
    [
      'const html = await sampleContext.provide({ open: true }, () =>\n  Astro.slots.render("default"),\n)\nconst more = await sampleContext.provide({ open: false }, () =>\n  Astro.slots.render("default"),\n)',
      "a second context provide",
    ],
  ])("rejects the context statement %s", async (lines, reason) => {
    await expect(
      readComponent(
        `---\nimport type { Props } from "./types.astro"\nimport { sampleContext } from "./context.astro"\n\nconst { class: className, ...rest } = Astro.props\n\n${lines}\n---\n\n<div {...rest}>\n  <slot />\n</div>\n`,
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })

  test.each([
    [
      "const closeAttrs = { onclick: \"this.closest('dialog')?.close()\" }",
      "a handler string in `const closeAttrs",
    ],
    [
      'const LabelTag = className ? "span" : Fragment ?? "p"',
      "Fragment as a value in `const LabelTag",
    ],
    [
      "const named = hasName(Astro.props, false)",
      "Astro.props in `const named",
    ],
  ])("rejects the const %s", async (line, reason) => {
    await expect(
      readComponent(
        `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n\n${line}\n---\n\n<div {...rest}>\n  <slot />\n</div>\n`,
        sampleFile(),
      ),
    ).rejects.toThrow(reason)
  })
})

test("a model type splits into its members at the top level, and arrays are told apart", () => {
  expect(unionMembers("Array<string | number> | string")).toEqual([
    "Array<string | number>",
    "string",
  ])
  expect(
    ["string[]", "Array<string>", "ReadonlyArray<string>"].map(isArrayType),
  ).toEqual([true, true, true])
  expect(isArrayType("string")).toBe(false)
})

describe("toTypes", () => {
  const base =
    'export type Props = {\n  variant?: "a" | "b"\n}\n\nexport type SamplePartProps = {}\n'

  test("the folder's types give a component its base props, element, events, string-typed slots and whether the folder has a Slots type", async () => {
    const types = readTypes("Sample", {
      astro:
        'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"section">\n\nexport type SamplePartProps = Base.SamplePartProps & HTMLAttributes<"span">\n',
      base: 'export type Props = {\n  size?: "small"\n}\n\nexport type SamplePartProps = {\n  open?: boolean\n}\n\nexport type SamplePartEvents = {\n  close: Event\n}\n\nexport type SamplePartSlots<S> = {\n  end?: string | S\n  start?: S\n}\n',
    })
    const { component } = await compileComponent(
      astro(
        '<span class:list={["ui-sample", className]} {...rest}>\n  <slot name="start" />\n  <slot name="end" />\n</span>',
        "",
        "SamplePart",
      ),
      sampleFile("SamplePart"),
      { types },
    )
    expect(component).toMatchObject({
      baseProps: ["open"],
      element: "span",
      events: ["close"],
      folderSlots: false,
      stringTypedSlots: ["end"],
    })
  })

  test("writes the framework type files from types.ts and types.astro.ts", () => {
    const types = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n\nexport type SamplePartProps = HTMLAttributes<"dd">\n',
        base,
      },
      { Sample: { slots: ["default"] }, SamplePart: { slots: ["default"] } },
    )
    expect(types.react).toBe(
      'import type * as Base from "./types"\nimport type { ComponentProps } from "react"\n\nexport type Props = Base.Props & ComponentProps<"div">\n\nexport type SamplePartProps = ComponentProps<"dd">\n',
    )
    expect(types.solid).toBe(
      'import type * as Base from "./types"\nimport type { ComponentProps } from "@solidjs/web"\n\nexport type Props = Base.Props & ComponentProps<"div">\n\nexport type SamplePartProps = ComponentProps<"dd">\n',
    )
    expect(types.svelte).toBe(
      'import type * as Base from "./types"\nimport type { SvelteHTMLElements } from "svelte/elements"\n\nexport type Props = Base.Props & SvelteHTMLElements["div"]\n\nexport type SamplePartProps = SvelteHTMLElements["dd"]\n',
    )
    expect(types.vue).toBe(
      'import type { Class, DefaultSlots } from "../vue"\nimport type {\n  Props as BaseProps,\n} from "./types"\n\nexport type Props = BaseProps & Class\n\nexport type SamplePartProps = Class\n\nexport type Slots = DefaultSlots\n',
    )
  })

  test("a component without a slot gets no Vue slot type", () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n',
        base: 'export type Props = {\n  variant?: "a" | "b"\n}\n',
      },
      { Sample: { slots: [] } },
    )
    expect(vue).toBe(
      'import type { Class } from "../vue"\nimport type {\n  Props as BaseProps,\n} from "./types"\n\nexport type Props = BaseProps & Class\n',
    )
  })

  test("a part with only the default slot gets its own Vue slot type when the folder's Slots names others", async () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n\nexport type SamplePartProps = HTMLAttributes<"dd">\n',
        base: `${base}\nexport type Slots<S> = {\n  end?: S\n}\n`,
      },
      {
        Sample: { slots: ["default", "end"] },
        SamplePart: { slots: ["default"] },
      },
    )
    expect(vue).toContain(
      "export type SamplePartSlots = DefaultSlots\n\nexport type Slots = { end?: Slot } & DefaultSlots\n",
    )
    const { outputs } = await compileComponent(
      astro("<dd {...rest}>\n  <slot />\n</dd>", "", "SamplePart"),
      sampleFile("SamplePart"),
      {
        types: readTypes("Sample", {
          base: `${base}\nexport type Slots<S> = {\n  end?: S\n}\n`,
        }),
      },
    )
    expect(
      outputs.get(sampleFile("SamplePart").replace(".astro", ".vue")),
    ).toContain("defineSlots<SamplePartSlots>()")
  })

  test("Vue leaves the attribute keys of the base props out, so they fall through to the element", () => {
    const { react, vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n',
        base: 'export type Props = {\n  variant?: "a" | "b"\n} & ({ "aria-label": string } | { "aria-labelledby": string })\n',
      },
      { Sample: { slots: ["default"] } },
    )
    expect(react).toContain(
      'export type Props = Base.Props & ComponentProps<"div">',
    )
    expect(vue).toContain(
      'export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby"> & Class',
    )
  })

  test("a Link parameter takes the link component in React, Solid and Vue, and so does an as that takes an a", () => {
    const { react, solid, svelte, vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "button" } & HTMLAttributes<"button">)\n  | (Base.Props & { as?: "a"; href: string } & HTMLAttributes<"a">)\n',
        base: 'export type Props<Link = never> =\n  | { as?: "a" | Link; href: string }\n  | { as?: "button"; href?: never }\n',
      },
      { Sample: { slots: ["default"] } },
    )
    expect(react).toContain(
      'import type { ComponentProps, ComponentType } from "react"',
    )
    expect(react).toContain(
      '(Base.Props<ComponentType<any>> & { as?: "a" | ComponentType<any>; href: string } & ComponentProps<"a">)',
    )
    expect(react).toContain(
      '(Base.Props<ComponentType<any>> & { as?: "button" } & ComponentProps<"button">)',
    )
    expect(solid).toContain('import type { Component } from "solid-js"')
    expect(solid).toContain(
      '(Base.Props<Component<any>> & { as?: "a" | Component<any>; href: string } & Omit<ComponentProps<"a">, "href">)',
    )
    expect(svelte).toContain(
      '(Base.Props & { as?: "a"; href: string } & SvelteHTMLElements["a"])',
    )
    expect(vue).toContain('import type { Component } from "vue"')
    expect(vue).toContain("export type Props = BaseProps<Component> & Class\n")
  })

  test("rejects an as that takes a link component in the type literal of a group's model", () => {
    expect(() =>
      typesOf(
        {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & { as?: "a"; value?: string } & HTMLAttributes<"a">\n',
          base: 'export type Props<Link = never> = {\n  as?: "a" | Link\n  href: string\n}\n',
        },
        {
          Sample: {
            model: {
              bindables: [{ prop: "value", type: "string" }],
              kind: "group",
              prop: "value",
              type: "string",
            },
            slots: ["default"],
          },
        },
      ),
    ).toThrow("the type Props, whose as takes a link component next to a model")
  })

  test("an Omit keeps the keyof members of its keys next to the literal ones", () => {
    const types = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props &\n  Omit<HTMLAttributes<"input">, keyof Base.Props | "type">\n',
        base,
      },
      { Sample: { slots: [] } },
    )
    expect(types.react).toContain(
      'Omit<ComponentProps<"input">, "children" | "type" | keyof Base.Props>',
    )
    expect(types.svelte).toContain(
      'Omit<SvelteHTMLElements["input"], "children" | "type" | keyof Base.Props>',
    )
  })

  test("React and Solid type a radio group's defaultValue and onValueChange like a group's", () => {
    const { react, solid } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"fieldset">\n',
        base: "export type Props = {\n  value?: number | string\n}\n",
      },
      {
        Sample: {
          model: {
            bindables: [{ prop: "value", type: "number | string" }],
            kind: "radioGroup",
            prop: "value",
            type: "number | string",
          },
        },
      },
    )
    expect(react).toContain('import type { ComponentProps } from "react"')
    expect(react).toContain(
      'Base.Props & { defaultValue?: number | string; onValueChange?: (value: number | string) => void } & Omit<ComponentProps<"fieldset">, "children" | "defaultValue">',
    )
    expect(solid).toContain(
      'import type { ComponentProps } from "@solidjs/web"',
    )
    expect(solid).toContain(
      'Base.Props & { defaultValue?: number | string; onValueChange?: (value: number | string) => void } & Omit<ComponentProps<"fieldset">, "children" | "defaultValue">',
    )
  })

  test("an HTML attribute a component reads becomes a Vue prop", () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"label">\n',
        base: 'export type Props = {\n  size?: "small"\n} & ({ trigger?: never } | { trigger: "hover" })\n',
      },
      {
        Sample: {
          props: ["for", "id", "size", "trigger"],
          slots: ["default"],
        },
      },
    )
    expect(vue).toContain(
      'export type Props = BaseProps & Class & { for?: IntrinsicElementAttributes["label"]["for"]; id?: IntrinsicElementAttributes["label"]["id"] }',
    )
    expect(vue).toContain(
      'import type { IntrinsicElementAttributes } from "vue"',
    )
  })

  test("an HTML attribute a component with several elements reads becomes a Vue prop of each element's type", () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "legend" } & HTMLAttributes<"legend">)\n  | (Base.Props & { as: "p" } & HTMLAttributes<"p">)\n',
        base: "export type Props = {}\n",
      },
      { Sample: { props: ["as", "id"], slots: ["default"] } },
    )
    expect(vue).toContain(
      'id?: IntrinsicElementAttributes["legend"]["id"] | IntrinsicElementAttributes["p"]["id"]',
    )
  })

  test("a literal that reads an element attribute keeps its declaration in Vue, and an element read twice is one element", () => {
    const { react, vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & {\n  type?: HTMLAttributes<"input">["type"] | "numeric"\n} & Omit<HTMLAttributes<"input">, "type">\n',
        base: 'export type Props = {\n  size?: "small"\n}\n',
      },
      { Sample: { props: ["id", "size", "type"] } },
    )
    expect(react).toContain(
      'type?: ComponentProps<"input">["type"] | "numeric"',
    )
    expect(vue).toContain(
      'export type Props = BaseProps & {\n  type?: IntrinsicElementAttributes["input"]["type"] | "numeric"\n} & Class & { id?: IntrinsicElementAttributes["input"]["id"] }',
    )
  })

  test("React takes a base prop like for by its React name", () => {
    const { react, svelte } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"li">\n',
        base: "export type Props = {\n  for?: string\n  inset?: boolean\n}\n",
      },
      { Sample: { slots: ["default"] } },
    )
    expect(react).toContain(
      'Without<Base.Props, "for"> & { htmlFor?: Base.Props["for"] }',
    )
    expect(svelte).toContain("Base.Props & SvelteHTMLElements")
  })

  test("slots on a union, a string-or-slot prop, a custom element root and a plain alias", () => {
    const types = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "button"; href?: never } & HTMLAttributes<"button">)\n  | (Base.Props & { as?: "a"; href: string } & HTMLAttributes<"a">)\n\nexport type SampleItem = Base.SampleItem & Omit<HTMLAttributes<"a">, "children">\n\nexport type SampleTagProps = Base.SampleTagProps & Omit<HTMLAttributes<"div">, "id">\n',
        base: 'export type Props = {\n  size?: "small"\n}\n\nexport type Slots<S> =\n  | { "aria-label": string; children?: S }\n  | { "aria-label"?: string; children: S }\n\nexport type SampleItem = { label: string }\n\nexport type SampleTagProps = { id: string }\n\nexport type SampleTagSlots<S> = {\n  end?: S\n  label?: string | S\n}\n',
      },
      {
        Sample: { slots: ["default"] },
        SampleTag: { customTag: "opui-sample", slots: ["end", "label"] },
      },
    )
    expect(types.react).toContain(
      '  | (Base.Props & Base.Slots<ReactNode> & { as?: "button"; href?: never } & ComponentProps<"button">)\n  | (Base.Props & Base.Slots<ReactNode> & { as?: "a"; href: string } & ComponentProps<"a">)',
    )
    expect(types.react).toContain(
      "type Without<T, K extends PropertyKey> = T extends unknown\n  ? Omit<T, K>\n  : never",
    )
    expect(types.react).toContain(
      'export type SampleTagProps = Without<Base.SampleTagProps, "label"> & Base.SampleTagSlots<ReactNode> & Omit<ComponentProps<"opui-sample">, "children" | "id">',
    )
    expect(types.svelte).toContain(
      'export type SampleItem = Base.SampleItem & Omit<SvelteHTMLElements["a"], "children">',
    )
    expect(types.vue).toContain(
      'export type SampleItem = BaseSampleItem & Omit<IntrinsicElementAttributes["a"], "children">',
    )
    expect(types.vue).toContain("export type Slots = DefaultSlots")
    expect(types.vue).toContain(
      "export type SampleTagSlots = { end?: Slot; label?: Slot }",
    )
  })

  test("the React and Solid types of a group add defaultValue and onValueChange", () => {
    const { react, solid, svelte, vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & { value?: string } & HTMLAttributes<"div">\n',
        base,
      },
      {
        Sample: {
          model: {
            bindables: [{ prop: "value", type: "string" }],
            kind: "group",
            prop: "value",
            type: "string",
          },
          slots: ["default"],
        },
      },
    )
    expect(react).toContain(
      'export type Props = Base.Props & { defaultValue?: string; onValueChange?: (value: string) => void; value?: string } & Omit<ComponentProps<"div">, "defaultValue">',
    )
    expect(solid).toContain(
      'export type Props = Base.Props & { defaultValue?: string; onValueChange?: (value: string) => void; value?: string } & Omit<ComponentProps<"div">, "defaultValue">',
    )
    expect(svelte).toContain(
      'export type Props = Base.Props & { value?: string } & SvelteHTMLElements["div"]\n',
    )
    expect(vue).toContain("export type Props = BaseProps & Class\n")
  })

  test("the types of a group tie the value's React and Solid props to each declaration of it", () => {
    const { react, solid, vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props &\n  Base.Selection<{ value?: string }, { value?: string[] }> &\n  Omit<HTMLAttributes<"div">, "size">\n',
        base: `${base}\n\nexport type Selection<Single, Multiple> =\n  ({ multiple?: false } & Single) | ({ multiple: true } & Multiple)\n`,
      },
      {
        Sample: {
          model: {
            bindables: [{ prop: "value", type: "string | string[]" }],
            kind: "group",
            prop: "value",
            type: "string | string[]",
          },
          props: ["value"],
          slots: ["default"],
        },
      },
    )
    expect(react).toContain(
      'export type Props = Base.Props &\n  Base.Selection<{ defaultValue?: string; onValueChange?: (value: string) => void; value?: string }, { defaultValue?: string[]; onValueChange?: (value: string[]) => void; value?: string[] }> &\n  Omit<ComponentProps<"div">, "defaultValue" | "size">',
    )
    expect(solid).toContain(
      'export type Props = Base.Props &\n  Base.Selection<{ defaultValue?: string; onValueChange?: (value: string) => void; value?: string }, { defaultValue?: string[]; onValueChange?: (value: string[]) => void; value?: string[] }> &\n  Omit<ComponentProps<"div">, "defaultValue" | "size">',
    )
    expect(vue).toContain("export type Props = BaseProps & Class\n")
  })

  test("the Svelte types declare a model's bindables", () => {
    const { react, svelte } = typesOf(
      { astro: simple, base },
      {
        Sample: {
          model: {
            bindables: [
              { prop: "group", type: "(string | number)[]" },
              { prop: "checked", type: "boolean" },
            ],
            kind: "checked",
            prop: "checked",
            type: "boolean | (string | number)[]",
          },
          slots: ["default"],
        },
      },
    )
    expect(svelte).toContain(
      'export type Props = Base.Props & Omit<SvelteHTMLElements["div"], "checked" | "group"> & { checked?: boolean; group?: (string | number)[] }',
    )
    expect(react).toContain(
      'export type Props = Base.Props & ComponentProps<"div">\n',
    )
  })

  test("a Props alias keeps its Omit and literal parts in Vue", () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Omit<Base.Props, "items"> & {\n  items?: string[]\n} & Omit<HTMLAttributes<"menu">, "id">\n',
        base: "export type Props = {\n  id: string\n  items?: number[]\n}\n",
      },
      { Sample: { slots: ["default"] } },
    )
    expect(vue).toContain(
      'export type Props = Omit<BaseProps, "items"> & {\n  items?: string[]\n} & Class',
    )
  })

  test("a polymorphic root lists its tags for Vue", () => {
    const { vue } = typesOf(
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "fieldset" } & HTMLAttributes<"fieldset">)\n  | (Base.Props & { as: "div" } & HTMLAttributes<"div">)\n',
        base,
      },
      { Sample: { slots: ["default"] } },
    )
    expect(vue).toContain(
      'export type Props = BaseProps & Class & { as?: "div" | "fieldset" }',
    )
  })

  const simple =
    'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n'

  test("a Slots type joins the props in every framework", () => {
    const types = typesOf(
      { astro: simple, base: `${base}\nexport type Slots<S> = { end?: S }\n` },
      { Sample: { slots: ["default", "end"] } },
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
      "export type Slots = { end?: Slot } & DefaultSlots",
    )
  })

  test("an Events type adds on<Event> in React and Solid, on<event> in Svelte and an Emits type in Vue", () => {
    const types = typesOf(
      {
        astro: simple,
        base: `${base}\nexport type Events = {\n  close: CustomEvent<number>\n}\n`,
      },
      { Sample: { slots: ["default"] } },
    )
    expect(types.react).toContain(
      'export type Props = Base.Props & { onClose?: (event: Base.Events["close"]) => void } & ComponentProps<"div">',
    )
    expect(types.solid).toContain(
      'export type Props = Base.Props & { onClose?: (event: Base.Events["close"]) => void } & ComponentProps<"div">',
    )
    expect(types.svelte).toContain(
      'export type Props = Base.Props & { onclose?: (event: Base.Events["close"]) => void } & SvelteHTMLElements["div"]',
    )
    expect(types.vue).toContain(
      'import type {\n  Events as BaseEvents,\n  Props as BaseProps,\n} from "./types"',
    )
    expect(types.vue).toContain(
      'export type Props = BaseProps & Class\n\nexport type Emits = { close: [event: BaseEvents["close"]] }\n\nexport type Slots = DefaultSlots\n',
    )
  })

  test("a custom element root leaves out its own typing of a component event", () => {
    const { solid, svelte } = typesOf(
      {
        astro: simple,
        base: `${base}\nexport type Events = {\n  close: Event\n}\n`,
      },
      { Sample: { customTag: "opui-sample", slots: ["default"] } },
    )
    expect(svelte).toContain(
      'export type Props = Base.Props & { onclose?: (event: Base.Events["close"]) => void } & Omit<SvelteHTMLElements["opui-sample"], "onclose">',
    )
    expect(solid).toContain(
      'export type Props = Base.Props & { onClose?: (event: Base.Events["close"]) => void } & Omit<ComponentProps<"opui-sample">, "onClose">',
    )
  })

  test.each([
    [
      { astro: simple, base },
      { Sample: { slots: ["default", "end-text"] } },
      "the slot end-text of Sample, which types.ts has no Slots type for",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Events = {\n  valueChange: Event\n}\n`,
      },
      { Sample: { slots: ["default"] } },
      "the event valueChange in Events",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type OtherEvents = {\n  close: Event\n}\n`,
      },
      { Sample: { slots: ["default"] } },
      "the type OtherEvents, which names no props type in types.astro.ts",
    ],
    [
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = HTMLAttributes<"div">\n',
        base: `${base}\nexport type Events = {\n  close: Event\n}\n`,
      },
      { Sample: { slots: ["default"] } },
      "the type Props, which has Events but no Base.Props to join them to",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { variant?: S }\n`,
      },
      { Sample: { slots: ["default", "variant"] } },
      "a prop and a slot both named variant",
    ],
    [
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Extra & HTMLAttributes<"div">\n',
        base,
      },
      { Sample: { slots: ["default"] } },
      "the type Props, whose part Extra has no Vue form",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { endText?: S }\n`,
      },
      { Sample: { slots: ["default"] } },
      "the slot endText, whose Vue name is kebab-case",
    ],
    [
      {
        astro: simple,
        base: 'export type Props<Link> = {\n  as?: "a" | Link\n}\n',
      },
      { Sample: { slots: ["default"] } },
      "the type parameter Link of Props without the default never",
    ],
  ])("rejects %j", (files, components, reason) => {
    expect(() => typesOf(files, components)).toThrow(reason)
  })
})

describe("the compiled components", () => {
  let all: Awaited<ReturnType<typeof generate>>
  let unledgered: Awaited<ReturnType<typeof generate>>
  let hookReads: Map<string, Set<string>>
  const handWritten = readHandWritten()

  beforeAll(async () => {
    const recorder = recordHookReads(MODEL_KINDS as Kinds)
    try {
      all = await generate()
    } finally {
      recorder.restore()
    }
    hookReads = recorder.reads
    unledgered = await generate({ handWritten: {} })
  }, 300_000)

  test("every model kind hook is read when the components compile, and every hook read is defined", () => {
    expect(
      hookProblems(MODEL_KINDS as Kinds, hookReads, GENERIC_READS),
    ).toEqual([])
  })

  test("a model kind's helper is imported when the code calls it, from its module", () => {
    const used = helpersCalled(
      "const checkedControl = control(read)\nitemCheckedControl(x)\nprops.untrack(y)\nseedChecked(input)",
      { control: "../solid", seedChecked: "../svelte", untrack: "solid-js" },
    )
    expect(used).toEqual([
      { module: "../solid", name: "control" },
      { module: "../svelte", name: "seedChecked" },
    ])
    expect(importLinesOf(used, ["../svelte"])).toEqual([
      'import { control } from "../solid"',
    ])
  })

  test("hookProblems reports a hook nothing reads and a read nothing defines", () => {
    const kinds: Kinds = {
      a: { vue: { read: () => [], unread: () => [] } },
      b: { react: { shared: () => [] }, vue: { read: () => [] } },
    }
    const { reads, restore } = recordHookReads(kinds)
    for (const kind of ["a", "b"]) {
      const hooks = kinds[kind]!.vue!
      void hooks.read
      void hooks.missing
      void hooks.shared
    }
    void kinds.b!.react!.shared
    restore()
    expect(hookProblems(kinds, reads, { gone: "", shared: "" })).toEqual([
      "MODEL_KINDS.a.vue.unread is never read: remove it",
      "gone is a generic read no model kind defines: remove it",
      "the vue emitter reads missing, which no model kind defines: remove the read",
    ])
  })

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
      for (const printWidth of [40, 200]) {
        const { outputs } = await compileComponent(
          await formatCode(source, file, { printWidth }),
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

test.each([
  ['["ui-sample", className]', false],
  ['[hideLabel ? "ui-sr-only" : "ui-label"]', false],
  ["[`ui-${size}`, className]", false],
  ["[className]", true],
  ['[total && "ui-total", className]', true],
  ['[{ "ui-numeric": numeric }, className]', true],
  ["[color && `ui-${color}`]", true],
  ["$props.class", true],
])("a class list %s may be empty: %s", (code, empty) => {
  expect(classMayBeEmpty(code)).toBe(empty)
})
