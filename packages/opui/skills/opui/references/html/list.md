# List

## Anatomy

- Headline

  Supporting text

  100+

* `<li>`

  The list item.

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
  <li>
    <div class="ui-text">
      <p>Trailing keyboard command</p>
    </div>
    <div class="ui-end">
      <kbd>CTRL+Shift+X</kbd>
    </div>
  </li>
  <li class="ui-border-top">
    <div class="ui-start">
      <svg
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
      <p>Headline with start icon</p>
    </div>
  </li>
  <li>
    <div class="ui-start">
      <svg
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
      <p>Headline with start icon</p>
      <p>
        Supporting text that truly is quite long enough to fill up multiple
        lines.
      </p>
    </div>
  </li>
  <li class="ui-inset">
    <div class="ui-text">
      <p>Inset class</p>
      <p>Makes the text line up nicely</p>
    </div>
  </li>
  <li class="ui-border-top">
    <button type="button">
      <div class="ui-text">
        <p>Button list item</p>
      </div>
    </button>
  </li>
  <li>
    <a href="#">
      <div class="ui-text">
        <p>Link list item</p>
      </div>
    </a>
  </li>
  <li class="ui-border-top">
    <div class="ui-start">
      <div class="ui-avatar">OP</div>
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
  <li class="ui-border-top">
    <button type="button">
      <div class="ui-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 28 28"
        >
          <path
            fill="currentColor"
            d="M21.75 3A3.25 3.25 0 0 1 25 6.25v15.5A3.25 3.25 0 0 1 21.75 25H6.25A3.25 3.25 0 0 1 3 21.75V6.25A3.25 3.25 0 0 1 6.25 3zm0 1.5H6.25A1.75 1.75 0 0 0 4.5 6.25V15h6a.75.75 0 0 1 .743.648l.007.102a2.75 2.75 0 1 0 5.5 0a.75.75 0 0 1 .648-.743L17.5 15h6V6.25a1.75 1.75 0 0 0-1.75-1.75"
          ></path>
        </svg>
      </div>
      <div class="ui-text">
        <p>Button with start icon</p>
      </div>
    </button>
  </li>
  <li>
    <a href="#">
      <div class="ui-start">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m13.94 5l5.061 5.06L9.063 20a2.25 2.25 0 0 1-1 .58l-5.115 1.395a.75.75 0 0 1-.92-.921l1.394-5.116a2.25 2.25 0 0 1 .58-.999zm-7.414 6l-1.5 1.5H2.75a.75.75 0 0 1 0-1.5zm14.352-8.174l.153.144l.145.153a3.58 3.58 0 0 1-.145 4.908l-.97.969L15 3.94l.97-.97a3.58 3.58 0 0 1 4.908-.144M10.526 7l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5zm4-4l-1.5 1.5H2.75a.75.75 0 1 1 0-1.5z"
          ></path>
        </svg>
      </div>
      <div class="ui-text">
        <p>Link with start icon</p>
      </div>
    </a>
  </li>
  <li class="ui-border-top">
    <button type="button">
      <div class="ui-text">
        <p>End icon</p>
      </div>
      <div class="ui-end">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M11.116 26.634a1.25 1.25 0 0 1 0-1.768L19.982 16l-8.866-8.866a1.25 1.25 0 0 1 1.768-1.768l9.75 9.75a1.25 1.25 0 0 1 0 1.768l-9.75 9.75a1.25 1.25 0 0 1-1.768 0"
          ></path>
        </svg>
      </div>
    </button>
  </li>
  <li>
    <div class="ui-text">
      <p>End icon button</p>
    </div>
    <div class="ui-end">
      <button
        class="ui-button ui-rounded ui-small"
        aria-label="More"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <path
            fill="currentColor"
            d="M16 9.5a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5m0 9a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5M13.5 25a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0"
          ></path>
        </svg>
      </button>
    </div>
  </li>
  <li class="ui-border-top">
    <label class="ui-checkbox" for="checkbox-all-html">
      <div class="ui-text">Checkbox</div>
      <div class="ui-end">
        <input type="checkbox" id="checkbox-all-html" />
      </div>
    </label>
  </li>
  <li class="ui-border-top">
    <label class="ui-radio" for="radio-all-1-html">
      <div class="ui-text">Radio 1</div>
      <div class="ui-end">
        <input
          type="radio"
          id="radio-all-1-html"
          value="1"
          name="default-radio-group-all"
        />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-radio" for="radio-all-2-html">
      <div class="ui-text">Radio 2</div>
      <div class="ui-end">
        <input
          type="radio"
          id="radio-all-2-html"
          value="2"
          name="default-radio-group-all"
        />
      </div>
    </label>
  </li>
  <li class="ui-border-top">
    <label class="ui-switch" for="switch-all-1-html">
      <div class="ui-text">Switch 1</div>
      <div class="ui-end">
        <input type="checkbox" role="switch" id="switch-all-1-html" />
      </div>
    </label>
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
<div class="column" style="gap: var(--size-4)">
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
</div>
```

## Clickable list item

Wrap the elements of your List item with an `a`, `button` or `label` depending on use-case.

Give a `<button>` `type="button"` so the item doesn't submit a surrounding form.

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
    <a href="#clickable-list-item">
      <div class="ui-text">
        <p>Link list item</p>
      </div>
    </a>
  </li>
  <li>
    <label class="ui-checkbox" for="clickable-checkbox-html">
      <div class="ui-text">
        <p>Checkbox list item</p>
      </div>
      <div class="ui-end">
        <input type="checkbox" id="clickable-checkbox-html" />
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
      <div class="ui-avatar">AB</div>
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
      <kbd>CTRL+ALT+DEL</kbd>
    </div>
  </li>
  <li>
    <div class="ui-text">
      <p>Save</p>
    </div>
    <div class="ui-end">
      <kbd>CTRL+S</kbd>
    </div>
  </li>
</ul>
```

### Checkbox

Wrap the List item content with a `<label class="ui-checkbox" for="INPUTID">` to make the entire surface clickable.

Read more: [Checkbox](https://open-props-ui.netlify.app/html/components/checkbox.md)

```html
<ul class="ui-list">
  <li>
    <label class="ui-checkbox" for="checkbox-example-1-html">
      <div class="ui-text">Checkbox 1</div>
      <div class="ui-end">
        <input id="checkbox-example-1-html" type="checkbox" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-checkbox" for="checkbox-example-2-html">
      <div class="ui-text">Checkbox 2</div>
      <div class="ui-end">
        <input id="checkbox-example-2-html" type="checkbox" />
      </div>
    </label>
  </li>
</ul>
```

### Radio

Wrap the List item content with a `<label class="ui-radio" for="INPUTID">` to make the entire surface clickable.

Radio group: Add a common name to each `<input>` for radio group behavior.

Read more: [Radio](https://open-props-ui.netlify.app/html/components/radio.md)

```html
<ul class="ui-list">
  <li>
    <label class="ui-radio" for="radio-example-1-html">
      <div class="ui-text">Radio 1</div>
      <div class="ui-end">
        <input
          id="radio-example-1-html"
          value="1"
          name="radio-example-group"
          type="radio"
        />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-radio" for="radio-example-2-html">
      <div class="ui-text">Radio 2</div>
      <div class="ui-end">
        <input
          id="radio-example-2-html"
          value="2"
          name="radio-example-group"
          type="radio"
        />
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
    <label class="ui-switch" for="switch-example-1-html">
      <div class="ui-text">Switch 1</div>
      <div class="ui-end">
        <input id="switch-example-1-html" type="checkbox" role="switch" />
      </div>
    </label>
  </li>
  <li>
    <label class="ui-switch" for="switch-example-2-html">
      <div class="ui-text">Switch 2</div>
      <div class="ui-end">
        <input id="switch-example-2-html" type="checkbox" role="switch" />
      </div>
    </label>
  </li>
</ul>
```

## Inset

Enables a list item without a start icon to align with items that do.

```html
<ul class="ui-list">
  <li>
    <div class="ui-start">
      <svg
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
        class="ui-button ui-rounded ui-small"
        type="button"
      >
        <svg
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
  <!--  -->
</ul>
```

## API

### List API

| Type       | Modifiers                      | Default | Description                                                                  |
| ---------- | ------------------------------ | ------- | ---------------------------------------------------------------------------- |
| Bordered   | `.ui-bordered`                 | -       | Adds a border between list items.                                            |
| Dense      | `.ui-dense`                    | -       | Packs the list tighter.                                                      |
| Gutterless | `.ui-gutterless`               | -       | Removes the inline padding.                                                  |
| Variants   | `.ui-tonal`, `.ui-transparent` | -       | The background color variant. Without one, the list uses the filled surface. |

#### Parts

| Part         | Description        |
| ------------ | ------------------ |
| `ul.ui-list` | Container element. |
| `<li>`       | A list item.       |

#### CSS variables

| Variable                      | Default                                      | Description                                                                                                       |
| ----------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                       |
| `--border-width`              | `1px`                                        | Default border width for components that draw a border.                                                           |
| `--choice-size-small`         | `var(--size-3)`                              | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                             |
| `--control-size`              | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--font-weight-normal`        | `var(--font-weight-4)`                       | Font weight for `List` text and `Button` keyboard shortcuts.                                                      |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-small`           | `var(--size-3)`                              | Icon size inside `Chip`.                                                                                          |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### List item API

| Type       | Modifiers                                                | Default | Description                                                       |
| ---------- | -------------------------------------------------------- | ------- | ----------------------------------------------------------------- |
| Border top | `.ui-border-top`                                         | -       | Adds a border above the item.                                     |
| Controls   | `label.ui-checkbox`, `label.ui-radio`, `label.ui-switch` | -       | Wraps the content in a `<label>` for a checkbox, radio or switch. |
| Inset      | `.ui-inset`                                              | -       | Aligns the text with items that have start content.               |

#### Parts

| Part        | Description                                                |
| ----------- | ---------------------------------------------------------- |
| `<li>`      | The list item.                                             |
| `.ui-start` | Optional content at the start, such as an icon or avatar.  |
| `.ui-text`  | The text content.                                          |
| `<p>`       | The headline, the first paragraph.                         |
| `<p>`       | Supporting text, the second paragraph.                     |
| `.ui-end`   | Optional content at the end, such as a value or an action. |

#### CSS variables

| Variable                      | Default                                      | Description                                                                                                       |
| ----------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`  | Default border color for cards, lists, tables and dividers.                                                       |
| `--border-width`              | `1px`                                        | Default border width for components that draw a border.                                                           |
| `--choice-size-small`         | `var(--size-3)`                              | `Checkbox` and `Radio` input size with `.ui-small` and inside `List`.                                             |
| `--control-size`              | `calc(40px * var(--density))`                | Shared default height for fields and buttons so they line up.                                                     |
| `--focus-ring-inset`          | `calc(-1 * var(--focus-ring-width))`         | Negative offset for focus rings drawn inside a control, such as `ButtonGroup`, `List` items and `Select` options. |
| `--font-size-05`              | `0.875rem`                                   | A font size between Open Props `--font-size-0` and `--font-size-1`, used for labels and compact text.             |
| `--font-weight-normal`        | `var(--font-weight-4)`                       | Font weight for `List` text and `Button` keyboard shortcuts.                                                      |
| `--icon-size`                 | `var(--size-4)`                              | Default icon size inside components.                                                                              |
| `--icon-size-small`           | `var(--size-3)`                              | Icon size inside `Chip`.                                                                                          |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))` | Brand color for primary actions and accents.                                                                      |
| `--surface-filled`            | `light-dark(var(--gray-4), var(--gray-15))`  | Background of filled areas such as progress tracks and table stripes.                                             |
| `--surface-tonal`             | `light-dark(var(--gray-3), var(--gray-12))`  | Background of tonal variants.                                                                                     |
| `--switch-dot-size-small`     | `0.75rem`                                    | Diameter of the `Switch` dot with `.ui-small` and inside `List`.                                                  |
| `--switch-track-height-small` | `var(--size-4)`                              | Height of the `Switch` track with `.ui-small` and inside `List`.                                                  |
| `--switch-track-width-small`  | `2.5rem`                                     | Width of the `Switch` track with `.ui-small` and inside `List`.                                                   |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`  | Body text color.                                                                                                  |
| `--text-primary`              | `light-dark(var(--gray-15), var(--gray-1))`  | Emphasized text color for headings, labels and values.                                                            |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

Wrap the content in an `<a>`, `<button>` or `<label>` to make the item interactive.

## Under the hood

1. Row

   - Start, text and end parts in one flex row
   - `>` styles direct children only, so a nested list in a row stays a list
   - `--gap` and `--start-size` drive the spacing and the icon column
   - The button is padded too, so the padding doubles

2. Clickable

   - `:has(> a, > button, > label)` moves the padding onto the button, link or label (checkbox, radio and switch rows)
   - The whole row is the hit target
   - Hover tint derived from `--primary`

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
  background-color: var(--surface-filled);
  list-style: none;
  padding: 0.5rem 0;
}

.list > li,
.list > li > button {
  align-items: center;
  display: flex;
  gap: var(--gap);
  min-block-size: 2.5rem;
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
  color: var(--text-muted);
  font-size: var(--font-size-0);
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
  background-color: oklch(from var(--primary) l c h / 15%);
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
  border-block-start: 1px solid var(--border-color);
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

- `opui-css/css/components/list.css`

## Changelog

### What's new

- Smaller [start](#icon) and end icons.
- Breaking: `.ui-divided` is removed. Use [`.ui-bordered`](#on-every-item).
- [Dense](#dense) rows keep the default inline padding, so they line up with card content.
- Only direct children are styled as rows, so nested lists inside a row stay normal lists ([Under the hood](#under-the-hood)).
- Breaking: [`.ui-default`](#variants) is gone, since it wasn't the default look.
