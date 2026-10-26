import { execFileSync, spawnSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, test } from "vitest"
import { suites } from "../../.claude/hooks/checks.mjs"

const EM_DASH = String.fromCodePoint(0x2014)

const settings = JSON.parse(readFileSync(".claude/settings.json", "utf-8"))

const hook = (script: string, input: object, project = process.cwd()) =>
  spawnSync("node", [script], {
    encoding: "utf-8",
    env: { ...process.env, CLAUDE_PROJECT_DIR: project },
    input: JSON.stringify(input),
  })

test("every hook command runs a file that exists", () => {
  const commands: string[] = Object.values(settings.hooks).flatMap((entries) =>
    (entries as { hooks: { command: string }[] }[]).flatMap(({ hooks }) =>
      hooks.map(({ command }) => command),
    ),
  )
  expect(
    commands
      .map(
        (command) =>
          command.match(/\$CLAUDE_PROJECT_DIR"?\/([^\s"]+)/)?.[1] ?? command,
      )
      .filter((file) => !existsSync(file)),
  ).toEqual([])
})

describe("post-edit", () => {
  const project = mkdtempSync(join(tmpdir(), "opui-hook-"))
  mkdirSync(join(project, "docs"))
  writeFileSync(join(project, "docs/clean.md"), "One, two.\n")
  writeFileSync(join(project, "docs/dash.md"), `One ${EM_DASH} two.\n`)

  test("reports a problem in the edited file to Claude", () => {
    const result = hook(
      ".claude/hooks/post-edit.mjs",
      { tool_input: { file_path: join(project, "docs/dash.md") } },
      project,
    )
    expect(result.status).toBe(2)
    expect(result.stderr).toContain(
      "docs/dash.md:1: em dash (U+2014). Use a comma, a slash or parentheses instead.",
    )
  })

  test("stays quiet for a clean file and for files outside the project", () => {
    for (const file_path of [
      join(project, "docs/clean.md"),
      join(tmpdir(), "elsewhere.md"),
      "",
    ]) {
      const result = hook(
        ".claude/hooks/post-edit.mjs",
        { tool_input: { file_path } },
        project,
      )
      expect(result.status, file_path).toBe(0)
      expect(result.stderr, file_path).toBe("")
    }
  })
})

describe("stop", () => {
  test("lets Claude stop when a stop hook already made it continue", () => {
    const result = hook(".claude/hooks/stop.mjs", { stop_hook_active: true })
    expect(result.status).toBe(0)
    expect(result.stderr).toBe("")
  })

  test("checks the files changed since the upstream branch", () => {
    const remote = mkdtempSync(join(tmpdir(), "opui-remote-"))
    const clone = mkdtempSync(join(tmpdir(), "opui-clone-"))
    const git = (...args: string[]) =>
      execFileSync(
        "git",
        ["-c", "user.email=a@example.com", "-c", "user.name=A", ...args],
        { cwd: clone, encoding: "utf-8", stdio: "pipe" },
      )
    execFileSync("git", ["init", "-q", "--bare", remote])
    git("clone", "-q", remote, ".")
    writeFileSync(join(clone, "a.md"), "One, two.\n")
    git("add", ".")
    git("commit", "-q", "-m", "chore: add a")
    git("push", "-q", "-u", "origin", "HEAD")
    const stop = () =>
      hook(".claude/hooks/stop.mjs", { stop_hook_active: false }, clone)

    expect(stop().status).toBe(0)

    writeFileSync(join(clone, "dash.md"), `One ${EM_DASH} two.\n`)
    const untracked = stop()
    expect(untracked.status).toBe(2)
    expect(untracked.stderr).toContain("dash.md:1: em dash (U+2014)")

    rmSync(join(clone, "dash.md"))
    writeFileSync(join(clone, "color.css"), ".a {\n  color: #fff;\n}\n")
    git("add", ".")
    git("commit", "-q", "-m", "chore: add color")
    const unpushed = stop()
    expect(unpushed.status).toBe(2)
    expect(unpushed.stderr).toContain("color.css:2: #fff is not OKLCH")

    git("push", "-q")
    expect(stop().status).toBe(0)
  })
})

test("the hooks run the TODO.md and guide tests for those files", () => {
  expect(suites(["TODO.md"])).toEqual(["tests/unit/todo.test.ts"])
  expect(
    suites(["src/docs/components/AGENTS.md", ".claude/agents/css.md"]),
  ).toEqual(["tests/unit/agents.test.ts", "tests/unit/instructions.test.ts"])
  expect(suites(["scripts/a.mjs"])).toEqual([])
})

describe("commit-msg", () => {
  const dir = mkdtempSync(join(tmpdir(), "opui-commit-"))
  const commit = (message: string) => {
    writeFileSync(join(dir, "MSG"), `${message}\n`)
    return spawnSync("sh", [".githooks/commit-msg", join(dir, "MSG")], {
      encoding: "utf-8",
    }).status
  }

  test("accepts a message with a prefix and a short subject", () => {
    expect(commit("chore: add a test")).toBe(0)
  })

  test.each([
    ["no prefix", "add a test"],
    ["a long subject", `chore: ${"a".repeat(100)}`],
    ["an em dash", `chore: one ${EM_DASH} two`],
  ])("rejects %s", (_, message) => {
    expect(commit(message)).toBe(1)
  })
})
