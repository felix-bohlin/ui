import { execFileSync } from "node:child_process"

const BOT = "41898282+github-actions[bot]@users.noreply.github.com"
const SCREENSHOTS = "tests/e2e/__screenshots__"

const base = process.argv[2]
if (!base) {
  console.error("Usage: node scripts/check-screenshot-authors.mjs <base-ref>")
  process.exit(1)
}

const git = (...args) => execFileSync("git", args, { encoding: "utf-8" })

let mergeBase
try {
  mergeBase = git("merge-base", base, "HEAD").trim()
} catch {
  console.error(
    `No merge base between ${base} and HEAD. Fetch the full history (fetch-depth: 0).`,
  )
  process.exit(1)
}
const changed = git(
  "diff",
  "--name-only",
  "--diff-filter=AM",
  mergeBase,
  "HEAD",
  "--",
  SCREENSHOTS,
)
  .split("\n")
  .filter(Boolean)

const authors = new Map()
let author = ""
for (const line of git(
  "log",
  "--no-merges",
  "--format=%x00%ae",
  "--name-only",
  `${mergeBase}..HEAD`,
  "--",
  SCREENSHOTS,
).split("\n")) {
  if (line.startsWith("\0")) author = line.slice(1)
  else if (line && !authors.has(line)) authors.set(line, author)
}

const local = changed.filter((file) => authors.get(file) !== BOT).toSorted()

if (local.length > 0) {
  console.error(
    "Visual baselines must come from the update-snapshots workflow. These were last changed by someone else:",
  )
  for (const file of local) console.error(`  ${file} (${authors.get(file)})`)
  console.error(
    "\nDelete them, or add the update-snapshots label to the pull request to regenerate them.",
  )
  process.exit(1)
}

console.log(`Checked ${changed.length} visual baselines changed since ${base}.`)
