import { format } from "oxfmt"
import rc from "../.oxfmtrc.json" with { type: "json" }

const config = Object.fromEntries(
  Object.entries(rc).filter(
    ([key]) => key !== "$schema" && key !== "ignorePatterns",
  ),
)

export const formatCode = async (code, file, options = {}) => {
  const result = await format(file, code, {
    ...config,
    ...Object.fromEntries(
      Object.entries(options).filter(([, value]) => value !== undefined),
    ),
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
