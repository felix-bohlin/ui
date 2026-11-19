import { readdirSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { expect, test } from "vitest"

const EMPTY_SVG =
  /svg[^{};]*:empty\s*\{[^{}]*?mask:\s*var\((--ui-icon-[a-z-]+)\)/g
const DEFAULT_ICON = /<DefaultIcon\b[^>]*>/g
const TOKEN = /--ui-icon-[a-z-]+/g

const sources = (dir: string, extension: string) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(extension))
    .map((file) => readFileSync(join(dir, file), "utf8"))

export const shown = (css: string[]) =>
  [
    ...new Set(
      css.flatMap((sheet) =>
        [...sheet.matchAll(EMPTY_SVG)].map(([, token]) => token),
      ),
    ),
  ].toSorted()

export const documented = (pages: string[]) =>
  [
    ...new Set(
      pages.flatMap((page) =>
        (page.match(DEFAULT_ICON) ?? []).flatMap(
          (tag) => tag.match(TOKEN) ?? [],
        ),
      ),
    ),
  ].toSorted()

test("the component pages name every icon token that an empty svg shows, and no other", () => {
  expect(
    documented(sources("src/docs/components", ".astro")),
    "add <DefaultIcon tokens={[...]} /> to the page of a component whose stylesheet masks an empty svg with an icon token, and drop a token no stylesheet shows that way",
  ).toEqual(shown(sources("packages/opui/css/components", ".css")))
})

test("reads the tokens of empty svg rules and of DefaultIcon tags, and nothing else", () => {
  expect(
    shown([
      `.ui-header {
        & > .ui-button > svg:empty {
          background-color: currentColor;
          mask: var(--ui-icon-close) center / contain no-repeat;
        }
        & > svg:empty {
          mask: var(--_icon-image) center / contain no-repeat;
        }
        &::after {
          mask: var(--ui-icon-expand) center / contain no-repeat;
        }
      }`,
    ]),
  ).toEqual(["--ui-icon-close"])
  expect(
    documented([
      `<p>Set <code>--ui-icon-check</code>.</p>
      <DefaultIcon
        slots={["decrease-icon", "increase-icon"]}
        tokens={["--ui-icon-decrease", "--ui-icon-increase"]}
      />`,
    ]),
  ).toEqual(["--ui-icon-decrease", "--ui-icon-increase"])
})
