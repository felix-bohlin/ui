import { ICON_ROLES, iconUrl } from "./icon-libraries"
import ICON_SETS from "./icon-sets.json" with { type: "json" }

type IconSet = (typeof ICON_SETS)[keyof typeof ICON_SETS] & {
  packageNote?: string
}

export const ICON_TOKENS = ICON_ROLES.map((role) => `--ui-icon-${role}`)

const FRAMEWORK_NAMES = { react: "React", svelte: "Svelte", vue: "Vue" }

const sets: Record<string, IconSet> = ICON_SETS

const libraryTokens = Object.fromEntries(
  Object.entries(sets).map(([id, set]) => [
    id,
    Object.fromEntries(
      ICON_ROLES.map((role) => [`--ui-icon-${role}`, iconUrl(set.icons[role])]),
    ),
  ]),
)

export const iconTokensOf = (id: string) => libraryTokens[id] ?? null

export const iconLibraryOf = (tokens: Record<string, string>) =>
  Object.keys(libraryTokens).find((id) =>
    ICON_TOKENS.every((token) => tokens[token] === libraryTokens[id]![token]),
  ) ?? null

export const iconExport = (tokens: Record<string, string>) => {
  const id = iconLibraryOf(tokens)
  return id ? { comment: iconCredit(id), tokens: ICON_TOKENS } : null
}

export const iconCredit = (id: string) => {
  const set = sets[id]
  if (!set) return ""
  const components = Object.entries(set.frameworks)
    .map(
      ([framework, name]) =>
        `${name} (${FRAMEWORK_NAMES[framework as keyof typeof FRAMEWORK_NAMES]})`,
    )
    .join(", ")
  return [
    `Icons: ${set.name} ${set.version} (${set.license}), ${set.copyright}, ${set.url}`,
    `SVG files: ${set.package}${set.packageNote ? `, ${set.packageNote}` : ""}.${components ? ` Components: ${components}.` : ""}`,
  ].join("\n")
}
