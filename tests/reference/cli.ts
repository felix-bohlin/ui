import { spawn, type ChildProcess } from "node:child_process"
import { createServer } from "node:http"
import path from "node:path"
import { ALL_APPS, appDir, portOf, referenceDir } from "./apps.ts"
import { INDEX_PORT, SCREENS } from "./shared/screens.ts"

const [command, ...rest] = process.argv.slice(2)

const usage = `Usage:
  pnpm reference prepare    pack opui-css, install, type-check and build the apps
  pnpm reference test       run spec/ against the built apps
  pnpm reference dev [app]  start one app's dev server, or all of them and the index
Apps: ${ALL_APPS.map((app) => app.name).join(", ")}`

const children: ChildProcess[] = []
const stop = () => {
  for (const child of children) child.kill("SIGTERM")
}
process.on("SIGINT", () => {
  stop()
  process.exit(130)
})

const run = (bin: string, args: string[], cwd: string, prefix?: string) => {
  const child = spawn(bin, args, {
    cwd,
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: "1",
      NEXT_TELEMETRY_DISABLED: "1",
      NUXT_TELEMETRY_DISABLED: "1",
    },
    shell: prefix !== undefined,
    stdio: prefix === undefined ? "inherit" : "pipe",
  })
  if (prefix !== undefined) {
    const write = (chunk: Buffer) => {
      for (const line of chunk.toString().split("\n").filter(Boolean)) {
        console.log(`${prefix} ${line}`)
      }
    }
    child.stdout?.on("data", write)
    child.stderr?.on("data", write)
  }
  children.push(child)
  return child
}

const exitWith = (child: ChildProcess) =>
  child.on("exit", (code) => process.exit(code ?? 1))

const indexPage = () => {
  const header = ALL_APPS.map((app) => `<th scope="col">${app.name}</th>`)
  const rows = SCREENS.map(
    (screen) =>
      `<tr><th scope="row">${screen.label}</th>${ALL_APPS.map(
        (app) =>
          `<td><a href="http://localhost:${portOf(app)}${screen.path}">${screen.path}</a></td>`,
      ).join("")}</tr>`,
  )
  return `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><title>Reference apps</title>
<style>body{font-family:system-ui;margin:2rem}table{border-collapse:collapse}th,td{padding:.5rem 1rem;text-align:start}</style>
</head>
<body>
<h1>Reference apps</h1>
<table><thead><tr><td></td>${header.join("")}</tr></thead><tbody>${rows.join("")}</tbody></table>
</body>
</html>`
}

if (command === "prepare") {
  exitWith(run("node", [path.join(referenceDir, "prepare.ts")], referenceDir))
} else if (command === "test") {
  exitWith(
    run(
      "pnpm",
      ["exec", "playwright", "test", "-c", "tests/reference", ...rest],
      path.resolve(referenceDir, "../.."),
    ),
  )
} else if (command === "dev") {
  const [name] = rest
  const selected = name ? ALL_APPS.filter((app) => app.name === name) : ALL_APPS
  if (!selected.length) {
    console.error(usage)
    process.exit(1)
  }
  for (const app of selected) {
    run(app.dev, [], appDir(app), name ? "" : `[${app.name}]`)
  }
  if (!name) {
    createServer((_request, response) => {
      response.writeHead(200, { "content-type": "text/html; charset=utf-8" })
      response.end(indexPage())
    }).listen(INDEX_PORT, () => {
      console.log(`Index: http://localhost:${INDEX_PORT}`)
    })
  }
} else {
  console.error(usage)
  process.exit(command ? 1 : 0)
}
