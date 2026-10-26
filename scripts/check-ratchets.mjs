import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"

const RATCHETS = [
  {
    file: "scripts/css-vars-allowlist.json",
    fix: "use a --ui-* role or a documented input instead of a new allowlist entry",
  },
  {
    file: "tests/unit/todo-allowlist.json",
    fix: "fix the new TODO.md item instead of allowing it",
  },
]

const base = process.argv[2]
if (!base) {
  console.error("Usage: node scripts/check-ratchets.mjs <base-ref>")
  process.exit(1)
}

const git = (...args) =>
  execFileSync("git", args, {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  })

let mergeBase
try {
  mergeBase = git("merge-base", base, "HEAD").trim()
} catch {
  console.error(
    `No merge base between ${base} and HEAD. Fetch the full history (fetch-depth: 0).`,
  )
  process.exit(1)
}

const entries = (value, path = []) =>
  typeof value === "string"
    ? [[...path, value].join(": ")]
    : Array.isArray(value)
      ? value.flatMap((item) => entries(item, path))
      : Object.entries(value).flatMap(([key, item]) =>
          entries(item, [...path, key]),
        )

const errors = []
for (const { file, fix } of RATCHETS) {
  let before
  try {
    before = new Set(entries(JSON.parse(git("show", `${mergeBase}:${file}`))))
  } catch {
    continue
  }
  const added = entries(JSON.parse(readFileSync(file, "utf-8"))).filter(
    (entry) => !before.has(entry),
  )
  for (const entry of added) {
    errors.push(`${file} gained "${entry}". The list only shrinks: ${fix}.`)
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"))
  process.exit(1)
}

console.log(`Checked ${RATCHETS.length} allowlists against ${base}.`)
