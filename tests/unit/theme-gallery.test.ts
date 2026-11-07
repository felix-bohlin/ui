import { describe, expect, test } from "vitest"
import { normalizeTheme } from "../../src/utils/theme"
import { GALLERY, galleryUrl } from "../../src/utils/theme-gallery"
import { decodeTheme, SHARE_PARAM } from "../../src/utils/theme-share"

describe("GALLERY", () => {
  test("is sorted by name with unique ids and safe themes", () => {
    const names = GALLERY.map((entry) => entry.name)
    expect(names).toEqual([...names].toSorted())
    expect(new Set(GALLERY.map((entry) => entry.id)).size).toBe(GALLERY.length)
    for (const entry of GALLERY) {
      expect(normalizeTheme(entry.theme), entry.id).toEqual(entry.theme)
      expect(Object.keys(entry.theme.tokens).length, entry.id).toBeGreaterThan(
        0,
      )
    }
  })

  test("every entry round trips through its share link", () => {
    for (const entry of GALLERY) {
      const url = new URL(galleryUrl(entry, "https://example.test"))
      expect(url.pathname).toBe("/theme-builder/")
      expect(decodeTheme(url.searchParams.get(SHARE_PARAM))).toEqual(
        entry.theme,
      )
    }
  })
})
