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
  toTypes,
  TYPE_FILES,
} from "../../scripts/build-components.mjs"
import {
  classMayBeEmpty,
  isArrayType,
  unionMembers,
} from "../../scripts/component-shared.mjs"
import { formatCode } from "../../scripts/format.mjs"

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

beforeAll(async () => {
  await loadApis()
  await compileComponent(
    astro(
      '<button class:list={["ui-sample", className]} type="button" {...rest} />',
    ),
    sampleFile(),
  )
}, 120_000)

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
    expect(ports["react.tsx"]).toContain("{...(rest as object)}")
    expect(ports.svelte).toContain('as: Tag = "fieldset",')
    expect(ports.svelte).toContain(
      '<svelte:element\n  this={Tag}\n  class={["ui-sample", className]}\n  role={Tag === "fieldset" ? undefined : "group"}\n  {...rest}\n>',
    )
    expect(ports.vue).toContain(
      'const { as: Tag = "fieldset" } = defineProps<Props>()',
    )
    expect(ports.vue).toContain(
      "<component\n    :is=\"Tag\"\n    :class=\"['ui-sample', $props.class]\"\n    :role=\"Tag === 'fieldset' ? undefined : 'group'\"\n  >",
    )
  })

  test("a variable tag keeps its name and infers its type in React", async () => {
    const ports = await compile(
      `---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, wide, ...rest } = Astro.props\nconst Label = wide ? "div" : "span"\n---\n\n<Label class:list={["ui-sample", className]} {...rest}>{label}</Label>\n`,
    )
    expect(ports["react.tsx"]).toContain(
      'const Label = wide ? "div" : "span"\n\n  return (\n    <Label className={cx(["ui-sample", className])} {...(rest as object)}>',
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
      "{...(onItem ? {} : (rest as object))}",
    )
    expect(ports.svelte).toContain(
      '{...onItem ? (rest as SvelteHTMLElements["li"]) : {}}',
    )
    expect(ports.svelte).toContain("{...onItem ? {} : (rest as object)}")
    expect(ports.vue).toContain("inheritAttrs: false")
    expect(ports.vue).toContain("const attrs = useAttrs() as HTMLAttributes")
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
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  label,\n  numeric,\n  sortable,\n  children,\n  endText,\n  ...rest\n}: Props) {\n  return (\n    <th\n      className={cx([{ "ui-numeric": numeric }, className])}\n      data-sort={sortable ? "" : undefined}\n      {...rest}\n    >\n      {sortable ? <button type="button">{children}</button> : children}{" "}\n      {label && (\n        <span className="ui-label">\n          {label}\n          {endText}\n        </span>\n      )}\n    </th>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import { classAttrs } from "../cx"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n    numeric,\n    sortable,\n\n    // Snippets\n    children,\n    endText,\n    ...rest\n  }: Props = $props()\n</script>\n\n<th\n  {...classAttrs([{ "ui-numeric": numeric }, className])}\n  data-sort={sortable ? "" : undefined}\n  {...rest}\n>\n  {#if sortable}\n    <button type="button">\n      {@render children?.()}\n    </button>\n  {:else}\n    {@render children?.()}\n  {/if}\n  {#if label}\n    <span class="ui-label">\n      {label}{@render endText?.()}\n    </span>\n  {/if}\n</th>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { classAttrs } from "../cx"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label, numeric, sortable } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <th\n    v-bind="classAttrs([{ \'ui-numeric\': numeric }, $props.class])"\n    :data-sort="sortable ? \'\' : undefined"\n  >\n    <button v-if="sortable" type="button"><slot></slot></button>\n    <slot v-else></slot>{{ " "\n    }}<span v-if="label" class="ui-label"\n      >{{ label }}<slot name="end-text"></slot\n    ></span>\n  </th>\n</template>\n',
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
      '<script lang="ts">\n  import Button from "../Button/Button.svelte"\n  import { markerPath } from "./icons"\n  import { classAttrs } from "../cx"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n\n    // Snippets\n    children,\n    marker,\n    ...rest\n  }: Props = $props()\n</script>\n\n<summary {...classAttrs([className])} {...rest}>\n  {@render children?.()}{" "}{#if marker}\n    {@render marker()}\n  {:else}\n    <svg aria-hidden="true">\n      <path d={markerPath} />\n    </svg>\n  {/if}\n  <Button round size="small">Close</Button>\n</summary>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport Button from "../Button/Button.vue"\nimport { markerPath } from "./icons"\nimport { classAttrs } from "../cx"\nimport type { Props, Slots } from "./types.vue-props"\n\ndefineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <summary v-bind="classAttrs([$props.class])">\n    <slot></slot>{{ " " }}<slot v-if="$slots.marker" name="marker"></slot>\n    <svg v-else aria-hidden="true"><path :d="markerPath" /></svg>{{ " "\n    }}<Button round size="small">Close</Button>\n  </summary>\n</template>\n',
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
      '"use client"\n\nimport { cx } from "../cx"\nimport { SampleContext } from "./context.react"\nimport { useFieldGroupContext } from "../FieldGroup/context.react"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, name, children, ...rest }: Props) {\n  const field = useFieldGroupContext()\n\n  return (\n    <SampleContext value={{ name: name || field?.name, open: true }}>\n      <div className={cx(["ui-sample", className])} {...rest}>\n        {children}\n      </div>\n    </SampleContext>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import { setSampleContext } from "./context.svelte"\n  import { getFieldGroupContext } from "../FieldGroup/context.svelte"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    name,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n\n  const field = getFieldGroupContext()\n  setSampleContext({\n    get name() {\n      return name || field?.name\n    },\n    get open() {\n      return true\n    },\n  })\n</script>\n\n<div class={["ui-sample", className]} {...rest}>\n  {@render children?.()}\n</div>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { computed, inject, provide, reactive } from "vue"\nimport { SampleKey } from "./context.vue"\nimport { FieldGroupKey } from "../FieldGroup/context.vue"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { name } = defineProps<Props>()\ndefineSlots<Slots>()\n\nconst field = inject(FieldGroupKey, undefined)\n\nprovide(\n  SampleKey,\n  reactive({\n    name: computed(() => name || field?.name),\n    open: computed(() => true),\n  }),\n)\n</script>\n\n<template>\n  <div :class="[\'ui-sample\', $props.class]">\n    <slot></slot>\n  </div>\n</template>\n',
    )
  })

  test("ids from the framework's uid and a warning behind an if", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { autoLabelledBy, createIds } from "../id"\nimport { warnMissingId } from "../dev"\n\nconst { class: className, id: idProp, ...rest } = Astro.props\n\nconst titleId = createIds(Astro.locals, "sample", idProp)("title")\nconst labelledBy = autoLabelledBy(rest, titleId)\nif (!labelledBy) {\n  warnMissingId("Sample", idProp)\n}\n---\n\n<section\n  aria-labelledby={labelledBy}\n  class:list={["ui-sample", className]}\n  id={idProp}\n  {...rest}\n>\n  <slot />\n</section>\n',
    )
    expect(ports["react.tsx"]).toBe(
      'import { useId } from "react"\nimport { cx } from "../cx"\nimport { autoLabelledBy } from "../id"\nimport { warnMissingId } from "../dev"\nimport type { Props } from "./types.react"\n\nexport default function Sample({\n  className,\n  id: idProp,\n  children,\n  ...rest\n}: Props) {\n  const uid = useId()\n  const titleId = `${idProp ?? `sample-${uid}`}-title`\n  const labelledBy = autoLabelledBy(rest, titleId)\n  if (!labelledBy) {\n    warnMissingId("Sample", idProp)\n  }\n\n  return (\n    <section\n      aria-labelledby={labelledBy}\n      className={cx(["ui-sample", className])}\n      id={idProp}\n      {...rest}\n    >\n      {children}\n    </section>\n  )\n}\n',
    )
    expect(ports.svelte).toContain(
      '  const uid = $props.id()\n  const titleId = $derived(`${idProp ?? `sample-${uid}`}-title`)\n  const labelledBy = $derived(autoLabelledBy(rest, titleId))\n  untrack(() => {\n    if (!labelledBy) {\n      warnMissingId("Sample", idProp)\n    }\n  })\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { computed, type HTMLAttributes, useAttrs, useId } from "vue"\nimport { autoLabelledBy } from "../id"\nimport { warnMissingId } from "../dev"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { id: idProp } = defineProps<Props>()\ndefineSlots<Slots>()\n\nconst attrs = useAttrs() as HTMLAttributes\n\nconst uid = useId()\n\nconst titleId = computed(() => `${idProp ?? `sample-${uid}`}-title`)\n\nconst labelledBy = computed(() => autoLabelledBy(attrs, titleId.value))\n\nif (!labelledBy.value) {\n  warnMissingId("Sample", idProp)\n}\n</script>\n\n<template>\n  <section\n    :aria-labelledby="labelledBy"\n    :class="[\'ui-sample\', $props.class]"\n    :id="idProp"\n  >\n    <slot></slot>\n  </section>\n</template>\n',
    )
  })

  test("a base id names its parts, and createId a generated id", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { createId, createIds } from "../id"\n\nconst { class: className, id, label, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id)\nconst idOf = createId(Astro.locals)\n---\n\n<div class:list={["ui-sample", className]} {...rest}>\n  <input aria-describedby={ids("hint")} id={ids()} />\n  <span id={ids("hint")}>{label}</span>\n  <span id={idOf("status")} role="status" />\n</div>\n',
    )
    expect(ports["react.tsx"]).toContain(
      "  const uid = useId()\n  const base = id ?? `sample-${uid}`\n",
    )
    expect(ports.svelte).toContain(
      "  const uid = $props.id()\n  const base = $derived(id ?? `sample-${uid}`)\n",
    )
    expect(ports.vue).toContain(
      "const uid = useId()\n\nconst base = computed(() => id ?? `sample-${uid}`)\n",
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
    for (const port of Object.values(ports)) {
      expect(port).not.toMatch(/createIds?\b/)
    }
  })

  test("a falsy id falls back to the generated base with ||", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { createIds } from "../id"\n\nconst { class: className, id, ...rest } = Astro.props\n\nconst ids = createIds(Astro.locals, "sample", id || undefined)\n---\n\n<input class:list={["ui-sample", className]} id={ids()} {...rest} />\n',
    )
    expect(ports["react.tsx"]).toContain("const base = id || `sample-${uid}`")
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
      '<label class:list={["ui-range", className]} {...rest}>\n  <span class="ui-label">{label}</span>\n  <input type="range" />\n  <slot />\n</label>',
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
      '<label class:list={["ui-range", className]} {...rest}>\n  <span class="ui-copy"><slot /></span>\n  <slot name="end" />\n</label>',
      '<span className="ui-copy">{children}</span> {end}',
    ],
    [
      "text sits on both sides",
      '<label class:list={["ui-range", className]} {...rest}>\n  {label} {value}\n  <input type="range" />\n</label>',
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
  })

  test("a side-effect script and a custom element", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, label, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} data-label={label} {...rest}>\n  <slot />\n  <span class="ui-sr-only" role="status"></span>\n</opui-sample>\n\n<script>\n  import "../../elements/sample.js"\n</script>\n',
    )
    expect(ports["react.tsx"]).toBe(
      '"use client"\n\nimport { useEffect } from "react"\nimport { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, label, children, ...rest }: Props) {\n  useEffect(() => {\n    void import("../../elements/sample.js")\n  }, [])\n\n  return (\n    <opui-sample\n      className={cx(["ui-sample", className])}\n      data-label={label}\n      {...rest}\n    >\n      {children} <span className="ui-sr-only" role="status" />\n    </opui-sample>\n  )\n}\n',
    )
    expect(ports.svelte).toBe(
      '<script lang="ts">\n  import "../../elements/sample.js"\n  import type { Props } from "./types.svelte"\n\n  let {\n    class: className,\n    label,\n\n    // Snippets\n    children,\n    ...rest\n  }: Props = $props()\n</script>\n\n<opui-sample class={["ui-sample", className]} data-label={label} {...rest}>\n  {@render children?.()}\n  <span class="ui-sr-only" role="status"></span>\n</opui-sample>\n',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport "../../elements/sample.js"\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { label } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <component\n    is="opui-sample"\n    :class="[\'ui-sample\', $props.class]"\n    :data-label="label"\n  >\n    <slot></slot>{{ " " }}<span class="ui-sr-only" role="status"></span>\n  </component>\n</template>\n',
    )
  })

  test("two element scripts load in one effect in React", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<opui-sample class:list={["ui-sample", className]} {...rest}>\n  <slot />\n</opui-sample>\n\n<script>\n  import "../../elements/sample.js"\n  import "../../elements/other.js"\n</script>\n',
    )
    expect(ports["react.tsx"]).toContain(
      '  useEffect(() => {\n    void import("../../elements/sample.js")\n    void import("../../elements/other.js")\n  }, [])\n',
    )
    expect(ports["react.tsx"].match(/useEffect\(/g)).toHaveLength(1)
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
  })

  test("mergeStyle merges into an object in React and into the attrs in Vue", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\nimport { mergeStyle } from "../style"\n\nconst { class: className, style, width, ...rest } = Astro.props\n---\n\n<col class:list={[className]} style={mergeStyle({ width }, style)} {...rest} />\n',
    )
    expect(ports["react.tsx"]).toContain(
      "style={mergeStyle({ width }, style ?? {})}",
    )
    expect(ports.svelte).toContain("style={mergeStyle({ width }, style)}")
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport { mergeStyle } from "../style"\nimport { classAttrs } from "../cx"\nimport type { Props } from "./types.vue-props"\n\nconst { width } = defineProps<Props>()\n</script>\n\n<template>\n  <col v-bind="classAttrs([$props.class])" :style="mergeStyle({ width }, {})" />\n</template>\n',
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
      '<span v-bind="classAttrs([$props.class])">\n    <TrimmedSlot v-if="!hidden" :nodes="$slots.end?.()" />\n  </span>',
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
      '{#each items ?? [] as { href, label, ...itemRest }, index (index)}\n    {@const Tag = href ? "a" : "span"}\n    <li>\n      <svelte:element this={Tag} {href} {...itemRest}>{label}</svelte:element>\n    </li>\n  {/each}',
    )
    expect(ports.vue).toBe(
      '<script setup lang="ts">\nimport type { Props, Slots } from "./types.vue-props"\n\nconst { items } = defineProps<Props>()\ndefineSlots<Slots>()\n</script>\n\n<template>\n  <ul :class="[\'ui-sample\', $props.class]">\n    <li v-for="({ href, label, ...itemRest }, index) in items" :key="index">\n      <component :is="href ? \'a\' : \'span\'" :href="href" v-bind="itemRest">{{\n        label\n      }}</component>\n    </li>\n    <slot></slot>\n  </ul>\n</template>\n',
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
  })

  test("a map callback returning a condition keys both branches", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, items, ...rest } = Astro.props\n---\n\n<datalist class:list={[className]} {...rest}>\n  {items?.map((option) =>\n    typeof option === "object" ? (\n      <option value={option.value} label={option.label} />\n    ) : (\n      <option value={option} />\n    ),\n  )}\n</datalist>\n',
    )
    expect(ports["react.tsx"]).toContain(
      '      {items?.map((option, index) =>\n        typeof option === "object" ? (\n          <option key={index} value={option.value} label={option.label} />\n        ) : (\n          <option key={index} value={option} />\n        ),\n      )}\n',
    )
    expect(ports.svelte).toContain(
      '{#each items ?? [] as option, index (index)}\n    {#if typeof option === "object"}\n      <option',
    )
    expect(ports.vue).toContain(
      '<template v-for="(option, index) in items" :key="index"',
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
    expect(react).toContain("onChange,")
    expect(react).toContain("const current = Number(value ?? defaultValue)")
    expect(react).toContain(
      "checked={value !== undefined ? current === star : undefined}",
    )
    expect(react).toContain(
      "defaultChecked={value !== undefined ? undefined : current === star}",
    )
    expect(react).toContain("onChange={onChange}")
    const svelte = port(".svelte")
    expect(svelte).toContain("value = $bindable(),")
    expect(svelte).toContain('value = "0"')
    expect(svelte).toContain("value = star")
    const vue = port(".vue")
    expect(vue).toContain("const modelValue = defineModel<number | string>()")
    expect(vue).not.toContain(":checked")
    expect(vue).not.toContain("@change")
    expect(vue.match(/v-seed\s+v-model="model"/g)).toHaveLength(2)
    expect(vue).not.toContain("const current")
  })

  test("Vue keeps the hyphenated props a component reads out of the attrs its root spreads", async () => {
    const ports = await compile(
      '---\nimport type { Props } from "./types.astro"\n\nconst { "aria-describedby": ariaDescribedBy, class: className, ...rest } = Astro.props\n---\n\n<fieldset class:list={["ui-sample", className]} {...rest}>\n  <input aria-describedby={ariaDescribedBy} />\n</fieldset>\n',
    )
    expect(ports.vue).toContain("inheritAttrs: false")
    expect(ports.vue).toContain(
      'Object.entries(attrs).filter(([key]) => key !== "aria-describedby")',
    )
    expect(ports.vue).toContain('v-bind="restAttrs"')
  })

  test("a value model from api.ts binds the control in Svelte and Vue and stays in rest in React", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, value, ...rest } = Astro.props\n---\n\n<label class:list={["ui-sample", className]}>\n  <textarea {...rest}>{value}</textarea>\n</label>\n',
      sampleFile(),
      { api: modelApi("value", "textarea") },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension))
    expect(port(".react.tsx")).toBe(
      'import { cx } from "../cx"\nimport type { Props } from "./types.react"\n\nexport default function Sample({ className, ...rest }: Props) {\n  return (\n    <label className={cx(["ui-sample", className])}>\n      <textarea {...rest} />\n    </label>\n  )\n}\n',
    )
    expect(port(".svelte")).toBe(
      '<script lang="ts">\n  import { untrack } from "svelte"\n  import type { Props } from "./types.svelte"\n\n  let { class: className, value = $bindable(), ...rest }: Props = $props()\n\n  const initialValue = untrack(() => value)\n</script>\n\n<label class={["ui-sample", className]}>\n  <textarea {...rest} bind:value defaultValue={initialValue}></textarea>\n</label>\n',
    )
    expect(port(".vue")).toBe(
      '<script setup lang="ts">\nimport { computed } from "vue"\nimport { useInputAttrs, vSeed } from "../vue"\nimport type { Props } from "./types.vue-props"\n\nconst { value } = defineProps<Props>()\n\ndefineOptions({\n  inheritAttrs: false,\n})\n\nconst attrs = useInputAttrs()\n\nconst modelValue = defineModel<number | string>()\n\nconst model = computed({\n  get: () => modelValue.value ?? value,\n  set: (value) => {\n    modelValue.value = value\n  },\n})\n</script>\n\n<template>\n  <label :class="[\'ui-sample\', $props.class]">\n    <textarea v-bind="attrs" v-seed v-model="model"></textarea>\n  </label>\n</template>\n',
    )
  })

  test("a value model read outside its control reads the current value in each framework", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, value, ...rest } = Astro.props\nconst shown = `${value ?? 0}%`\n---\n\n<label class:list={["ui-sample", className]}>\n  <output>{shown}</output>\n  <input {...rest} type="range" value={value} />\n</label>\n',
      sampleFile(),
      { api: modelApi("value", "input") },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension))
    expect(port(".react.tsx")).toContain(
      "const shown = `${rest.value ?? rest.defaultValue ?? 0}%`",
    )
    expect(port(".svelte")).toContain(
      "const shown = $derived(`${value ?? 0}%`)",
    )
    expect(port(".vue")).toContain(
      "const shown = computed(() => `${model.value ?? 0}%`)",
    )
  })

  test("a value model that only passes through rest declares the prop in Svelte and Vue", async () => {
    const { outputs } = await compileComponent(
      '---\nimport type { Props } from "./types.astro"\n\nconst { class: className, ...rest } = Astro.props\n---\n\n<span class:list={["ui-sample", className]}>\n  <input {...rest} type="number" />\n</span>\n',
      sampleFile(),
      { api: modelApi("value", "input") },
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      "let { class: className, value = $bindable(), ...rest }: Props = $props()",
    )
    expect(outputs.get(sampleFile().replace(".astro", ".vue"))).toContain(
      '<input v-bind="attrs" type="number" v-seed v-model.number="model" />',
    )
  })

  test.each([
    [
      '<input type="text" {...rest} />',
      modelApi("checked", "input"),
      "the checked model of Sample, which isn't a value, checked or radio model of a control",
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
        types:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Omit<HTMLAttributes<"input">, "maxlength">\n',
      },
    )
    const port = (extension: string) =>
      outputs.get(sampleFile().replace(".astro", extension))
    expect(port(".react.tsx")).toContain('autoComplete: autocomplete = "off",')
    expect(port(".react.tsx")).toContain("spellCheck: spellcheck,")
    expect(port(".react.tsx")).toContain('<span popover="" />')
    expect(port(".react.tsx")).toContain("<input disabled />")
    expect(port(".vue")).toContain(
      'const { autocomplete = "off", spellcheck = undefined } = defineProps<Props>()',
    )
    expect(
      toTypes(
        "Sample",
        {
          astro:
            'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Omit<HTMLAttributes<"input">, "maxlength">\n',
          base: "export type Props = {}\n",
        },
        { Sample: ["default"] },
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
        base: "export type Props = {}\n\nexport type Slots<S> = {\n  end?: string | S\n}\n",
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
      "  let {\n    checked = $bindable(),\n    group = $bindable(),\n    name,\n    value,\n    ...rest\n  }: Props = $props()\n\n  const getChecked = () => (group ? group.includes(value) : !!checked)\n  const setChecked = (isChecked: boolean) => {\n    if (group) group = toggleInGroup(group, value, isChecked)\n    else checked = isChecked\n  }\n",
    )
    expect(svelte).toContain(
      '<input\n  type="checkbox"\n  {name}\n  {...rest}\n  bind:checked={getChecked, setChecked}\n  defaultChecked={initialChecked}\n  {value}\n/>',
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      'const attrs = useAttrs() as IntrinsicElementAttributes["input"]',
    )
    expect(vue).toContain(
      "const modelValue = defineModel<boolean | (string | number)[] | undefined>({\n  default: undefined,\n})\n\nconst model = computed({\n  get: () =>\n    modelValue.value ??\n    (attrs.checked !== undefined && attrs.checked !== false),\n  set: (value) => {\n    modelValue.value = value\n  },\n})",
    )
    expect(vue).toContain(
      '<input\n    type="checkbox"\n    :name="name"\n    v-bind="{ ...attrs, ...classAttrs($props.class) }"\n    v-seed\n    v-model="model"\n  />',
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
      '<input\n  type="radio"\n  {...rest}\n  {@attach seedChecked(isChecked, check)}\n  defaultChecked={initialChecked}\n  onchange={(event) => {\n    check()\n    onchange?.(event)\n  }}\n  {value}\n/>',
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain("const unchecked = Symbol()")
    expect(vue).toContain(
      '<input\n    type="radio"\n    v-bind="{ ...attrs, ...classAttrs($props.class) }"\n    :value="attrs.value"\n    v-seed\n    v-model="model"\n  />',
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
      "const modelValue = defineModel<string | number | boolean | undefined>({\n  default: undefined,\n})",
    )
    expect(vue).toContain('<RadioInput v-bind="attrs" v-model="modelValue" />')
  })

  test("a model the context shares compiles to a group with a change callback", async () => {
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
      "export default function Sample({\n  className,\n  defaultValue,\n  name,\n  onValueChange,\n  value,\n  children,\n  ...rest\n}: Props) {\n  const [inner, setInner] = useState(defaultValue)\n  const change = (input: HTMLInputElement) => {\n    const next = input.value\n    if (inner !== undefined) setInner(next)\n    onValueChange?.(next)\n  }\n",
    )
    expect(react).toContain(
      "<SampleContext value={{ change, name, value: value ?? inner }}>",
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      "  setSampleContext({\n    change(input) {\n      if (value !== undefined) value = input.value\n    },\n    get name() {\n      return name\n    },\n    get value() {\n      return value\n    },\n  })\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const model = defineModel<string>()\n\nconst change = (input: HTMLInputElement) => {\n  if (model.value !== undefined) model.value = input.value\n}\n\nprovide(\n  SampleKey,\n  reactive({ change, name: computed(() => name), value: model }),\n)",
    )
  })

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
      '    <>\n      <input\n        checked={grouped ?? checked}\n        defaultChecked={grouped === undefined ? defaultChecked : undefined}\n        className={cx(["ui-sample", className])}\n        type="radio"\n        value={value}\n        {...rest}\n        onChange={(event) => {\n          parent?.change?.(event.currentTarget)\n          onChange?.(event)\n        }}\n      />\n      {children}\n    </>\n',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      "  {...rest}\n  onchange={(event) => {\n    parent?.change?.(event.currentTarget)\n    onchange?.(event)\n  }}\n/>{@render children?.()}\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const { checked = undefined, value } = defineProps<Props>()",
    )
    expect(vue).toContain(
      "const change = (event: Event) =>\n  parent?.change?.(event.currentTarget as HTMLInputElement)",
    )
    expect(vue).toContain(
      '    v-bind="attrs"\n    @change="change"\n  /><slot></slot>',
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
      '<input type="checkbox" {...rest} /> {children}\n    </label>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      '<input type="checkbox" {...rest} />\n  {@render children?.()}\n</label>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".vue"))).toContain(
      '<input type="checkbox" v-bind="attrs" />{{ " " }}<slot></slot>',
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
      'Text <input type="checkbox" {...rest} /> More',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".svelte"))).toContain(
      '  >Text\n  <input type="checkbox" {...rest} />\n  More</label\n>',
    )
    expect(outputs.get(sampleFile().replace(".astro", ".vue"))).toContain(
      '>Text{{ " " }}<input type="checkbox" v-bind="attrs" />{{ " " }}More</label',
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
      "const model = defineModel<Model>()\n\nconst change = (input: HTMLInputElement) => {\n  if (model.value !== undefined)\n    model.value = selectionOf(input, multiple) as Model\n}",
    )
    expect(outputs.get(sampleFile().replace(".astro", ".react.tsx"))).toContain(
      "    const next = selectionOf(input, multiple)\n    if (inner !== undefined) setInner(next)\n    onValueChange?.(next as never)\n",
    )
  })

  test("an item with a checked model binds it when the group has no value", async () => {
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
      "    onchange={(event) => {\n      if (grouped === undefined) checked = event.currentTarget.checked\n      group?.change?.(event.currentTarget)\n      onchange?.(event)\n    }}\n",
    )
    const vue = outputs.get(sampleFile().replace(".astro", ".vue"))
    expect(vue).toContain(
      "const model = defineModel<boolean | undefined>({\n  default: undefined,\n})",
    )
    expect(vue).toContain(
      'warnGroupedChecked(\n    "Sample",\n    grouped.value,\n    checked ?? model.value,\n    "ToggleGroup",\n  )',
    )
    expect(vue).toContain(
      "const change = (event: Event) => {\n  const input = event.currentTarget as HTMLInputElement\n  if (grouped.value === undefined) model.value = input.checked\n  group?.change?.(input)\n}",
    )
    expect(vue).toContain(':checked="grouped ?? model ?? checked"')
    expect(vue).toContain(':data-off="!(model ?? checked)"')
    expect(vue).not.toContain("v-model")
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
      "map callback doesn't return one element or a condition between two",
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

  test("a part with only the default slot gets its own Vue slot type when the folder's Slots names others", async () => {
    const { vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n\nexport type SamplePartProps = HTMLAttributes<"dd">\n',
        base: `${base}\nexport type Slots<S> = {\n  end?: S\n}\n`,
      },
      { Sample: ["default", "end"], SamplePart: ["default"] },
    )
    expect(vue).toContain(
      "export type SamplePartSlots = DefaultSlots\n\nexport type Slots = { end?: Slot } & DefaultSlots\n",
    )
    const { outputs } = await compileComponent(
      astro("<dd {...rest}>\n  <slot />\n</dd>", "", "SamplePart"),
      sampleFile("SamplePart"),
      { base: `${base}\nexport type Slots<S> = {\n  end?: S\n}\n` },
    )
    expect(
      outputs.get(sampleFile("SamplePart").replace(".astro", ".vue")),
    ).toContain("defineSlots<SamplePartSlots>()")
  })

  test("Vue leaves the attribute keys of the base props out, so they fall through to the element", () => {
    const { react, vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"div">\n',
        base: 'export type Props = {\n  variant?: "a" | "b"\n} & ({ "aria-label": string } | { "aria-labelledby": string })\n',
      },
      { Sample: ["default"] },
    )
    expect(react).toContain(
      'export type Props = Base.Props & ComponentProps<"div">',
    )
    expect(vue).toContain(
      'export type Props = Omit<BaseProps, "aria-label" | "aria-labelledby"> & Class',
    )
  })

  test("an Omit keeps the keyof members of its keys next to the literal ones", () => {
    const types = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props &\n  Omit<HTMLAttributes<"input">, keyof Base.Props | "type">\n',
        base,
      },
      { Sample: [] },
    )
    expect(types.react).toContain(
      'Omit<ComponentProps<"input">, "children" | "type" | keyof Base.Props>',
    )
    expect(types.svelte).toContain(
      'Omit<SvelteHTMLElements["input"], "children" | "type" | keyof Base.Props>',
    )
  })

  test("React types a radio group's onChange for its inputs", () => {
    const { react } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"fieldset">\n',
        base: "export type Props = {\n  value?: number | string\n}\n",
      },
      { Sample: [] },
      {},
      {},
      {
        Sample: {
          bindables: [{ prop: "value", type: "number | string" }],
          kind: "radioGroup",
          prop: "value",
          type: "number | string",
        },
      },
    )
    expect(react).toContain(
      'import type { ChangeEventHandler, ComponentProps } from "react"',
    )
    expect(react).toContain(
      'Base.Props & { onChange?: ChangeEventHandler<HTMLInputElement> } & Omit<ComponentProps<"fieldset">, "children" | "onChange">',
    )
  })

  test("an HTML attribute a component reads becomes a Vue prop", () => {
    const { vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"label">\n',
        base: 'export type Props = {\n  size?: "small"\n} & ({ trigger?: never } | { trigger: "hover" })\n',
      },
      { Sample: ["default"] },
      { Sample: ["for", "id", "size", "trigger"] },
    )
    expect(vue).toContain(
      'export type Props = BaseProps & Class & { for?: IntrinsicElementAttributes["label"]["for"]; id?: IntrinsicElementAttributes["label"]["id"] }',
    )
    expect(vue).toContain(
      'import type { IntrinsicElementAttributes } from "vue"',
    )
  })

  test("a literal that reads an element attribute keeps its declaration in Vue, and an element read twice is one element", () => {
    const { react, vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & {\n  type?: HTMLAttributes<"input">["type"] | "numeric"\n} & Omit<HTMLAttributes<"input">, "type">\n',
        base: 'export type Props = {\n  size?: "small"\n}\n',
      },
      { Sample: [] },
      { Sample: ["id", "size", "type"] },
    )
    expect(react).toContain(
      'type?: ComponentProps<"input">["type"] | "numeric"',
    )
    expect(vue).toContain(
      'export type Props = BaseProps & {\n  type?: IntrinsicElementAttributes["input"]["type"] | "numeric"\n} & Class & { id?: IntrinsicElementAttributes["input"]["id"] }',
    )
  })

  test("React takes a base prop like for by its React name", () => {
    const { react, svelte } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & HTMLAttributes<"li">\n',
        base: "export type Props = {\n  for?: string\n  inset?: boolean\n}\n",
      },
      { Sample: ["default"] },
    )
    expect(react).toContain(
      'Without<Base.Props, "for"> & { htmlFor?: Base.Props["for"] }',
    )
    expect(svelte).toContain("Base.Props & SvelteHTMLElements")
  })

  test("slots on a union, a string-or-slot prop, a custom element root and a plain alias", () => {
    const types = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props =\n  | (Base.Props & { as?: "button"; href?: never } & HTMLAttributes<"button">)\n  | (Base.Props & { as?: "a"; href: string } & HTMLAttributes<"a">)\n\nexport type SampleItem = Base.SampleItem & Omit<HTMLAttributes<"a">, "children">\n\nexport type SampleTagProps = Base.SampleTagProps & Omit<HTMLAttributes<"div">, "id">\n',
        base: 'export type Props = {\n  size?: "small"\n}\n\nexport type Slots<S> =\n  | { "aria-label": string; children?: S }\n  | { "aria-label"?: string; children: S }\n\nexport type SampleItem = { label: string }\n\nexport type SampleTagProps = { id: string }\n\nexport type SampleTagSlots<S> = {\n  end?: S\n  label?: string | S\n}\n',
      },
      { Sample: ["default"], SampleTag: ["end", "label"] },
      {},
      { SampleTag: ["opui-sample"] },
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

  test("the React types of a group add defaultValue and onValueChange", () => {
    const { react, svelte, vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & { value?: string } & HTMLAttributes<"div">\n',
        base,
      },
      { Sample: ["default"] },
      {},
      {},
      {
        Sample: {
          bindables: [{ prop: "value", type: "string" }],
          kind: "group",
          prop: "value",
          type: "string",
        },
      },
    )
    expect(react).toContain(
      'export type Props = Base.Props & { defaultValue?: string; onValueChange?: (value: string) => void; value?: string } & Omit<ComponentProps<"div">, "defaultValue">',
    )
    expect(svelte).toContain(
      'export type Props = Base.Props & { value?: string } & SvelteHTMLElements["div"]\n',
    )
    expect(vue).toContain("export type Props = BaseProps & Class\n")
  })

  test("the types of a group tie the value's React props to each declaration of it", () => {
    const { react, vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props &\n  Base.Selection<{ value?: string }, { value?: string[] }> &\n  Omit<HTMLAttributes<"div">, "size">\n',
        base: `${base}\n\nexport type Selection<Single, Multiple> =\n  ({ multiple?: false } & Single) | ({ multiple: true } & Multiple)\n`,
      },
      { Sample: ["default"] },
      { Sample: ["value"] },
      {},
      {
        Sample: {
          bindables: [{ prop: "value", type: "string | string[]" }],
          kind: "group",
          prop: "value",
          type: "string | string[]",
        },
      },
    )
    expect(react).toContain(
      'export type Props = Base.Props &\n  Base.Selection<{ defaultValue?: string; onValueChange?: (value: string) => void; value?: string }, { defaultValue?: string[]; onValueChange?: (value: string[]) => void; value?: string[] }> &\n  Omit<ComponentProps<"div">, "defaultValue" | "size">',
    )
    expect(vue).toContain("export type Props = BaseProps & Class\n")
  })

  test("the Svelte types declare a model's bindables", () => {
    const { react, svelte } = toTypes(
      "Sample",
      { astro: simple, base },
      { Sample: ["default"] },
      {},
      {},
      {
        Sample: {
          bindables: [
            { prop: "group", type: "(string | number)[]" },
            { prop: "checked", type: "boolean" },
          ],
          kind: "checked",
          prop: "checked",
          type: "boolean | (string | number)[]",
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
    const { vue } = toTypes(
      "Sample",
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Omit<Base.Props, "items"> & {\n  items?: string[]\n} & Omit<HTMLAttributes<"menu">, "id">\n',
        base: "export type Props = {\n  id: string\n  items?: number[]\n}\n",
      },
      { Sample: ["default"] },
    )
    expect(vue).toContain(
      'export type Props = Omit<BaseProps, "items"> & {\n  items?: string[]\n} & Class',
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
      "export type Slots = { end?: Slot } & DefaultSlots",
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
        base: `${base}\nexport type Slots<S> = { variant?: S }\n`,
      },
      { Sample: ["default", "variant"] },
      "a prop and a slot both named variant",
    ],
    [
      {
        astro:
          'import type * as Base from "./types"\nimport type { HTMLAttributes } from "astro/types"\n\nexport type Props = Base.Props & Extra & HTMLAttributes<"div">\n',
        base,
      },
      { Sample: ["default"] },
      "the type Props, whose part Extra has no Vue form",
    ],
    [
      {
        astro: simple,
        base: `${base}\nexport type Slots<S> = { endText?: S }\n`,
      },
      { Sample: ["default"] },
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
