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

  The headline, the first paragraph.

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

Without a color class the list uses the filled surface, because lists usually sit in popovers and selects that need to contrast against the page. Pick `tonal`, or `transparent` to show the surface behind the list.

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

Main text lives in `div.ui-text`.

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

Found in `div.ui-start`.

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
      <div class="ui-text">Checkbox 1</div>
      <div class="ui-end">
        <input type="checkbox" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-checkbox">
      <div class="ui-text">Checkbox 2</div>
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
      <div class="ui-text">Radio 1</div>
      <div class="ui-end">
        <input value="1" name="radio-example-group" type="radio" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-radio">
      <div class="ui-text">Radio 2</div>
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
      <div class="ui-text">Switch 1</div>
      <div class="ui-end">
        <input type="checkbox" role="switch" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-switch">
      <div class="ui-text">Switch 2</div>
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

## Gutterless

Apply the `.ui-gutterless` class on the `ul.ui-list` element to remove the inline padding on the list items.

```html
<ul class="ui-list ui-gutterless">
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
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M12 12h2v12h-2zm6 0h2v12h-2zM6 28h20V10H6zm16-22V4H10v2H4v2h24V6zM12 4h8v2h-8z"
          ></path>
        </svg>
      </button>
    </div>
  </li>
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

| Type       | Modifiers                      | Default | Description                                                        |
| ---------- | ------------------------------ | ------- | ------------------------------------------------------------------ |
| Bordered   | `.ui-bordered`                 | -       | Adds a border between list items.                                  |
| Dense      | `.ui-dense`                    | -       | Packs the items tighter.                                           |
| Gutterless | `.ui-gutterless`               | -       | Removes the inline padding.                                        |
| Variants   | `.ui-tonal`, `.ui-transparent` | -       | The variant to use. Without one, the list uses the filled surface. |

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `ul.ui-list` | Container element. |
| `<li>`       | A list item.       |

#### CSS variables

| Variable                         | Default                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                                                                          | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-width`              | `1px`                                                                                                                                                                      | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-border-width-thick`        | `var(--border-size-2)`                                                                                                                                                     | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                              |
| `--ui-choice-size-small`         | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                  | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                    |
| `--ui-control-size`              | `calc(40px * var(--ui-density))`                                                                                                                                           | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                            |
| `--ui-disabled-opacity`          | `0.64`                                                                                                                                                                     | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-focus-ring-inset`          | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                    | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                        |
| `--ui-font-code`                 | `var(--font-mono)`                                                                                                                                                         | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                        |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                                                                                                                                  | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                           |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                  | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                  |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                                                                                                                                                     | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                  |
| `--ui-icon-size`                 | `var(--size-4)`                                                                                                                                                            | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`           | `var(--size-3)`                                                                                                                                                            | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                               |
| `--ui-line-height-body`          | `1.6`                                                                                                                                                                      | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                               |
| `--ui-on-selected`               | Unset                                                                                                                                                                      | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                       |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                         | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-primary-text`              | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-selected`                  | Unset                                                                                                                                                                      | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                         |
| `--ui-selected-strong`           | `var(--ui-primary)`                                                                                                                                                        | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                        |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                              | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                              | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                              | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-6`                   | `calc(var(--size-6) * var(--ui-space-scale))`                                                                                                                              | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-7`                   | `calc(var(--size-7) * var(--ui-space-scale))`                                                                                                                              | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-state-active-alpha-accent` | `25%`                                                                                                                                                                      | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                        |
| `--ui-state-hover-alpha-accent`  | `15%`                                                                                                                                                                      | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                          |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                                                                                          | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                          | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`   | `calc(0.75rem * var(--ui-density))`                                                                                                                                        | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-small` | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                  | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-small`  | `calc(2.5rem * var(--ui-density))`                                                                                                                                         | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-text-muted`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                          | Body text color.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                          | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

### List item API

| Type       | Modifiers                                                       | Default | Description                                                                                              |
| ---------- | --------------------------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------- |
| Border top | `.ui-border-top`                                                | -       | Adds a border above the item.                                                                            |
| Colors     | `.ui-critical`                                                  | -       | A destructive item in a [Menu](https://open-props-ui.netlify.app/html/components/menu.md).               |
| Controls   | `label.ui-checkbox`, `label.ui-radio`, `label.ui-switch`        | -       | Wraps the content in a `<label>` for a checkbox, radio or switch. Can't be combined with `as` or `href`. |
| Inset      | `.ui-inset`                                                     | -       | Aligns the text with items that have start content.                                                      |
| State      | `[aria-current="page"]`, `[aria-disabled="true"]`, `[disabled]` | -       | Highlights the current item, or dims a disabled one. Set it on the `<a>`, `<button>` or `<label>`.       |

#### Parts

| Part                     | Description                                                |
| ------------------------ | ---------------------------------------------------------- |
| `<li>`                   | The list item.                                             |
| `<a>, <button>, <label>` | The clickable row, rendered by `as`, `href` or `type`.     |
| `.ui-start`              | Optional content at the start, such as an icon or avatar.  |
| `.ui-text`               | The text content.                                          |
| `<p>`                    | The headline, the first paragraph.                         |
| `<p>`                    | Supporting text, the second paragraph.                     |
| `.ui-end`                | Optional content at the end, such as a value or an action. |

#### CSS variables

| Variable                         | Default                                                                                                                                                                      | Description                                                                                                                                                                                                                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--ui-border-color`              | `light-dark(var(--ui-gray-4), var(--ui-gray-12))`                                                                                                                            | Default border color for cards, lists, tables and dividers.                                                                                                                                                                                                                                                                                                                              |
| `--ui-border-color-on-raised`    | `light-dark( var(--ui-border-color), var(--ui-surface-default) )`                                                                                                            | Border color inside raised surfaces: tonal and elevated `Card` and `Accordion`, `Dialog`, `Drawer`, `Menu` and `Callout` without a severity. Defaults to `--ui-border-color` in light mode and the page background in dark mode.                                                                                                                                                         |
| `--ui-border-width`              | `1px`                                                                                                                                                                        | Default border width for components that draw a border.                                                                                                                                                                                                                                                                                                                                  |
| `--ui-border-width-thick`        | `var(--border-size-2)`                                                                                                                                                       | Width of emphasized rules: the `Table` head and foot borders, the `AvatarGroup` ring, the `Badge` border, the neutral `Chip` dot, the dotted `DescriptionList` rule, the `Tabs` indicator, and at one and a half times, the blockquote bar.                                                                                                                                              |
| `--ui-choice-size-small`         | `calc(var(--size-3) * var(--ui-density))`                                                                                                                                    | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                    |
| `--ui-control-size`              | `calc(40px * var(--ui-density))`                                                                                                                                             | Shared default height for fields and buttons so they line up.                                                                                                                                                                                                                                                                                                                            |
| `--ui-critical`                  | `var(--ui-red)`                                                                                                                                                              | Severity color for errors and destructive actions.                                                                                                                                                                                                                                                                                                                                       |
| `--ui-critical-text`             | `light-dark( oklch(from var(--ui-critical) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-critical) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )` | Critical as a text color: the `.ui-critical` items of a `Menu`, and a `.ui-critical` `Button` with no variant or `.ui-outlined`. `--ui-critical` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`.                                                                                                                                                 |
| `--ui-disabled-opacity`          | `0.64`                                                                                                                                                                       | Opacity applied to disabled controls.                                                                                                                                                                                                                                                                                                                                                    |
| `--ui-duration`                  | `0.2s`                                                                                                                                                                       | Default transition duration. Multiplied by `--ui-motion`.                                                                                                                                                                                                                                                                                                                                |
| `--ui-ease-enter`                | `var(--ease-out-3)`                                                                                                                                                          | Easing for elements entering the screen.                                                                                                                                                                                                                                                                                                                                                 |
| `--ui-focus-ring-inset`          | `calc(-1 * var(--ui-focus-ring-width))`                                                                                                                                      | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options.                                                                                                                                                                                                                                                                        |
| `--ui-font-code`                 | `var(--font-mono)`                                                                                                                                                           | Font family for `code`, `kbd`, `samp` and `pre` in rich text, `.ui-kbd`, `.ui-samp`, `.ui-var`, code blocks and `kbd` in buttons and lists. Defaults to Open Props `--font-mono`.                                                                                                                                                                                                        |
| `--ui-font-size-caption`         | `var(--ui-font-size-100)`                                                                                                                                                    | Font size of captions, `Badge`, `Chip`, `Divider` labels, `List` secondary text, `Menu` shortcuts, overlines, `small`, `figcaption` and x-small buttons, toggles and fields. Defaults to `--ui-font-size-100`.                                                                                                                                                                           |
| `--ui-font-size-small`           | `var(--ui-font-size-200)`                                                                                                                                                    | Font size of helper text, `Callout`, `Table`, `Tooltip`, code blocks, dense `List` text and small buttons, chips, toggles and fields. Defaults to `--ui-font-size-200`.                                                                                                                                                                                                                  |
| `--ui-font-weight-bold`          | `var(--font-weight-7)`                                                                                                                                                       | Font weight for headings, buttons and terms.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-font-weight-normal`        | `var(--font-weight-4)`                                                                                                                                                       | Font weight for body text, `List` text and `Button` keyboard shortcuts.                                                                                                                                                                                                                                                                                                                  |
| `--ui-icon-size`                 | `var(--size-4)`                                                                                                                                                              | Default icon size inside components.                                                                                                                                                                                                                                                                                                                                                     |
| `--ui-icon-size-small`           | `var(--size-3)`                                                                                                                                                              | Icon size inside `Chip`, x-small `Avatar` and dense `List` rows, and the `Select` and autosuggest chevron.                                                                                                                                                                                                                                                                               |
| `--ui-line-height-body`          | `1.6`                                                                                                                                                                        | Line height of body copy: prose, captions and `List` text.                                                                                                                                                                                                                                                                                                                               |
| `--ui-motion`                    | `1`                                                                                                                                                                          | Motion multiplier. `0` disables transitions, `1` is normal speed. Set to `0` automatically under `prefers-reduced-motion`. See [Motion](https://open-props-ui.netlify.app/html/guide/theming.md#motion).                                                                                                                                                                                 |
| `--ui-on-selected`               | Unset                                                                                                                                                                        | Text color on `--ui-selected`. When unset, `--ui-on-primary` on toggles, the item's own text color on list items and `--ui-primary` on a selected `Select` option.                                                                                                                                                                                                                       |
| `--ui-primary`                   | `light-dark(var(--ui-color-9), var(--ui-color-6))`                                                                                                                           | Brand color for primary actions and accents.                                                                                                                                                                                                                                                                                                                                             |
| `--ui-primary-text`              | `light-dark( oklch(from var(--ui-primary) min(l, var(--ui-text-max-lightness)) c h), oklch( from var(--ui-primary) max(l, var(--ui-text-min-lightness)) min(c, 0.1) h ) )`   | Primary as a text color: links, rich text links, `Callout` link hover, and `Button` and `ButtonGroup` with `.ui-primary` and no variant or `.ui-outlined`. Defaults to `--ui-primary` with its lightness kept within `--ui-text-max-lightness` and `--ui-text-min-lightness`, and is derived again from the more-contrast primary. Set it when the primary needs another shade for text. |
| `--ui-radius`                    | `var(--size-2)`                                                                                                                                                              | Corner radius for every component: cards, callouts, menus, buttons and fields follow it, and small parts like `kbd`, tooltips and checkboxes never get rounder than it. Set it to `0` for square corners. Takes a single length.                                                                                                                                                         |
| `--ui-selected`                  | Unset                                                                                                                                                                        | Background of a selected control: a checked `ToggleButton`, the selected `ToggleGroup` item, and a selected or current `List` item and `Select` option. When unset, `--ui-primary` on toggles and `--ui-primary` at `--ui-state-active-alpha-accent` on list items and options. Pair it with `--ui-on-selected`.                                                                         |
| `--ui-selected-strong`           | `var(--ui-primary)`                                                                                                                                                          | Mark of a selected item that has to stand out from the page on its own: the current `Carousel` marker, the bar on the start edge of a selected `List` row and the selected tab of filled `Tabs`. Defaults to `--ui-primary`. `--ui-selected` is the fill behind a selected item and may be faint.                                                                                        |
| `--ui-shadow-overlay`            | `var(--shadow-3)`                                                                                                                                                            | Shadow of layers that float above the page: `Menu`, `Select` pickers and `Drawer`.                                                                                                                                                                                                                                                                                                       |
| `--ui-space-1`                   | `calc(var(--size-1) * var(--ui-space-scale))`                                                                                                                                | Spacing step 1: Open Props `--size-1` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-2`                   | `calc(var(--size-2) * var(--ui-space-scale))`                                                                                                                                | Spacing step 2: Open Props `--size-2` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-3`                   | `calc(var(--size-3) * var(--ui-space-scale))`                                                                                                                                | Spacing step 3: Open Props `--size-3` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-6`                   | `calc(var(--size-6) * var(--ui-space-scale))`                                                                                                                                | Spacing step 6: Open Props `--size-6` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-space-7`                   | `calc(var(--size-7) * var(--ui-space-scale))`                                                                                                                                | Spacing step 7: Open Props `--size-7` times `--ui-space-scale`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-state-active-alpha-accent` | `25%`                                                                                                                                                                        | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                        |
| `--ui-state-hover-alpha-accent`  | `15%`                                                                                                                                                                        | Alpha of the hover state layer on primary and critical buttons.                                                                                                                                                                                                                                                                                                                          |
| `--ui-surface-elevated`          | `light-dark(var(--ui-gray-1), var(--ui-gray-12))`                                                                                                                            | Background of elevated cards and accordions, dialogs, drawers, menus and native `Select` options.                                                                                                                                                                                                                                                                                        |
| `--ui-surface-filled`            | `light-dark(var(--ui-gray-4), var(--ui-gray-15))`                                                                                                                            | Background of filled areas such as progress tracks and table stripes.                                                                                                                                                                                                                                                                                                                    |
| `--ui-surface-tonal`             | `light-dark(var(--ui-gray-3), var(--ui-gray-12))`                                                                                                                            | Background of tonal variants.                                                                                                                                                                                                                                                                                                                                                            |
| `--ui-switch-thumb-size-small`   | `calc(0.75rem * var(--ui-density))`                                                                                                                                          | Diameter of the `Switch` thumb with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                       |
| `--ui-switch-track-height-small` | `calc(var(--size-4) * var(--ui-density))`                                                                                                                                    | Height of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                         |
| `--ui-switch-track-width-small`  | `calc(2.5rem * var(--ui-density))`                                                                                                                                           | Width of the `Switch` track with `.ui-small` and inside `List`.                                                                                                                                                                                                                                                                                                                          |
| `--ui-text-muted`                | `light-dark(var(--ui-gray-13), var(--ui-gray-4))`                                                                                                                            | Body text color.                                                                                                                                                                                                                                                                                                                                                                         |
| `--ui-text-strong`               | `light-dark(var(--ui-gray-15), var(--ui-gray-1))`                                                                                                                            | Strongest text color, for headings, labels and values. Body text is `--ui-text-muted`.                                                                                                                                                                                                                                                                                                   |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md).

To make the item interactive, wrap the content in an `<a>`, `<button>` or `<label>`.

## Component properties

Set these on the component itself, inline or in your own CSS. Inputs are the knobs. Outputs are derived from the inputs and the current state, so overriding one fixes it in every state. [Customizing](https://open-props-ui.netlify.app/html/guide/customizing.md#component-properties) has examples.

| Property                      | Kind   | Description                                                                                                                                                                                                                                                                                    |
| ----------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--_bg-color`                 | Input  | Background of the list and its items. Defaults to `--ui-surface-filled`, `.ui-transparent` and `.ui-tonal` set it.                                                                                                                                                                             |
| `--_divider-color`            | Input  | Color of the lines between items in `.ui-bordered` and on `.ui-border-top`. Defaults to `--ui-border-color`, mixed with 20% `--ui-text-strong` in `.ui-tonal`.                                                                                                                                 |
| `--_hover-bg-color`           | Input  | Background of hovered items, from `--ui-primary`.                                                                                                                                                                                                                                              |
| `--_item-gap`                 | Input  | Gap between the content of an item. Smaller in `.ui-dense`.                                                                                                                                                                                                                                    |
| `--_selected-bg-color`        | Input  | Background of selected and current items and options. `--ui-selected` when the theme sets it, otherwise `--ui-primary` at `--ui-state-active-alpha-accent`, stronger than `--_hover-bg-color`. With more contrast it is `--_hover-bg-color`, so the text keeps 7:1, and the bar marks the row. |
| `--_selected-indicator-color` | Input  | Color of the bar on the start edge of selected and current items and options, which marks them without relying on the fill. Defaults to `--ui-selected-strong`.                                                                                                                                |
| `--_selected-indicator-size`  | Input  | Width of the bar on selected and current items. Defaults to `--ui-border-width-thick`.                                                                                                                                                                                                         |
| `--_selected-shadow`          | Output | Inset shadow that draws the bar from `--_selected-indicator-color` and `--_selected-indicator-size`, on the start edge in both writing directions.                                                                                                                                             |
| `--_separator-space`          | Input  | Space around the lines between items in `.ui-bordered` and on `.ui-border-top`. Smaller in `.ui-dense`.                                                                                                                                                                                        |
| `--_start-image-size`         | Input  | Width of a square image in `.ui-start`.                                                                                                                                                                                                                                                        |
| `--_start-size`               | Input  | Maximum size of leading and trailing icons, and the indent of `.ui-inset` items. Smaller in `.ui-dense`.                                                                                                                                                                                       |
| `--_start-video-size`         | Input  | Height of a video in `.ui-start`, which keeps a 16:9 ratio.                                                                                                                                                                                                                                    |

## Under the hood

1. Row

   - Start, text and end parts in one flex row
   - `>` styles direct children only, so a nested list in a row stays a list
   - `--gap` and `--start-size` drive the spacing and the icon column
   - The button is padded too, so the padding doubles

2. Clickable

   - `:has(> a, > button, > label)` moves the padding onto the button, link or label (checkbox, radio and switch rows)
   - The whole row is the hit target
   - Hover tint derived from `--ui-primary`

3. Inset

   - An item without an icon lines up with the ones that have one
   - Same two custom properties, so it follows the knobs

4. Bordered

   - `> li + li`: a line between items, never above the first
   - The line sits in the margin, outside the hover area

Step 1 of 4: Row

```html
<ul class="list">
  <li>
    <button type="button">
      <span class="start"><svg>…</svg></span>
      <span class="text">
        <span>Inbox</span>
        <span>3 unread</span>
      </span>
      <span class="end"><kbd>⌘I</kbd></span>
    </button>
  </li>
</ul>
```

```css
.list {
  background-color: var(--ui-surface-filled);
  list-style: none;
  padding: 0.5rem 0;
}

.list > li,
.list > li > button {
  align-items: center;
  display: flex;
  gap: var(--gap);
  min-block-size: var(--ui-control-size);
  padding: 0.5rem 0.75rem;
  position: relative;
}

.start {
  display: grid;
  inline-size: var(--start-size);
}

.text {
  display: grid;
  flex: 1;
}

.text > * + * {
  color: var(--ui-text-muted);
  font-size: var(--ui-font-size-caption);
}
```

Step 2 of 4: Clickable

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+
- [Relative colors ](https://webstatus.dev/features/relative-color)(Newly available): Chrome 125+, Edge 125+, Firefox 128+, Safari 18+

```css
.list > li:has(> a, > button, > label) {
  padding: 0;
}

.list > li > button {
  inline-size: 100%;
}

.list > li > button:hover {
  background-color: oklch(from var(--ui-primary) l c h / 15%);
}
```

Step 3 of 4: Inset

```css
.inset .text {
  padding-inline-start: calc(var(--start-size) + var(--gap));
}
```

Step 4 of 4: Bordered

```css
.bordered > li + li {
  margin-block-start: 0.75rem;
}

.bordered > li + li::before {
  border-block-start: 1px solid var(--ui-border-color);
  content: "";
  inset: -0.5rem 0 auto 0;
  position: absolute;
}
```

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=List.md).

## Installation

### Used by

- [Menu](https://open-props-ui.netlify.app/html/components/menu.md)
- [Select](https://open-props-ui.netlify.app/html/components/select.md)

* `opui-css/css/components/list.css`

## Changelog

### What's new

- Selected and current items read [`--ui-selected`](#api) and `--ui-on-selected` when a theme sets them.
- Smaller [start](#icon) and end icons.
- Breaking: `.ui-divided` is removed. Use [`.ui-bordered`](#on-every-item).
- [Dense](#dense) rows keep the default inline padding, so they line up with card content.
- Only direct children are styled as rows, so nested lists inside a row stay normal lists ([Under the hood](#under-the-hood)).
- Breaking: [`.ui-default`](#variants) is gone, since it wasn't the default look.
- Breaking: `--_bg-color-hover` is `--_hover-bg-color` ([Under the hood](#under-the-hood)).
- A checked [option](#radio) uses `--ui-state-active-alpha-accent`.
- Breaking: rows no longer style `aria-selected="true"` on a link, button, label or list item, where ARIA doesn't allow it. Mark the current row with [`aria-current="page"`](#selected).
- [Selected and current rows](#selected) have a bar on their start edge in `--ui-selected-strong` and a stronger fill than hover, so they don't rely on a tint alone.
