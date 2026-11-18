import {
  ICON_ROLES,
  iconUrl,
  SAMPLE_ICONS,
} from "../../src/utils/icon-libraries"

export const HOSTILE_SVGS = {
  "em-size":
    '<svg width="1em" height="1em" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>',
  "fill-on-shapes":
    '<svg viewBox="0 0 24 24"><path fill="#c00" d="M4 4h16v16H4z"/></svg>',
  "no-fill": '<svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/></svg>',
  "no-viewbox": '<svg width="24" height="24"><path d="M4 4h16v16H4z"/></svg>',
  "non-square": '<svg viewBox="0 0 48 24"><path d="M4 4h40v16H4z"/></svg>',
  "thin-stroke":
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="0.5"><path d="M4 4h16v16H4z"/></svg>',
}

const variants = Object.values(HOSTILE_SVGS)

export const HOSTILE_ICONS = {
  samples: Object.fromEntries(
    SAMPLE_ICONS.map((name, index) => [
      name,
      variants[index % variants.length]!,
    ]),
  ),
  tokens: Object.fromEntries(
    ICON_ROLES.map((role) => [
      `--ui-icon-${role}`,
      iconUrl(HOSTILE_SVGS["non-square"]),
    ]),
  ),
}
