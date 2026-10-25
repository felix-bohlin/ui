# Badge

## Anatomy

5

- `.ui-badge`

  Container element.

- `& > :first-child`

  The element the badge is anchored to.

- `.ui-indicator`

  The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`.

## Basics

Use `.ui-dot` to show a dot instead of the label.

```html
<span class="ui-badge">
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 32 32"
  >
    <path
      fill="currentColor"
      d="M2.004 9.303A4.5 4.5 0 0 1 6.5 5h19a4.5 4.5 0 0 1 4.496 4.303l-1.476.82L16 16.864L3.48 10.123zM2 11.588V22.5A4.5 4.5 0 0 0 6.5 27h19a4.5 4.5 0 0 0 4.5-4.5V11.588l-.526.293l-13 7a1 1 0 0 1-.948 0L2.514 11.874z"
    ></path>
  </svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    >
  </span>
</span>

<span class="ui-badge ui-dot">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span class="ui-sr-only">New messages</span></span
    >
  </span>
</span>
```

## Colors

Color the indicator with `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success` or `.ui-warning`.

```html
<span class="ui-badge ui-critical">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating"
    ><span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    ></span
  >
</span>

<span class="ui-badge ui-info">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating"
    ><span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    ></span
  >
</span>

<span class="ui-badge ui-neutral">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating"
    ><span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    ></span
  >
</span>

<span class="ui-badge ui-success">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating"
    ><span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    ></span
  >
</span>

<span class="ui-badge ui-warning">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating"
    ><span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    ></span
  >
</span>
```

## Indicator

Put the indicator text inside `.ui-indicator`. When the visible text is short, like a count, give it `aria-hidden="true"` and put the whole sentence, such as "5 unread messages", in a `.ui-sr-only` element next to it. The anchored element is the badge's direct child before `.ui-floating`.

The badge never joins the number and the words, so a translation can put the number wherever its language needs it, and the visible text can differ from the sentence ("99+" and "More than 99 unread messages").

```html
<span class="ui-badge">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    >
  </span>
</span>

<span class="ui-badge">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">99+</span
      ><span class="ui-sr-only">More than 99 unread messages</span></span
    >
  </span>
</span>
```

## Visibility

Change the badge's visibility using the `.ui-invisible` class.

```html
<span class="ui-badge ui-invisible">
  <!-- -->
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">5</span
      ><span class="ui-sr-only">5 unread messages</span></span
    >
  </span>
</span>
```

## Corners

The corner of the child the badge sits on.

`.ui-start-start`, default (`start-end`, no class), `.ui-end-start`, `.ui-end-end`.

```html
<span class="ui-badge ui-start-start">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">35</span
      ><span class="ui-sr-only">35 unread messages</span></span
    >
  </span>
</span>

<span class="ui-badge">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">99+</span
      ><span class="ui-sr-only">More than 99 unread messages</span></span
    >
  </span>
</span>

<span class="ui-badge ui-end-start">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">OK!</span
      ><span class="ui-sr-only">Inbox synced</span></span
    >
  </span>
</span>

<span class="ui-badge ui-end-end">
  <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
  <span class="ui-floating">
    <span class="ui-indicator"
      ><span aria-hidden="true">3K</span
      ><span class="ui-sr-only">About 3,000 unread messages</span></span
    >
  </span>
</span>
```

## Accessibility

- A count on its own is read without context, such as "5". Give the badge the whole sentence for screen readers, so it's read as "5 unread messages": a `.ui-sr-only` element inside `.ui-indicator`, with `aria-hidden="true"` on the visible text.
- The indicator sits next to the anchored element, not inside it. On a button or a link, put the sentence in its name too, such as `aria-label="Inbox, 5 unread messages"`, since the name is what's read when it's focused.

## API

### Badge API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Colors | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | - | Optional colors. |
| Dot | `.ui-dot` | - | Renders the indicator as a dot. `label` stays as screen reader text, and the `indicator` slot isn't shown. |
| Invisible | `.ui-invisible` | - | Hides the indicator. |
| Label | `.ui-indicator > span.ui-sr-only` | - | Hides the text visually, for the whole sentence screen readers read, such as "5 unread messages". Give the visible text `aria-hidden="true"`. |
| Position | default, `.ui-end-end`, `.ui-end-start`, `.ui-start-start` | default | The corner the indicator sits on. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-badge` | Container element. |
| `& > :first-child` | The element the badge is anchored to. |
| `.ui-indicator` | The indicator, inside `.ui-floating`. Holds `label`, the visible text with `hideLabel`, or only screen reader text with `dot`. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-accent-fill-max-lightness` | `0.48` | The highest OKLCH lightness of an accent fill, an intent color filled under `--ui-on-accent` text: the critical, info, neutral and success `Badge`, and the fills of critical `Button`s, also in a critical `ButtonGroup`. Borders keep the intent color. `0.48`, and `0.45` with more contrast. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-critical` | `var(--ui-red)` | Severity color for errors and destructive actions. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-weight-medium` | `500` | Font weight for badges, overlines and group labels. |
| `--ui-info` | `var(--ui-blue)` | Severity color for informational messages, and the dotted underline of `abbr`, `dfn`, `.ui-abbr` and `.ui-dfn`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-neutral` | `light-dark( oklch(from var(--ui-gray-9) min(l, var(--ui-accent-max-lightness)) c h), var(--ui-gray-9) )` | Severity color for neutral messages. `--ui-gray-9`, capped at `--ui-accent-max-lightness` in light mode. The `.ui-neutral` scope follows `--ui-gray-hue` and `--ui-gray-chroma`, not this token. |
| `--ui-on-accent` | `var(--ui-gray-1)` | Text on an accent fill, an intent color kept within `--ui-accent-fill-max-lightness`: critical buttons, severity `Badge`s, the invalid choice mark and the checked choice mark in dark mode. Near-white in both modes, since the cap keeps every accent fill dark enough for it. |
| `--ui-on-primary` | `color( from var(--ui-primary) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on `--ui-primary`. Derived with relative color from the primary's relative luminance (the `y` of `xyz-d65`): white on a primary below 0.182, near-black above it, so either side keeps 4.5:1 and a custom `--ui-primary` gets readable text. |
| `--ui-on-warning` | `color( from var(--ui-warning) xyz-d65 calc(0.9505 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) calc(0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1)) calc(1.089 * (0.0012 + 0.9988 * clamp(0, (0.182 - y) * 1000, 1))) )` | Text color on a `--ui-warning` fill: the warning `Badge`. White on a warning below 0.182 relative luminance and near-black above it, like `--ui-on-primary`. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-radius-round` | `1e5px` | The pill radius for round buttons, avatars, badges, chips, radios, switches, the range track and the carousel buttons and markers. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-4` | `calc(1.25rem * var(--ui-space-scale))` | Spacing step 4: `1.25rem` times `--ui-space-scale`. |
| `--ui-success` | `var(--ui-green)` | Severity color for success messages. |
| `--ui-warning` | `var(--ui-orange)` | Severity color for warnings. Unlike the other severities it keeps its lightness with more contrast: the fill is light and takes dark `--ui-on-warning` text, and `--ui-warning-text` gets the stricter lightness limits instead. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### anchor.css

A dependency, from [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_shift-x` | Input | Horizontal shift of `.ui-floating`. Defaults to `0`. |
| `--_shift-y` | Input | Vertical shift of `.ui-floating`. Defaults to `0`. |

### badge.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_accent` | Output | The color the indicator background is derived from. Set by `.ui-critical`, `.ui-info`, `.ui-neutral` and `.ui-success`. |
| `--_bg-color` | Output | Background of the indicator. Defaults to `--ui-primary`, set by the color classes. |
| `--_border-color` | Output | Border color of the indicator. Set by the color classes. |
| `--_border-width` | Input | Border width of the indicator. |
| `--_direction` | Output | Direction flag that flips `--_shift-x`. `1`, or `-1` in right-to-left. |
| `--_dot-size` | Input | Width and height of the indicator in `.ui-dot`. |
| `--_duration` | Output | Duration of the indicator fade, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the indicator fade. Defaults to `--ui-ease-enter`. |
| `--_inset` | Input | Distance of the indicator from the opposite edges. `100%` places it on the corner, round avatars move it onto the circle. |
| `--_inset-block` | Output | Block inset of the indicator, from `--_inset` and the corner classes. |
| `--_inset-inline` | Output | Inline inset of the indicator, from `--_inset` and the corner classes. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_shift-x` | Output | Horizontal shift of the indicator, from `--_sign-x`. `.ui-dot` and round avatars change it. |
| `--_shift-y` | Output | Vertical shift of the indicator, from `--_sign-y`. `.ui-dot` and round avatars change it. |
| `--_sign-x` | Output | Horizontal side of the indicator, `-1` or `1`. Set by the corner classes. |
| `--_sign-y` | Output | Vertical side of the indicator, `1` or `-1`. Set by the corner classes. |
| `--_size` | Input | Height and minimum width of the indicator. |
| `--_text-color` | Output | Text color of the indicator. Defaults to `--ui-on-primary`, set by the color classes. |

## Installation

### Dependencies

- [Anchor](https://open-props-ui.netlify.app/html/components/anchor.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/badge.css`
- `opui-css/css/components/anchor.css`

## Used in blocks

- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [User directory](https://open-props-ui.netlify.app/blocks/user-directory.md)
