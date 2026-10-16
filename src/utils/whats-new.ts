import type { FrameworkId } from "./framework"

type Note = string | Partial<Record<FrameworkId | "default", string>>

const components = (note: string) => ({
  astro: note,
  react: note,
  svelte: note,
  vue: note,
})

const slots = (note: string) => ({ astro: note, vue: note })

const whatsNew = {
  accordion: [
    slots(
      `Breaking: <a href="#basics"><code>AccordionSummary</code>, <code>AccordionContent</code></a> and <a href="#actions"><code>AccordionActions</code></a> replace the slots, and the root no longer wraps its children in <code>.ui-content</code>.`,
    ),
    {
      default: `<a href="#marker-animation">Marker animation</a> with the <code>markerAnimation</code> prop.`,
      html: `<a href="#marker-animation">Marker animation</a> with <code>.ui-marker-flip</code>, <code>.ui-marker-rotate</code> or <code>.ui-marker-turn</code>.`,
    },
    slots(
      `Breaking: a chevron marker by default. The <a href="#custom-marker"><code>marker</code> slot</a> on <code>AccordionSummary</code> replaces it, so move a custom chevron there with <code>.ui-marker</code> or it shows twice.`,
    ),
    {
      html: `Breaking: markers only animate with a <a href="#marker-animation">marker class</a>, and only the <a href="#custom-marker"><code>svg.ui-marker</code></a>. Add <code>.ui-marker-rotate</code> to keep the previous rotation.`,
    },
    `<a href="#actions">Actions</a> line up with the content and the chevron.`,
    `Breaking: <code>--_transition</code> is <code>--_duration</code>, and <code>--_svg-transition</code> is gone, the chevron uses <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone. Leave <code>variant</code> out for the default look.`,
    ),
  ],
  anchor: [
    slots(
      `Breaking: <a href="#api"><code>AnchorContent</code></a> replaces the <code>anchored</code> slot.`,
    ),
    slots(
      `Breaking: <a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
    ),
  ],
  avatar: [
    `A badge on a <a href="#grouped">grouped</a> avatar sits on its start side, the part the next avatar doesn't cover.`,
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
  ],
  badge: [
    `Badges on round avatars sit on the avatar's edge (<a href="#alignment">Alignment</a>), and in an avatar group on the start side.`,
    {
      default: `<a href="#indicator">Indicator</a> context for screen readers with <code>srLabel</code>.`,
      html: `<a href="#indicator">Indicator</a> context for screen readers with <code>.ui-sr-only</code>.`,
    },
    components(
      `<a href="#alignment"><code>alignment</code></a> takes <code>"start-end"</code>, the default placement.`,
    ),
    `Breaking: <code>--_badge-inset-block</code> and <code>--_badge-inset-inline</code> are <code>--_inset-block</code> and <code>--_inset-inline</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  "bar-chart": [
    `New component. A <a href="#basics">data table drawn as a column chart</a>, with a computed axis, grouped series and tooltips. No JavaScript needed.`,
  ],
  button: [
    {
      default: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>rounded</code> makes them round.`,
      html: `<a href="#icon-only">Icon-only</a> buttons need no extra class, and <code>.ui-rounded</code> makes them round.`,
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
    {
      default: `Links with <code>aria-disabled="true"</code> <a href="#disabled">look and act disabled</a>.`,
    },
    slots(
      `Breaking: no <code>.ui-disabled</code> on a <a href="#disabled">disabled</a> button. Style <code>:disabled</code> or <code>[aria-disabled="true"]</code>.`,
    ),
    `<a href="#colors">Primary and critical</a> colors pass contrast in light and dark mode.`,
    slots(
      `Breaking: buttons render <code>type="button"</code> by default. Pass <a href="#api"><code>type="submit"</code></a> for submit buttons.`,
    ),
    components(
      `<a href="#icon-only"><code>iconOnly</code></a> makes <code>label</code> required on icon-only buttons (types only).`,
    ),
    `Breaking: <code>--_color</code>, <code>--_color-contrast</code> and <code>--_color-tonal</code> are <code>--_accent</code>, <code>--_accent-contrast</code> and <code>--_accent-tonal</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  "button-group": [
    `Icon-only buttons use the same <a href="#icons">icon size</a> as buttons with a label.`,
    `The focus ring shows on every <a href="#variants">variant</a>, inside the button.`,
    `<a href="#split-button">Split button</a> with a <code>Menu</code>.`,
    `<a href="#icons">Icon-only</a> buttons stay square.`,
    `Breaking: <a href="#variants">variants</a> apply to the whole group. A variant on a single button inside a group is no longer supported.`,
    {
      default: `<a href="#sizes">x-small</a> size with <code>size="x-small"</code>.`,
      html: `<a href="#sizes">x-small</a> size with <code>.ui-x-small</code>.`,
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
    `<a href="#icons">Icon-only buttons</a> in a group use the button's icon size.`,
  ],
  callout: [
    slots(
      `Breaking: <a href="#icon"><code>CalloutIcon</code></a>, <code>CalloutContent</code> and <code>CalloutTitle</code> replace the automatic icon, the content wrapper and the slots, and <code>level</code> on <code>CalloutTitle</code> replaces <code>headingLevel</code>.`,
    ),
    components(
      `<a href="#icon"><code>CalloutIcon</code></a> has a <code>success</code> icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
    ),
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, <code>--_outlined-color</code> is <code>--_outlined-text-color</code> and <code>--_surface-bg</code> is <code>--_surface-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  carousel: [
    {
      default: `<a href="#images">Images</a> are cropped with the <code>aspectRatio</code> prop.`,
    },
    `A <a href="#playground">playground</a> to try the options together.`,
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
    `The <a href="#buttons-outside">scroll buttons</a> draw one glyph as the inverse of the button face, so it follows <code>.ui-dark</code>, <code>.ui-light</code> and forced colors in every browser.`,
  ],
  card: [
    slots(
      `Breaking: <a href="#api"><code>CardHeader</code>, <code>CardContent</code> and <code>CardActions</code></a> replace the slots, and <code>align</code> on <code>CardActions</code> replaces <code>actionsAlign</code>.`,
    ),
    `Add <code>.ui-card-link</code> to a link to make the <a href="#clickable">whole card clickable</a>.`,
    `<a href="#variants">Tonal and elevated</a> cards have a border in the page background color, so they stay visible on tonal surfaces.`,
    `<a href="#actions">Actions</a> stick to the bottom of stretched cards and wrap when they don't fit.`,
    `Breaking: <code>--_card-bg-color</code>, <code>--_card-border-color</code>, <code>--_card-border-width</code> and <code>--_card-shadow</code> drop the <code>card-</code> prefix, the outlined <code>--_border-color</code> is <code>--_outlined-border-color</code>, and <code>--_bg-surface</code>, <code>--_bg-tonal</code> and <code>--_bg-elevated</code> are <code>--_surface-bg-color</code>, <code>--_tonal-bg-color</code> and <code>--_elevated-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  checkbox: [
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code>, <code>--thumb-scale</code> is <code>--_thumb-scale</code>, and <code>--isLTR</code> and <code>--isRTL</code> are <code>--_dir-rtl</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Without a <a href="#visible-label">visible label</a>, checkboxes center in table cells and lines of text.`,
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
      html: `<a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Radio and Switch. Import it before <code>checkbox.css</code>.`,
      react: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A checkbox without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
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
    `The hover and press ripple is removed. <a href="#button">Button</a> and <a href="#link">link</a> chips change their background on hover instead.`,
    slots(
      `Breaking: <a href="#button"><code>as="button"</code></a> renders <code>type="button"</code> by default.`,
    ),
    {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    {
      default: `<a href="#colors">Colors</a> for statuses with <code>color</code>, and a shape-coded <a href="#dot"><code>dot</code></a>.`,
      html: `<a href="#colors">Colors</a> for statuses with <code>.ui-success</code>, <code>.ui-warning</code> and more, and a shape-coded <a href="#dot"><code>.ui-dot</code></a>.`,
    },
    `<a href="#disabled">Disabled</a> chips: <code>aria-disabled="true"</code> on a button or link chip, and <code>.ui-disabled</code> to dim a static chip.`,
    `Breaking: <code>--_color</code> is <code>--_text-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Breaking: <code>--_tone</code> is <code>--_accent</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  "description-list": [
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>DescriptionListItem</code></a>. The <code>DescriptionList.Item</code> aliases are gone.`,
    },
    {
      vue: `Breaking: <code>Description</code> is now <a href="#api"><code>DescriptionListDescription</code></a>, like Astro.`,
    },
    {
      default: `<a href="#inline">Inline</a> keeps terms and descriptions side by side at any width with <code>inline</code>.`,
      html: `<a href="#inline">Inline</a> keeps terms and descriptions side by side at any width with <code>.ui-inline</code>.`,
    },
  ],
  "data-grid": [
    `New component. A <a href="#basics">data grid</a> with <a href="#sorting">sorting</a>, filtering, selection, <a href="#pinned-columns">pinned columns</a> and <a href="#detail-panel">detail panels</a>, built with subgrid and <code>:has()</code>. No JavaScript needed.`,
  ],
  dialog: [
    slots(
      `Breaking: <a href="#api"><code>DialogHeader</code>, <code>DialogContent</code> and <code>DialogActions</code></a> replace the slots, and <code>align</code> on <code>DialogActions</code> replaces <code>actionsAlign</code>.`,
    ),
    `<a href="#long-content">Long content</a> scrolls between a fixed header and actions.`,
    `A subtle scroll shadow shows under the header and above the actions while the <a href="#long-content">content scrolls</a>.`,
    `<a href="#width">Width</a> with <code>--_max-inline-size</code>, keeping the margin on small screens.`,
  ],
  divider: [
    `<a href="#spacing">Spacing</a> comes from <code>--divider-space</code>, which cards, callouts, dialogs and drawers make tighter.`,
    {
      html: `Breaking: <a href="#variants"><code>.ui-filled</code>, <code>.ui-primary</code> and <code>.ui-tonal</code></a> replace the <code>.ui-border-*</code> classes.`,
    },
    {
      ...slots(
        `<a href="#content">Content</a> in the middle of the line through the default slot, aligned with <code>align</code>.`,
      ),
      default: `<a href="#content">Content</a> in the middle of the line as children, aligned with <code>align</code>.`,
      html: `<a href="#content">Content</a> in the middle of the line in a <code>div.ui-divider</code>, aligned with <code>.ui-align-start</code> or <code>.ui-align-end</code>.`,
    },
  ],
  drawer: [
    slots(
      `Breaking: <a href="#usage"><code>DrawerTitle</code> and <code>DrawerContent</code></a> replace the <code>heading</code> prop and the slots. <code>DrawerTitle</code> names the drawer; without it, pass <code>aria-label</code>. The <code>DrawerHeader</code> close button uses <code>command="close"</code>.`,
    ),
    `Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls (<a href="#usage">Usage</a>).`,
    {
      default: `Named by <a href="#accessibility"><code>DrawerTitle</code></a> through <code>aria-labelledby</code>.`,
      html: `Name it with <a href="#accessibility"><code>aria-labelledby</code></a> pointing at the header heading.`,
    },
    `The <a href="#usage">backdrop</a> dims and blurs like <code>Dialog</code>, through <code>--backdrop-color</code> and <code>--backdrop-blur</code>.`,
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, and <code>--_transition-duration</code> and <code>--_transition-timing</code> are <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  form: [
    {
      ...slots(
        `Breaking: <a href="#field-group"><code>FieldGroup</code></a> no longer sets <code>role="group"</code>. Wrap it in a <code>FieldSet</code> to group and name the fields.`,
      ),
      html: `Drop <code>role="group"</code> from a <a href="#field-group"><code>.ui-field-group</code></a> inside a fieldset, which already groups the fields.`,
    },
    {
      ...slots(
        `Breaking: set <code>error</code> on each field instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#fieldset-invalid">Invalid</a>).`,
      ),
      html: `Breaking: an invalid <code>.ui-fieldset</code> takes <code>aria-invalid="true"</code> on each control instead of <code>data-invalid</code> on the fieldset (<a href="#fieldset-invalid">Invalid</a>).`,
    },
    {
      astro: `<a href="#field-group"><code>FieldGroup</code></a> names its inputs through context, so a bare <code>input</code>, <code>select</code> or <code>textarea</code> no longer gets the group <code>name</code>, like in React, Svelte and Vue.`,
      vue: `<code>Form</code>, <code>FieldSet</code> and <code>FieldLegend</code> type <a href="#usage"><code>as</code></a> as <code>"div" | "form"</code>, <code>"div" | "fieldset"</code> and <code>"legend" | "p"</code>.`,
    },
  ],
  list: [
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
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    slots(
      `Breaking: <a href="#list-item-api"><code>ListItem</code> <code>as</code></a> only accepts <code>"a"</code>, <code>"button"</code> or <code>"div"</code>.`,
    ),
    `Breaking: <code>--_bg-color-hover</code> is <code>--_hover-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `A checked <a href="#radio">option</a> uses <code>--state-active-alpha-accent</code>.`,
  ],
  menu: [
    `Smaller start and end icons, and dividers that show in dark mode (<a href="#basics">Basics</a>).`,
    `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus. HTML and CSS only.`,
    {
      ...slots(
        `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
      ),
      react: `<a href="#submenu">Submenus</a> with the <code>submenu</code> prop on <code>ListItem</code>.`,
      svelte: `<a href="#submenu">Submenus</a> with the <code>submenu</code> snippet on <code>ListItem</code>.`,
    },
    `A subtle light gray border in dark mode, so <a href="#basics">menus</a> stand out on dialogs and other raised surfaces.`,
    `Tall menus shrink to the space on their side instead of running off-screen (<a href="#placement">Placement</a>).`,
    `Breaking: <code>--_bg-color-hover</code> is <code>--_hover-bg-color</code>, and <code>--_transition-duration</code> is <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
    {
      default: `<a href="#bordered">Dividers between items</a> with the <code>bordered</code> prop.`,
      html: `<a href="#bordered">Dividers between items</a> with <code>.ui-bordered</code>.`,
    },
  ],
  message: [
    `New component. <a href="#basics">Chat bubbles</a> that group by sender, with <a href="#attachments">attachments</a>, <a href="#reactions">reactions</a> and a <a href="#typing">typing indicator</a>.`,
  ],
  "one-time-code": [
    `New component. A <a href="#basics">one-time code field</a> that draws one input as a box per character, so paste and SMS autofill work without JavaScript.`,
  ],
  progress: [
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> (<a href="#under-the-hood">Under the hood</a>).`,
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
      ...slots(
        `Breaking: set <code>error</code> on each <code>Radio</code> in an invalid group instead of <code>data-invalid</code> on the <code>FieldSet</code> (<a href="#field-group-validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid group with <code>aria-invalid="true"</code> on each radio instead of <code>data-invalid</code> on the fieldset (<a href="#field-group-validation">Validation</a>).`,
    },
    {
      default: `<code>size</code> takes <code>"x-small"</code>. <a href="#sizes">Sizes</a>`,
      html: `Takes <code>.ui-x-small</code>. <a href="#sizes">Sizes</a>`,
    },
    {
      html: `<a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Switch. Import it before <code>radio.css</code>.`,
      react: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A radio without a <a href="#visible-label">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
  ],
  range: [
    `<a href="#spread">Spread</a> ranges line up with spread fields and collapse to a column in narrow containers.`,
    {
      ...slots(
        `Breaking: the track fill is CSS only (<a href="#under-the-hood">Under the hood</a>). The component no longer sets <code>--_track-fill</code> from script.`,
      ),
      html: `The track fill is CSS only, so plain HTML ranges <a href="#basics">fill</a> too.`,
    },
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    components(
      `<a href="#validation">Validation</a> with the <code>error</code> prop, which sets <code>aria-invalid="true"</code> on the input.`,
    ),
    {
      html: `Breaking: mark an invalid range with <code>aria-invalid="true"</code> on the <code>&lt;input&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_thumb-bg</code> is <code>--_thumb-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  rating: [
    `New component. A <a href="#basics">star rating</a> that shows a score with exact fractions, or <a href="#input">collects one</a> with radios.`,
  ],
  select: [
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
    `The arrow is a chevron, also on the <a href="#classic-select">classic select</a>.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    slots(
      `Breaking: <a href="#classic-select"><code>ClassicSelect</code></a> no longer sets <code>aria-labelledby</code>. The wrapping <code>&lt;label&gt;</code> names the select, so <code>endText</code> is part of the name.`,
    ),
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid select with <code>aria-invalid="true"</code> on the <code>&lt;select&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> and <code>--_height</code> is <code>--_min-height</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  spinner: [
    `Busy buttons and links with <code>aria-describedby</code> <a href="#blocked-by-another-use-case">get a spinner</a> now.`,
  ],
  stepper: [
    `New component. A <a href="#basics">stepper</a> where the current step marks every step before it as complete, with a <a href="#custom-checkmark">custom checkmark</a>.`,
  ],
  switch: [
    slots(
      `Breaking: <a href="#sizes"><code>size="small"</code></a> replaces <code>small</code>.`,
    ),
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Without a <a href="#visible-label">visible label</a>, switches center in table cells and lines of text.`,
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
      html: `<a href="#basics"><code>choice.css</code></a> holds the layout, label, end text, sizes and disabled styles shared with Checkbox and Radio. Import it before <code>switch.css</code>.`,
      react: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      svelte: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
      vue: `A switch without a <a href="#labels">label</a>, <code>aria-label</code> or <code>aria-labelledby</code> warns in development.`,
    },
  ],
  table: [
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>TableHead</code></a>. The <code>Table.Head</code> aliases are gone.`,
    },
    `A checkbox alone in a cell is centered (<a href="#default">Default</a>).`,
    {
      default: `<a href="#variants">Dense</a> tables have less block padding.`,
      html: `<a href="#variants">Dense</a> tables (<code>.ui-dense</code>) have less block padding.`,
    },
    `Fields and selects in cells keep a <code>12ch</code> minimum width, in every <a href="#variants">variant</a>.`,
    {
      default: `<a href="#sticky-header">Sticky header</a> with the <code>stickyHeader</code> prop.`,
      html: `<a href="#sticky-header">Sticky header</a> with <code>.ui-sticky-header</code>.`,
    },
    `Breaking: <code>--_table-border-radius</code> is <code>--_border-radius</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#api"><code>TableColumn</code> <code>width</code></a> takes a CSS length; a declaration string such as <code>"min-width: 10rem"</code> is no longer parsed, pass <code>style</code> instead.`,
    ),
  ],
  tabs: [
    {
      astro: `Breaking: import the parts by their flat names, such as <a href="#api"><code>TabsItem</code></a>. The <code>Tabs.Item</code> aliases are gone.`,
    },
    `Breaking: <a href="#basics">restyled</a> as a segmented control. <code>--_accent-color</code> and <code>--_bg-color</code> are gone, use a <a href="#filled">variant</a> or <code>--_active-bg-color</code>, <code>--_active-text-color</code>, <code>--_indicator-color</code> and <code>--_track-color</code>.`,
    {
      ...slots(
        `Breaking: no <code>tablist</code>, <code>tab</code> or <code>tabpanel</code> roles, so screen readers announce the <a href="#accessibility">radio group</a> they are. <code>TabsItem</code> and <code>TabsPanel</code> no longer take <code>panelId</code>, and <code>TabsPanel</code> no longer takes <code>tabId</code>.`,
      ),
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
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> and <code>--_height</code> is <code>--_min-height</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  textarea: [
    {
      ...slots(
        `<a href="#sizes">x-small and large</a> sizes. Breaking: <code>size="small"</code> replaces <code>small</code>.`,
      ),
      default: `<a href="#sizes">x-small and large</a> sizes with the <code>size</code> prop.`,
      html: `<a href="#sizes">x-small and large</a> sizes with <code>.ui-x-small</code> and <code>.ui-large</code>.`,
    },
    `<a href="#spread">Spread</a> fields line up at one width.`,
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
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> and <code>--_height</code> is <code>--_min-height</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  timeline: [
    `New component. A <a href="#basics">timeline</a> of dated events whose dates line up in their own column, with colors, custom markers and progress.`,
  ],
  toast: [
    `Breaking: the keyframes are <code>ui-toast-enter</code>, <code>ui-toast-hold</code> and <code>ui-toast-exit</code>, and <a href="#javascript"><code>toast.js</code></a> listens for <code>ui-toast-exit</code>.`,
    `Toasts sit in the bottom inline-end corner, so they show at the bottom left in right-to-left pages. See <a href="#how-it-works">How it works</a>.`,
    `Breaking: <code>--_anim-enter</code> and <code>--_anim-exit</code> are <code>--_enter-duration</code> and <code>--_exit-duration</code>, and the hold time <code>--_duration</code> is <code>--_hold-duration</code> (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  toggle: [
    slots(
      `Breaking: <a href="#toggle-button"><code>ToggleButton</code></a> no longer generates an input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
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
    `Breaking: <code>ToggleButton</code> <code>--_button-bg-color</code> is <code>--_bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#sizes"><code>size="default"</code></a> is gone on <code>ToggleGroup</code>. Leave <code>size</code> out for the default size.`,
    ),
    `A disabled <a href="#disabled">toggle</a> dims like a disabled button, hover uses the button hover strength, and <a href="#overflow"><code>shrink</code></a> truncates like <code>ButtonGroup</code>.`,
  ],
  tooltip: [
    slots(
      `Breaking: <a href="#api"><code>TooltipContent</code></a> replaces <code>label</code> and the <code>content</code> slot.`,
    ),
    slots(`Breaking: <a href="#api"><code>id</code></a> is required.`),
    slots(
      `Breaking: no <code>&lt;span interestfor&gt;</code> around the trigger. Put <code>interestfor</code> with the tooltip <code>id</code> on the <a href="#basics">trigger</a>.`,
    ),
    `The <a href="#arrow">arrow</a> points at the trigger in every position, also after a flip.`,
    `Breaking: <code>--_tooltip-bg</code> and <code>--_tooltip-color</code> are <code>--_bg-color</code> and <code>--_text-color</code>, and <code>--_tooltip-min-inline-size</code>, <code>--_tooltip-offset</code> and <code>--_tooltip-shift</code> are <code>--_min-inline-size</code>, <code>--_offset</code> and <code>--_shift</code> (<a href="#under-the-hood">Under the hood</a>).`,
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
  "bar-chart",
  "button",
  "carousel",
  "data-grid",
  "menu",
  "message",
  "one-time-code",
  "rating",
  "stepper",
  "tabs",
  "timeline",
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
