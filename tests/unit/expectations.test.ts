import { readdirSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  derivedExpectations,
  EXPECTED,
  expectation,
  expectations,
  expectStill,
  unusedReasons,
  WEBKIT_RADIO_NO_WRAP,
  WEBKIT_TOP_LAYER_ANCHOR,
} from "../expectations"

const DERIVED = await derivedExpectations()

const SAMPLES = [
  {
    app: "sveltekit",
    aspect: ["checkbox-bound", "radio-bound"],
    check: "native",
    reason: WEBKIT_RADIO_NO_WRAP,
  },
  {
    aspect: ["checkbox-bound", "radio-bound"],
    check: "native",
    framework: "svelte",
    reason: WEBKIT_TOP_LAYER_ANCHOR,
  },
  {
    check: "example-text",
    engine: "webkit",
    example: "checkbox",
    reason: WEBKIT_RADIO_NO_WRAP,
  },
] as const

const recorder = () => {
  const failures: string[] = []
  return {
    failures,
    soft: (actual: boolean, message: string) => ({
      toBe: (wanted: boolean) => {
        if (actual !== wanted) failures.push(message)
      },
    }),
  }
}

const sourcesIn = (dir: string) =>
  readdirSync(new URL(dir, import.meta.url))
    .filter((file) => file.endsWith(".ts") && file !== "expectations.test.ts")
    .map((file) =>
      readFileSync(new URL(`${dir}${file}`, import.meta.url), "utf8"),
    )

describe("the expectation key", () => {
  test("names the point it covers: each key an entry gives must match", () => {
    const [sveltekit, svelte, webkit] = SAMPLES
    expect(
      expectation(
        { app: "sveltekit", aspect: "radio-bound", check: "native" },
        [...SAMPLES],
      ),
    ).toBe(sveltekit)
    expect(
      expectation(
        { aspect: "radio-bound", check: "native", framework: "svelte" },
        [...SAMPLES],
      ),
    ).toBe(svelte)
    expect(
      expectation(
        { app: "vite-svelte", aspect: "radio-bound", check: "native" },
        [...SAMPLES],
      ),
    ).toBeUndefined()
    expect(
      expectation(
        { aspect: "text-bound", check: "native", framework: "svelte" },
        [...SAMPLES],
      ),
    ).toBeUndefined()
    expect(
      expectation(
        { check: "example-text", engine: "webkit", example: "checkbox" },
        [...SAMPLES],
      ),
    ).toBe(webkit)
    expect(
      expectation(
        { check: "example-text", engine: "chromium", example: "checkbox" },
        [...SAMPLES],
      ),
    ).toBeUndefined()
    expect(
      expectation(
        {
          check: "example-text",
          example: "checkbox",
          framework: "react",
        },
        [...SAMPLES],
      ),
    ).toBeUndefined()
  })

  test("lists the entries that can apply where a key is left open", () => {
    expect(
      expectations({ aspect: "radio-bound", check: "native" }, [...SAMPLES]),
    ).toEqual([SAMPLES[0], SAMPLES[1]])
    expect(
      expectations({ app: "vite-svelte", check: "native" }, [...SAMPLES]),
    ).toEqual([SAMPLES[1]])
    expect(expectations({ check: "parity" }, [...SAMPLES])).toEqual([])
  })

  test("gives a bug that shows in several places one reason", () => {
    const where = { aspect: "rating-bound", check: "native" } as const
    expect(expectation({ ...where, framework: "svelte" })?.reason).toBeDefined()
    expect(expectation({ ...where, framework: "svelte" })?.reason).toBe(
      expectation({ ...where, app: "sveltekit" })?.reason,
    )
  })
})

describe("the reasons", () => {
  test("are each used by an entry or a spec", () => {
    const sources = [
      ...sourcesIn("../apps/"),
      ...sourcesIn("../apps/native/"),
      ...sourcesIn("../e2e/"),
      ...sourcesIn("./"),
    ]
    expect(
      unusedReasons(sources, [...EXPECTED, ...DERIVED]),
      "a reason that no entry in tests/expectations.ts and no failsIn() or failingIn uses: remove it",
    ).toEqual([])
  })

  test("a sample the check must flag: a reason nothing uses", () => {
    expect(unusedReasons([], [])).toContain("WEBKIT_RADIO_NO_WRAP")
    expect(
      unusedReasons(
        ["failsIn(browserName, { webkit: WEBKIT_RADIO_NO_WRAP })"],
        [],
      ),
    ).not.toContain("WEBKIT_RADIO_NO_WRAP")
    expect(unusedReasons([], [...EXPECTED])).not.toContain("SVELTE_SPREAD")
  })
})

describe("the stale-entry check", () => {
  test("passes while the expected difference happens", () => {
    const expectRecorder = recorder()
    expectStill(expectRecorder, true, SAMPLES[1], {
      aspect: "radio-bound",
      check: "native",
      framework: "svelte",
    })
    expect(expectRecorder.failures).toEqual([])
  })

  test("a sample it must flag: an entry whose difference no longer happens", () => {
    const expectRecorder = recorder()
    expectStill(expectRecorder, false, SAMPLES[1], {
      aspect: "radio-bound",
      check: "native",
      framework: "svelte",
    })
    expect(expectRecorder.failures).toEqual([
      `native svelte radio-bound: WEBKIT_TOP_LAYER_ANCHOR no longer happens, so remove its entry from tests/expectations.ts (WEBKIT_TOP_LAYER_ANCHOR: ${WEBKIT_TOP_LAYER_ANCHOR})`,
    ])
  })

  test("names where a derived entry comes from", () => {
    const [late] = expectations({ check: "hydration-late" }, DERIVED)
    expect(late).toBeDefined()
    if (!late) return
    const expectRecorder = recorder()
    expectStill(expectRecorder, false, late, {
      aspect: "data-hydrating",
      check: "hydration-late",
      example: "callout/Dismissible",
      framework: "react",
    })
    expect(expectRecorder.failures).toEqual([
      expect.stringMatching(
        /^hydration-late react callout\/Dismissible data-hydrating: HYDRATING no longer happens, so remove its entry from hydratingRoots\(\) in scripts\/component-emit\.mjs \(HYDRATING: /,
      ),
    ])
  })
})

describe("the expectations derived from the compiler", () => {
  test("mark data-hydrating on every component whose compiled React file renders it", () => {
    const components = new URL(
      "../../packages/opui/components/",
      import.meta.url,
    )
    const rendering = readdirSync(components, { recursive: true })
      .map(String)
      .filter(
        (file) =>
          file.endsWith(".react.tsx") &&
          readFileSync(new URL(file, components), "utf8").includes(
            "data-hydrating=",
          ),
      )
      .map((file) => file.replace(/^.*\/|\.react\.tsx$/g, ""))
      .toSorted()
    expect(rendering.length).toBeGreaterThan(0)
    expect(
      expectations({ check: "contract-attribute" }, DERIVED).map(
        ({ component }) => component,
      ),
    ).toEqual(rendering)
  })

  test("list every example whose HTML renders a root that gets data-hydrating", () => {
    const [late] = expectations({ check: "hydration-late" }, DERIVED)
    expect(late?.on?.length).toBeGreaterThan(0)
    expect(late?.example).toContain("callout/Dismissible")
    expect(late?.example).not.toContain("callout/Variants")
  })

  test("expect data-hydrating in the parity of the examples and blocks that render it, but in Solid", () => {
    const [parity] = expectations({ check: "parity" }, DERIVED)
    expect(parity?.example).toContain("blocks/data-table/DataTable")
    expect(parity?.example).toContain("callout/Dismissible")
    expect(parity?.example).not.toContain("callout/Variants")
    expect(parity?.framework).not.toContain("solid")
  })
})
