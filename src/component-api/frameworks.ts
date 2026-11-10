import type { FrameworkId, PackageFrameworkId } from "../utils/framework"

export type ComponentFramework = PackageFrameworkId

export type Framework = FrameworkId

type Syntax = {
  component: (source: string) => string
  model?: (prop: string) => string
  modelIsProp?: boolean
  slot: (name: string) => string
  types: string
} & ({ slotsAreProps: false } | { slotType: string; slotsAreProps: true })

export const slotProp = (name: string) =>
  name === "default"
    ? "children"
    : name.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase())

export const components = (note: string) => ({
  astro: note,
  react: note,
  svelte: note,
  vue: note,
})

export const elementNotes = (file: string, note: string) => {
  const module = `\`opui-css/elements/${file}\``
  const imported = `The component imports ${module}, so the element runs as soon as the component's code loads. ${note}`
  return {
    astro: `The component loads ${module}. ${note}`,
    react: `The component loads ${module} once it mounts, unless the page imports it first. ${note}`,
    svelte: imported,
    vue: imported,
  }
}

export const frameworks: Record<ComponentFramework, Syntax> = {
  astro: {
    component: (source) => `${source}.astro`,
    slot: (name) => `slot="${name}"`,
    slotsAreProps: false,
    types: "types.astro.ts",
  },
  react: {
    component: (source) => `${source}.react.tsx`,
    slot: slotProp,
    slotType: "ReactNode",
    slotsAreProps: true,
    types: "types.react.ts",
  },
  svelte: {
    component: (source) => `${source}.svelte`,
    model: (prop) => `bind:${prop}`,
    modelIsProp: true,
    slot: slotProp,
    slotType: "Snippet",
    slotsAreProps: true,
    types: "types.svelte.ts",
  },
  vue: {
    component: (source) => `${source}.vue`,
    model: () => "v-model",
    slot: (name) => `v-slot:${name}`,
    slotsAreProps: false,
    types: "types.vue-props.ts",
  },
}

const listOf = (items: string[]) => {
  const code = items.map((item) => `\`${item}\``)
  return code.length > 1
    ? `${code.slice(0, -1).join(", ")} and ${code.at(-1)}`
    : code.join("")
}

export const passThrough = (
  element: string,
  root: string,
  examples: string[],
  more: Partial<Record<ComponentFramework | "default", string>> = {},
) =>
  Object.fromEntries(
    (Object.keys(frameworks) as ComponentFramework[]).map((framework) => [
      framework,
      [
        `Attributes that aren't props go to the \`<${element}>\`, like ${listOf(examples)}, and \`${framework === "react" ? "className" : "class"}\` and \`style\` go to ${root.startsWith(".") ? `the \`${root}\` root` : `the root \`<${root}>\``}.`,
        more[framework] ?? more.default,
      ]
        .filter(Boolean)
        .join(" "),
    ]),
  ) as Record<ComponentFramework, string>
