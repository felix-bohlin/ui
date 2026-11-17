import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`figma/` holds the default theme resolved for Figma, and the theme tokens page has the example themes too. `figma/themes/default/<mode>.tokens.json` is a DTCG file per mode (`light`, `dark`, `light-more-contrast`, `dark-more-contrast`) for Figma's Import mode: sRGB colors with a hex fallback and the oklch value, lengths in pixels, an alias where a token is another token in that mode, the CSS name as code syntax, scopes and hidden palette steps. `figma/themes/default.figma.json` adds the shadows as effect styles, with each layer bound to variables, and the type roles as text styles. `figma/sync.js` syncs a `.figma.json` into the open file through the Plugin API, with Display P3 colors in a P3 file and a collection per mode on plans with one mode, for the opui Figma plugin and for agents with the Figma MCP server's `use_figma` tool.",
} satisfies Change
