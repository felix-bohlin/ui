#!/usr/bin/env node
import { cpSync, existsSync, readFileSync, rmSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

const packageDir = fileURLToPath(new URL("..", import.meta.url))
const { version } = JSON.parse(
  readFileSync(path.join(packageDir, "package.json"), "utf8"),
)

const USAGE = `opui-css ${version}

Usage: npx opui-css skill [--dir <path>] [--force]

Commands:
  skill         Copy the opui agent skill into .claude/skills/opui

Options:
  --dir <path>  Copy it into <path>/opui instead, for another agent's skills folder
  --force       Replace an existing copy
  --help        Show this help`

const fail = (message) => {
  if (message) console.error(`${message}\n`)
  console.error(USAGE)
  process.exit(1)
}

let parsed
try {
  parsed = parseArgs({
    allowPositionals: true,
    options: {
      dir: { type: "string" },
      force: { type: "boolean" },
      help: { short: "h", type: "boolean" },
    },
  })
} catch (error) {
  fail(error.message)
}

const { positionals, values } = parsed
if (values.help) fail()
if (positionals.length === 0) fail("Missing a command.")
if (positionals[0] !== "skill" || positionals.length > 1) {
  fail(`Unknown command: ${positionals.join(" ")}`)
}

const source = path.join(packageDir, "skills", "opui")
const target = path.resolve(
  values.dir ?? path.join(".claude", "skills"),
  "opui",
)
const relative = path.relative(process.cwd(), target)
const shown = relative && !relative.startsWith("..") ? relative : target

if (existsSync(target) && !values.force) {
  console.error(
    `${shown} already exists. Run the command again with --force to replace it.`,
  )
  process.exit(1)
}

rmSync(target, { force: true, recursive: true })
cpSync(source, target, { recursive: true })
console.log(`Copied the opui skill from opui-css ${version} to ${shown}`)
