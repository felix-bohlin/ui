import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import {
  exampleExtension,
  extensionPattern,
  FRAMEWORK_IDS,
} from "../src/utils/framework.js"

const handWrittenFile = fileURLToPath(
  new URL("hand-written-examples.json", import.meta.url),
)

export const TARGETS = Object.fromEntries(
  FRAMEWORK_IDS.filter((id) => id !== "astro").map((id) => [
    id,
    `.${exampleExtension(id)}`,
  ]),
)

const TARGET_EXTENSION = new RegExp(
  `\\.(${extensionPattern(FRAMEWORK_IDS.filter((id) => id !== "astro"))})$`,
)

export const EXAMPLES_DIR = "src/component-examples"

export const BLOCKS_DIR = "src/blocks"

export const SOURCE_DIRS = [BLOCKS_DIR, EXAMPLES_DIR]

export const byAttributeName = (a, b) => a.localeCompare(b, "en")

export const readHandWritten = () =>
  JSON.parse(readFileSync(handWrittenFile, "utf8"))

/** @returns {(keyof typeof TARGETS)[]} */
export const generatedTargets = (key, handWritten) =>
  Object.keys(TARGETS).filter(
    (framework) => !(`${key}${TARGETS[framework]}` in handWritten),
  )

export const handWrittenProblems = (handWritten, exists) => {
  const files = Object.keys(handWritten)
  const list = "scripts/hand-written-examples.json"
  return [
    ...(files.every((file, index) => !index || files[index - 1] <= file)
      ? []
      : [`${list} is not sorted`]),
    ...files.flatMap((file) => {
      const astro = file.replace(TARGET_EXTENSION, ".astro")
      return [
        ...(exists(`src/component-examples/${file}`)
          ? []
          : [`${list} names ${file}, which doesn't exist`]),
        ...(exists(`src/component-examples/${astro}`)
          ? []
          : [`${list} names ${file}, which has no ${astro}`]),
      ]
    }),
  ]
}

const GENERATED_FILE = new RegExp(
  `^(${SOURCE_DIRS.join("|")})/(.+?)(${Object.values(TARGETS)
    .map((extension) => extension.replace(/\./g, "\\."))
    .join("|")})$`,
)

export const astroSourceOf = (file, read) => {
  const [, dir, key, extension] = GENERATED_FILE.exec(file) ?? []
  if (!key || read(`${dir}/${key}.astro`) === undefined) {
    return undefined
  }
  const generated = generatedTargets(
    key,
    dir === EXAMPLES_DIR ? readHandWritten() : {},
  ).some((framework) => TARGETS[framework] === extension)
  return generated ? `${dir}/${key}.astro` : undefined
}

export const staleProblems = (outputs, read) =>
  [...outputs]
    .filter(([file, code]) => read(file) !== code)
    .map(([file]) => {
      const astro = file.replace(GENERATED_FILE, "$1/$2.astro")
      return `${file} is stale: edit ${astro} and run pnpm build-examples`
    })
