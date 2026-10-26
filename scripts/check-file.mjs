import { readFileSync, realpathSync } from "node:fs"
import { isAbsolute, matchesGlob, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { findProblems } from "./check-characters.mjs"
import { colorProblems } from "./check-colors.mjs"
import { sortSource } from "./sort-css.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))

const SORTED = [
  "packages/opui/**/*.{astro,css,html,svelte,vue}",
  "src/**/*.{astro,css,html,svelte,vue}",
]

const IGNORED = ["**/dist/**", "**/node_modules/**"]

export const fileProblems = async (file, text) => {
  if (text.includes("\0")) return []
  const characters = findProblems(
    text
      .split("\n")
      .map((line, index) => `${file}:${index + 1}:${line}`)
      .join("\n"),
  ).map((problem) => `${problem}. Use a comma, a slash or parentheses instead.`)
  const colors = colorProblems(file, text).map(
    (problem) => `${problem} is not OKLCH. Write it as oklch().`,
  )
  const sorted =
    SORTED.some((glob) => matchesGlob(file, glob)) &&
    !IGNORED.some((glob) => matchesGlob(file, glob)) &&
    (await sortSource(file, text)) !== text
      ? [`${file}: CSS declarations are out of order. Run pnpm sort-css.`]
      : []
  return [...characters, ...colors, ...sorted]
}

const main = async () => {
  const files = process.argv
    .slice(2)
    .map((file) => (isAbsolute(file) ? relative(root, file) : file))
  const problems = (
    await Promise.all(
      files.map((file) =>
        fileProblems(file, readFileSync(`${root}${file}`, "utf-8")),
      ),
    )
  ).flat()
  if (problems.length > 0) {
    console.error(problems.join("\n"))
    process.exit(1)
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
