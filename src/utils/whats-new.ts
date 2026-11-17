import { changes } from "./changes.glob"
import { components, noteText, pageNotes, slots, type Note } from "./changes"
import type { FrameworkId } from "./framework"

export const LEGACY_VERSION = "6.0.0"

export const legacyNotes: Record<string, Note[]> = {
  accordion: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a>.`,
    `Tonal and elevated <a href="#variants">accordions</a> have a border in the page background color, like cards, so they stay visible on tonal surfaces.`,
    `The <a href="#accessibility">inset focus ring</a> sits at <code>--ui-focus-ring-inset</code> like every other inset ring, and <a href="#variants">elevated and tonal accordions</a> keep a border in forced colors.`,
    {
      html: `Breaking: only the <a href="#custom-marker"><code>svg.ui-marker</code></a> animates. Add <code>.ui-marker</code> to the chevron.`,
    },
    `<a href="#actions">Actions</a> line up with the content and the chevron.`,
    `<a href="#variants">Tonal and outlined</a> accordions read <a href="#api"><code>--ui-shadow-surface</code></a>, <code>none</code> unless a theme sets it, and tonal and elevated accordions <code>--ui-border-color-raised</code>.`,
  ],
  avatar: [
    `A badge on a <a href="#grouped">grouped</a> avatar sits on its start side, the part the next avatar doesn't cover, with the same ring as the avatars.`,
    {
      astro: `Breaking: a button avatar needs <code>as="button"</code>, and <code>disabled</code> goes only with it or with <code>href</code> (<a href="#api">types</a>).`,
      vue: `Breaking: a button avatar needs <code>as="button"</code>, and <code>disabled</code> goes only with it or with <code>href</code> (<a href="#api">types</a>).`,
      react: `A button avatar needs <code>as="button"</code>, and <code>disabled</code> goes only with it or with <code>href</code> (<a href="#api">types</a>).`,
      svelte: `A button avatar needs <code>as="button"</code>, and <code>disabled</code> goes only with it or with <code>href</code> (<a href="#api">types</a>).`,
    },
    {
      astro: `Breaking: <a href="#grouped"><code>AvatarGroup</code></a> groups avatars and replaces the <code>isGroup</code> prop.`,
      vue: `Breaking: <a href="#grouped"><code>AvatarGroup</code></a> groups avatars and replaces the <code>isGroup</code> prop.`,
      react: `<a href="#grouped"><code>AvatarGroup</code></a> groups avatars.`,
      svelte: `<a href="#grouped"><code>AvatarGroup</code></a> groups avatars.`,
    },
    `The ring around <a href="#grouped">grouped</a> avatars reads <code>--ui-border-width-thick</code>.`,
  ],
  badge: [
    {
      ...slots(
        `Breaking: <code>Badge</code> no longer renders <code>.ui-anchor</code>. Style <a href="#api"><code>.ui-badge</code></a> instead.`,
      ),
      html: `Breaking: <code>.ui-anchor</code> is no longer needed on <a href="#api"><code>.ui-badge</code></a>, which <code>badge.css</code> positions without <code>anchor.css</code>.`,
    },
    `<a href="#colors">Severity</a> text reads <code>--ui-on-fill</code> instead of fixed grays.`,
    `Badges on round avatars sit on the avatar's edge (<a href="#corners">Corners</a>), and in an avatar group on the start side.`,
    {
      ...slots(
        `Breaking: the indicator is <a href="#indicator"><code>.ui-indicator</code></a> instead of <code>.ui-badge-indicator</code>, inside <code>.ui-floating</code> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `Breaking: the indicator is <a href="#indicator"><code>.ui-indicator</code></a> instead of <code>.ui-badge-indicator</code>, inside <code>.ui-floating</code> instead of <code>.ui-anchor-floating</code>.`,
    },
    `Breaking: <code>--_badge-inset</code> is <code>--_inset</code>, one length that the badge turns into <code>--_inset-block</code> and <code>--_inset-inline</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `The indicator border reads <a href="#api"><code>--ui-border-width-thick</code></a>.`,
    `<a href="#colors">Critical, info, neutral and success</a> fills stay below <code>--ui-accent-fill-max-lightness</code>, so their text keeps its contrast.`,
  ],
  button: [
    `Themes can set <a href="#api"><code>--ui-button-hover</code></a> to <code>layer</code> for state-layer hover and pressed states, or to <code>shade-all</code> to shade tonal buttons like filled ones, and <code>--ui-button-padding-inline</code> with its <code>-x-small</code>, <code>-small</code> and <code>-large</code> variants for the horizontal padding per size.`,
    `Themes can set <a href="#api"><code>--ui-button-accent-filled</code></a> and <code>--ui-button-on-accent-filled</code> to give filled buttons a color of their own.`,
    `Themes can set <a href="#api"><code>--ui-button-focus: highlight</code></a> to fill a focused button with the focus color instead of drawing the ring, like GOV.UK.`,
    `The <a href="#file-upload">file input</a> takes <code>--ui-field-shadow</code> and <code>--ui-radius-small</code> like other fields.`,
    {
      ...slots(
        `Breaking: replaces <code>IconButton</code>. An <a href="#icon-only">icon-only</a> button is a <code>Button</code> with just an <code>svg</code>.`,
      ),
      html: `Breaking: <code>.ui-icon-button</code> and <code>icon-button.css</code> are gone. An <a href="#icon-only">icon-only</a> button is a <code>.ui-button</code> with just an <code>svg</code>.`,
    },
    `<a href="#colors">Primary and critical</a> colors pass contrast in light and dark mode.`,
    {
      astro: `Breaking: a button takes link attributes only with <code>href</code> (<a href="#api">types</a>).`,
      vue: `Breaking: a button takes link attributes only with <code>href</code> (<a href="#api">types</a>).`,
      react: `A button takes link attributes only with <code>href</code> (<a href="#api">types</a>).`,
      svelte: `A button takes link attributes only with <code>href</code> (<a href="#api">types</a>).`,
    },
    `Breaking: <a href="#disabled">disabled links</a> have no <code>href</code>, so they can't be focused or followed.`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `<a href="#keyboard">Keyboard hints</a> use <code>--ui-line-height-tight</code> (1.25), shared with card captions and tooltips.`,
    `Themes can shrink a button while it's pressed with <a href="#api"><code>--ui-press-scale</code></a>, eased by <code>--ui-ease-move</code>. Buttons in a group never scale.`,
    `Buttons only show <a href="#variants">hover styles</a> on devices that can hover, so they no longer stick after a tap.`,
  ],
  callout: [
    `Severity fills, borders, icons and text read the <a href="#api"><code>--ui-palette-*</code></a> roles, so a theme restyles every severity at once.`,
    `Tonal <a href="#severities">severity callouts</a> have a visible fill in light mode.`,
    `<a href="#severities">Severity callouts</a> take their palette from <code>--ui-critical</code>, <code>--ui-info</code>, <code>--ui-neutral</code>, <code>--ui-success</code> and <code>--ui-warning</code>, so a theme recolors each with one token.`,
    `Breaking: <code>--_outlined-color</code> is <code>--_outlined-text-color</code> and <code>--_surface-bg</code> is <code>--_surface-bg-color</code>. <code>--_color</code> is no longer an override: recolor a severity through its intent token, such as <code>--ui-info</code>, or set <code>--_outlined-text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#severities">Links</a> in a callout only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Links in a <a href="#variants">callout</a> fade to their hover and focus color.`,
  ],
  card: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a>.`,
    `<a href="#variants">Tonal and elevated</a> cards have a border in the page background color, so they stay visible on tonal surfaces.`,
    `<a href="#actions">Actions</a> stick to the bottom of stretched cards and wrap when they don't fit.`,
    {
      astro: `Breaking: <a href="#actions-alignment">actions</a> sit at the end by default. Set <code>align="start"</code> on <code>CardActions</code> to line them up with the content.`,
      vue: `Breaking: <a href="#actions-alignment">actions</a> sit at the end by default. Set <code>align="start"</code> on <code>CardActions</code> to line them up with the content.`,
      html: `Breaking: <a href="#actions-alignment">actions</a> sit at the end by default. Add <code>.ui-align-start</code> to line them up with the content.`,
      react: `<a href="#actions-alignment">Actions</a> sit at the end by default, and <code>align="start"</code> lines them up with the content.`,
      svelte: `<a href="#actions-alignment">Actions</a> sit at the end by default, and <code>align="start"</code> lines them up with the content.`,
    },
    `<code>--_duration</code> and <code>--_ease</code> set the duration and easing of the card link border transition and the focus ring animation (<a href="#under-the-hood">Under the hood</a>).`,
    `Elevated cards use <a href="#api"><code>--ui-shadow-elevated</code></a>, and padding and gaps read the <code>--ui-space-*</code> scale.`,
    `<a href="#variants">Tonal and outlined</a> cards read <a href="#api"><code>--ui-shadow-surface</code></a>, and tonal and elevated cards <code>--ui-border-color-raised</code>, when a theme sets them.`,
    `Borders inside <a href="#variants">tonal and elevated</a> cards read <code>--ui-border-color-on-raised</code> and <code>--ui-field-border-color-on-raised</code>, so a theme's borders reach inside.`,
    `<a href="#clickable">Card links</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The border of a <a href="#clickable">clickable card</a> fades in on hover.`,
    `<a href="#media">Images and videos</a> run to the edges of the card, at the top, between parts or at the bottom.`,
  ],
  carousel: [
    `The scroll buttons read <a href="#api"><code>--ui-control-border-color-filled</code></a> for their border when a theme sets it.`,
    `A <a href="#playground">playground</a> to try the options together.`,
    `New component. A <a href="#basics">scroll snap carousel</a> with buttons and markers generated by CSS.`,
    `<a href="#component-properties"><code>--_marker-selected-padding</code></a> and <code>--_marker-border-color</code> style the markers.`,
  ],
  checkbox: [
    `<a href="#cards">Cards</a> take <code>--ui-card-padding</code>.`,
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers that line on the control.`,
    `Without a <a href="#hidden-label">visible label</a>, checkboxes center in table cells and lines of text, and stay a 24px click target at every size.`,
    `Breaking: <code>choice.css</code> holds the layout, label, end text, sizes and disabled styles shared with Radio and Switch. Import it with them when you <a href="#installation">install single files</a>, or use <code>components.css</code>.`,
    `Corners never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
    `In dark mode the checked <a href="#basics">mark</a> stays light on a fill darkened to keep 3:1 contrast.`,
    `The hover <a href="#basics">halo</a> only shows on devices that can hover, so it no longer sticks after a tap.`,
  ],
  chip: [
    `Themes can set <a href="#api"><code>--ui-chip-radius</code></a> for a corner radius of its own.`,
    `<a href="#variants">Outlined chips</a> take <code>--ui-shadow-control</code> like outlined buttons.`,
    `<a href="#variants">Chips without <code>.ui-outlined</code></a> read <code>--ui-control-border-color-filled</code> for their border, like filled buttons.`,
    `Outlined chips read <a href="#api"><code>--ui-control-border-color</code></a> for their border, like outlined buttons.`,
    `The hover and press ripple is removed. <a href="#button">Button</a> and <a href="#link">link</a> chips change their background on hover instead.`,
    {
      astro: `Breaking: a button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (<a href="#api">types</a>).`,
      vue: `Breaking: a button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (<a href="#api">types</a>).`,
      react: `A button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (<a href="#api">types</a>).`,
      svelte: `A button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (<a href="#api">types</a>).`,
    },
    `Breaking: <a href="#disabled">disabled link chips</a> have no <code>href</code>, so they can't be focused or followed.`,
    `<a href="#button">Button</a> and <a href="#link">link</a> chips only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `<a href="#button">Button and link chips</a> fade their hover and <a href="#pressed">pressed</a> colors, like buttons.`,
    `Themes can shrink a button or link chip while it's pressed with <a href="#api"><code>--ui-press-scale</code></a>.`,
  ],
  "control-group": [
    `<a href="#fields">Fields</a>: a text field, select or number field joins the buttons, and a textarea does in a <a href="#vertical-orientation">vertical group</a>. A text field takes the free space, so the group fills the line like a field.`,
    `<a href="#labels">Labels</a> sit above their control, and the controls line up at the bottom.`,
    `Themes can set <a href="#api"><code>--ui-button-hover</code></a> to <code>layer</code> for state-layer hover and pressed states, or to <code>shade-all</code> to shade tonal buttons like filled ones, <code>--ui-button-padding-inline</code> with its size variants, and <code>--ui-button-accent-filled</code> with <code>--ui-button-on-accent-filled</code> for the filled color.`,
    `<a href="#icons">Icon-only buttons</a> stay square and use Button's icon-only icon size, 60% of the button.`,
    `Breaking: <a href="#variants">variants</a> apply to the whole group. A variant on a single button inside a group is no longer supported.`,
    `<a href="#sizes">Small</a> groups use the same text size as a small <code>Button</code>.`,
    {
      default: `Button links (<code>href</code>) get the group styles too, see <a href="#variants">Variants</a>.`,
      html: `<code>&lt;a class="ui-button"&gt;</code> links get the group styles too, see <a href="#variants">Variants</a>.`,
    },
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> and <code>--ui-field-radius</code> override it when a theme sets them, so one token squares or rounds every component.`,
    `Themes set the color of groups without <code>.ui-primary</code> or <code>.ui-critical</code> with <a href="#api"><code>--ui-button-accent</code></a> or <code>--ui-control-accent</code>, the borders of outlined buttons with <code>--ui-control-border-color</code>, the borders of filled and tonal buttons and the lines between buttons in a group that isn't outlined with <code>--ui-control-border-color-filled</code>, and the font weight and size with <code>--ui-button-font-weight</code> and <code>--ui-font-size-control</code>, like buttons. In dark mode the text stays at least as light as <code>--ui-text-min-lightness</code>.`,
    `<a href="#colors">Critical</a> fills stay within <code>--ui-accent-fill-max-lightness</code>, like buttons, and with more contrast outlined buttons read <code>--ui-critical-text</code> for their border.`,
    `Buttons in a group only show <a href="#variants">hover styles</a> on devices that can hover, so they no longer stick after a tap.`,
  ],
  "description-list": [
    {
      vue: `Breaking: <code>Description</code> is now <a href="#api"><code>DescriptionListDescription</code></a>, like Astro.`,
    },
    {
      ...slots(
        `Breaking: <code>DescriptionListTerm</code> and <code>DescriptionListDescription</code> no longer render <code>.ui-term</code> and <code>.ui-description</code>. Select <code>dt</code> and <code>dd</code> in your CSS (<a href="#basics">Basics</a>).`,
      ),
      html: `Breaking: <code>.ui-term</code> and <code>.ui-description</code> are gone. The list styles <code>dt</code> and <code>dd</code> by element (<a href="#basics">Basics</a>).`,
    },
    `The container query reads <code>inline-size</code>, so the <a href="#orientation">orientation</a> follows the writing mode.`,
  ],
  dialog: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a> for the header, content and footer padding.`,
    {
      html: `Breaking: the <a href="#basics">header</a> is a <code>div.ui-header</code> row instead of an <code>hgroup</code>, like the <code>Drawer</code> header, and <code>.ui-footer</code> replaces <code>.ui-actions</code>. Point <code>aria-labelledby</code> at the title heading.`,
      react: `<a href="#basics"><code>DialogHeader</code>, <code>DialogTitle</code>, <code>DialogContent</code> and <code>DialogFooter</code></a> build the dialog, like the <code>Drawer</code> parts, and <code>DialogTitle</code> names it.`,
      svelte: `<a href="#basics"><code>DialogHeader</code>, <code>DialogTitle</code>, <code>DialogContent</code> and <code>DialogFooter</code></a> build the dialog, like the <code>Drawer</code> parts, and <code>DialogTitle</code> names it.`,
    },
    {
      default: `The <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Drawer</code> title, and <code>--_title-font-size</code> changes it.`,
      html: `The <a href="#basics">title</a> heading is <code>--ui-font-size-h4</code>, like the <code>Drawer</code> title, without <code>.ui-h4</code>. <code>--_title-font-size</code> changes it.`,
    },
    `A focusable <a href="#long-content">content</a> draws its focus ring inside the dialog, so the dialog edges don't clip it.`,
    `Themes can set <a href="#api"><code>--ui-dialog-radius</code></a> for a corner radius of its own.`,
    `<a href="#long-content">Long content</a> scrolls between a fixed header and footer.`,
    `A subtle scroll shadow shows under the header and above the footer while the <a href="#long-content">content scrolls</a>.`,
    `The <a href="#long-content">scroll shadow</a> reads <code>--ui-shadow-scroll</code>, and borders inside the dialog read <code>--ui-border-color-on-raised</code> and <code>--ui-field-border-color-on-raised</code>.`,
    components(
      `<code>DialogTitle</code> warns in development when the dialog's generated id replaces its own <code>id</code>. Pass <code>aria-labelledby</code> on the <code>Dialog</code> to keep it (<a href="#api">API</a>).`,
    ),
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  divider: [
    components(
      `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
    ),
  ],
  drawer: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a> for the header, content and footer padding.`,
    {
      astro: `Breaking: <code>DrawerHeader</code> renders its <a href="#close-button">close button</a> only with <code>closeButton</code>, like <code>DialogHeader</code>. Add it to keep the button.`,
      vue: `Breaking: <code>DrawerHeader</code> renders its <a href="#close-button">close button</a> only with <code>closeButton</code>, like <code>DialogHeader</code>. Add it to keep the button.`,
      react: `<code>DrawerHeader</code> renders a <a href="#close-button">close button</a> with <code>closeButton</code>, named by <code>closeLabel</code>.`,
      svelte: `<code>DrawerHeader</code> renders a <a href="#close-button">close button</a> with <code>closeButton</code>, named by <code>closeLabel</code>.`,
    },
    `With <code>viewport-fit=cover</code>, each side on a screen edge pads its content clear of a phone's notch and home indicator (<a href="#safe-areas">Safe areas</a>).`,
    `Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls (<a href="#basics">Basics</a>).`,
    {
      astro: `Breaking: the <a href="#basics"><code>DrawerFooter</code></a> content sits at the end on every side, also in an <code>inline-end</code> drawer, and <code>align="start"</code> moves it to the start.`,
      vue: `Breaking: the <a href="#basics"><code>DrawerFooter</code></a> content sits at the end on every side, also in an <code>inline-end</code> drawer, and <code>align="start"</code> moves it to the start.`,
      html: `Breaking: the <a href="#basics"><code>.ui-footer</code></a> content sits at the end on every side, also in an <code>.ui-inline-end</code> drawer, and <code>.ui-align-start</code> moves it to the start.`,
      react: `<a href="#api"><code>DrawerFooter</code></a> takes <code>align</code>, and its content sits at the end on every side.`,
      svelte: `<a href="#api"><code>DrawerFooter</code></a> takes <code>align</code>, and its content sits at the end on every side.`,
    },
    `<code>.ui-actions</code> groups the buttons in the <a href="#basics">footer</a>, and moves them to the end when other content comes first.`,
    {
      default: `Breaking: the <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, instead of <code>--font-size-3</code>, and <code>--_header-font-size</code> is <code>--_title-font-size</code>.`,
      react: `The <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, and <code>--_title-font-size</code> changes it.`,
      svelte: `The <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, and <code>--_title-font-size</code> changes it.`,
    },
    `<a href="#basics">Content</a> is a stack with <code>--ui-space-3</code> between its children, like <code>Dialog</code> content, so paragraphs don't touch. Content with inline children keeps the normal flow, and a focusable content draws its focus ring inside the drawer.`,
    {
      default: `Named by <a href="#accessibility"><code>DrawerTitle</code></a> through <code>aria-labelledby</code>.`,
      html: `Name it with <a href="#accessibility"><code>aria-labelledby</code></a> pointing at the header heading.`,
    },
    `Content padding is <code>--ui-space-3</code>, like the header and the footer (<a href="#basics">Basics</a>).`,
    `The scroll shadow reads <a href="#api"><code>--ui-shadow-scroll</code></a>.`,
    components(
      `<code>DrawerTitle</code> warns in development when the drawer's generated id replaces its own <code>id</code>. Pass <code>aria-labelledby</code> on the <code>Drawer</code> to keep it (<a href="#api">API</a>).`,
    ),
    {
      ...slots(
        `Breaking: a drawer that opens from the <a href="#basics">inline start</a> no longer renders <code>.ui-inline-start</code>. Target <code>.ui-drawer:not(.ui-block-end, .ui-block-start, .ui-inline-end)</code> in your CSS instead.`,
      ),
      html: `A drawer opens from the <a href="#basics">inline start</a> without <code>.ui-inline-start</code>.`,
    },
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `<a href="#basics">Content</a> scrolls with <code>overflow-inline</code> and <code>overflow-block</code>, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them, and <code>compat.css</code> scrolls it through <code>overflow-y</code> there.`,
  ],
  form: [
    components(
      `A <a href="#without-fieldset"><code>Fieldset</code> rendered as another element</a> names itself from its <code>FieldLegend</code>.`,
    ),
    {
      ...slots(
        `Breaking: <a href="#field-group"><code>FieldGroup</code></a> no longer sets <code>role="group"</code>. Wrap it in a <code>Fieldset</code> to group and name the fields.`,
      ),
      html: `Drop <code>role="group"</code> from a <a href="#field-group"><code>.ui-field-group</code></a> inside a fieldset, which already groups the fields.`,
    },
    `A <a href="#field-group-horizontal">horizontal</a> field group lines its fields up at their end and grows a text field, textarea, select or number field to share the row, so a field and its button sit on one line.`,
  ],
  list: [
    components(
      `<a href="#ordered"><code>as="ol"</code></a> renders an ordered list, for a ranking or steps.`,
    ),
    `Smaller <a href="#icon">start</a> and end icons.`,
    `<a href="#dense">Dense</a> rows keep the default inline padding, so they line up with card content.`,
    `Only direct children are styled as rows, so nested lists inside a row stay normal lists (<a href="#under-the-hood">Under the hood</a>).`,
    `Breaking: <code>--_bg-color-hover</code> is <code>--_hover-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      astro: `Breaking: <code>ListItem</code> <a href="#checkbox"><code>choice</code></a> replaces <code>type</code>, and it can't be combined with <code>as</code> or <code>href</code> (types).`,
      vue: `Breaking: <code>ListItem</code> <a href="#checkbox"><code>choice</code></a> replaces <code>type</code>, and it can't be combined with <code>as</code> or <code>href</code> (types).`,
      react: `<code>ListItem</code> <a href="#checkbox"><code>choice</code></a> can't be combined with <code>as</code> or <code>href</code> (types).`,
      svelte: `<code>ListItem</code> <a href="#checkbox"><code>choice</code></a> can't be combined with <code>as</code> or <code>href</code> (types).`,
    },
    {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="filled"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="filled"</code>.`,
    },
    `<a href="#configurations">Row heights</a> follow <code>--ui-control-size</code> and <code>--ui-control-size-small</code>.`,
    `<a href="#clickable-list-item">Clickable rows</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  menu: [
    `Themes can set <a href="#api"><code>--ui-menu-radius</code></a> for a corner radius of its own.`,
    `The edge reads <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, like drawers and elevated cards, and the separators keep <code>--ui-border-color-on-raised</code>.`,
    `Themes can set <a href="#api"><code>--ui-list-item-padding-inline</code></a>. Descriptions read <code>--ui-text-subtle</code>.`,
    `The menu shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with drawers and select pickers.`,
    `<a href="#basics">Critical items</a> read <code>--ui-critical-text</code>.`,
  ],
  message: [
    `New: a <a href="#basics">Message</a> is a chat bubble that groups into runs, with <a href="#attachments">attachments</a>, <a href="#reactions">reactions</a> and a <a href="#typing">typing indicator</a>.`,
  ],
  "one-time-code": [
    `New: a <a href="#basics">One-time code</a> field draws one input as a box per character, with <a href="#grouped">grouped</a> halves, a <a href="#length">length</a> from 4 to 8 and <a href="#alphanumeric">alphanumeric</a> codes.`,
  ],
  progress: [
    `<a href="#inline">Progress bars</a> center in table cells and lines of text.`,
    {
      astro: `Breaking: a tonal <a href="#variants">progress bar</a> no longer renders <code>.ui-tonal</code>. Target <code>.ui-progress:not(.ui-filled)</code> in your CSS instead.`,
      vue: `Breaking: a tonal <a href="#variants">progress bar</a> no longer renders <code>.ui-tonal</code>. Target <code>.ui-progress:not(.ui-filled)</code> in your CSS instead.`,
      html: `The default <a href="#variants">tonal</a> track needs no <code>.ui-tonal</code>.`,
      react: `<a href="#variants">Variants</a> name the default: <code>variant="tonal"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="tonal"</code>.`,
    },
  ],
  radio: [
    `<a href="#cards">Cards</a> take <code>--ui-card-padding</code>.`,
    {
      default: `<a href="#cards">Cards</a> with the <code>card</code> prop, <code>spread</code> for the input at the end, and <code>variant="tonal"</code> or <code>"elevated"</code>.`,
      html: `<a href="#cards">Cards</a> with <code>.ui-card</code> on the label, plus <code>.ui-spread</code>, <code>.ui-tonal</code> or <code>.ui-elevated</code>.`,
    },
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers that line on the control.`,
    `Without a <a href="#hidden-label">visible label</a>, radios center in table cells and lines of text, and stay a 24px click target at every size.`,
    `Breaking: <code>choice.css</code> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Switch. Import it with them when you <a href="#installation">install single files</a>, or use <code>components.css</code>.`,
    `In dark mode the checked <a href="#basics">dot</a> stays light on a fill darkened to keep 3:1 contrast.`,
    `The hover <a href="#basics">halo</a> only shows on devices that can hover, so it no longer sticks after a tap.`,
  ],
  range: [
    `The empty track reaches <a href="#accessibility">3:1</a> against the page by default, and with more contrast it takes the page color with an inset edge so the fill stands out.`,
    `<a href="#spread">Spread</a> ranges line up with spread fields and collapse to a column in narrow containers.`,
    {
      ...slots(
        `Breaking: the track fill is CSS only (<a href="#under-the-hood">Under the hood</a>), and <code>--_track-fill</code> is gone. Remove any code of yours that sets it.`,
      ),
      html: `The track fill is CSS only, so plain HTML ranges <a href="#basics">fill</a> too.`,
    },
    components(
      `<a href="#tick-marks"><code>items</code></a> is typed as <code>RangeItem[]</code>, exported from every framework.`,
    ),
    {
      react: `The <a href="#value">value readout</a> follows the thumb through <code>range.js</code>, like in Astro, and <code>valueText</code> content renders from the value you keep.`,
      svelte: `The <a href="#value">value readout</a> follows the thumb through <code>range.js</code>, like in Astro, and the <code>valueText</code> snippet renders from the value you bind.`,
      vue: `The <a href="#value">value readout</a> follows the thumb through <code>range.js</code>, like in Astro, and the <code>value-text</code> slot renders from the value you bind.`,
    },
    {
      astro: `Breaking: extra attributes are typed as <code>&lt;input&gt;</code> attributes, where they go (<a href="#api">API</a>).`,
    },
    {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
    },
    `The <a href="#basics">thumb</a> and its ring only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
    `With labeled <a href="#tick-marks">tick marks</a>, the input names its value with the label of the tick at it, through <code>aria-valuetext</code>, so a screen reader says Medium rather than 1.`,
  ],
  select: [
    `A <code>Button</code> in the <a href="#affix">start or end</a> fits the field, a little inside its border, and Tab reaches the start, top, end and bottom in the order they're drawn, where the browser supports <code>reading-flow</code>.`,
    components(
      `The ids the select generates start with its <a href="#api"><code>id</code></a>: <code>x-start-text</code>, <code>x-end-text</code>, <code>x-start</code>, <code>x-end</code>, <code>x-top</code> and <code>x-bottom</code> for <code>id="x"</code>.`,
    ),
    `Helper text reads <a href="#api"><code>--ui-text-subtle</code></a>, options take <code>--ui-list-item-padding-inline</code>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On iPhone and iPad every field keeps at least 16px, so iOS Safari doesn't zoom in on focus.`,
    `The field border reaches <a href="#accessibility">3:1</a> against the page by default.`,
    `The selected option reads <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    `The chevron flips when the <a href="#variants">picker</a> opens.`,
    `<a href="#spread">Spread</a> fields line up at one width.`,
    `The <a href="#variants">arrow</a> is a chevron.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      astro: `Breaking: <a href="#preselected"><code>items</code></a> takes <code>SelectItem[]</code>, exported under that name.`,
      vue: `Breaking: <a href="#preselected"><code>items</code></a> takes <code>SelectItem[]</code>, exported under that name.`,
      react: `<a href="#preselected"><code>items</code></a> is typed as <code>SelectItem[]</code>, exported from every framework.`,
      svelte: `<a href="#preselected"><code>items</code></a> is typed as <code>SelectItem[]</code>, exported from every framework.`,
    },
    slots(
      `Breaking: <code>ClassicSelect</code> is gone. Use <code>Select</code>, which falls back to the browser's own picker (<a href="#browser-support">Browser support</a>).`,
    ),
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The <a href="#variants">picker</a> reads <a href="#api"><code>--ui-menu-radius</code></a> when a theme sets it, so it matches menus, and the field radius when it doesn't.`,
    `The picker shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus and drawers.`,
    `The field reads <a href="#api"><code>--ui-field-shadow</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
    `Themes can make the picker spring open with <a href="#api"><code>--ui-ease-move</code></a>.`,
    `Options take <a href="#rich-options">avatars, icons, swatches and descriptions</a>, and the field shows the icon and label of the selected one.`,
  ],
  spinner: [
    `With more contrast the <a href="#buttons">ring</a> is opaque, so it stands out on filled buttons and links.`,
    `Styles use logical properties only, so the <a href="#sizes">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  stat: [
    `New: a <a href="#basics">Stat</a> shows one number with its label and the change behind it, in a row of <a href="#cards">cards</a> on a dashboard.`,
  ],
  stepper: [
    `New: a <a href="#basics">Stepper</a> shows where someone is in a flow of steps, like a checkout, with <a href="#complete">complete</a> steps, steps with an <a href="#errors">error</a> and a <a href="#narrow">vertical</a> layout in narrow containers.`,
  ],
  switch: [
    `<a href="#cards">Cards</a> take <code>--ui-card-padding</code>.`,
    `Each <a href="#api">track width</a> is twice its track height until a theme sets it.`,
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers that line on the control.`,
    `Without a <a href="#hidden-label">visible label</a>, switches center in table cells and lines of text, and stay a 24px click target at every size.`,
    `Breaking: <code>choice.css</code> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Radio. Import it with them when you <a href="#installation">install single files</a>, or use <code>components.css</code>.`,
    `A checked invalid switch turns its track red, like Checkbox and Radio (<a href="#validation">Validation</a>).`,
    `In dark mode the <a href="#basics">thumb</a> stays light on a checked track darkened to keep 3:1 contrast.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `The <a href="#basics">switch</a> turns on and off at once, so a click or tap shows right away.`,
    `An invalid switch colors its <a href="#validation">track border</a> with <code>--ui-invalid</code>, like an invalid checkbox, instead of drawing a ring around the track.`,
  ],
  table: [
    `The caption reads <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `A checkbox alone in a cell is centered (<a href="#controls-in-cells">Controls in cells</a>).`,
    {
      default: `<a href="#density">Dense</a> tables have less block padding.`,
      html: `<a href="#density">Dense</a> tables (<code>.ui-dense</code>) have less block padding.`,
    },
    `<a href="#controls-in-cells">Fields and selects in cells</a> keep a <code>12ch</code> minimum width, in every density.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `The <a href="#sticky-header">sticky header</a> shadow reads <code>--ui-shadow-scroll</code>.`,
    `<a href="#normal">Rows</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#normal">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  tabs: [
    `<a href="#without-panels">Tabs without panels</a> are a radio group: give them <code>role="radiogroup"</code> and an <code>aria-label</code> that <a href="#accessibility">names the group</a>. Tabs with panels take no role.`,
    `<a href="#without-panels">Tabs without panels</a> size to their labels, also in a row next to a heading.`,
    `<a href="#api"><code>--_panel-gap</code></a> sets the space between the tab list and the panel.`,
    `Unselected labels read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-tabs-accent</code></a> for the selected label and the <a href="#line">line</a> indicator.`,
    `The <a href="#basics">selected pill</a> has a border, <code>--ui-control-border-color</code> or the field border, so it reaches 3:1 against the track without the shadow.`,
    `The outlined track reads <a href="#api"><code>--ui-control-border-color</code></a> for its border, like outlined buttons.`,
    `In dark mode the <a href="#basics">selected pill</a> is <code>--ui-text-strong</code> at <code>--ui-state-selected-alpha-accent</code>, so it follows a theme's grays.`,
    `The selected tab's shadow reads <a href="#api"><code>--ui-shadow-selected</code></a>, so themes can change or remove it.`,
    `Labels read <a href="#api"><code>--ui-font-size-control</code></a> for their font size, like buttons.`,
    components(
      `<a href="#basics">Variants</a> name the default: <code>variant="tonal"</code>.`,
    ),
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `The selected pill, and the line of <a href="#line">line tabs</a>, slides to the tab you select, where anchor positioning works (<a href="#basics">Basics</a>).`,
    `Themes can make the selected pill and line spring to the next tab with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  "text-field": [
    `A <code>Button</code> in the <a href="#affix">start or end</a> fits the field, a little inside its border, and Tab reaches the start, top, end and bottom in the order they're drawn, where the browser supports <code>reading-flow</code>.`,
    `Placeholders and helper text read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On iPhone and iPad every field keeps at least 16px, so iOS Safari doesn't zoom in on focus.`,
    `The field border, <a href="#api"><code>--ui-field-border-color</code></a>, reaches 3:1 against the page by default.`,
    `<a href="#spread">Spread</a> fields line up at one width.`,
    `The <a href="#autosuggest">auto-suggest</a> arrow is the Select chevron at every size.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#variants">Filled fields</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
    `<a href="#variants">Filled fields</a> fade their hover background, like the border.`,
    {
      astro: `Breaking: the start and end text describe the input instead of naming it, so give a field without a <code>label</code> <a href="#hidden-label"><code>aria-label</code></a> or <code>aria-labelledby</code>.`,
      vue: `Breaking: the start and end text describe the input instead of naming it, so give a field without a <code>label</code> <a href="#hidden-label"><code>aria-label</code></a> or <code>aria-labelledby</code>.`,
      react: `A field without a <code>label</code> is named by <a href="#hidden-label"><code>aria-label</code></a> or <code>aria-labelledby</code> alone, and the start and end text describe the input.`,
      svelte: `A field without a <code>label</code> is named by <a href="#hidden-label"><code>aria-label</code></a> or <code>aria-labelledby</code> alone, and the start and end text describe the input.`,
    },
  ],
  textarea: [
    `A <code>Button</code> in the <a href="#affix">start or end</a> fits the first line and centers on it, taller content starts a little below the field's top, and Tab reaches the parts in the order they're drawn, where the browser supports <code>reading-flow</code>.`,
    `A <a href="#buttons">button</a> can go in an affix, like a send button, and stays out of the field's name.`,
    `Placeholders and helper text read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On iPhone and iPad every field keeps at least 16px, so iOS Safari doesn't zoom in on focus.`,
    `The field border, <a href="#api"><code>--ui-field-border-color</code></a>, reaches 3:1 against the page by default.`,
    `<a href="#spread">Spread</a> fields line up at one width.`,
    `The minimum height is three lines plus padding at every <a href="#sizes">size</a>.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The field reads <a href="#api"><code>--ui-field-shadow</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    `Styles use logical properties only, so the <a href="#variants">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `<a href="#variants">Filled textareas</a> fade their hover background, like the border.`,
    {
      astro: `Breaking: the start and end text describe the textarea instead of naming it, so give a textarea without a <code>label</code> <code>aria-label</code> or <code>aria-labelledby</code> (<a href="#api">API</a>).`,
      vue: `Breaking: the start and end text describe the textarea instead of naming it, so give a textarea without a <code>label</code> <code>aria-label</code> or <code>aria-labelledby</code> (<a href="#api">API</a>).`,
      react: `A textarea without a <code>label</code> is named by <code>aria-label</code> or <code>aria-labelledby</code> alone, and the start and end text describe it (<a href="#api">API</a>).`,
      svelte: `A textarea without a <code>label</code> is named by <code>aria-label</code> or <code>aria-labelledby</code> alone, and the start and end text describe it (<a href="#api">API</a>).`,
    },
  ],
  timeline: [
    `New: a <a href="#basics">Timeline</a> lists dated events with markers and a connecting line, with <a href="#colors">colors</a>, a <a href="#current">current item</a> and a <a href="#tracked">tracked</a> line.`,
  ],
  toast: [
    `Themes can make toasts spring in with <a href="#api"><code>--ui-ease-move</code></a>.`,
    `With <code>viewport-fit=cover</code>, toasts stay clear of a phone's notch and home indicator (<a href="#position">Position</a>).`,
    `A modal dialog <a href="#in-a-dialog">gets a toaster of its own</a>, and a toaster outside the open dialog warns in the console.`,
    `The severity and close <a href="#icons">icons</a> are the Callout's masks, so the <code>--ui-icon-*</code> tokens swap them for your own, on one toaster or in the theme.`,
    `A critical toast is announced through an <a href="#accessibility">assertive region</a>, so it interrupts other speech.`,
    {
      ...slots(
        `Breaking: <a href="#basics"><code>Toaster</code></a> replaces <code>Toast</code>. Show toasts with <a href="#from-a-script"><code>toast()</code></a> instead of <code>showToast()</code>.`,
      ),
      html: `Breaking: <code>.ui-toast</code>, <code>toast.css</code> and <code>css/js/toast.js</code> are gone. Use <a href="#basics"><code>&lt;opui-toaster&gt;</code></a> and <a href="#from-a-script"><code>toast()</code></a> from <code>opui-css/elements/toaster.js</code>.`,
    },
  ],
  toggle: [
    `A <a href="#toggle-button">checked <code>ToggleButton</code></a> is filled with <code>--ui-primary</code> in every contrast mode, not only a tint.`,
    `A checked <code>ToggleButton</code> reads <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    `<a href="#sizes">Small and x-small</a> toggles use smaller text, like <code>Button</code>.`,
    {
      vue: `A standalone <code>ToggleButton</code> binds its checked state with <code>v-model</code> (<a href="#binding">Binding</a>).`,
    },
    `<code>--_duration</code> and <code>--_ease</code> set the duration and easing of the hover, selected and focus ring transitions (<a href="#under-the-hood">Under the hood</a>).`,
    `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    slots(
      `Breaking: <code>ToggleButton</code> <code>pressed</code> is <a href="#single-select"><code>checked</code></a>.`,
    ),
    `The <a href="#toggle-button">toggle button</a> focus ring sits at <code>--ui-focus-ring-inset</code>, like every other inset ring.`,
    `<a href="#toggle-button">Toggle buttons</a> fade their hover and selected colors, like buttons, also in a <a href="#toggle-group">group</a>.`,
    `Themes can shrink a <a href="#toggle-button">toggle button</a> while it's pressed with <code>--ui-press-scale</code>, except in a group.`,
  ],
  tooltip: [
    {
      ...slots(
        `Breaking: <code>Tooltip</code> no longer renders <code>.ui-anchor</code>. Style <a href="#basics"><code>.ui-tooltip</code></a> instead.`,
      ),
      html: `Breaking: <code>.ui-anchor</code> is no longer needed on <a href="#basics"><code>.ui-tooltip</code></a>, which <code>anchor.css</code> positions itself.`,
    },
    `The <a href="#arrow">arrow</a> points at the trigger in every position, also after a flip.`,
    `Corners never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
    `<a href="#api"><code>--_max-inline-size</code></a> sets the maximum width.`,
    `<a href="#text-only">Tooltip text</a> uses <code>--ui-line-height-tight</code> (1.25), shared with card captions and keyboard hints.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    components(
      `A <code>Tooltip</code> without an <code>id</code> warns in development, since its trigger points at it with <code>interestfor</code> (<a href="#basics">Basics</a>).`,
    ),
    `In browsers without interest invokers, the compat layer shows the tooltip while its trigger is hovered or has keyboard focus (<a href="#accessibility">Accessibility</a>).`,
    `Themes can make a tooltip without an arrow spring open with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  typography: [
    `<a href="#rich-text-showcase">Inline <code>code</code></a> reads <code>--ui-code-bg-color</code>, code blocks read <code>--ui-code-block-bg-color</code> and <code>--ui-code-block-text-color</code>, and <code>del</code>, <code>ins</code> and <code>abbr</code> read <code>--ui-critical-text</code>, <code>--ui-success-text</code> and <code>--ui-info</code>.`,
    `Breaking: <a href="#inline-text-elements"><code>del</code>, <code>ins</code>, <code>abbr</code> and <code>dfn</code></a> and their classes are no longer severity scopes, so content inside them keeps the page palette.`,
    `<a href="#variants">Text sizes</a> follow the type roles <code>--ui-font-size-caption</code>, <code>--ui-font-size-small</code>, <code>--ui-font-size-body</code> and <code>--ui-font-size-large</code> on the <code>--ui-font-size-100</code> to <code>900</code> scale, with <code>--ui-line-height-*</code> and <code>--ui-letter-spacing-*</code> roles for the rest, so a theme reshapes the type in a few lines.`,
    `<a href="#classless">Rich text</a> spacing comes from one flow space, with more room above headings than below. Themes set it with <code>--ui-rich-text-flow-gap</code>, space headings with <code>--ui-rich-text-heading-margin-block-start</code> and <code>--ui-rich-text-heading-margin-block-end</code>, and loosen prose with <code>--ui-rich-text-line-height</code>.`,
    `<a href="#rich-text-showcase">Rich text</a> styles tables, which scroll sideways in narrow columns, <code>hr</code> and task lists.`,
    `<a href="#rich-text-showcase">Rich text</a> headings, <code>pre</code> and <code>small</code> scale with the surrounding font size, and so does <a href="#inline-text-elements"><code>.ui-small</code></a>.`,
    `Rich text <code>var</code> is monospace, like <a href="#inline-text-elements"><code>.ui-var</code></a>.`,
    `<a href="#link">Links</a> are documented, and get a thicker underline on hover.`,
    `Headings read <a href="#api"><code>--ui-font-heading</code></a>, and code, <code>kbd</code>, <code>samp</code> and <code>.ui-var</code> read <code>--ui-font-code</code>. Rich text padding and gaps read the <code>--ui-space-*</code> scale; its margins come from the flow space.`,
    `<a href="#link">Links</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#classless">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `<a href="#rich-text-showcase">Rich text</a> with tables and code blocks scrolls with <code>overflow-inline</code> and <code>overflow-block</code>, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them, and <code>compat.css</code> scrolls the tables and code blocks through <code>overflow-x</code> there.`,
    `<a href="#link">Links</a> fade to their hover and focus color.`,
    `Themes can set <a href="#link"><code>--ui-link-focus: highlight</code></a> to fill a focused link with the focus color and draw a bar under it instead of the ring, like GOV.UK.`,
    `<a href="#rich-text-showcase">Rich text</a> figure captions are muted and start-aligned under quotes, code blocks and tables.`,
  ],
}

/**
 * The New and Updated components on the components page. The New badge in the
 * sidebar is off until the next minor or patch release. A slug is in the set
 * when the unreleased version adds the component (`carousel`, `layout`,
 * `menu`), or changes how it looks with no props or modifier classes set, so an
 * existing page renders differently without a code change: its surface, shape,
 * layout or type scale (`accordion` is `plain` with a chevron, `button` icon
 * padding, `card` actions at the end, `tabs` a segmented control, `typography`
 * heading sizes). Renames, new props, token rewiring and fixes stay out,
 * however many notes they add.
 */
export const highlighted = new Set<string>([
  "accordion",
  "button",
  "card",
  "carousel",
  "control-group",
  "copy",
  "layout",
  "menu",
  "message",
  "number-field",
  "one-time-code",
  "rating",
  "stat",
  "stepper",
  "tabs",
  "timeline",
  "toast",
  "typography",
])

export const added = new Set<string>([
  "carousel",
  "copy",
  "layout",
  "menu",
  "message",
  "number-field",
  "one-time-code",
  "rating",
  "stat",
  "stepper",
  "timeline",
  "toast",
])

const BREAKING = /^Breaking:\s*/

export const legacyNotesFor = (
  notes: Record<string, Note[]>,
  framework: FrameworkId,
  slug: string,
) =>
  (notes[slug] ?? []).flatMap((note) => {
    const text = noteText(note, framework)
    return text === undefined
      ? []
      : [{ breaking: BREAKING.test(text), text: text.replace(BREAKING, "") }]
  })

export const notesByPage = () => {
  const pages: Record<string, Note[]> = {}
  for (const [slug, notes] of Object.entries(legacyNotes)) {
    pages[slug] = [...notes]
  }
  for (const { notes } of changes) {
    for (const [slug, note] of Object.entries(notes ?? {})) {
      pages[slug] = [...(pages[slug] ?? []), ...[note].flat()]
    }
  }
  return pages
}

export function whatsNewFor(framework: FrameworkId, slug: string) {
  return [
    ...pageNotes(changes, framework, slug),
    ...(changes.at(-1)?.version === LEGACY_VERSION
      ? legacyNotesFor(legacyNotes, framework, slug)
      : []),
  ]
}

export function isWhatsNewHighlighted(framework: FrameworkId, slug: string) {
  return highlighted.has(slug) && whatsNewFor(framework, slug).length > 0
}
