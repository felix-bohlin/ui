import { existsSync, readFileSync } from "node:fs"
import { isAbsolute, relative, resolve } from "node:path"
import { fileProblems } from "../../scripts/check-file.mjs"
import { astroSourceOf } from "../../scripts/example-targets.mjs"
import { input, project, suites, vitest } from "./checks.mjs"

try {
  const path = input().tool_input?.file_path
  const file = path ? relative(project, resolve(project, path)) : ""
  if (
    !file ||
    file.startsWith("..") ||
    isAbsolute(file) ||
    /(^|\/)(dist|node_modules)\//.test(file) ||
    !existsSync(resolve(project, file))
  ) {
    process.exit(0)
  }
  const astro = astroSourceOf(file, (path) =>
    existsSync(resolve(project, path))
      ? readFileSync(resolve(project, path), "utf-8")
      : undefined,
  )
  if (astro) {
    console.error(
      `${file} is generated from ${astro}: undo this edit, edit ${astro} and run pnpm build-examples`,
    )
    process.exit(2)
  }
  const problems = [
    ...(await fileProblems(
      file,
      readFileSync(resolve(project, file), "utf-8"),
    )),
    ...vitest(suites([file])),
  ]
  if (problems.length) {
    console.error(problems.join("\n"))
    process.exit(2)
  }
} catch (error) {
  console.error(`post-edit hook: ${error.message}`)
  process.exit(1)
}
