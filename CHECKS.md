Manual checks before releasing 6.0.0. The tests cover Chromium only, without real fonts, screen readers or touch, so these checks are about everything they can't see. Run the docs with `pnpm dev` (the stress test pages need `OPUI_TEST_PAGES=1 pnpm dev`), or use the Netlify preview of the pull request.

## CI and baselines

- [ ] CI is green on the pull request head
  - Both jobs, `check` and `e2e`, on the latest commit of [felix-bohlin/ui#400](https://github.com/felix-bohlin/ui/pull/400).
  - `e2e` only goes green after the `update-snapshots` run has committed new baselines.
- [ ] The new visual baselines only change what 6.0 changed
  - Open the `chore: update visual snapshots` commit on the pull request and look through the changed images.
  - Expected to move: Avatar groups, Badge fills, Button padding, Carousel, Checkbox, Chip, Radio dots, Select picker, Switch sizes, Table footers, Tabs, Toggle, Typography and the stress pages. Anything else is a regression.
- [ ] `pnpm check` and `pnpm test:e2e` pass locally
  - Visual tests fail locally because of local fonts. Only the non-visual specs need to pass: `pnpm exec playwright test a11y interaction anatomy stress contrast theming`.
- [ ] The Netlify preview builds and loads
  - The `check` job deploys it and posts the URL on the pull request.

## Browsers and devices

- [ ] Chrome on macOS or Windows
  - Click through every component page and stress test page in light and dark mode.
- [ ] Firefox on macOS or Windows
  - Same pages. Features Firefox may not have yet should fall back cleanly: `::scroll-button()` (Carousel), customizable `select` (Select), `field-sizing` (auto-fit fields), `corner-shape` (Avatar), interest invokers (Tooltip).
- [ ] Safari on macOS
  - Same pages. Watch anchored overlays (Menu, Tooltip, submenus) and the hero anatomy diagrams.
- [ ] Safari on iOS
  - Tap targets, tooltips toggle on tap, menus open and close, Drawer and Dialog scroll lock, no hover states stuck after a tap.
- [ ] Chrome on Android
  - Same as iOS. Range thumbs are 30px on touch screens.
- [ ] Windows display scaling at 125% and 150%
  - Radio dots, Checkbox marks and Switch dots are centered in every size ([Radio](/html/components/radio/#sizes), [Checkbox](/html/components/checkbox/), [Switch](/html/components/switch/)).
  - The radio dot is now a `radial-gradient()` because it was a pixel off at 150%. Check it in the browser that showed the offset.
- [ ] Browser zoom at 200% and 400%
  - Docs pages reflow without sideways scrolling, and every component is still usable.
- [ ] Anatomy heroes in Firefox, Safari and with Windows fonts
  - Every component page with a hero anatomy: labels line up with their parts and don't overlap. Segoe UI is wider than the fonts the tests use.

## Components

- [ ] Accordion
  - [Accordion](/html/components/accordion/): height animates open and closed in Chrome, and opens without a jump where `interpolate-size` isn't supported.
  - `name` groups close the other items, markers rotate, flip and turn, also in RTL. Plain groups inside a `.ui-card` look right.
- [ ] Anchor
  - [Anchor](/html/components/anchor/): hover cards open on hover and focus, and stay inside the viewport near the edges.
- [ ] Avatar
  - [Avatar](/html/components/avatar/): squircle corners in Chrome, round elsewhere.
  - A group's box ends at its last avatar, and a badge dot on a middle avatar shows above the next one ([layout stress page](/tests/layout/)).
- [ ] Badge
  - [Badge](/html/components/badge/): every placement on avatars, chips and buttons, also in RTL. White text on critical, info and success fills is readable in light and dark.
- [ ] Button
  - [Button](/html/components/button/): padding scale, icon side padding with wrapped labels, icon-only buttons are square, `rounded` makes a circle, disabled links look disabled.
  - Hover styles only on devices with hover: tapping on iOS doesn't leave a button looking hovered.
- [ ] Button `kbd` looks right on a Mac
  - The [Keyboard](/html/components/button/#keyboard) example, with macOS system fonts.
- [ ] Button group
  - [Button group](/html/components/button-group/): split button with a Menu, dividers are one line thick, vertical groups, link items.
- [ ] Callout
  - [Callout](/html/components/callout/): every severity in light and dark, focus ring on links inside, stretched callouts.
- [ ] Card
  - [Card](/html/components/card/): every variant, end-aligned actions, cards inside cards.
- [ ] Carousel in Chrome
  - [Carousel](/html/components/carousel/): buttons and markers, buttons outside, items per view, peek, center alignment, RTL.
  - A vertical carousel with buttons outside and markers keeps its markers inside its parent.
  - No smooth scrolling with reduced motion or `.ui-motion-off`.
- [ ] Carousel in Firefox and Safari
  - Without `::scroll-button()` and `::scroll-marker` it falls back to a snapping scroller. It's still usable with touch, trackpad and keyboard.
- [ ] Checkbox
  - [Checkbox](/html/components/checkbox/): every size including x-small, indeterminate, hover halo, the invalid style only after interaction or submit, `aria-invalid="true"`.
- [ ] Chip
  - [Chip](/html/components/chip/): x-small, start and end icons, every variant.
- [ ] Description list
  - [Description list](/html/components/description-list/): bordered lists show the leader line when wider than `45ch` and stack below it.
- [ ] Dialog
  - [Dialog](/html/components/dialog/): opens and closes with an animation, `closedby` any, closerequest and none behave as documented, the page doesn't shift when scrolling locks, long content scrolls inside the dialog, focus returns to the trigger.
- [ ] Divider
  - [Divider](/html/components/divider/): horizontal and vertical, with and without text, inside cards and lists.
- [ ] Drawer
  - [Drawer](/html/components/drawer/): all four sides, blurred backdrop, transparent backdrop is fully transparent, scroll lock, header close button, footer alignment in an inline-end drawer.
- [ ] Form, field set and field group
  - [Form](/html/components/form/): legends, descriptions, row and column groups, required marks, invalid groups.
- [ ] List
  - [List](/html/components/list/): dense, inset, gutterless, bordered, rows with buttons and links, videos, nested lists.
- [ ] Menu in Chrome
  - [Menu](/html/components/menu/): placements flip near the edges, end alignment, submenus open to the free side, a tall menu stops at 60% of the viewport and scrolls.
  - Keyboard as documented in [Accessibility](/html/components/menu/#keyboard-support): Tab enters the open menu, Esc closes it and returns focus.
  - The [Manual](/html/components/menu/#manual) menu stays open on Esc and outside clicks, and Done closes it.
- [ ] Menu in Firefox and Safari
  - Same checks as in Chrome, with the [overlays stress page](/tests/overlays/) for edge cases.
- [ ] Progress
  - [Progress](/html/components/progress/): the fill animates when `value` changes, indeterminate bars move, labels line up.
- [ ] Radio
  - [Radio](/html/components/radio/): every size, dots centered, invalid style, spread and stacked labels.
- [ ] Range
  - [Range](/html/components/range/): the track fill shows in Chrome, Safari and Firefox, tick labels sit under the thumb's ends, a spread range with a value and ticks doesn't overlap.
- [ ] Select in Chrome
  - [Select](/html/components/select/): the customizable picker has rounded corners, keyboard and typeahead work, groups and the header show.
- [ ] Select in Firefox and Safari
  - Without customizable select it falls back to the [Classic select](/html/components/select/#classic-select) and the browser's own picker.
- [ ] Spinner
  - [Spinner](/html/components/spinner/): every size, stops with reduced motion.
- [ ] Switch
  - [Switch](/html/components/switch/): x-small and large, dots centered, icons, an invalid switch shows both the red ring and the focus ring when focused.
- [ ] Table
  - [Table](/html/components/table/): scroll shadows on wide tables, sticky header, row headers, footers line up, only body rows highlight on hover, dense and spacious.
- [ ] Tabs
  - [Tabs](/html/components/tabs/): every variant, arrow keys move between tabs, RTL.
  - [Scrollable](/html/components/tabs/#scrollable) tabs with many tabs: keyboard focus scrolls each tab into view. Uses `sibling-index()`, so check Firefox and Safari versions that have it.
- [ ] Text field
  - [Text field](/html/components/text-field/): every size and variant, prefix and suffix, auto-fit width, the autosuggest chevron is centered at every size, invalid after interaction.
- [ ] Textarea
  - [Textarea](/html/components/textarea/): auto-fit grows with the content where `field-sizing` is supported and keeps its rows elsewhere.
- [ ] Toast
  - [Toast](/html/components/toast/): toasts show, stack and dismiss.
- [ ] Toggle
  - [Toggle](/html/components/toggle/): a selected button keeps its tint on hover, also with more contrast, single and multi select, vertical, overflow.
- [ ] Tooltip
  - [Tooltip](/html/components/tooltip/): opens on hover and focus, toggles on tap, the arrow points at the trigger, flips near the edges.
- [ ] Typography
  - [Typography](/html/components/typography/) and the [typography stress page](/tests/typography/): headings, lists, code blocks, `kbd`, tables in rich text, vertical rhythm.

## Accessibility

- [ ] Keyboard only
  - Tab through every component page without a mouse. Focus is always visible and never lands on something hidden.
- [ ] VoiceOver with Safari on macOS
  - Dialog and Drawer announce their names, Menu reads as a list of buttons, Tabs as a radio group ("1 of 3"), Select, Toggle group and Carousel make sense.
- [ ] NVDA with Firefox or Chrome on Windows
  - The same components as VoiceOver.
- [ ] Windows contrast themes (forced colors)
  - Checkbox, Radio and Switch states, selected Tabs and Toggles, Tooltip border and arrow, Carousel markers, Badges, Callouts and focus rings all show. The [contrast stress page](/tests/contrast/) has most of them.
- [ ] Increased contrast
  - macOS Increase contrast or `prefers-contrast: more` in devtools: borders get stronger, text stays readable, selected Toggle hover is readable.
- [ ] Reduced motion
  - Dialog, Drawer, Accordion, Menu, Tooltip, Carousel and Toast don't animate.
- [ ] Right to left
  - Set `dir="rtl"` on `html` in devtools on each component page. Overlays, markers, chevrons, badges and scroll buttons mirror.

## Theming

- [ ] Light and dark mode
  - Switch modes in the header on several pages. No flash of the wrong mode on reload, in both modes.
- [ ] Theme generator
  - [Theme generator](/html/guide/theme-generator/): change the source color, hue, chroma and grays, download `theme.css` and use it in a test project.
- [ ] Theme config drawer
  - The border radius, field radius and button radius controls update every component.
- [ ] Theming guide
  - [Theming](/html/guide/theming/): palette scopes such as `.ui-critical`, density and motion work as described.
- [ ] Review the `feat/pixel-style` branch
  - Pixel style switcher in the theme drawer: every component in light and dark, no flash on reload, Default unchanged against main, the logo font uses `--font-heading`.

## Docs site

- [ ] Framework picker
  - Switching between HTML, Astro, Svelte and Vue keeps you on the same page and section, and no page shows another framework's text.
- [ ] Search
  - Finds components, guide pages and API props. Arrow keys, Enter and Esc work.
- [ ] Code blocks
  - Copy buttons copy the right code, and Astro, Svelte and Vue examples import from the right package.
- [ ] What's new
  - Callouts show on changed component pages, every link jumps to its section, and the sidebar shows New badges.
- [ ] Under the hood walkthroughs
  - Step through each one. Knobs change the demo, for example the Radio dot radius.
- [ ] Learn posts
  - [Learn](/learn/): every post renders and its demo works.
- [ ] Guides
  - [Getting started](/html/guide/getting-started/), [Migrating](/html/guide/migrating/), [Browser support](/html/guide/browser-support/), [Accessibility](/html/guide/accessibility/) and the other guides read well per framework.
- [ ] Markdown and llms.txt
  - `/html/llms.txt`, `/html/llms-full.txt` and the `.md` version of a page load and match the page, also for Astro, Svelte and Vue.
- [ ] Small screens
  - Header, local navigation, table of contents and examples work on a phone.
- [ ] Home page
  - Shows 6.0.0, and the showcase works in light and dark.

## Package

- [ ] Package contents
  - `npm pack --dry-run` in `packages/opui`: `dist`, `css`, `core`, `astro`, `svelte`, `vue`, `components` and `skills` are in, and `AGENTS.md` files and tests are out.
- [ ] Fresh Astro project
  - Install the packed tarball, import the CSS once, render Button, Dialog, Menu and Tabs from `opui-css/astro`, and run `astro check`.
- [ ] Fresh Svelte project
  - The same with `opui-css/svelte` in a SvelteKit project, and run `svelte-check`.
- [ ] Fresh Vue project
  - The same with `opui-css/vue` in a Vite project, and run `vue-tsc`.
- [ ] Plain HTML
  - Link `dist/opui.css` from the tarball and copy a few HTML examples from the docs.
- [ ] Per-component imports
  - Import `opui-css/css/layers.css`, the base files and a few components one at a time, as in Getting started. The layer order holds.
- [ ] Agent skill
  - Give an agent `skills/opui` and ask it to build a small form and a menu in each framework. It finds the references and uses current classes and props.
- [ ] Migration guide
  - Upgrade a 5.x project with [Migrating](/html/guide/migrating/): IconButton, `aria-invalid`, the removed ripple and Accordion markers are all covered, and nothing else breaks.
- [ ] README and CHANGELOG
  - The README install steps and links work, and the CHANGELOG reads well from top to bottom.

## Release

- [ ] Date the CHANGELOG
  - Replace `Unreleased` in `## 6.0.0 - Unreleased` with the release date.
- [ ] Merge the pull request
  - After CI is green on the final commit.
- [ ] Publish to npm
  - `npm publish` from `packages/opui` with the 6.0.0 version, then tag `v6.0.0`.
- [ ] GitHub release
  - Release notes from the CHANGELOG, with the Breaking section and a link to Migrating.
- [ ] After publishing
  - `https://cdn.jsdelivr.net/npm/opui-css@6/dist/opui.css` resolves, the docs on main deploy, and the production docs show 6.0.0.
