# Changelog

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
