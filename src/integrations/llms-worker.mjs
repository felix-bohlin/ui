// @ts-check
import fs from "node:fs"
import { parentPort, workerData } from "node:worker_threads"

import { parseHtml } from "./html-to-markdown.mjs"
import { hrefRewriter, pageFrom } from "./llms.mjs"

/** @type {{ site: string | undefined }} */
const { site } = workerData

parentPort?.on(
  "message",
  /** @param {{ file: string, frameworkId: string, index: number, pathname: string }} task */
  async ({ file, frameworkId, index, pathname }) => {
    const page = await pageFrom(
      parseHtml(fs.readFileSync(file, "utf-8")),
      pathname,
      hrefRewriter(frameworkId, site),
    )
    parentPort?.postMessage({ index, page })
  },
)
