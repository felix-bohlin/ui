import { globSync, readFileSync } from "node:fs"
import { parseHtml } from "../../scripts/html-tokens.mjs"
import { describe, expect, test } from "vitest"
import {
  buildIconSet,
  cleanSvg,
  copyrightOf,
  ICON_SETS,
  rawSvg,
} from "../../scripts/build-icons.mjs"
import {
  ICON_LIBRARIES,
  ICON_ROLES,
  iconUrl,
  SAMPLE_ICONS,
} from "../../src/utils/icon-libraries"

const library = {
  frameworks: {},
  icons: Object.fromEntries(ICON_ROLES.map((role) => [role, `${role}.svg`])),
  license: "MIT",
  name: "Sample",
  package: "sample-icons",
  samples: Object.fromEntries(
    SAMPLE_ICONS.map((name) => [name, `samples/${name}.svg`]),
  ),
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
  ...Object.fromEntries(
    SAMPLE_ICONS.map((name) => [
      `samples/${name}.svg`,
      `<svg width="24" class="icon" viewBox="0 0 24 24">\n  <path d="M0 0h24" />\n</svg>`,
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

  test("sets the root attributes a library entry overrides", () => {
    expect(
      cleanSvg(
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M0 0"/></svg>',
        "star.svg",
        { fill: "currentColor" },
      ),
    ).toBe(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"><path d="M0 0"/></svg>',
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

describe("rawSvg", () => {
  test("keeps every root attribute and drops comments and line breaks", () => {
    expect(
      rawSvg(`<!-- @license sample -->
<svg
  width="24"
  class="icon"
  viewBox="0 0 24 24"
>
  <path d="M5 12l5 5" />
</svg>`),
    ).toBe(
      '<svg width="24" class="icon" viewBox="0 0 24 24"><path d="M5 12l5 5"/></svg>',
    )
  })

  test("refuses an SVG without a viewBox", () => {
    expect(() => rawSvg('<svg width="24"></svg>', "x.svg")).toThrow(
      "x.svg has no viewBox",
    )
  })
})

describe("copyrightOf", () => {
  test("finds the copyright line of a licence", () => {
    expect(copyrightOf(files.LICENSE)).toBe("Copyright (c) 2026 Sample")
  })

  test("skips licence prose and the Apache template line", () => {
    expect(
      copyrightOf(
        "copyright notice that is included in or attached to the work\n   Copyright [yyyy] [name of copyright owner]\n",
      ),
    ).toBeUndefined()
  })

  test("finds none without a licence", () => {
    expect(copyrightOf(undefined)).toBeUndefined()
  })
})

describe("buildIconSet", () => {
  test("reads every role, the version and the copyright", () => {
    const set = buildIconSet("sample", library, readerOf(files))
    expect(Object.keys(set.icons)).toEqual([...ICON_ROLES])
    expect(Object.keys(set.samples)).toEqual([...SAMPLE_ICONS])
    expect(set.samples.add).toBe(
      '<svg width="24" class="icon" viewBox="0 0 24 24"><path d="M0 0h24"/></svg>',
    )
    expect(set.version).toBe("1.2.3")
    expect(set.copyright).toBe("Copyright (c) 2026 Sample")
  })

  test("names the library and the icon when a file is missing", () => {
    const { "warning.svg": _, ...rest } = files
    expect(() => buildIconSet("sample", library, readerOf(rest))).toThrow(
      "sample: the warning icon, warning.svg, is not in sample-icons",
    )
  })

  test("reads a role with its attribute overrides", () => {
    const set = buildIconSet(
      "sample",
      {
        ...library,
        icons: {
          ...library.icons,
          rating: { attributes: { fill: "currentColor" }, file: "rating.svg" },
        },
      },
      readerOf(files),
    )
    expect(set.icons.rating).toContain('fill="currentColor"')
  })

  test("names the samples a library leaves out", () => {
    const { mail: _, ...samples } = library.samples
    expect(() =>
      buildIconSet(
        "sample",
        { ...library, samples: samples as typeof library.samples },
        readerOf(files),
      ),
    ).toThrow("sample: no icon for mail")
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

  test("holds every sample icon of every library as an svg with a viewBox", () => {
    for (const [id, set] of Object.entries(sets) as [
      string,
      { samples: Record<string, string> },
    ][]) {
      expect(Object.keys(set.samples), id).toEqual([...SAMPLE_ICONS])
      for (const [name, svg] of Object.entries(set.samples)) {
        expect(svg, `${id} ${name}`).toMatch(/^<svg [^>]*viewBox="[-\d. ]+"/)
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

const drawnShapes = (source: string) =>
  [...source.matchAll(/<svg\b[^>]*>([\s\S]*?)<\/svg>/g)]
    .map(([, inner]) => inner.trim())
    .filter((inner) => inner !== "")

describe("default icons", () => {
  test("every svg a component renders is empty, for its stylesheet to paint from an icon token", () => {
    const files = globSync("packages/opui/components/*/*.astro").toSorted()
    expect(files.length).toBeGreaterThan(0)
    expect(
      Object.fromEntries(
        files
          .map((file) => [file, drawnShapes(readFileSync(file, "utf8"))])
          .filter(([, shapes]) => shapes.length > 0),
      ),
      "render an empty svg with its size attributes and paint it with a mask of the --ui-icon-* token in the component's stylesheet",
    ).toEqual({})
  })

  test("the reader flags an svg with shapes", () => {
    expect(
      drawnShapes('<svg viewBox="0 0 1 1"><path d="M0 0" /></svg>'),
    ).toEqual(['<path d="M0 0" />'])
    expect(drawnShapes('<svg viewBox="0 0 1 1"></svg>')).toEqual([])
  })
})

type HtmlNode = {
  attrs: { name: string; value: string }[]
  children: HtmlNode[]
  tag: string
  type: string
}

const unnamedIcons = (source: string) => {
  const found: string[] = []
  const walk = (nodes: HtmlNode[]) => {
    for (const node of nodes) {
      if (node.type !== "element") continue
      if (node.tag !== "svg") {
        walk(node.children)
        continue
      }
      const attributes = Object.fromEntries(
        node.attrs.map(({ name, value }) => [name, value]),
      )
      if (attributes.role === "img") continue
      const name = attributes["data-icon"]
      if (!name || !(SAMPLE_ICONS as readonly string[]).includes(name)) {
        found.push(name ?? "(no data-icon)")
      }
    }
  }
  walk(parseHtml(source))
  return found
}

describe("stress pages", () => {
  test("every icon names its sample in data-icon, so ?icons= can swap it", () => {
    const pages = globSync("src/stress-tests/*.html").toSorted()
    expect(pages.length).toBeGreaterThan(0)
    expect(
      Object.fromEntries(
        pages
          .map((page) => [page, unnamedIcons(readFileSync(page, "utf8"))])
          .filter(([, names]) => names.length > 0),
      ),
      'give each icon svg a data-icon from SAMPLE_ICONS (src/utils/icon-libraries.ts), or role="img" when it is an image',
    ).toEqual({})
  })

  test("the reader flags an icon without a known name", () => {
    expect(
      unnamedIcons(
        '<p><svg viewBox="0 0 1 1"></svg><svg data-icon="spinner"></svg><svg data-icon="mail"></svg><svg role="img"></svg></p>',
      ),
    ).toEqual(["(no data-icon)", "spinner"])
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
