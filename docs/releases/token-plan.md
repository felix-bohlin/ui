# Theme tokens: the plan before 6.0

A second pass on the five severity 3 findings in [token-review.md](token-review.md), checked against the source and measured in Chromium on 2026-11-26. It corrects the review where the source says otherwise and gives, for each finding, the decision to make, the exact change, what it costs and the check that keeps it fixed.

A review of this plan against the source at `8a3c58b9` changed five things, each marked **Reviewed** below: the dark `-on-raised` border does follow more contrast (finding 1), `.ui-palette` is part of what a theme writes (finding 2), the vocabulary test was too wide (finding 3), two limits can't become private (finding 4), and the `sed` script becomes a command (Order of work). A second review changed four more, marked **Second review**: themes describe their design at density 1 (finding 2), the two accent guards are named after `--ui-control-accent` (finding 4), the upgrade command can't tell a second run from the file alone (Order of work), and the renames are proven unchanged by computed styles before any baseline moves (Order of work).

Decided on 2026-11-26: 15 limits private and two accent guards, and `.ui-palette` renamed `.ui-scope`. Open: the three severity 2 renames, and how far the upgrade command goes.

None of the 6.0 token names has shipped in a stable release (`tests/unit/released-tokens.json` still holds the 5.4.3 names), so every rename and removal here is free until 6.0.0. After that, each one waits for 7.0.

## The token contract

The five fixes come down to five rules. Write them in the Theming guide and in the naming section of `packages/opui/components/AGENTS.md`, and give each one a check:

1. **A token works on every surface it can land on.** No token exists to restate another one for a context (`-on-raised`, `-on-filled`). (Finding 1)
2. **What a consumer reads is ready to use, and what a theme writes keeps the knobs working.** Scaled tokens hold their multiplier, and a theme that overrides one keeps it. (Finding 2)
3. **One word per concept.** The vocabulary is closed, and a test rejects the synonyms. (Finding 3)
4. **Components read roles and documented knobs, never the engine's internals.** The public knobs say what they do; the contrast engine's own limits are private to `theme.css`. (Finding 4)
5. **Scales leave room.** A step can be added in a minor release without renaming another. (Finding 5)

From 6.0 on, a token added in a minor release defaults to `var()` of an existing token, so every theme written for the earlier minor keeps its look.

## 1. Borders inside raised and filled surfaces

**Verified, and wider than the review said.** `--ui-border-color-on-raised`, `--ui-border-color-on-filled`, `--ui-field-border-color-on-raised` and `--ui-field-border-color-on-filled` (`packages/opui/css/theme.css:401-410,616-631`) don't follow the base token a theme sets, so brutalist's black field borders turn gray inside a card. One of them also breaks more contrast in the default theme. Measured with `prefers-contrast: more`:

| Token                               | Light, normal | Light, more | Dark, normal | Dark, more |
| ----------------------------------- | ------------- | ----------- | ------------ | ---------- |
| `--ui-border-color`                 | L 0.841       | L 0.529     | L 0.348      | L 0.661    |
| `--ui-border-color-on-raised`       | L 0.841       | L 0.529     | L 0.419      | L 0.697    |
| `--ui-border-color-on-filled`       | L 0.71        | **L 0.71**  | L 0.35       | **L 0.35** |
| `--ui-field-border-color`           | L 0.570       | L 0.406     | L 0.625      | L 0.767    |
| `--ui-field-border-color-on-raised` | L 0.570       | L 0.406     | L 0.665      | L 0.791    |
| `--ui-field-border-color-on-filled` | L 0.500       | L 0.364     | L 0.570      | L 0.734    |

**Reviewed.** An earlier version of this table had the dark `-on-raised` border at L 0.27 in both columns. It is L 0.419 and L 0.697: its formula reads `--ui-border-strength-dark`, which more contrast raises. Only `--ui-border-color-on-filled` is stuck, since it is `light-dark(var(--ui-gray-6), var(--ui-gray-12))` with no strength in it.

So dividers inside any filled surface stay at normal contrast for a reader who asked for more. And no token covers the tonal surface: the base border (L 0.348) measures 1.01:1 against `--ui-surface-tonal` (L 0.35) in dark mode. The case for the change rests on the themes as much as on more contrast: all five themes that set a border patch a variant by hand, and only govuk patches a `-on-raised` one, so the other four lose their field border inside every card, dialog, drawer and menu.

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

**Reviewed.** The prototype reproduces on `8a3c58b9` within 0.04 of every number above, and in all six themes, both schemes and both contrast modes. Vice City, which keeps the default formulas on its own surfaces, holds 3.10:1 or more for the field border everywhere. The themes that pin an opaque border measure what they do today, including the two that are already low on the tonal surface in dark mode (m3's field border at 2.93:1 and its divider at 1.01:1): the strength knobs under Related below fix those.

Two things make the change safe: no component derives another color from the border tokens (no relative color or `color-mix()` reads them), and a theme that pins an opaque border, like brutalist's black, keeps it on every surface.

Field borders keep 3:1 on all four surfaces in both schemes, and dividers read the same on every surface. Keep `--ui-border-color-raised`, which is the edge of a raised surface against the page, not a border inside it. Removing the `-on-filled` variants also settles finding 3.9 of the review, where `-filled` and `-on-filled` meant opposite things.

**Cost.** Remove the four variants from `theme.css`, `tokens.json`, the descriptions and tiers, and from the 21 reads in `callout.css`, `card.css`, `drawer.css`, `list.css`, `menu.css`, `select.css` and `table.css`; drop the ten theme lines: the two `-on-filled` lines in bootstrap, brutalist, govuk and shadcn, the field one in m3 (`m3.css:44`) and the `-on-raised` line in govuk. Their CHANGELOG entries and What's new notes go, since 6.0 added them.

**Check before merging.**

- A translucent border composites over the element's own background, since backgrounds paint under borders. Look at the outlined and tonal Button, Chip, Callout and the filled field in brutalist (`--ui-field-bg-color: var(--ui-surface-elevated)`); add `background-clip: padding-box` where a fill should not show through.
- Two translucent borders that overlap draw a darker line. ToggleGroup pulls each item back by its divider width (`toggle-group.css:102`); check the joins there and in ControlGroup. If a join looks wrong, fix the join (one item draws the shared edge) and keep the single token: a dark join is no reason to bring the variants back.
- Light field borders on the filled surface are at 3.24:1, a thin margin. The contrast promises must measure the field border against all four surfaces in every theme, both schemes and both contrast modes, so a theme with a darker filled surface fails there.
- The contrast e2e (`tests/e2e/contrast.spec.ts`) on every theme, and the visual baselines with the `update-snapshots` label: every border changes slightly, on purpose.

**Guard.** A test in `tests/unit/css-properties.test.ts` that fails on a token ending in `-on-raised` or `-on-filled`, with a sample it must flag. The contrast promises keep measuring borders against all four surfaces (`src/utils/theme-token-promises.ts:7-12`), and add a promise for `--ui-border-color` under more contrast.

**Related, finding 3.3 of the review.** Most of the more contrast boilerplate in the themes reverts a pinned `--ui-border-color`. With a translucent base, express each theme's border through `--ui-border-strength-light` and `--ui-border-strength-dark` (shadcn's `oklch(0.922 0 0)` is about an 8% strength), and its reverts go.

## 2. Density and the space scale

**Verified, with a correction.** A theme that overrides a scaled token with a plain length drops density: shadcn at `--ui-density: 1.25` gets a 50px default control and a 40px large one. But the review's fix, moving the multiplier to where components read the token, is the wrong way round:

- Radix Themes, its own example, keeps the multiplier in the token: `--space-1: calc(4px * var(--scaling))` in the `tokens.css` of `@radix-ui/themes` 3.3.0.
- Consumers read these tokens far more than themes write them: the docs, blocks and examples read `--ui-space-*` 2,388 times and the control sizes 27 times. With base lengths, each of those reads would have to multiply by the knob itself, and a forgotten one would misalign silently at any density but 1.

**Keep the multiplier in the token, and fix the two real gaps:**

- **A theme's override keeps its knob.** The rule: a theme that sets a scaled token writes `calc(<length> * var(--ui-density))`, or `* var(--ui-space-scale)` for spacing, or a value built from another scaled token. It writes it on the scope selector (`:where(html, .ui-scope, .ui-contrast-more)`, as all six themes do), because `theme.css` declares the roles again on every scope and an override on `html` alone is lost inside one. Mark the scaled tokens in `tokens.json` (`$extensions.opui.scaledBy`), so the test, the Theme builder and the docs read one list. Fix shadcn, bootstrap and govuk.
- **Density on part of a page.** The tokens compute on `html`, `.ui-palette` and `.ui-contrast-more` (`theme.css:261`), so `--ui-density` set on any other element changes nothing, silently. `.ui-palette` already recomputes every token, but the Density and Spacing sections of the Theming guide don't say so. Document it, with an example of a compact toolbar. Rename it to `.ui-scope` before 6.0, since `.ui-palette` reads as color only. The Theming guide already calls the section Scopes (`#scopes`), and `.ui-theme` would be worse: the class applies no theme.

**Second review.** Wrapping the themes' literals in the multiplier changes how they look, because two of them set a density of their own. shadcn renders 32, 36 and 40px controls today: its own `2rem` and `2.5rem` for small and large, and the library's `2.5rem` at its `--ui-density: 0.9` for the default. Wrapped, small and large become 28.8px and 36px, and the large control is as tall as the default. Bootstrap's `1rem` checkbox does the same at 0.95. So the rule gets a sentence: **a theme that sets its own density writes each length it wants at that density, divided by it**: shadcn's small control is `calc(2rem * var(--ui-density) / 0.9)`, 32px as today and scaled from there.

**Done (2026-11-26).** Implemented that way rather than with density 1 for every theme, which the second review proposed: the Theme builder offers density as a setting and exports it, so a theme setting `--ui-density` is normal, and banning it would contradict the builder. The builder's own presets ("Closer" controls, the compact switch) and its card and list padding ranges had the same bug and now keep `--ui-density` or `--ui-space-scale` too (`scale: "space"`).

**Reviewed.** This is more than a class rename. `.ui-palette` is in the selector every theme writes (line 5 of all six themes, and `.ui-contrast-more .ui-palette` in their more contrast rules) and in 21 files of the library and docs. So the rename changes what theme authors write, belongs in the MIGRATING table, and the upgrade command covers it (Order of work). It is still free now and not after 6.0.0.

**Cost.** About 20 lines across three themes, a `tokens.json` extension, two guide sections, a theme mode for `npx opui-css check`, and the `.ui-scope` rename.

**Guard.** A unit test that reads the scaled list from `tokens.json` and fails when `theme.css`, an example theme or the Theme builder's export sets one without its knob, when a theme sets `--ui-density`, or when a theme declares roles on a selector without the scope class, with a sample it must flag. The same rule ships in `npx opui-css check` for a theme file (`packages/opui/bin/check.mjs`): without it the rule protects the six themes here, and a third-party theme still gets no warning, which was the finding. An e2e case in `tests/e2e/themes.spec.ts`: each theme at `--ui-density: 1.25`, on the page and on a scope, where `--ui-control-size-small < --ui-control-size < --ui-control-size-large` and each is 1.25 times its value at density 1.

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

**Guard.** A vocabulary test in `tests/unit/css-properties.test.ts`: `elevated` only in `--ui-shadow-elevated`, no `tint`, `press`, `pressed` or `hovered`, and every state knob under `--ui-state-`: a token that names a state (`active`, `disabled`, `hover`, `selected`) and ends in `-alpha-*`, `-opacity` or `-scale`. Each with a sample it must flag.

**Reviewed.** The rule was "a state word only after `--ui-state-`". That fails on tokens this plan keeps, where the state is a variant of a role or a role of its own: `--ui-text-disabled`, `--ui-text-disabled-strength`, `--ui-surface-tonal-hover`, `--ui-underline-hover-thickness`, `--ui-shadow-selected`, `--ui-selected-strong`, `--ui-on-selected-strong`, and the `--ui-focus-*` and `--ui-invalid*` families. The naming section says it in one line: a role takes its state as a suffix, and a knob that tunes a state across components lives under `--ui-state-`.

## 4. The knobs

**Verified, with a correction.** There are 48 knobs (`src/utils/theme-token-tiers.ts:4-53`): 31 that say what they do, and 17 limits of the contrast engine (the `-max-lightness`, `-min-lightness` and `-max-chroma` ones), not 25. The 17 limits matter for three reasons:

- Their names don't predict their targets: `--ui-text-max-lightness` doesn't touch `--ui-text`, and `--ui-accent-max-*` touches no `-accent` role.
- Their color scheme hides in `max` and `min`, and flips for the tint limits.
- Five components compute colors from four of them themselves (`button.css`, `badge.css`, `choice.css`, `control-group.css`, `copy.css`), so the engine leaks into the components.

Only govuk sets any (`--ui-accent-fill-max-lightness` and `--ui-text-max-lightness`, to let its brand colors through), and the Theme builder exposes none.

**Change.**

1. **Components read roles where the input is a role.** Five of the 11 reads clamp a role, so `theme.css` can hold the result:
   - the intent fills under light text, `--ui-critical-fill`, `--ui-info-fill`, `--ui-neutral-fill` and `--ui-success-fill` (today `min(l, var(--ui-accent-fill-max-lightness))` in `badge.css:70`, `button.css:194` and `control-group.css:114`);
   - the checked choice fills in dark mode, `--ui-choice-fill` and `--ui-choice-fill-invalid` (`choice.css:11,185`).

   Declare them next to the intent roles, so the severity scopes derive them again.

2. **Two limits stay public, as accent guards.** The other six reads (`button.css:12-13`, `choice.css:116-117`, `copy.css:30-31`) clamp `--_accent`, which comes from the hooks `--ui-button-accent`, `--ui-choice-accent` and `--ui-control-accent`. `theme.css` never sees a color a hook supplies, so no role can hold the result, and `check-css-vars` rejects a component reading `--_ui-*`. Making these two private would drop the dark mode clamp from every hooked accent. They get names that say the target and the scheme, like `--ui-border-strength-dark` does, and a place in the docs next to the accent hooks:

   | Now                       | 6.0                                      | What it does                                    |
   | ------------------------- | ---------------------------------------- | ----------------------------------------------- |
   | `--ui-text-max-chroma`    | `--ui-control-accent-max-chroma-dark`    | Mutes a control's accent color in dark mode.    |
   | `--ui-text-min-lightness` | `--ui-control-accent-min-lightness-dark` | Lightens a control's accent color in dark mode. |

   **Second review.** The first names, `--ui-accent-text-*`, had two faults. In Choice the clamp colors the checked mark's fill (`--_mark-bg-color`), not text. And the fallback below drops the word "accent" from every limit, while a free-standing `--ui-accent-` prefix names no role family. All three reads fall back through `--ui-control-accent`, so the guards take its name.

   A later engine can keep honoring two guards far more easily than 17 clamps.

3. **The other 15 limits become private to `theme.css`.** Rename them to `--_ui-*`, which `tests/unit/released-tokens.json` and `tokens.json` don't list, and drop them from the tiers, the descriptions and the Theme tokens page. More contrast keeps working, since it re-declares them the same way. Private is by convention and by the released list: a theme can still set a `--_ui-*` property, and the Theming guide says those names may change in any release.
4. **govuk pins roles instead.** It sets its link and button colors on `--ui-primary-text` and the intent fills, and reverts those under more contrast, as it now reverts the two limits. That keeps some of the boilerplate finding 1 removes, in the one theme that pins brand colors.
5. **The other public knobs stay as they are:**
   - `--ui-color-scheme`, `--ui-contrast`, `--ui-density`, `--ui-space-scale`, `--ui-motion`, `--ui-target-min-size`;
   - the palette and primary sources, the gray hue and chroma, `--ui-shadow-color` and the fluid range;
   - the six strengths, the seven state alphas and the two code background alphas.

**Fallback, if you'd rather keep them public.** Rename them by target and scheme, `--ui-primary-max-lightness-light`, `--ui-primary-min-lightness-dark` and so on, with an `intent-text` target for the text limits, and drop the word `accent` from every limit. Clearer, but it freezes one contrast algorithm into 6.x, so a better engine (APCA, a new palette curve) would need 7.0.

**Cost.** Six new roles, two renamed knobs, about 55 renames inside `theme.css`, 11 component reads that change name or become a role read, govuk, the docs that list the limits, and the CHANGELOG entries that name them (`--ui-accent-fill-max-lightness`, `--ui-choice-fill-max-lightness`, `--ui-primary-source`'s limits).

**Guard.** `scripts/check-css-vars.mjs` already fails when component CSS reads a property outside `--ui-*` and its own `--_*`, so a component reading `--_ui-*` fails it. Add a sample to `tests/unit/css-properties.test.ts` that a `-max-lightness`, `-min-lightness` or `-max-chroma` token outside `--_ui-` must fail, with the two accent guards as its only exceptions.

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

A later step slots in by its own number (`--ui-space-10` for 2.5rem), and the name tells the size at a scale of 1. A half step needs a rule now, since a custom property name can't hold a dot without escaping: a hyphen stands for the decimal point, so 0.125rem would be `--ui-space-0-5`. 6.0 adds none; the rule only keeps the names free. The review's alternative, Polaris-style `--ui-space-100` to `--ui-space-1200`, renames every read and gives "hundreds" a second meaning next to `--ui-font-size-100` to `900`.

**Cost.** 105 library reads and the steps 3 to 8 in `src`, then the two `calc()` rebuilds become `--ui-space-3`.

**Reviewed.** Rename through temporary names, not from the highest step down. First every step from 3 to 8 becomes `--ui-space-tmp-<new>`. At that point a missed read is an undefined property that `pnpm check-css-vars` reports, where a descending rename would leave it as a valid name that is 4px to 16px off. Then the temporary names become the final ones and the new `--ui-space-3` is added. Update the MIGRATING section that maps `--size-*` (`packages/opui/MIGRATING.md:195`) and its regular expressions.

**Second review.** `check-css-vars` only reads the component CSS, and `src` holds most of the reads, so a search for any leftover `--ui-space-tmp` name closes the rename, and the computed-style proof (Order of work) catches a wrong one.

**Risk.** `--ui-space-3` to `-8` keep existing but mean other sizes, so an rc tester's CSS changes silently. rc.8 ships an upgrade command for it (below), and Fredahead is the first project to run it.

**Guard.** A test that reads the space tokens from `theme.css` and fails when a step's number isn't its value divided by 0.25rem, reading a hyphen as the decimal point, with a sample it must flag.

## Order of work

All of it lands in one release candidate, so rc testers migrate once. Each step lands with its guard and the sample the guard must flag, so no change waits unguarded for a later step.

1. **Decide** finding 4 (15 private limits and two guards, or the fallback), `.ui-scope`, and the severity 2 renames.
2. **Record the computed styles** of every element on the stress pages, in every example theme, both schemes and both contrast modes, from a build of the commit before the renames.
3. **Renames, mechanical, one commit each:** findings 3 and 5, the limits of finding 4 with its six roles, then `.ui-scope`. Update `tokens.json`, the tiers and descriptions, the themes, MIGRATING, the CHANGELOG entries and What's new notes that name them (in place, since 6.0 adds every one of these tokens), and the blog posts.
4. **Prove the renames change nothing.** Build again and compare the computed styles with step 2. A rename moves no pixel, the six roles hold the values the components computed, and Field and List get the same 0.75rem from `--ui-space-3` that they computed before, so any difference is a missed or wrong read.

   **Second review.** The visual baselines can't prove it: the `update-snapshots` workflow timed out building the site until 918023dd, so the CI baselines are stale, and they are only recorded in CI. The computed styles run locally, before any baseline moves, and name the element and property that changed.

5. **Behavior:** finding 1 (translucent borders, the variants removed, the themes' borders as strengths) and the density fixes of finding 2. The density rewrites are checked the same way as step 4: at each theme's own settings they change nothing, so the borders are the only change the baselines show.
6. **Verify:** `pnpm check`, `pnpm test:e2e` (contrast, themes, stress), the `e2e-engines` label, then the `update-snapshots` label for the border changes, said in the commit message as intended.
7. **rc.8:** publish, with the upgrade command for rc testers:

```sh
npx opui-css migrate rc <files or directories>
```

**Reviewed.** This replaces a `sed` script, which had three faults: `sed -i -E` with `\b` only works in GNU sed, so it fails on macOS; a second run shifts every space step again; and it left out the limits and the scope class. The command, a second one next to `check` in `packages/opui/bin/opui-css.mjs`:

- replaces every name in one pass per file from one table, so the order of the rules can't matter and no step is renamed twice;
- covers the space steps, the names of finding 3, the two accent guards and `.ui-palette`, in selectors and in `class` attributes, matching the class only as a whole word so the `--ui-palette-*` tokens keep their names;
- lists the files and counts without writing, with `--dry-run`;
- reports what it can't rewrite, each with the token to use instead: reads of the four removed border variants, whose values move into the base tokens, and of the limits that became private;
- reads the table the MIGRATING rename table is checked against, and has a unit test that runs it on a sample with every old name.

**Second review.** A file can't say whether it was migrated: `--ui-space-3` to `--ui-space-8` exist in rc.7 too, and only `--ui-space-12` is new, so a file that uses steps 3 to 7 passes a check for rc.8-only names on a second run and shifts again. Every other rename is safe to repeat, since its old name stops existing. So the command takes the version it migrates from (`--from 6.0.0-rc.7`) and refuses to run in a git working tree with uncommitted changes, as codemods do, and a second run is undone with git. A subcommand in `opui-css.mjs` is also public API, with a CHANGELOG entry and a README section, and an rc-only mode is dead weight after 6.0.0. Make it `npx opui-css migrate` for the mechanical token and class renames from 5.x too (the 131 rows of the MIGRATING table), with rc.7 as one `--from` value.

Note in the [Fredahead friction log](https://github.com/felix-bohlin/fredahead/blob/main/docs/opui-log.md) which entries these changes resolve.

## Left for 6.x, additive

- `--ui-surface-overlay`, defaulting to `--ui-surface-raised` (finding 3).
- The severity 2 findings of the review that add tokens rather than rename them: the status role sets, the hover shade deltas, `tokens.json` in the stable DTCG 2025.10 format.
- The severity 2 renames (`--ui-line-height`, the font weights by role, `--ui-font-family-*`) are not additive: they belong in this same candidate, or the old names stay until 7.0. Decide them with step 1. **Reviewed:** there is a middle way, unlike for the space scale, where the old names take new meanings. A 6.x minor can add the better name and keep the old one as an alias, at the price of two words for one concept until 7.0.
