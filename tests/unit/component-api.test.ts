import { describe, expect, test } from "vitest"
import type { ComponentApi } from "../../src/component-api/types"
import {
  anchorNames,
  checkApi,
  checkClasses,
  checkExports,
  destructuredDefaults,
  frameworkProps,
} from "../../src/utils/component-source"

const apis = Object.values(
  import.meta.glob<ComponentApi>("../../src/component-api/*/api.ts", {
    eager: true,
    import: "default",
  }),
)

describe("component api", () => {
  test("api.ts matches the components", () => {
    expect(apis.flatMap(checkApi)).toEqual([])
  }, 120_000)

  test("every exported component is documented", () => {
    expect(checkExports(apis)).toEqual([])
  })

  test("every class a stylesheet adds is in some api.ts", () => {
    expect(checkClasses(apis)).toEqual([])
  })
})

describe("component api checks", () => {
  test("anchorNames reads anchor-name, and the private property it reads", () => {
    expect([
      ...anchorNames(
        ":where(.a) { --_content-anchor: --ui-a; &:where(.b) { --_content-anchor: --ui-b; } & > .c { anchor-name: var(--_content-anchor); } } .d { anchor-name: --ui-d, --ui-e; }",
      ),
    ]).toEqual(["--ui-a", "--ui-b", "--ui-d", "--ui-e"])
  })

  test("report classes, cssVars and anchor names the stylesheets don't have", () => {
    expect(
      checkApi({
        component: "Fake",
        css: ["carousel"],
        options: [
          {
            class: ".ui-peek",
            cssVar: "--_items-per-view",
            description: "Known.",
            group: "Known",
            prop: "known",
          },
          {
            class: ".ui-missing",
            cssVar: "--_missing",
            description: "Missing.",
            group: "Missing",
            prop: "missing",
            values: { a: ".ui-sr-only", b: ".ui-gone", c: null },
          },
        ],
        parts: [
          {
            anchorName: "--ui-carousel",
            description: "A part.",
            selector: ".ui-carousel > .ui-nowhere",
          },
        ],
        root: {
          anchorName: "--ui-stale",
          description: "The root.",
          selector: ".ui-carousel",
        },
      }),
    ).toEqual([
      'Fake: class ".ui-nowhere" is in neither its stylesheets (carousel.css) nor the core CSS',
      'Fake: class ".ui-missing" is in neither its stylesheets (carousel.css) nor the core CSS',
      'Fake: class ".ui-gone" is in neither its stylesheets (carousel.css) nor the core CSS',
      'Fake: cssVar "--_missing" is not in carousel.css',
      'Fake: anchorName "--ui-stale" is no anchor-name in carousel.css',
    ])
  })

  test("report stylesheet classes that no api.ts names", () => {
    expect(checkClasses([])).toContain(
      'carousel.css: class ".ui-markers" is in no api.ts; document it as an option, a part or in a note',
    )
  })

  test("read the literal destructured defaults in every framework", () => {
    const expected = new Map([
      ["open", "false"],
      ["size", '"large"'],
      ["value", "1"],
    ])
    expect(
      destructuredDefaults(
        "astro",
        '---\nconst { as = tag(), open = false, size = "large", value = 1, ...rest } = Astro.props as Props\n---\n<div />',
      ),
    ).toEqual(expected)
    expect(
      destructuredDefaults(
        "react",
        'export default function A({ open = false, size = "large", value = 1, ...rest }: Props) {\n  return <div />\n}',
      ),
    ).toEqual(expected)
    expect(
      destructuredDefaults(
        "svelte",
        '<script lang="ts">\n  let { checked = $bindable(), open = false, size = "large", value = $bindable(1) }: Props = $props()\n</script>',
      ),
    ).toEqual(expected)
    expect(
      destructuredDefaults(
        "vue",
        "<script setup lang=\"ts\">\nconst { open = false, size = 'large', value = 1 } = defineProps<Props>()\n</script>",
      ),
    ).toEqual(expected)
  })

  test("read the events a framework types on the package's custom elements, not their attributes", () => {
    const sortableTable = {
      component: "SortableTable",
      source: "SortableTable",
    }
    expect(frameworkProps(sortableTable, "svelte").has("onsort")).toBe(true)
    expect(frameworkProps(sortableTable, "svelte").has("ascending-label")).toBe(
      false,
    )
    expect(
      frameworkProps({ component: "Button", source: "Button" }, "react").has(
        "interestfor",
      ),
    ).toBe(false)
  })

  test("read a component's events as onDismiss in React, ondismiss in Svelte and @dismiss in Vue, from its own Emits type", () => {
    const callout = { component: "Callout", source: "Callout" }
    expect(frameworkProps(callout, "react").get("onDismiss")).toBe(
      "(event: Event) => void",
    )
    expect(frameworkProps(callout, "svelte").get("ondismiss")).toBe(
      "(event: Event) => void",
    )
    expect(frameworkProps(callout, "vue").get("@dismiss")).toBe(
      "(event: Event) => void",
    )
    expect(
      frameworkProps({ component: "CalloutActions", source: "Callout" }, "vue")
        .size,
    ).toBe(0)
    expect(
      checkApi({
        component: "CalloutActions",
        options: [
          {
            description: "Called.",
            frameworks: ["vue"],
            prop: "@dismiss",
          },
        ],
        parts: [],
        root: { description: "Root.", selector: ".ui-actions" },
        source: "Callout",
      }),
    ).toContain('CalloutActions (vue): prop "@dismiss" does not exist')
  })
})
