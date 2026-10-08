# Stepper

Shows where someone is in a flow of steps, such as a checkout or an onboarding. The current step marks every step before it as complete. See also: [Progress](https://open-props-ui.netlify.app/html/components/progress.md).

## Anatomy

1. [Account](#basics) Name and email
2. Plan Free or Pro
3. Payment Card or invoice

- `ol.ui-stepper`

  The list of steps.

- `<li>`

  A step. Its text is the label. Steps before the current one are complete.

- `li::before`

  The marker: the step number, or a check on a completed step. The check is `--_check-icon`, sized with `--_check-size`.

- `<span class="ui-check">`

  An optional custom check, shown on completed steps in place of the default. Hidden from screen readers.

- `<a>`

  A link back to a completed step.

- `<span class="ui-description">`

  An optional line under the label.

- `li::after`

  The line to the next step.

## Basics

Put `aria-current="step"` on the current `li`. Every step before it is complete, so moving that one attribute updates the whole stepper. Link the completed steps so people can go back.

```html
<ol class="ui-stepper" aria-label="Checkout steps">
  <li><a href="#cart">Cart</a></li>
  <li><a href="#shipping">Shipping</a></li>
  <li aria-current="step">Payment</li>
  <li>Review</li>
</ol>
```

## Complete

Add `.ui-complete` and leave out `aria-current` to mark every step complete.

```html
<ol class="ui-stepper ui-complete" aria-label="Checkout steps">
  <li><a href="#cart">Cart</a></li>
  <li><a href="#shipping">Shipping</a></li>
  <li><a href="#payment">Payment</a></li>
  <li><a href="#review">Review</a></li>
</ol>
```

## Sizes

Use `.ui-small` for a smaller stepper.

```html
<ol class="ui-stepper ui-small" aria-label="Checkout steps">
  <li><a href="#cart">Cart</a></li>
  <li><a href="#shipping">Shipping</a></li>
  <li aria-current="step">Payment</li>
  <li>Review</li>
</ol>
```

## Descriptions

Add a `<span class="ui-description">` after the label for a short line under it.

```html
<ol class="ui-stepper" aria-label="Sign-up steps">
  <li>Account <span class="ui-description">Name and email</span></li>
  <li aria-current="step">
    Plan <span class="ui-description">Free or Pro</span>
  </li>
  <li>Payment <span class="ui-description">Card or invoice</span></li>
  <li>Done <span class="ui-description">Start building</span></li>
</ol>
```

## Custom checkmark

The default check is cut out of the marker, so it follows the theme. Swap it for any SVG with `--_check-icon`, and resize it with `--_check-size`.

```html
<ol class="ui-stepper stepper-star" aria-label="Checkout steps">
  <li><a href="#cart">Cart</a></li>
  <li><a href="#shipping">Shipping</a></li>
  <li aria-current="step">Payment</li>
  <li>Review</li>
</ol>

<style>
  .stepper-star {
    --_check-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 1.5l3.1 6.6 7.2.9-5.3 5 1.4 7.1L12 17.6l-6.4 3.5L7 14l-5.3-5 7.2-.9z'/%3E%3C/svg%3E");
  }
</style>
```

To use markup, such as an icon from your library, an `img` or an emoji, put it in a `<span class="ui-check" aria-hidden="true">` first in each `li`. It shows on completed steps in place of the default check, in the marker's text color.

```html
<ol class="ui-stepper" aria-label="Checkout steps">
  <li>
    <span class="ui-check" aria-hidden="true"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></span
    ><a href="#cart">Cart</a>
  </li>
  <li>
    <span class="ui-check" aria-hidden="true"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></span
    ><a href="#shipping">Shipping</a>
  </li>
  <li aria-current="step">
    <span class="ui-check" aria-hidden="true"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></span
    >Payment
  </li>
  <li>
    <span class="ui-check" aria-hidden="true"
      ><svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M18 6 7 17l-5-5" />
        <path d="m22 10-7.5 7.5L13 16" /></svg></span
    >Review
  </li>
</ol>
```

## Vertical

`.ui-vertical` stacks the steps. Use it for long labels or many steps.

```html
<ol class="ui-stepper ui-vertical" aria-label="Onboarding steps">
  <li>Create your workspace</li>
  <li>Invite your team</li>
  <li aria-current="step">Connect a calendar</li>
  <li>Import your projects</li>
  <li>Set up billing</li>
</ol>
```

## Narrow containers

A stepper narrower than `32rem` turns vertical on its own. Drag the corner of the box to try it. The stepper measures its own width, so in a flex row give it one, for example with `flex: 1`.

Browsers without container queries keep it horizontal, and the steps wrap.

```html
<div class="stepper-resize">
  <ol class="ui-stepper" aria-label="Checkout steps">
    <li><a href="#cart">Cart</a></li>
    <li><a href="#shipping">Shipping</a></li>
    <li aria-current="step">Payment</li>
    <li>Review</li>
  </ol>
</div>

<style>
  .stepper-resize {
    border: var(--border-width) dashed var(--border-color);
    border-radius: var(--border-radius);
    max-inline-size: 36rem;
    min-inline-size: 12rem;
    overflow: hidden;
    padding: var(--size-3);
    resize: horizontal;
  }
</style>
```

## Completed label

Screen readers announce a completed step as "Completed: Cart". Translate it with `--_completed-label`, for example for a whole language with `:lang()`. The stepper follows the text direction.

```html
<ol class="ui-stepper" aria-label="خطوات الدفع" dir="rtl" lang="ar">
  <li>السلة</li>
  <li aria-current="step">الشحن</li>
  <li>الدفع</li>
</ol>

<style>
  .ui-stepper:lang(ar) {
    --_completed-label: "مكتمل: ";
  }
</style>
```

## Accessibility

The stepper is an ordered list, so screen readers announce the number of steps and the position of each one. The numbers in the markers are hidden from them, so they aren't read twice.

Give it a name with `aria-label`.

`aria-current="step"` is announced as the current step. The completed steps get "Completed: " from the marker's alternative text ([Completed label](#completed-label)). Browsers without alternative text for generated content read the numbers and "check mark" instead.

A custom check is hidden from screen readers with `aria-hidden="true"`, so the announcement stays the same.

In forced colors mode, completed markers are filled with `CanvasText`, the current marker gets a `Highlight` border, and the lines to later steps are `GrayText`.

## API

### Stepper API

| Type            | Modifiers                 | Default      | Description                                                                   |
| --------------- | ------------------------- | ------------ | ----------------------------------------------------------------------------- |
| Complete        | `.ui-complete`            | -            | Marks every step complete. Leave out `aria-current`.                          |
| Completed label | `--_completed-label`      | `Completed:` | What screen readers announce before a completed step.                         |
| Current step    | `li[aria-current="step"]` | -            | Index of the current step, from 0. Every step before it is complete.          |
| Label           | `[aria-label]`            | -            | Accessible name of the stepper.                                               |
| Orientation     | `.ui-vertical`            | -            | The orientation of the element. Narrow containers turn vertical on their own. |
| Sizes           | `.ui-small`               | -            | The size of the element.                                                      |

#### Parts

| Part                            | Description                                                                                                            |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `ol.ui-stepper`                 | The list of steps.                                                                                                     |
| `<li>`                          | A step. Its text is the label. Steps before the current one are complete.                                              |
| `li::before`                    | The marker: the step number, or a check on a completed step. The check is `--_check-icon`, sized with `--_check-size`. |
| `<span class="ui-check">`       | An optional custom check, shown on completed steps in place of the default. Hidden from screen readers.                |
| `<a>`                           | A link back to a completed step.                                                                                       |
| `<span class="ui-description">` | An optional line under the label.                                                                                      |
| `li::after`                     | The line to the next step.                                                                                             |

#### CSS variables

| Variable                 | Default                                                                               | Description                                                                                                                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`         | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--duration`             | `0.2s`                                                                                | Default transition duration. Multiplied by `--motion`.                                                                                                                                                       |
| `--ease`                 | `ease`                                                                                | Default easing for transitions.                                                                                                                                                                              |
| `--font-size-05`         | `0.875rem`                                                                            | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                                                                                                        |
| `--font-weight-normal`   | `var(--font-weight-4)`                                                                | Font weight for `List` text and `Button` keyboard shortcuts.                                                                                                                                                 |
| `--font-weight-semibold` | `var(--font-weight-6)`                                                                | Font weight for labels, table headers and titles.                                                                                                                                                            |
| `--motion`               | `1`                                                                                   | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).     |
| `--primary`              | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`     | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--text-muted`           | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |
| `--text-primary`         | `light-dark(var(--gray-15), var(--gray-1))`                                           | Emphasized text color for headings, labels and values.                                                                                                                                                       |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

The root is an `ol` with an `aria-label`. `aria-current="step"` on an `li` makes it the current step and every step before it complete.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Stepper.md).

## Installation

- `opui-css/css/components/stepper.css`

## Changelog

### What's new

- New component. A [stepper](#basics) where the current step marks every step before it as complete, with a [custom checkmark](#custom-checkmark).
