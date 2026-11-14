import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { extname, join } from "node:path"
import { expect, test } from "@playwright/test"
import { probeFigmaTokens } from "../../src/utils/figma-probe"
import {
  figmaProbeRequest,
  figmaTokenMeta,
  type TokensJson,
} from "../../src/utils/figma-tokens"

const ORIGIN = "https://figma.opui.test"
const PACKAGE = new URL("../../packages/opui/", import.meta.url).pathname
const RECORDED = new URL("../../src/figma/", import.meta.url).pathname
const RECORD = !!process.env.FIGMA_RECORD
const TYPES: Record<string, string> = {
  ".css": "text/css",
  ".html": "text/html",
  ".js": "text/javascript",
}

const themes = [
  "default",
  ...readdirSync(join(PACKAGE, "themes"))
    .filter((file) => file.endsWith(".css"))
    .map((file) => file.replace(/\.css$/, ""))
    .toSorted(),
]

const request = figmaProbeRequest(
  figmaTokenMeta(
    JSON.parse(
      readFileSync(join(PACKAGE, "tokens.json"), "utf8"),
    ) as TokensJson,
  ),
)

test.use({ colorScheme: "light", viewport: { height: 900, width: 1440 } })

for (const theme of themes) {
  test(`the ${theme} theme resolves for Figma as recorded`, async ({
    browserName,
    page,
  }) => {
    test.skip(
      browserName !== "chromium",
      "The recorded values come from Chromium.",
    )
    await page.route("**/*", (route) => {
      const url = new URL(route.request().url())
      if (url.origin !== ORIGIN) return route.abort()
      if (url.pathname === "/") {
        return route.fulfill({
          body: `<!doctype html><html lang="en"><head><link rel="stylesheet" href="/css/imports.css">${
            theme === "default"
              ? ""
              : `<link rel="stylesheet" href="/themes/${theme}.css">`
          }</head><body></body></html>`,
          contentType: "text/html",
        })
      }
      return route.fulfill({
        body: readFileSync(join(PACKAGE, url.pathname)),
        contentType: TYPES[extname(url.pathname)] ?? "text/plain",
      })
    })
    await page.goto(`${ORIGIN}/`)
    const probe = await page.evaluate(probeFigmaTokens, request)
    const file = join(RECORDED, `${theme}.json`)
    if (RECORD) {
      mkdirSync(RECORDED, { recursive: true })
      writeFileSync(file, `${JSON.stringify(probe, null, 2)}\n`)
      return
    }
    expect(
      probe,
      "The theme resolves differently: run pnpm test:e2e:record-figma and commit src/figma.",
    ).toEqual(JSON.parse(readFileSync(file, "utf8")))
  })
}
