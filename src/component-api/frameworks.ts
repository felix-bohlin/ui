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
    types: "types.d.vue.ts",
  },
}
