import { readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  buildIconSet,
  cleanSvg,
  copyrightOf,
  ICON_SETS,
} from "../../scripts/build-icons.mjs"
import {
  ICON_LIBRARIES,
  ICON_ROLES,
  iconUrl,
} from "../../src/utils/icon-libraries"

const library = {
  frameworks: {},
  icons: Object.fromEntries(ICON_ROLES.map((role) => [role, `${role}.svg`])),
  license: "MIT",
  name: "Sample",
  package: "sample-icons",
  url: "https://example.com",
}

const files: Record<string, string> = {
  LICENSE: "MIT License\n\nCopyright (c) 2026 Sample\n",
  "package.json": JSON.stringify({ version: "1.2.3" }),
  ...Object.fromEntries(
    ICON_ROLES.map((role) => [
      `${role}.svg`,
      `<svg width="24" viewBox="0 0 24 24"><path d="M0 0h24"/></svg>`,
    ]),
  ),
}

const readerOf =
  (entries: Record<string, string>) =>
  (file: string): string | undefined =>
    entries[file]

describe("cleanSvg", () => {
  test("keeps the viewBox and paint, and drops the size and class", () => {
    expect(
      cleanSvg(
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="lucide"><path d="M20 6 9 17l-5-5" /></svg>',
      ),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>',
    )
  })

  test("drops comments, line breaks and shapes that paint nothing", () => {
    expect(
      cleanSvg(`<!-- @license sample -->
<svg
  viewBox="0 0 24 24"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path d="M5 12l5 5" />
</svg>`),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5 12l5 5"/></svg>',
    )
  })

  test("refuses an SVG without a viewBox", () => {
    expect(() =>
      cleanSvg('<svg width="24"><path d="M0 0"/></svg>', "x.svg"),
    ).toThrow("x.svg has no viewBox")
  })

  test("refuses anything but one svg element", () => {
    expect(() => cleanSvg("<g></g>", "x.svg")).toThrow(
      "x.svg is not a single <svg> element",
    )
  })
})

describe("copyrightOf", () => {
  test("finds the copyright line of a licence", () => {
    expect(copyrightOf(files.LICENSE)).toBe("Copyright (c) 2026 Sample")
  })

  test("finds none without a licence", () => {
    expect(copyrightOf(undefined)).toBeUndefined()
  })
})

describe("buildIconSet", () => {
  test("reads every role, the version and the copyright", () => {
    const set = buildIconSet("sample", library, readerOf(files))
    expect(Object.keys(set.icons)).toEqual([...ICON_ROLES])
    expect(set.version).toBe("1.2.3")
    expect(set.copyright).toBe("Copyright (c) 2026 Sample")
  })

  test("names the library and the icon when a file is missing", () => {
    const { "warning.svg": _, ...rest } = files
    expect(() => buildIconSet("sample", library, readerOf(rest))).toThrow(
      "sample: the warning icon, warning.svg, is not in sample-icons",
    )
  })

  test("names the roles a library leaves out", () => {
    const { warning: _, ...icons } = library.icons
    expect(() =>
      buildIconSet(
        "sample",
        { ...library, icons: icons as typeof library.icons },
        readerOf(files),
      ),
    ).toThrow("sample: no icon for warning")
  })

  test("refuses a role that doesn't exist", () => {
    expect(() =>
      buildIconSet(
        "sample",
        { ...library, icons: { ...library.icons, spinner: "x.svg" } },
        readerOf(files),
      ),
    ).toThrow("sample: spinner is not an icon role")
  })

  test("takes the copyright from the library when the package has no licence", () => {
    const { LICENSE: _, ...rest } = files
    expect(() => buildIconSet("sample", library, readerOf(rest))).toThrow(
      "sample: sample-icons has no LICENSE with a copyright line",
    )
    expect(
      buildIconSet(
        "sample",
        { ...library, copyright: "Copyright (c) 2020 Sample" },
        readerOf(rest),
      ).copyright,
    ).toBe("Copyright (c) 2020 Sample")
  })
})

describe("icon-sets.json", () => {
  const sets = JSON.parse(readFileSync(ICON_SETS, "utf8"))

  test("has every library of ICON_LIBRARIES, in ascending order", () => {
    expect(Object.keys(sets)).toEqual(Object.keys(ICON_LIBRARIES).toSorted())
  })

  test("holds one svg with a viewBox and no size per icon", () => {
    for (const [id, set] of Object.entries(sets) as [
      string,
      { icons: Record<string, string> },
    ][]) {
      for (const [role, svg] of Object.entries(set.icons)) {
        expect(svg, `${id} ${role}`).toMatch(
          /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="[-\d. ]+"[^>]*>.*<\/svg>$/,
        )
        expect(svg, `${id} ${role}`).not.toMatch(/<svg[^>]* (width|height)=/)
      }
    }
  })
})

describe("theme.css", () => {
  const theme = readFileSync("packages/opui/css/theme.css", "utf8")
  const sets = JSON.parse(readFileSync(ICON_SETS, "utf8"))

  test("sets every icon token to the Fluent icon of icon-sets.json", () => {
    const declared = Object.fromEntries(
      [...theme.matchAll(/(--ui-icon-[a-z-]+): (url\("[^"]+"\));/g)].map(
        ([, name, value]) => [name, value],
      ),
    )
    expect(declared).toEqual(
      Object.fromEntries(
        ICON_ROLES.map((role) => [
          `--ui-icon-${role}`,
          iconUrl(sets.fluent.icons[role]),
        ]),
      ),
    )
  })
})

describe("THIRD-PARTY-NOTICES", () => {
  const notices = readFileSync("packages/opui/THIRD-PARTY-NOTICES", "utf8")
  const { fluent } = JSON.parse(readFileSync(ICON_SETS, "utf8"))

  test("carries the licence of the icons theme.css ships", () => {
    expect(notices).toContain(fluent.copyright)
    expect(notices).toContain(fluent.package)
    expect(notices).toContain(fluent.url)
    expect(notices).toContain(`${fluent.license} License`)
  })
})

describe("iconUrl", () => {
  test("encodes the characters a CSS url can't hold", () => {
    expect(
      iconUrl('<svg viewBox="0 0 1 1"><path d="M0 0" fill="#000"/></svg>'),
    ).toBe(
      `url("data:image/svg+xml,%3Csvg viewBox='0 0 1 1'%3E%3Cpath d='M0 0' fill='%23000'/%3E%3C/svg%3E")`,
    )
  })
})
