import { execFileSync } from "node:child_process"
import { realpathSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { FORBIDDEN } from "./forbidden-characters.mjs"

const root =
  process.env.OPUI_ROOT ?? fileURLToPath(new URL("..", import.meta.url))

export const findProblems = (matches) =>
  matches
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      const [file, lineNumber, ...rest] = line.split(":")
      const text = rest.join(":")
      return FORBIDDEN.filter(({ char }) => text.includes(char)).map(
        ({ name }) => `${file}:${lineNumber}: ${name}`,
      )
    })

const main = () => {
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

  const problems = findProblems(matches)

  if (problems.length > 0) {
    console.error(problems.join("\n"))
    console.error(
      `\n${problems.length} forbidden character(s). Use a comma, a slash or parentheses instead.`,
    )
    process.exit(1)
  }

  console.log("No forbidden characters.")
}

if (
  process.argv[1] &&
  realpathSync(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  main()
}
