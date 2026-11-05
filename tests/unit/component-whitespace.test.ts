import { createElement, type ComponentType } from "react"
import { renderToString as renderReact } from "react-dom/server"
import type { Component as VueComponent } from "vue"
import { describe, expect, test } from "vitest"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { slotProp } from "../../src/component-api/frameworks"
import type { ComponentApi } from "../../src/component-api/types"
import { createIdGenerator } from "../../src/utils/id"
import { normalize } from "./normalize"
import { render } from "./renderers"

const apis = import.meta.glob<ComponentApi>(
  "../../src/component-api/*/api.ts",
  { eager: true, import: "default" },
)
const astroComponents = import.meta.glob<unknown>(
  "../../packages/opui/components/*/*.astro",
  { import: "default" },
)
const reactComponents = import.meta.glob<{
  default: ComponentType<Record<string, unknown>>
}>("../../packages/opui/components/*/*.react.tsx")
const vueComponents = import.meta.glob<VueComponent>(
  "../../packages/opui/components/*/*.vue",
  { import: "default" },
)

const loaderOf = <T>(modules: Record<string, () => Promise<T>>, name: string) =>
  Object.entries(modules).find(([path]) =>
    path
      .replace(/\.react\.tsx$/, ".tsx")
      .endsWith(`/${name}.${path.split(".").at(-1)}`),
  )?.[1]

const slotsOf = (api: ComponentApi) =>
  [
    ...new Set([
      ...(api.slots ?? []).map(({ name }) => name),
      ...api.parts.flatMap((part) => part.slots ?? []),
    ]),
  ].toSorted()

const PADDED = "\n    Text\n  "
const TIGHT = "Text"

const CASES = Object.values(apis)
  .flatMap((api) =>
    slotsOf(api).map((slot) => ({ component: api.component, slot })),
  )
  .toSorted((a, b) =>
    `${a.component} ${a.slot}`.localeCompare(`${b.component} ${b.slot}`),
  )

const props = { required: true }

const astro = async (name: string, slot: string, content: string) => {
  const load = loaderOf(astroComponents, name)
  if (!load) return undefined
  return render.astro(
    await load(),
    props,
    { [slot]: content },
    {
      $id: createIdGenerator(),
      framework: "astro",
      link: (path: string) => path,
    },
  )
}

const vue = async (name: string, slot: string, content: string) => {
  const load = loaderOf(vueComponents, name)
  if (!load) return undefined
  return render.vue(await load(), props, { [slot]: content })
}

const spacesOf = (html: string) =>
  normalize(html)
    .split("\n")
    .filter((line) => line.includes("Text"))
    .map(
      (line) =>
        `${line.includes("␣Text") ? "␣" : ""}Text${line.includes("Text␣") ? "␣" : ""}`,
    )

const holdsText = (html: string) => {
  try {
    parseHtml(html)
    return true
  } catch {
    return false
  }
}

const react = async (name: string, slot: string, content: string) => {
  const load = loaderOf(reactComponents, name)
  if (!load) return undefined
  const { default: component } = await load()
  for (const value of [content, () => content]) {
    try {
      return renderReact(
        createElement(component, { ...props, [slotProp(slot)]: value }),
      )
    } catch {}
  }
  return undefined
}

const HINT =
  "render the slot through trimEdges() from components/whitespace.ts in Astro and <TrimmedSlot> from components/whitespace.vue.ts in Vue, and keep the component's own markup next to it on one line"

describe("whitespace around slot content", () => {
  test("covers the components", () => {
    expect(CASES.length).toBeGreaterThan(40)
  })

  test.each(CASES)(
    "$component $slot renders the same padded as tight",
    async ({ component, slot }) => {
      for (const render of [astro, vue]) {
        const tight = await render(component, slot, TIGHT)
        if (tight === undefined || !holdsText(tight)) continue
        const padded = await render(component, slot, PADDED)
        expect
          .soft(
            normalize(padded!),
            `${component}: the whitespace around the ${slot} slot renders in ${render.name}; ${HINT}`,
          )
          .toBe(normalize(tight))
      }
    },
  )

  test.each(CASES)(
    "$component $slot reads in Astro and Vue as in React",
    async ({ component, slot }) => {
      const expected = await react(component, slot, TIGHT)
      if (expected === undefined || !holdsText(expected)) return
      for (const render of [astro, vue]) {
        const actual = await render(component, slot, TIGHT)
        if (
          actual === undefined ||
          spacesOf(actual).length !== spacesOf(expected).length
        ) {
          continue
        }
        expect
          .soft(
            spacesOf(actual),
            `${component}: the ${slot} slot has spaces around it in ${render.name} that React doesn't render; ${HINT}`,
          )
          .toEqual(spacesOf(expected))
      }
    },
  )

  test("the Astro Select closes its selectedcontent", async () => {
    const html = await astro("Select", "label", TIGHT)
    expect(html).toContain("<selectedcontent></selectedcontent>")
    expect(html).not.toContain("<selectedcontent/>")
  })

  test("a sample the check must flag: a space before the required asterisk", () => {
    const label = (text: string) =>
      `<label class="ui-checkbox"><input required type="checkbox"><span class="ui-label">${text}</span></label>`
    expect(normalize(label(PADDED))).not.toBe(normalize(label(TIGHT)))
  })
})
