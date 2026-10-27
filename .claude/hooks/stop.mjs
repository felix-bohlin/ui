import { execFileSync } from "node:child_process"
import { existsSync } from "node:fs"
import { resolve } from "node:path"
import { checkFiles, report } from "../../scripts/check-staged.mjs"
import { code, input, project } from "./checks.mjs"

const git = (...args) => {
  try {
    return execFileSync("git", args, {
      cwd: project,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "ignore"],
    })
      .split("\n")
      .filter(Boolean)
  } catch {
    return undefined
  }
}

const ratchets = (base) => {
  try {
    execFileSync("node", [`${code}scripts/check-ratchets.mjs`, base], {
      cwd: project,
      encoding: "utf-8",
      stdio: ["ignore", "pipe", "pipe"],
    })
    return []
  } catch (error) {
    return `${error.stderr ?? ""}`.split("\n").filter(Boolean)
  }
}

try {
  if (input().stop_hook_active) process.exit(0)
  const base = git("rev-parse", "--abbrev-ref", "@{upstream}")
    ? "@{upstream}"
    : "HEAD"
  const files = [
    ...new Set([
      ...(git("diff", "--name-only", `${base}...HEAD`) ?? []),
      ...(git("diff", "--name-only", "HEAD") ?? []),
      ...(git("ls-files", "--others", "--exclude-standard") ?? []),
    ]),
  ]
    .filter((file) => existsSync(resolve(project, file)))
    .toSorted()
  if (!files.length) process.exit(0)
  const groups = [
    ...(await checkFiles(files, project)),
    ["Ratchets", ratchets(base)],
  ].filter(([, problems]) => problems.length)
  if (groups.length) {
    console.error(
      report(
        groups,
        "The checks found problems in the files this session changed. Fix them before you finish; pnpm check is still the gate.",
      ),
    )
    process.exit(2)
  }
} catch (error) {
  console.error(`stop hook: ${error.message}`)
  process.exit(1)
}
