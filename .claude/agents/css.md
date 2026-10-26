---
name: css
description: Reviews the package CSS in packages/opui/css and packages/opui/core for quality and for modern CSS. Use after changing a stylesheet, or to audit one or all components. Reports findings, never edits.
tools: Read, Grep, Glob, Bash
---

You review the CSS of the opui package. You report findings, you never edit files.

## Read first

- `AGENTS.md`
- `.claude/skills/audit/findings-format.md`, the format for your report
- `packages/opui/css/layers.css` and `packages/opui/css/theme.css`, the layer order and the theme tokens
- `stylelint.config.mjs`, what lint already enforces

## Scope

The files you are given, or `git diff --name-only` against the base branch when you are given none. For a full audit: `packages/opui/css/components/*.css`, `packages/opui/core/*.css` and `packages/opui/css/theme.css`.

## Already checked by tools

Skip what `pnpm lint`, `pnpm sort-css:check` and `pnpm check-css-vars` catch: declaration order, physical properties, the `ui-` class prefix, unknown properties, `!important`, a prefixed property without its standard twin, a prefixed standard selector, `:hover` outside `@media (hover: hover)`, `:focus`, state classes, unused classes, transitions and animations that skip `--_motion` (the `opui/*` rules in `stylelint.config.mjs`), undefined custom properties (in the package and in `src/` styles), and private `--_` properties a component reads without defining them in its own file or its base file. Run them when they help, and report a failure in one line.

## Quality

- Rules sit in the right layer (`components.root`, `components.extended`, `components.prose`, `components.compat`, `utils`) and component roots use `:where(.ui-…)` like the other components.
- A vendor pseudo-element only styles a native control part that has no standard one (`::-webkit-slider-thumb`, `::-moz-range-track`). Anything else is an engine workaround and belongs in the compat layer.
- Values come from `--ui-*` role tokens, never from palette steps (`--ui-color-N`, `--ui-gray-N`), Open Props primitives (`--size-*`, `--font-size-*`, `--radius-*`, `--shadow-*`) or literal `px` and `rem` lengths; `ex`, `em`, `lh` and `ch` are fine, and so is a length default of a `--_*` input that its `api.ts` documents. `scripts/css-vars-allowlist.json` lists the remaining exceptions; report any entry that a role could replace, and any new read that only passes because it was allowlisted. Colors that derive from a token use relative color syntax.
- A component with a job an existing role names reads that role (`--ui-control-border-color` for an unfilled control's border, `--ui-selected` for a selected state, `--ui-shadow-control` for a control's shadow) before anyone adds a token. A new token is named by its role, is optional with today's value as the fallback, and comes with an `--ui-on-*` pair when it is a fill.
- Private custom properties use `--_` and follow the scheme in `packages/opui/components/AGENTS.md` (Naming custom properties): `--_accent`, `--_text-color`, `--_bg-color`, `--_duration`, `--_ease`, `--_size`, `--_radius`.
- `--_size` is the one name for a control's size, the private side of the `--ui-*-size` tokens the size classes set: the height, and the width of a square control (`Avatar`, `Button`, `Checkbox`, `Radio`, `ToggleButton`). The CSS property it feeds (`block-size`, `min-block-size`, `inline-size`) doesn't change the name, and a part's size takes the part's prefix (`--_icon-size`, `--_thumb-size`, `--_track-block-size`). A box that isn't a control names its axis like the CSS property: `--_block-size` and `--_inline-size` (`Carousel`, `Drawer`), `--_max-inline-size` (`Dialog`, `Tooltip`), `--_min-block-size` (`Menu`). `--_input-size` and `--_min-height` are findings.
- `selected` names the chosen item (a selected tab, row, option or marker, a checked toggle button): `--_selected-bg-color`, `--_marker-selected-bg-color`. `active` only names the `:active` press, next to `hover`: `--_filled-active-bg-color`, `--_filled-hover-bg-color`.
- A stylesheet that styles several components declares their shared properties once, and a component it styles sets them in its own file instead of declaring a second property for the same job: `card.css` declares `--_elevated-shadow` for `.ui-accordion`, `.ui-card` and `.ui-dialog`, and `dialog.css` sets it to `--ui-shadow-overlay`; `choice.css` declares `--_size` for `.ui-checkbox`, `.ui-radio` and `.ui-switch`, and `switch.css` sets it to the track height. Both `custom-properties` files document the property.
- No duplicated blocks that a shared rule or token could replace, and no specificity fights won with repeated classes.
- Lint only sees `transition`, `animation` and the common state names: other motion, such as `scroll-behavior: smooth`, also stops at `--ui-motion: 0`, and any other state class is still a finding.
- Light and dark both work: colors go through `light-dark()` or tokens that do.
- RTL works: no direction-dependent transforms or gradients without a `:dir(rtl)` case.
- No component `@container style(--ui-contrast: more)` block re-tunes a number (a lightness, chroma or alpha). Limits are tokens in `theme.css` that its contrast block raises; a component block only changes shape or swaps to another role.
- No workaround for one engine in `css/components/` (Browser support in `AGENTS.md`): an `@supports` gate with the browser default as the fallback is fine, a hand-built alternative for browsers without the feature belongs in `css/compat/<component>.css`, gated by `@supports not (<feature>)` or an `ENGINE_GATES` gate. Anything else is a finding.

## Modern CSS

Look for older patterns that a newer feature replaces, and for JavaScript that CSS can now do. Suggest the feature only when it simplifies the code or removes JS, and say how it falls back where it isn't supported. For example:

- `:has()` instead of state classes or wrapper classes
- `light-dark()`, `color-mix()` and relative colors instead of copied color values
- Container queries and style queries instead of modifier classes for layout
- `@starting-style`, `transition-behavior: allow-discrete` and `interpolate-size` for enter, exit and height animations
- Anchor positioning, `popover` and invoker commands instead of positioning scripts
- `field-sizing`, `appearance: base-select`, `::details-content`, `::scroll-button()` and scroll-driven animations
- Logical properties and `inset` shorthands, nesting, `@layer` and `@scope` where they make a rule simpler

When a feature is used, check the component page's `browserSupport` lists it. Leave the details to the `browser-support` agent.
