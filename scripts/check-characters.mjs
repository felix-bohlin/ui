import { execFileSync } from "node:child_process"
import { fileURLToPath } from "node:url"
import { FORBIDDEN } from "./forbidden-characters.mjs"

const root = fileURLToPath(new URL("..", import.meta.url))

const matches = (() => {
  try {
    return execFileSync(
      "git",
      [
        "grep",
        "-I",
        "-n",
        "--untracked",
        ...FORBIDDEN.flatMap(({ char }) => ["-e", char]),
      ],
      { cwd: root, encoding: "utf8" },
    )
  } catch (error) {
    if (error.status === 1) return ""
    throw error
  }
})()

const problems = matches
  .split("\n")
  .filter(Boolean)
  .flatMap((line) => {
    const [file, lineNumber, ...rest] = line.split(":")
    const text = rest.join(":")
    return FORBIDDEN.filter(({ char }) => text.includes(char)).map(
      ({ name }) => `${file}:${lineNumber}: ${name}`,
    )
  })

if (problems.length > 0) {
  console.error(problems.join("\n"))
  console.error(
    `\n${problems.length} forbidden character(s). Use a comma, a slash or parentheses instead.`,
  )
  process.exit(1)
}

console.log("No forbidden characters.")
