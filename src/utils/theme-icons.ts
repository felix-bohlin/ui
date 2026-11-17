import { ICON_ROLES, iconCreditOf, iconUrl } from "./icon-libraries"
import ICON_SETS from "./icon-sets.json" with { type: "json" }

type IconSet = (typeof ICON_SETS)[keyof typeof ICON_SETS] & {
  packageNote?: string
}

export const ICON_TOKENS = ICON_ROLES.map((role) => `--ui-icon-${role}`)

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
  return set
    ? `${iconCreditOf(set)}\nStylesheet: opui-css/icons/${id}.css sets the same tokens.`
    : ""
}
