# Theme tokens: the plan before 6.0

A second pass on the five severity 3 findings in [token-review.md](token-review.md), checked against the source and measured in Chromium on 2026-11-26. It corrects the review where the source says otherwise and gives, for each finding, the decision to make, the exact change, what it costs and the check that keeps it fixed.

None of the 6.0 token names has shipped in a stable release (`tests/unit/released-tokens.json` still holds the 5.4.3 names), so every rename and removal here is free until 6.0.0. After that, each one waits for 7.0.

## The token contract

The five fixes come down to five rules. Write them in the Theming guide and in the naming section of `packages/opui/components/AGENTS.md`, and give each one a check:

1. **A token works on every surface it can land on.** No token exists to restate another one for a context (`-on-raised`, `-on-filled`). (Finding 1)
2. **What a consumer reads is ready to use, and what a theme writes keeps the knobs working.** Scaled tokens hold their multiplier, and a theme that overrides one keeps it. (Finding 2)
3. **One word per concept.** The vocabulary is closed, and a test rejects the synonyms. (Finding 3)
4. **Components read roles, never engine parameters.** The public knobs say what they do; the contrast engine's limits are private to `theme.css`. (Finding 4)
5. **Scales leave room.** A step can be added in a minor release without renaming another. (Finding 5)

From 6.0 on, a token added in a minor release defaults to `var()` of an existing token, so every theme written for the earlier minor keeps its look.

## 1. Borders inside raised and filled surfaces

**Verified, and worse than the review said.** `--ui-border-color-on-raised`, `--ui-border-color-on-filled`, `--ui-field-border-color-on-raised` and `--ui-field-border-color-on-filled` (`packages/opui/css/theme.css:401-410,616-631`) don't follow the base token a theme sets, so brutalist's black field borders turn gray inside a card. They also break more contrast in the default theme. Measured with `prefers-contrast: more`:

| Token                         | Light, normal | Light, more | Dark, normal | Dark, more |
| ----------------------------- | ------------- | ----------- | ------------ | ---------- |
| `--ui-border-color`           | L 0.841       | L 0.529     | L 0.348      | L 0.661    |
| `--ui-border-color-on-raised` | L 0.841       | L 0.529     | L 0.27       | **L 0.27** |
| `--ui-border-color-on-filled` | L 0.71        | **L 0.71**  | L 0.35       | **L 0.35** |

Borders inside a dark card, dialog, drawer or menu, and inside any filled surface, stay at normal contrast for a reader who asked for more. And no token covers the tonal surface: the base border measures 1.01:1 against `--ui-surface-tonal` in dark mode.

**Change.** Make the two base borders translucent, and remove the four variants:

```css
--ui-border-color: light-dark(
  color-mix(
    in oklch,
    var(--ui-text-strong) var(--ui-border-strength-light),
    transparent
  ),
  color-mix(
    in oklch,
    var(--ui-text-strong) var(--ui-border-strength-dark),
    transparent
  )
);
--ui-field-border-color: color-mix(
  in oklch,
  var(--ui-text-strong) var(--ui-field-border-strength),
  transparent
);
```

Prototyped in Chromium on the default theme, with the strengths unchanged, composited the way `src/utils/contrast.ts` composites:

| Border                     | Surface | Elevated | Filled | Tonal |
| -------------------------- | ------- | -------- | ------ | ----- |
| Field, light               | 3.61    | 3.61     | 3.24   | 3.48  |
| Field, dark                | 4.65    | 3.96     | 5.08   | 3.96  |
| Field, light, more         | 7.21    | 7.21     | 5.80   | 6.70  |
| Divider, dark (now)        | 1.32    | 1.33     | 1.72   | 1.01  |
| Divider, dark, translucent | 1.39    | 1.38     | 1.30   | 1.38  |

Field borders keep 3:1 on all four surfaces in both schemes, and dividers read the same on every surface. Keep `--ui-border-color-raised`, which is the edge of a raised surface against the page, not a border inside it. Removing the `-on-filled` variants also settles finding 3.9 of the review, where `-filled` and `-on-filled` meant opposite things.

**Cost.** Remove the four variants from `theme.css`, `tokens.json`, the descriptions and tiers, and from the 35 reads in `card.css`, `callout.css`, `drawer.css`, `menu.css` and the others; drop the `-on-filled` lines in bootstrap, brutalist, govuk and shadcn and the `-on-raised` line in govuk. Their CHANGELOG entries and What's new notes go, since 6.0 added them.

**Check before merging.**

- A translucent border composites over the element's own background, since backgrounds paint under borders. Look at the outlined and tonal Button, Chip, Callout and the filled field in brutalist (`--ui-field-bg-color: var(--ui-surface-elevated)`); add `background-clip: padding-box` where a fill should not show through.
- Two translucent borders that overlap draw a darker line. ToggleGroup pulls each item back by its divider width (`toggle-group.css:102`); check the joins there and in ControlGroup.
- The contrast e2e (`tests/e2e/contrast.spec.ts`) on every theme, and the visual baselines with the `update-snapshots` label: every border changes slightly, on purpose.

**Guard.** A test in `tests/unit/css-properties.test.ts` that fails on a token ending in `-on-raised` or `-on-filled`, with a sample it must flag. The contrast promises keep measuring borders against all four surfaces (`src/utils/theme-token-promises.ts:7-12`), and add a promise for `--ui-border-color` under more contrast.

**Related, finding 3.3 of the review.** Most of the more contrast boilerplate in the themes reverts a pinned `--ui-border-color`. With a translucent base, express each theme's border through `--ui-border-strength-light` and `--ui-border-strength-dark` (shadcn's `oklch(0.922 0 0)` is about an 8% strength), and its reverts go.

## 2. Density and the space scale

**Verified, with a correction.** A theme that overrides a scaled token with a plain length drops density: shadcn at `--ui-density: 1.25` gets a 50px default control and a 40px large one. But the review's fix, moving the multiplier to where components read the token, is the wrong way round:

- Radix Themes, its own example, keeps the multiplier in the token: `--space-1: calc(4px * var(--scaling))` in the `tokens.css` of `@radix-ui/themes` 3.3.0.
- Consumers read these tokens far more than themes write them: the docs, blocks and examples read `--ui-space-*` 2,388 times and the control sizes 27 times. With base lengths, each of those reads would have to multiply by the knob itself, and a forgotten one would misalign silently at any density but 1.

**Keep the multiplier in the token, and fix the two real gaps:**

- **A theme's override keeps its knob.** The rule: a theme that sets a scaled token writes `calc(<length> * var(--ui-density))`, or `* var(--ui-space-scale)` for spacing. Mark the scaled tokens in `tokens.json` (`$extensions.opui.scaledBy`), so the test, the Theme builder and the docs read one list. Fix shadcn, bootstrap and govuk.
- **Density on part of a page.** The tokens compute on `html`, `.ui-palette` and `.ui-contrast-more` (`theme.css:261`), so `--ui-density` set on any other element changes nothing, silently. `.ui-palette` already recomputes every token, but the Density and Spacing sections of the Theming guide don't say so. Document it, with an example of a compact toolbar. Consider a name that says what it does before 6.0, since `.ui-palette` reads as color only (`.ui-scope` or `.ui-theme`); that's a class rename, free now.

**Cost.** About 12 lines across three themes, a `tokens.json` extension, two guide sections.

**Guard.** A unit test that reads the scaled list from `tokens.json` and fails when `theme.css`, an example theme or the Theme builder's export sets one without its knob, with a sample it must flag. An e2e case in `tests/e2e/themes.spec.ts`: each theme at `--ui-density: 1.25`, where `--ui-control-size-small < --ui-control-size < --ui-control-size-large` and each is 1.25 times its value at density 1.

## 3. One word per concept

**Verified.** `--ui-surface-elevated` paints every raised surface (dialogs, drawers, menus, the select picker, the Copy bubble), while the naming model keeps `elevated` for the variant; `--ui-palette-tint*` is the fill of `.ui-tonal`; `--ui-press-scale` names the `:active` state outside the `--ui-state-*` family, and so does `--ui-disabled-opacity`.

**Change.** Rename:

| Now                           | 6.0                           | Reads: library, docs, themes |
| ----------------------------- | ----------------------------- | ---------------------------- |
| `--ui-surface-elevated`       | `--ui-surface-raised`         | 16, 48, 11                   |
| `--ui-surface-elevated-image` | `--ui-surface-raised-image`   | 5, 5, 3                      |
| `--ui-palette-tint`           | `--ui-palette-tonal`          | 17, 24, 7                    |
| `--ui-palette-on-tint`        | `--ui-palette-on-tonal`       | 4, 7, 0                      |
| `--ui-palette-tint-subtle`    | `--ui-palette-tonal-subtle`   | 3, 5, 7                      |
| `--ui-press-scale`            | `--ui-state-active-scale`     | 4, 8, 0                      |
| `--ui-disabled-opacity`       | `--ui-state-disabled-opacity` | 14, 5, 4                     |

Keep `--ui-shadow-elevated`: it is the elevated variant's shadow, so its name follows the rule. The palette tint clamps go with finding 4.

**For later, not for 6.0.** m3 paints its menus and its elevated cards from one surface, where Material 3 uses two container shades. Add `--ui-surface-overlay` in a 6.x minor, defaulting to `var(--ui-surface-raised)`, paired with the existing `--ui-shadow-overlay`, and read it in Dialog, Drawer, Menu, Select and Copy. Additive and non-breaking, so it can wait.

**Cost.** A mechanical rename across `packages/opui`, `src`, the themes, `tokens.json`, the MIGRATING rename table (the 5.x rows that point at these names), the CHANGELOG entries and What's new notes that name them, and the blog posts.

**Guard.** A vocabulary test in `tests/unit/css-properties.test.ts`: `elevated` only in `--ui-shadow-elevated`, no `tint`, `press`, `pressed` or `hovered`, and a state word only after `--ui-state-`, each with a sample it must flag.

## 4. The knobs

**Verified, with a correction.** There are 48 knobs (`src/utils/theme-token-tiers.ts:4-53`): 31 that say what they do, and 17 limits of the contrast engine (the `-max-lightness`, `-min-lightness` and `-max-chroma` ones), not 25. The 17 limits matter for three reasons:

- Their names don't predict their targets: `--ui-text-max-lightness` doesn't touch `--ui-text`, and `--ui-accent-max-*` touches no `-accent` role.
- Their color scheme hides in `max` and `min`, and flips for the tint limits.
- Five components compute colors from four of them themselves (`button.css`, `badge.css`, `choice.css`, `control-group.css`, `copy.css`), so the engine leaks into the components.

Only govuk sets any (`--ui-accent-fill-max-lightness` and `--ui-text-max-lightness`, to let its brand colors through), and the Theme builder exposes none.

**Change (recommended).**

1. **Components read roles.** Move the four computations into `theme.css` as roles the components read: the intent fill under light text (today `min(l, var(--ui-accent-fill-max-lightness))` in Button, Badge, Copy and ControlGroup), the checked choice fill in dark mode, and the intent text color Copy derives.
2. **The 17 limits become private to `theme.css`.** Rename them to `--_ui-*`, which `tests/unit/released-tokens.json` and `tokens.json` don't list, and drop them from the tiers, the descriptions and the Theme tokens page. More contrast keeps working, since it re-declares them the same way.
3. **govuk pins roles instead.** It sets its link and button colors on `--ui-primary-text` and the intent fills, and reverts those under more contrast, as it now reverts the two limits.
4. **The public knobs stay as they are:**
   - `--ui-color-scheme`, `--ui-contrast`, `--ui-density`, `--ui-space-scale`, `--ui-motion`, `--ui-target-min-size`;
   - the palette and primary sources, the gray hue and chroma, `--ui-shadow-color` and the fluid range;
   - the six strengths, the seven state alphas and the two code background alphas.

**Fallback, if you'd rather keep them public.** Rename them by target and scheme, `--ui-primary-max-lightness-light`, `--ui-primary-min-lightness-dark` and so on, with an `intent-text` target for the text limits, and drop the word `accent` from every limit. Clearer, but it freezes one contrast algorithm into 6.x, so a better engine (APCA, a new palette curve) would need 7.0.

**Cost.** Four new roles, about 60 renames inside `theme.css`, 11 component reads, govuk, the docs that list the limits, and the CHANGELOG entries that name them (`--ui-accent-fill-max-lightness`, `--ui-choice-fill-max-lightness`, `--ui-primary-source`'s limits).

**Guard.** `scripts/check-css-vars.mjs` already fails when component CSS reads a property outside `--ui-*` and its own `--_*`, so a component reading `--_ui-*` fails it. Add a sample to `tests/unit/css-properties.test.ts` that a `-max-lightness`, `-min-lightness` or `-max-chroma` token outside `--_ui-` must fail.

## 5. The space scale

**Verified.** `--ui-space-1` to `--ui-space-8` are 0.25, 0.5, 1, 1.25, 1.5, 1.75, 2 and 3rem. There is no 0.75rem, so `field.css:657` and `list.css:333` rebuild it as `calc(var(--ui-space-2) * 1.5)`, and with ordinal names no step can be added without renaming the next ones.

**Change: name each step by its multiple of 0.25rem**, the convention Tailwind made familiar. Steps 1 and 2 already follow it, so they keep their names, and they are 187 of the library's 292 space reads:

| Now            | Value   | 6.0                  |
| -------------- | ------- | -------------------- |
| `--ui-space-1` | 0.25rem | `--ui-space-1`       |
| `--ui-space-2` | 0.5rem  | `--ui-space-2`       |
|                | 0.75rem | `--ui-space-3` (new) |
| `--ui-space-3` | 1rem    | `--ui-space-4`       |
| `--ui-space-4` | 1.25rem | `--ui-space-5`       |
| `--ui-space-5` | 1.5rem  | `--ui-space-6`       |
| `--ui-space-6` | 1.75rem | `--ui-space-7`       |
| `--ui-space-7` | 2rem    | `--ui-space-8`       |
| `--ui-space-8` | 3rem    | `--ui-space-12`      |

A later step slots in by its own number (`--ui-space-10` for 2.5rem), and the name tells the size at a scale of 1. The review's alternative, Polaris-style `--ui-space-100` to `--ui-space-1200`, renames every read and gives "hundreds" a second meaning next to `--ui-font-size-100` to `900`.

**Cost.** 105 library reads and the steps 3 to 8 in `src`, renamed from the highest step down so no name collides (8 to 12 first, 3 to 4 last), then the two `calc()` rebuilds become `--ui-space-3`. Update the MIGRATING section that maps `--size-*` (`packages/opui/MIGRATING.md:195`) and its regular expressions.

**Risk.** `--ui-space-3` to `-8` keep existing but mean other sizes, so an rc tester's CSS changes silently. The rc.8 notes need a `sed` script in the same descending order (below), and Fredahead needs the same pass.

**Guard.** A test that reads the space tokens from `theme.css` and fails when a step's number isn't its value divided by 0.25rem, with a sample it must flag.

## Order of work

All of it lands in one release candidate, so rc testers migrate once:

1. **Decide** finding 4 (private limits, or the fallback) and whether `.ui-palette` gets a neutral name.
2. **Renames, mechanical, one commit each:** findings 3 and 5, then the limits of finding 4. Update `tokens.json`, the tiers and descriptions, the themes, MIGRATING, the CHANGELOG entries and What's new notes that name them (in place, since 6.0 adds every one of these tokens), and the blog posts.
3. **Behavior:** finding 1 (translucent borders, the variants removed), the four roles of finding 4, the density fixes of finding 2.
4. **Guards:** the five tests above, each with its sample.
5. **Verify:** `pnpm check`, `pnpm test:e2e` (contrast, themes, stress), the `e2e-engines` label, then the `update-snapshots` label for the border and spacing changes, said in the commit message as intended.
6. **rc.8:** publish, with an upgrade note for rc testers:

```sh
sed -i -E \
  -e 's/--ui-space-8\b/--ui-space-12/g' -e 's/--ui-space-7\b/--ui-space-8/g' \
  -e 's/--ui-space-6\b/--ui-space-7/g' -e 's/--ui-space-5\b/--ui-space-6/g' \
  -e 's/--ui-space-4\b/--ui-space-5/g' -e 's/--ui-space-3\b/--ui-space-4/g' \
  -e 's/--ui-surface-elevated/--ui-surface-raised/g' \
  -e 's/--ui-palette-on-tint/--ui-palette-on-tonal/g' \
  -e 's/--ui-palette-tint/--ui-palette-tonal/g' \
  -e 's/--ui-press-scale/--ui-state-active-scale/g' \
  -e 's/--ui-disabled-opacity/--ui-state-disabled-opacity/g' \
  <files>
```

Remove `--ui-border-color-on-raised`, `--ui-border-color-on-filled` and the two field variants by hand, since their values move into the base tokens.

## Left for 6.x, additive

- `--ui-surface-overlay`, defaulting to `--ui-surface-raised` (finding 3).
- The severity 2 findings of the review that add tokens rather than rename them: the status role sets, the hover shade deltas, `tokens.json` in the stable DTCG 2025.10 format.
- The severity 2 renames (`--ui-line-height`, the font weights by role, `--ui-font-family-*`) can't wait: they belong in this same candidate, or they stay until 7.0. Decide them with step 1.
