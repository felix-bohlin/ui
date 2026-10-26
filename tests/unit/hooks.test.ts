import { spawnSync } from "node:child_process"
import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { describe, expect, test } from "vitest"

const EM_DASH = String.fromCodePoint(0x2014)

const settings = JSON.parse(readFileSync(".claude/settings.json", "utf-8"))

const hook = (name: string, input: object, project = process.cwd()) =>
  spawnSync("node", [`.claude/hooks/${name}.mjs`], {
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
      "post-edit",
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
      const result = hook("post-edit", { tool_input: { file_path } }, project)
      expect(result.status, file_path).toBe(0)
      expect(result.stderr, file_path).toBe("")
    }
  })
})

describe("stop", () => {
  test("lets Claude stop when a stop hook already made it continue", () => {
    const result = hook("stop", { stop_hook_active: true })
    expect(result.status).toBe(0)
    expect(result.stderr).toBe("")
  })
})
