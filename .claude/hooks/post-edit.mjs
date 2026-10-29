import { existsSync, readFileSync } from "node:fs"
import { isAbsolute, relative, resolve } from "node:path"
import { fileProblems } from "../../scripts/check-file.mjs"
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
