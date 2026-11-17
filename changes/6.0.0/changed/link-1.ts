import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`Link` (`.ui-link`) and rich text links darken in light mode and lighten in dark mode on hover and focus, from their own color so they keep the contrast of `--ui-primary-text`, and their underline gets `--ui-underline-thickness-hover` (`3px`) thick.",
  notes: {
    typography: [
      `<a href="#link">Links</a> read <code>--ui-primary-text</code>, which keeps 4.5:1 on every surface, in a List too.`,
      `<a href="#link">Links</a> and <a href="#inline-text-elements">underlined text</a> read <code>--ui-underline-offset</code>, <code>--ui-underline-offset-small</code> and <code>--ui-underline-thickness-hover</code>.`,
    ],
  },
} satisfies Change
