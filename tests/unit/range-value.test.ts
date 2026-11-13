import { describe, expect, test } from "vitest"
import type { ComponentFramework } from "../../src/component-api/frameworks"
import RangeAstro from "../../packages/opui/components/Range/Range.astro"
import RangeReact from "../../packages/opui/components/Range/Range.react"
import RangeSvelte from "../../packages/opui/components/Range/Range.svelte"
import RangeVue from "../../packages/opui/components/Range/Range.vue"
import {
  formatValue,
  middleValue,
} from "../../packages/opui/components/Range/value"
import { render } from "./renderers"

const ranges: Record<ComponentFramework, unknown> = {
  astro: RangeAstro,
  react: RangeReact,
  svelte: RangeSvelte,
  vue: RangeVue,
}

describe("middleValue", () => {
  test("starts at the step nearest the middle, without floating-point noise", () => {
    expect(middleValue({ max: "0.6", min: "0", step: "0.1" })).toBe(0.3)
    expect(middleValue({ max: 1, min: 0.25, step: 0.5 })).toBe(0.75)
    expect(middleValue({ max: 10, min: 0, step: 3 })).toBe(6)
    expect(middleValue({ max: 1, min: 0, step: "any" })).toBe(0.5)
    expect(middleValue({})).toBe(50)
  })
})

describe("formatValue", () => {
  test("formats for lang with the decimals of min and step and no grouping", () => {
    expect(formatValue(0.3, { min: "0", step: "0.1" })).toBe("0.3")
    expect(formatValue(1, { lang: "de", step: 0.5 })).toBe("1,0")
    expect(formatValue(1500, { lang: "de" })).toBe("1500")
    expect(formatValue(1.5, { lang: "de", min: 0.5 })).toBe("1,5")
    expect(formatValue(0.125, { step: "any" })).toBe("0.125")
  })

  test("falls back to English without a lang and for a bad lang", () => {
    expect(formatValue(0.5, { lang: "", step: 0.1 })).toBe("0.5")
    expect(formatValue(0.5, { lang: "not a language", step: 0.1 })).toBe("0.5")
  })
})

describe.each(Object.entries(ranges))("Range in %s", (framework, component) => {
  const html = async (props: Record<string, unknown>) =>
    (
      await render[framework as ComponentFramework](component, {
        label: "Weight",
        max: "0.6",
        min: "0",
        step: "0.1",
        valueSuffix: " kg",
        ...props,
      })
    ).replaceAll(/<!--.*?-->/g, "")

  test("shows the middle value without floating-point noise", async () => {
    const markup = await html({})
    expect(markup.match(/<output[^>]*>([^<]*)</)?.[1].trim()).toBe("0.3 kg")
    expect(markup).toContain('aria-valuetext="0.3 kg"')
    expect(markup).not.toContain("0.30000000000000004")
  })

  test("formats the value for its lang and puts lang on the root", async () => {
    const markup = await html({ lang: "de" })
    expect(markup).toMatch(/<label[^>]*\slang="de"/)
    expect(markup).not.toMatch(/<input[^>]*\slang=/)
    expect(markup.match(/<output[^>]*>([^<]*)</)?.[1].trim()).toBe("0,3 kg")
    expect(markup).toContain('aria-valuetext="0,3 kg"')
  })
})
