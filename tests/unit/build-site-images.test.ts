import { existsSync, readFileSync } from "node:fs"
import { describe, expect, test } from "vitest"
import {
  FAVICON,
  icoFromPng,
  imageProblems,
  pngInIco,
  pngInfo,
  SHARE_IMAGE,
  TOUCH_ICON,
} from "../../scripts/build-site-images.mjs"

const png = ({
  bytes = 64,
  colorType = 2,
  height = 630,
  width = 1200,
} = {}) => {
  const buffer = Buffer.alloc(bytes)
  buffer.set([137, 80, 78, 71, 13, 10, 26, 10])
  buffer.writeUInt32BE(13, 8)
  buffer.write("IHDR", 12, "latin1")
  buffer.writeUInt32BE(width, 16)
  buffer.writeUInt32BE(height, 20)
  buffer[24] = 8
  buffer[25] = colorType
  return buffer
}

const publicPath = (file: string) => file.replace(/^public/, "")

describe("pngInfo", () => {
  test("reads the size and alpha channel from the header", () => {
    expect(pngInfo(png({ colorType: 6, height: 180, width: 180 }))).toEqual({
      alpha: true,
      height: 180,
      width: 180,
    })
  })

  test("returns nothing for a file that isn't a PNG", () => {
    expect(pngInfo(Buffer.from("GIF89a"))).toBeUndefined()
    expect(pngInfo(Buffer.alloc(64))).toBeUndefined()
  })
})

describe("imageProblems", () => {
  test("passes an opaque PNG of the right size within the budget", () => {
    expect(imageProblems(png(), SHARE_IMAGE)).toEqual([])
  })

  test.each([
    [
      "a different size",
      png({ height: 600 }),
      "public/share-img.png is 1200x600, not 1200x630",
    ],
    [
      "an alpha channel",
      png({ colorType: 6 }),
      "public/share-img.png has an alpha channel: apps fill transparent pixels with a color of their own, so render it on an opaque background",
    ],
    [
      "a file over the budget",
      png({ bytes: 301 * 1024 }),
      "public/share-img.png is 301 KB, over the 300 KB budget",
    ],
    [
      "a file that isn't a PNG",
      Buffer.from("<svg/>"),
      "public/share-img.png is not a PNG",
    ],
  ])("flags %s", (_, file, problem) => {
    expect(imageProblems(file, SHARE_IMAGE)).toEqual([problem])
  })
})

describe("icoFromPng", () => {
  test("wraps a PNG in a one-image icon that names its size", () => {
    const image = png({ height: 32, width: 32 })
    const ico = icoFromPng(image)
    expect([ico.readUInt16LE(2), ico.readUInt16LE(4), ico[6], ico[7]]).toEqual([
      1, 1, 32, 32,
    ])
    expect(pngInIco(ico)).toEqual(image)
  })

  test("pngInIco returns nothing for a file that isn't an icon", () => {
    expect(pngInIco(png())).toBeUndefined()
    expect(pngInIco(Buffer.alloc(8))).toBeUndefined()
  })
})

test.each([SHARE_IMAGE, TOUCH_ICON])("$file passes", (image) => {
  expect(imageProblems(readFileSync(image.file), image)).toEqual([])
})

test(`${FAVICON.file} holds a PNG that passes`, () => {
  const image = pngInIco(readFileSync(FAVICON.file))
  expect(image).toBeDefined()
  expect(imageProblems(image ?? Buffer.alloc(0), FAVICON)).toEqual([])
})

test("the share image page is a noindex test page", () => {
  const page = `src/pages${SHARE_IMAGE.route}[...index].astro`
  expect(existsSync(page)).toBe(true)
  const source = readFileSync(page, "utf-8")
  expect(source).toContain("if (!testPagesEnabled()) return []")
  expect(source).toContain('<meta name="robots" content="noindex" />')
})

test("the layout shares the image the script writes", () => {
  expect(readFileSync("src/layouts/Layout.astro", "utf-8")).toContain(
    `image || "${publicPath(SHARE_IMAGE.file)}"`,
  )
})

test("the site icons link the touch icon and the SVG it's rendered from", () => {
  const icons = readFileSync("src/components/SiteIcons.astro", "utf-8")
  expect(icons).toContain(
    `<link rel="apple-touch-icon" href="${publicPath(TOUCH_ICON.file)}" />`,
  )
  expect(icons).toContain(
    `<link rel="icon" href="${publicPath(TOUCH_ICON.source)}" type="image/svg+xml" />`,
  )
})
