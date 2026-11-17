import { describe, expect, test } from "vitest"
import { markdown, summarize } from "../../scripts/e2e-summary.mjs"

const result = (status: string, duration: number, message?: string) => ({
  duration,
  status,
  ...(message ? { error: { message } } : {}),
})

const spec = (
  title: string,
  status: string,
  timeout: number,
  results: ReturnType<typeof result>[],
) => ({
  file: "docs.spec.ts",
  line: 1,
  tests: [{ projectName: "webkit", results, status, timeout }],
  title,
})

const report = {
  suites: [
    {
      file: "docs.spec.ts",
      specs: [
        spec("fast", "expected", 30_000, [result("passed", 2_000)]),
        spec("flaky", "flaky", 30_000, [
          result(
            "failed",
            6_000,
            "\u001b[31mError: expect(locator)\u001b[39m\nmore",
          ),
          result("passed", 3_000),
        ]),
        spec("skipped", "skipped", 30_000, []),
        spec("timed out", "unexpected", 60_000, [result("timedOut", 60_000)]),
      ],
      suites: [
        {
          file: "docs.spec.ts",
          specs: [
            spec("near | its limit", "expected", 60_000, [
              result("passed", 45_000),
            ]),
          ],
          title: "API page",
        },
      ],
      title: "docs.spec.ts",
    },
  ],
}

describe("e2e summary", () => {
  const summary = summarize(report)

  test("flags a test that passed only on a retry, with its first error", () => {
    expect(
      summary.flaky.map(({ attempts, error, title }) => ({
        attempts,
        error,
        title,
      })),
    ).toEqual([
      {
        attempts: ["failed", "passed"],
        error: "Error: expect(locator)",
        title: "flaky",
      },
    ])
  })

  test("flags the tests whose longest attempt used 70% of their own time limit or more", () => {
    expect(
      summary.slow.map(({ share, title }) => [title, Math.round(share * 100)]),
    ).toEqual([
      ["API page › near | its limit", 75],
      ["timed out", 100],
    ])
    expect(
      summarize(report, { share: 0.8 }).slow.map(({ title }) => title),
    ).toEqual(["timed out"])
  })

  test("writes a table per kind and escapes pipes in titles", () => {
    const text = markdown(summary, "e2e engines (webkit)")
    expect(text).toContain("## e2e engines (webkit)")
    expect(text).toContain("### 1 flaky, passed only on a retry")
    expect(text).toContain(
      "| docs.spec.ts:1 › flaky | webkit | failed, passed | Error: expect(locator) |",
    )
    expect(text).toContain("### 2 used 70% or more of the time limit")
    expect(text).toContain(
      "| docs.spec.ts:1 › API page › near \\| its limit | webkit | 45s | 60s | 75% |",
    )
  })

  test("says so when nothing is flaky or slow, and when there are no results", () => {
    expect(
      markdown(
        summarize({
          suites: [
            {
              file: "docs.spec.ts",
              specs: [
                spec("fast", "expected", 30_000, [result("passed", 1_000)]),
              ],
              title: "docs.spec.ts",
            },
          ],
        }),
      ),
    ).toContain(
      "No flaky test, and no test used 70% of its time limit, in 1 tests.",
    )
    expect(markdown(summarize({ suites: [] }))).toContain("No test results.")
  })
})
