import { isSafeToken, normalizeTheme, type Theme } from "./theme"

export const SHARE_PARAM = "theme"

const MAX_LENGTH = 16000

const toBase64Url = (text: string) =>
  btoa(String.fromCodePoint(...new TextEncoder().encode(text)))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replace(/=+$/, "")

const fromBase64Url = (value: string) => {
  const base64 = value.replaceAll("-", "+").replaceAll("_", "/")
  const binary = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, "="))
  return new TextDecoder("utf-8", { fatal: true }).decode(
    Uint8Array.from(binary, (char) => char.codePointAt(0) ?? 0),
  )
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value)

export const encodeTheme = ({ preset, tokens }: Theme) =>
  toBase64Url(JSON.stringify(normalizeTheme({ preset, tokens })))

export const decodeTheme = (value: string | null | undefined) => {
  if (!value || value.length > MAX_LENGTH || !/^[\w-]+$/.test(value)) {
    return null
  }
  try {
    const parsed: unknown = JSON.parse(fromBase64Url(value))
    if (!isRecord(parsed) || !isRecord(parsed.tokens)) return null
    if (parsed.preset !== null && typeof parsed.preset !== "string") {
      return null
    }
    const entries = Object.entries(parsed.tokens)
    if (
      entries.some(
        ([name, token]) =>
          typeof token !== "string" || !isSafeToken(name, token),
      )
    ) {
      return null
    }
    return normalizeTheme(parsed)
  } catch {
    return null
  }
}

export const shareUrl = (theme: Theme, base: string) => {
  const url = new URL("/theme-builder/", base)
  url.searchParams.set(SHARE_PARAM, encodeTheme(theme))
  return url.href
}
