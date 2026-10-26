import { readFileSync, writeFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import {
  addFindings,
  applyAnswers,
  listItems,
  resolveItems,
  sortItems,
  triageItems,
} from "../src/utils/todo-edit.ts"

const USAGE = `Usage: node scripts/todo.mjs <command> [file] [--dry-run]

  add [file]                add findings, JSON [{ section, severity, component, text, files, summary, recommended, fix, options, notes }]
  apply-answers [file]      add the answers copied from /todo (file or stdin)
  list [--missing-triage]   print the open items as JSON
  resolve [file]            record outcomes, JSON [{ line, outcome, note }]
  sort                      put open items in severity order within each section
  triage [file]             add Summary and Recommended notes, JSON [{ line, summary, recommended }]

Every command but list writes TODO.md (not with --dry-run) and prints a JSON report.`

const todo = fileURLToPath(new URL("../TODO.md", import.meta.url))
const [command, ...args] = process.argv.slice(2)
const flags = new Set(args.filter((arg) => arg.startsWith("--")))
const [file] = args.filter((arg) => !arg.startsWith("--"))
const source = readFileSync(todo, "utf-8")
const input = () => readFileSync(file ?? 0, "utf-8")
const print = (value) => console.log(JSON.stringify(value, null, 2))

const write = ({ report, source: next }) => {
  if (!flags.has("--dry-run") && next !== source) writeFileSync(todo, next)
  print(report)
  return report
}

try {
  if (command === "list") {
    print(listItems(source, { missingTriage: flags.has("--missing-triage") }))
  } else if (command === "apply-answers") {
    const report = write(applyAnswers(source, input()))
    if (
      report.some(
        ({ status }) => status === "missing" || status === "ambiguous",
      )
    ) {
      console.error(
        "Some answers match no item or more than one; their candidates are in the report.",
      )
      process.exitCode = 1
    }
  } else if (command === "resolve") {
    write(resolveItems(source, JSON.parse(input())))
  } else if (command === "triage") {
    write(triageItems(source, JSON.parse(input())))
  } else if (command === "add") {
    write(addFindings(source, JSON.parse(input())))
  } else if (command === "sort") {
    write(sortItems(source))
  } else {
    console.error(USAGE)
    process.exitCode = 1
  }
} catch (error) {
  console.error(error.message)
  process.exitCode = 1
}
