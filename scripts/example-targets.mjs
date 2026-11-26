import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import {
  componentHasFramework,
  exampleExtension,
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

export const byAttributeName = (a, b) => a.localeCompare(b, "en")

export const readHandWritten = () =>
  JSON.parse(readFileSync(handWrittenFile, "utf8"))

/** @returns {(keyof typeof TARGETS)[]} */
export const generatedTargets = (key, handWritten) =>
  Object.keys(TARGETS).filter(
    (framework) =>
      componentHasFramework(framework, key.split("/")[0]) &&
      !(`${key}${TARGETS[framework]}` in handWritten),
  )

export const handWrittenProblems = (handWritten, exists) => {
  const files = Object.keys(handWritten)
  const list = "scripts/hand-written-examples.json"
  return [
    ...(files.every((file, index) => !index || files[index - 1] <= file)
      ? []
      : [`${list} is not sorted`]),
    ...files.flatMap((file) => {
      const astro = file.replace(/\.(html|react\.tsx|svelte|vue)$/, ".astro")
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
  `^src/component-examples/(.+?)(${Object.values(TARGETS)
    .map((extension) => extension.replace(/\./g, "\\."))
    .join("|")})$`,
)

export const astroSourceOf = (file, read) => {
  const [, key, extension] = GENERATED_FILE.exec(file) ?? []
  if (!key || read(`src/component-examples/${key}.astro`) === undefined) {
    return undefined
  }
  const generated = generatedTargets(key, readHandWritten()).some(
    (framework) => TARGETS[framework] === extension,
  )
  return generated ? `src/component-examples/${key}.astro` : undefined
}

export const staleProblems = (outputs, read) =>
  [...outputs]
    .filter(([file, code]) => read(file) !== code)
    .map(([file]) => {
      const astro = file.replace(
        GENERATED_FILE,
        "src/component-examples/$1.astro",
      )
      return `${file} is stale: edit ${astro} and run pnpm build-examples`
    })
