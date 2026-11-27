import { existsSync, readdirSync, readFileSync } from "node:fs"
import path from "node:path"

const includes = path.join(import.meta.dirname, "../_includes")

const namesIn = (dir) =>
  readdirSync(dir)
    .filter((file) => file.endsWith(".njk"))
    .map((file) => file.slice(0, -".njk".length))
    .toSorted((a, b) => a.localeCompare(b))

const slugs = JSON.parse(
  readFileSync(path.join(includes, "examples/slugs.json"), "utf8"),
)

const blocksDir = path.join(includes, "blocks")

export default {
  blocks: existsSync(blocksDir) ? namesIn(blocksDir) : [],
  examples: slugs.map((slug) => ({
    names: namesIn(path.join(includes, "examples", slug)),
    slug,
  })),
  slugs,
}
