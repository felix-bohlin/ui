# Card

The card is extremely versatile and can be used on its own, or as a building block for [accordions](https://open-props-ui.netlify.app/html/components/accordion.md), [dialogs](https://open-props-ui.netlify.app/html/components/dialog.md) and more.

### What's new

- [Tonal and elevated](#variants) cards have a border in the page background color, so they stay visible on tonal surfaces.
- [Actions](#actions) stick to the bottom of stretched cards and wrap when they don't fit.

## Anatomy

Overline

## Headline

Subhead

Explain more about the topic shown in the headline and subhead through supporting text.

- `.ui-card`

  Container element.

- `<hgroup>`

  The card header.

- `.ui-content`

  The card content.

- `.ui-actions`

  A group of actions, such as buttons.

## Variants

Change the card variant with the `.ui-text`, `.ui-outlined`, `.ui-tonal`, and `.ui-elevated` classes.

```html
<!-- .ui-text class optional -->
<div class="ui-card ui-text">
  <div class="ui-content">Text</div>
</div>


<div class="ui-card ui-outlined">
  <div class="ui-content">Outlined</div>
</div>


<div class="ui-card ui-tonal">
  <div class="ui-content">Tonal</div>
</div>


<div class="ui-card ui-elevated">
  <div class="ui-content">Elevated</div>
</div>
```

**Why does a text variant exist?**

It really doesn't make sense to use the text variant unless you really need to. The [accordion group](https://open-props-ui.netlify.app/html/components/accordion.md#accordion-group) is a great example where Open Props UI leverages the text variant of the `.ui-card` component.

## Header

Using the `<hgroup>`.

```html
<div class="ui-card ui-outlined">
  <hgroup>
    <p>Blog</p>
    <h3>My ultra-great blog post</h3>
    <p>Please read it.</p>
  </hgroup>
</div>
```

## Actions

Using the `.ui-actions` class.

There are some basic styles here to get you going, but for more advanced use-cases (which always happen), you might want to add your own styles.

```html
<div class="ui-card ui-outlined">
  <div class="ui-content">
    Notice how the buttons are made to align with the text above.
  </div>
  <div class="ui-actions">
    <button type="button" class="ui-button">Cancel</button>
    <button type="button" class="ui-button">Save</button>
  </div>
</div>


<div class="ui-card ui-outlined">
  <div class="ui-content">Trying other button types too. Look at that!</div>
  <div class="ui-actions">
    <button type="button" class="ui-button ui-outlined">Cancel</button>
    <button type="button" class="ui-button ui-filled">Save</button>
  </div>
</div>


<div class="ui-card ui-outlined">
  <div class="ui-content">Icon buttons work too!</div>
  <div class="ui-actions">
    <button
      type="button"
      class="ui-button ui-rounded ui-ripple ui-small"
      aria-label="Favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        />
      </svg>
    </button>
    <button
      type="button"
      class="ui-button ui-rounded ui-ripple ui-small"
      aria-label="Share"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        />
      </svg>
    </button>
  </div>
</div>
```

### Alignment

Align actions to the end with the `.ui-align-end` class.

```html
<div class="ui-card ui-outlined">
  <div class="ui-content">Buttons aligned to the end. Works too!</div>
  <div class="ui-actions ui-align-end">
    <button type="button" class="ui-button">Cancel</button>
    <button type="button" class="ui-button">Save</button>
  </div>
</div>


<div class="ui-card ui-outlined">
  <div class="ui-content">Again, buttons are aligned to the end!</div>
  <div class="ui-actions ui-align-end">
    <button type="button" class="ui-button ui-outlined">Cancel</button>
    <button type="button" class="ui-button ui-filled">Save</button>
  </div>
</div>


<div class="ui-card ui-outlined">
  <div class="ui-content">Icon buttons aligned to the end!</div>
  <div class="ui-actions ui-align-end">
    <button
      type="button"
      class="ui-button ui-rounded ui-ripple ui-small"
      aria-label="Favorite"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M3.384 7.13c2.972-4.17 9.167-4.174 12.146-.008l.465.65l.417-.593c2.955-4.195 9.16-4.236 12.17-.081A7.48 7.48 0 0 1 28 16.583L16.732 28.681a1 1 0 0 1-1.464 0L3.992 16.54a7.46 7.46 0 0 1-.608-9.41m10.52 1.155c-2.181-3.05-6.716-3.046-8.892.007a5.46 5.46 0 0 0 .446 6.887L16.002 26.53l10.534-11.31a5.48 5.48 0 0 0 .427-6.95c-2.205-3.044-6.751-3.013-8.916.06l-1.229 1.744a1 1 0 0 1-1.63.006z"
        />
      </svg>
    </button>
    <button
      type="button"
      class="ui-button ui-rounded ui-ripple ui-small"
      aria-label="Share"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M14 3a1 1 0 1 1 0 2H7.5A2.5 2.5 0 0 0 5 7.5v17A2.5 2.5 0 0 0 7.5 27h17a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5h-17A4.5 4.5 0 0 1 3 24.5v-17A4.5 4.5 0 0 1 7.5 3zm5.58-.907a1 1 0 0 1 1.067.146l10 8.5a1 1 0 0 1 0 1.523l-10 8.5A1 1 0 0 1 18.999 20v-3.96c-3.193.258-5.636 1.722-7.34 3.213a15.6 15.6 0 0 0-2.115 2.26c-.234.307-.407.56-.52.733c-.085.13-.136.215-.152.243l-.006.006l.001.001A1 1 0 0 1 7 22.036c0-.222-.003-.444.003-.666c.011-.406.042-.982.12-1.67c.155-1.37.5-3.218 1.265-5.08s1.967-3.776 3.855-5.225C13.948 8.086 16.161 7.2 19 7.032V3a1 1 0 0 1 .58-.907M20.998 8a1 1 0 0 1-1 1c-2.925 0-5.018.814-6.539 1.98c-1.533 1.177-2.551 2.763-3.224 4.4a16.5 16.5 0 0 0-.957 3.38c.318-.33.672-.672 1.062-1.013C12.462 15.891 15.687 14 19.999 14a1 1 0 0 1 1 1v2.838l7.456-6.338L21 5.161z"
        />
      </svg>
    </button>
  </div>
</div>
```

## API

### Card API

| Type      | Modifiers                                               | Default | Description                |
| --------- | ------------------------------------------------------- | ------- | -------------------------- |
| Alignment | default, `.ui-actions.ui-align-end`                     | -       | Alignment for the actions. |
| Variants  | `.ui-elevated`, `.ui-outlined`, `.ui-text`, `.ui-tonal` | -       | The variant to use.        |

#### Parts

| Part          | Description                          |
| ------------- | ------------------------------------ |
| `.ui-card`    | Container element.                   |
| `<hgroup>`    | The card header.                     |
| `.ui-content` | The card content.                    |
| `.ui-actions` | A group of actions, such as buttons. |

#### CSS variables

| Variable             | Default                                     | Description                                                       |
| -------------------- | ------------------------------------------- | ----------------------------------------------------------------- |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))` | Default border color for cards, lists, tables and dividers.       |
| `--border-radius`    | `var(--size-2)`                             | Default corner radius for cards, callouts, tables and accordions. |
| `--border-width`     | `1px`                                       | Default border width for components that draw a border.           |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))` | Page and card background.                                         |
| `--surface-elevated` | `light-dark(var(--gray-1), var(--gray-12))` | Background of elevated cards and accordions.                      |
| `--surface-tonal`    | `light-dark(var(--gray-3), var(--gray-12))` | Background of tonal variants.                                     |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Under the hood

1. Base

   - A flex column: header, content and actions share one `gap`
   - Padding sits on the children, so media can go edge to edge
   - `overflow: hidden` clips children to the rounded corners

2. Variants

   - Variants only swap custom properties, the rules stay the same
   - `@container style(--color-scheme: dark)` picks a heavier shadow
   - Shadows barely show on dark surfaces, switch the site to dark mode to compare

3. Actions

   - `margin-block-start: auto` pins the actions to the bottom of a stretched card
   - `[class="ui-button"]` only matches a plain text button, no variant classes
   - A text button has no background, so the row shifts to line its label up with the text

Step 1 of 3: Base

- [Flexbox gap ](https://webstatus.dev/features/flexbox-gap)(Widely available): Chrome 84+, Edge 84+, Firefox 63+, Safari 14.1+
- [\<hgroup> ](https://webstatus.dev/features/hgroup)(Widely available): Chrome 5+, Edge 12+, Firefox 4+, Safari 5+

```html
<div class="card">
  <hgroup>
    <p>Overline</p>
    <h3>Headline</h3>
  </hgroup>
  <div class="content">…</div>
  <div class="actions">…</div>
</div>
```

```css
.card {
  --card-bg: var(--surface-default);
  --card-border: transparent;
  --card-border-width: 0;
  --card-shadow: none;
  background-color: var(--card-bg);
  border: var(--card-border-width) solid var(--card-border);
  border-radius: var(--radius-2);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-inline-size: 0;
  overflow: hidden;
  overflow-wrap: break-word;
}


.card > :is(hgroup, .content) {
  padding-inline: 0.75rem;
}


.card > hgroup {
  padding-block-start: 0.75rem;
}
```

Step 2 of 3: Variants

- [Container style queries ](https://webstatus.dev/features/container-style-queries)(Newly available): Chrome 111+, Edge 111+, Firefox 151+, Safari 18+
- [Custom properties ](https://webstatus.dev/features/custom-properties)(Widely available): Chrome 49+, Edge 15+, Firefox 31+, Safari 9.1+

```css
.tonal {
  --card-bg: var(--surface-tonal);
  --card-border: var(--surface-default);
  --card-border-width: 1px;
}


.elevated {
  --card-bg: var(--surface-elevated);
  --card-border: var(--surface-default);
  --card-border-width: 1px;
  --card-shadow: var(--shadow-3);


  @container style(--color-scheme: dark) {
    --card-shadow: var(--shadow-4);
  }
}
```

Step 3 of 3: Actions

- [`:has()` ](https://webstatus.dev/features/has)(Widely available): Chrome 105+, Edge 105+, Firefox 121+, Safari 15.4+

```css
.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-block-start: auto;
  padding: 0.5rem 0.75rem;
}


.actions:has(.ui-button:first-child[class="ui-button"]) {
  padding-inline: 0.25rem 0.75rem;
}
```

## Browser support

- Chromium: Full support Supported since v111.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Card.md).

## Installation

Other components might depend on the card component. Be mindful when making changes. [Accordion](https://open-props-ui.netlify.app/html/components/accordion.md), [Dialog](https://open-props-ui.netlify.app/html/components/dialog.md)

- `opui-css/css/components/card.css`

