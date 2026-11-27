import { spawn } from "node:child_process"
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import path from "node:path"

const site = path.resolve("_site")

const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
}

const fileOf = (pathname) =>
  [pathname, `${pathname}/index.html`, `${pathname}.html`]
    .map((candidate) => path.join(site, candidate))
    .find(
      (file) =>
        file.startsWith(site) && existsSync(file) && statSync(file).isFile(),
    )

const send = (response, status, file) => {
  response.writeHead(status, {
    "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
  })
  createReadStream(file).pipe(response)
}

if (process.argv.includes("--watch")) {
  spawn("pnpm", ["exec", "eleventy", "--watch"], { stdio: "inherit" })
}

createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost")
  const pathname = decodeURIComponent(url.pathname)
  const partner = url.searchParams.get("with")
  const file =
    (pathname === "/chat" && partner && fileOf(`/chat/${partner}`)) ||
    fileOf(pathname)
  if (file) send(response, 200, file)
  else send(response, 404, path.join(site, "404.html"))
}).listen(Number(process.env.PORT ?? 4506), process.env.HOST ?? "localhost")
