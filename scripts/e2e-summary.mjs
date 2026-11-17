import { existsSync, readFileSync, realpathSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { parseArgs, stripVTControlCharacters } from "node:util"

const testsOf = (root) => {
  const suites = [{ path: [], suite: root }]
  for (const { path, suite } of suites) {
    for (const child of suite.suites ?? []) {
      suites.push({ path: [...path, child.title], suite: child })
    }
  }
  return suites.flatMap(({ path, suite }) =>
    (suite.specs ?? []).flatMap((spec) =>
      spec.tests.map((test) => ({
        file: spec.file,
        line: spec.line,
        project: test.projectName,
        results: test.results,
        status: test.status,
        timeout: test.timeout,
        title: [...path, spec.title].join(" › "),
      })),
    ),
  )
}

const firstLine = (text) =>
  stripVTControlCharacters(text ?? "")
    .trim()
    .split("\n")[0]
    .slice(0, 120)

const byName = (a, b) =>
  `${a.file} ${a.title} ${a.project}`.localeCompare(
    `${b.file} ${b.title} ${b.project}`,
    "en",
  )

export const summarize = (report, { share = 0.7 } = {}) => {
  const tests = Array.from(report.suites ?? [], (suite) =>
    testsOf(suite),
  ).flat()
  const flaky = tests
    .filter((test) => test.status === "flaky")
    .map((test) => ({
      ...test,
      attempts: test.results.map((result) => result.status),
      error: firstLine(
        test.results.find((result) => result.status !== "passed")?.error
          ?.message,
      ),
    }))
    .toSorted(byName)
  const slow = tests
    .filter((test) => test.status !== "skipped" && test.timeout > 0)
    .map((test) => {
      const longest = Math.max(
        0,
        ...test.results.map((result) => result.duration),
      )
      return { ...test, longest, share: longest / test.timeout }
    })
    .filter((test) => test.share >= share)
    .toSorted(byName)
  return { flaky, share, slow, tests: tests.length }
}

const cell = (text) => String(text).replaceAll("|", "\\|")

const name = (test) => cell(`${test.file}:${test.line} › ${test.title}`)

const seconds = (ms) => `${Math.round(ms / 100) / 10}s`

export const markdown = ({ flaky, share, slow, tests }, title = "e2e") => {
  const percent = `${Math.round(share * 100)}%`
  const lines = [`## ${title}`, ""]
  if (tests === 0) return `${[...lines, "No test results."].join("\n")}\n`
  if (flaky.length === 0 && slow.length === 0) {
    lines.push(
      `No flaky test, and no test used ${percent} of its time limit, in ${tests} tests.`,
    )
    return `${lines.join("\n")}\n`
  }
  if (flaky.length > 0) {
    lines.push(
      `### ${flaky.length} flaky, passed only on a retry`,
      "",
      "| Test | Project | Attempts | First error |",
      "| --- | --- | --- | --- |",
      ...flaky.map(
        (test) =>
          `| ${name(test)} | ${cell(test.project)} | ${test.attempts.join(", ")} | ${cell(test.error)} |`,
      ),
      "",
    )
  }
  if (slow.length > 0) {
    lines.push(
      `### ${slow.length} used ${percent} or more of the time limit`,
      "",
      "| Test | Project | Longest attempt | Limit | Share |",
      "| --- | --- | --- | --- | --- |",
      ...slow.map(
        (test) =>
          `| ${name(test)} | ${cell(test.project)} | ${seconds(test.longest)} | ${seconds(test.timeout)} | ${Math.round(test.share * 100)}% |`,
      ),
      "",
    )
  }
  return `${lines.join("\n")}\n`
}

const main = () => {
  const { positionals, values } = parseArgs({
    allowPositionals: true,
    options: {
      share: { type: "string" },
      title: { type: "string" },
    },
  })
  const [file] = positionals
  if (!file) {
    console.error(
      "Usage: node scripts/e2e-summary.mjs <report.json> [--title <title>] [--share <0-1>]",
    )
    process.exit(1)
  }
  if (!existsSync(file)) {
    process.stdout.write(
      `## ${values.title ?? "e2e"}\n\nNo report at ${file}.\n`,
    )
    return
  }
  const summary = summarize(JSON.parse(readFileSync(file, "utf8")), {
    share: values.share ? Number(values.share) : undefined,
  })
  process.stdout.write(markdown(summary, values.title))
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
