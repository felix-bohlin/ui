import { execFileSync } from "node:child_process"
import {
  appendFileSync,
  cpSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import path from "node:path"
import { setTimeout } from "node:timers/promises"
import {
  APPS,
  appDir,
  appsDir,
  exampleSource,
  examplesOf,
  root,
} from "./apps.ts"

const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: "1",
  NUXT_TELEMETRY_DISABLED: "1",
}

const run = (label: string, command: string[], cwd: string) => {
  const [bin = "", ...args] = command
  const start = performance.now()
  try {
    execFileSync(bin, args, {
      cwd,
      encoding: "utf8",
      env,
      maxBuffer: 256 * 1024 * 1024,
      stdio: ["ignore", "pipe", "pipe"],
    })
    return { ms: performance.now() - start }
  } catch (error) {
    const { stderr, stdout } = error as { stderr?: string; stdout?: string }
    return {
      error: `${label} failed: ${command.join(" ")} in ${path.relative(root, cwd)}\n${stdout ?? ""}\n${stderr ?? ""}`,
      ms: performance.now() - start,
    }
  }
}

const must = (result: ReturnType<typeof run>) => {
  if (result.error) {
    console.error(result.error)
    process.exit(1)
  }
}

const tarballDir = path.join(appsDir, ".tarball")
rmSync(tarballDir, { force: true, recursive: true })
mkdirSync(tarballDir)
const version = process.env.OPUI_VERSION
console.log(
  version
    ? `Fetching opui-css@${version} from npm`
    : "Packing packages/opui as it would be published",
)
const fetchPublished = async (attempts: number) => {
  const result = run(
    "npm pack",
    ["npm", "pack", `opui-css@${version}`, "--pack-destination", tarballDir],
    tarballDir,
  )
  if (!result.error || attempts <= 1) return result
  console.log("npm doesn't serve it yet, trying again in 30 seconds")
  await setTimeout(30_000)
  return fetchPublished(attempts - 1)
}
must(
  version
    ? await fetchPublished(10)
    : run(
        "pnpm pack",
        ["pnpm", "pack", "--pack-destination", tarballDir],
        path.join(root, "packages/opui"),
      ),
)
const [tarballName] = readdirSync(tarballDir)
const tarball = path.join(tarballDir, tarballName ?? "")

console.log("Installing the apps")
must(run("pnpm install", ["pnpm", "install", "--frozen-lockfile"], appsDir))

const registry = (examples: ReturnType<typeof examplesOf>) => {
  const imports: string[] = []
  const entries = [...examples].map(([slug, files]) => {
    const items = files.map(({ file, name }) => {
      const id = `example${imports.length}`
      imports.push(
        `import ${id} from "./${slug}/${file.replace(/\.tsx$/, "")}"`,
      )
      return `{ Component: ${id}, name: "${name}" }`
    })
    return `  "${slug}": [${items.join(", ")}],`
  })
  return [
    'import type { ComponentType } from "react"',
    ...imports,
    "",
    "export const examples: Partial<",
    "  Record<string, { Component: ComponentType; name: string }[]>",
    "> = {",
    ...entries,
    "}",
    "",
  ].join("\n")
}

const failures: string[] = []
const timings: string[] = []

for (const app of APPS) {
  const dir = appDir(app)
  console.log(`Preparing ${app.name}`)

  const target = path.join(dir, "node_modules/opui-css")
  rmSync(target, { force: true, recursive: true })
  mkdirSync(target, { recursive: true })
  must(
    run(
      "unpack",
      ["tar", "-xzf", tarball, "--strip-components=1", "-C", target],
      dir,
    ),
  )

  const examplesDir = path.join(dir, app.examples)
  rmSync(examplesDir, { force: true, recursive: true })
  const examples = examplesOf(app.framework)
  for (const [slug, files] of examples) {
    mkdirSync(path.join(examplesDir, slug), { recursive: true })
    for (const { file } of files) {
      cpSync(exampleSource(slug, file), path.join(examplesDir, slug, file))
    }
  }
  writeFileSync(
    path.join(examplesDir, "slugs.json"),
    `${JSON.stringify([...examples.keys()], null, 2)}\n`,
  )
  if (app.registry) {
    writeFileSync(path.join(examplesDir, "index.ts"), registry(examples))
    writeFileSync(
      path.join(examplesDir, "elements.tsx"),
      [
        '"use client"',
        "",
        ...readdirSync(path.join(target, "elements"))
          .filter((file) => file.endsWith(".js"))
          .toSorted()
          .map((file) => `import "opui-css/elements/${file}"`),
        "",
        "export default function Elements() {",
        "  return null",
        "}",
        "",
      ].join("\n"),
    )
  }

  const steps = [
    ...app.check.map((command) => ({ command, label: "type check" })),
    ...(app.build.length ? [{ command: app.build, label: "build" }] : []),
  ]
  const times: string[] = []
  for (const { command, label } of steps) {
    const result = run(
      `${app.name} ${label}`,
      ["pnpm", "exec", ...command],
      dir,
    )
    times.push(`${command.join(" ")} ${(result.ms / 1000).toFixed(1)}s`)
    if (result.error) {
      failures.push(result.error)
      break
    }
  }
  timings.push(`| ${app.name} | ${times.join(", ")} |`)
}

const summary = ["| App | Steps |", "| --- | --- |", ...timings, ""].join("\n")
console.log(`\n${summary}`)
if (process.env.GITHUB_STEP_SUMMARY) {
  appendFileSync(
    process.env.GITHUB_STEP_SUMMARY,
    `## App builds\n\n${summary}\n`,
  )
}

if (failures.length) {
  console.error(failures.join("\n\n"))
  process.exit(1)
}
