import { readdirSync, readFileSync } from "node:fs"
import ts from "typescript"
import { describe, expect, test } from "vitest"
import config from "../../playwright.config"

const E2E = "tests/e2e"

const OFFLINE = { bypass: "localhost,127.0.0.1", server: "http://127.0.0.1:9" }

type ProxyConfig = {
  projects?: { name?: string; use?: { proxy?: unknown } }[]
  use?: { proxy?: unknown }
}

const offlineProblems = ({ projects = [], use }: ProxyConfig) =>
  projects
    .filter(
      (project) =>
        JSON.stringify(project.use?.proxy ?? use?.proxy) !==
        JSON.stringify(OFFLINE),
    )
    .map(
      ({ name }) =>
        `the ${name} project of playwright.config.ts can reach hosts other than localhost. Set use.proxy to ${JSON.stringify(OFFLINE)}, which refuses them, so a test that reaches the network fails locally as it does in CI, where its made-up hosts don't resolve. Route what a test loads with page.route(), and download from a data: URL, since WebKit and Chromium download outside the routes.`,
    )

const callsOf = (name: string, source: string) => {
  const file = ts.createSourceFile(name, source, ts.ScriptTarget.Latest)
  const calls: ts.CallExpression[] = []
  const visit = (node: ts.Node) => {
    if (ts.isCallExpression(node)) calls.push(node)
    ts.forEachChild(node, visit)
  }
  visit(file)
  return calls.map((call) => ({
    name: ts.isPropertyAccessExpression(call.expression)
      ? call.expression.name.text
      : call.expression.getText(file),
    url: call.arguments[0],
  }))
}

const blank = (url?: ts.Expression) =>
  url !== undefined &&
  (ts.isStringLiteral(url) || ts.isNoSubstitutionTemplateLiteral(url)) &&
  url.text === "about:blank"

const scrollingProblem = (name: string, source: string) => {
  const calls = callsOf(name, source)
  const opens = calls.some((call) => call.name === "goto" && !blank(call.url))
  if (!opens || calls.some((call) => call.name === "instantScrolling")) {
    return null
  }
  return `${name} opens a page with goto() and never calls instantScrolling() from tests/e2e/fixtures.ts. The site scrolls smoothly, and WebKit animates the scroll that brings an element into view before a click, so the click lands mid-scroll on whatever passes under the pointer. Call instantScrolling(page) before the first goto(), or open the page with openFixture(), which calls it.`
}

describe("e2e specs", () => {
  test("open their pages without smooth scrolling", () => {
    const files = readdirSync(E2E).filter((file) => file.endsWith(".ts"))
    expect(files.length).toBeGreaterThan(0)
    const problems = files
      .map((file) =>
        scrollingProblem(
          `${E2E}/${file}`,
          readFileSync(`${E2E}/${file}`, "utf8"),
        ),
      )
      .filter(Boolean)
    expect(problems).toEqual([])
  })

  test("the scrolling rule flags a page opened without instantScrolling()", () => {
    const opened = `test("opens", async ({ page }) => {
      await page.goto("/theme-builder/")
    })`
    expect(scrollingProblem("sample.spec.ts", opened)).toContain(
      "sample.spec.ts opens a page with goto()",
    )
    expect(
      scrollingProblem(
        "sample.spec.ts",
        `const open = async (page) => {
          await instantScrolling(page)
          await page.goto("/theme-builder/")
        }`,
      ),
    ).toBeNull()
    expect(
      scrollingProblem(
        "sample.spec.ts",
        `test("ink", async ({ page }) => {
          await page.goto("about:blank")
        })`,
      ),
    ).toBeNull()
    expect(
      scrollingProblem(
        "sample.spec.ts",
        `// await instantScrolling(page)
        ${opened}`,
      ),
    ).toContain("never calls instantScrolling()")
    expect(
      scrollingProblem(
        "sample.spec.ts",
        `const note = "page.goto() needs instantScrolling()"`,
      ),
    ).toBeNull()
  })

  test("run every browser offline but for localhost", () => {
    expect(config.projects?.length).toBeGreaterThan(0)
    expect(offlineProblems(config)).toEqual([])
  })

  test("the offline rule flags a project that can reach the network", () => {
    expect(
      offlineProblems({
        projects: [{ name: "webkit", use: { proxy: undefined } }],
      }),
    ).toEqual([expect.stringContaining("the webkit project")])
    expect(
      offlineProblems({
        projects: [{ name: "light" }],
        use: { proxy: OFFLINE },
      }),
    ).toEqual([])
  })
})
