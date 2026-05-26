# Changelog

## 5.0.1 - 2026-05-26

### Breaking

- **Progress**: the `.ui-progress` class is now placed on a wrapper `<div>` instead of directly on `<progress>`. Raw HTML users must change `<progress class="ui-progress">` → `<div class="ui-progress"><progress>…</progress></div>`. Variant modifiers (`ui-default`, `ui-filled`, `ui-tonal`) also move to the wrapper `<div>`. The Astro component handles this automatically.

### Fixed

- Progress indeterminate animation and surface-variant styles now work correctly with the new wrapper structure.

## 5.0.0 - 2026-05-21

### Breaking

This is technically very breaking, but with a little prompting from you it's probably not a big deal for you. Hopefully you'll understand the reasoning behind this.

Every OPUI-owned class now has a `ui-` prefix. This eliminates collisions with consumer styles and makes library classes self-identifying in the DOM.

- Component prop API is **unchanged**: `<Button size="small" variant="outlined" color="primary">` works exactly as before.
- Raw HTML / CSS users **must** rename every library class. `<button class="button outlined">` → `<button class="ui-button ui-outlined">`. `.button { ... }` overrides → `.ui-button { ... }`.
- CSS custom properties (`--primary`, `--surface-default`, `--size-3`, …) are unchanged.
- The framework component renders prefixed classes (`<button class="ui-button ui-small ui-outlined ui-primary">`); only the rendered HTML changes, not the public prop API.
- **Divider**, **Progress**, **Table**, **Tabs**, and **Description List** now render and style prefixed classes end-to-end (`.ui-divider`, `.ui-progress`, `.ui-table`, `.ui-tab-label`, `.ui-tab-panel`, `.ui-term`). Plain `<hr>`, `<progress>`, and `<table>` elements no longer pick up library styles unless the class is present.
- **Toggle Button**: pressed state no longer adds an unprefixed `selected` class.
- **Avatar**: removed unused `spacing` prop and related group gap classes.

#### Migration

Run a project-wide find/replace per token, prompt or whatever. Below are all the classes that got a `ui-` prefix.

<details>
<summary>Migrated classes</summary>

`abbr`, `accordion`, `actions`, `align-end`, `anchor`, `anchor-floating`, `auto-fit`, `avatar`, `backdrop-transparent`, `badge`, `badge-indicator`, `block-end`, `block-start`, `blockquote`, `border-filled`, `border-primary`, `border-tonal`, `border-top`, `bordered`, `button`, `button-group`, `callout`, `caption`, `card`, `checkbox`, `chip`, `cite`, `close-button`, `code-block`, `content`, `critical`, `dark`, `default`, `del`, `dense`, `description`, `description-list`, `dfn`, `dialog`, `disabled`, `divider`, `dot`, `dotted`, `drawer`, `elevated`, `end`, `end-end`, `end-start`, `end-text`, `exiting`, `field`, `field-description`, `field-group`, `fieldset`, `fieldset-item`, `filled`, `footer`, `form`, `gutterless`, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `header`, `hgroup`, `icon`, `icon-button`, `icon-checked`, `icon-only`, `icon-unchecked`, `info`, `inline-end`, `inline-start`, `ins`, `inset`, `invisible`, `item`, `kbd`, `label`, `large`, `legend`, `light`, `link`, `list`, `mark`, `multiline`, `neutral`, `not-rich-text`, `outlined`, `overline`, `p`, `prefix`, `primary`, `progress`, `radio`, `range`, `rich-text`, `rounded`, `row`, `s`, `samp`, `scroll-lock`, `select`, `small`, `spacious`, `spread`, `squared`, `squircle`, `sr-only`, `stack`, `start`, `start-start`, `start-text`, `sub`, `success`, `suffix`, `sup`, `switch`, `tab-input`, `tab-label`, `tab-panel`, `table`, `tabs`, `term`, `text`, `text-field`, `textarea`, `title`, `toast`, `toggle-button`, `toggle-group`, `tonal`, `tooltip`, `transparent`, `u`, `value`, `var`, `vertical`, `warning`, `with-arrow`, `x-small`.

</details>

After the search/replace, do a visual smoke test — there is no automated codemod for consumer projects.

## 4.1.0 - 2026-05-18

### Breaking

- **Card** and **Dialog** (Astro): the `actions` prop with an `align` field is removed. Use the `actionsAlign` prop instead (`"start"` | `"end"`).

## 4.0.1 - 2026-05-13

### Fixed

- Autosuggest arrow placement.

## 4.0.0

Complete rewrite. The library now also ships as an installable npm package with Astro components.

Don't forget, I'm just a single person working on this in my free time. I'm doing this for fun. There will be bugs.

### Breaking

- `theme-one` and `theme-two` are removed. I can't maintain a million themes. There is now a single theme in `css/theme.css`.
- The default package entry (`import "opui-css"`) now resolves to the single bundled stylesheet (`dist/opui.css`) instead of `dist/theme-two/theme-two.css`. The class names are the same, the file path is not.
- The `src/themes/` build pipeline is gone (vite + postcss + per-theme scripts). The package now builds with a small `postcss-import`-only pipeline that does not transform or lower any CSS syntax.
- Component CSS source moved from `src/components/` to `css/components/`. The pre-bundled output stays in `dist/`.
- Cascade layer order is now declared by the library in `css/imports.css`: `openprops, normalize, theme, components.root, components.extended, utils`.
- `astro` `^6` is required if you import from `opui-css/astro`. Pure-CSS consumers are unaffected (the peer is marked optional).

### Added

- Anchor, Drawer, Form, Toast, Toggle, Tooltip and a lot of re-writes and improvements to existing components.
- Definition List -> Description List
- Tab buttons -> Tabs
- Toggle button group -> Toggle
- Astro component entry: `import { Button } from "opui-css/astro"`.
- Per-component CSS imports under `opui-css/css/components/*.css`.
- Pre-bundled stylesheets in `opui-css/dist/`: `opui.css` (everything), `opui.components.css` (components only), and `op.css` (Open Props tokens, unchanged subpath from v3) for CDN / no-bundler use.
- `sideEffects` correctly declared so bundlers don't tree-shake CSS.

### Migration

See [`MIGRATING.md`](./MIGRATING.md).

## 3.3.5 - 2026-02-19

### Changed

- goof: forgot to leave open-props as a dependency

## 3.3.4 - 2026-02-19

### Changed

- Moved all dependencies to `devDependencies`.

## 3.3.3 - 2026-01-07

### Changed

- **Build Process**: Refactored `scripts/build-themes.js` to support organized theme exports. Files are now exported to theme-specific subdirectories in `dist/`.
- **Package Exports**: Updated `package.json` to use subpath exports:
  - Default export `"."` now points to `theme-two.css`.
  - Added `"./theme-one"` and `"./theme-two"` exports.
  - Added `"./theme-one/components"` and `"./theme-two/components"` component imports.
  - Added `"./open-props"` export for the base Open Props stuff.
- **Documentation**: Updated "Getting Started" guide with new usage examples and bundler configuration instructions (Vite vs. PostCSS).

### Fixed

- Improved build script to automatically create subdirectories in `dist/` if they don't exist.
- Fixed watch mode in `build-themes.js` to correctly track and rebuild both theme and component files.

## 3.3.1 - 2025-12-17

### Fixed

- `switch.css` goof.

## 3.3.0 - 2025-12-17

### Added

- Internal updates and optimizations.

## 3.2.0 - 2025-12-07

### Added

- Add support for `kbd` element inside of `<button>`.

## 3.1.2 - 2025-11-09

### Added

- Added CSS variable to control list hover `background-color`.

## 3.1.1 - 2025-10-23

### Added

- Add support for icons in Switch component (e.g., dark mode toggle).

### Fixed

- Bug fix for definition list where lists with lots of content weren't rendering correctly.

## 3.1.0 - 2025-10-23

### Changed

- Removed sticky header from `table` component to allow for custom implementations.

## 3.0.0 - 2025-10-22

### Added

- **Themes**: Introduced a formal theme system.
- Added `theme-two` as the new default theme (cleaner, more unified).
- Revised documentation and getting started guide for the new theme system.

### Changed

- Refactored component structure to better support multiple themes.

## 2.2.3 - 2025-09-21

### Changed

- Reverted `box-sizing` change from previous release.

## 2.2.2 - 2025-08-19

### Changed

- Moved `theme.css` out of the main bundle.
- Made `box-sizing` declaration in normalize less intrusive.

## 2.0.1 - 2025-08-19

### Removed

- Removed redundant code and assets.

## 2.0.0 - 2025-08-19

### Changed

- **Folder Structure**: New and improved folder structure.
- **PostCSS**: Switched from `lightningcss` to `postcss` for better stability.
- **NPM**: Made the package installable via npm.
- **Layers**: Renamed component sub-layers to `components.root` and `components.extended`.
- **Bundles**: Added pre-bundled versions with and without Open Props.

### Fixed

- Progress component wrapped in `@layer`.
- Theme color scheme fallback improvements.

## 1.2.4 - 2025-04-23

### Fixed

- Normalize custom-media improvements.

## 1.2.3 - 2025-04-16

### Fixed

- Button CSS updates.

## 1.2.2 - 2025-03-18

### Added

- Improved Select list animation and implementation of `::picker-icon`.
- Context-aware link colors in Alerts.

## 1.2.1 - 2025-03-07

### Fixed

- Removed unused border color in Switch component.

## 1.2.0 - 2025-02-18

### Added

- New component: `tab-buttons`.

## 1.1.4 - 2025-02-18

### Fixed

- Dialog component improvements when used with `.card` class.

## 1.1.3 - 2025-02-11

### Fixed

- Field component: Fixed issue where input was pushed down instead of label moving.

## 1.1.2 - 2025-02-10

### Changed

- Refactored pseudo-elements to use double colons (`::`).
- General package upgrades.

### Fixed

- Normalize `::before` fix.
- Outline offset clipping.

## 1.1.1 - 2025-01-26

### Added

- `box-decoration-clone` for `mark` elements.

## 1.1.0 - 2025-01-19

### Added

- New component: `range` input.

## 1.0.2 - 2025-01-17

### Fixed

- Select and documentation fixes.

## 1.0.1 - 2025-01-16

### Changed

- Adjusted for Select API changes (`<selectedoption>` to `<selectedcontent>`).
- Checkmark pseudo-element changed from `::before` to `::check`.

## 1.0.0 - 2025-01-14

### Added

- Initial release with 25+ components.
- Full documentation website.
- Added `[name]` attribute support to accordion.
- Support for stroke SVG icons in buttons.
