#!/usr/bin/env node
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
} from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

const packageDir = fileURLToPath(new URL("..", import.meta.url))
const { version } = JSON.parse(
  readFileSync(path.join(packageDir, "package.json"), "utf8"),
)

const USAGE = `opui-css ${version}

Usage: npx opui-css skill [--dir <path>] [--force]
       npx opui-css check <file or folder>...

Commands:
  skill         Copy the opui agent skill into .claude/skills/opui
  check         Check the fields in HTML files, and in the .html files of a folder

Options:
  --dir <path>  Copy the skill into <path>/opui instead, for another agent's skills folder
  --force       Replace an existing copy of the skill
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

const shownPath = (target) => {
  const relative = path.relative(process.cwd(), target)
  return relative && !relative.startsWith("..") ? relative : target
}

const htmlFiles = (target) =>
  statSync(target).isDirectory()
    ? readdirSync(target, { recursive: true })
        .map(String)
        .filter(
          (file) =>
            file.endsWith(".html") &&
            !file
              .split(path.sep)
              .some((part) => part === "node_modules" || part.startsWith(".")),
        )
        .map((file) => path.join(target, file))
    : [target]

if (positionals[0] === "check") {
  if (values.dir !== undefined || values.force) {
    fail("--dir and --force are options of skill.")
  }
  if (positionals.length === 1) fail("Missing a file or folder to check.")
  const missing = positionals.slice(1).filter((target) => !existsSync(target))
  if (missing.length > 0) fail(`Not found: ${missing.join(", ")}`)
  let checkHtml
  try {
    ;({ checkHtml } = await import("./check.mjs"))
  } catch (error) {
    if (
      error?.code !== "ERR_MODULE_NOT_FOUND" ||
      !/parse5/.test(error.message)
    ) {
      throw error
    }
    console.error(
      "The check reads HTML with parse5. Install it with npm install --save-dev parse5, then run the command again.",
    )
    process.exit(1)
  }
  const files = [
    ...new Set(
      positionals.slice(1).flatMap((target) => htmlFiles(path.resolve(target))),
    ),
  ].toSorted()
  let fields = 0
  let problems = 0
  for (const file of files) {
    const result = checkHtml(readFileSync(file, "utf8"))
    fields += result.fields
    problems += result.problems.length
    for (const { line, message } of result.problems) {
      console.error(`${shownPath(file)}:${line}: ${message}`)
    }
  }
  const checked = `${fields} ${fields === 1 ? "field" : "fields"} in ${files.length} ${files.length === 1 ? "file" : "files"}`
  if (problems > 0) {
    console.error(
      `\n${problems} ${problems === 1 ? "problem" : "problems"} in ${checked}.`,
    )
    process.exit(1)
  }
  console.log(
    fields > 0
      ? `Checked ${checked}: each one follows its control's id.`
      : `Found no fields in ${files.length} ${files.length === 1 ? "file" : "files"}. A page that renders in the browser has no fields in its HTML file: save the rendered page, document.documentElement.outerHTML, to a file and check that.`,
  )
  process.exit(0)
}

if (positionals[0] !== "skill" || positionals.length > 1) {
  fail(`Unknown command: ${positionals.join(" ")}`)
}

const source = path.join(packageDir, "skills", "opui")
const target = path.resolve(
  values.dir ?? path.join(".claude", "skills"),
  "opui",
)
const shown = shownPath(target)

if (existsSync(target) && !values.force) {
  console.error(
    `${shown} already exists. Run the command again with --force to replace it.`,
  )
  process.exit(1)
}

rmSync(target, { force: true, recursive: true })
cpSync(source, target, { recursive: true })
console.log(`Copied the opui skill from opui-css ${version} to ${shown}`)
