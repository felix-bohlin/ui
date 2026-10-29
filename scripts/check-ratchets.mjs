import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, realpathSync } from "node:fs"
import { join } from "node:path"
import { fileURLToPath } from "node:url"

const RATCHETS = [
  {
    file: "scripts/css-vars-allowlist.json",
    fix: "use a --ui-* role or a documented input instead of a new allowlist entry",
  },
  {
    file: "scripts/hand-written-examples.json",
    fix: "support the construct in scripts/build-examples.mjs instead of writing the file by hand",
    keys: true,
  },
  {
    file: "tests/unit/todo-allowlist.json",
    fix: "fix the new TODO.md item instead of allowing it",
  },
  {
    file: "tests/unit/untested-scripts.json",
    fix: "add a test that imports the script or runs it by its path",
    keys: true,
  },
]

const A11Y_LEDGER = "tests/e2e/a11y-known-violations.json"
const DRIFT_DIR = "tests/unit/__snapshots__"
export const TRAILER = "Ledger-Change"

export const entries = (value, path = []) =>
  typeof value === "string"
    ? [[...path, value].join(": ")]
    : Array.isArray(value)
      ? value.flatMap((item) => entries(item, path))
      : Object.entries(value).flatMap(([key, item]) =>
          entries(item, [...path, key]),
        )

export const ratchetEntries = ({ keys = false }, json) =>
  keys ? Object.keys(json) : entries(json)

export const added = (before, after) => {
  const seen = new Set(before)
  return after.filter((entry) => !seen.has(entry))
}

export const driftLines = (diff) => {
  const lines = diff.split("\n")
  const start = lines.findIndex((line) => line.startsWith("@@"))
  return start === -1
    ? []
    : lines.slice(start).filter((line) => /^[+-]/.test(line))
}

export const driftAdditions = (before, after) =>
  Object.entries(after).flatMap(([file, diff]) => {
    if (before[file] === undefined) return [`${file} records new drift`]
    const gained = added(driftLines(before[file]), driftLines(diff))
    return gained.length > 0
      ? [
          `${file} gained ${gained.length} drift line${gained.length === 1 ? "" : "s"}`,
        ]
      : []
  })

export const intended = (trailers) =>
  trailers
    .split("\n")
    .some((value) => value.trim().toLowerCase() === "intended")

const git = (...args) =>
  execFileSync("git", args, {
    encoding: "utf-8",
    stdio: ["ignore", "pipe", "pipe"],
  })

const show = (ref, file) => {
  try {
    return git("show", `${ref}:${file}`)
  } catch {
    return undefined
  }
}

const driftFiles = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { recursive: true })
        .map((file) => join(dir, String(file)).replaceAll("\\", "/"))
        .filter((file) => file.endsWith(".diff"))
        .toSorted()
    : []

const main = () => {
  const base = process.argv[2]
  if (!base) {
    console.error("Usage: node scripts/check-ratchets.mjs <base-ref>")
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

  const errors = []
  for (const ratchet of RATCHETS) {
    const { file, fix } = ratchet
    const before = show(mergeBase, file)
    if (before === undefined) continue
    for (const entry of added(
      ratchetEntries(ratchet, JSON.parse(before)),
      ratchetEntries(ratchet, JSON.parse(readFileSync(file, "utf-8"))),
    )) {
      errors.push(`${file} gained "${entry}". The list only shrinks: ${fix}.`)
    }
  }

  const ledger = show(mergeBase, A11Y_LEDGER)
  const driftBefore = Object.fromEntries(
    git("ls-tree", "-r", "--name-only", mergeBase, "--", DRIFT_DIR)
      .split("\n")
      .filter((file) => file.endsWith(".diff"))
      .map((file) => [file, show(mergeBase, file) ?? ""]),
  )
  const ledgerAdditions = [
    ...(ledger === undefined
      ? []
      : added(
          entries(JSON.parse(ledger)),
          entries(JSON.parse(readFileSync(A11Y_LEDGER, "utf-8"))),
        ).map((entry) => `${A11Y_LEDGER} gained "${entry}"`)),
    ...driftAdditions(
      driftBefore,
      Object.fromEntries(
        driftFiles(DRIFT_DIR).map((file) => [
          file,
          readFileSync(file, "utf-8"),
        ]),
      ),
    ),
  ]

  if (ledgerAdditions.length > 0) {
    if (
      intended(
        git(
          "log",
          `--format=%(trailers:key=${TRAILER},valueonly)`,
          `${mergeBase}..HEAD`,
        ),
      )
    ) {
      console.log(
        `Accepted, a commit on the branch has "${TRAILER}: intended":\n${ledgerAdditions.map((entry) => `  ${entry}`).join("\n")}`,
      )
    } else {
      errors.push(
        ...ledgerAdditions.map((entry) => `${entry}.`),
        `The accessibility ledger and the parity drift only grow for an intended change. Fix the violation or the drift, or, when it is intended, add the trailer "${TRAILER}: intended" to a commit on the branch (git commit --amend --trailer "${TRAILER}: intended") and say in its message what it accepts.`,
      )
    }
  }

  if (errors.length > 0) {
    console.error(errors.join("\n"))
    process.exit(1)
  }

  console.log(
    `Checked ${RATCHETS.length} allowlists, ${A11Y_LEDGER} and the parity drift against ${base}.`,
  )
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
