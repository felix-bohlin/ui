import { readFileSync, realpathSync } from "node:fs"
import { isAbsolute, matchesGlob, relative } from "node:path"
import { fileURLToPath } from "node:url"
import { FIX as CHARACTERS, findProblems } from "./check-characters.mjs"
import { FIX as COLORS, colorProblems } from "./check-colors.mjs"
import { IGNORED, SORTED, sortSource } from "./sort-css.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))

export const fileProblems = async (file, text) => {
  if (text.includes("\0")) return []
  const characters = findProblems(
    text
      .split("\n")
      .map((line, index) => `${file}:${index + 1}:${line}`)
      .join("\n"),
  ).map((problem) => `${problem}. ${CHARACTERS}`)
  const colors = colorProblems(file, text).map(
    (problem) => `${problem} is not OKLCH. ${COLORS}`,
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
