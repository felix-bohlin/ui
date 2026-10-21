# Toggle

Buttons (disguised as input checkbox/radio) that can be toggled on and off. Use them for options in a toolbar, like bold or text alignment. For a setting that applies right away, use a [Switch](https://open-props-ui.netlify.app/html/components/switch.md), and for choices in a form a [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md). To switch between panels of content, use [Tabs](https://open-props-ui.netlify.app/html/components/tabs.md). For uncontrolled buttons that just run actions, use a [Button group](https://open-props-ui.netlify.app/html/components/button-group.md).

## Anatomy

Day Week Month

- `.ui-toggle-group`

  Container element.

- `.ui-toggle-button`

  A toggle button.

## Toggle button

```html
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-1" value="Toggle me" />
  Toggle me
</label>
<label class="ui-toggle-button">
  <input type="checkbox" name="standalone-demo-2" />
  <svg
    aria-hidden="true"
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
    <path d="M12 21a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z"></path>
    <path d="M12 8v4"></path>
    <path d="M12 16h.01"></path>
  </svg>
  Toggle with icon
</label>
```

## Sizes

Choose between four sizes: `.ui-x-small`, `.ui-small`, default and `.ui-large`. Add the class to a `.ui-toggle-button`, or to a `.ui-toggle-group` to size all its buttons.

```html
<label class="ui-toggle-button ui-x-small">
  <input type="checkbox" />
  x-small
</label>

<label class="ui-toggle-button ui-small">
  <input type="checkbox" />
  small
</label>

<label class="ui-toggle-button">
  <input type="checkbox" />
  default
</label>

<label class="ui-toggle-button ui-large">
  <input type="checkbox" />
  large
</label>

<div role="radiogroup" class="ui-toggle-group ui-small" aria-label="View">
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="week" />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="toggle-sizes" value="month" />
    Month
  </label>
</div>
```

## Toggle group

Group toggle buttons by wrapping them in a `<div role="radiogroup" class="ui-toggle-group">` (or `role="group"` when multi-select).

### Multi-select

Use `type="checkbox"` for multi-select groups.

```html
<div role="group" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-style" value="bold" aria-label="Bold" />
    <strong>B</strong>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      name="text-style"
      value="italic"
      aria-label="Italic"
    />
    <i>I</i>
  </label>
  <label class="ui-toggle-button">
    <input
      type="checkbox"
      name="text-style"
      value="underline"
      aria-label="Underline"
    />
    <u>U</u>
  </label>
</div>
```

### Single-select

Use `type="radio"` for single-select groups. Add `checked` to the input that starts pressed.

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="radio" name="alignment" value="left" aria-label="Align left" />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm0-4h12v-2H3v2zm0-4h18v-2H3v2zm0-4h12v-2H3v2zm0-6v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      checked
      name="alignment"
      value="center"
      aria-label="Align center"
    />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm4-4h10v-2H7v2zm-4-4h18v-2H3v2zm4-4h10v-2H7v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
  <label class="ui-toggle-button">
    <input
      type="radio"
      name="alignment"
      value="right"
      aria-label="Align right"
    />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 21h18v-2H3v2zm6-4h12v-2H9v2zm-6-4h18v-2H3v2zm6-4h12v-2H9v2zM3 3v2h18V3H3z"
      />
    </svg>
  </label>
</div>
```

### Binding

The selection lives in the inputs, which share a `name`. Submit them with a form, where `FormData.get()` reads a radio group and `getAll()` a checkbox group, or read the checked inputs in a script on `change`. Set `input.checked = input.defaultChecked` to go back to the `checked` inputs in the markup.

```html
<div role="radiogroup" class="ui-toggle-group" aria-label="View">
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="week" checked />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="calendar-view" value="month" />
    Month
  </label>
</div>
<div role="group" class="ui-toggle-group" aria-label="Text format">
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="bold" checked />
    Bold
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="italic" />
    Italic
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="text-format" value="underline" />
    Underline
  </label>
</div>
<p class="toggle-binding-text">View: week. Format: bold.</p>
<button type="button" class="ui-button toggle-binding-reset">Reset</button>

<script>
  {
    const text = document.querySelector(".toggle-binding-text")
    const inputs = [
      ...document.querySelectorAll(
        '[name="calendar-view"], [name="text-format"]',
      ),
    ]
    const checked = (name) =>
      inputs
        .filter((input) => input.name === name && input.checked)
        .map((input) => input.value)

    const update = () => {
      if (!text) return
      text.textContent = `View: ${checked("calendar-view")[0]}. Format: ${
        checked("text-format").join(", ") || "none"
      }.`
    }

    inputs.forEach((input) => input.addEventListener("change", update))
    document
      .querySelector(".toggle-binding-reset")
      ?.addEventListener("click", () => {
        inputs.forEach((input) => (input.checked = input.defaultChecked))
        update()
      })
  }
</script>
```

### Text + icon

Put an `svg` before the text. Icon-only buttons need an `aria-label` on the input.

```html
<div role="radiogroup" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="radio" checked name="transport" value="walking" />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M13 6.5A2.25 2.25 0 1 0 13 2a2.25 2.25 0 0 0 0 4.5m-2.639-.081c.185.045.35.146.493.272a3.24 3.24 0 0 0 2.904.72c.186-.044.379-.056.564-.01l.132.033a1.5 1.5 0 0 1 .919.673l1.332 2.177a1 1 0 0 0 .657.46l1.431.285a1.5 1.5 0 0 1-.587 2.942l-2.504-.5a1.5 1.5 0 0 1-.986-.688l-.183-.3a.54.54 0 0 0-.966.09a1.5 1.5 0 0 0 .17 1.389l.994 1.433a1.5 1.5 0 0 1 .265.767l.25 4.25a1.5 1.5 0 0 1-2.995.176l-.2-3.391a1 1 0 0 0-.247-.602l-.851-.968a.88.88 0 0 0-1.477.252L7.39 21.061a1.5 1.5 0 0 1-2.783-1.122l3.076-7.634q.02-.081.052-.162l.565-1.47a.469.469 0 0 0-.865-.362l-1.268 2.806a1.5 1.5 0 0 1-2.735-1.232l1.624-3.61a1.5 1.5 0 0 1 .846-.792l3.075-1.14a1.5 1.5 0 0 1 .883-.049z"
      ></path>
    </svg>
    Walking
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="transport" value="cycling" />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12.75 3a.75.75 0 0 0 0 1.5h1.427l.955 3.5H8.5V5.75A.75.75 0 0 0 7.75 5h-3a.75.75 0 0 0 0 1.5H7v2.188L6.698 10.5a4.25 4.25 0 1 0 4.298 4.065l4.656-4.657l.274 1.003a4.25 4.25 0 1 0 1.447-.394l-1.9-6.964A.75.75 0 0 0 14.75 3zm3.58 9.394l.696 2.553a.75.75 0 1 0 1.448-.394L17.777 12a2.75 2.75 0 1 1-1.447.394m-5.765.48a4.26 4.26 0 0 0-2.387-2.128L8.385 9.5h5.554zm-2.64-.611c.71.336 1.254.968 1.471 1.737h-1.76zm-1.48-.246l-.435 2.61a.75.75 0 0 0 .74.873h2.646a2.751 2.751 0 1 1-2.95-3.483"
      ></path>
    </svg>
    Cycling
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="transport" value="commuting" />
    <svg
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M16.25 3A3.75 3.75 0 0 1 20 6.75v9a3.75 3.75 0 0 1-2.89 3.651l2.462 1.172a.75.75 0 0 1-.55 1.392l-.095-.038L13.83 19.5h-3.661l-5.097 2.427a.75.75 0 1 1-.645-1.354L6.89 19.4A3.75 3.75 0 0 1 4 15.75v-9A3.75 3.75 0 0 1 7.75 3zM8 15a1 1 0 1 0 0 2a1 1 0 0 0 0-2m8 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m.25-10.5h-8.5A2.25 2.25 0 0 0 5.5 6.75v5.75h13V6.75a2.25 2.25 0 0 0-2.25-2.25m-3 1.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1 0-1.5z"
      ></path>
    </svg>
    Commuting
  </label>
</div>
```

### Vertical orientation

Change the layout of the group with the `.ui-vertical` class.

```html
<div role="radiogroup" class="ui-toggle-group ui-vertical">
  <label class="ui-toggle-button">
    <input type="radio" name="view" value="day" />
    Day
  </label>
  <label class="ui-toggle-button">
    <input type="radio" checked name="view" value="week" />
    Week
  </label>
  <label class="ui-toggle-button">
    <input type="radio" name="view" value="month" />
    Month
  </label>
</div>
```

### Overflow

Toggle buttons in a group wrap onto more rows when they don't fit. Add `.ui-scrollable` to keep them on one row and scroll them sideways, or `.ui-shrink` to keep them on one row and truncate their labels. Icon-only items keep their size.

```html
<div role="group" class="ui-toggle-group">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-wrap" value="none" />
    Nothing at all
  </label>
</div>
<div role="group" class="ui-toggle-group ui-scrollable">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scrollable" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scrollable" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-scrollable" value="none" />
    Nothing at all
  </label>
</div>
<div role="group" class="ui-toggle-group ui-shrink">
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="all" />
    Everything
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="mentions" />
    Mentions
  </label>
  <label class="ui-toggle-button">
    <input type="checkbox" name="overflow-shrink" value="none" />
    Nothing at all
  </label>
</div>
```

### Disabled

`disabled` on a toggle button dims it and skips it with Tab and the arrow keys. `aria-disabled="true"` on the `<input>` looks the same, but keeps the toggle button focusable and its value in the form. It doesn't stop the change, so block it with a script.

```html
<label class="ui-toggle-button">
  <input type="checkbox" name="disabled-demo-1" disabled />
  Disabled
</label>
<label class="ui-toggle-button">
  <input type="checkbox" name="disabled-demo-2" aria-disabled="true" />
  Aria-disabled
</label>
```

## API

### Toggle group API

| Type        | Modifiers                               | Default          | Description                                                                                                       |
| ----------- | --------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------- |
| Orientation | default, `.ui-vertical`                 | default          | The orientation of the element.                                                                                   |
| Scroll      | `.ui-scrollable`                        | -                | Keeps the items on one row and scrolls them sideways when they don't fit. By default they wrap onto more rows.    |
| Selection   | `[role="group"]`, `[role="radiogroup"]` | `[role="group"]` | Whether one or several buttons can be selected. `"single"` uses radio inputs.                                     |
| Shrink      | `.ui-shrink`                            | -                | Keeps the items on one row and shrinks them, truncating labels with an ellipsis. Icon-only items keep their size. |
| Sizes       | `.ui-large`, `.ui-small`, `.ui-x-small` | -                | The size of the buttons. Without one they are the default control size.                                           |

#### Parts

| Part                | Description        |
| ------------------- | ------------------ |
| `.ui-toggle-group`  | Container element. |
| `.ui-toggle-button` | A toggle button.   |

#### CSS variables

| Variable                           | Default                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                        | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-border-width`                | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-button-radius`               | Unset                                                                                    | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                                                                                                                                |
| `--ui-button-size`                 | `var(--ui-control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-button-size-large`           | `var(--ui-control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-small`           | `var(--ui-control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-x-small`         | `var(--ui-control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-control-border-color`        | Unset                                                                                    | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset                                                                                    | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.                                            |
| `--ui-disabled-opacity`            | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-duration`                    | `0.2s`                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-ease`                        | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-focus-ring-color`            | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`        | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-inset`            | `calc(-1 * var(--ui-focus-ring-width))`                                                  | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-focus-ring-style`            | `solid`                                                                                  | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-width`            | `2px`                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-font-size-caption`           | `var(--ui-font-size-100)`                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                                                                                                |
| `--ui-font-size-control`           | `var(--ui-font-size-300)`                                                                | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                          |
| `--ui-font-size-small`             | `var(--ui-font-size-200)`                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                                                                                       |
| `--ui-icon-size`                   | `var(--size-4)`                                                                          | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-motion`                      | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                                                                                                      |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                                                                                                                                            |
| `--ui-on-selected`                 | Unset                                                                                    | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                                                                                                            |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-radius`                      | `var(--size-2)`                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                                                              |
| `--ui-selected`                    | Unset                                                                                    | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                                                                                                              |
| `--ui-shadow-control`              | `none`                                                                                   | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-3`                     | `calc(var(--size-3) * var(--ui-space-scale))`                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-hover-alpha`           | `10%`                                                                                    | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-state-hover-alpha-dark`      | `20%`                                                                                    | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-surface-default`             | `light-dark(var(--ui-gray-1), var(--ui-gray-13))`                                        | Page and card background.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-text-disabled`               | `color-mix( in oklch, var(--ui-text-muted) 50%, var(--ui-surface-default) )`             | Text color of disabled buttons and chips.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                                                                                                                                                                        |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### Toggle button API

| Type     | Modifiers                                       | Default                  | Description                                                |
| -------- | ----------------------------------------------- | ------------------------ | ---------------------------------------------------------- |
| Checked  | `input[checked]`                                | -                        | Selects the button.                                        |
| Disabled | `input[disabled]`                               | -                        | Disables the button.                                       |
| Sizes    | `.ui-large`, `.ui-small`, `.ui-x-small`         | -                        | The size of the element.                                   |
| Type     | `input[type="checkbox"]`, `input[type="radio"]` | `input[type="checkbox"]` | The input type. `"radio"` allows one selection in a group. |

#### Parts

| Part                     | Description                                |
| ------------------------ | ------------------------------------------ |
| `label.ui-toggle-button` | Container element.                         |
| `<input>`                | A visually hidden checkbox or radio input. |

#### CSS variables

| Variable                           | Default                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`                | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                        | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `--ui-border-width`                | `1px`                                                                                    | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `--ui-button-radius`               | Unset                                                                                    | Corner radius for `Button`, `ButtonGroup`, `ToggleButton` and `ToggleGroup`. When unset, they follow `--ui-radius`, also where it's set on a part of the page.                                                                                                                                                                                                                                                                                                                |
| `--ui-button-size`                 | `var(--ui-control-size)`                                                                 | Default `Button` height.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-button-size-large`           | `var(--ui-control-size-large)`                                                           | `Button` height with `.ui-large`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-small`           | `var(--ui-control-size-small)`                                                           | `Button` height with `.ui-small`.                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-button-size-x-small`         | `var(--ui-control-size-x-small)`                                                         | `Button` and `ButtonGroup` height with `.ui-x-small`.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-control-border-color`        | Unset                                                                                    | Border color of controls without a fill: `Button` with `.ui-outlined`, the edge and dividers of an outlined `ButtonGroup`, `ToggleButton`, `ToggleGroup`, `Chip` with `.ui-outlined`, the track of `Tabs` with `.ui-outlined`, and the selected `Tabs` pill. When unset, outlined buttons use their color, the selected `Tabs` pill `--ui-field-border-color` and the rest `--ui-border-color`. Themes that outline controls like fields set it to `--ui-field-border-color`. |
| `--ui-control-border-color-filled` | Unset                                                                                    | Border color of controls with a fill: `Button` with `.ui-filled` or `.ui-tonal`, the edge and dividers of a `ButtonGroup` with one of them, a checked `ToggleButton`, `Chip` without `.ui-outlined` and the `Carousel` buttons. When unset, buttons have no visible border, the carousel buttons use a shade of their fill and the rest use `--ui-border-color`. Set it with `--ui-control-border-color` to outline every control.                                            |
| `--ui-disabled-opacity`            | `0.64`                                                                                   | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-duration`                    | `0.2s`                                                                                   | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-ease`                        | `ease`                                                                                   | Default easing for transitions.                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-focus-ring-color`            | `rgb( from var(--ui-surface-default) calc(255 - r) calc(255 - g) calc(255 - b) )`        | Color of the keyboard focus ring. By default the page background color inverted.                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-inset`            | `calc(-1 * var(--ui-focus-ring-width))`                                                  | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                                                                                                             |
| `--ui-focus-ring-style`            | `solid`                                                                                  | Outline style of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-focus-ring-width`            | `2px`                                                                                    | Width of the focus ring.                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `--ui-font-size-caption`           | `var(--ui-font-size-100)`                                                                | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                                                                                                                |
| `--ui-font-size-control`           | `var(--ui-font-size-300)`                                                                | Font size of the default `Button`, `Select`, `Tabs`, `TextField`, `Textarea` and `ToggleButton`. Small and x-small sizes read `--ui-font-size-small` and `--ui-font-size-caption`. Defaults to `--ui-font-size-300`.                                                                                                                                                                                                                                                          |
| `--ui-font-size-small`             | `var(--ui-font-size-200)`                                                                | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                                                                                                       |
| `--ui-icon-size`                   | `var(--size-4)`                                                                          | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `--ui-motion`                      | `1`                                                                                      | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                                                                                                      |
| `--ui-on-primary`                  | `oklch( from var(--ui-primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--ui-primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--ui-primary` gets readable text.                                                                                                                                                                                                                                                            |
| `--ui-on-selected`                 | Unset                                                                                    | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                                                                                                            |
| `--ui-primary`                     | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                       | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `--ui-radius`                      | `var(--size-2)`                                                                          | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                                                                                                              |
| `--ui-selected`                    | Unset                                                                                    | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                                                                                                              |
| `--ui-shadow-control`              | `none`                                                                                   | Shadow of buttons with a variant and of fields. `none` by default, for themes that lift controls off the page.                                                                                                                                                                                                                                                                                                                                                                |
| `--ui-space-2`                     | `calc(var(--size-2) * var(--ui-space-scale))`                                            | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-space-3`                     | `calc(var(--size-3) * var(--ui-space-scale))`                                            | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-state-hover-alpha`           | `10%`                                                                                    | Alpha of the hover state layer on neutral buttons in light mode.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `--ui-state-hover-alpha-dark`      | `20%`                                                                                    | Alpha of the hover state layer on neutral buttons in dark mode.                                                                                                                                                                                                                                                                                                                                                                                                               |
| `--ui-text-disabled`               | `color-mix( in oklch, var(--ui-text-muted) 50%, var(--ui-surface-default) )`             | Text color of disabled buttons and chips.                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-text-strong`                 | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                        | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                                                                                                                                                                        |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### toggle-button.css

| Property               | Kind   | Description                                                                                              |
| ---------------------- | ------ | -------------------------------------------------------------------------------------------------------- |
| `--_bg-color`          | Output | The current background. Set by the hover and selected states.                                            |
| `--_duration`          | Output | Duration of the focus ring animation, `--ui-duration` times `--_motion`.                                 |
| `--_ease`              | Input  | Easing of the focus ring animation. Defaults to `--ui-ease`.                                             |
| `--_font-size`         | Input  | The font size. Defaults to `--ui-font-size-control`. Set by the size classes on the button or its group. |
| `--_icon-size`         | Input  | Size of a direct child `svg`. Defaults to `--ui-icon-size`.                                              |
| `--_min-height`        | Input  | Height and minimum width. Set by the size classes on the button or its group.                            |
| `--_motion`            | Input  | Motion multiplier for the focus ring animation. `0` turns it off.                                        |
| `--_selected-bg-color` | Input  | Background of the checked button. `--ui-selected` when the theme sets it, otherwise `--ui-primary`.      |

### toggle-group.css

| Property           | Kind  | Description                                                                                                                                                         |
| ------------------ | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`      | Input | Background of the group. Defaults to `--ui-surface-default`.                                                                                                        |
| `--_border-color`  | Input | Color of the outline around the group and the lines between buttons. Defaults to `--ui-control-border-color`, or `--ui-border-color` when the theme doesn't set it. |
| `--_border-radius` | Input | Corner radius of the group. Defaults to `--ui-button-radius`, capped at half a button height so a round radius doesn't clip the end items.                          |

## Under the hood

1. Label

   - A `<label>` wrapping a checkbox: click, keyboard and form value for free
   - The checkbox holds the state, no `aria-pressed` to keep in sync

2. Pressed

   - `:has(input:checked)`: the label styles itself from the checkbox state
   - A checked toggle is filled, so it reads as on without relying on a faint tint
   - `light-dark()` picks the hover tint per color scheme

3. Hide input

   - Visually hidden, still focusable and announced
   - `:has(input:focus-visible)` draws an inset focus ring on the label
   - `Tab` to a toggle and press `Space`

4. Group

   - Radios with a shared `name`: single select, no JavaScript
   - Checkboxes for multi-select, with `role="group"`
   - Each toggle draws a divider on its start and top edge, the group clips the outer ones

Step 1 of 4: Label

```html
<label class="toggle">
  <input type="checkbox" />
  Bold
</label>
```

```css
.toggle {
  align-items: center;
  block-size: var(--ui-button-size);
  border: 1px solid var(--ui-border-color);
  border-radius: var(--ui-button-radius, var(--ui-radius));
  color: var(--ui-text-strong);
  cursor: pointer;
  display: inline-flex;
  gap: var(--ui-space-2);
  justify-content: center;
  min-inline-size: var(--ui-button-size);
  padding: 0 var(--ui-space-2);
  position: relative;
  user-select: none;
}
```

Step 2 of 4: Pressed

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [`light-dark()` ](https://webstatus.dev/features/light-dark)(Newly available): Chrome 123+, Edge 123+, Firefox 120+, Safari 17.5+

```css
.toggle {
  --bg: transparent;
  background-color: var(--bg);
}

.toggle:hover {
  --bg: light-dark(
    oklch(0% 0 0 / var(--ui-state-hover-alpha)),
    oklch(100% 0 0 / var(--ui-state-hover-alpha-dark))
  );
}

.toggle:has(input:checked) {
  --bg: var(--ui-selected, var(--ui-primary));
  color: var(--ui-on-selected, var(--ui-on-primary));
}
```

Step 3 of 4: Hide input

- [`:focus-visible` ](https://webstatus.dev/features/focus-visible)(Widely available): Chrome 86+, Edge 86+, Firefox 85+, Safari 15.4+

```css
.toggle input {
  block-size: 1px;
  clip-path: inset(50%);
  inline-size: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
}

.toggle:has(input:focus-visible) {
  outline: var(--ui-focus-ring-width) var(--ui-focus-ring-style)
    var(--ui-focus-ring-color);
  outline-offset: var(--ui-focus-ring-inset);
}
```

Step 4 of 4: Group

```html
<div class="toggle-group" role="radiogroup">
  <label class="toggle">
    <input type="radio" name="view" checked />
    Day
  </label>
  …
</div>
```

```css
.toggle-group {
  background-color: var(--ui-surface-default);
  border-radius: var(--ui-button-radius, var(--ui-radius));
  display: inline-flex;
  flex-wrap: wrap;
  outline: 1px solid var(--ui-border-color);
  outline-offset: -1px;
  overflow: hidden;
}

.toggle-group .toggle {
  border: 0;
  border-radius: 0;
  box-shadow:
    -1px 0 0 0 var(--ui-border-color),
    0 -1px 0 0 var(--ui-border-color);
  flex: auto;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v128.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Toggle.md).

## Installation

- `opui-css/css/components/toggle-group.css`
- `opui-css/css/components/toggle-button.css`

## Changelog

### What's new

- A standalone toggle takes `--ui-shadow-control` like buttons, and corners are capped at half the height so a round radius doesn't clip groups.
- A checked `ToggleButton` is filled with `--ui-primary` in every contrast mode, not only a tint.
- A checked `ToggleButton` reads [`--ui-selected`](#api) and `--ui-on-selected` when a theme sets them.
- A checked `ToggleButton` reads `--ui-control-border-color-filled` for its border, like filled buttons.
- `ToggleButton` and `ToggleGroup` read [`--ui-control-border-color`](#api) for their border, like outlined buttons.
- [Large](#sizes) size with `.ui-large`.
- [Small and x-small](#sizes) toggles use smaller text, like `Button`.
- [Groups wrap](#overflow) when they don't fit, or scrolls with `.ui-scrollable` or truncates with `.ui-shrink`.
- Breaking: no `.ui-disabled`. A [toggle](#toggle-button) looks disabled when its input is `disabled`.
- Breaking: `ToggleButton` `--_button-bg-color` is `--_bg-color`, `--_size` is `--_min-height` and `--_svg-size` is `--_icon-size`, which sizes direct child `svg`s like Button ([Under the hood](#under-the-hood)).
- A disabled [toggle](#disabled) dims like a disabled button, and hover uses the button hover strength.
- A [toggle button](#toggle-button) grows with its content from `--ui-button-size` instead of having a fixed height.
- `--_duration` and `--_ease` set the focus ring animation's duration and easing ([Under the hood](#under-the-hood)).
- Corners follow `--ui-radius` through [`--ui-button-radius`](#api), so one token squares or rounds every component.
- The default size reads [`--ui-font-size-control`](#sizes) for its font size, like buttons.
