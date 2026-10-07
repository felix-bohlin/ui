import type { FrameworkId } from "./framework-routing"

type Note = string | Partial<Record<FrameworkId | "default", string>>

const whatsNew = {
  accordion: [
    {
      astro: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
      html: `<a href="#marker-animation">Marker animation</a> with <code>.ui-marker-flip</code>, <code>.ui-marker-rotate</code> or <code>.ui-marker-turn</code>.`,
      svelte: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
      vue: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
    },
    {
      astro: `Breaking: a chevron marker by default. The <a href="#custom-marker"><code>marker</code> slot</a> replaces it, so move a custom chevron there or it shows twice.`,
      vue: `Breaking: a chevron marker by default. The <a href="#custom-marker"><code>marker</code> slot</a> replaces it, so move a custom chevron there or it shows twice.`,
    },
    {
      html: `Breaking: markers only animate with a <a href="#marker-animation">marker class</a>. Add <code>.ui-marker-rotate</code> to keep the previous rotation.`,
    },
  ],
  anchor: [
    {
      astro: `Breaking: <a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
      vue: `Breaking: <a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
    },
  ],
  avatar: [
    {
      astro: `Breaking: <a href="#image"><code>alt</code></a> is required when <code>src</code> is set.`,
      vue: `Breaking: <a href="#image"><code>alt</code></a> is required when <code>src</code> is set.`,
    },
    {
      astro: `Breaking: <code>as="button"</code> renders <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
      vue: `Breaking: <code>as="button"</code> renders <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    },
  ],
  badge: [
    {
      default: `<a href="#indicator">Indicator</a> context for screen readers with <code>srLabel</code>.`,
      html: `<a href="#indicator">Indicator</a> context for screen readers with <code>.ui-sr-only</code>.`,
    },
    {
      astro: `<a href="#alignment"><code>alignment</code></a> takes <code>"start-end"</code>, the default placement.`,
      svelte: `<a href="#alignment"><code>alignment</code></a> takes <code>"start-end"</code>, the default placement.`,
      vue: `<a href="#alignment"><code>alignment</code></a> takes <code>"start-end"</code>, the default placement.`,
    },
  ],
  button: [
    {
      astro: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>rounded</code> makes them round.`,
      html: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>.ui-rounded</code> makes them round.`,
      svelte: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>rounded</code> makes them round.`,
      vue: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>rounded</code> makes them round.`,
    },
    `Replaces <code>IconButton</code>. An <a href="#icon-only">icon-only</a> button is a <code>Button</code> with just an <code>svg</code>.`,
    `Breaking: icon styles only apply to a direct child <code>svg</code>. Wrap the label in a <code>&lt;span class="ui-text"&gt;</code> next to an icon to <a href="#buttons-with-icon-and-label">tighten the padding</a>, or the button renders as icon-only.`,
    {
      html: `Breaking: <code>.ui-icon-only</code> is removed. A button whose only child is an <code>svg</code> is <a href="#icon-only">square</a>.`,
    },
    {
      default: `Links with <code>aria-disabled="true"</code> <a href="#disabled">look and act disabled</a>.`,
    },
    {
      astro: `Breaking: no <code>.ui-disabled</code> on a <a href="#disabled">disabled</a> button. Style <code>:disabled</code> or <code>[aria-disabled="true"]</code>.`,
      vue: `Breaking: no <code>.ui-disabled</code> on a <a href="#disabled">disabled</a> button. Style <code>:disabled</code> or <code>[aria-disabled="true"]</code>.`,
    },
    `<a href="#colors">Primary and critical</a> colors pass contrast in light and dark mode.`,
    {
      astro: `Breaking: buttons render <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
      vue: `Breaking: buttons render <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    },
  ],
  "button-group": [
    `<a href="#split-button">Split button</a> with a <code>Menu</code>.`,
    `<a href="#icons">Icon-only</a> buttons stay square.`,
    `Breaking: <a href="#variants">variants</a> apply to the whole group. A variant on a single button inside a group is no longer supported.`,
    {
      default: `<a href="#sizes">X-small</a> size with <code>size="x-small"</code>.`,
      html: `<a href="#sizes">X-small</a> size with <code>.ui-x-small</code>.`,
    },
    `<a href="#sizes">Small</a> groups use the same text size as a small <code>Button</code>.`,
    {
      default: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>scrollable</code> or truncates with <code>shrink</code>.`,
      html: `<a href="#overflow">Wraps</a> when it doesn't fit, or scrolls with <code>.ui-scrollable</code> or truncates with <code>.ui-shrink</code>.`,
    },
    {
      default: `Button links (<code>href</code>) get the group styles too, see <a href="#variants">Variants</a>.`,
      html: `<code>&lt;a class="ui-button"&gt;</code> links get the group styles too, see <a href="#variants">Variants</a>.`,
    },
  ],
  callout: [
    {
      astro: `<a href="#icon"><code>success</code></a> has a default icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
      svelte: `<a href="#icon"><code>success</code></a> has a default icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
      vue: `<a href="#icon"><code>success</code></a> has a default icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
    },
  ],
  carousel: [
    `New component. A <a href="#basics">scroll snap carousel</a> with buttons and markers generated by CSS.`,
    {
      default: `<a href="#persistent-buttons">Persistent buttons</a> with the <code>persistentButtons</code> prop.`,
      html: `<a href="#persistent-buttons">Persistent buttons</a> with <code>.ui-buttons-persistent</code>.`,
    },
    {
      default: `<a href="#vertical">Vertical</a> carousels with <code>orientation="vertical"</code>.`,
      html: `<a href="#vertical">Vertical</a> carousels with <code>.ui-vertical</code>.`,
    },
    {
      default: `<a href="#stretch">Stretch</a> cards to equal height with the <code>stretch</code> prop.`,
      html: `<a href="#stretch">Stretch</a> cards to equal height with <code>.ui-stretch</code>.`,
    },
  ],
  card: [
    `Add <code>.ui-card-link</code> to a link to make the <a href="#clickable">whole card clickable</a>.`,
    `<a href="#variants">Tonal and elevated</a> cards have a border in the page background color, so they stay visible on tonal surfaces.`,
    `<a href="#actions">Actions</a> stick to the bottom of stretched cards and wrap when they don't fit.`,
  ],
  checkbox: [
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_thumb-scale</code>, and <code>--isLTR</code> and <code>--isRTL</code> are <code>--_dir-rtl</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Without a <a href="#visible-label">visible label</a>, checkboxes center in table cells and lines of text.`,
    {
      astro: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each checkbox in an invalid <a href="#field-group-validation">group</a>.`,
      html: `Breaking: mark an invalid checkbox with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
      vue: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each checkbox in an invalid <a href="#field-group-validation">group</a>.`,
    },
    {
      astro: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
      svelte: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      vue: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
    },
  ],
  chip: [
    {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>, and small chips are 28px to match the control sizes.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>, and small chips are 28px to match the control sizes.`,
    },
    {
      default: `Long labels truncate with an ellipsis unless the chip is <a href="#api"><code>multiline</code></a>.`,
      html: `Long labels truncate with an ellipsis unless the chip is <a href="#api"><code>.ui-multiline</code></a>.`,
    },
    `Breaking: the hover and press ripple is removed. <a href="#button">Button</a> and <a href="#link">link</a> chips change their background on hover instead.`,
    {
      astro: `Breaking: <a href="#button"><code>as="button"</code></a> renders <code>type="button"</code> by default.`,
      vue: `Breaking: <a href="#button"><code>as="button"</code></a> renders <code>type="button"</code> by default.`,
    },
    {
      astro: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
      svelte: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      vue: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
    },
  ],
  "description-list": [
    {
      vue: `Breaking: <code>Description</code> is now <a href="#api"><code>DescriptionListDescription</code></a>, like Astro.`,
    },
  ],
  dialog: [
    `<a href="#long-content">Long content</a> scrolls between a fixed header and actions.`,
    `A subtle scroll shadow shows under the header and above the actions while the <a href="#long-content">content scrolls</a>.`,
  ],
  divider: [
    `<a href="#spacing">Spacing</a> comes from <code>--divider-space</code>, which cards, callouts, dialogs and drawers make tighter.`,
    {
      html: `Breaking: <a href="#variants"><code>.ui-filled</code>, <code>.ui-primary</code> and <code>.ui-tonal</code></a> replace the <code>.ui-border-*</code> classes.`,
    },
  ],
  drawer: [
    `Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls (<a href="#usage">Usage</a>).`,
    {
      default: `Named by the header heading through <a href="#accessibility"><code>aria-labelledby</code></a>.`,
      html: `Name it with <a href="#accessibility"><code>aria-labelledby</code></a> pointing at the header heading.`,
    },
  ],
  form: [
    {
      default: `Breaking: <a href="#field-group"><code>FieldGroup</code></a> no longer sets <code>role="group"</code>. Wrap it in a <code>FieldSet</code> to group and name the fields.`,
      html: `Drop <code>role="group"</code> from a <a href="#field-group"><code>.ui-field-group</code></a> inside a fieldset, which already groups the fields.`,
    },
    {
      astro: `Breaking: set <code>error</code> on each field instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#fieldset-invalid">Invalid</a>).`,
      html: `Breaking: an invalid <code>.ui-fieldset</code> takes <code>aria-invalid="true"</code> on each control instead of <code>data-invalid</code> on the fieldset (<a href="#fieldset-invalid">Invalid</a>).`,
      vue: `Breaking: set <code>error</code> on each field instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#fieldset-invalid">Invalid</a>).`,
    },
  ],
  list: [
    {
      default: `Breaking: <code>divided</code> is removed. Use <a href="#on-every-item"><code>bordered</code></a>.`,
      html: `Breaking: <code>.ui-divided</code> is removed. Use <a href="#on-every-item"><code>.ui-bordered</code></a>.`,
    },
    `<a href="#dense">Dense</a> rows keep the default inline padding, so they line up with card content.`,
    `Only direct children are styled as rows, so nested lists inside a row stay normal lists (<a href="#under-the-hood">Under the hood</a>).`,
    {
      default: `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    {
      astro: `Breaking: <a href="#list-item-api"><code>ListItem</code> <code>as</code></a> only accepts <code>"a"</code>, <code>"button"</code> or <code>"div"</code>.`,
      vue: `Breaking: <a href="#list-item-api"><code>ListItem</code> <code>as</code></a> only accepts <code>"a"</code>, <code>"button"</code> or <code>"div"</code>.`,
    },
  ],
  menu: [
    `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus. HTML and CSS only.`,
    {
      astro: `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
      svelte: `<a href="#submenu">Submenus</a> with the <code>submenu</code> snippet on <code>ListItem</code>.`,
      vue: `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
    },
    `A subtle light gray border in dark mode, so <a href="#basics">menus</a> stand out on dialogs and other raised surfaces.`,
    `Tall menus shrink to the space on their side instead of running off-screen (<a href="#placement">Placement</a>).`,
  ],
  progress: [
    {
      default: `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
  ],
  radio: [
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_thumb-scale</code>, and <code>--isLTR</code> and <code>--isRTL</code> are <code>--_dir-rtl</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Without a visible label, radios <a href="#label-alignment">center</a> in table cells and lines of text.`,
    {
      default: `<a href="#spread">Spread</a> with the <code>spread</code> prop, like Checkbox and Switch.`,
      html: `<a href="#spread">Spread</a> with <code>.ui-spread</code>, like Checkbox and Switch.`,
    },
    {
      astro: `Breaking: set <code>error</code> on each <code>Radio</code> in an invalid group instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#validation">Validation</a>).`,
      html: `Breaking: mark an invalid group with <code>aria-invalid="true"</code> on each radio instead of <code>data-invalid</code> on the fieldset (<a href="#validation">Validation</a>).`,
      vue: `Breaking: set <code>error</code> on each <code>Radio</code> in an invalid group instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#validation">Validation</a>).`,
    },
    {
      astro: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
      svelte: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      vue: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
    },
  ],
  range: [
    `<a href="#spread">Spread</a> ranges line up with spread fields and collapse to a column in narrow containers.`,
    {
      astro: `Breaking: the track fill is CSS only (<a href="#under-the-hood">Under the hood</a>). The component no longer sets <code>--_track-fill</code> from script.`,
      html: `The track fill is CSS only, so plain HTML ranges <a href="#basics">fill</a> too.`,
      vue: `Breaking: the track fill is CSS only (<a href="#under-the-hood">Under the hood</a>). The component no longer sets <code>--_track-fill</code> from script.`,
    },
    {
      default: `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    {
      astro: `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
      svelte: `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
      vue: `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
    },
    {
      html: `Breaking: mark an invalid range with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
  ],
  select: [
    {
      default: `<a href="#sizes">X-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">X-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    {
      default: `<a href="#preselected">Preselect</a> options with <code>value</code> or <code>selected</code> on an item.`,
      html: `<a href="#preselected">Preselect</a> options with <code>selected</code>.`,
    },
    `The arrow is a chevron, also on the <a href="#classic-select">classic select</a>.`,
    {
      astro: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
      vue: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    },
    {
      astro: `Breaking: <a href="#classic-select"><code>ClassicSelect</code></a> no longer sets <code>aria-labelledby</code>. The wrapping <code>&lt;label&gt;</code> names the select, so <code>endText</code> is part of the name.`,
      vue: `Breaking: <a href="#classic-select"><code>ClassicSelect</code></a> no longer sets <code>aria-labelledby</code>. The wrapping <code>&lt;label&gt;</code> names the select, so <code>endText</code> is part of the name.`,
    },
    {
      astro: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      html: `Breaking: mark an invalid select with <code>aria-invalid="true"</code> on the <code>&lt;select&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      vue: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
  ],
  spinner: [
    `Busy buttons and links with <code>aria-describedby</code> <a href="#blocked-by-another-use-case">get a spinner</a> now.`,
  ],
  switch: [
    {
      astro: `Breaking: <a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
      vue: `Breaking: <a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    },
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Without a <a href="#visible-label">visible label</a>, switches center in table cells and lines of text.`,
    {
      astro: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each switch in an invalid <a href="#field-group-validation">group</a>.`,
      html: `Breaking: mark an invalid switch with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root, also in a <a href="#field-group-validation">group</a> (<a href="#validation">Validation</a>).`,
      vue: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input. Set <code>error</code> on each switch in an invalid <a href="#field-group-validation">group</a>.`,
    },
    {
      astro: `<code>size</code> takes <code>"x-small"</code> and <code>"large"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code> and <code>.ui-large</code>. <a href="#sizes">Sizes</a>`,
      svelte: `<code>size</code> takes <code>"x-small"</code> and <code>"large"</code>. <a href="#sizes">Sizes</a>`,
      vue: `<code>size</code> takes <code>"x-small"</code> and <code>"large"</code>. <a href="#sizes">Sizes</a>`,
    },
  ],
  table: [
    {
      default: `<a href="#variants">Dense</a> tables have less block padding.`,
      html: `<a href="#variants">Dense</a> tables (<code>.ui-dense</code>) have less block padding.`,
    },
    `Fields and selects in cells keep a <code>12ch</code> minimum width, in every <a href="#variants">variant</a>.`,
    {
      default: `<a href="#sticky-header">Sticky header</a> with the <code>stickyHeader</code> prop.`,
      html: `<a href="#sticky-header">Sticky header</a> with <code>.ui-sticky-header</code>.`,
    },
  ],
  tabs: [
    `Breaking: <a href="#basics">restyled</a> as a segmented control. <code>--_accent-color</code> and <code>--_bg-color</code> are gone, use a <a href="#filled">variant</a> or <code>--_active-bg-color</code>, <code>--_active-text-color</code>, <code>--_indicator-color</code> and <code>--_track-color</code>.`,
    {
      default: `Breaking: no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radio group</a> they are. <code>TabsItem</code> and <code>TabsPanel</code> no longer take <code>panelId</code>, and <code>TabsPanel</code> no longer takes <code>tabId</code>.`,
      html: `Breaking: no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radio group</a> they are. Style <code>.ui-tab-label</code> and <code>.ui-tab-panel</code> instead of <code>[role="tab"]</code> and <code>[role="tabpanel"]</code>.`,
    },
    {
      default: `<a href="#scrollable">Scrollable</a> tabs with the <code>scrollable</code> prop.`,
      html: `<a href="#scrollable">Scrollable</a> tabs with <code>.ui-scrollable</code>.`,
    },
    {
      default: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with the <code>variant</code> prop.`,
      html: `<a href="#filled">Filled</a>, <a href="#line">line</a> and <a href="#outlined">outlined</a> variants with <code>.ui-filled</code>, <code>.ui-line</code> and <code>.ui-outlined</code>.`,
    },
  ],
  "text-field": [
    {
      default: `<a href="#sizes">X-small and large</a> sizes. Breaking: <code>size="small"</code> replaces <code>small</code>.`,
      html: `<a href="#sizes">X-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    {
      astro: `Breaking: extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the input. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `Breaking: <code>style</code> goes to the label instead of the input (<a href="#api">API</a>).`,
    },
    `The <a href="#autosuggest">auto-suggest</a> arrow is the Select chevron at every size.`,
    {
      astro: `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
      vue: `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    },
    {
      astro: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
      vue: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    },
    {
      astro: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      html: `Breaking: mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      vue: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the input, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
  ],
  textarea: [
    {
      default: `<a href="#sizes">X-small and large</a> sizes. Breaking: <code>size="small"</code> replaces <code>small</code>.`,
      html: `<a href="#sizes">X-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
    {
      astro: `Breaking: extra attributes such as <code>autocomplete</code> and <code>aria-*</code> go to the textarea. <code>class</code> and <code>style</code> stay on the label (<a href="#api">API</a>).`,
      vue: `Breaking: <code>style</code> goes to the label instead of the textarea (<a href="#api">API</a>).`,
    },
    {
      astro: `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
      vue: `Breaking: <a href="#variants"><code>variant="filled"</code></a> replaces the boolean <code>filled</code>.`,
    },
    {
      astro: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
      vue: `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    },
    {
      astro: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the textarea, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      html: `Breaking: mark an invalid field with <code>aria-invalid="true"</code> on the <code>&lt;textarea&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      vue: `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the textarea, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
  ],
  toast: [
    `Breaking: the keyframes are <code>ui-toast-enter</code>, <code>ui-toast-hold</code> and <code>ui-toast-exit</code>, and <a href="#javascript"><code>toast.js</code></a> listens for <code>ui-toast-exit</code>.`,
    `Toasts sit in the bottom inline-end corner, so they show at the bottom left in right-to-left pages. See <a href="#how-it-works">How it works</a>.`,
  ],
  toggle: [
    {
      default: `<a href="#sizes">Large</a> size with <code>size="large"</code>.`,
      html: `<a href="#sizes">Large</a> size with <code>.ui-large</code>.`,
    },
    `<a href="#sizes">Small and x-small</a> toggles use smaller text, like <code>Button</code>.`,
    {
      default: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>scrollable</code> or truncates with <code>shrink</code>.`,
      html: `<a href="#overflow">Groups wrap</a> when they don't fit, or scrolls with <code>.ui-scrollable</code> or truncates with <code>.ui-shrink</code>.`,
    },
    `Breaking: no <code>.ui-disabled</code>. A <a href="#toggle-button">toggle</a> looks disabled when its input is <code>disabled</code>.`,
  ],
  tooltip: [
    {
      astro: `Breaking: <a href="#api"><code>id</code></a> is required.`,
      vue: `Breaking: <a href="#api"><code>id</code></a> is required.`,
    },
    {
      astro: `Breaking: no <code>&lt;span interestfor&gt;</code> around the trigger. Put <code>interestfor</code> with the tooltip <code>id</code> on the <a href="#basics">trigger</a>.`,
      vue: `Breaking: no <code>&lt;span interestfor&gt;</code> around the trigger. Put <code>interestfor</code> with the tooltip <code>id</code> on the <a href="#basics">trigger</a>.`,
    },
    `The <a href="#arrow">arrow</a> points at the trigger in every position, also after a flip.`,
  ],
  typography: [
    `<a href="#classless">Rich text</a> spacing comes from one flow space, with more room above headings than below.`,
    `Breaking: <a href="#variants">heading sizes</a> changed. Sizes and line heights snap to <code>--rhythm-step</code>, and the heading scale no longer inverts on narrow screens.`,
    `Breaking: <a href="#classless">rich text</a> only styles headings without a class, like lists. Add a <code>.ui-h1</code>–<code>.ui-h6</code> class to a heading that has another class.`,
    `<a href="#rich-text-showcase">Rich text</a> styles tables, <code>hr</code> and task lists.`,
    `Breaking: <a href="#classless">rich text</a> sits in the <code>components.prose</code> layer, below components, so components inside prose keep their own styles. If you declare the layer order yourself, add <code>components.prose</code> before <code>components.root</code>.`,
    `<a href="#rich-text-showcase">Rich text</a> headings, <code>pre</code> and <code>small</code> scale with the surrounding font size.`,
    `<a href="#link">Links</a> are documented, and get a thicker underline on hover.`,
    `<a href="#rich-text-showcase">Rich text</a> tables scroll sideways in narrow columns instead of breaking words letter by letter.`,
  ],
} satisfies Record<string, Note[]>

const highlighted = new Set([
  "button",
  "carousel",
  "menu",
  "tabs",
  "typography",
])

export function whatsNewFor(framework: FrameworkId, slug: string) {
  const notes: Note[] = whatsNew[slug as keyof typeof whatsNew] ?? []

  return notes
    .map((note) =>
      typeof note === "string" ? note : (note[framework] ?? note.default),
    )
    .filter((note) => note !== undefined)
}

export function isWhatsNewHighlighted(framework: FrameworkId, slug: string) {
  return highlighted.has(slug) && whatsNewFor(framework, slug).length > 0
}
