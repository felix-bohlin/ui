import { createHash } from "node:crypto"
import {
  copyFileSync,
  existsSync,
  readdirSync,
  readFileSync,
  realpathSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { parseArgs } from "node:util"

export const MARKER = "<!-- update-snapshots -->"
const SCREENSHOTS = "tests/e2e/__screenshots__"

const POINTER = "version https://git-lfs.github.com/spec/v1\n"
const STATUSES = ["added", "changed", "removed"]

export const contentHash = (content) => {
  const head = content.subarray(0, 1024).toString("utf8")
  const oid = head.startsWith(POINTER)
    ? head.match(/^oid sha256:([0-9a-f]{64})$/m)
    : null
  return oid
    ? { lfs: true, sha256: oid[1] }
    : {
        lfs: false,
        sha256: createHash("sha256").update(content).digest("hex"),
      }
}

const listBaselines = (dir) =>
  existsSync(dir)
    ? readdirSync(dir, { recursive: true })
        .map((file) => file.split(path.sep).join("/"))
        .filter((file) => file.endsWith(".png"))
        .toSorted()
    : []

export const hashBaselines = (dir) =>
  Object.fromEntries(
    listBaselines(dir).map((file) => [
      file,
      contentHash(readFileSync(path.join(dir, file))),
    ]),
  )

export const passingBaselines = (before, after, compare) =>
  listBaselines(after).filter((file) => {
    const old = path.join(before, file)
    if (!existsSync(old)) return false
    const expected = readFileSync(old)
    const actual = readFileSync(path.join(after, file))
    if (expected.equals(actual)) return false
    if (contentHash(expected).lfs) {
      throw new Error(
        `${file} is a Git LFS pointer: pull the baselines before the update.`,
      )
    }
    return compare(actual, expected) === null
  })

export const imageComparator = async () => {
  const require = createRequire(import.meta.url)
  const test = createRequire(require.resolve("@playwright/test"))
  const core = createRequire(test.resolve("playwright"))
  const { utils } = core("playwright-core/lib/coreBundle")
  const { default: config } = await import("../playwright.config.ts")
  const compare = utils.getComparator("image/png")
  return (actual, expected) =>
    compare(actual, expected, config.expect.toHaveScreenshot)
}

export const compareBaselines = (before, after) => {
  const result = {
    added: [],
    changed: [],
    converted: 0,
    removed: [],
    unchanged: 0,
  }
  const files = new Set([...Object.keys(before), ...Object.keys(after)])
  for (const file of [...files].toSorted()) {
    const old = Object.hasOwn(before, file) ? before[file] : undefined
    const now = Object.hasOwn(after, file) ? after[file] : undefined
    if (!old) result.added.push(file)
    else if (!now) result.removed.push(file)
    else if (old.sha256 !== now.sha256) result.changed.push(file)
    else result.unchanged++
    if (old && now && !old.lfs) result.converted++
  }
  return result
}

const projectOf = (file) => file.split("/")[0]

export const byProject = (result) =>
  [...new Set(STATUSES.flatMap((status) => result[status].map(projectOf)))]
    .toSorted()
    .map((project) => ({
      project,
      ...Object.fromEntries(
        STATUSES.map((status) => [
          status,
          result[status].filter((file) => projectOf(file) === project),
        ]),
      ),
    }))

const counts = (changes) =>
  STATUSES.filter((status) => changes[status].length > 0)
    .map((status) => `${changes[status].length} ${status}`)
    .join(", ")

export const commitMessage = (result) => {
  const body = byProject(result).map(
    (changes) => `${changes.project}: ${counts(changes)}`,
  )
  if (result.converted > 0) {
    body.push(
      `Moves ${result.converted} baselines from plain PNGs to Git LFS pointers.`,
    )
  }
  return [
    `chore: update visual snapshots (${counts(result) || "no image changed"})`,
    ...(body.length > 0 ? ["", ...body] : []),
    "",
  ].join("\n")
}

const fileUrl = (repository, ref, file) =>
  `${repository}/blob/${ref}/${[...SCREENSHOTS.split("/"), ...file.split("/")]
    .map(encodeURIComponent)
    .join("/")}`

export const report = (result, options) => {
  const {
    after,
    before,
    limit = Infinity,
    more = "",
    repository,
  } = options ?? {}
  const listed = STATUSES.reduce(
    (sum, status) => sum + result[status].length,
    0,
  )
  const commit =
    repository && after
      ? ` in [\`${after.slice(0, 7)}\`](${repository}/commit/${after})`
      : ""
  const head = [
    MARKER,
    "### Visual baselines",
    "",
    listed > 0
      ? `Changed by content${commit}: ${counts(result)}, ${result.unchanged} unchanged.`
      : `Nothing changed by content${commit}: ${result.unchanged} unchanged.`,
  ]
  if (result.converted > 0) {
    head.push(
      "",
      `The commit also moves ${result.converted} baselines from plain PNGs to Git LFS pointers, so its diff lists all of them.`,
    )
  }
  const lines = byProject(result).flatMap((changes) => [
    { text: "" },
    { text: `#### ${changes.project}` },
    ...STATUSES.filter((status) => changes[status].length > 0).flatMap(
      (status) => [
        { text: "" },
        {
          text: `${status[0].toUpperCase()}${status.slice(1)} (${changes[status].length}):`,
        },
        { text: "" },
        ...changes[status].map((file) => {
          const name = file.slice(changes.project.length + 1)
          const ref = status === "removed" ? before : after
          return {
            file: true,
            text:
              repository && ref
                ? `- [${name}](${fileUrl(repository, ref, file)})`
                : `- \`${name}\``,
          }
        }),
      ],
    ),
  ])
  const reserve = 100 + more.length
  let text = head.join("\n")
  let shown = 0
  for (const line of lines) {
    if (text.length + line.text.length + 1 + reserve > limit) break
    text += `\n${line.text}`
    if (line.file) shown++
  }
  if (shown < listed) {
    text += `\n\n${listed - shown} more not listed.${more ? ` ${more}` : ""}`
  }
  return `${text}\n`
}

const usage = () => {
  console.error(
    [
      "Usage:",
      "  node scripts/baseline-changes.mjs record <out.json>",
      "  node scripts/baseline-changes.mjs restore <before-dir>",
      "  node scripts/baseline-changes.mjs message <before.json> <after.json>",
      "  node scripts/baseline-changes.mjs report <before.json> <after.json> [--after <sha>] [--before <sha>] [--limit <characters>] [--more <text>] [--repository <url>]",
    ].join("\n"),
  )
  process.exit(1)
}

const main = async () => {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      after: { type: "string" },
      before: { type: "string" },
      limit: { type: "string" },
      more: { type: "string" },
      repository: { type: "string" },
    },
  })
  const [command, ...files] = positionals
  const read = (file) => JSON.parse(readFileSync(file, "utf8"))
  const root = fileURLToPath(new URL(`../${SCREENSHOTS}`, import.meta.url))
  if (command === "record" && files.length === 1) {
    writeFileSync(files[0], `${JSON.stringify(hashBaselines(root), null, 2)}\n`)
  } else if (command === "restore" && files.length === 1) {
    const passing = passingBaselines(files[0], root, await imageComparator())
    for (const file of passing) {
      copyFileSync(path.join(files[0], file), path.join(root, file))
    }
    console.log(
      `Put back ${passing.length} baselines that pass against their new image.`,
    )
  } else if (command === "message" && files.length === 2) {
    process.stdout.write(
      commitMessage(compareBaselines(read(files[0]), read(files[1]))),
    )
  } else if (command === "report" && files.length === 2) {
    process.stdout.write(
      report(compareBaselines(read(files[0]), read(files[1])), {
        ...values,
        limit: values.limit ? Number(values.limit) : undefined,
      }),
    )
  } else {
    usage()
  }
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  await main()
}
