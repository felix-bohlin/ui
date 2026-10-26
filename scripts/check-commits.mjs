import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { FORBIDDEN } from "./forbidden-characters.mjs"

const PREFIX = /^(chore|docs|feat|fix|refactor|revert)!?: \S/
const MAX_SUBJECT = 100
const CHECKED_SINCE = Date.parse("2026-10-26T14:30:00Z")

const problems = (message, merge = false) => {
  const subject = message.split("\n")[0]
  return [
    ...(merge || PREFIX.test(subject)
      ? []
      : [
          "must start with chore, docs, feat, fix, refactor or revert and ': ' (feat!: when it breaks something)",
        ]),
    ...(merge || subject.length <= MAX_SUBJECT
      ? []
      : [
          `must have a subject of at most ${MAX_SUBJECT} characters, not ${subject.length}`,
        ]),
    ...FORBIDDEN.filter(({ char }) => message.includes(char)).map(
      ({ name }) => `must not have an ${name}`,
    ),
  ]
}

const git = (...args) => execFileSync("git", args, { encoding: "utf-8" })

const file = process.argv.indexOf("--file")
if (file !== -1) {
  const message = readFileSync(process.argv[file + 1], "utf-8")
    .split(/^# -+ >8 -+$/m)[0]
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .join("\n")
    .trim()
  const found = problems(message)
  if (found.length > 0) {
    console.error(`The commit message ${found.join(", and ")}.`)
    process.exit(1)
  }
  process.exit(0)
}

const base = process.argv[2]
if (!base) {
  console.error(
    "Usage: node scripts/check-commits.mjs <base-ref> or --file <message-file>",
  )
  process.exit(1)
}

let mergeBase
try {
  mergeBase = git("merge-base", base, "HEAD").trim()
} catch {
  console.error(
    `No merge base between ${base} and HEAD. Fetch the full history (fetch-depth: 0).`,
  )
  process.exit(1)
}

const failures = []
let checked = 0
for (const record of git(
  "log",
  "--format=%x00%H %at %P%x01%B",
  `${mergeBase}..HEAD`,
)
  .split("\0")
  .filter(Boolean)) {
  const [head, body] = record.split("\x01")
  const [hash, authored, ...parents] = head.trim().split(" ")
  if (Number(authored) * 1000 < CHECKED_SINCE) continue
  checked++
  const message = body.trim()
  const found = problems(message, parents.length > 1)
  if (found.length > 0) {
    failures.push(
      `  ${hash.slice(0, 8)} ${message.split("\n")[0]}\n    ${found.join(", and ")}`,
    )
  }
}
if (process.env.PR_TITLE) {
  const found = problems(process.env.PR_TITLE)
  if (found.length > 0) {
    failures.push(`  pull request title\n    ${found.join(", and ")}`)
  }
}

if (failures.length > 0) {
  console.error("These commit messages break the rules in AGENTS.md:")
  console.error(failures.join("\n"))
  console.error(
    "\nReword them (git commit --amend for the last one) and push with --force-with-lease, or edit the pull request title.",
  )
  process.exit(1)
}

console.log(`Checked ${checked} commit messages since ${base}.`)
