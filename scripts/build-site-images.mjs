import { readFileSync, realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const root = fileURLToPath(new URL("..", import.meta.url))

export const SHARE_IMAGE = {
  file: "public/share-img.png",
  height: 630,
  maxBytes: 300 * 1024,
  route: "/share-image/",
  width: 1200,
}

export const TOUCH_ICON = {
  file: "public/apple-touch-icon.png",
  height: 180,
  scale: 0.75,
  maxBytes: 20 * 1024,
  source: "public/favicon.svg",
  width: 180,
}

export const FAVICON = {
  file: "public/favicon.ico",
  height: 32,
  scale: 1,
  maxBytes: 4 * 1024,
  source: "public/favicon.svg",
  width: 32,
}

const PNG_SIGNATURE = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])
const ICO_HEADER_BYTES = 22

export const icoFromPng = (png) => {
  const { height, width } = pngInfo(png)
  const header = Buffer.alloc(ICO_HEADER_BYTES)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header[6] = width % 256
  header[7] = height % 256
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(png.length, 14)
  header.writeUInt32LE(ICO_HEADER_BYTES, 18)
  return Buffer.concat([header, png])
}

export const pngInIco = (ico) =>
  ico.length > ICO_HEADER_BYTES &&
  ico.readUInt16LE(0) === 0 &&
  ico.readUInt16LE(2) === 1 &&
  ico.readUInt16LE(4) === 1
    ? ico.subarray(
        ico.readUInt32LE(18),
        ico.readUInt32LE(18) + ico.readUInt32LE(14),
      )
    : undefined

export const pngInfo = (png) =>
  png.length >= 26 &&
  png.subarray(0, 8).equals(PNG_SIGNATURE) &&
  png.toString("latin1", 12, 16) === "IHDR"
    ? {
        alpha: [4, 6].includes(png[25]),
        height: png.readUInt32BE(20),
        width: png.readUInt32BE(16),
      }
    : undefined

export const imageProblems = (png, { file, height, maxBytes, width }) => {
  const info = pngInfo(png)
  if (!info) return [`${file} is not a PNG`]
  return [
    info.width !== width || info.height !== height
      ? `${file} is ${info.width}x${info.height}, not ${width}x${height}`
      : undefined,
    info.alpha
      ? `${file} has an alpha channel: apps fill transparent pixels with a color of their own, so render it on an opaque background`
      : undefined,
    png.length > maxBytes
      ? `${file} is ${Math.ceil(png.length / 1024)} KB, over the ${maxBytes / 1024} KB budget`
      : undefined,
  ].filter(Boolean)
}

const write = (png, image, encode = (bytes) => bytes) => {
  const problems = imageProblems(png, image)
  if (problems.length) throw new Error(problems.join("\n"))
  const bytes = encode(png)
  writeFileSync(join(root, image.file), bytes)
  console.log(`Wrote ${image.file} (${Math.ceil(bytes.length / 1024)} KB)`)
}

const shareImage = async (browser, origin) => {
  const page = await browser.newPage({
    colorScheme: "light",
    reducedMotion: "reduce",
    viewport: { height: SHARE_IMAGE.height, width: SHARE_IMAGE.width },
  })
  await page.goto(new URL(SHARE_IMAGE.route, origin).href, {
    timeout: 120_000,
    waitUntil: "networkidle",
  })
  await page.locator("html[data-ready]").waitFor({ state: "attached" })
  write(await page.screenshot(), SHARE_IMAGE)
}

const icon = async (browser, image) => {
  const page = await browser.newPage({
    colorScheme: "light",
    viewport: { height: image.height, width: image.width },
  })
  await page.setContent(
    `<body style="display: grid; margin: 0; min-block-size: 100vh; place-items: center">${readFileSync(join(root, image.source), "utf-8")}</body>`,
  )
  await page.evaluate((scale) => {
    const svg = document.querySelector("svg")
    svg.style.blockSize = svg.style.inlineSize = `${scale * 100}vmin`
    document.body.style.backgroundColor = getComputedStyle(
      svg.querySelector("rect"),
    ).fill
  }, image.scale)
  return page.screenshot()
}

const main = async () => {
  const { dev } = await import("astro")
  const { chromium } = await import("@playwright/test")
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  const server = await dev({ logLevel: "error", root })
  const browser = await chromium.launch(
    executablePath ? { executablePath } : {},
  )
  try {
    await shareImage(browser, `http://localhost:${server.address.port}`)
    write(await icon(browser, TOUCH_ICON), TOUCH_ICON)
    write(await icon(browser, FAVICON), FAVICON, icoFromPng)
  } finally {
    await browser.close()
    await server.stop()
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
