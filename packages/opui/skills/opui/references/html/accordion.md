# Accordion

## Anatomy

Accordion title

Explain more about the topic shown in the summary through supporting text.

- `details.ui-accordion`

  Container element.

- `<summary>`

  The always visible header.

- `<svg class="ui-marker">`

  The marker. In Astro, React, Svelte and Vue, `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates.

- `.ui-content`

  The collapsible content.

- `.ui-actions`

  A group of actions, such as buttons.

## Basics

Put the header in the `<summary>` and the body in a `.ui-content` element.

```html
<details class="ui-accordion">
  <summary>
    Accordion
    <svg
      aria-hidden="true"
      class="ui-marker"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414"
      />
    </svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

## Variants

Add one of the variant classes (`.ui-elevated`, `.ui-outlined`, `.ui-tonal`, `.ui-transparent`) to the `<details>` element to change how it looks. Without one the accordion has the page surface and no border, like a card.

```html
<details class="ui-accordion">
  <summary>
    Plain
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-elevated">
  <summary>
    Elevated
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-outlined">
  <summary>
    Outlined
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-tonal">
  <summary>
    Tonal
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-transparent">
  <summary>
    Transparent
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>
```

## Accordion group

Group multiple accordions by wrapping them in a `.ui-card` element with `role="group"`. To theme the entire group, apply the variant class to the parent container.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion">
    <summary>
      Accordion title
      <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion">
    <summary>
      Accordion title
      <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
  <details class="ui-accordion">
    <summary>
      Accordion title
      <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
    </summary>
    <div class="ui-content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        sodales, nulla sit amet porttitor rhoncus, lacus ex vestibulum libero,
        ac mollis neque ante id justo.
      </p>
    </div>
  </details>
</div>
```

### Mutually exclusive

Set the same `name` attribute on each `<details>` element to allow only one of them to be open at a time.

```html
<div class="ui-card ui-outlined" role="group">
  <details class="ui-accordion" name="example-group">
    <summary>
      First
      <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
    </summary>
    <div class="ui-content">
      <p>Only one accordion in the group is open at a time.</p>
    </div>
  </details>
  <details class="ui-accordion" name="example-group">
    <summary>
      Second
      <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
    </summary>
    <div class="ui-content">
      <p>Only one accordion in the group is open at a time.</p>
    </div>
  </details>
</div>
```

## Actions

Add buttons or other interactive elements below the content in a `.ui-actions` element, after `.ui-content`. They sit at the end, and `.ui-align-start` lines them up with the content.

```html
<details open class="ui-accordion ui-elevated">
  <summary>
    Accordion with actions
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare.
    </p>
  </div>
  <div class="ui-actions">
    <button type="button" class="ui-button">Cancel</button>
    <button type="button" class="ui-button">Agree</button>
  </div>
</details>
```

## Custom marker

Replace the `svg.ui-marker` inside the `summary` to change the marker, and keep `aria-hidden="true"` on it since it's decorative. Leave it out to fall back to the native arrow. Only `.ui-marker` animates, so other icons in the `summary`, such as a leading status icon, stay put.

```html
<details class="ui-accordion ui-outlined">
  <summary>
    Custom marker
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo. Nam tempor euismod nisi ac ornare. Pellentesque id
      sapien lacinia, venenatis est aliquam, dignissim elit. Suspendisse
      potenti. Cras ut ante in libero tempus sodales sed quis dolor.
    </p>
  </div>
</details>
```

## Marker animation

The `.ui-marker` rotates when the accordion opens. Add `.ui-marker-animation-flip` or `.ui-marker-animation-turn` to the `<details>` element to flip or turn it instead.

```html
<details class="ui-accordion ui-marker-animation-flip ui-outlined">
  <summary>
    Flip
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-outlined">
  <summary>
    Rotate
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>

<details class="ui-accordion ui-marker-animation-turn ui-outlined">
  <summary>
    Turn
    <svg aria-hidden="true" class="ui-marker" viewBox="0 0 24 24"></svg>
  </summary>
  <div class="ui-content">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sodales,
      nulla sit amet porttitor rhoncus, lacus ex vestibulum libero, ac mollis
      neque ante id justo.
    </p>
  </div>
</details>
```

## Accessibility

- Accordions are `<details>` and `<summary>`. The browser announces the summary with its expanded or collapsed state and toggles it with `Enter` and `Space`, so no ARIA is needed.
- In supporting browsers, find in page also searches closed accordions and opens the one with the match.

## API

### Accordion API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Group | `[name]` | - | Groups accordions so only one of them can be open at a time. |
| Marker animation | default, `.ui-marker-animation-flip`, `.ui-marker-animation-turn` | default | How the marker animates when the accordion opens. `rotate` turns it upside down, `flip` mirrors it, and `turn` gives a chevron that points to the inline end a quarter turn, so it points down when open. |
| State | `[open]` | - | Whether the accordion is open. |
| Variants | default, `.ui-elevated`, `.ui-outlined`, `.ui-tonal`, `.ui-transparent` | default | The variant to use. The default `plain` accordion has the page surface and no border, like a Card. `transparent` has no surface, border or padding. |

#### Parts

| Part | Description |
| --- | --- |
| `details.ui-accordion` | Container element. |
| `<summary>` | The always visible header. |
| `<svg class="ui-marker">` | The marker. In Astro, React, Svelte and Vue, `AccordionSummary` renders a chevron by default. Only `.ui-marker` animates. |
| `.ui-content` | The collapsible content. |
| `.ui-actions` | A group of actions, such as buttons. |

To group accordions, wrap them in a `.ui-card[role="group"]`. A variant on the group styles every accordion in it.

### Accordion summary API

#### Parts

| Part | Description |
| --- | --- |
| `<summary>` | The always visible header. |
| `<svg class="ui-marker">` | The marker. Renders a chevron by default. Only `.ui-marker` animates. |

### Accordion actions API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Alignment | default, `.ui-align-start` | default | Alignment for the actions. |

#### Parts

| Part | Description |
| --- | --- |
| `.ui-actions` | A group of actions, such as buttons. |

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-color-raised` | Unset | Border color of tonal and elevated `Card` and `Accordion` and of `Callout` without a severity. When unset, cards and accordions use the page background color, so they stay visible on tonal surfaces, and callouts their tonal background. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-card-padding` | Unset | Padding of `Card`, `Dialog` and `Accordion` content, headers and actions. When unset, `--ui-space-3`. |
| `--ui-duration` | `0.2s` | Default transition duration. Multiplied by `--ui-motion`. |
| `--ui-ease` | `ease` | Default easing for transitions. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-focus-ring-color` | `oklch( from var(--ui-surface) clamp(0, (0.6 - l) * 1000, 1) 0 0 )` | Color of the keyboard focus ring. Black on surfaces lighter than OKLCH 0.6 and white on darker ones, so it reaches 3:1 on any `--ui-surface`. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-focus-ring-offset` | `2px` | Distance between a control and its focus ring. |
| `--ui-focus-ring-style` | `solid` | Outline style of the focus ring. |
| `--ui-focus-ring-width` | `2px` | Width of the focus ring. |
| `--ui-font-size-body` | `var(--ui-font-size-300)` | Font size of body copy, `Card` text and the `Callout` title. Defaults to `--ui-font-size-300`. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-line-height-tight` | `1.25` | Line height of single-line controls and compact text: field inputs, `Table` cells, `Tooltip`, `Card` captions and keyboard hints in buttons. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-shadow-elevated` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of elevated `Card` and `Accordion`. Five layers of `--ui-shadow-color`, which follows the color scheme, also in `.ui-light` and `.ui-dark` parts of the page. |
| `--ui-shadow-surface` | `none` | Shadow of tonal and outlined `Card` and `Accordion`, and of `Callout`. `none` by default, for themes that put every surface on the same plane. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-surface` | `light-dark(var(--ui-gray-1), var(--ui-gray-13))` | Page and card background. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### accordion.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_actions-gap` | Input | Space between the buttons in `.ui-actions`. |
| `--_actions-margin-block-start` | Input | Space above `.ui-actions`. |
| `--_actions-padding-block-end` | Input | Bottom padding of `.ui-actions`. Defaults to `--_summary-padding-block`. |
| `--_actions-padding-inline` | Input | Inline padding of `.ui-actions`. Defaults to `--_content-padding-inline`, and at least the focus ring's space. |
| `--_bg-color` | Output | The background. `--ui-surface` by default, set by the other variants, and `transparent` in `.ui-transparent` and in groups. |
| `--_border-color` | Output | The border color. In `.ui-elevated` and `.ui-tonal`, `--ui-border-color-raised` when a theme sets it, otherwise `--ui-surface`. `--ui-border-color` in `.ui-outlined`. |
| `--_border-width` | Output | The border width. Set by the variants. |
| `--_content-padding-block` | Input | Block padding of `.ui-content`. |
| `--_content-padding-inline` | Input | Inline padding of `.ui-content`. Defaults to `--_padding-inline`. |
| `--_divider-border-color` | Input | Color of the border between items in a group. Defaults to `--ui-border-color`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the transitions. Defaults to `--ui-ease`. |
| `--_focus-ring-offset` | Input | Offset of the `summary` focus ring. Inside the summary, except in `.ui-transparent`. |
| `--_group-radius` | Input | Corner radius of the first and last item in a group. Defaults to `--ui-radius`. |
| `--_item-padding-inline` | Input | Inline padding of the items in a group. `0` when the card is `.ui-transparent`. |
| `--_item-summary-padding-inline` | Input | Inline padding of the item `summary` in a group. Defaults to `--_item-padding-inline`. |
| `--_margin-inline` | Input | The inline margin. `0`, except in `.ui-transparent` outside a group. |
| `--_motion` | Input | Motion multiplier for `--_duration`. `0` turns the transitions off. |
| `--_overflow` | Output | The overflow. `hidden`, except in `.ui-transparent` and in groups. |
| `--_padding-inline` | Input | Inline padding of `summary`, `.ui-content` and `.ui-actions`. `0` in `.ui-transparent`. |
| `--_radius` | Input | The corner radius, also of the `summary` focus ring. Defaults to `--ui-radius`. |
| `--_shadow` | Output | The shadow. `.ui-elevated` sets `--ui-shadow-elevated`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_summary-padding-block` | Input | Block padding of `summary`. |
| `--_summary-padding-inline` | Input | Inline padding of `summary`. Defaults to `--_padding-inline`. |

### card.css

A dependency, from [Card](https://open-props-ui.netlify.app/html/components/card.md).

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Output | The current background. Set by the variants. |
| `--_border-color` | Output | The current border color. Set by the variants (`--ui-border-color-raised` in `.ui-tonal` and `.ui-elevated` when a theme sets it) and by hovering `.ui-card-link`. |
| `--_border-width` | Output | The current border width. Set by the variants. |
| `--_duration` | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`. |
| `--_ease` | Input | Easing of the focus ring animation. Defaults to `--ui-ease`. |
| `--_elevated-bg-color` | Input | Background of `.ui-elevated`. Defaults to `--ui-surface-elevated`. |
| `--_elevated-shadow` | Input | Shadow of `.ui-elevated`. Defaults to `--ui-shadow-elevated`. |
| `--_motion` | Input | Motion multiplier for the focus ring animation. `0` turns it off. |
| `--_outlined-border-color` | Input | Border color of `.ui-outlined`. Defaults to `--ui-border-color`. |
| `--_padding` | Input | Padding of the header, content and actions. `--ui-card-padding`, or `--ui-space-3` when a theme leaves it unset. |
| `--_shadow` | Output | The current shadow. `.ui-elevated` sets `--_elevated-shadow`, `.ui-tonal` and `.ui-outlined` set `--ui-shadow-surface`. |
| `--_surface-bg-color` | Input | Background of default and `.ui-outlined` cards, and border color of `.ui-tonal` and `.ui-elevated` unless a theme sets `--ui-border-color-raised`. Defaults to `--ui-surface`. |
| `--_tonal-bg-color` | Input | Background of `.ui-tonal`. Defaults to `--ui-surface-tonal`. |

## Installation

### Dependencies

- [Card](https://open-props-ui.netlify.app/html/components/card.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/accordion.css`
- `opui-css/css/components/card.css`

## Used in blocks

- [FAQ](https://open-props-ui.netlify.app/blocks/faq.md)
- [Onboarding checklist](https://open-props-ui.netlify.app/blocks/onboarding-checklist.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
