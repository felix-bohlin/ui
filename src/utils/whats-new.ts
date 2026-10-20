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
    `Breaking: <code>--_transition</code> is <code>--_duration</code>, and <code>--_svg-transition</code> is gone, the chevron and the open and close transition use <code>--_duration</code> and <code>--_ease</code>, and the group's <code>--_gutter-color</code> is <code>--_divider-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone. Leave <code>variant</code> out for the default look.`,
    ),
    `Elevated accordions use <a href="#api"><code>--ui-shadow-raised</code></a>, the elevated card shadow, also in dark mode. Padding and gaps read the <code>--space-*</code> scale.`,
    `<a href="#variants">Tonal and outlined</a> accordions read <a href="#api"><code>--ui-shadow-surface</code></a>, <code>none</code> unless a theme sets it.`,
  ],
  anchor: [
    slots(
      `Breaking: <a href="#api"><code>AnchorContent</code></a> replaces the <code>anchored</code> slot.`,
    ),
    slots(
      `Breaking: <a href="#hover-trigger">hover anchors</a> no longer wrap the trigger in a <code>&lt;span interestfor&gt;</code>. Give the anchor an <code>id</code> and put <code>interestfor</code> on the trigger.`,
    ),
    slots(
      `Breaking: <a href="#hover-trigger">hover anchors</a> require an <code>id</code>, which you pass to <code>interestfor</code> on the trigger.`,
    ),
  ],
  avatar: [
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
      `Breaking: a button avatar needs <code>as="button"</code>, and <code>disabled</code> only goes with it (types).`,
    ),
    components(
      `Breaking: <a href="#grouped"><code>AvatarGroup</code></a> groups avatars and replaces the <code>isGroup</code> prop.`,
    ),
    `Rounded avatars never get rounder than <a href="#api"><code>--ui-border-radius</code></a>, so <code>0</code> squares them.`,
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
    `Breaking: <code>--_badge-inset</code> is <code>--_inset-block</code> and <code>--_inset-inline</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  button: [
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
      `<a href="#icon-only"><code>iconOnly</code></a> makes <code>aria-label</code> required on icon-only buttons (types only).`,
    ),
    `Breaking: <code>--_color</code>, <code>--_color-contrast</code> and <code>--_color-tonal</code> are <code>--_accent</code>, <code>--_accent-contrast</code> and <code>--_accent-tonal</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `Breaking: <a href="#disabled">disabled links</a> have no <code>href</code>, so they can't be focused or followed.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-button-border-radius</code></a>, so one token squares or rounds every component.`,
    `Themes set the border color, font weight, and hover shadow and offset with <a href="#api"><code>--ui-button-border-color</code>, <code>--ui-button-font-weight</code>, <code>--ui-button-hover-shadow</code> and <code>--ui-button-hover-translate</code></a>, and the font size with <code>--ui-font-size-control</code>.`,
    `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code> when a theme sets it.`,
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
    components(
      `<a href="#vertical-orientation"><code>orientation</code></a> takes <code>"horizontal"</code>, the default, like <code>Carousel</code>.`,
    ),
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-button-border-radius</code></a>, so one token squares or rounds every component.`,
    `Themes set the edge and dividers of filled, outlined and tonal groups with <a href="#api"><code>--ui-button-border-color</code></a> and their shadow with <code>--ui-shadow-control</code>, and the font weight and size with <code>--ui-button-font-weight</code> and <code>--ui-font-size-control</code>, like buttons.`,
    `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code> when a theme sets it.`,
  ],
  callout: [
    slots(
      `Breaking: <a href="#icon"><code>CalloutIcon</code></a> and <a href="#variants"><code>CalloutContent</code></a> replace the automatic icon, the content wrapper and the slots. Write the title as a plain heading in <code>CalloutContent</code> instead of the <code>title</code> slot and <code>headingLevel</code>.`,
    ),
    components(
      `<a href="#icon"><code>CalloutIcon</code></a> has a <code>success</code> icon, like <code>info</code>, <code>warning</code> and <code>critical</code>.`,
    ),
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, <code>--_outlined-color</code> is <code>--_outlined-text-color</code> and <code>--_surface-bg</code> is <code>--_surface-bg-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#variants">Callouts</a> read <a href="#api"><code>--ui-shadow-surface</code></a>, and callouts without a severity <code>--ui-surface-border-color</code>, when a theme sets them.`,
  ],
  card: [
    slots(
      `Breaking: <a href="#api"><code>CardHeader</code>, <code>CardContent</code> and <code>CardActions</code></a> replace the slots, and <code>align</code> on <code>CardActions</code> replaces <code>actionsAlign</code>.`,
    ),
    `Add <code>.ui-card-link</code> to a link to make the <a href="#clickable">whole card clickable</a>.`,
    `<a href="#variants">Tonal and elevated</a> cards have a border in the page background color, so they stay visible on tonal surfaces.`,
    `<a href="#actions">Actions</a> stick to the bottom of stretched cards and wrap when they don't fit.`,
    `Breaking: <code>--_card-bg-color</code>, <code>--_card-border-color</code>, <code>--_card-border-width</code> and <code>--_card-shadow</code> drop the <code>card-</code> prefix, the outlined <code>--_border-color</code> is <code>--_outlined-border-color</code>, and <code>--_bg-surface</code>, <code>--_bg-tonal</code> and <code>--_bg-elevated</code> are <code>--_surface-bg-color</code>, <code>--_tonal-bg-color</code> and <code>--_elevated-bg-color</code>, and <code>--_elevated-shadow</code> is <code>--_elevated-shadow</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the focus ring animation's duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Elevated cards use <a href="#api"><code>--ui-shadow-raised</code></a>, and padding and gaps read the <code>--space-*</code> scale.`,
    `Breaking: <code>--_shadow-light</code> and <code>--_shadow-dark</code> are gone. Set <a href="#api"><code>--ui-shadow-raised-light</code> and <code>--ui-shadow-raised-dark</code></a> in your theme, or <a href="#component-properties"><code>--_elevated-shadow</code></a> on the card.`,
    `<a href="#variants">Tonal and outlined</a> cards read <a href="#api"><code>--ui-shadow-surface</code></a>, and tonal and elevated cards <code>--ui-surface-border-color</code>, when a theme sets them.`,
  ],
  carousel: [
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
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  checkbox: [
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code> and <code>--thumb-scale</code> is <code>--_thumb-scale</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
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
    `Corners never get rounder than <a href="#api"><code>--ui-border-radius</code></a>, so <code>0</code> squares them.`,
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
    components(
      `<a href="#disabled"><code>disabled</code></a> works on button and link chips. A link chip gets <code>aria-disabled="true"</code>.`,
    ),
    components(
      `Breaking: a button chip needs <code>as="button"</code>, and a link chip needs <code>href</code> (types).`,
    ),
    `Breaking: <a href="#disabled">disabled link chips</a> have no <code>href</code>, so they can't be focused or followed.`,
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
    {
      ...slots(
        `Breaking: <code>DescriptionListTerm</code> and <code>DescriptionListDescription</code> no longer render <code>.ui-term</code> and <code>.ui-description</code>. Select <code>dt</code> and <code>dd</code> in your CSS (<a href="#basics">Basics</a>).`,
      ),
      html: `Breaking: <code>.ui-term</code> and <code>.ui-description</code> are gone. The list styles <code>dt</code> and <code>dd</code> by element (<a href="#basics">Basics</a>).`,
    },
    {
      astro: `Breaking: deep type imports from <code>components/DescriptionList/types.astro</code> are named <a href="#api"><code>DescriptionListTermProps</code></a>, <code>DescriptionListDescriptionProps</code> and <code>DescriptionListItemProps</code> (was <code>TermProps</code>, <code>DescriptionProps</code> and <code>ItemProps</code>), like the framework entry.`,
    },
  ],
  dialog: [
    slots(
      `Breaking: <a href="#api"><code>DialogHeader</code>, <code>DialogContent</code> and <code>DialogActions</code></a> replace the slots, and <code>align</code> on <code>DialogActions</code> replaces <code>actionsAlign</code>.`,
    ),
    `<a href="#long-content">Long content</a> scrolls between a fixed header and actions.`,
    `A subtle scroll shadow shows under the header and above the actions while the <a href="#long-content">content scrolls</a>.`,
    `<a href="#width">Width</a> with <code>--_max-inline-size</code>, keeping the margin on small screens.`,
    components(
      `<a href="#how-to-close"><code>closedby</code></a> is typed in every framework.`,
    ),
    {
      html: `Breaking: the page scroll lock lives in <code>utils.css</code>. Import it too if you import single files.`,
    },
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  divider: [
    `<a href="#spacing">Spacing</a> comes from <code>--ui-divider-space</code>, which cards, callouts, dialogs and drawers make tighter.`,
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
      `Breaking: <a href="#basics"><code>DrawerTitle</code> and <code>DrawerContent</code></a> replace the <code>heading</code> prop and the slots. <code>DrawerTitle</code> names the drawer; without it, pass <code>aria-label</code>. The <code>DrawerHeader</code> close button uses <code>command="close"</code>.`,
    ),
    `Several header actions line up at the end, and a subtle scroll shadow shows while the content scrolls (<a href="#basics">Basics</a>).`,
    {
      default: `Named by <a href="#accessibility"><code>DrawerTitle</code></a> through <code>aria-labelledby</code>.`,
      html: `Name it with <a href="#accessibility"><code>aria-labelledby</code></a> pointing at the header heading.`,
    },
    `The <a href="#basics">backdrop</a> dims and blurs like <code>Dialog</code>, through <code>--ui-backdrop-color</code> and <code>--ui-backdrop-blur</code>.`,
    `Breaking: <code>--_color</code> is <code>--_text-color</code>, and <code>--_transition-duration</code> and <code>--_transition-timing</code> are <code>--_duration</code> and <code>--_ease</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `The drawer shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus, select pickers and toasts. Padding reads the <code>--space-*</code> scale.`,
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
      vue: `<code>Form</code>, <code>FieldSet</code> and <code>FieldLegend</code> type <a href="#basics"><code>as</code></a> as <code>"div" | "form"</code>, <code>"div" | "fieldset"</code> and <code>"legend" | "p"</code>.`,
    },
  ],
  layout: [
    `New: <a href="#column"><code>.ui-l-column</code></a>, <a href="#row"><code>.ui-l-row</code></a>, <a href="#grid"><code>.ui-l-grid</code></a> and <a href="#container"><code>.ui-l-container</code></a> lay out the space between components.`,
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
    `A checked <a href="#radio">option</a> uses <code>--ui-state-active-alpha-accent</code>.`,
    components(
      `Breaking: <a href="#checkbox"><code>type</code></a> can't be combined with <code>as</code> or <code>href</code> (types).`,
    ),
  ],
  menu: [
    `Items are built like <code>List</code> items, with start and end icons, text and shortcuts (<a href="#basics">Basics</a>).`,
    `New component. A <a href="#basics">popover menu</a> that anchors to its trigger, with groups and submenus. HTML and CSS only.`,
    {
      ...slots(
        `<a href="#submenu">Submenus</a> with the <code>submenu</code> slot on <code>ListItem</code>.`,
      ),
      react: `<a href="#submenu">Submenus</a> with the <code>submenu</code> prop on <code>ListItem</code>.`,
      svelte: `<a href="#submenu">Submenus</a> with the <code>submenu</code> snippet on <code>ListItem</code>.`,
    },
    `A subtle light gray border in dark mode, so <a href="#basics">menus</a> stand out on dialogs and other raised surfaces.`,
    `Menus shrink to the space on their side and flip when it's less than <code>12rem</code> (<a href="#placement">Placement</a>).`,
    {
      default: `<a href="#bordered">Dividers between items</a> with the <code>bordered</code> prop.`,
      html: `<a href="#bordered">Dividers between items</a> with <code>.ui-bordered</code>.`,
    },
    components(
      `<code>critical</code> on a <code>ListItem</code> marks a destructive <a href="#custom">custom item</a>.`,
    ),
    `The menu shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with drawers, select pickers and toasts.`,
  ],
  progress: [
    {
      ...slots(
        `Breaking: <a href="#variants"><code>variant="default"</code></a> is gone, since it wasn't the default look.`,
      ),
      html: `Breaking: <a href="#variants"><code>.ui-default</code></a> is gone, since it wasn't the default look.`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<a href="#indeterminate">Progress bars</a> center in table cells and lines of text.`,
    slots(
      `Breaking: <code>style</code> goes to the root, like <code>class</code>, instead of the <code>&lt;progress&gt;</code> (<a href="#api">API</a>).`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
  ],
  radio: [
    `<a href="#sizes">Radios</a> are 20px, the same <code>--ui-choice-size</code> as Checkbox.`,
    `<a href="#label-alignment">Lines up</a> with the first line of the label and centers on its capitals in any font.`,
    `Breaking: <code>--highlight-size</code> is <code>--_ripple-size</code> and <code>--thumb-scale</code> is <code>--_thumb-scale</code>. <code>--isLTR</code> and <code>--isRTL</code> are gone, the halo centers itself (<a href="#under-the-hood">Under the hood</a>).`,
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
    components(
      `<code>options</code> is typed as <a href="#tick-marks"><code>RangeOption[]</code></a>, exported from every framework.`,
    ),
    components(
      `<a href="#tick-marks"><code>options</code></a> renders a linked <code>&lt;datalist&gt;</code> without a <code>list</code> id.`,
    ),
    {
      react: `<a href="#value"><code>valueText</code></a> takes a function that gets the current value and follows the thumb.`,
      svelte: `The <a href="#value"><code>valueText</code></a> snippet gets the current value and follows the thumb.`,
      vue: `The <a href="#value"><code>value</code></a> slot is scoped with the current value and follows the thumb.`,
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
    `The arrow is a chevron.`,
    slots(
      `Breaking: no generated input <code>id</code>. Pass <a href="#api"><code>id</code></a> when something outside the component references the input.`,
    ),
    {
      ...slots(
        `Breaking: <code>error</code> only sets <code>aria-invalid="true"</code> on the select, no more <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
      ),
      html: `Breaking: mark an invalid select with <code>aria-invalid="true"</code> on the <code>&lt;select&gt;</code> instead of <code>data-invalid</code> on the root (<a href="#validation">Validation</a>).`,
    },
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_min-height</code>, <code>--_label-color</code> is <code>--_affix-color</code> and <code>--_end-text-color</code> is <code>--_helper-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
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
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-field-border-radius</code></a>, so one token squares or rounds every component.`,
    `The picker shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, shared with menus, drawers and toasts.`,
  ],
  spinner: [
    `Busy buttons and links with <code>aria-describedby</code> <a href="#blocked-by-another-use-case">get a spinner</a> now.`,
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
    slots(
      `Breaking: <a href="#api"><code>TableColumn</code> <code>width</code></a> takes a CSS length; a declaration string such as <code>"min-width: 10rem"</code> is no longer parsed, pass <code>style</code> instead.`,
    ),
    components(
      `<a href="#default"><code>TableCaption</code> and <code>TableFoot</code></a> render the caption and the footer rows.`,
    ),
    components(
      `<a href="#api">Every part</a> has its own props type, such as <code>TableBodyProps</code> and <code>TableCellProps</code>, exported from every framework.`,
    ),
    slots(
      `Breaking: deep type imports from <code>components/Table/types</code> have one type per part, such as <a href="#api"><code>TableCellProps</code></a>, instead of <code>SectionProps</code>, and <code>TableColumnProps</code> instead of <code>ColumnProps</code>.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
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
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
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
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_min-height</code>, <code>--_label-color</code> is <code>--_affix-color</code> and <code>--_end-text-color</code> is <code>--_helper-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
    `Breaking: the <a href="#autosuggest">autosuggest</a> and other input styles are in <code>text-field.css</code>, and <code>text-input.css</code> is gone. Remove its import.`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-field-border-radius</code></a>, so one token squares or rounds every component.`,
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
    `Breaking: <code>--_accent-color</code> is <code>--_accent</code>, <code>--_height</code> is <code>--_min-height</code>, <code>--_label-color</code> is <code>--_affix-color</code> and <code>--_end-text-color</code> is <code>--_helper-color</code> (<a href="#under-the-hood">Under the hood</a>).`,
    components(
      `Breaking: <a href="#start-text"><code>startText</code></a> replaces <code>description</code>, matching <code>endText</code>. <code>supportingText</code> is gone, use <a href="#end-text"><code>endText</code></a>.`,
    ),
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-field-border-radius</code></a>, so one token squares or rounds every component.`,
  ],
  toast: [
    `Breaking: the keyframes are <code>ui-toast-enter</code>, <code>ui-toast-hold</code> and <code>ui-toast-exit</code>, and <a href="#javascript"><code>toast.js</code></a> listens for <code>ui-toast-exit</code>.`,
    `Toasts sit in the bottom inline-end corner, so they show at the bottom left in right-to-left pages. See <a href="#how-it-works">How it works</a>.`,
    `Breaking: <code>--_anim-enter</code> and <code>--_anim-exit</code> are <code>--_enter-duration</code> and <code>--_exit-duration</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `The toast shadow is <a href="#api"><code>--ui-shadow-overlay</code></a>, and padding and gaps read the <code>--space-*</code> scale.`,
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
    `Breaking: <code>ToggleButton</code> <code>--_button-bg-color</code> is <code>--_bg-color</code>, <code>--_size</code> is <code>--_min-height</code> and <code>--_svg-size</code> is <code>--_icon-size</code>, which sizes direct child <code>svg</code>s like Button (<a href="#under-the-hood">Under the hood</a>).`,
    slots(
      `Breaking: <a href="#sizes"><code>size="default"</code></a> is gone on <code>ToggleGroup</code>. Leave <code>size</code> out for the default size.`,
    ),
    `A disabled <a href="#disabled">toggle</a> dims like a disabled button, and hover uses the button hover strength.`,
    {
      react: `<code>ToggleGroup</code> takes <code>value</code>, <code>defaultValue</code> and <code>onValueChange</code> to control the selection (<a href="#binding">Binding</a>).`,
      svelte: `Bind the selection with <code>bind:value</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
      vue: `Bind the selection with <code>v-model</code> on <code>ToggleGroup</code> (<a href="#binding">Binding</a>).`,
    },
    slots(
      `Breaking: <code>style</code> on <code>ToggleButton</code> goes to the root, like <code>class</code>, instead of the <code>&lt;input&gt;</code> (<a href="#api">API</a>).`,
    ),
    components(
      `<a href="#vertical-orientation"><code>orientation</code></a> on <code>ToggleGroup</code> takes <code>"horizontal"</code>, the default.`,
    ),
    `A <a href="#toggle-button">toggle button</a> grows with its content from <code>--ui-button-size</code> instead of having a fixed height.`,
    `<code>--_duration</code> and <code>--_ease</code> set the focus ring animation's duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners follow <code>--ui-border-radius</code> through <a href="#api"><code>--ui-button-border-radius</code></a>, so one token squares or rounds every component.`,
    `Themes set the border color, font weight, and hover shadow and offset with <a href="#api"><code>--ui-button-border-color</code>, <code>--ui-button-font-weight</code>, <code>--ui-button-hover-shadow</code> and <code>--ui-button-hover-translate</code></a>, and the font size with <code>--ui-font-size-control</code>.`,
    `<a href="#colors">Primary</a> outlined and text buttons read <code>--ui-primary-text</code> when a theme sets it.`,
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
    `Breaking: <code>--_tooltip-bg</code> and <code>--_tooltip-color</code> are <code>--_bg-color</code> and <code>--_text-color</code>, and <code>--_tooltip-offset</code> is <code>--_offset</code> (<a href="#under-the-hood">Under the hood</a>).`,
    `<code>--_duration</code> and <code>--_ease</code> set the transition duration and easing (<a href="#under-the-hood">Under the hood</a>).`,
    `Corners never get rounder than <a href="#api"><code>--ui-border-radius</code></a>, so <code>0</code> squares them.`,
  ],
  typography: [
    `<a href="#classless">Rich text</a> spacing comes from one flow space, with more room above headings than below.`,
    `Breaking: <a href="#variants">heading sizes</a> changed. Sizes and line heights snap to <code>--ui-rhythm-step</code>, and the heading scale no longer inverts on narrow screens.`,
    `Breaking: <a href="#classless">rich text</a> only styles headings without a class, like lists. Add a <code>.ui-h1</code>–<code>.ui-h6</code> class to a heading that has another class.`,
    `<a href="#rich-text-showcase">Rich text</a> styles tables, which scroll sideways in narrow columns, <code>hr</code> and task lists.`,
    `Breaking: <a href="#classless">rich text</a> sits in the <code>components.prose</code> layer, below components, so components inside prose keep their own styles. If you declare the layer order yourself, add <code>components.prose</code> before <code>components.root</code>.`,
    `<a href="#rich-text-showcase">Rich text</a> headings, <code>pre</code> and <code>small</code> scale with the surrounding font size, and so does <a href="#inline-text-elements"><code>.ui-small</code></a>.`,
    `Rich text <code>var</code> is monospace, like <a href="#inline-text-elements"><code>.ui-var</code></a>.`,
    `<a href="#link">Links</a> are documented, and get a thicker underline on hover.`,
    `Headings read <a href="#api"><code>--ui-font-heading</code></a>, and code, <code>kbd</code>, <code>samp</code> and <code>.ui-var</code> read <code>--ui-font-code</code>. Rich text margins read the <code>--space-*</code> scale.`,
    `<a href="#link">Links</a> read <code>--ui-primary-text</code> when a theme sets it.`,
  ],
} satisfies Record<string, Note[]>

const highlighted = new Set([
  "button",
  "carousel",
  "layout",
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
