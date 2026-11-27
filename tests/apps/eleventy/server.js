import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import path from "node:path"

const site = path.resolve("_site")

const TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
}

const fileOf = (pathname) =>
  [pathname, `${pathname}/index.html`, `${pathname}.html`]
    .map((candidate) => path.join(site, candidate))
    .find(
      (file) =>
        file.startsWith(site) && existsSync(file) && statSync(file).isFile(),
    )

createServer((request, response) => {
  const url = new URL(request.url ?? "/", "http://localhost")
  const file = fileOf(decodeURIComponent(url.pathname))
  if (!file) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" })
    response.end(`No page at ${url.pathname}`)
    return
  }
  response.writeHead(200, {
    "content-type": TYPES[path.extname(file)] ?? "application/octet-stream",
  })
  createReadStream(file).pipe(response)
}).listen(Number(process.env.PORT ?? 4410), "localhost")
