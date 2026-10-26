import { execFileSync } from "node:child_process"
import { existsSync, readFileSync } from "node:fs"
import { matchesGlob, resolve } from "node:path"
import { fileProblems } from "../../scripts/check-file.mjs"
import { code, input, project, run, suites, vitest } from "./checks.mjs"

const LINTED = /\.(?:astro|cjs|js|jsx|mjs|svelte|ts|tsx|vue)$/
const STYLED = ["packages/opui/**/*.css", "src/**/*.css"]

const git = (...args) => {
  try {
    return execFileSync("git", args, {
      cwd: project,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .filter(Boolean)
  } catch {
    return undefined
  }
}

const ratchets = (base) => {
  try {
    execFileSync("node", [`${code}scripts/check-ratchets.mjs`, base], {
      cwd: project,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    })
    return []
  } catch (error) {
    return `${error.stderr ?? ""}`.split("\n").filter(Boolean)
  }
}

try {
  if (input().stop_hook_active) process.exit(0)
  const base = git("rev-parse", "--abbrev-ref", "@{upstream}")
    ? "@{upstream}"
    : "HEAD"
  const files = [
    ...new Set([
      ...(git("diff", "--name-only", `${base}...HEAD`) ?? []),
      ...(git("diff", "--name-only", "HEAD") ?? []),
      ...(git("ls-files", "--others", "--exclude-standard") ?? []),
    ]),
  ]
    .filter((file) => existsSync(resolve(project, file)))
    .toSorted()
  if (!files.length) process.exit(0)
  const linted = files.filter((file) => LINTED.test(file))
  const styled = files.filter((file) =>
    STYLED.some((glob) => matchesGlob(file, glob)),
  )
  const groups = [
    [
      "Characters, colors and declaration order",
      (
        await Promise.all(
          files.map((file) =>
            fileProblems(file, readFileSync(resolve(project, file), "utf-8")),
          ),
        )
      ).flat(),
    ],
    [
      "Prettier",
      run("prettier", ["--check", "--ignore-unknown", ...files], project),
    ],
    [
      "oxlint",
      linted.length
        ? run("oxlint", ["--deny-warnings", ...linted], project)
        : [],
    ],
    ["Stylelint", styled.length ? run("stylelint", styled, project) : []],
    ["Unit tests", vitest(suites(files))],
    ["Ratchets", ratchets(base)],
  ].filter(([, problems]) => problems.length)
  if (groups.length) {
    console.error(
      [
        "The checks found problems in the files this session changed. Fix them before you finish; pnpm check is still the gate.",
        ...groups.flatMap(([name, problems]) => [
          "",
          `${name}:`,
          ...problems.map((problem) => `  ${problem}`),
        ]),
      ].join("\n"),
    )
    process.exit(2)
  }
} catch (error) {
  console.error(`stop hook: ${error.message}`)
  process.exit(1)
}
