import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"

const handWrittenFile = fileURLToPath(
  new URL("hand-written-examples.json", import.meta.url),
)

export const TARGETS = {
  html: ".html",
  react: ".react.tsx",
  svelte: ".svelte",
  vue: ".vue",
}

export const readHandWritten = () =>
  JSON.parse(readFileSync(handWrittenFile, "utf8"))

export const isHandWritten = (file, source, handWritten) =>
  file in handWritten || (!file.endsWith(".html") && /^<script\b/m.test(source))

/** @returns {(keyof typeof TARGETS)[]} */
export const generatedTargets = (key, source, handWritten) =>
  Object.keys(TARGETS).filter(
    (framework) =>
      !isHandWritten(`${key}${TARGETS[framework]}`, source, handWritten),
  )

const GENERATED_FILE = new RegExp(
  `^src/component-examples/(.+?)(${Object.values(TARGETS)
    .map((extension) => extension.replace(/\./g, "\\."))
    .join("|")})$`,
)

export const astroSourceOf = (file, read) => {
  const [, key, extension] = GENERATED_FILE.exec(file) ?? []
  if (!key) return undefined
  const source = read(`src/component-examples/${key}.astro`)
  if (source === undefined) return undefined
  const generated = generatedTargets(key, source, readHandWritten()).some(
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
