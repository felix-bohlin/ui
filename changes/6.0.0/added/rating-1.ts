import { components, type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    '`Rating` component (`meter.ui-rating` for a score, `fieldset.ui-rating` for input) in Astro, React, Svelte and Vue: stars drawn with masks. The meter fills the exact fraction and is `max` stars wide, read with typed `attr()` or `--_max`, and `label` names it, or a passed `aria-label`. With `name` it renders a `<fieldset>` of radios, one per star plus a clear radio, that preview on hover and show a `3/5` counter, and takes `clearLabel`, `disabled`, `error`, `lang`, `required`, the sizes (`.ui-small`, `.ui-large`), `starLabel` and `value` as the model, with `defaultValue` and `onValueChange(value)` in React. `starLabel` is plain data, so it crosses a React Server Component boundary: a template per plural form with `{count}` for the number (`{ one: "{count} star", other: "{count} stars" }` by default), picked with `Intl.PluralRules` for the rating\'s `lang`, or English without one. Empty stars are outlines, so they differ from filled ones by shape as well as color in every theme, contrast setting and forced colors (on the meter where typed `attr()` is supported), and read `--ui-field-border-color`, which reaches 3:1 against the page. The stars and the clear icon are masks, `--_star-image`, `--_star-empty-image` and `--_clear-image`. In print, `print-color-adjust: exact` keeps the stars, also when the browser doesn\'t print backgrounds.',
  notes: {
    rating: [
      `New: a <a href="#basics">Rating</a> draws a score as stars in a <code>&lt;meter&gt;</code>, down to a fraction, and with a <a href="#input">name</a> collects one with radios that preview on hover. Empty stars are outlines in the field border color, which reaches 3:1 against the page, so they differ from filled ones by shape as well as color. The stars, the empty stars and the clear icon are masks that <a href="#input"><code>--_star-image</code>, <code>--_star-empty-image</code> and <code>--_clear-image</code></a> replace.`,
      components(
        `<a href="#localization"><code>starLabel</code></a> takes a template per plural form, with <code>{count}</code> where the number goes, and the rating picks the form for its <code>lang</code> with <code>Intl.PluralRules</code>.`,
      ),
    ],
  },
} satisfies Change
