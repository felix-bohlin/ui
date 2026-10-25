# List

## Anatomy

- [Headline](#clickable-list-item)

  [Supporting text](#clickable-list-item)

  [100+](#clickable-list-item)

* `<li>`

  The list item.

* `<a>, <button>, <label>`

  The clickable row, rendered by `as`, `href` or `type`.

* `.ui-start`

  Optional content at the start, such as an icon or avatar.

* `.ui-text`

  The text content.

* `<p>`

  The label, the first paragraph.

* `<p>`

  Supporting text, the second paragraph.

* `.ui-end`

  Optional content at the end, such as a value or an action.

## Basics

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Trailing supporting text</p>
    </div>
    <div class="ui-end">100+</div>
  </li>
</ul>
```

## Configurations

A List item is split up in three parts:

- [`.ui-text`](#text): main content
- [`.ui-start`](#start-items) (optional): items before the main content
- [`.ui-end`](#end-items) (optional): items after the main content

### With great power...

The List component is *extremely* flexible and versatile. Be careful if you start creating new configurations on your own. Maybe an existing one can solve your problem, but in another way?

## Variants

Use `.ui-tonal` or `.ui-transparent` to change the background color.

### Filled by default

Without a variant the list uses the filled surface, because lists usually sit in popovers and selects that need to contrast against the page. Pick `tonal`, or `transparent` to show the surface behind the list.

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Filled (default)</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Second item</p>
    </div>
  </li>
</ul>

<ul class="ui-list ui-tonal">
  <li>
    <div class="ui-text">
      <p>Tonal</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Second item</p>
    </div>
  </li>
</ul>

<ul class="ui-list ui-transparent">
  <li>
    <div class="ui-text">
      <p>Transparent</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Second item</p>
    </div>
  </li>
</ul>
```

## Clickable list item

Wrap the elements of your List item with an `a`, `button` or `label` depending on use-case.

Give a `<button>` `type="button"` so the item doesn't submit a surrounding form, and `disabled` to disable it.

```html
<ul class="ui-list">
  <li>
    <button type="button">
      <div class="ui-text">
        <p>Button list item</p>
      </div>
    </button>
  </li>
  <li>
    <button type="button" disabled>
      <div class="ui-text">
        <p>Archived</p>
      </div>
    </button>
  </li>
  <li>
    <a href="#clickable-list-item">
      <div class="ui-text">
        <p>Link list item</p>
      </div>
    </a>
  </li>
  <li>
    <label class="ui-checkbox">
      <div class="ui-text">
        <p>Checkbox list item</p>
      </div>
      <div class="ui-end">
        <input type="checkbox" />
      </div>
    </label>
  </li>
</ul>
```

### Selected item

Add `aria-current="page"` to the link inside the `li`.

```html
<ul class="ui-list">
  <li>
    <a href="#" aria-current="page">
      <div class="ui-text">
        <p>Selected item</p>
        <p>This item has aria-current="page" on its link</p>
      </div>
    </a>
  </li>
  <li>
    <a href="#">
      <div class="ui-text">
        <p>Normal item</p>
      </div>
    </a>
  </li>
</ul>
```

## Text

Main text lives in `div.ui-text`: the label is the first `<p>` and the description the second.

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
      <p>Even more supporting text</p>
    </div>
  </li>
</ul>
```

## Start items

Found in `div.ui-start`, a direct child of the `li` or of its `a`, `button` or `label`.

### Icon

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 16a7 7 0 1 0 0-14a7 7 0 0 0 0 14m-8.5 2A3.5 3.5 0 0 0 4 21.5v.5c0 2.393 1.523 4.417 3.685 5.793C9.859 29.177 12.802 30 16 30s6.14-.823 8.315-2.207C26.477 26.417 28 24.393 28 22v-.5a3.5 3.5 0 0 0-3.5-3.5z"
        ></path>
      </svg>
    </div>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-start">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>
</ul>
```

### Avatar

Read more: [Avatar](https://open-props-ui.netlify.app/html/components/avatar.md)

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <div aria-hidden="true" class="ui-avatar">AB</div>
    </div>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-start">
      <div class="ui-avatar">
        <img
          src="https://images.unsplash.com/photo-1614530606961-c4ce986825c1?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          decoding="async"
          loading="lazy"
        />
      </div>
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>
</ul>
```

### Image

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <img
        src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>
  <li>
    <div class="ui-start">
      <img
        src="https://images.unsplash.com/photo-1504579264001-833438f93df2?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
        decoding="async"
        loading="lazy"
      />
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
  </li>
</ul>
```

### Video

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
    <div class="ui-end">13:37</div>
  </li>
  <li>
    <div class="ui-start">
      <video controls muted>
        <source
          src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
          type="video/mp4"
        />
      </video>
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
    <div class="ui-end">90s</div>
  </li>
</ul>
```

## End items

Found in `div.ui-end`.

### Text

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Headline</p>
    </div>
    <div class="ui-end">30kB</div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
    <div class="ui-end">99%</div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
    <div class="ui-end">100+</div>
  </li>
</ul>
```

### Keyboard command

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>Save all</p>
    </div>
    <div class="ui-end">
      <kbd>Ctrl+Shift+S</kbd>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Save</p>
    </div>
    <div class="ui-end">
      <kbd>Ctrl+S</kbd>
    </div>
  </li>
</ul>
```

### Checkbox

Wrap the List item content with a `<label class="ui-checkbox">` to make the entire surface clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md)

```html
<ul class="ui-list">
  <li>
    <label class="ui-checkbox">
      <div class="ui-text"><p>Checkbox 1</p></div>
      <div class="ui-end">
        <input type="checkbox" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-checkbox">
      <div class="ui-text"><p>Checkbox 2</p></div>
      <div class="ui-end">
        <input type="checkbox" />
      </div>
    </label>
  </li>
</ul>
```

### Radio

Wrap the List item content with a `<label class="ui-radio">` to make the entire surface clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/html/components/radio.md)

```html
<ul class="ui-list">
  <li>
    <label class="ui-radio">
      <div class="ui-text"><p>Radio 1</p></div>
      <div class="ui-end">
        <input value="1" name="radio-example-group" type="radio" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-radio">
      <div class="ui-text"><p>Radio 2</p></div>
      <div class="ui-end">
        <input value="2" name="radio-example-group" type="radio" />
      </div>
    </label>
  </li>
</ul>
```

### Switch

Read more: [Switch](https://open-props-ui.netlify.app/html/components/switch.md)

```html
<ul class="ui-list">
  <li>
    <label class="ui-switch">
      <div class="ui-text"><p>Switch 1</p></div>
      <div class="ui-end">
        <input type="checkbox" role="switch" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-switch">
      <div class="ui-text"><p>Switch 2</p></div>
      <div class="ui-end">
        <input type="checkbox" role="switch" />
      </div>
    </label>
  </li>
</ul>
```

## Inset

Set `.ui-inset` on an item without start content to align its text with items that have it.

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </div>
    <div class="ui-text">
      <p>No inset</p>
    </div>
  </li>
  <li class="ui-inset">
    <div class="ui-text">
      <p>Inset class</p>
      <p>Makes the text line up nicely</p>
    </div>
  </li>
  <li class="ui-inset">
    <div class="ui-start">Hidden</div>
    <div class="ui-text">
      <p>Inset class</p>
      <p>Any <code>div.ui-start</code> will be hidden when inset</p>
    </div>
  </li>
</ul>
```

## Flush

Apply the `.ui-flush` class on the `ul.ui-list` element to remove the inline padding on the list items.

```html
<ul class="ui-list ui-flush">
  <li>
    <div class="ui-text">
      <p>Gutterless list item</p>
    </div>
    <div class="ui-end">
      <button
        aria-label="Delete"
        class="ui-button ui-round ui-small"
        type="button"
      >
        <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
      </button>
    </div>
  </li>
  <li>
    <div class="ui-start">
      <svg aria-hidden="true" viewBox="0 0 32 32"></svg>
    </div>
    <div class="ui-text">
      <p>Headline</p>
      <p>Supporting text</p>
    </div>
    <div class="ui-end">100+</div>
  </li>
</ul>
```

## Borders

### On every item

Apply the `.ui-bordered` class on the `ul.ui-list` element to give all list items a border.

```html
<ul class="ui-list ui-bordered">
  <li>
    <div class="ui-text">
      <p>So</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Many</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Borders</p>
    </div>
  </li>
</ul>
```

### On one item

Apply the `.ui-border-top` class on a `li` item to give it an upper border.

```html
<ul class="ui-list">
  <li>
    <div class="ui-text">
      <p>I need borders</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Help</p>
    </div>
  </li>
  <li class="ui-border-top">
    <div class="ui-text">
      <p>Thanks</p>
    </div>
  </li>
</ul>
```

## Dense

Just add the `.ui-dense` class to the `ul.ui-list`!

```html
<ul class="ui-list ui-dense">
  <li>
    <div class="ui-text">
      <p>Headline</p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Headline</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Trailing supporting text</p>
    </div>
    <div class="ui-end">100+</div>
  </li>
</ul>
```

## API

### List API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Borders | `.ui-bordered` | - | Adds a border between list items. |
| Dense | `.ui-dense` | - | Packs the items tighter. |
| Flush | `.ui-flush` | - | Removes the inline padding. |
| Variants | default, `.ui-tonal`, `.ui-transparent` | default | The variant to use. The default `filled` list uses the filled surface. |

#### Parts

| Part | Description |
| --- | --- |
| `ul.ui-list` | Container element. |
| `<li>` | A list item. |

### List item API

| Type | Modifiers | Default | Description |
| --- | --- | --- | --- |
| Borders | `.ui-border-top` | - | Adds a border above the item. |
| Colors | `.ui-critical` | - | Optional colors. `critical` marks a destructive item in a [Menu](https://open-props-ui.netlify.app/html/components/menu.md). |
| Inset | `.ui-inset` | - | Aligns the text with items that have start content. |
| State | `[aria-current="page"]`, `[aria-disabled="true"]`, `[disabled]` | - | Highlights the current item, or dims a disabled one. Set it on the `<a>`, `<button>` or `<label>`. |
| Type | `label.ui-checkbox`, `label.ui-radio`, `label.ui-switch` | - | Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`. |

#### Parts

| Part | Description |
| --- | --- |
| `<li>` | The list item. |
| `<a>, <button>, <label>` | The clickable row, rendered by `as`, `href` or `type`. |
| `.ui-start` | Optional content at the start, such as an icon or avatar. |
| `.ui-text` | The text content. |
| `<p>` | The label, the first paragraph. |
| `<p>` | Supporting text, the second paragraph. |
| `.ui-end` | Optional content at the end, such as a value or an action. |

To make the item interactive, wrap the content in an `<a>`, `<button>` or `<label>`.

### CSS variables

| Variable | Default | Description |
| --- | --- | --- |
| `--ui-border-color` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Default border color for cards, lists, tables and dividers. `--ui-text-strong` mixed into `--ui-surface` at `--ui-border-strength-light` or `--ui-border-strength-dark`. |
| `--ui-border-color-on-filled` | `light-dark( var(--ui-gray-6), var(--ui-gray-12) )` | Border color inside filled surfaces: lists without a variant and table headers. `List` and `Table` set `--ui-border-color` to it on those parts. |
| `--ui-border-color-on-raised` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-border-strength-dark), var(--ui-surface) ) )` | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. The same mix as `--ui-border-color` by default. Each raised component sets `--ui-border-color` to it on its root, so a theme that wants another border on raised surfaces, such as the page background in dark mode, sets this one. |
| `--ui-border-width` | `1px` | Default border width for components that draw a border. |
| `--ui-border-width-thick` | `2px` | Width of emphasized rules: the head and foot rules of rich text tables, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, the bar on a selected `List` row, the `Spinner` ring, and at one and a half times, the blockquote bar. |
| `--ui-choice-size-small` | `calc(1rem * var(--ui-density))` | `Checkbox` and `Radio` input size with `.ui-small`, and in dense `List` rows unless the control has a size class. |
| `--ui-control-size` | `calc(2.5rem * var(--ui-density))` | Shared default height for fields and buttons so they line up. |
| `--ui-control-size-small` | `calc(2rem * var(--ui-density))` | Shared small height for fields and buttons. |
| `--ui-critical` | `var(--ui-red)` | Severity color for errors and destructive actions. |
| `--ui-critical-text` | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Critical as a text color: the `.ui-critical` items of a `Menu`, a `.ui-critical` `Button` with no variant or `.ui-outlined`, and `del` and `.ui-del` text. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`. |
| `--ui-disabled-opacity` | `0.64` | Opacity applied to disabled controls. |
| `--ui-duration-slow` | `0.3s` | Transition duration for entering and leaving overlays: `Dialog`, `Drawer` and `Menu`. |
| `--ui-ease-enter` | `cubic-bezier(0, 0, 0.3, 1)` | Easing for elements entering the screen: opening `Dialog`, `Drawer` and `Menu`, and the `Badge`, `Progress` and `Tooltip` transitions. |
| `--ui-ease-exit` | `cubic-bezier(0.7, 0, 1, 1)` | Easing for elements leaving the screen: closing `Drawer` and `Menu`. |
| `--ui-field-border-color-on-filled` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface-filled) )` | Field border color inside filled surfaces: lists without a variant and table headers. `--ui-text-strong` mixed into `--ui-surface-filled` at `--ui-field-border-strength`. |
| `--ui-field-border-color-on-raised` | `color-mix( in oklch, var(--ui-text-strong) var(--ui-field-border-strength), var(--ui-surface) )` | Field border color inside raised surfaces. The same mix as `--ui-field-border-color` by default. Each raised component sets `--ui-field-border-color` to it on its root. |
| `--ui-focus-ring-inset` | `calc(-1 * var(--ui-focus-ring-width))` | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--ui-font-code` | `Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace, SF Mono, Monaco, Droid Sans Mono, Source Code Pro, Cascadia Code, Menlo, Consolas, DejaVu Sans Mono, monospace` | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. A monospace stack by default. |
| `--ui-font-size-caption` | `var(--ui-font-size-100)` | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`. |
| `--ui-font-size-small` | `var(--ui-font-size-200)` | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`. |
| `--ui-font-weight-bold` | `700` | Font weight for headings, buttons and terms. |
| `--ui-font-weight-normal` | `400` | Font weight for body text, `List` text and `Button` keyboard shortcuts. |
| `--ui-icon-size` | `1.25rem` | Default icon size inside components. |
| `--ui-icon-size-small` | `1rem` | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron. |
| `--ui-line-height` | `1.6` | Line height of body copy: prose, captions and `List` text. |
| `--ui-list-item-padding-inline` | Unset | Horizontal padding of `List` and `Menu` items, headings and `Select` options. When unset, `--ui-space-3`. |
| `--ui-menu-radius` | Unset | Corner radius for `Menu`. When unset, menus follow `--ui-radius`. |
| `--ui-motion` | `1` | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion). |
| `--ui-on-selected` | Unset | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary-text` on a selected `Select` option. |
| `--ui-primary` | `light-dark( oklch( from var(--ui-primary-source) min(l, var(--ui-primary-max-lightness)) c h ), oklch( from var(--ui-primary-source) max(l, var(--ui-primary-min-lightness)) min(c, var(--ui-accent-max-chroma)) h ) )` | Brand color for primary actions and accents. Derived from `--ui-primary-source` within `--ui-primary-max-lightness` and `--ui-primary-min-lightness`. Set `--ui-primary-source` to keep more contrast working, or this token to pin the color. |
| `--ui-primary-text` | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, var(--ui-text-max-chroma)) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`, and a selected `Select` option. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius` | `0.5rem` | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length. |
| `--ui-selected` | Unset | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`. |
| `--ui-selected-strong` | `var(--ui-primary)` | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint. |
| `--ui-shadow-overlay` | `0 -1px 3px 0 hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 1px 2px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.02)), 0 2px 5px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.04)), 0 4px 12px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.05)), 0 12px 15px -5px hsl(from var(--ui-shadow-color) h s l / calc(alpha + 0.07))` | Shadow of layers that float above the page: `Dialog`, `Drawer`, `Menu`, `Select` pickers and the `Carousel` buttons. Five layers of `--ui-shadow-color`. |
| `--ui-space-1` | `calc(0.25rem * var(--ui-space-scale))` | Spacing step 1: `0.25rem` times `--ui-space-scale`. |
| `--ui-space-2` | `calc(0.5rem * var(--ui-space-scale))` | Spacing step 2: `0.5rem` times `--ui-space-scale`. |
| `--ui-space-3` | `calc(1rem * var(--ui-space-scale))` | Spacing step 3: `1rem` times `--ui-space-scale`. |
| `--ui-space-6` | `calc(1.75rem * var(--ui-space-scale))` | Spacing step 6: `1.75rem` times `--ui-space-scale`. |
| `--ui-state-active-alpha-accent` | `25%` | Alpha of the pressed state layer on primary and critical buttons. |
| `--ui-state-hover-alpha-accent` | `15%` | Alpha of the hover state layer on primary and critical buttons. |
| `--ui-surface-elevated` | `light-dark(var(--ui-gray-1), var(--ui-gray-12))` | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options. |
| `--ui-surface-filled` | `light-dark(var(--ui-gray-4), var(--ui-gray-15))` | Background of filled areas such as progress tracks and table stripes. |
| `--ui-surface-tonal` | `light-dark(var(--ui-gray-3), var(--ui-gray-12))` | Background of tonal variants. |
| `--ui-switch-thumb-size-small` | `calc(0.75rem * var(--ui-density))` | Diameter of the `Switch` thumb with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-block-size-small` | `calc(1.25rem * var(--ui-density))` | Height of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. |
| `--ui-switch-track-inline-size-small` | `calc( 2 * var(--ui-switch-track-block-size-small) )` | Width of the `Switch` track with `.ui-small`, and in `List` rows unless the switch has a size class. Twice `--ui-switch-track-block-size-small` until a theme sets it. |
| `--ui-text` | `light-dark( color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-light), var(--ui-surface) ), color-mix( in oklch, var(--ui-text-strong) var(--ui-text-strength-dark), var(--ui-surface) ) )` | Body text color. `--ui-text-strong` mixed into `--ui-surface` at `--ui-text-strength-light` or `--ui-text-strength-dark`. |
| `--ui-text-strong` | `light-dark(var(--ui-gray-15), var(--ui-gray-1))` | Strongest text color, for headings, labels and values. Body text is `--ui-text`. |
| `--ui-text-subtle` | `var(--ui-text)` | Secondary text: placeholders, field helper text, overlines, descriptions in `List` and `Menu` items, unselected `Tabs` labels and `Table` captions. When unset, `--ui-text`. |

The stylesheets on this page read these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

### list.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it. |
| `--_description-text-color` | Input | Text color of the description paragraph in an item. `--ui-text-subtle`, and `--ui-on-selected` on a selected or current row when a theme sets it. |
| `--_divider-border-color` | Input | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`. |
| `--_hover-bg-color` | Input | Background of hovered items, from `--ui-primary`. |
| `--_item-gap` | Input | Gap between the content of an item. Smaller in `.ui-dense`. |
| `--_item-padding-inline` | Input | Horizontal padding of items, headings and options. `--ui-list-item-padding-inline`, or `--ui-space-3` when a theme leaves it unset. |
| `--_radius` | Input | The corner radius of a `.ui-list`. Defaults to `--ui-radius`, and `0` when the list is a direct child of a `Card`, `Accordion` or `Dialog`, which round and clip it themselves. |
| `--_selected-bg-color` | Input | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-bg-color` | Input | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`. |
| `--_selected-indicator-size` | Input | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`. |
| `--_selected-shadow` | Output | Inset shadow that draws the bar from `--_selected-indicator-bg-color` and `--_selected-indicator-size`, on the start edge in both writing directions. |
| `--_separator-gap` | Input | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`. |
| `--_start-image-size` | Input | Width of a square image in `.ui-start`. |
| `--_start-size` | Input | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`. |
| `--_start-video-size` | Input | Height of a video in `.ui-start`, which keeps a 16:9 ratio. |

### menu.css

| Property | Kind | Description |
| --- | --- | --- |
| `--_bg-color` | Input | The background. Defaults to `--ui-surface-elevated`. |
| `--_border-color` | Input | The border color. Defaults to `--ui-border-color-on-raised`, and `--_divider-border-color` follows it. |
| `--_border-width` | Input | The border width. Defaults to `--ui-border-width`. |
| `--_divider-border-color` | Input | Color of the item separators. Defaults to `--_border-color`. |
| `--_duration` | Output | Duration of the transitions, `--ui-duration-slow` times `--_motion`. |
| `--_ease` | Output | Easing of the open and close transitions. `--ui-ease-enter` while opening and `--ui-ease-exit` while closing. |
| `--_hover-bg-color` | Output | Hover background of `.ui-critical` items, from `--ui-critical`. |
| `--_margin-block` | Output | Block margin of a popover menu, `--_offset` or `0` depending on the side. |
| `--_margin-inline` | Output | Inline margin of a popover menu, `--_offset` for `.ui-inline-start` and `.ui-inline-end`. |
| `--_max-block-size` | Input | Maximum height. |
| `--_min-block-size` | Input | Height a popover menu keeps when space is tight, unless its content is shorter. Needs `calc-size()`. |
| `--_min-inline-size` | Input | Minimum width. A popover menu is also at least as wide as its invoker. |
| `--_motion` | Input | Motion multiplier for the transitions. `0` turns them off. |
| `--_offset` | Input | Gap between a popover menu and its invoker. |
| `--_position-area` | Output | The `position-area` of a popover menu, from `--_side` and `--_span`. `--ui-anchor-position-area` overrides it. |
| `--_radius` | Input | The corner radius. Defaults to `--ui-radius`. |
| `--_shadow` | Input | The shadow. Defaults to `--ui-shadow-overlay`. |
| `--_side` | Output | Side of the invoker the menu opens on, a `self-` keyword so it follows the menu's own direction. Set by `.ui-block-start`, `.ui-inline-start` and `.ui-inline-end`. |
| `--_span` | Output | Direction the menu extends along the invoker. Set by the side classes and `.ui-align-end`. |

## Installation

### Used by

- [Menu](https://open-props-ui.netlify.app/html/components/menu.md)
- [Select](https://open-props-ui.netlify.app/html/components/select.md)

Copy the CSS into your project to own it. It reads tokens from Open Props, `palette.css` and `theme.css`, so those go on the page too, after `layers.css`. See [Getting started](https://open-props-ui.netlify.app/html/guide/getting-started.md).

- `opui-css/css/components/list.css`

## Used in blocks

- [Account settings](https://open-props-ui.netlify.app/blocks/account-settings.md)
- [App shell](https://open-props-ui.netlify.app/blocks/app-shell.md)
- [Chat](https://open-props-ui.netlify.app/blocks/chat.md)
- [Checkout](https://open-props-ui.netlify.app/blocks/checkout.md)
- [Data table](https://open-props-ui.netlify.app/blocks/data-table.md)
- [Error page](https://open-props-ui.netlify.app/blocks/error-page.md)
- [Hero](https://open-props-ui.netlify.app/blocks/hero.md)
- [Inbox](https://open-props-ui.netlify.app/blocks/inbox.md)
- [Newsletter](https://open-props-ui.netlify.app/blocks/newsletter.md)
- [Notifications](https://open-props-ui.netlify.app/blocks/notifications.md)
- [Order history](https://open-props-ui.netlify.app/blocks/order-history.md)
- [Product detail](https://open-props-ui.netlify.app/blocks/product-detail.md)
- [Project overview](https://open-props-ui.netlify.app/blocks/project-overview.md)
- [Sales dashboard](https://open-props-ui.netlify.app/blocks/sales-dashboard.md)
- [Server status](https://open-props-ui.netlify.app/blocks/server-status.md)
- [Sign up](https://open-props-ui.netlify.app/blocks/sign-up.md)
- [Team members](https://open-props-ui.netlify.app/blocks/team-members.md)
- [Two-factor authentication](https://open-props-ui.netlify.app/blocks/two-factor.md)
