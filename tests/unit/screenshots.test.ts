import { readdirSync, readFileSync } from "node:fs"
import { expect, test } from "vitest"
import { exampleSources, parseExamplePath } from "../../src/utils/examples"
import { BLOCK_WIDTHS, THEMED_BLOCKS } from "../e2e/screenshot-targets"

const files = (path: string, extension: string) =>
  readdirSync(new URL(path, import.meta.url))
    .filter((file) => file.endsWith(extension))
    .map((file) => file.slice(0, -extension.length))
    .toSorted()

const html = Object.keys(exampleSources)
  .map(parseExamplePath)
  .filter((example) => example.framework === "html")

const components = html
  .filter(
    ({ name, slug }) =>
      !(
        name.endsWith("Code") &&
        html.some(
          (other) => other.slug === slug && other.name === name.slice(0, -4),
        )
      ),
  )
  .map(({ name, slug }) => `${slug}-${name}`)

const stress = files("../../src/stress-tests/", ".html").flatMap((page) =>
  [
    ...readFileSync(
      new URL(`../../src/stress-tests/${page}.html`, import.meta.url),
      "utf-8",
    ).matchAll(/<section class="stress" data-example="([^"]+)"/g),
  ].map(([, name]) => `stress-${page}-${name}`),
)

const blocks = files("../../src/blocks/", ".html").flatMap((block) =>
  BLOCK_WIDTHS.map((width) => `blocks-${block}-${width}`),
)

const themes = files("../../packages/opui/themes/", ".css").flatMap((theme) =>
  [...THEMED_BLOCKS.map((block) => block.replace("/", "-")), ...stress].map(
    (name) => `themes-${theme}-${name}`,
  ),
)

const expected = new Set([...components, ...stress, ...blocks, ...themes])

for (const scheme of ["dark", "light"]) {
  test(`every ${scheme} baseline belongs to an example`, () => {
    const baselines = files(`../e2e/__screenshots__/${scheme}/`, ".png")
    expect(baselines.length).toBeGreaterThan(0)
    expect(
      baselines.filter((name) => !expected.has(name)),
      "baselines without an example, delete them",
    ).toEqual([])
  })
}
