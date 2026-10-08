export type ComponentFramework = "astro" | "solid" | "svelte" | "vue"

export type Framework = ComponentFramework | "html"

type Syntax = {
  component: (source: string) => string
  model?: (prop: string) => string
  modelIsProp?: boolean
  slot: (name: string) => string
  slotsAreProps: boolean
  types: string
}

export const slotProp = (name: string) =>
  name === "default"
    ? "children"
    : name.replace(/-(\w)/g, (_, letter: string) => letter.toUpperCase())

export const frameworks: Record<ComponentFramework, Syntax> = {
  astro: {
    component: (source) => `${source}.astro`,
    slot: (name) => `slot="${name}"`,
    slotsAreProps: false,
    types: "types.astro.ts",
  },
  solid: {
    component: (source) => `${source}.tsx`,
    slot: slotProp,
    slotsAreProps: true,
    types: "types.solid.ts",
  },
  svelte: {
    component: (source) => `${source}.svelte`,
    model: (prop) => `bind:${prop}`,
    modelIsProp: true,
    slot: slotProp,
    slotsAreProps: true,
    types: "types.svelte.ts",
  },
  vue: {
    component: (source) => `${source}.vue`,
    model: () => "v-model",
    slot: (name) => `v-slot:${name}`,
    slotsAreProps: false,
    types: "types.d.vue.ts",
  },
}
