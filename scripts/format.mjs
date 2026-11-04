import { format, resolveConfig } from "prettier"

export const formatCode = async (code, file, { printWidth } = {}) =>
  format(code, {
    ...(await resolveConfig(file)),
    filepath: file,
    ...(printWidth ? { printWidth } : {}),
  })

export const formatStably = async (code, file) => {
  const formatted = await formatCode(code, file)
  if ((await formatCode(formatted, file)) !== formatted) {
    throw new Error(
      `${file}: the formatter doesn't format the generated code stably`,
    )
  }
  return formatted
}
