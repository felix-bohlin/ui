import { readdirSync, readFileSync, realpathSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"
import { changesOf, versionsOf, withChanges } from "../src/utils/changes.ts"

const root = fileURLToPath(new URL("..", import.meta.url))
const CHANGELOG = "packages/opui/CHANGELOG.md"

export const loadChanges = async (dir = join(root, "changes")) => {
  const files = readdirSync(dir, { recursive: true })
    .filter((file) => file.endsWith(".ts"))
    .toSorted()
  const modules = []
  for (const file of files) {
    const { default: change } = await import(
      pathToFileURL(join(dir, file)).href
    )
    modules.push([file.split("\\").join("/"), change])
  }
  return changesOf(modules)
}

export const renderChangelog = (changelog, changes) =>
  versionsOf(changes).reduce(
    (text, version) => withChanges(text, changes, version),
    changelog,
  )

const main = async () => {
  const file = join(root, CHANGELOG)
  const current = readFileSync(file, "utf8")
  const rendered = renderChangelog(current, await loadChanges())
  if (process.argv.includes("--check")) {
    if (rendered !== current) {
      console.error(
        `${CHANGELOG} is stale: its sections are written from the records in changes/. Run pnpm build-changelog and commit the result.`,
      )
      process.exit(1)
    }
    console.log(`${CHANGELOG} matches the records in changes/.`)
    return
  }
  writeFileSync(file, rendered)
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
