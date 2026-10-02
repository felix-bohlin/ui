# Button group

Groups related buttons.

### What's new

- [Split button](#split-button) with a `Menu`.
- Icon-only buttons stay square.
- [X-small](#sizes) size with `size="x-small"`.
- [Small](#sizes) groups use the same text size as a small `Button`.
- [Wraps](#overflow) when it doesn't fit, or scrolls with `scrollable` or truncates with `shrink`.

## Anatomy

- `<ButtonGroup>`

  Container element.

- `slot="default"`

  The buttons.

* Button groups should consist of 2-5 buttons.
* Don't allow them to wrap onto a new line.
* If an icon is used without label text make sure the button communicates clearly what it does.

Button group or Toggle group?

If your buttons depend on state (controlled) - use [Toggle group](https://open-props-ui.netlify.app/astro/components/toggle.md).

If you just need to group a bunch of "dumb" (uncontrolled) buttons - use Button group.

## Variants

Change the appearance of the entire group with the `variant` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup>
  <Button>Text</Button>
  <Button>Text</Button>
  <Button>Text</Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>Outlined</Button>
  <Button>Outlined</Button>
  <Button>Outlined</Button>
</ButtonGroup>


<ButtonGroup variant="tonal">
  <Button>Tonal</Button>
  <Button>Tonal</Button>
  <Button>Tonal</Button>
</ButtonGroup>


<ButtonGroup variant="filled">
  <Button>Filled</Button>
  <Button>Filled</Button>
  <Button>Filled</Button>
</ButtonGroup>
```

## Colors

Set the `color` prop to `primary` or `critical` to recolor the entire group. The default is a neutral gray.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup color="primary" variant="filled">
  <Button>Primary</Button>
  <Button>Primary</Button>
  <Button>Primary</Button>
</ButtonGroup>


<ButtonGroup color="critical" variant="filled">
  <Button>Critical</Button>
  <Button>Critical</Button>
  <Button>Critical</Button>
</ButtonGroup>
```

## Icons

Yes of course, they're just [buttons.](https://open-props-ui.netlify.app/astro/components/button.md) Wrap labels in a `<span>` so buttons with an icon keep their padding.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"


const checkIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M29.907 5.14a1.25 1.25 0 0 1-.047 1.767l-19 18a1.25 1.25 0 0 1-1.775-.055l-6.75-7.25a1.25 1.25 0 0 1 1.83-1.704l5.89 6.327L28.14 5.093a1.25 1.25 0 0 1 1.767.047"></path></svg>`
const helpIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M11.499 10.803A4.505 4.505 0 0 1 16 6.5a4.5 4.5 0 0 1 4.5 4.5c0 1.276-.298 2.02-.676 2.565c-.368.53-.836.925-1.471 1.459l-.286.241c-.745.632-1.614 1.42-2.268 2.628c-.659 1.217-1.049 2.76-1.049 4.857a1.25 1.25 0 0 0 2.5 0c0-1.778.328-2.892.748-3.667c.424-.783.993-1.324 1.685-1.91l.259-.217c.616-.515 1.363-1.139 1.937-1.966C22.579 13.98 23 12.724 23 11a7 7 0 0 0-7-7a7.005 7.005 0 0 0-6.999 6.695a1.25 1.25 0 1 0 2.498.108M16 29a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3"></path></svg>`
const closeIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M26.29 4.293a1 1 0 1 1 1.414 1.414L17.413 16l10.291 10.29a1 1 0 1 1-1.414 1.414L16 17.413L5.707 27.704a1 1 0 0 1-1.414-1.414L14.585 16L4.293 5.707a1 1 0 0 1 1.414-1.414L16 14.584z"></path></svg>`
---


<ButtonGroup variant="outlined">
  <Button aria-label="Label">
    <Fragment set:html={checkIcon} />
  </Button>
  <Button aria-label="Label"> Maybe </Button>
  <Button aria-label="Label">
    <Fragment set:html={closeIcon} />
  </Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>
    <Fragment set:html={checkIcon} />
    <span>OK</span>
  </Button>
  <Button>
    <Fragment set:html={helpIcon} />
    <span>Maybe</span>
  </Button>
  <Button>
    <Fragment set:html={closeIcon} />
    <span>No</span>
  </Button>
</ButtonGroup>
```

## Split button

A [Menu](https://open-props-ui.netlify.app/astro/components/menu.md) after the last button. `align="end"` lines it up with the group.

```astro
---
import { Button, ButtonGroup, Menu } from "opui-css/astro"


const chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="currentColor" d="M5.293 11.293a1 1 0 0 1 1.414 0L16 20.586l9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-10-10a1 1 0 0 1 0-1.414"></path></svg>`
---


<ButtonGroup variant="outlined">
  <Button>Save</Button>
  <Button
    aria-label="More save options"
    commandfor="split-button-menu"
    command="toggle-popover"
  >
    <Fragment set:html={chevronIcon} />
  </Button>
  <Menu
    id="split-button-menu"
    align="end"
    items={[{ label: "Save as draft" }, { label: "Save and publish" }]}
  />
</ButtonGroup>
```

## Sizes

Adjust the size of all buttons in the group using the `size` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup size="x-small" variant="outlined">
  <Button>X-small</Button>
  <Button>X-small</Button>
  <Button>X-small</Button>
</ButtonGroup>


<ButtonGroup size="small" variant="outlined">
  <Button>Small</Button>
  <Button>Small</Button>
  <Button>Small</Button>
</ButtonGroup>


<ButtonGroup variant="outlined">
  <Button>Default</Button>
  <Button>Default</Button>
  <Button>Default</Button>
</ButtonGroup>


<ButtonGroup size="large" variant="outlined">
  <Button>Large</Button>
  <Button>Large</Button>
  <Button>Large</Button>
</ButtonGroup>
```

## Vertical orientation

Change the layout of the group with the `orientation="vertical"` prop.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"


const plusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
const minusIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>`
---


<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="outlined">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="tonal">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="filled">
    <Button aria-label="Up">
      <Fragment set:html={plusIcon} />
    </Button>
    <Button aria-label="Decrease">
      <Fragment set:html={minusIcon} />
    </Button>
  </ButtonGroup>
</div>


<div class="example-row">
  <ButtonGroup orientation="vertical">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="outlined">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="tonal">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>


  <ButtonGroup orientation="vertical" variant="filled">
    <Button>Up</Button>
    <Button>Down</Button>
  </ButtonGroup>
</div>
```

## Overflow

Buttons wrap onto more rows when they don't fit. Use `scrollable` to keep them on one row and scroll them sideways, or `shrink` to keep them on one row and truncate their labels. Icon-only items keep their size.

```astro
---
import { Button, ButtonGroup } from "opui-css/astro"
---


<div style="display: grid; gap: var(--size-3); max-inline-size: 18rem">
  <ButtonGroup variant="outlined">
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup variant="outlined" scrollable>
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
  <ButtonGroup variant="outlined" shrink>
    <Button>Archive</Button>
    <Button>Move to folder</Button>
    <Button>Mark as unread</Button>
    <Button>Delete</Button>
  </ButtonGroup>
</div>
```

## Disabled

Disable individual buttons within a group by setting the `disabled` prop on each `Button`.

```astro
---
import { ButtonGroup } from "opui-css/astro"
import { Button } from "opui-css/astro"
---


<ButtonGroup variant="filled">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>


<ButtonGroup variant="filled" color="primary">
  <Button>Enabled</Button>
  <Button disabled>Disabled</Button>
  <Button>Enabled</Button>
</ButtonGroup>
```

## API

### Button group

| Prop          | Type                                | Default | Description                                                                                                       |
| ------------- | ----------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------- |
| `color`       | `"critical"`, `"primary"`           | -       | Optional colors for the buttons.                                                                                  |
| `orientation` | `"vertical"`                        | -       | The orientation of the element.                                                                                   |
| `scrollable`  | `boolean`                           | `false` | Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.    |
| `shrink`      | `boolean`                           | `false` | Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size. |
| `size`        | `"x-small"`, `"small"`, `"large"`   | -       | The size of the buttons.                                                                                          |
| `variant`     | `"outlined"`, `"tonal"`, `"filled"` | -       | The variant of the buttons.                                                                                       |

#### Slots

| Slot      | Description  |
| --------- | ------------ |
| `default` | The buttons. |

#### CSS variables

| Variable                      | Default                                                                | Description                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--border-width`              | `1px`                                                                  | Default border width for components that draw a border.                                                                    |
| `--button-border-radius`      | `var(--size-2)`                                                        | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                                               |
| `--button-size`               | `var(--control-size)`                                                  | Default `Button` height.                                                                                                   |
| `--button-size-large`         | `var(--control-size-large)`                                            | `Button` height with `.ui-large`.                                                                                          |
| `--button-size-small`         | `var(--control-size-small)`                                            | `Button` height with `.ui-small`.                                                                                          |
| `--button-size-x-small`       | `var(--control-size-x-small)`                                          | `Button` and `IconButton` height with `.ui-x-small`.                                                                       |
| `--critical`                  | `var(--red)`                                                           | Severity color for errors and destructive actions.                                                                         |
| `--disabled-opacity`          | `0.64`                                                                 | Opacity applied to disabled controls.                                                                                      |
| `--duration`                  | `0.2s`                                                                 | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--duration-fast`             | `0.1s`                                                                 | Transition duration for hover and press feedback.                                                                          |
| `--ease`                      | `ease`                                                                 | Default easing for transitions.                                                                                            |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`                                   | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.          |
| `--font-size-05`              | `0.875rem`                                                             | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-bold`          | `var(--font-weight-7)`                                                 | Font weight for headings, buttons and terms.                                                                               |
| `--motion`                    | `1`                                                                    | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                           | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`          | `light-dark(var(--gray-1), var(--gray-15))`                            | Text color on a `--primary` background.                                                                                    |
| `--state-active-alpha`        | `20%`                                                                  | Alpha of the pressed state layer on neutral buttons in light mode.                                                         |
| `--state-active-alpha-accent` | `25%`                                                                  | Alpha of the pressed state layer on primary and critical buttons.                                                          |
| `--state-active-alpha-dark`   | `30%`                                                                  | Alpha of the pressed state layer on neutral buttons in dark mode.                                                          |
| `--state-hover-alpha`         | `10%`                                                                  | Alpha of the hover state layer on neutral buttons in light mode.                                                           |
| `--state-hover-alpha-accent`  | `15%`                                                                  | Alpha of the hover state layer on primary and critical buttons.                                                            |
| `--state-hover-alpha-dark`    | `20%`                                                                  | Alpha of the hover state layer on neutral buttons in dark mode.                                                            |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`                            | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`                            | Background of tonal variants.                                                                                              |
| `--text-disabled`             | `color-mix( in oklch, var(--text-muted) 50%, var(--surface-default) )` | Text color of disabled buttons and chips.                                                                                  |
| `--text-muted-contrast`       | `light-dark(var(--gray-4), var(--gray-13))`                            | Muted text color on an inverted surface.                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

### Button

| Prop       | Type                                | Default | Description                                                                 |
| ---------- | ----------------------------------- | ------- | --------------------------------------------------------------------------- |
| `as`       | `"button"`, `"a"`                   | -       | The element to render. Defaults to `"a"` with `href`, otherwise `"button"`. |
| `color`    | `"critical"`, `"primary"`           | -       | Optional colors.                                                            |
| `disabled` | `boolean`                           | `false` | Disables the button.                                                        |
| `href`     | `string`                            | -       | The link to use. Renders an `<a>`.                                          |
| `label`    | `string`                            | -       | The accessible name. Use it on icon-only buttons.                           |
| `ripple`   | `boolean`                           | `false` | A halo behind the button on hover instead of a background change.           |
| `rounded`  | `boolean`                           | `false` | Fully rounded corners, a circle when icon-only.                             |
| `size`     | `"x-small"`, `"small"`, `"large"`   | -       | The size of the element.                                                    |
| `variant`  | `"outlined"`, `"tonal"`, `"filled"` | -       | The variant to use.                                                         |

#### Slots

| Slot      | Description                     |
| --------- | ------------------------------- |
| `default` | The label and an optional icon. |

#### CSS variables

| Variable                      | Default                                                                | Description                                                                                                                |
| ----------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `--button-border-radius`      | `var(--size-2)`                                                        | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`.                                               |
| `--button-size`               | `var(--control-size)`                                                  | Default `Button` height.                                                                                                   |
| `--button-size-large`         | `var(--control-size-large)`                                            | `Button` height with `.ui-large`.                                                                                          |
| `--button-size-small`         | `var(--control-size-small)`                                            | `Button` height with `.ui-small`.                                                                                          |
| `--button-size-x-small`       | `var(--control-size-x-small)`                                          | `Button` and `IconButton` height with `.ui-x-small`.                                                                       |
| `--critical`                  | `var(--red)`                                                           | Severity color for errors and destructive actions.                                                                         |
| `--disabled-opacity`          | `0.64`                                                                 | Opacity applied to disabled controls.                                                                                      |
| `--duration`                  | `0.2s`                                                                 | Default transition duration. Multiplied by `--motion`.                                                                     |
| `--duration-fast`             | `0.1s`                                                                 | Transition duration for hover and press feedback.                                                                          |
| `--ease`                      | `ease`                                                                 | Default easing for transitions.                                                                                            |
| `--font-size-05`              | `0.875rem`                                                             | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.                      |
| `--font-weight-bold`          | `var(--font-weight-7)`                                                 | Font weight for headings, buttons and terms.                                                                               |
| `--motion`                    | `1`                                                                    | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                           | Brand color for primary actions and accents.                                                                               |
| `--primary-contrast`          | `light-dark(var(--gray-1), var(--gray-15))`                            | Text color on a `--primary` background.                                                                                    |
| `--state-active-alpha`        | `20%`                                                                  | Alpha of the pressed state layer on neutral buttons in light mode.                                                         |
| `--state-active-alpha-accent` | `25%`                                                                  | Alpha of the pressed state layer on primary and critical buttons.                                                          |
| `--state-active-alpha-dark`   | `30%`                                                                  | Alpha of the pressed state layer on neutral buttons in dark mode.                                                          |
| `--state-hover-alpha`         | `10%`                                                                  | Alpha of the hover state layer on neutral buttons in light mode.                                                           |
| `--state-hover-alpha-accent`  | `15%`                                                                  | Alpha of the hover state layer on primary and critical buttons.                                                            |
| `--state-hover-alpha-dark`    | `20%`                                                                  | Alpha of the hover state layer on neutral buttons in dark mode.                                                            |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`                            | Background of filled areas such as progress tracks and table stripes.                                                      |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`                            | Background of tonal variants.                                                                                              |
| `--text-disabled`             | `color-mix( in oklch, var(--text-muted) 50%, var(--surface-default) )` | Text color of disabled buttons and chips.                                                                                  |
| `--text-muted-contrast`       | `light-dark(var(--gray-4), var(--gray-13))`                            | Muted text color on an inverted surface.                                                                                   |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/astro/guide/theme-tokens.md) for the full list.

## Under the hood

1. Join

   - Buttons drop their own radius, `overflow: hidden` on the group rounds the outer corners
   - `flex: auto` stretches the buttons to fill a wrapped row
   - `role="group"` tells assistive tech the buttons belong together

2. Dividers

   - Each button draws a line along its start and top edge
   - The group clips the lines on the outer edges, so only the gaps between buttons show one
   - Drag **Width**: wrapped rows get a divider on top for free
   - Relative color: one shade darker in light mode, lighter in dark

3. Outline

   - `outline` takes no space and `overflow` can't clip it
   - `outline-offset: -1px` pulls it in on top of the buttons' outer edge
   - The dividers switch to the same color, nothing else changes

Step 1 of 3: Join

```html
<div class="group" role="group">
  <button>Day</button>
  <button>Week</button>
  …
</div>
```

```css
.group {
  border-radius: var(--radius-2);
  display: inline-flex;
  flex-wrap: wrap;
  inline-size: fit-content;
  max-inline-size: 100%;
  overflow: hidden;
}


.group > button {
  border-radius: 0;
  flex: auto;
}
```

Step 2 of 3: Dividers

- [`light-dark()`](https://webstatus.dev/features/light-dark) (Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+
- [Relative colors](https://webstatus.dev/features/relative-color) (Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.group > button {
  --divider: light-dark(
    oklch(from var(--surface-tonal) calc(l - 0.1) c h),
    oklch(from var(--surface-tonal) calc(l + 0.1) c h)
  );
  box-shadow:
    -1px 0 0 0 var(--divider),
    0 -1px 0 0 var(--divider);
}
```

Step 3 of 3: Outline

```html
<div class="group outlined" role="group">…</div>
```

```css
.group.outlined {
  outline: 1px solid var(--border-color);
  outline-offset: -1px;
}


.group.outlined > button {
  --divider: var(--border-color);
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/astro/guide/browser-support/?components=Button+Group.md).

## Installation

- `opui-css/css/components/button-group.css`

