import { execFileSync } from "node:child_process"
import { existsSync, readFileSync, realpathSync } from "node:fs"
import { matchesGlob, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { run, styledGlobs, suites, vitest } from "../.claude/hooks/checks.mjs"
import { fileProblems } from "./check-file.mjs"

const LINTED = /\.(?:astro|cjs|js|jsx|mjs|svelte|ts|tsx|vue)$/
const STYLED = styledGlobs()

export const checkFiles = async (files, cwd) => {
  const linted = files.filter((file) => LINTED.test(file))
  const styled = files.filter((file) =>
    STYLED.some((glob) => matchesGlob(file, glob)),
  )
  return [
    [
      "Characters, colors and declaration order",
      (
        await Promise.all(
          files.map((file) =>
            fileProblems(file, readFileSync(resolve(cwd, file), "utf-8")),
          ),
        )
      ).flat(),
    ],
    [
      "Prettier",
      run("prettier", ["--check", "--ignore-unknown", ...files], cwd),
    ],
    [
      "oxlint",
      linted.length ? run("oxlint", ["--deny-warnings", ...linted], cwd) : [],
    ],
    ["Stylelint", styled.length ? run("stylelint", styled, cwd) : []],
    ["Unit tests", vitest(suites(files))],
  ].filter(([, problems]) => problems.length)
}

export const report = (groups, intro) =>
  [
    intro,
    ...groups.flatMap(([name, problems]) => [
      "",
      `${name}:`,
      ...problems.map((problem) => `  ${problem}`),
    ]),
  ].join("\n")

const main = async () => {
  const git = (...args) =>
    execFileSync("git", args, {
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "inherit"],
    })
  const cwd = git("rev-parse", "--show-toplevel").trim()
  const files = git("diff", "--cached", "--name-only", "--diff-filter=ACMR")
    .split("\n")
    .filter((file) => file && existsSync(resolve(cwd, file)))
    .toSorted()
  if (!files.length) return
  const groups = await checkFiles(files, cwd)
  if (groups.length) {
    console.error(
      report(
        groups,
        "The checks found problems in the staged files. Fix them, or skip the hook with git commit --no-verify.",
      ),
    )
    process.exit(1)
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
