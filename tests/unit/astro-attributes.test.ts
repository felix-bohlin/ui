import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import { astroAttributeProblems } from "../../scripts/astro-attributes.mjs"

const problemsIn = async (text: string) =>
  (await astroAttributeProblems("a.astro", text)).map(
    (problem) => problem.split(" has ")[0],
  )

describe("astroAttributeProblems", () => {
  test("a sample it must flag: references in quoted and unquoted values", async () => {
    expect(
      await problemsIn(
        '---\nconst a = "é"\n---\n\n<p>é</p>\n<a data-x=p&amp;q href="?a=1&amp;copy=2" title=\'a &quot;b&quot;\'>a</a>\n<Card label="&lt;b&gt;" />\n',
      ),
    ).toEqual([
      'a.astro:6: data-x="p&amp;q"',
      'a.astro:6: href="?a=1&amp;copy=2"',
      'a.astro:6: title="a &quot;b&quot;"',
      'a.astro:7: label="&lt;b&gt;"',
    ])
  })

  test("leaves values without references and expressions alone", async () => {
    expect(
      await problemsIn(
        '<a alt={"a &amp; b"} href="?a=1&b=2" style="\n  color: red;\n">a &amp; b</a>\n',
      ),
    ).toEqual([])
  })

  test("no Astro file in the repo has one", async () => {
    const files = execFileSync("git", ["ls-files", "*.astro"], {
      encoding: "utf8",
    })
      .trim()
      .split("\n")
    expect(files.length).toBeGreaterThan(500)
    const problems = await Promise.all(
      files.map((file) =>
        astroAttributeProblems(file, readFileSync(file, "utf8")),
      ),
    )
    expect(problems.flat()).toEqual([])
  }, 60_000)
})
