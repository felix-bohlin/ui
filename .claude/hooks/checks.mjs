import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { join, matchesGlob } from "node:path"
import { fileURLToPath } from "node:url"

export const code = fileURLToPath(new URL("../..", import.meta.url))
export const project = process.env.CLAUDE_PROJECT_DIR ?? code

export const input = () => {
  const text = readFileSync(0, "utf-8")
  return text.trim() ? JSON.parse(text) : {}
}

const GUIDES = ["**/AGENTS.md", ".claude/agents/**", ".claude/skills/**"]

export const styledGlobs = () =>
  [
    ...((
      JSON.parse(readFileSync(`${code}package.json`, "utf-8")).scripts.lint ??
      ""
    )
      .split("&&")
      .map((command) => command.trim())
      .find((command) => command.startsWith("stylelint "))
      ?.matchAll(/"([^"]+)"/g) ?? []),
  ].map(([, glob]) => glob)

export const suites = (files) =>
  [
    ...(files.includes("TODO.md") ? ["tests/unit/todo.test.ts"] : []),
    ...(files.some((file) => GUIDES.some((glob) => matchesGlob(file, glob)))
      ? ["tests/unit/agents.test.ts", "tests/unit/instructions.test.ts"]
      : []),
  ].toSorted()

export const binOf = (name) => {
  const folder = join(code, "node_modules", name)
  const { bin } = JSON.parse(
    readFileSync(join(folder, "package.json"), "utf-8"),
  )
  return join(folder, typeof bin === "string" ? bin : bin[name])
}

export const run = (name, args, cwd = code) => {
  try {
    execFileSync(process.execPath, [binOf(name), ...args], {
      cwd,
      encoding: "utf-8",
      env: { ...process.env, FORCE_COLOR: "0", NO_COLOR: "1" },
      stdio: ["ignore", "pipe", "pipe"],
    })
    return []
  } catch (error) {
    if (error.status === undefined || error.status === null) throw error
    return `${error.stdout ?? ""}${error.stderr ?? ""}`
      .split("\n")
      .map((line) => line.trimEnd())
      .filter(Boolean)
  }
}

export const vitest = (files) => {
  if (!files.length) return []
  const output = run("vitest", ["run", ...files])
  const failed = output.findIndex((line) => line.includes("Failed Tests"))
  return output.slice(failed === -1 ? 0 : failed).slice(0, 60)
}
