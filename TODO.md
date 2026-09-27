- [] Toast loading state isn't a real component
- [] Auto-suggest arrow is misaligned
- [] button kbd looks weird on Mac
- [] Button group dividers look double thick (check if the -1px margin applies, or scaling rounds the overlapping borders apart)
- [] Review `feat/pixel-style` (Pixel style switcher in theme drawer): check every component in light/dark, no flash on reload, Default unchanged vs main, logo font now uses `--font-heading`. Rebase may conflict in button-group.css and CHANGELOG.md
- [] Check button changes in the browser: new padding scale, icon side padding with wrapped labels, icon sizing, icon-only, button groups
- [] components.css lists icon-button under "no dependencies" but it now needs button.css for its tokens
- [] Button kbd: swap `oklch(from currentColor ...)` for `color-mix(in oklch, currentColor 10%, transparent)` and `:is(kbd)` for `kbd`
- [] Disabled button text color only applies to the text variant, filled/tonal/outlined override it (intended?)
- [] Button group still duplicates the primary/critical button tokens in its "Color inherited from Button Group" block
- [] Icon button disabled styles ignore `.ui-disabled`

## Bugs

- [] `css/js/toast.js` and `checkbox.js` can't be imported: `exports` has no entry for them (e.g. `"./js/*": "./css/js/*.js"`)
- [] Getting-started docs (HTML, Astro, Vue) import `opui-css/open-props.css`, which isn't in `exports`
- [] DrawerHeader's `@click` close fallback never runs in server-rendered Vue without hydration (only `commandfor` works there)
- [] Carousel: browsers with scroll buttons but no `if()` (Chrome 135-136) show both the glyph and the image icon
- [] Running pnpm scripts adds `@pnpm/exe` to `pnpm-lock.yaml`

## Docs

- [] Drawer API lists `heading` and `actions` as slots (they aren't) and has a stray row after the table
- [] Carousel: `--_button-prev-icon`/`--_button-next-icon`/`--_button-icon-size` aren't documented anywhere since the custom properties table was removed
- [] Dialog docs callout still says "No JavaScript required" (positive wording: "HTML only")

## To check

- [] Test Menu and Carousel in Firefox and Safari (only checked in Chromium)

## Limitations

- [] Menu: arrow key navigation (needs JS or `focusgroup` when it ships)
- [] Carousel: vertical orientation

## Suggestions

- [] Ship a `layers.css` with the `@layer` order for people who import single component files
- [] Register theme knobs with `@property` (`--motion`, `--border-radius`, focus ring tokens)
- [] `contrast-color()` for `--primary-contrast` so custom primaries get readable text
- [] `text-box: trim-both cap alphabetic` on Button/Chip/Badge only works if the label is wrapped in its own element (flex/grid containers ignore it)
- [] Scroll-state container queries: sticky Table header shadow, scroll shadows in Dialog/Drawer
- [] Opt-in `:user-valid` success styling for forms

## Questions

- [] `svelte` peer dependency but no Svelte components: remove it, or keep it for planned Svelte support?
- [] Section comments I added in `carousel.css` and `menu.css` (e.g. `/* Buttons */`): keep or remove per the no-new-comments rule?
