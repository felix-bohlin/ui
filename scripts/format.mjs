import { readFileSync } from "node:fs"
import { format } from "oxfmt"

const config = Object.fromEntries(
  Object.entries(
    JSON.parse(
      readFileSync(new URL("../.oxfmtrc.json", import.meta.url), "utf8"),
    ),
  ).filter(([key]) => key !== "$schema" && key !== "ignorePatterns"),
)

export const formatCode = async (code, file, { printWidth } = {}) => {
  const result = await format(file, code, {
    ...config,
    ...(printWidth ? { printWidth } : {}),
  })
  if (result.errors.length > 0) {
    throw new Error(
      `${file}: ${result.errors.map(({ message }) => message).join("; ")}`,
    )
  }
  return result.code
}

export const formatStably = async (code, file) => {
  const formatted = await formatCode(code, file)
  if ((await formatCode(formatted, file)) !== formatted) {
    throw new Error(
      `${file}: the formatter doesn't format the generated code stably`,
    )
  }
  return formatted
}
