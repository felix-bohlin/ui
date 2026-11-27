# opui-css 6.0 theme tokens: a design systems review

Branch `feat/new-components-and-fixes`, package `6.0.0-rc.7`. A review of the theme tokens against professional design systems, from 2026-11-26.

## 1. Verdict

The token system holds up well against the professional systems, and it does better than most of them in four places. Every theme sets tokens only. Contrast is promised and tested per token. Palettes re-derive inside scope classes. The focus model is the richest of the peers. All six example themes stay inside the token API: none targets a component class or sets a `--_*` property. That is rare, and it shows the API is not constraining. It is not yet consistent, though. Two things cost every theme today. Context variants (`-on-raised`, `-on-filled`) don't follow the base token a theme sets. Size tokens have `--ui-density` baked into their values, so overriding one silently drops density. Both bugs are already visible in five of the six shipped themes (measured in Chromium, see 3.1 and 3.2). The vocabulary has a handful of synonyms: `elevated` vs `raised`, `tint` vs `tonal`, `active` vs `press`. Some names don't predict what they do: the `--ui-text-max-*` knobs don't touch `--ui-text`, `--ui-line-height` is not the page line height, `--ui-font-weight-bold` is 500 in two themes. The spacing scale has a 12px hole that ordinal names make impossible to fill later. And 48 knobs, 25 of them contrast-engine clamps with implicit light/dark directions, are about to become 6.x API. None of the 333 tokens has shipped in a stable release yet: `tests/unit/released-tokens.json` still holds the 5.4.3 names. So every rename below is free now and costs a major version after 6.0. My recommendation: fix the severity 3 items before 6.0, especially the two derivation bugs, the synonyms, the knob surface and the space scale. Treat the rest as 6.x work.

Severity: **3** = change before 6.0 because it is API (a name, a value's meaning or the public surface). **2** = worth doing. **1** = polish.

## 2. Method and limits

- Read `packages/opui/css/theme.css`, `core/palette.css`, `tokens.json`, `src/utils/theme-token-{tiers,descriptions,promises}.ts`, `src/utils/theme-tokens.ts`, the Theme tokens, Theming and Concepts guides, section 9 of `packages/opui/components/AGENTS.md`, `tests/unit/css-properties.test.ts`, `MIGRATING.md`, the 6.0 CHANGELOG and the six themes.
- Built a token-to-component usage map over `css/components`, `css/compat` and `core` (multi-line `var()` and style queries included).
- Measured in Chromium against the real stylesheets and themes: border colors inside raised surfaces, and density with theme overrides.
- Reference systems: web fetch was blocked in this session (`nordhealth.design` and `ui.shadcn.com` failed DNS; they would have to be allowed in the session's network settings). I verified the details I cite with web search where I could: Nord naming, Atlassian elevation, M3 state layers, Radix alpha scales, Primer modifiers, the DTCG 2025.10 status. The rest comes from my knowledge of those systems, and I kept to facts I'm confident about.

## 3. Findings

Groups follow the order of the brief. Within a group, findings go from highest severity to lowest.

### 3.1 Derivation: context variants don't follow their base (severity 3)

**Evidence.** Raised components remap the page borders to the `-on-raised` pair on their root (`css/components/card.css:66-67,76-77`, `callout.css:47-48`, `drawer.css:23,25`, `menu.css:31-32`). But `--ui-border-color-on-raised` and `--ui-field-border-color-on-raised` (`theme.css:406-410,620-631`) are their own formulas of `--ui-text-strong` and `--ui-surface-elevated`. They are not derived from `--ui-border-color` or `--ui-field-border-color`. All six themes set `--ui-border-color` and five set `--ui-field-border-color`, but **no theme sets `--ui-border-color-on-raised`**, and only govuk sets `--ui-field-border-color-on-raised`. Measured in Chromium (light mode, a field on the page vs inside an elevated `Card`):

| Theme     | Border on page         | Border in card         | Field border on page   | Field border in card   |
| --------- | ---------------------- | ---------------------- | ---------------------- | ---------------------- |
| default   | oklch(0.8406 0.01 255) | same                   | oklch(0.57 0.01 255)   | same                   |
| bootstrap | oklch(0.91 0.007 248)  | oklch(0.875 0.002 341) | oklch(0.91 0.007 248)  | oklch(0.631 0.005 304) |
| brutalist | oklch(0 0 0)           | oklch(0.83 0 0)        | oklch(0 0 0)           | oklch(0.5 0 0)         |
| shadcn    | oklch(0.922 0 0)       | oklch(0.855 0 0)       | oklch(0.922 0 0)       | oklch(0.573 0 0)       |
| m3        | oklch(0.83 0.018 308)  | oklch(0.841 0.012 311) | oklch(0.567 0.016 308) | oklch(0.597 0.011 309) |

Brutalist's black field borders turn mid-gray inside every card, dialog, drawer and menu, and shadcn's faint inputs turn dark there. In dark mode, shadcn's translucent `oklch(1 0 0 / 0.15)` field border becomes an opaque `oklch(0.595 0 0)`. The `-on-filled` pair has the same shape (`theme.css:401-405,616-619`), and four themes patch it by hand (`--ui-border-color-on-filled: var(--ui-border-color)` in bootstrap, brutalist, govuk and shadcn).

**Peers.**

- Radix gives every scale an alpha variant (`gray-a6` and so on), tuned to look right over any background, so one border token serves every surface.
- M3 has one `outline` and one `outline-variant` across all five `surface-container-*` levels.
- Atlassian keeps a single `color.border` over its four elevation surfaces (sunken, default, raised, overlay).

None of them asks a theme to restate its border per surface.

**Recommendation.** Make the base border tokens translucent mixes, so one value works on every surface. For example:

```css
--ui-border-color: color-mix(
  in oklch,
  var(--ui-text-strong) var(--ui-border-strength-light),
  transparent
);
```

Wrap it in `light-dark()` with the `-dark` strength, and the same goes for `--ui-field-border-color` with `--ui-field-border-strength`. Then default `--ui-border-color-on-raised`, `--ui-border-color-on-filled` and the two field variants to `var()` of their base. Or better, remove all four before 6.0, since a translucent base makes them redundant: the TODO item at `TODO.md:1129` added them only to fix dark mode contrast on the lighter raised surface, and an alpha mix fixes that by construction. The contrast promises already measure against all four surfaces (`theme-token-promises.ts:7-12`), so they keep guarding it. If you keep the variants, at least add a theme test: a theme that sets `X` must also set `X-on-raised` and `X-on-filled`. Then fix the five themes.

### 3.2 Derivation: density is baked into token values (severity 3)

**Evidence.** `--ui-control-size*`, `--ui-chip-size-x-small`, `--ui-choice-size*` and all twelve `--ui-switch-*-size*` tokens are `calc(<length> * var(--ui-density))` (`theme.css:368-438`). A theme that sets a literal value drops density for that step and nothing warns it. m3 and brutalist remembered to write `calc(18px * var(--ui-density))`. shadcn, bootstrap and govuk didn't. With `--ui-density: 1.25` added on top of each theme, Chromium computes:

| Theme     | control-size-small | control-size | control-size-large | choice-size | switch track |
| --------- | ------------------ | ------------ | ------------------ | ----------- | ------------ |
| default   | 40px               | 50px         | 60px               | 25px        | 30px         |
| shadcn    | 32px               | **50px**     | **40px**           | 16px        | 18.4px       |
| bootstrap | 40px               | 50px         | 60px               | 16px        | 16px         |
| govuk     | 40px               | 50px         | 60px               | 40px        | 30px         |

In shadcn the default control becomes taller than the large one, and in bootstrap checkboxes and switches stop scaling. Spacing has the same trap: `--ui-space-1` to `--ui-space-8` and `--ui-divider-gap` multiply `--ui-space-scale` inside the token (`theme.css:351-358,413`).

**Peers.**

- Radix Themes keeps its tokens as base lengths and applies `--scaling` where they are used, so a theme's literal still scales.
- M3 expresses density as steps (0, -1, -2, -3) that the component subtracts from its own height.

In neither system is the multiplier part of the token's value.

**Recommendation.** Before 6.0, change what the tokens mean: `--ui-control-size: 2.5rem` (the base length), and each component multiplies once in its private size, `--_size: calc(var(--ui-button-size) * var(--ui-density))`. Do the same for spacing (`--ui-space-3: 1rem`, multiplied by `--ui-space-scale` at the read site, or in one `--_gap`/`--_padding` per component). The names stay; only the values change. That is exactly why it has to happen before the API freezes. Then simplify the m3 and brutalist overrides to plain lengths.

### 3.3 Derivation: literal theme values opt out of more contrast, and every theme repeats the same boilerplate (severity 2)

**Evidence.** Under more contrast, the library tightens knobs (`theme.css:674-735`). A theme that pins a role to a literal keeps its literal, unless it reverts it. Every example theme does that twice, once in `@media (prefers-contrast: more)` and once in `:where(.ui-contrast-more, ...)`:

- m3: `themes/m3.css:166-183`
- shadcn: `themes/shadcn.css:126-146`
- bootstrap: `themes/bootstrap.css:209-249`, with eight blocks once its severity overrides are counted

The token most often reset this way is `--ui-border-color`: it appears 18 times across the six themes.

**Peers.**

- M3 and Primer ship high contrast as separate schemes (standard, medium and high contrast, `light_high_contrast`), so a theme author designs each scheme on purpose.
- GOV.UK has a single scheme.

The opui approach is more automatic than any of them, but it leaks this boilerplate into every theme.

**Recommendation.** Flip the default. The library re-declares the few contrast-critical derived roles under more contrast in a sublayer ordered after `theme.custom`, the same way `theme.severity` already comes after it. Those roles are `--ui-border-color`, `--ui-field-border-color`, `--ui-text-subtle` and `--ui-focus-ring-color`. A pinned literal then loses to the safe value automatically, and only a theme that really wants to keep its literal under more contrast writes something. In the example themes, express borders and text through the `-strength-light` and `-strength-dark` knobs where possible: shadcn's `oklch(0.922 0 0)` border is roughly an 8% strength. They then need no revert at all.

### 3.4 Naming: one concept, two words (severity 3)

**Evidence.**

- **elevated vs raised.** The naming model says "`elevated`, `filled` and `tonal` only [name] their variants. `raised` is any surface above the page" (`components/AGENTS.md`, Naming tokens). Yet `--ui-surface-elevated` paints every raised surface: dialogs, drawers, menus, the select picker and the Copy bubble (`card.css:11`, `drawer.css:4`, `menu.css:4`, `select.css:38`, `copy.css:16`). The edge and the borders inside the same surfaces are `--ui-border-color-raised` and `--ui-border-color-on-raised`. Meanwhile `--ui-shadow-elevated` really is the variant's shadow (cards and accordions only), and dialogs use `--ui-shadow-overlay`. So "elevated" means "the variant" in the shadow token and "any raised surface" in the surface token.
- **tint vs tonal.** `.ui-tonal` buttons and avatars paint `--ui-primary-tonal` with a fallback of `--ui-palette-tint` (`button.css:206-209`, `avatar.css:9-10`), and tonal callouts and chips paint `--ui-palette-tint-subtle` (`callout.css:56`, `chip.css:74`). Two words name one fill.
- **active vs press.** The rule says "`active` only names the `:active` press", and the state knobs follow it (`--ui-state-active-alpha-*`). But the pressed scale is `--ui-press-scale` (`button.css:235`, `chip.css:66`, `toggle-button.css:70`).
- **opacity vs alpha** is a real distinction (element opacity vs color alpha), so keep both. But `--ui-disabled-opacity` sits outside the `--ui-state-*` family that holds every other state knob.

**Peers.**

- Atlassian names one ladder for both background and shadow: `elevation.surface.raised` with `elevation.shadow.raised`, and `elevation.surface.overlay` with `elevation.shadow.overlay`.
- M3 uses one word per concept (`surface-container`, `primary-container`).
- Nord's naming guide fixes the color pattern to role, modifier and theme, with a closed set of modifiers.

**Recommendation (exact names).**

- `--ui-surface-elevated` -> `--ui-surface-raised`, and `--ui-surface-elevated-image` -> `--ui-surface-raised-image`. Keep `--ui-shadow-elevated`, which is the variant. Or, if you would rather split dialogs and menus from elevated cards, follow Atlassian: `--ui-surface-raised` for cards and `--ui-surface-overlay` for dialogs, menus and pickers, paired with the existing `--ui-shadow-overlay`.
- `--ui-palette-tint` -> `--ui-palette-tonal`, `--ui-palette-on-tint` -> `--ui-palette-on-tonal`, `--ui-palette-tint-subtle` -> `--ui-palette-tonal-subtle`, and `--ui-palette-tint-{max,min}-lightness` -> `--ui-palette-tonal-{max,min}-lightness`.
- `--ui-press-scale` -> `--ui-state-active-scale`.
- `--ui-disabled-opacity` -> `--ui-state-disabled-opacity` (polish, but cheap now).

### 3.5 Naming and surface: 48 knobs, and the contrast clamps don't say what they clamp (severity 3)

**Evidence.** `theme-token-tiers.ts:4-53` lists 48 knobs. Twenty-five of them are contrast-engine limits. Their names don't predict their targets, and their light/dark direction is implicit:

- `--ui-text-max-lightness`, `--ui-text-min-lightness` and `--ui-text-max-chroma` do not affect `--ui-text`. They clamp the intent `-text` roles (`theme.css:462-560`). Meanwhile `--ui-text-strength-light` and `--ui-text-strength-dark` do affect `--ui-text`.
- `--ui-accent-max-lightness` clamps the named colors, `--ui-neutral` and `--ui-palette-accent`. `--ui-accent-max-chroma` clamps `--ui-primary`, `--ui-invalid` and `--ui-palette-text`. Neither touches any `*-accent` role, and "accent" also names `--ui-palette-accent` (a shade) and `--ui-control-accent`, `--ui-button-accent` and `--ui-choice-accent` (a control's color). That is three meanings for one word.
- `max` applies in light mode and `min` in dark for text, border and primary. For `--ui-palette-tint-*` it is the other way round (`theme.css:776-783`). The rule "`light` and `dark` only name a color scheme" exists, but here the scheme hides inside `max`/`min`.

These are tuning parameters of one particular algorithm. Once 6.0 ships, `released-tokens.json` will lock every one of them, and switching the engine (APCA, a new palette curve) would then need 7.0.

**Peers.**

- M3's dynamic color takes contrast as one number (`contrastLevel`, -1 to 1), not per-role clamps.
- Primer ships high contrast as separate themes.
- Radix exposes no contrast knobs at all.

**Recommendation.** Before 6.0, either:

- **(A, recommended)** Keep the public contrast API to `--ui-contrast`, the `-strength-*` mixes and `--ui-text-disabled-strength`. Move the 20 `*-min-lightness`, `*-max-lightness` and `*-max-chroma` clamps into a documented "tuning" tier marked unstable in `tokens.json` (`$extensions.opui.stability: "unstable"`), and keep them out of `released-tokens.json`. Or
- **(B)** Rename them by target and scheme so each name is self-explanatory: `--ui-text-max-lightness` -> `--ui-intent-text-max-lightness-light`, `--ui-text-min-lightness` -> `--ui-intent-text-min-lightness-dark`, `--ui-text-max-chroma` -> `--ui-intent-text-max-chroma-dark`, `--ui-accent-max-lightness` -> `--ui-intent-max-lightness-light`, `--ui-accent-max-chroma` -> `--ui-primary-max-chroma-dark`, `--ui-accent-fill-max-lightness` -> `--ui-intent-fill-max-lightness`.

Either way, retire the free-standing word "accent" from knob names.

### 3.6 Units: the space scale has a 12px hole that ordinal names can't fill later (severity 3)

**Evidence.** `--ui-space-1` to `--ui-space-8` are 0.25, 0.5, 1, 1.25, 1.5, 1.75, 2 and 3rem (`theme.css:351-358`). That is Open Props' `--size-1` to `--size-8` (`README.md:5`, "started from Open Props"). There is no 0.75rem and no 0.125rem, and components rebuild both:

- `calc(var(--ui-space-2) * 1.5)` in `field.css:657` and `list.css:333`
- `calc(var(--ui-space-1) / 2)` in `list.css:149,381` and `table.css:214`
- `calc(var(--ui-space-1) * 0.75)` in `field.css:643`

Usage is front-heavy: steps 1 to 3 are read 86, 101 and 62 times, steps 5 to 8 only 9, 3, 3 and 3 times. With ordinal names, a 12px step can only be added by renumbering, which is a breaking change.

**Peers.**

- Polaris (`--p-space-050` 2px, `-100` 4px, `-300` 12px, `-400` 16px ...) and Atlassian (`space.025`, `space.050`, `space.075`, `space.100`, `space.150` 12px ...) name steps by multiples of a base unit, so a step can be inserted later.
- Carbon and Radix use ordinals, but both include 12px (`spacing-04`; `--space-3`).

**Recommendation.** Rename now to multiplier names over a 4px unit: `--ui-space-50` (0.125rem), `-100` (0.25rem), `-200` (0.5rem), `-300` (0.75rem, new), `-400` (1rem), `-500` (1.25rem), `-600` (1.5rem), `-700` (1.75rem), `-800` (2rem), `-1200` (3rem). The edit is mechanical (about 290 reads), and 6.0 users are already migrating from `--size-*`. If that is too much churn, the minimum is to renumber with 0.75rem as step 3 before the freeze. Note that `--ui-font-size-100` to `900` uses hundreds as ordinals (100 = 12px). If spacing moves to multiplier names, either accept the two meanings of "hundreds" or move the type scale to ordinals (`--ui-font-size-1` to `9`).

### 3.7 Naming: `--ui-line-height` is not the page line height (severity 2)

**Evidence.** The naming model says "The default of a family is the bare name ... `--ui-line-height` and `--ui-line-height-control`". But `html` reads `--ui-line-height-relaxed` (`core/normalize.css:22`), and the bare `--ui-line-height` (1.6) is documented for "captions, List text, the Stat label and description and the Stepper description". Five of six themes set both to 1.5 (bootstrap, brutalist, m3 and shadcn; govuk sets all three to 1.3158), which suggests authors can't tell them apart. The family also mixes scale words (`tight`, `relaxed`) with role words (`control`).

**Peers.**

- M3 ties line height to typescale roles (`body-large.line-height`).
- Primer's text tokens pair size and line height per role (`text-body-lineHeight-medium`).

**Recommendation.** Use roles that mirror the font-size roles:

- `--ui-line-height-relaxed` -> `--ui-line-height-body`
- `--ui-line-height` -> `--ui-line-height-small` (it serves the caption and small text)
- keep `--ui-line-height-control` and `--ui-line-height-tight`

Drop the bare name, so no token pretends to be the family default.

### 3.8 Naming: font weights are named by value but act as roles (severity 2)

**Evidence.** `--ui-font-weight-normal`, `-medium`, `-semibold` and `-bold` (`theme.css:69-72`) are what components read for body, badges and overlines, labels and table headers, and headings, buttons and terms. Themes remap them by role, which breaks the names:

- bootstrap: `--ui-font-weight-bold: 500` and `--ui-font-weight-semibold: 700`, so semibold is heavier than bold
- m3: bold and semibold are both 500
- govuk: `--ui-font-weight-medium: 400`
- brutalist: `--ui-font-weight-normal: 500`

**Peers.**

- Primer keeps `fontWeight-normal` to `fontWeight-bold` as base values and puts the role weights in text tokens (`text-title-weight-large`).
- M3 attaches a weight to each typescale role.

Value names are fine as primitives, but here they are the only layer.

**Recommendation.** Rename to roles before 6.0: `--ui-font-weight-body` (was normal), `--ui-font-weight-emphasis` (was medium: badges, overlines, group labels), `--ui-font-weight-label` (was semibold: labels, table headers, titles) and `--ui-font-weight-heading` (was bold: headings and terms). `--ui-button-font-weight` and `--ui-link-font-weight` already exist. If you keep the value names, document that they must stay ordered and add a theme test for normal <= medium <= semibold <= bold.

### 3.9 Naming: `-filled` and `-on-filled` mean opposite things (severity 2)

**Evidence.** `--ui-control-border-color-filled` is the border _of_ a filled control. `--ui-border-color-on-filled` and `--ui-field-border-color-on-filled` are borders drawn _on_ a filled surface. The rule is documented ("`-filled` for a filled control, `-on-{surface}` for what is drawn on a surface"), but the two are a two-character edit apart and appear side by side in themes (`brutalist.css`: `--ui-control-border-color-filled` next to `--ui-border-color-on-filled`). Also, `--ui-surface-filled` paints lists without a variant and table headers, not only the `.ui-filled` variant, which breaks the "filled only names its variant" rule.

**Peers.** Primer (`bgColor-inset`) and Atlassian (`elevation.surface.sunken`) name the recessed surface by its depth, not by a component variant.

**Recommendation.** `--ui-surface-filled` is darker than the page in both modes (`--ui-gray-4` on `--ui-gray-1`, `--ui-gray-15` on `--ui-gray-13`), which is a sunken surface. Rename `--ui-surface-filled` -> `--ui-surface-sunken`, and `-on-filled` -> `-on-sunken`. That frees "filled" to name only the control variant, as the model wants. If 3.1 removes the `-on-*` variants, only the surface rename remains.

### 3.10 Naming: family tokens collide with size tokens (severity 2)

**Evidence.** `--ui-font-body`, `--ui-font-heading` and `--ui-font-code` (families) sit next to `--ui-font-size-body` (a size). `--ui-font-body` reads like a shorthand.

**Peers.** Polaris has `--p-font-family-sans` and `-mono`, Primer `fontStack-sansSerif` and `fontStack-monospace`, Open Props `--font-sans` and `--font-mono`.

**Recommendation.** Rename to `--ui-font-family-body`, `--ui-font-family-heading` and `--ui-font-family-code`. This is cheap now.

### 3.11 Symmetry: status roles have uneven sets (severity 2)

**Evidence.**

| Role     | Base            | `-text` | `on-`                 | Tonal / subtle                                | Border        | Icon                          | Scope class    |
| -------- | --------------- | ------- | --------------------- | --------------------------------------------- | ------------- | ----------------------------- | -------------- |
| critical | `--ui-critical` | yes     | shared `--ui-on-fill` | via scope                                     | via scope     | `--ui-icon-critical`          | `.ui-critical` |
| info     | `--ui-info`     | yes     | shared `--ui-on-fill` | via scope                                     | via scope     | `--ui-icon-info`              | `.ui-info`     |
| invalid  | `--ui-invalid`  | yes     | none                  | none                                          | (is a border) | `--ui-icon-invalid` (Stepper) | none           |
| neutral  | `--ui-neutral`  | yes     | shared `--ui-on-fill` | via scope                                     | via scope     | none                          | `.ui-neutral`  |
| primary  | `--ui-primary`  | yes     | `--ui-on-primary`     | `--ui-primary-tonal`, `--ui-on-primary-tonal` | none          | n/a                           | `.ui-palette`  |
| success  | `--ui-success`  | yes     | shared `--ui-on-fill` | via scope                                     | via scope     | `--ui-icon-success`           | `.ui-success`  |
| warning  | `--ui-warning`  | yes     | `--ui-on-warning`     | via scope                                     | via scope     | `--ui-icon-warning`           | `.ui-warning`  |

Warning alone has its own `on-` token. The fill under `--ui-on-fill` has no token (`oklch(from <intent> min(l, var(--ui-accent-fill-max-lightness)) c h)` is written out in `badge.css:70`, `button.css:194` and `control-group.css:114`). A theme that wants Bootstrap's exact alert colors must restyle the scope classes: `bootstrap.css:115-207` sets five palette roles in each of five severity scopes, and `bootstrap.css:230-248` reverts them again under more contrast. The scope model is good (it is how Radix scopes an accent color), but the flat API doesn't line up with it.

**Peers.**

- Primer gives each role `fgColor-<role>`, `bgColor-<role>-emphasis`, `-muted` and `-subtle`, plus `borderColor-<role>-*`, with one `fgColor-onEmphasis`.
- M3 has `error`, `on-error`, `error-container` and `on-error-container`.
- Polaris has `bg-fill-critical`, `text-critical`, `border-critical` and `bg-surface-critical`.

**Recommendation.** For 6.0, add `--ui-on-critical`, `--ui-on-info`, `--ui-on-neutral` and `--ui-on-success`, each defaulting to `var(--ui-on-fill)`, so every intent has the same pair and the asymmetry of `--ui-on-warning` goes away. Document the scope classes as the official way to set per-intent tint, border and text (with the five palette roles as the per-intent API), so Bootstrap-style overrides are API and not a workaround. Consider a token for the intent fill too (`--ui-critical-fill` and the others), since three components already repeat its formula.

### 3.12 Completeness: the named colors are a half-set that will be frozen (severity 2)

**Evidence.** `--ui-blue`, `--ui-green`, `--ui-orange` and `--ui-red` (`theme.css:446-458`) are read by no component, only as defaults of the intents. `--ui-orange` has no `light-dark()` and no `--ui-accent-max-lightness` clamp, unlike the other three. Four hues is too few for the stated use ("when you literally want a green/red/etc. dot"), and the blocks already reach for missing ones.

**Peers.**

- Primer and Radix ship full hue scales (13 and 30).
- shadcn ships none (only `chart-1` to `chart-5`), and M3 ships none.

Either a full set or none; a partial set is the worst option to freeze.

**Recommendation.** Remove them from the public API before 6.0 and write the literal into the intent defaults (`--ui-critical: light-dark(oklch(...))`). If they stay, make them uniform (`--ui-orange` gets the same `light-dark()` and clamp) and plan the full hue set for the chart palette that `TODO.md` defers.

### 3.13 Tiering: the tier labels don't match their definitions (severity 2)

**Evidence.** The definitions say a component token is "read by one component", a primitive is "derived from the knobs, read by no component", and "each tier reads from the ones before it" (`concepts.astro`, Token tiers; `theme-tokens.astro:37-44`). The tier lists in `theme-token-tiers.ts` actually sort by name prefix:

- Component-tier tokens read by several components: `--ui-button-size-x-small` (button, file-upload, reactions, toggle-button and toggle-group), `--ui-card-padding` (button, card, choice and drawer), `--ui-divider-gap` (callout, card, divider and drawer), `--ui-button-radius` (button, copy, toggle-button and toggle-group).
- Role-tier tokens read by exactly one component: `--ui-shadow-selected` (tabs), `--ui-underline-hover-thickness` (link), `--ui-letter-spacing-display` (typography), `--ui-on-warning` (badge).
- Primitives that read a role: `--ui-radius-large` reads `--ui-radius`. A knob that reads a primitive: `--ui-primary-source` reads `--ui-color-6` (`theme.css:530-536`).

The tiers are exported in `tokens.json` (`$extensions.opui.tier`), so tools will rely on them.

**Peers.** Spectrum and Primer define tiers by data flow (global, then alias, then component; base, then functional), and their build pipeline derives the tier.

**Recommendation.** Compute tiers from the usage map in a test, with the same scan this review used, instead of keeping hand lists. Or redefine "component" as "named after a component, may be read by its relatives". Reclassify `--ui-radius` and `--ui-primary-source`. On the positive side, components never read a palette step: no `--ui-color-N` or `--ui-gray-N` appears in `css/components`, which the `check-css-vars` script enforces.

### 3.14 Flexibility: the shade-on-hover deltas are hard-coded (severity 2)

**Evidence.** The translucent state layer is fully tokenized (`--ui-state-{hover,active}-alpha-{light,dark,accent}`). The default "shade" hover is not:

- `button.css:36-46`: L +/-0.05, 0.1, 0.075, 0.15
- `chip.css:219-221` and `toggle-button.css:121-123`: the same numbers again
- `link.css:34-45`: L x0.8 and x1.15
- `--ui-surface-tonal-hover`: x0.93 and x1.1, in `theme.css:596-599` and again in `button.css:128-129,184-185`

A theme can switch modes with `--ui-button-hover` but cannot make the shade subtler or stronger.

**Peers.** Polaris (`--p-color-bg-fill-brand-hover`, `-active`), Atlassian (`color.background.brand.bold.hovered`, `.pressed`) and Fluent (`colorBrandBackgroundHover`, `Pressed`) expose the state color. M3 exposes the state-layer opacity.

**Recommendation.** Add two knobs, `--ui-state-hover-shade` and `--ui-state-active-shade` (a lightness delta, defaulting to today's numbers), and read them in the five places. These are additive, so they can come in 6.x.

### 3.15 Completeness: smaller asymmetries (severity 1)

- `--ui-text-subtle` defaults to `var(--ui-text)` (`theme.css:581`), so the three-level text hierarchy is two levels until a theme sets it, and five of six themes do. Every peer has a distinct muted text: shadcn `muted-foreground`, Primer `fgColor-muted`, Nord `--n-color-text-weak`, Carbon `text-secondary`. Give it a distinct default that still passes the 4.5:1 promise on all four surfaces (a value change, fine in 6.x).
- `--ui-field-padding-inline` has default and `-large` only, while `--ui-button-padding-inline` has four steps.
- `--ui-icon-size-x-small` and `--ui-radius-large` are read by nothing. That's fine as scale completers, but it is surface area.
- In dark mode `--ui-surface-tonal` and `--ui-surface-elevated` are the same gray (`--ui-gray-12`, `theme.css:592,595`). This is already tracked in `TODO.md:4845`.

### 3.16 Units: smaller points (severity 1)

- **Radius.** `--ui-radius-small: min(5px, var(--ui-radius))` and `--ui-radius-x-small: min(2px, ...)` cap a rem base with absolute px, and `-large` is x1.5. So the steps aren't proportional, and three themes set `--ui-radius-small` by hand. Radix scales every step by `--radius-factor`, and M3 has a fixed ladder (4, 8, 12, 16, 28, full). Consider `calc(var(--ui-radius) * 0.625)` and `* 0.25`, still clamped to the base.
- **Motion** is sound: seconds, three durations, enter, exit and move easings, and a multiplier. `--ui-motion: 0` under reduced motion removes fades as well as movement. M3 and Carbon guidance keeps opacity transitions. That could become a knob in 6.x.
- **Elevation** is by use (`control`, `surface`, `elevated`, `overlay`, `scroll`, `selected`, plus `--ui-shadow-color`). That's a good choice, and a level scale would duplicate it (`TODO.md:5658` already decided this). Only the surface-shadow word mismatch in 3.4 remains.
- **z-index**: no tokens are needed, because overlays use the top layer. That is better than Polaris's 12 z-index tokens.
- **Defaults most themes undo.** `--ui-backdrop-blur` is reset in 6 of 6 themes (5 to `0px`), `--ui-letter-spacing-display` and `-heading` in 5 of 6 (to 0), `--ui-choice-ripple-bg-color` in 5 of 6, and the line heights in 5 of 6 (see 3.7). These are not API problems, but a neutral base (blur 0, tracking 0) would make themes shorter.

### 3.17 tokens.json: typed values that aren't spec values (severity 2)

**Evidence.** `tokens.json` says it uses the W3C format (`src/docs/guide/theme-tokens.astro:160-180`). It does use native values for plain lengths and numbers (`--ui-radius` is `{"unit":"rem","value":0.5}`). But typed tokens often carry CSS strings:

- `$type: "cubicBezier"` with `"cubic-bezier(0, 0, 0.3, 1)"`, and `"ease"` for `--ui-ease`
- `$type: "dimension"` with `"calc(0.25rem * var(--ui-space-scale))"`
- `$type: "color"` with `"light-dark(var(--ui-gray-1), var(--ui-gray-13))"`
- aliases written as `var()`, not `{group.token}`

The Design Tokens Format Module reached its first stable version, 2025.10, on 28 October 2025, so consumers (Style Dictionary, Tokens Studio, Figma variable importers) will validate against it. The file is a package export, so its shape is API.

**Recommendation.** Before 6.0, never put a `$type` on a value that is a CSS expression. Either omit `$type` there and keep the expression in `$extensions.opui.css`, or resolve it per mode into a spec value and use `{...}` aliases. That lets the Figma work on `feat/figma` (`TODO.md:5646`) build on a stable schema.

### 3.18 Painful to change after 6.0

Ordered by cost of waiting:

1. 3.2: the meaning of the size and space tokens (density and scale baked in).
2. 3.1: the `-on-raised` and `-on-filled` variants (remove or alias).
3. 3.5: the 25 contrast clamps in the public surface.
4. 3.6: the space-step names.
5. 3.4: `--ui-surface-elevated`, `--ui-palette-tint*` and `--ui-press-scale`.
6. 3.7, 3.8, 3.10: the line-height, font-weight and font-family names.
7. 3.9: `--ui-surface-filled` and the `-on-filled` names.
8. 3.11 and 3.12: per-intent `on-` tokens; the named colors.
9. 3.17: the `tokens.json` schema.

Additive items (3.14, the `--ui-motion` refinement, the chart palette) can wait for 6.x.

## 4. What the system does well compared with the peers

- **Themes need nothing but tokens.** Bootstrap, brutalist, GOV.UK, M3, shadcn and Vice City are expressed with no component selector and no `--_*` override; only the documented scope classes appear. Peer libraries usually need component overrides to look like another system.
- **Contrast is a promise with a test.** `theme-token-promises.ts` holds 4.5:1 and 3:1 guarantees per role against every surface, in light, dark and more contrast, with named exceptions per theme. `--ui-on-primary` and `--ui-on-warning` flip between white and near-black by relative luminance, and the focus ring picks black or white per surface. M3 dynamic color is the only peer with comparable automation.
- **Palette scopes** (`.ui-critical`, `.ui-palette` and the others) re-derive every role inside an element, like Radix's accent scoping, and also follow the more-contrast knobs.
- **Focus model**: ring color, width, style, offset and inset, a focus border with its own width, and a highlight mode with its `on-` color for GOV.UK-style focus. That is more than any peer's token set.
- **Icons as tokens.** 17 role icons as mask URLs plus four sizes, swappable per theme. Spectrum, Polaris and Primer don't theme their icons through tokens.
- **Accessibility-aware knobs** that peers lack: `--ui-target-min-size` (WCAG 2.5.8), `--ui-safe-area-inset-*` in logical directions with right-to-left swapping, logical `-inline-size` and `-block-size` names throughout, and `--ui-motion`.
- **Separate density and spacing** (`--ui-density` for controls, `--ui-space-scale` for containers) is finer than Radix's single `--scaling`. Section 3.2 is only about where the multiplier is applied.
- **Enforced naming.** `css-properties.test.ts` bans `-height`, `-width`, `-space`, `-contrast` and bare `-color`, checks that every `on-` token has a fill, and holds the state-ending rule. Every token has a description, and the hook concept (one optional role that unifies several components' defaults) is a clean answer to "set once, apply everywhere".

## 5. Sources

Reference sources consulted through search: [Nord naming](https://nordhealth.design/design/foundations/naming), [Nord tokens changelog](https://nordhealth.design/changelog/tokens), [Atlassian elevation](https://atlassian.design/foundations/elevation), [Radix scales](https://www.radix-ui.com/colors/docs/palette-composition/understanding-the-scale), [Radix Themes color](https://www.radix-ui.com/themes/docs/theme/color), [Primer token names](https://primer.style/foundations/primitives/token-names), [Flutter M3 state tokens](https://flutter.googlesource.com/mirrors/flutter/+/a5d5cd7a7bc6b77f438e3bf427b415e8dd915cfb/dev/tools/gen_defaults/data/state.json), [DTCG 2025.10 announcement](https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/).
