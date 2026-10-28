import type { FrameworkId } from "./framework"

type Note = string | Partial<Record<FrameworkId | "default", string>>

const components = (note: string) => ({
  astro: note,
  react: note,
  svelte: note,
  vue: note,
})

const slots = (note: string) => ({ astro: note, vue: note })

export const whatsNew = {
  accordion: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a>.`,
    `Breaking: <code>--_border-radius</code> is <code>--_radius</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: <code>Accordion</code> no longer renders <code>.ui-card</code>. Style <a href="#basics"><code>.ui-accordion</code></a> instead.`,
      ),
      html: `Breaking: <code>.ui-card</code> is no longer needed on <a href="#basics"><code>.ui-accordion</code></a>, which <code>card.css</code> styles itself.`,
    },
    `Tonal and elevated <a href="#variants">accordions</a> have a border in the page background color, like cards, so they stay visible on tonal surfaces.`,
    `The <a href="#accessibility">inset focus ring</a> sits at <code>--ui-focus-ring-inset</code> like every other inset ring, and <a href="#variants">elevated and tonal accordions</a> keep a border in forced colors.`,
    slots(
      `Breaking: <a href="#basics"><code>AccordionSummary</code>, <code>AccordionContent</code></a> and <a href="#actions"><code>AccordionActions</code></a> replace the slots, and the root no longer wraps its children in <code>.ui-content</code>.`,
    ),
    {
      default: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
      html: `<a href="#marker-animation">Marker animation</a> with <code>.ui-marker-animation-flip</code> or <code>.ui-marker-animation-turn</code>. The marker rotates without a class.`,
    },
    slots(
      `Breaking: a chevron marker by default. The <a href="#custom-marker"><code>marker</code> slot</a> on <code>AccordionSummary</code> replaces it, so move a custom chevron there with <code>.ui-marker</code> or it shows twice.`,
    ),
    {
      html: `Breaking: only the <a href="#custom-marker"><code>svg.ui-marker</code></a> animates. Add <code>.ui-marker</code> to the chevron.`,
    },
    `<a href="#actions">Actions</a> line up with the content and the chevron.`,
    {
      ...components(
        `<a href="#actions"><code>AccordionActions</code></a> take <code>align="start"</code>.`,
      ),
      html: `<a href="#actions">Actions</a> take <code>.ui-align-start</code>.`,
    },
    `Breaking: <code>--_transition</code> is <code>--_duration</code>, and <code>--_svg-transition</code> is gone, the chevron and the open and close transition use <code>--_duration</code> and <code>--_ease</code>, and the group's <code>--_gutter-color</code> is <code>--_divider-border-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: an accordion without a <a href="#variants">variant</a> is <code>plain</code>, the page surface with padding, like a card. <code>variant="default"</code> is gone: use <code>variant="transparent"</code> for the previous look.`,
      ),
      html: `Breaking: an accordion without a <a href="#variants">variant class</a> has the page surface and padding, like a card. Add <code>.ui-transparent</code> for the previous look.`,
    },
    `Elevated accordions use <a href="#api"><code>--ui-shadow-elevated</code></a>, the elevated card shadow, also in dark mode. Padding and gaps read the <code>--ui-space-*</code> scale.`,
    `<a href="#variants">Tonal and outlined</a> accordions read <a href="#api"><code>--ui-shadow-surface</code></a>, <code>none</code> unless a theme sets it, and tonal and elevated accordions <code>--ui-border-color-raised</code>.`,
    {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
    },
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `Open <a href="#basics">content</a> scrolls with <code>overflow-inline</code> and <code>overflow-block</code>, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them and don't scroll it.`,
  ],
  anchor: [
    `Breaking: <code>--_anchor-tx</code> and <code>--_anchor-ty</code> are <code>--_shift-x</code> and <code>--_shift-y</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `Breaking: the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
    },
    slots(
      `Breaking: <a href="#hover-trigger"><code>trigger</code></a> only takes <code>"hover"</code>. Leave it out instead of <code>trigger="always"</code>.`,
    ),
    slots(
      `Breaking: <a href="#api"><code>AnchorContent</code></a> replaces the <code>anchored</code> slot.`,
    ),
    slots(
      `Breaking: <a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
    ),
    slots(
      `Breaking: <code>alignment</code> is <a href="#always-visible"><code>positionArea</code></a>.`,
    ),
    components(
      `A <a href="#hover-trigger">hover anchor</a> without an <code>id</code> warns in development, since its trigger points at it with <code>interestfor</code>.`,
    ),
  ],
  avatar: [
    `<a href="#variants"><code>variant</code></a> takes <code>tonal</code> for the primary tint and <code>outlined</code> for the border color with no fill.`,
    components(
      `A link avatar takes <a href="#disabled"><code>disabled</code></a>: it drops its <code>href</code> and gets <code>aria-disabled="true"</code>.`,
    ),
    `<a href="#letter">Initials</a> read the type roles: <code>--ui-font-size-caption</code>, <code>--ui-font-size-small</code> and <code>--ui-font-size-large</code> by <a href="#sizes">size</a>.`,
    `A badge on a <a href="#grouped">grouped</a> avatar sits on its start side, the part the next avatar doesn't cover, with the same ring as the avatars.`,
    slots(
      `Breaking: <a href="#image"><code>alt</code></a> is required when <code>src</code> is set.`,
    ),
    slots(
      `Breaking: <code>as="button"</code> renders <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    ),
    {
      default: `<a href="#sizes">Sizes</a> with <code>size="x-small"</code>, <code>size="small"</code> and <code>size="large"</code>.`,
      html: `<a href="#sizes">Sizes</a> with <code>.ui-x-small</code>, <code>.ui-small</code> and <code>.ui-large</code>.`,
    },
    `Breaking: <code>--_color</code> is <code>--_text-color</code> and <code>--_width</code> is <code>--_size</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      vue: `<code>command</code>, <code>commandfor</code> and <code>interestfor</code> pass through as attributes instead of props (<a href="#api">API</a>).`,
    },
    components(
      `Breaking: a button avatar needs <code>as="button"</code>, and <code>disabled</code> only goes with it (<a href="#api">types</a>).`,
    ),
    components(
      `Breaking: <a href="#grouped"><code>AvatarGroup</code></a> groups avatars and replaces the <code>isGroup</code> prop.`,
    ),
    `Rounded avatars never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
    `Without <code>corner-shape</code>, a squircle is a rounded square with corners at 27% of its size, from the compat layer (<a href="#browser-support">Browser support</a>).`,
    `The ring around <a href="#grouped">grouped</a> avatars reads <code>--ui-border-width-thick</code>.`,
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    slots(
      `Breaking: <code>variant</code> is <a href="#shapes"><code>shape</code></a>, with <code>circle</code> as the default.`,
    ),
    `<a href="#grouped">Grouped</a> avatars overlap by <code>--ui-space-2</code>, so the initials stay whole.`,
    `Text on a <a href="#letter">letter</a> avatar reads <code>--ui-on-primary</code>.`,
    `<a href="#sizes">Sizes</a> follow <code>--ui-control-size</code> and the <code>--ui-button-size-*</code> scale, like buttons.`,
  ],
  badge: [
    `Breaking: <code>--_anchor-tx</code> and <code>--_anchor-ty</code> are <code>--_shift-x</code> and <code>--_shift-y</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: <code>Badge</code> no longer renders <code>.ui-anchor</code>. Style <a href="#api"><code>.ui-badge</code></a> instead.`,
      ),
      html: `Breaking: <code>.ui-anchor</code> is no longer needed on <a href="#api"><code>.ui-badge</code></a>, which <code>anchor.css</code> positions itself.`,
    },
    `<a href="#colors">Severity</a> text reads <code>--ui-on-fill</code> and <code>--ui-palette-strong</code> instead of fixed grays.`,
    `Badges on round avatars sit on the avatar's edge (<a href="#corners">Corners</a>), and in an avatar group on the start side.`,
    {
      default: `<a href="#indicator">Indicator</a> text for screen readers with <code>hideLabel</code>: one translated <code>label</code>, and the short visible text in <code>indicator</code>.`,
      html: `<a href="#indicator">Indicator</a> text for screen readers with <code>.ui-sr-only</code>, next to the visible text with <code>aria-hidden="true"</code>.`,
    },
    {
      ...slots(
        `Breaking: the indicator is <a href="#indicator"><code>.ui-indicator</code></a> instead of <code>.ui-badge-indicator</code>, inside <code>.ui-floating</code> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `Breaking: the indicator is <a href="#indicator"><code>.ui-indicator</code></a> instead of <code>.ui-badge-indicator</code>, inside <code>.ui-floating</code> instead of <code>.ui-anchor-floating</code>.`,
    },
    slots(`Breaking: <a href="#indicator"><code>label</code></a> is a string.`),
    components(
      `<a href="#corners"><code>corner</code></a> takes <code>"start-end"</code>, the default corner.`,
    ),
    `Breaking: <code>--_badge-inset</code> is <code>--_inset-block</code> and <code>--_inset-inline</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `The indicator border reads <a href="#api"><code>--ui-border-width-thick</code></a>.`,
    `<a href="#colors">Warning</a> badges read <code>--ui-on-warning</code>, the text color on a warning fill.`,
    `<a href="#colors">Critical, info, neutral and success</a> fills stay below <code>--ui-accent-fill-max-lightness</code>, so their text keeps its contrast.`,
    slots(
      `Breaking: <code>alignment</code> is <a href="#corners"><code>corner</code></a>.`,
    ),
    `Text on a primary <a href="#colors">badge</a> reads <code>--ui-on-primary</code>.`,
  ],
  button: [
    `Themes can set <a href="#api"><code>--ui-button-hover: layer</code></a> for state-layer hover and pressed states, and <code>--ui-button-padding-inline</code> with its <code>-x-small</code>, <code>-small</code> and <code>-large</code> variants for the horizontal padding per size.`,
    `Themes can set <a href="#api"><code>--ui-button-accent-filled</code></a> and <code>--ui-button-on-accent-filled</code> to give filled buttons a color of their own.`,
    `Breaking: <code>--_border-radius</code> is <code>--_radius</code> and <code>--_min-height</code> is <code>--_size</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `The <a href="#file-upload">file input</a> takes <code>--ui-shadow-field</code> and <code>--ui-radius-small</code> like other fields.`,
    `Primary tonal buttons read <a href="#api"><code>--ui-primary-tonal</code></a> and <code>--ui-on-primary-tonal</code> when a theme sets them.`,
    {
      default: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>round</code> makes them round.`,
      html: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>.ui-round</code> makes them round.`,
    },
    {
      ...slots(
        `Breaking: replaces <code>IconButton</code>. An <a href="#icon-only">icon-only</a> button is a <code>Button</code> with just an <code>svg</code>.`,
      ),
      html: `Breaking: <code>.ui-icon-button</code> and <code>icon-button.css</code> are gone. An <a href="#icon-only">icon-only</a> button is a <code>.ui-button</code> with just an <code>svg</code>.`,
    },
    `Breaking: icon styles only apply to a direct child <code>svg</code>. Wrap the label in a <code>&lt;span class="ui-text"&gt;</code> next to an icon to <a href="#buttons-with-icon-and-label">tighten the padding</a>, or the button renders as icon-only.`,
    {
      html: `Breaking: <code>.ui-icon-only</code> is removed. A button whose only child is an <code>svg</code> is <a href="#icon-only">square</a>.`,
    },
    `Links with <code>aria-disabled="true"</code> <a href="#disabled">look and act disabled</a>.`,
    slots(
      `Breaking: no <code>.ui-disabled</code> on a <a href="#disabled">disabled</a> button. Style <code>:disabled</code> or <code>[aria-disabled="true"]</code>.`,
    ),
    `<a href="#colors">Primary and critical</a> colors pass contrast in light and dark mode.`,
    slots(
      `Breaking: buttons render <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    ),
    {
      react: `<a href="#icon-only">Icon-only</a> buttons need <code>aria-label</code> or <code>aria-labelledby</code> when there are no <code>children</code> (types only).`,
      svelte: `<a href="#icon-only">Icon-only</a> buttons need <code>aria-label</code> or <code>aria-labelledby</code> when there are no <code>children</code> (types only).`,
    },
    components(
      `Breaking: a button takes link attributes only with <code>href</code> (<a href="#api">types</a>).`,
    ),
    `Breaking: <code>--_color</code>, <code>--_color-contrast</code> and <code>--_color-tonal</code> are <code>--_accent</code>, <code>--_on-accent</code> and <code>--_accent-tonal</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Breaking: <a href="#disabled">disabled links</a> have no <code>href</code>, so they can't be focused or followed.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `Themes set the color of <a href="#colors">default buttons</a> with <a href="#api"><code>--ui-button-accent</code></a> and <code>--ui-button-on-accent</code>, or of every control at once with <code>--ui-control-accent</code> and <code>--ui-on-control-accent</code>, the border with <code>--ui-control-border-color</code> (outlined) and <code>--ui-control-border-color-filled</code> (filled and tonal), the font weight with <code>--ui-button-font-weight</code>, the shadow with <code>--ui-shadow-control</code>, the hover shadow and offset with <code>--ui-button-hover-shadow</code> and <code>--ui-button-hover-translate</code>, and the font size with <code>--ui-font-size-control</code>. In dark mode the text stays at least as light as <code>--ui-text-min-lightness</code>, like the intent text roles.`,
    `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code>, the same readable primary as links, and critical ones <code>--ui-critical-text</code>.`,
    `<a href="#colors">Critical</a> fills and their hover and pressed shades stay within <code>--ui-accent-fill-max-lightness</code>, and the border keeps <code>--ui-critical</code>.`,
    components(
      `<a href="#sizes">Sizes</a> and <a href="#variants">variants</a> name their defaults: <code>size="medium"</code> and <code>variant="transparent"</code>.`,
    ),
    `<a href="#keyboard">Keyboard hints</a> use <code>--ui-line-height-tight</code> (1.25), shared with card captions and tooltips.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
    `Themes can shrink a button while it's pressed with <a href="#api"><code>--ui-press-scale</code></a>, eased by <code>--ui-ease-move</code>. Buttons in a group never scale.`,
  ],
  "button-group": [
    `Themes can set <a href="#api"><code>--ui-button-hover: layer</code></a> for state-layer hover and pressed states, <code>--ui-button-padding-inline</code> with its size variants, and <code>--ui-button-accent-filled</code> with <code>--ui-button-on-accent-filled</code> for the filled color.`,
    `Breaking: <code>--_border-radius</code> and <code>--_divider-color</code> are <code>--_radius</code> and <code>--_divider-border-color</code>, and <code>--_min-height</code> is gone: set <code>--_size</code> on the buttons (<a href="#under-the-hood">Under the hood</a>).`,
    `The <a href="#accessibility">inset focus ring</a> sits at <code>--ui-focus-ring-inset</code>, and the dividers stay visible in forced colors.`,
    `Buttons in a group draw their <a href="#accessibility">focus ring</a> with <code>--ui-focus-ring-color</code>.`,
    `Primary tonal groups read <a href="#api"><code>--ui-primary-tonal</code></a> and <code>--ui-on-primary-tonal</code> when a theme sets them.`,
    `<a href="#icons">Icon-only buttons</a> stay square and use the same icon size as buttons with a label.`,
    `The focus ring shows on every <a href="#variants">variant</a>, inside the button.`,
    `<a href="#split-button">Split button</a> with a <code>Menu</code>.`,
    `Breaking: <a href="#variants">variants</a> apply to the whole group. A variant on a single button inside a group is no longer supported.`,
    {
      default: `<a href="#sizes">x-small</a> size with <code>size="x-small"</code>.`,
      html: `<a href="#sizes">x-small</a> size with <code>.ui-x-small</code>.`,
    },
    `<a href="#sizes">Small</a> groups use the same text size as a small <code>Button</code>.`,
    {
      default: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>overflow="scroll"</code> or truncates with <code>overflow="shrink"</code>.`,
      html: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>.ui-overflow-scroll</code> or truncates with <code>.ui-overflow-shrink</code>.`,
    },
    {
      default: `Button links (<code>href</code>) get the group styles too, see <a href="#variants">Variants</a>.`,
      html: `<code>&lt;a class="ui-button"&gt;</code> links get the group styles too, see <a href="#variants">Variants</a>.`,
    },
    components(
      `<a href="#vertical-orientation"><code>orientation</code></a> takes <code>"horizontal"</code>, the default, like <code>Carousel</code>.`,
    ),
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `Themes set the color of groups without <code>.ui-primary</code> or <code>.ui-critical</code> with <a href="#api"><code>--ui-button-accent</code></a> or <code>--ui-control-accent</code>, the edge and dividers of outlined groups with <code>--ui-control-border-color</code> and of filled and tonal groups with <code>--ui-control-border-color-filled</code>, and the font weight and size with <code>--ui-button-font-weight</code> and <code>--ui-font-size-control</code>, like buttons. In dark mode the text stays at least as light as <code>--ui-text-min-lightness</code>.`,
    `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code>, the same readable primary as links.`,
    `<a href="#colors">Critical</a> fills stay within <code>--ui-accent-fill-max-lightness</code>, like buttons, and with more contrast the outlined edge reads <code>--ui-critical-text</code>, like the dividers.`,
    components(
      `<a href="#sizes">Sizes</a> and <a href="#variants">variants</a> name their defaults: <code>size="medium"</code> and <code>variant="transparent"</code>.`,
    ),
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#sizes">Sizes</a> follow <code>--ui-control-size</code> and <code>--ui-button-size-*</code>, like buttons.`,
  ],
  callout: [
    `Breaking: <code>--_border-radius</code> is <code>--_radius</code>, and <code>--_icon-color</code>, <code>--_outlined-icon-color</code> and <code>--_link-hover-color</code> are <code>--_icon-text-color</code>, <code>--_outlined-icon-text-color</code> and <code>--_link-hover-text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Severity fills, borders, icons and text read the <a href="#api"><code>--ui-palette-*</code></a> roles, so a theme restyles every severity at once.`,
    `Tonal <a href="#severities">severity callouts</a> have a visible fill in light mode.`,
    `<a href="#severities">Severity callouts</a> take their palette from <code>--ui-critical</code>, <code>--ui-info</code>, <code>--ui-neutral</code>, <code>--ui-success</code> and <code>--ui-warning</code>, so a theme recolors each with one token.`,
    slots(
      `Breaking: <a href="#icon"><code>CalloutIcon</code></a> and <a href="#variants"><code>CalloutContent</code></a> replace the automatic icon, the content wrapper and the slots. Write the title as a plain heading in <code>CalloutContent</code> instead of the <code>title</code> slot and <code>headingLevel</code>.`,
    ),
    components(
      `<a href="#icon"><code>CalloutIcon</code></a> has a <code>success</code> icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
    ),
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, <code>--_outlined-color</code> is <code>--_outlined-text-color</code> and <code>--_surface-bg</code> is <code>--_surface-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#variants">Callouts</a> read <a href="#api"><code>--ui-shadow-surface</code></a>, and callouts without a severity <code>--ui-border-color-raised</code>, when a theme sets them.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#severities">Links</a> in a callout only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Links in a <a href="#variants">callout</a> fade to their hover and focus color.`,
  ],
  card: [
    `<a href="#density"><code>density</code></a> takes <code>spacious</code> for a card that stands alone, such as a sign-in form, and <code>dense</code> for a small stat.`,
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a>.`,
    {
      ...components(
        `<a href="#header"><code>CardHeader</code></a> renders <code>hgroup.ui-header</code>.`,
      ),
      html: `The <a href="#header">header</a> takes <code>.ui-header</code> on its <code>hgroup</code>, like the <code>Drawer</code> header.`,
    },
    slots(
      `Breaking: <a href="#api"><code>CardHeader</code>, <code>CardContent</code> and <code>CardActions</code></a> replace the slots, and <code>align</code> on <code>CardActions</code> replaces <code>actionsAlign</code>.`,
    ),
    `Add <code>.ui-card-link</code> to a link to make the <a href="#clickable">whole card clickable</a>.`,
    `<a href="#variants">Tonal and elevated</a> cards have a border in the page background color, so they stay visible on tonal surfaces.`,
    `<a href="#actions">Actions</a> stick to the bottom of stretched cards and wrap when they don't fit.`,
    {
      ...components(
        `<a href="#variants"><code>CardContent</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
      ),
      html: `<a href="#variants"><code>.ui-content</code></a> is a stack with <code>--ui-space-3</code> between its children and no block margins, so a body with several elements needs no CSS. Content with inline children keeps the normal flow.`,
    },
    {
      ...slots(
        `Breaking: <a href="#actions-alignment">actions</a> sit at the end by default. Set <code>align="start"</code> on <code>CardActions</code> to line them up with the content.`,
      ),
      html: `Breaking: <a href="#actions-alignment">actions</a> sit at the end by default. Add <code>.ui-align-start</code> to line them up with the content.`,
      react: `<a href="#actions-alignment">Actions</a> sit at the end by default, and <code>align="start"</code> lines them up with the content.`,
      svelte: `<a href="#actions-alignment">Actions</a> sit at the end by default, and <code>align="start"</code> lines them up with the content.`,
    },
    `Breaking: <code>--_card-bg-color</code>, <code>--_card-border-color</code>, <code>--_card-border-width</code> and <code>--_card-shadow</code> drop the <code>card-</code> prefix, the outlined <code>--_border-color</code> is <code>--_outlined-border-color</code>, and <code>--_bg-surface</code>, <code>--_bg-tonal</code> and <code>--_bg-elevated</code> are <code>--_surface-bg-color</code>, <code>--_tonal-bg-color</code> and <code>--_elevated-bg-color</code>, and <code>--_shadow-elevated</code> is <code>--_elevated-shadow</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the duration and easing of the card link border transition and the focus ring animation (<a href="#under-the-hood">Under the hood</a>).`,
    `Elevated cards use <a href="#api"><code>--ui-shadow-elevated</code></a>, and padding and gaps read the <code>--ui-space-*</code> scale.`,
    `Breaking: <code>--_shadow-light</code> and <code>--_shadow-dark</code> are gone. Set <a href="#api"><code>--ui-shadow-elevated</code></a> in your theme, one shadow whose color follows <code>--ui-shadow-color</code> in each scheme, or <a href="#component-properties"><code>--_elevated-shadow</code></a> on the card.`,
    `<a href="#variants">Tonal and outlined</a> cards read <a href="#api"><code>--ui-shadow-surface</code></a>, and tonal and elevated cards <code>--ui-border-color-raised</code>, when a theme sets them.`,
    `Borders inside <a href="#variants">tonal and elevated</a> cards read <code>--ui-border-color-on-raised</code> and <code>--ui-field-border-color-on-raised</code>, so a theme's borders reach inside.`,
    components(
      `<a href="#variants">Variants</a> name the default: <code>variant="plain"</code>.`,
    ),
    {
      ...slots(
        `Breaking: <code>variant="text"</code> is <a href="#variants"><code>variant="transparent"</code></a>.`,
      ),
      html: `Breaking: <code>.ui-text</code> on a card is <a href="#variants"><code>.ui-transparent</code></a>.`,
    },
    `Captions use <a href="#api"><code>--ui-line-height-tight</code></a> (1.25), shared with tooltip text and keyboard hints.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#clickable">Card links</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The border of a <a href="#clickable">clickable card</a> fades in on hover.`,
  ],
  carousel: [
    `The scroll buttons take <a href="#api"><code>--ui-shadow-overlay</code></a>, so a theme's shadows reach them.`,
    `The scroll buttons read <a href="#api"><code>--ui-control-border-color-filled</code></a> for their border when a theme sets it.`,
    {
      ...components(
        `<a href="#images">Images</a> are cropped with the <code>aspectRatio</code> prop.`,
      ),
      html: `<a href="#images">Images</a> are cropped with <code>--_media-aspect-ratio</code>.`,
    },
    `A <a href="#playground">playground</a> to try the options together.`,
    `New component. A <a href="#basics">scroll snap carousel</a> with buttons and markers generated by CSS.`,
    {
      default: `<a href="#persistent-buttons">Persistent buttons</a> with the <code>persistentButtons</code> prop.`,
      html: `<a href="#persistent-buttons">Persistent buttons</a> with <code>.ui-persistent-buttons</code>.`,
    },
    {
      default: `<a href="#vertical">Vertical</a> carousels with <code>orientation="vertical"</code>.`,
      html: `<a href="#vertical">Vertical</a> carousels with <code>.ui-vertical</code>.`,
    },
    {
      default: `<a href="#stretch">Stretch</a> cards to equal height with the <code>stretch</code> prop.`,
      html: `<a href="#stretch">Stretch</a> cards to equal height with <code>.ui-stretch</code>.`,
    },
    `The <a href="#buttons-outside">scroll buttons</a> draw one glyph as the inverse of the button face, so it follows <code>.ui-dark</code>, <code>.ui-light</code> and forced colors in every browser.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Markers are rings in <code>--ui-text</code>, which keep their contrast in every theme, and the current marker is a larger dot in <a href="#api"><code>--ui-selected-strong</code></a>.`,
    `<a href="#component-properties"><code>--_marker-selected-padding</code></a> and <code>--_marker-border-color</code> style the markers.`,
  ],
  checkbox: [
    `<a href="#cards">Cards</a> take <code>--ui-card-padding</code>.`,
    {
      default: `<a href="#cards">Cards</a> with the <code>card</code> prop, <code>spread</code> for the input at the end, and <code>variant="tonal"</code> or <code>"elevated"</code>.`,
      html: `<a href="#cards">Cards</a> with <code>.ui-card</code> on the label, plus <code>.ui-spread</code>, <code>.ui-tonal</code> or <code>.ui-elevated</code>.`,
    },
    components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
    {
      ...slots(
        `Breaking: <a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `Breaking: <a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
    {
      html: `Call <code>syncIndeterminate(input)</code> from <code>checkbox.js</code> after you change <code>data-indeterminate</code> (<a href="#indeterminate">Indeterminate</a>).`,
    },
    `The unchecked border reads <a href="#api"><code>--ui-choice-border-color</code></a> when a theme sets it, and <code>--ui-field-border-color</code>, which reaches 3:1 against the page by default, when it doesn't.`,
    `The checked fill and mark read <a href="#api"><code>--ui-choice-accent</code></a> and <code>--ui-choice-on-accent</code>, or <code>--ui-control-accent</code> and <code>--ui-on-control-accent</code>, when a theme sets them.`,
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_thumb-scale</code> and <code>--_input-size</code> is <code>--_size</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
    `Without a <a href="#hidden-label">visible label</a>, checkboxes center in table cells and lines of text, and stay a 24px click target at every size.`,
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each checkbox in an invalid <a href="#field-group-validation">group</a>.`,
      ),
      html: `Breaking: mark an invalid checkbox with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
    },
    {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    {
      astro: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      html: `Breaking: <a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Radio and Switch.`,
      react: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
    slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
    {
      astro: `Breaking: no <code>type</code> prop in the types (<a href="#api">API</a>).`,
    },
    slots(
      `Breaking: deep type imports from <code>components/Checkbox/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>CheckboxProps</code> and <code>CheckboxSlots</code>). Import <a href="#api"><code>CheckboxProps</code></a> from the framework entry instead.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
    slots(
      `Breaking: <code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    `In dark mode the checked <a href="#basics">mark</a> stays light on a fill darkened to keep 3:1 contrast.`,
    `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `The root selector is wrapped in <code>:where()</code>, like other components, so your own selectors win (<a href="#under-the-hood">Under the hood</a>).`,
    `The hover <a href="#basics">halo</a> only shows on devices that can hover, so it no longer sticks after a tap.`,
    {
      default: `<a href="#select-all"><code>SelectAll</code></a> makes a <code>data-select-all</code> checkbox check and uncheck the others in a group, and shows it indeterminate when some are checked, with the <code>&lt;opui-select-all&gt;</code> custom element, which the component loads.`,
      html: `<a href="#select-all"><code>&lt;opui-select-all&gt;</code></a> makes a <code>data-select-all</code> checkbox check and uncheck the others in a group, and shows it indeterminate when some are checked. Import <code>opui-css/elements/select-all.js</code>.`,
    },
    `A <a href="#basics">checkbox</a> fades its fill and scales its check in when checked and out when unchecked, and an <a href="#indeterminate">indeterminate</a> dash morphs into the check.`,
    `Themes can make the check spring in with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  chip: [
    `Themes can set <a href="#api"><code>--ui-chip-radius</code></a> for a corner radius of its own.`,
    slots(
      `Breaking: the default slot is gone. Pass the text as <a href="#api"><code>label</code></a>, or rich content in the <code>label</code> slot.`,
    ),
    `<a href="#variants">Outlined chips</a> take <code>--ui-shadow-control</code> like outlined buttons.`,
    `<a href="#variants">Chips without <code>.ui-outlined</code></a> read <code>--ui-control-border-color-filled</code> for their border, like filled buttons.`,
    `Outlined chips read <a href="#api"><code>--ui-control-border-color</code></a> for their border, like outlined buttons.`,
    {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>, and small chips are 28px to match the control sizes.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>, and small chips are 28px to match the control sizes.`,
    },
    {
      default: `Long labels truncate with an ellipsis unless the chip is <a href="#sizes"><code>multiline</code></a>.`,
      html: `Long labels truncate with an ellipsis unless the chip is <a href="#sizes"><code>.ui-multiline</code></a>.`,
    },
    `The hover and press ripple is removed. <a href="#button">Button</a> and <a href="#link">link</a> chips change their background on hover instead.`,
    slots(
      `Breaking: <a href="#button"><code>as="button"</code></a> renders <code>type="button"</code> by default.`,
    ),
    {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    {
      default: `<a href="#severities">Severities</a> for statuses with <code>severity</code>, and a shape-coded <a href="#dot"><code>dot</code></a>.`,
      html: `<a href="#severities">Severities</a> for statuses with <code>.ui-success</code>, <code>.ui-warning</code> and more, and a shape-coded <a href="#dot"><code>.ui-dot</code></a>.`,
    },
    `<a href="#disabled">Disabled</a> chips: <code>aria-disabled="true"</code> on a link chip, and <code>.ui-disabled</code> for an inactive static chip.`,
    `Breaking: <code>--_color</code> is <code>--_text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `<a href="#disabled"><code>disabled</code></a> works on button and link chips. A link chip gets <code>aria-disabled="true"</code>.`,
    ),
    components(
      `Breaking: a button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (<a href="#api">types</a>).`,
    ),
    `Breaking: <a href="#disabled">disabled link chips</a> have no <code>href</code>, so they can't be focused or followed.`,
    `<a href="#button">Button</a> and <a href="#link">link</a> chips hover with <code>--ui-surface-tonal-hover</code>, like filled fields.`,
    {
      default: `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
      html: `The default <a href="#variants">tonal</a> chip needs no <code>.ui-tonal</code>.`,
    },
    slots(
      `Breaking: a tonal <a href="#variants">chip</a> no longer renders <code>.ui-tonal</code>. Target <code>.ui-chip:not(.ui-outlined)</code> in your CSS instead.`,
    ),
    `<a href="#pressed">Pressed</a> button chips (<code>aria-pressed="true"</code>) are filled with <code>--ui-selected</code>, or <code>--ui-primary</code>, like a checked toggle button.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `Corners are <a href="#api"><code>--ui-radius</code></a> (8px) instead of Open Props <code>--radius-2</code> (5px).`,
    `<a href="#button">Button</a> and <a href="#link">link</a> chips only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `<a href="#button">Button and link chips</a> fade their hover and <a href="#pressed">pressed</a> colors, like buttons.`,
    `Themes can shrink a button or link chip while it's pressed with <a href="#api"><code>--ui-press-scale</code></a>.`,
  ],
  "color-field": [
    {
      default: `New component. A <a href="#basics">text field for an <code>oklch()</code> color</a> with a swatch that opens a <a href="#picker">picker</a> that previews the color across its top, tints itself with its hue, copies it, picks one from the screen and shows its contrast, over sliders for lightness, chroma, hue and <a href="#opacity">opacity</a>, or the channels of 15 other <a href="#color-spaces">color spaces</a>,, run by the <code>&lt;opui-color-field&gt;</code> custom element, which the component loads. <a href="#swatch-only"><code>swatchOnly</code></a> shows just the swatch. The <a href="#form-value">form</a> submits and resets the <code>oklch()</code> text.`,
      html: `New component. A <a href="#basics">text field for an <code>oklch()</code> color</a> with a swatch that opens a <a href="#picker">picker</a> that previews the color across its top, tints itself with its hue, copies it, picks one from the screen and shows its contrast, over sliders for lightness, chroma, hue and <a href="#opacity">opacity</a>, or the channels of 15 other <a href="#color-spaces">color spaces</a>,. <a href="#swatch-only"><code>.ui-swatch-only</code></a> shows just the swatch. Import <code>opui-css/elements/color-field.js</code> for the <code>&lt;opui-color-field&gt;</code> custom element that runs them. The <a href="#form-value">form</a> submits and resets the <code>oklch()</code> text.`,
    },
  ],
  copy: [
    {
      default: `New component. A <a href="#basics">button that copies</a> a field's value or a text to the clipboard and announces it, run by the <code>&lt;opui-copy&gt;</code> custom element, which the component loads.`,
      html: `New component. A <a href="#basics">button that copies</a> a field's value or a text to the clipboard and announces it. Import <code>opui-css/elements/copy.js</code> for the <code>&lt;opui-copy&gt;</code> custom element that runs it.`,
    },
  ],
  "description-list": [
    `<a href="#total"><code>total</code></a> on the last item draws a line above it and makes it larger and bold, for an order summary.`,
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>DescriptionListItem</code></a>. The <code>DescriptionList.Item</code> aliases are gone.`,
    },
    slots(
      `Breaking: the part files are <code>DescriptionListDescription.*</code>, <code>DescriptionListItem.*</code> and <code>DescriptionListTerm.*</code>. Update deep <code>opui-css/components/*</code> imports (<a href="#api">API</a>).`,
    ),
    {
      vue: `Breaking: <code>Description</code> is now <a href="#api"><code>DescriptionListDescription</code></a>, like Astro.`,
    },
    {
      default: `<a href="#orientation">Orientation</a>: <code>orientation="horizontal"</code> keeps terms and descriptions side by side at any width.`,
      html: `<a href="#orientation">Orientation</a>: <code>.ui-horizontal</code> keeps terms and descriptions side by side at any width.`,
    },
    {
      ...slots(
        `Breaking: <a href="#bordered">items</a> render a plain <code>div</code> without <code>.ui-item</code>.`,
      ),
      html: `Breaking: <a href="#bordered">items</a> are plain <code>div</code>s without <code>.ui-item</code>.`,
    },
    slots(
      `Breaking: <a href="#bordered"><code>bordered</code></a> is a boolean. Replace <code>bordered="dotted"</code> with <code>bordered dotted</code>.`,
    ),
    {
      ...slots(
        `Breaking: <code>DescriptionListTerm</code> and <code>DescriptionListDescription</code> no longer render <code>.ui-term</code> and <code>.ui-description</code>. Select <code>dt</code> and <code>dd</code> in your CSS (<a href="#basics">Basics</a>).`,
      ),
      html: `Breaking: <code>.ui-term</code> and <code>.ui-description</code> are gone. The list styles <code>dt</code> and <code>dd</code> by element (<a href="#basics">Basics</a>).`,
    },
    {
      astro: `Breaking: deep type imports from <code>components/DescriptionList/types.astro</code> are named <a href="#api"><code>DescriptionListTermProps</code></a>, <code>DescriptionListDescriptionProps</code> and <code>DescriptionListItemProps</code> (was <code>TermProps</code>, <code>DescriptionProps</code> and <code>ItemProps</code>), like the framework entry.`,
    },
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
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
    {
      ...components(
        `The <a href="#footer"><code>DialogFooter</code></a> holds buttons, text or anything else, and <code>.ui-actions</code> groups the buttons in it.`,
      ),
      html: `The <a href="#footer">footer</a> holds buttons, text or anything else, and <code>.ui-actions</code> groups the buttons in it.`,
    },
    `A focusable <a href="#long-content">content</a> draws its focus ring inside the dialog, so the dialog edges don't clip it.`,
    `Opens over <a href="#api"><code>--ui-duration-slow</code></a>, the overlay duration.`,
    `Themes can set <a href="#api"><code>--ui-dialog-radius</code></a> for a corner radius of its own.`,
    {
      ...slots(
        `Breaking: <code>Dialog</code> no longer renders <code>.ui-card</code>. Style <a href="#basics"><code>.ui-dialog</code></a> instead.`,
      ),
      html: `Breaking: <code>.ui-card</code> is no longer needed on <a href="#basics"><code>.ui-dialog</code></a>, which <code>card.css</code> styles itself.`,
    },
    `The dialog shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, like Drawer and Menu.`,
    slots(
      `Breaking: <a href="#api"><code>DialogHeader</code>, <code>DialogTitle</code>, <code>DialogContent</code> and <code>DialogFooter</code></a> replace the slots, and <code>align</code> on <code>DialogFooter</code> replaces <code>actionsAlign</code>. <code>DialogTitle</code> names the dialog.`,
    ),
    `<a href="#long-content">Long content</a> scrolls between a fixed header and footer.`,
    `A subtle scroll shadow shows under the header and above the footer while the <a href="#long-content">content scrolls</a>.`,
    `<a href="#width">Width</a> with <code>--_max-inline-size</code>, keeping the margin on small screens.`,
    components(
      `<a href="#how-to-close"><code>closedby</code></a> is typed in every framework.`,
    ),
    {
      html: `Breaking: the page scroll lock of <a href="#modal">modal dialogs</a> lives in <code>utils.css</code>. Import it too if you import single files.`,
    },
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `The <a href="#long-content">scroll shadow</a> reads <code>--ui-shadow-scroll</code>, and borders inside the dialog read <code>--ui-border-color-on-raised</code> and <code>--ui-field-border-color-on-raised</code>.`,
    components(
      `<a href="#footer"><code>DialogFooter</code></a> only adds a class for <code>align="start"</code>. The default end alignment renders no <code>.ui-align-end</code>.`,
    ),
    `A <a href="#modal">modal dialog</a> fades and scales in with its backdrop, and fades and scales out again when it closes, over <code>--ui-duration-slow</code>.`,
    components(
      `<code>DialogTitle</code> warns in development when the dialog's generated id replaces its own <code>id</code>. Pass <code>aria-labelledby</code> on the <code>Dialog</code> to keep it (<a href="#api">API</a>).`,
    ),
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  divider: [
    `<a href="#spacing">Spacing</a> comes from <code>--ui-divider-gap</code>, which cards, callouts, dialogs and drawers make tighter.`,
    {
      html: `Breaking: <a href="#variants"><code>.ui-filled</code>, <code>.ui-primary</code> and <code>.ui-tonal</code></a> replace the <code>.ui-border-*</code> classes.`,
    },
    slots(
      `Breaking: <code>variant="primary"</code> is <a href="#variants"><code>color="primary"</code></a>.`,
    ),
    components(
      `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
    ),
    {
      ...slots(
        `<a href="#content">Content</a> in the middle of the line through the default slot, aligned with <code>align</code>.`,
      ),
      default: `<a href="#content">Content</a> in the middle of the line as children, aligned with <code>align</code>.`,
      html: `<a href="#content">Content</a> in the middle of the line in a <code>div.ui-divider</code>, aligned with <code>.ui-align-start</code> or <code>.ui-align-end</code>.`,
    },
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
  ],
  drawer: [
    `Themes can set <a href="#api"><code>--ui-card-padding</code></a> for the header, content and footer padding.`,
    `The edge reads <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, like menus and elevated cards, and <code>--_edge-border-color</code> sets it alone.`,
    `Opens over <a href="#api"><code>--ui-duration-slow</code></a> with <code>--ui-ease-enter</code> and closes with <code>--ui-ease-exit</code>.`,
    slots(
      `Breaking: <a href="#basics"><code>DrawerTitle</code> and <code>DrawerContent</code></a> replace the <code>heading</code> prop and the slots. <code>DrawerTitle</code> names the drawer; without it, pass <code>aria-label</code>. The <code>DrawerHeader</code> close button uses <code>command="close"</code>.`,
    ),
    `Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls (<a href="#basics">Basics</a>).`,
    {
      ...slots(
        `Breaking: the <a href="#basics"><code>DrawerFooter</code></a> content sits at the end on every side, also in an <code>inline-end</code> drawer, and <code>align="start"</code> moves it to the start.`,
      ),
      html: `Breaking: the <a href="#basics"><code>.ui-footer</code></a> content sits at the end on every side, also in an <code>.ui-inline-end</code> drawer, and <code>.ui-align-start</code> moves it to the start.`,
      react: `<a href="#api"><code>DrawerFooter</code></a> takes <code>align</code>, and its content sits at the end on every side.`,
      svelte: `<a href="#api"><code>DrawerFooter</code></a> takes <code>align</code>, and its content sits at the end on every side.`,
    },
    `<code>.ui-actions</code> groups the buttons in the <a href="#basics">footer</a>, and moves them to the end when other content comes first.`,
    {
      default: `Breaking: the <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, instead of <code>--ui-font-size-large</code>, and <code>--_header-font-size</code> is <code>--_title-font-size</code>.`,
      react: `The <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, and <code>--_title-font-size</code> changes it.`,
      svelte: `The <a href="#basics">title</a> is <code>--ui-font-size-h4</code>, like the <code>Dialog</code> title, and <code>--_title-font-size</code> changes it.`,
    },
    `<a href="#basics">Content</a> is a stack with <code>--ui-space-3</code> between its children, like <code>Dialog</code> content, so paragraphs don't touch. Content with inline children keeps the normal flow, and a focusable content draws its focus ring inside the drawer.`,
    slots(
      `Breaking: the page no longer <a href="#basics">locks scrolling</a> by default. Set <code>scrollLock</code>, and pass the <code>id</code> the trigger points at.`,
    ),
    {
      default: `Named by <a href="#accessibility"><code>DrawerTitle</code></a> through <code>aria-labelledby</code>.`,
      html: `Name it with <a href="#accessibility"><code>aria-labelledby</code></a> pointing at the header heading.`,
    },
    `The <a href="#basics">backdrop</a> dims and blurs like <code>Dialog</code>, through <code>--ui-backdrop-bg-color</code> and <code>--ui-backdrop-blur</code>.`,
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, and <code>--_transition-duration</code> and <code>--_transition-timing</code> are <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `The drawer shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus and select pickers. Padding reads the <code>--ui-space-*</code> scale.`,
    `Content padding is <code>--ui-space-3</code>, like the header and the footer (<a href="#basics">Basics</a>).`,
    `The scroll shadow reads <a href="#api"><code>--ui-shadow-scroll</code></a>.`,
    `The panel sits on <a href="#api"><code>--ui-surface-elevated</code></a>, like Dialog and Menu.`,
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
    `<a href="#basics">Content</a> scrolls with <code>overflow-inline</code> and <code>overflow-block</code>, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them and don't scroll it.`,
    components(
      `A <code>Drawer</code> without an <code>id</code> warns in development, since its trigger and <code>DrawerHeader</code> point at it (<a href="#basics">Basics</a>).`,
    ),
  ],
  form: [
    {
      ...slots(
        `Breaking: <code>FieldSet</code> is <a href="#fieldset"><code>Fieldset</code></a>, and <code>FieldDescription</code> renders <code>.ui-description</code> instead of <code>.ui-field-description</code>.`,
      ),
      html: `Breaking: the <a href="#fieldset">fieldset</a> description is <code>.ui-description</code> instead of <code>.ui-field-description</code>.`,
    },
    {
      ...slots(
        `Breaking: <a href="#field-group"><code>FieldGroup</code></a> no longer sets <code>role="group"</code>. Wrap it in a <code>Fieldset</code> to group and name the fields.`,
      ),
      html: `Drop <code>role="group"</code> from a <a href="#field-group"><code>.ui-field-group</code></a> inside a fieldset, which already groups the fields.`,
    },
    {
      ...slots(
        `Breaking: set <code>error</code> on each field instead of <code>data-invalid</code> on the <code>Fieldset</code> (<a href="#fieldset-invalid">Invalid</a>).`,
      ),
      html: `Breaking: an invalid <code>.ui-fieldset</code> takes <code>aria-invalid="true"</code> on each control instead of <code>data-invalid</code> on the fieldset (<a href="#fieldset-invalid">Invalid</a>).`,
    },
    {
      astro: `<a href="#field-group"><code>FieldGroup</code></a> names its inputs through context, so a bare <code>input</code>, <code>select</code> or <code>textarea</code> no longer gets the group <code>name</code>, like in React, Svelte and Vue.`,
      vue: `<code>Form</code>, <code>Fieldset</code> and <code>FieldLegend</code> type <a href="#without-fieldset"><code>as</code></a> as <code>"div" | "form"</code>, <code>"div" | "fieldset"</code> and <code>"legend" | "p"</code>.`,
    },
    {
      ...slots(
        `Breaking: <a href="#field-group-horizontal"><code>FieldGroup</code></a> <code>direction</code> is <code>orientation</code> (<code>"auto"</code>, the default, <code>"horizontal"</code>, <code>"vertical"</code>), like <code>ButtonGroup</code>.`,
      ),
      html: `Breaking: <a href="#field-group-horizontal"><code>.ui-row</code> and <code>.ui-column</code></a> on a field group are <code>.ui-horizontal</code> and <code>.ui-vertical</code>.`,
    },
    `A <a href="#field-group-horizontal">horizontal</a> field group lines its fields up at their end and grows a text field, textarea, select or number stepper to share the row, so a field and its button sit on one line.`,
  ],
  layout: [
    `New: <a href="#column"><code>.ui-layout-column</code></a>, <a href="#row"><code>.ui-layout-row</code></a>, <a href="#grid"><code>.ui-layout-grid</code></a> and <a href="#container"><code>.ui-layout-container</code></a> lay out the space between components.`,
    `<a href="#spread"><code>.ui-spread</code></a> pushes the children of a row to its two ends, for a page header, and <a href="#column-align"><code>.ui-align-center</code> and <code>.ui-align-end</code></a> line up a row or a column.`,
    `<a href="#stretch"><code>.ui-stretch</code></a> stretches the columns of a grid over the row when fewer children than fit, and <a href="#max-columns"><code>--_max-columns</code></a> caps the count.`,
    `<a href="#media"><code>.ui-layout-media</code></a> puts an avatar or an icon next to text that fills the rest and truncates.`,
    `On a <code>ul</code> or <code>ol</code>, <a href="#lists">rows and grids</a> drop the list bullets and margins, and a card alone in an <code>li</code> fills its grid cell.`,
    `<a href="#columns"><code>.ui-layout-columns</code></a> is one column that becomes the <code>--_columns</code> tracks at a breakpoint, with a <a href="#sticky"><code>.ui-sticky</code></a> child that stays in view.`,
    `Three named <a href="#breakpoints">container breakpoints</a> to reflow a page at the same widths as the blocks, which <code>.ui-layout-columns</code> picks with <code>.ui-breakpoint-small</code> and <code>.ui-breakpoint-large</code>.`,
  ],
  list: [
    `<a href="#flush"><code>flush</code></a> also drops the block padding of the list, for a list in a card.`,
    `Themes can set <a href="#api"><code>--ui-list-item-padding-inline</code></a>. Descriptions read <code>--ui-text-subtle</code>, and <code>--ui-on-selected</code> on a selected row.`,
    components(
      `A link <a href="#api"><code>ListItem</code></a> takes <code>disabled</code>: it drops its <code>href</code> and gets <code>aria-disabled="true"</code>.`,
    ),
    slots(
      `Breaking: <code>ListItem</code> <a href="#text"><code>label</code></a> replaces <code>headline</code>, and the <code>label</code> and <code>description</code> slots replace the <code>text</code> slot.`,
    ),
    {
      ...slots(
        `Breaking: <a href="#flush"><code>flush</code></a> replaces <code>gutterless</code>.`,
      ),
      html: `Breaking: <a href="#flush"><code>.ui-flush</code></a> replaces <code>.ui-gutterless</code>.`,
    },
    {
      html: `Breaking: <a href="#start-items"><code>.ui-start</code></a> and <code>.ui-end</code> are only styled as direct children of a row, or of its <code>a</code>, <code>button</code> or <code>label</code>.`,
    },
    `Selected and current items read <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    `Smaller <a href="#icon">start</a> and end icons.`,
    {
      ...slots(
        `Breaking: <code>divided</code> is removed. Use <a href="#on-every-item"><code>bordered</code></a>.`,
      ),
      html: `Breaking: <code>.ui-divided</code> is removed. Use <a href="#on-every-item"><code>.ui-bordered</code></a>.`,
    },
    `<a href="#dense">Dense</a> rows keep the default inline padding, so they line up with card content.`,
    `Only direct children are styled as rows, so nested lists inside a row stay normal lists (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>filled</code>.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    slots(
      `Breaking: <a href="#list-item-api"><code>ListItem</code> <code>as</code></a> only accepts <code>"a"</code> or <code>"button"</code>. A static item leaves it out.`,
    ),
    `Breaking: <code>--_bg-color-hover</code> is <code>--_hover-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `A checked <a href="#radio">option</a> uses <code>--ui-state-active-alpha-accent</code>.`,
    components(
      `Breaking: <a href="#checkbox"><code>type</code></a> can't be combined with <code>as</code> or <code>href</code> (types).`,
    ),
    `Breaking: rows no longer style <code>aria-selected="true"</code> on a link, button, label or list item, where ARIA doesn't allow it. Mark the current row with <a href="#selected"><code>aria-current="page"</code></a>.`,
    `<a href="#selected">Selected and current rows</a> have a bar on their start edge in <code>--ui-selected-strong</code> and a stronger fill than hover, so they don't rely on a tint alone.`,
    {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="filled"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="filled"</code>.`,
    },
    `Lists are <a href="#variants">rounded</a> with <code>--_radius</code> (<code>--ui-radius</code>) and clip their rows to the corners, except as a direct child of a card.`,
    `<a href="#dense">Dense</a> rows are <code>--ui-control-size-small</code> tall, so they follow <code>--ui-density</code>.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#configurations">Row heights</a> follow <code>--ui-control-size</code> and the <code>--ui-button-size-*</code> scale.`,
    `<a href="#clickable-list-item">Clickable rows</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `<a href="#selected"><code>--_selected-indicator-bg-color</code></a> and <code>--_selected-indicator-size</code> style the bar on a selected row, and <code>--_start-image-size</code> and <code>--_start-video-size</code> size the <a href="#image">start media</a>.`,
    `<a href="#clickable-list-item">Clickable rows</a> and <a href="#selected">selected rows</a> fade, and a hovered row changes at once and fades back over <code>--ui-duration-fast</code>, so the highlight trails the pointer.`,
  ],
  menu: [
    `Themes can set <a href="#api"><code>--ui-menu-radius</code></a> for a corner radius of its own.`,
    `The edge reads <a href="#api"><code>--ui-border-color-raised</code></a> when a theme sets it, like drawers and elevated cards, and the separators keep <code>--ui-border-color-on-raised</code>.`,
    `Themes can set <a href="#api"><code>--ui-list-item-padding-inline</code></a>. Descriptions read <code>--ui-text-subtle</code>.`,
    `The border and dividers are <a href="#api"><code>--ui-border-color-on-raised</code></a>, like other elevated surfaces.`,
    `Items are built like <code>List</code> items, with start and end icons, text and shortcuts (<a href="#basics">Basics</a>).`,
    {
      html: `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus. No JavaScript.`,
      ...components(
        `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus, built on <code>Menu</code> and <code>ListItem</code>. No JavaScript.`,
      ),
    },
    {
      ...slots(
        `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
      ),
      react: `<a href="#submenu">Submenus</a> with the <code>submenu</code> prop on <code>ListItem</code>.`,
      svelte: `<a href="#submenu">Submenus</a> with the <code>submenu</code> snippet on <code>ListItem</code>.`,
    },
    `Menus shrink to the space on their side and flip when it's less than <code>12rem</code> (<a href="#placement">Placement</a>).`,
    {
      default: `<a href="#bordered">Dividers between items</a> with the <code>bordered</code> prop.`,
      html: `<a href="#bordered">Dividers between items</a> with <code>.ui-bordered</code>.`,
    },
    components(
      `<code>color="critical"</code> on a <code>ListItem</code> marks a destructive <a href="#custom">custom item</a>.`,
    ),
    `The menu shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with drawers and select pickers.`,
    `<a href="#basics">Critical items</a> read <code>--ui-critical-text</code>.`,
    components(
      `A <code>Menu</code> without an <code>id</code> warns in development, since its trigger and items point at it (<a href="#basics">Basics</a>).`,
    ),
    `<a href="#basics">Items</a> highlight at once on hover and fade back over <code>--ui-duration-fast</code>, so the highlight trails the pointer.`,
    `Themes can make a menu spring open with <a href="#api"><code>--ui-ease-move</code></a>. It closes with <code>--ui-ease-exit</code>.`,
  ],
  message: [
    `New: a <a href="#basics">Message</a> is a chat bubble that groups into runs, with <a href="#attachments">attachments</a>, <a href="#reactions">reactions</a> and a <a href="#typing">typing indicator</a>.`,
  ],
  "number-stepper": [
    {
      default: `New component. A <a href="#basics">number field</a> with buttons that step the value down and up and repeat while held, run by the <code>&lt;opui-number-stepper&gt;</code> custom element, which the component loads. It fits its value unless <a href="#stretch"><code>stretch</code></a> fills the width.`,
      html: `New component. A <a href="#basics">number field</a> with buttons that step the value down and up and repeat while held. Import <code>opui-css/elements/number-stepper.js</code> for the <code>&lt;opui-number-stepper&gt;</code> custom element that runs them. It fits its value unless <a href="#stretch"><code>.ui-stretch</code></a> fills the width.`,
    },
  ],
  "one-time-code": [
    `New: a <a href="#basics">One-time code</a> field draws one input as a box per character, with <a href="#grouped">grouped</a> halves, a <a href="#length">length</a> from 4 to 8 and <a href="#alphanumeric">alphanumeric</a> codes.`,
  ],
  progress: [
    `The <a href="#determinate">track</a> is always outlined with <code>--ui-field-border-color</code>, so the empty part is visible.`,
    `The track reads <a href="#api"><code>--ui-track-bg-color</code></a> when a theme sets it.`,
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>tonal</code>.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#inline">Progress bars</a> center in table cells and lines of text.`,
    slots(
      `Breaking: <code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;progress&gt;</code> (<a href="#api">API</a>).`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: a tonal <a href="#variants">progress bar</a> no longer renders <code>.ui-tonal</code>. Target <code>.ui-progress:not(.ui-filled)</code> in your CSS instead.`,
      ),
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
    components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
    {
      ...slots(
        `Breaking: <a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `Breaking: <a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
    `The unchecked ring reads <a href="#api"><code>--ui-choice-border-color</code></a> when a theme sets it, and <code>--ui-field-border-color</code>, which reaches 3:1 against the page by default, when it doesn't.`,
    `The checked fill and dot read <a href="#api"><code>--ui-choice-accent</code></a> and <code>--ui-choice-on-accent</code>, or <code>--ui-control-accent</code> and <code>--ui-on-control-accent</code>, when a theme sets them.`,
    `<a href="#sizes">Radios</a> are 20px, the same <code>--ui-choice-size</code> as Checkbox.`,
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_thumb-scale</code> and <code>--_input-size</code> is <code>--_size</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
    `Without a <a href="#hidden-label">visible label</a>, radios center in table cells and lines of text, and stay a 24px click target at every size.`,
    {
      default: `<a href="#spread">Spread</a> with the <code>spread</code> prop, like Checkbox and Switch.`,
      html: `<a href="#spread">Spread</a> with <code>.ui-spread</code>, like Checkbox and Switch.`,
    },
    {
      ...slots(
        `Breaking: set <code>error</code> on each <code>Radio</code> in an invalid group instead of <code>data-invalid</code> on the <code>Fieldset</code> (<a href="#field-group-validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid group with <code>aria-invalid="true"</code> on each radio instead of <code>data-invalid</code> on the fieldset (<a href="#field-group-validation">Validation</a>).`,
    },
    {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    {
      astro: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      html: `Breaking: <a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Switch.`,
      react: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
    slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
    {
      astro: `Breaking: no <code>type</code> prop in the types, and the native <code>size</code> isn't typed either (<a href="#api">API</a>).`,
    },
    slots(
      `Breaking: deep type imports from <code>components/Radio/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>RadioProps</code> and <code>RadioSlots</code>). Import <a href="#api"><code>RadioProps</code></a> from the framework entry instead.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    `In dark mode the checked <a href="#basics">dot</a> stays light on a fill darkened to keep 3:1 contrast.`,
    `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `The root selector is wrapped in <code>:where()</code>, like other components, so your own selectors win (<a href="#under-the-hood">Under the hood</a>).`,
    `The hover <a href="#basics">halo</a> only shows on devices that can hover, so it no longer sticks after a tap.`,
    `A <a href="#basics">radio</a> fades its fill and grows its dot from the center when checked, and shrinks it when another radio takes over.`,
    `Themes can make the dot spring in with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  range: [
    components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    `Breaking: <code>--_thumb-highlight-color</code>, <code>--_track-color</code>, <code>--_track-fill-color</code>, <code>--_track-fill</code> and <code>--_track-height</code> are <code>--_thumb-highlight-bg-color</code>, <code>--_track-bg-color</code>, <code>--_track-fill-bg-color</code>, <code>--_track-fill-fraction</code> and <code>--_track-block-size</code> (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <a href="#tick-marks"><code>items</code></a> replaces <code>options</code>, the label goes in the <code>label</code> slot, and the readout slot is <a href="#value"><code>value-text</code></a>.`,
    ),
    `The empty track reaches <a href="#accessibility">3:1</a> against the page by default, and with more contrast it takes the page color with an inset edge so the fill stands out.`,
    `The thumb and fill read <a href="#api"><code>--ui-choice-accent</code></a>, or <code>--ui-control-accent</code>, and the empty track <code>--ui-track-bg-color</code> when a theme sets them.`,
    `<a href="#spread">Spread</a> ranges line up with spread fields and collapse to a column in narrow containers.`,
    {
      ...slots(
        `Breaking: the track fill is CSS only (<a href="#under-the-hood">Under the hood</a>). The component no longer sets <code>--_track-fill</code> from script.`,
      ),
      html: `The track fill is CSS only, so plain HTML ranges <a href="#basics">fill</a> too.`,
    },
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look. The default is named <code>outlined</code>.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    components(
      `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
    ),
    {
      ...components(
        `<a href="#sizes">Sizes</a> with the <code>size</code> prop, like the other form controls. The focus ring hugs the thumb.`,
      ),
      html: `<a href="#sizes">Sizes</a> with <code>.ui-x-small</code>, <code>.ui-small</code> and <code>.ui-large</code>, like the other form controls. The focus ring hugs the thumb.`,
    },
    {
      html: `Breaking: mark an invalid range with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_thumb-bg</code> is <code>--_thumb-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `<a href="#tick-marks"><code>items</code></a> is typed as <code>RangeItem[]</code>, exported from every framework.`,
    ),
    components(
      `<a href="#tick-marks"><code>items</code></a> renders a linked <code>&lt;datalist&gt;</code> without a <code>list</code> id.`,
    ),
    {
      react: `<a href="#value"><code>valueText</code></a> takes a function that gets the current value and follows the thumb.`,
      svelte: `The <a href="#value"><code>valueText</code></a> snippet gets the current value and follows the thumb.`,
      vue: `The <a href="#value"><code>value-text</code></a> slot is scoped with the current value and follows the thumb.`,
    },
    slots(
      `Breaking: <code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;input&gt;</code> (<a href="#api">API</a>).`,
    ),
    {
      astro: `Breaking: extra attributes are typed as <code>&lt;input&gt;</code> attributes, where they go (<a href="#api">API</a>).`,
    },
    `The thumb, its halo and the track fill follow <code>--_accent</code> on <code>.ui-range</code> (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: deep type imports from <code>components/Range/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>RangeProps</code> and <code>RangeSlots</code>). Import <a href="#api"><code>RangeProps</code></a> from the framework entry instead.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#component-properties"><code>--_track-base-bg-color</code></a> sets the empty track at rest, so filled and tonal tracks darken on press and take the disabled color.`,
    {
      ...components(
        `A <a href="#value">value readout</a> is announced once, with its unit: the input gets <code>aria-valuetext</code> and the output <code>aria-live="off"</code>.`,
      ),
      html: `Give the <a href="#value">value readout</a> <code>aria-live="off"</code> and the input <code>aria-valuetext</code>, so the value is announced once, with its unit. <code>range.js</code> keeps it in sync.`,
    },
    {
      react: `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
      svelte: `<a href="#variants">Variants</a> name the default: <code>variant="outlined"</code>.`,
    },
    `The <a href="#basics">thumb</a> and its ring only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
  ],
  rating: [
    `New: a <a href="#basics">Rating</a> draws a score as stars in a <code>&lt;meter&gt;</code>, down to a fraction, and with a <a href="#input">name</a> collects one with radios that preview on hover.`,
  ],
  select: [
    `The <a href="#variants">picker</a> is <code>--ui-surface-elevated</code> with the raised edge, like menus, and reads <code>--ui-border-color-raised</code> when a theme sets it.`,
    `Helper text reads <a href="#api"><code>--ui-text-subtle</code></a>, options take <code>--ui-list-item-padding-inline</code>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    slots(
      `Breaking: <a href="#api"><code>items</code></a> take <code>label</code> instead of <code>text</code>.`,
    ),
    {
      ...slots(
        `Breaking: the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `Breaking: <a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On touch screens they keep <code>--ui-font-size-control</code>, so iOS Safari doesn't zoom in on focus.`,
    `The field border reaches <a href="#accessibility">3:1</a> against the page by default, and the picker keeps the browser's checkmark on the selected option.`,
    `<a href="#option-groups">Group labels</a> take a shade of the picker's surface and <code>--ui-text</code> instead of fixed grays.`,
    `The selected option reads <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    `The chevron flips when the <a href="#variants">picker</a> opens.`,
    {
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    {
      default: `<a href="#preselected">Preselect</a> options with <code>value</code> or <code>selected</code> on an item.`,
      html: `<a href="#preselected">Preselect</a> options with <code>selected</code>.`,
    },
    `The <a href="#variants">arrow</a> is a chevron.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid select with <code>aria-invalid="true"</code> on the <code>&lt;select&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_size</code>, <code>--_label-color</code> is <code>--_affix-text-color</code> and <code>--_end-text-color</code> is <code>--_helper-text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#preselected"><code>items</code></a> takes <code>SelectItem[]</code>, exported under that name.`,
    ),
    components(
      `Breaking: <code>ClassicSelect</code> is gone. Use <code>Select</code>, which falls back to the browser's own picker (<a href="#fallback">Fallback</a>).`,
    ),
    components(
      `Breaking: <code>startText</code> replaces <code>description</code>, matching <code>endText</code> (<a href="#spread">Spread</a>).`,
    ),
    slots(
      `Breaking: <code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;select&gt;</code> (<a href="#api">API</a>).`,
    ),
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The picker shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus and drawers.`,
    `The field reads <a href="#api"><code>--ui-shadow-field</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    {
      default: `<a href="#auto-fit"><code>autoFit</code></a> lets the width follow the selected option, from <code>25ch</code>.`,
      html: `<a href="#auto-fit"><code>.ui-auto-fit</code></a> lets the width follow the selected option, from <code>25ch</code>.`,
    },
    `<a href="#optgroup"><code>&lt;optgroup&gt;</code></a> groups get the heading styles, with a <code>&lt;legend&gt;</code> as the heading.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
    `<a href="#variants">Filled selects</a> fade their hover background, and options highlight at once on hover and fade back over <code>--ui-duration-fast</code>.`,
    `Themes can make the picker spring open with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  spinner: [
    `Busy buttons and links with <code>aria-describedby</code> <a href="#blocked-by-another-use-case">get a spinner</a> now.`,
    `With more contrast the <a href="#buttons">ring</a> is opaque, so it stands out on filled buttons and links.`,
    `The spinner styles have no specificity (<code>:where()</code>), so your own <code>::before</code> rules override them (<a href="#api">API</a>).`,
    `The <a href="#sizes">ring</a> grows with the spinner and is at least <code>--ui-border-width-thick</code>.`,
    `Styles use logical properties only, so the <a href="#sizes">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
  ],
  switch: [
    `<a href="#cards">Cards</a> take <code>--ui-card-padding</code>.`,
    {
      default: `<a href="#cards">Cards</a> with the <code>card</code> prop, <code>spread</code> for the input at the end, and <code>variant="tonal"</code> or <code>"elevated"</code>.`,
      html: `<a href="#cards">Cards</a> with <code>.ui-card</code> on the label, plus <code>.ui-spread</code>, <code>.ui-tonal</code> or <code>.ui-elevated</code>.`,
    },
    components(
      `<a href="#api"><code>label</code></a> takes the label text, a shorthand for the default slot.`,
    ),
    `Breaking: <code>--_track-height</code> and <code>--_track-width</code> are <code>--_track-block-size</code> and <code>--_track-inline-size</code>, <code>--_accent-contrast</code> is <code>--_on-accent</code>, and the <code>--_dot-*</code> properties are <code>--_thumb-*</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      ...slots(
        `Breaking: <a href="#label-position"><code>orientation="vertical"</code></a> replaces <code>stack</code>.`,
      ),
      html: `Breaking: <a href="#label-position"><code>.ui-vertical</code></a> replaces <code>.ui-stack</code>.`,
    },
    `The unchecked thumb and track read <a href="#api"><code>--ui-switch-thumb-bg-color</code></a> and <code>--ui-switch-track-bg-color</code>.`,
    `The unchecked track border reads <a href="#api"><code>--ui-choice-border-color</code></a> when a theme sets it, and <code>--ui-field-border-color</code> when it doesn't, like the checkbox and radio borders.`,
    `The checked track reads <a href="#api"><code>--ui-choice-accent</code></a>, or <code>--ui-control-accent</code>, and the unchecked track <code>--ui-track-bg-color</code> when a theme sets them.`,
    `Each <a href="#api">track width</a> is twice its track height until a theme sets it.`,
    slots(
      `Breaking: <a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Without a <a href="#hidden-label">visible label</a>, switches center in table cells and lines of text, and stay a 24px click target at every size.`,
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each switch in an invalid <a href="#field-group-validation">group</a>.`,
      ),
      html: `Breaking: mark an invalid switch with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
    },
    {
      default: `<code>size</code> takes <code>"x-small"</code> and <code>"large"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code> and <code>.ui-large</code>. <a href="#sizes">Sizes</a>`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, and <code>--_transition-time</code> and <code>--_transition-tf</code> are <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      html: `Breaking: <a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Radio.`,
      react: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
    slots(
      `<a href="#end-text"><code>endText</code></a> takes a string, like the <code>end-text</code> slot.`,
    ),
    {
      astro: `Breaking: no <code>type</code> prop in the types (<a href="#api">API</a>).`,
    },
    `A checked invalid switch turns its track red, like Checkbox and Radio (<a href="#validation">Validation</a>).`,
    slots(
      `Breaking: deep type imports from <code>components/Switch/types</code> are named <code>Props</code> and <code>Slots</code> (was <code>SwitchProps</code> and <code>SwitchSlots</code>). Import <a href="#api"><code>SwitchProps</code></a> from the framework entry instead.`,
    ),
    slots(
      `Breaking: <code>style</code> goes to the root <code>&lt;label&gt;</code>, like <code>class</code>, so <code>--_</code> properties set through it apply (<a href="#api">API</a>).`,
    ),
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    `In dark mode the <a href="#basics">thumb</a> stays light on a checked track darkened to keep 3:1 contrast.`,
    `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `Themes can make the thumb spring with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  table: [
    `The caption reads <a href="#api"><code>--ui-text-subtle</code></a>.`,
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>TableHead</code></a>. The <code>Table.Head</code> aliases are gone.`,
    },
    slots(
      `Breaking: the part files are <code>TableBody.*</code>, <code>TableCell.*</code>, <code>TableColumn.*</code>, <code>TableColumnGroup.*</code>, <code>TableHead.*</code>, <code>TableHeaderCell.*</code> and <code>TableRow.*</code>. Update deep <code>opui-css/components/*</code> imports (<a href="#api">API</a>).`,
    ),
    `A checkbox alone in a cell is centered (<a href="#normal">Normal</a>).`,
    {
      default: `<a href="#density">Dense</a> tables have less block padding.`,
      html: `<a href="#density">Dense</a> tables (<code>.ui-dense</code>) have less block padding.`,
    },
    `<a href="#controls-in-cells">Fields and selects in cells</a> keep a <code>12ch</code> minimum width, in every density.`,
    {
      default: `<a href="#sticky-header">Sticky header</a> with the <code>stickyHeader</code> prop.`,
      html: `<a href="#sticky-header">Sticky header</a> with <code>.ui-sticky-header</code>.`,
    },
    {
      default: `<a href="#numbers">Number columns</a> with <code>numeric</code> on <code>TableCell</code> and <code>TableHeaderCell</code>.`,
      html: `<a href="#numbers">Number columns</a> with <code>.ui-numeric</code> on the cells.`,
    },
    {
      default: `<a href="#in-a-card">Tables in a card</a>: <code>flush</code> drops the block margin and <code>overflow="scroll"</code> scrolls the columns sideways.`,
      html: `<a href="#in-a-card">Tables in a card</a>: <code>.ui-flush</code> drops the block margin and <code>.ui-overflow-scroll</code> scrolls the columns sideways.`,
    },
    `Breaking: <code>--_table-border-radius</code> is <code>--_radius</code> (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <a href="#api"><code>TableColumn</code> <code>width</code></a> takes a CSS length; a declaration string such as <code>"min-width: 10rem"</code> is no longer parsed, pass <code>style</code> instead.`,
    ),
    components(
      `<a href="#normal"><code>TableCaption</code> and <code>TableFoot</code></a> render the caption and the footer rows.`,
    ),
    components(
      `<a href="#api">Every part</a> has its own props type, such as <code>TableBodyProps</code> and <code>TableCellProps</code>, exported from every framework.`,
    ),
    slots(
      `Breaking: deep type imports from <code>components/Table/types</code> have one type per part, such as <a href="#api"><code>TableCellProps</code></a>, instead of <code>SectionProps</code>, and <code>TableColumnProps</code> instead of <code>ColumnProps</code>.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `The <a href="#sticky-header">sticky header</a> shadow reads <code>--ui-shadow-scroll</code>.`,
    slots(
      `Breaking: <code>variant</code> is <a href="#density"><code>density</code></a>, with <code>normal</code> as the default.`,
    ),
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#normal">Rows</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#normal">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    {
      default: `<a href="#sorting">Sorting</a>: <code>SortableTable</code> and <code>sortable</code> header cells sort the rows by a column, set <code>aria-sort</code> and fire a cancelable <code>sort</code> event, with the <code>&lt;opui-sortable-table&gt;</code> custom element, which the component loads.`,
      html: `<a href="#sorting">Sorting</a>: <code>&lt;opui-sortable-table&gt;</code> sorts the rows by a header marked <code>data-sort</code>, sets <code>aria-sort</code> and fires a cancelable <code>sort</code> event. Import <code>opui-css/elements/sortable-table.js</code>.`,
    },
    `<a href="#density">Rows</a> highlight at once on hover and fade back over <code>--ui-duration-fast</code>.`,
  ],
  stat: [
    `New: a <a href="#basics">Stat</a> shows one number with its label and the change behind it, in a row of <a href="#cards">cards</a> on a dashboard.`,
  ],
  tabs: [
    `<a href="#api"><code>--_panel-gap</code></a> sets the space between the tab list and the panel.`,
    `Unselected labels read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-tabs-accent</code></a> for the selected label and the <a href="#line">line</a> indicator.`,
    `The <a href="#basics">selected pill</a> has a border, <code>--ui-control-border-color</code> or the field border, so it reaches 3:1 against the track without the shadow.`,
    `The outlined track reads <a href="#api"><code>--ui-control-border-color</code></a> for its border, like outlined buttons.`,
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>TabsItem</code></a>. The <code>Tabs.Item</code> aliases are gone.`,
    },
    `Breaking: <a href="#basics">restyled</a> as a segmented control. <code>--_accent-color</code> and <code>--_bg-color</code> are gone, use a <a href="#filled">variant</a> or <code>--_selected-bg-color</code>, <code>--_selected-text-color</code>, <code>--_indicator-bg-color</code> and <code>--_track-bg-color</code>.`,
    {
      ...slots(
        `Breaking: no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radio group</a> they are. <code>TabsItem</code> and <code>TabsPanel</code> no longer take <code>panelId</code>, and <code>TabsPanel</code> no longer takes <code>tabId</code>.`,
      ),
      html: `Breaking: no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radio group</a> they are. Style <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>[role="tab"]</code> and <code>[role="tabpanel"]</code>.`,
    },
    {
      ...slots(
        `Breaking: <code>TabsTab</code> is <a href="#api"><code>TabsLabel</code></a>, and the parts render <code>.ui-input</code>, <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>.ui-tab-input</code>, <code>.ui-tab-label</code> and <code>.ui-tab-panel</code>.`,
      ),
      html: `Breaking: the parts are <a href="#api"><code>.ui-input</code></a>, <code>.ui-label</code> and <code>.ui-panel</code> instead of <code>.ui-tab-input</code>, <code>.ui-tab-label</code> and <code>.ui-tab-panel</code>.`,
    },
    {
      default: `Tabs that <a href="#overflow">scroll</a> with <code>overflow="scroll"</code>.`,
      html: `Tabs that <a href="#overflow">scroll</a> with <code>.ui-overflow-scroll</code>.`,
    },
    {
      default: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with the <code>variant</code> prop.`,
      html: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with <code>.ui-filled</code>, <code>.ui-line</code> and <code>.ui-outlined</code>.`,
    },
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `The selected tab's shadow reads <a href="#api"><code>--ui-shadow-selected</code></a>, so themes can change or remove it.`,
    `Labels read <a href="#api"><code>--ui-font-size-control</code></a> for their font size, like buttons.`,
    `The selected tab of <a href="#filled">filled</a> tabs reads <code>--ui-selected-strong</code> and <code>--ui-on-selected-strong</code>.`,
    components(
      `<a href="#basics">Variants</a> name the default: <code>variant="tonal"</code>.`,
    ),
    slots(
      `Breaking: <code>TabsItem</code> <code>open</code> is <a href="#basics"><code>checked</code></a>.`,
    ),
    components(
      `Breaking: <code>TabsItem</code> <code>tabId</code> is <a href="#api"><code>id</code></a>, and <code>TabsLabel</code> <code>tabId</code> is <code>for</code> (<code>htmlFor</code> in React), the native names.`,
    ),
    {
      astro: `<code>value</code> on <code>Tabs</code> selects the item whose <code>value</code> matches (<a href="#binding">Binding</a>).`,
      react: `<code>Tabs</code> take <code>value</code>, <code>defaultValue</code> and <code>onValueChange</code> to control the selected tab (<a href="#binding">Binding</a>).`,
      svelte: `Bind the selected tab with <code>bind:value</code> on <code>Tabs</code> (<a href="#binding">Binding</a>).`,
      vue: `Bind the selected tab with <code>v-model</code> on <code>Tabs</code> (<a href="#binding">Binding</a>).`,
    },
    `The focus ring sits at <a href="#api"><code>--ui-focus-ring-inset</code></a>, like every other inset ring.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `The selected pill, and the line of <a href="#line">line tabs</a>, slides to the tab you select, where anchor positioning works (<a href="#basics">Basics</a>).`,
    `Themes can make the selected pill and line spring to the next tab with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  "text-field": [
    `Placeholders and helper text read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    {
      ...slots(
        `Breaking: the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `Breaking: <a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On touch screens they keep <code>--ui-font-size-control</code>, so iOS Safari doesn't zoom in on focus.`,
    `The field border, <a href="#api"><code>--ui-field-border-color</code></a>, reaches 3:1 against the page by default.`,
    `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    {
      ...slots(
        `<a href="#sizes">x-small and large</a> sizes. Breaking: <code>size="small"</code> replaces <code>small</code>.`,
      ),
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    {
      astro: `Breaking: extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the input. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `Breaking: <code>style</code> goes to the label instead of the input (<a href="#api">API</a>).`,
    },
    `The <a href="#autosuggest">auto-suggest</a> arrow is the Select chevron at every size.`,
    slots(
      `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    ),
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_size</code>, <code>--_label-color</code> is <code>--_affix-text-color</code> and <code>--_end-text-color</code> is <code>--_helper-text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
    `Breaking: the <a href="#autosuggest">autosuggest</a> and other input styles are in <code>text-field.css</code>, and <code>text-input.css</code> is gone. Remove its import.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The field reads <a href="#api"><code>--ui-shadow-field</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
    `With more contrast, <a href="#validation">invalid</a> fields keep the lighter <code>--ui-invalid</code> of dark mode, which every invalid control now shares.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    `Borders read <a href="#api"><code>--ui-field-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<a href="#variants">Filled fields</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `The container query reads <code>inline-size</code>, so <a href="#spread">spread</a> layouts follow the writing mode.`,
    {
      ...components(
        `<a href="#password-toggle"><code>passwordToggle</code></a> adds a button that shows and hides the password, run by the <code>&lt;opui-text-field&gt;</code> custom element, which the component loads.`,
      ),
      html: `<a href="#password-toggle">Password toggle</a>: <code>&lt;opui-text-field&gt;</code> with a <code>&lt;label for&gt;</code> and a <code>command="--toggle-password"</code> button shows and hides the password. Import <code>opui-css/elements/text-field.js</code>.`,
    },
    {
      ...components(
        `<a href="#character-count"><code>characterCount</code></a> shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit.`,
      ),
      html: `<a href="#character-count">Character count</a>: <code>&lt;opui-character-count&gt;</code> in the end text shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit. Import <code>opui-css/elements/character-count.js</code>.`,
    },
    `<a href="#variants">Filled fields</a> fade their hover background, like the border.`,
  ],
  textarea: [
    `Placeholders and helper text read <a href="#api"><code>--ui-text-subtle</code></a>.`,
    `Themes can set <a href="#api"><code>--ui-field-bg-color</code></a>, <code>--ui-field-padding-inline</code> (<code>--ui-field-padding-inline-large</code> for large fields) and <code>--ui-field-placeholder-text-color</code>.`,
    components(
      `<a href="#api"><code>hideLabel</code></a> hides the label visually and keeps it as the accessible name.`,
    ),
    {
      ...slots(
        `Breaking: the <a href="#affix">affix</a> slots are <code>start</code> and <code>end</code> instead of <code>prefix</code> and <code>suffix</code>, and <a href="#top-and-bottom"><code>top</code> and <code>bottom</code></a> instead of <code>header</code> and <code>footer</code>.`,
      ),
      html: `Breaking: <a href="#affix"><code>.ui-start</code> and <code>.ui-end</code></a> replace <code>.ui-prefix</code> and <code>.ui-suffix</code>, and <a href="#top-and-bottom"><code>.ui-top</code> and <code>.ui-bottom</code></a> replace <code>.ui-header</code> and <code>.ui-footer</code>.`,
    },
    `<a href="#sizes">Small and x-small fields</a> set their text in <code>--ui-font-size-small</code> and <code>--ui-font-size-caption</code>, like buttons. On touch screens they keep <code>--ui-font-size-control</code>, so iOS Safari doesn't zoom in on focus.`,
    `The field border, <a href="#api"><code>--ui-field-border-color</code></a>, reaches 3:1 against the page by default.`,
    `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    {
      ...slots(
        `<a href="#sizes">x-small and large</a> sizes. Breaking: <code>size="small"</code> replaces <code>small</code>.`,
      ),
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    `The minimum height is three lines plus padding at every <a href="#sizes">size</a>.`,
    {
      astro: `Breaking: extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the textarea. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `Breaking: <code>style</code> goes to the label instead of the textarea (<a href="#api">API</a>).`,
    },
    slots(
      `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    ),
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the textarea, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;textarea&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_size</code>, <code>--_label-color</code> is <code>--_affix-text-color</code> and <code>--_end-text-color</code> is <code>--_helper-text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-field-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The field reads <a href="#api"><code>--ui-shadow-field</code></a>, or <code>--ui-shadow-control</code> when a theme leaves it unset.`,
    `The <a href="#variants">filled</a> hover reads <code>--ui-surface-tonal-hover</code>, shared with clickable chips.`,
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    `Styles use logical properties only, so the <a href="#variants">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    {
      ...components(
        `<a href="#character-count"><code>characterCount</code></a> shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit.`,
      ),
      html: `<a href="#character-count">Character count</a>: <code>&lt;opui-character-count&gt;</code> in the end text shows the characters typed out of <code>maxlength</code> and announces how many are left near the limit. Import <code>opui-css/elements/character-count.js</code>.`,
    },
    `<a href="#variants">Filled textareas</a> fade their hover background, like the border.`,
  ],
  timeline: [
    `New: a <a href="#basics">Timeline</a> lists dated events with markers and a connecting line, with <a href="#colors">colors</a>, a <a href="#current">current item</a> and a <a href="#tracked">tracked</a> line.`,
  ],
  toast: [
    {
      default: `New component. <a href="#basics">Toasts</a> that confirm an action and dismiss themselves, shown by a button with <code>command="--toast"</code> or <a href="#from-a-script"><code>toast()</code></a>, run by the <code>&lt;opui-toaster&gt;</code> custom element, which the component loads. <a href="#position"><code>side</code> and <code>align</code></a> choose the corner. A dismissed toast fades out and the stack closes the gap.`,
      html: `New component. <a href="#basics">Toasts</a> that confirm an action and dismiss themselves, shown by a button with <code>command="--toast"</code> or <a href="#from-a-script"><code>toast()</code></a>. Import <code>opui-css/elements/toaster.js</code> for the <code>&lt;opui-toaster&gt;</code> custom element that runs them. A dismissed toast fades out and the stack closes the gap.`,
    },
    `Themes can make toasts spring in with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  toggle: [
    `Breaking: <code>--_border-radius</code> is <code>--_radius</code> on <code>ToggleGroup</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `A <a href="#toggle-button">standalone toggle</a> takes <code>--ui-shadow-control</code> like buttons, and corners are capped at half the height so a round radius doesn't clip <a href="#toggle-group">groups</a>.`,
    `A <a href="#toggle-button">checked <code>ToggleButton</code></a> is filled with <code>--ui-primary</code> in every contrast mode, not only a tint.`,
    `A checked <code>ToggleButton</code> reads <a href="#api"><code>--ui-selected</code></a> and <code>--ui-on-selected</code> when a theme sets them.`,
    `A <a href="#toggle-button">checked <code>ToggleButton</code></a> reads <code>--ui-control-border-color-filled</code> for its border, like filled buttons.`,
    `<code>ToggleButton</code> and <code>ToggleGroup</code> read <a href="#api"><code>--ui-control-border-color</code></a> for their border, like outlined buttons.`,
    slots(
      `Breaking: <a href="#toggle-button"><code>ToggleButton</code></a> no longer generates an input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>.`,
    },
    `<a href="#sizes">Small and x-small</a> toggles use smaller text, like <code>Button</code>.`,
    {
      default: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>overflow="scroll"</code> or truncates with <code>overflow="shrink"</code>.`,
      html: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>.ui-overflow-scroll</code> or truncates with <code>.ui-overflow-shrink</code>.`,
    },
    `Breaking: no <code>.ui-disabled</code>. A <a href="#toggle-button">toggle</a> looks disabled when its input is <code>disabled</code>.`,
    `Breaking: <code>ToggleButton</code> <code>--_button-bg-color</code> is <code>--_bg-color</code> and <code>--_svg-size</code> is <code>--_icon-size</code>, which sizes direct child <code>svg</code>s like Button (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <a href="#sizes"><code>size="default"</code></a> is <code>size="medium"</code> on <code>ToggleGroup</code>, like every sized component.`,
    ),
    `A disabled <a href="#disabled">toggle</a> dims like a disabled button, and hover uses the button hover strength.`,
    {
      react: `<code>ToggleGroup</code> takes <code>value</code>, <code>defaultValue</code> and <code>onValueChange</code> to control the selection (<a href="#binding">Binding</a>).`,
      svelte: `Bind the selection with <code>bind:value</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
      vue: `Bind the selection with <code>v-model</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
    },
    {
      vue: `A standalone <code>ToggleButton</code> binds its checked state with <code>v-model</code> (<a href="#binding">Binding</a>).`,
    },
    slots(
      `Breaking: <code>style</code> on <code>ToggleButton</code> goes to the root, like <code>class</code>, instead of the <code>&lt;input&gt;</code> (<a href="#api">API</a>).`,
    ),
    components(
      `<a href="#vertical-orientation"><code>orientation</code></a> on <code>ToggleGroup</code> takes <code>"horizontal"</code>, the default.`,
    ),
    `A <a href="#toggle-button">toggle button</a> grows with its content from <code>--ui-button-size</code> instead of having a fixed height.`,
    `<code>--_duration</code> and <code>--_ease</code> set the duration and easing of the hover, selected and focus ring transitions (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-radius</code>, and <a href="#api"><code>--ui-button-radius</code></a> overrides it when a theme sets it, so one token squares or rounds every component.`,
    `The default size reads <a href="#api"><code>--ui-font-size-control</code></a> for its font size, like buttons.`,
    components(
      `<a href="#sizes">Sizes</a> name the default: <code>size="medium"</code>.`,
    ),
    slots(
      `Breaking: <code>ToggleButton</code> <code>pressed</code> is <a href="#single-select"><code>checked</code></a>.`,
    ),
    slots(
      `Breaking: <code>ToggleGroup</code> <code>selection</code> is <a href="#multi-select"><code>multiple</code></a>, and a group is <a href="#single-select">single-select</a> by default.`,
    ),
    slots(
      `Breaking: <code>ToggleButton</code> <a href="#api"><code>value</code></a> no longer falls back to <code>label</code>.`,
    ),
    `The <a href="#toggle-button">toggle button</a> focus ring sits at <code>--ui-focus-ring-inset</code>, like every other inset ring.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of a hardcoded <code>1px</code>.`,
    `<code>ToggleGroup</code> styles sit in the <code>components.extended</code> layer, like <code>ButtonGroup</code> (<a href="#toggle-group">Toggle group</a>).`,
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
    {
      ...slots(
        `Breaking: the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
      ),
      html: `Breaking: the floating content is <a href="#api"><code>.ui-floating</code></a> instead of <code>.ui-anchor-floating</code>.`,
    },
    slots(
      `Breaking: <a href="#api"><code>TooltipContent</code></a> replaces <code>label</code> and the <code>content</code> slot.`,
    ),
    slots(`Breaking: <a href="#api"><code>id</code></a> is required.`),
    slots(
      `Breaking: no <code>&lt;span interestfor&gt;</code> around the trigger. Put <code>interestfor</code> with the tooltip <code>id</code> on the <a href="#basics">trigger</a>.`,
    ),
    `The <a href="#arrow">arrow</a> points at the trigger in every position, also after a flip.`,
    `Breaking: <code>--_tooltip-bg</code> and <code>--_tooltip-color</code> are <code>--_bg-color</code> and <code>--_text-color</code>, and <code>--_tooltip-offset</code> is <code>--_offset</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners never get rounder than <a href="#api"><code>--ui-radius</code></a>, so <code>0</code> squares them.`,
    `<a href="#api"><code>--_max-inline-size</code></a> sets the maximum width.`,
    {
      ...slots(
        `Breaking: <code>alignment</code> is <a href="#position"><code>positionArea</code></a>.`,
      ),
      html: `Breaking: <code>.ui-with-arrow</code> is <a href="#arrow"><code>.ui-arrow</code></a>.`,
    },
    `<a href="#text-only">Tooltip text</a> uses <code>--ui-line-height-tight</code> (1.25), shared with card captions and keyboard hints.`,
    `The tooltip sits on <a href="#api"><code>--ui-surface-inverse</code></a> with <code>--ui-on-inverse</code> text, like <code>kbd</code>.`,
    `Styles use logical properties only, so the <a href="#basics">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    components(
      `A <code>Tooltip</code> without an <code>id</code> warns in development, since its trigger points at it with <code>interestfor</code> (<a href="#basics">Basics</a>).`,
    ),
    `In browsers without interest invokers, the compat layer shows the tooltip while its trigger is hovered or has keyboard focus (<a href="#accessibility">Accessibility</a>).`,
    `A <a href="#basics">tooltip</a> scales in as it fades, like a menu. One with an <a href="#arrow">arrow</a> only fades.`,
    `Themes can make a tooltip without an arrow spring open with <a href="#api"><code>--ui-ease-move</code></a>.`,
  ],
  typography: [
    `A <a href="#severity">severity class</a> on <code>.ui-p</code>, <code>.ui-caption</code> or <code>.ui-overline</code> colors the text in that tone, and <a href="#tabular-numbers"><code>.ui-tabular-nums</code></a> lines numbers up.`,
    `<a href="#heading-group">Overlines</a> read <code>--ui-text-subtle</code>, so a theme's secondary text color reaches them.`,
    `<a href="#inline-text-elements"><code>kbd</code> and <code>var</code></a> sit on <code>--ui-surface-inverse</code> with <code>--ui-on-inverse</code> text, like tooltips.`,
    `<a href="#rich-text-showcase">Inline <code>code</code></a> reads <code>--ui-code-bg-color</code>, code blocks read <code>--ui-code-block-bg-color</code> and <code>--ui-code-block-text-color</code>, and <code>del</code>, <code>ins</code> and <code>abbr</code> read <code>--ui-critical-text</code>, <code>--ui-success-text</code> and <code>--ui-info</code>.`,
    `Breaking: <a href="#inline-text-elements"><code>del</code>, <code>ins</code>, <code>abbr</code> and <code>dfn</code></a> and their classes are no longer severity scopes, so content inside them keeps the page palette.`,
    `<a href="#inline-text-elements">Inline <code>code</code>, <code>kbd</code>, <code>mark</code> and <code>var</code></a> are rounded with <code>--ui-radius-small</code>, and the <a href="#blockquote">blockquote</a> bar and table rules follow <code>--ui-border-width-thick</code>.`,
    `<a href="#variants">Text sizes</a> follow the type roles <code>--ui-font-size-caption</code>, <code>--ui-font-size-small</code>, <code>--ui-font-size-body</code> and <code>--ui-font-size-large</code> on the <code>--ui-font-size-100</code> to <code>900</code> scale, with <code>--ui-line-height-*</code> and <code>--ui-letter-spacing-*</code> roles for the rest, so a theme reshapes the type in a few lines.`,
    `<a href="#classless">Rich text</a> spacing comes from one flow space, with more room above headings than below.`,
    `Breaking: <a href="#variants">heading sizes</a> changed. Sizes and line heights snap to <code>--ui-rhythm-step</code>, <code>h1</code> to <code>h4</code> grow together over one viewport window (<code>--ui-fluid-min-inline-size</code> to <code>--ui-fluid-max-inline-size</code>, with <code>progress()</code>), and the heading scale no longer inverts on narrow screens.`,
    `Breaking: <a href="#classless">rich text</a> only styles headings without a class, like lists. Add a <code>.ui-h1</code>–<code>.ui-h6</code> class to a heading that has another class.`,
    `<a href="#rich-text-showcase">Rich text</a> styles tables, which scroll sideways in narrow columns, <code>hr</code> and task lists.`,
    `Breaking: <a href="#classless">rich text</a> sits in the <code>components.prose</code> layer, below components, so components inside prose keep their own styles. If you declare the layer order yourself, add <code>components.prose</code> before <code>components.root</code>.`,
    `<a href="#rich-text-showcase">Rich text</a> headings, <code>pre</code> and <code>small</code> scale with the surrounding font size, and so does <a href="#inline-text-elements"><code>.ui-small</code></a>.`,
    `Rich text <code>var</code> is monospace, like <a href="#inline-text-elements"><code>.ui-var</code></a>.`,
    `<a href="#link">Links</a> are documented, and get a thicker underline on hover.`,
    `Headings read <a href="#api"><code>--ui-font-heading</code></a>, and code, <code>kbd</code>, <code>samp</code> and <code>.ui-var</code> read <code>--ui-font-code</code>. Rich text margins read the <code>--ui-space-*</code> scale.`,
    `<a href="#link">Links</a> read <code>--ui-primary-text</code>, which keeps 4.5:1 on every surface, in a List too.`,
    `<a href="#link">Links</a> and <a href="#inline-text-elements">underlined text</a> read <code>--ui-underline-offset</code>, <code>--ui-underline-offset-small</code> and <code>--ui-underline-thickness-hover</code>.`,
    `<a href="#link">Rich text links</a> are styled by <code>link.css</code>, with one rule for <code>.ui-link</code> and classless links. Install it next to <code>typography.css</code>.`,
    `Borders read <a href="#api"><code>--ui-border-width</code></a> instead of <code>--border-size-1</code>.`,
    `<a href="#link">Links</a> only show hover styles on devices that can hover, so they no longer stick after a tap.`,
    `Styles use logical properties only, so the <a href="#classless">layout</a> follows the writing mode. Horizontal left-to-right rendering is unchanged.`,
    `<a href="#rich-text-showcase">Rich text</a> with tables and code blocks scrolls with <code>overflow-inline</code> and <code>overflow-block</code>, so it follows the writing mode. Browsers older than Chrome 135, Firefox 69 and Safari 26 ignore them and don't scroll it.`,
    `<a href="#icon"><code>.ui-icon</code></a> sizes an <code>svg</code> to <code>--ui-icon-size</code>, with <code>.ui-small</code> and <code>.ui-large</code>.`,
    `<a href="#swatch"><code>.ui-swatch</code></a> is a small dot for a color legend, painted by a severity class or <code>--_swatch-bg-color</code>.`,
    `<a href="#link">Links</a> fade to their hover and focus color.`,
  ],
} satisfies Record<string, Note[]>

/**
 * The New badge in the sidebar. A slug is in the set when the unreleased
 * version adds the component (`carousel`, `layout`, `menu`), or changes how it
 * looks with no props or modifier classes set, so an existing page renders
 * differently without a code change: its surface, shape, layout or type scale
 * (`accordion` is `plain` with a chevron, `button` icon padding, `card` actions
 * at the end, `tabs` a segmented control, `typography` heading sizes). Renames,
 * new props, token rewiring and fixes stay out, however many notes they add.
 */
export const highlighted = new Set<string>([
  "accordion",
  "button",
  "card",
  "carousel",
  "color-field",
  "copy",
  "layout",
  "menu",
  "message",
  "number-stepper",
  "one-time-code",
  "rating",
  "stat",
  "tabs",
  "timeline",
  "toast",
  "typography",
] satisfies (keyof typeof whatsNew)[])

export const added = new Set<string>([
  "carousel",
  "color-field",
  "copy",
  "layout",
  "menu",
  "message",
  "number-stepper",
  "one-time-code",
  "rating",
  "stat",
  "timeline",
  "toast",
] satisfies (keyof typeof whatsNew)[])

export const notesFor = (notes: Note[], framework: FrameworkId) =>
  notes
    .map((note) =>
      typeof note === "string" ? note : (note[framework] ?? note.default),
    )
    .filter((note) => note !== undefined)

export function whatsNewFor(framework: FrameworkId, slug: string) {
  return notesFor(whatsNew[slug as keyof typeof whatsNew] ?? [], framework)
}

export function isWhatsNewHighlighted(framework: FrameworkId, slug: string) {
  return highlighted.has(slug) && whatsNewFor(framework, slug).length > 0
}
