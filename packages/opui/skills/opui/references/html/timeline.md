# Timeline

An ordered list of dated events with markers and a connecting line. The dates line up in their own column, whatever their length.

## Anatomy

1. Sep 2

   ### Design freeze

   Final screens handed off.

2. Oct 31
   ### Launch

- `<li>`

  An event. Content after the title goes in the content column.

- `<time>`

  The date, in its own column. Above the title in narrow timelines.

- `.ui-marker`

  Optional custom marker, such as an icon. Replaces the dot.

- `<h3>`

  The title.

## Basics

Each `li` holds a `<time>`, a heading and its content. The dates share the first column through subgrid. Pick the heading level that fits your page outline.

```html
<ol class="ui-timeline">
  <li>
    <time datetime="2026-08-04">Aug 4, 2026</time>
    <h3 class="ui-h6">Bug fixes</h3>
    <p>Faster search and fewer duplicate notifications.</p>
  </li>
  <li>
    <time datetime="2026-09-12">Sep 12, 2026</time>
    <h3 class="ui-h6">Saved views</h3>
    <p>Save filters and sorting as named views and share them with a link.</p>
  </li>
  <li>
    <time datetime="2026-10-01">Oct 1, 2026</time>
    <h3 class="ui-h6">Planning and a faster board</h3>
    <p>
      Estimates from past work, and a board that renders three times faster.
    </p>
  </li>
</ol>
```

Browsers without subgrid give each item its own columns, so dates of different lengths don't line up.

## Colors

Set `.ui-critical` and the other tones on an item to fill its marker. Say the status in the text too, since the color isn't announced.

```html
<ol class="ui-timeline">
  <li class="ui-critical">
    <time datetime="2026-10-08T12:18">12:18</time>
    <h3 class="ui-h6">Investigating</h3>
    <p>Search is slower in eu-north.</p>
  </li>
  <li class="ui-warning">
    <time datetime="2026-10-08T13:40">13:40</time>
    <h3 class="ui-h6">Identified</h3>
    <p>An index rebuild competes with live traffic.</p>
  </li>
  <li class="ui-info">
    <time datetime="2026-10-08T14:05">14:05</time>
    <h3 class="ui-h6">Monitoring</h3>
    <p>Response times are back to normal.</p>
  </li>
  <li class="ui-success">
    <time datetime="2026-10-08T15:30">15:30</time>
    <h3 class="ui-h6">Resolved</h3>
    <p>The rebuild finished. No data was lost.</p>
  </li>
  <li class="ui-neutral">
    <time datetime="2026-10-09T09:00">Oct 9</time>
    <h3 class="ui-h6">Postmortem</h3>
    <p>A full report follows within a week.</p>
  </li>
</ol>
```

## Small

`.ui-small` makes the markers and the spacing smaller, for logs and dense lists.

```html
<ol class="ui-timeline ui-small">
  <li>
    <time datetime="2026-10-08T09:12">09:12</time>
    <p>Build started.</p>
  </li>
  <li>
    <time datetime="2026-10-08T09:15">09:15</time>
    <p>Tests passed.</p>
  </li>
  <li class="ui-success">
    <time datetime="2026-10-08T09:16">09:16</time>
    <p>Deployed to production.</p>
  </li>
</ol>
```

## Custom marker

Put an icon in a `span.ui-marker` at the start of the `li` to replace the dot. It follows the item's color and the current state.

```html
<ol class="ui-timeline">
  <li class="ui-success">
    <span class="ui-marker"
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5"></path></svg
    ></span>
    <time datetime="2026-10-01">Oct 1</time>
    <h3 class="ui-h6">Ordered</h3>
  </li>
  <li class="ui-success">
    <span class="ui-marker"
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5"></path></svg
    ></span>
    <time datetime="2026-10-02">Oct 2</time>
    <h3 class="ui-h6">Packed</h3>
  </li>
  <li class="ui-success">
    <span class="ui-marker"
      ><svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20 6 9 17l-5-5"></path></svg
    ></span>
    <time datetime="2026-10-03">Oct 3</time>
    <h3 class="ui-h6">Shipped</h3>
    <p>On its way from Gothenburg.</p>
  </li>
  <li>
    <time datetime="2026-10-06">Oct 6</time>
    <h3 class="ui-h6">Delivered</h3>
  </li>
</ol>
```

## Current item

Add `aria-current` to the current item, such as `aria-current="step"` for a milestone or `aria-current="true"` for the latest update. Its marker gets the primary color and a halo.

```html
<ol class="ui-timeline">
  <li>
    <time datetime="2026-09-02">Sep 2</time>
    <h3 class="ui-h6">Design freeze</h3>
  </li>
  <li>
    <time datetime="2026-09-16">Sep 16</time>
    <h3 class="ui-h6">Feature complete</h3>
  </li>
  <li aria-current="step">
    <time datetime="2026-10-14">Oct 14</time>
    <h3 class="ui-h6">Beta review</h3>
    <p>Moved from October 10.</p>
  </li>
  <li>
    <time datetime="2026-10-31">Oct 31</time>
    <h3 class="ui-h6">Launch</h3>
  </li>
</ol>
```

## Progress

`.ui-with-progress` colors the line up to the current item, and the markers before it that have no color.

```html
<ol class="ui-timeline ui-with-progress">
  <li>
    <time datetime="2026-09-02">Sep 2</time>
    <h3 class="ui-h6">Design freeze</h3>
  </li>
  <li>
    <time datetime="2026-09-16">Sep 16</time>
    <h3 class="ui-h6">Feature complete</h3>
  </li>
  <li aria-current="step">
    <time datetime="2026-10-14">Oct 14</time>
    <h3 class="ui-h6">Beta review</h3>
    <p>Moved from October 10.</p>
  </li>
  <li>
    <time datetime="2026-10-31">Oct 31</time>
    <h3 class="ui-h6">Launch</h3>
  </li>
</ol>
```

## Narrow containers

When the timeline is narrower than `24rem`, the dates move above the titles and the date column closes. It responds to its own width, so it works in sidebars and cards too. Browsers without container queries keep the date column.

```html
<ol class="ui-timeline" style="max-inline-size: 20rem">
  <li>
    <time datetime="2026-09-02">Sep 2</time>
    <h3 class="ui-h6">Design freeze</h3>
  </li>
  <li>
    <time datetime="2026-09-16">Sep 16</time>
    <h3 class="ui-h6">Feature complete</h3>
  </li>
  <li aria-current="step">
    <time datetime="2026-10-14">Oct 14</time>
    <h3 class="ui-h6">Beta review</h3>
    <p>Moved from October 10.</p>
  </li>
  <li>
    <time datetime="2026-10-31">Oct 31</time>
    <h3 class="ui-h6">Launch</h3>
  </li>
</ol>
```

## Items

The markup the `items` prop renders in Astro, Svelte and Vue: one `li` per item, with the description in a `p`.

```html
<ol class="ui-timeline">
  <li>
    <time datetime="2026-04-02">Apr 2, 2026</time>
    <h3 class="ui-h6">Version 1.0</h3>
    <p>The first stable release.</p>
  </li>
  <li>
    <time datetime="2026-06-18">Jun 18, 2026</time>
    <h3 class="ui-h6">Version 1.1</h3>
    <p>Dark mode and keyboard shortcuts.</p>
  </li>
  <li aria-current="true">
    <time datetime="2026-10-01">Oct 1, 2026</time>
    <h3 class="ui-h6">Version 2.0</h3>
    <p>A new board and saved views.</p>
  </li>
</ol>
```

## Accessibility

The timeline is an `ol`, so screen readers announce the number of events and the position of each. Add `reversed` when the newest event comes first.

Put dates in a `<time>` with a `datetime` attribute. The dots and the line are drawn with pseudo-elements and aren't announced. Give icons in a custom marker `aria-hidden="true"`.

`aria-current` tells screen readers which item is current. Colors are only visual, so name the status in the text.

In forced colors mode the line and markers use system colors, colored markers are filled with `CanvasText`, and the current marker and the progress line use `Highlight`.

## API

### Timeline API

| Type     | Modifiers           | Default | Description                                                                           |
| -------- | ------------------- | ------- | ------------------------------------------------------------------------------------- |
| Progress | `.ui-with-progress` | -       | Colors the line and the plain markers before the current item with the primary color. |
| Sizes    | `.ui-small`         | -       | The size of the element.                                                              |

#### Parts

| Part             | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `ol.ui-timeline` | Container element.                                      |
| `<li>`           | An event, with its marker and the line to the next one. |

#### CSS variables

| Variable             | Default                                                                               | Description                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--primary`          | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast` | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

### Timeline item API

| Type   | Modifiers                                                               | Default | Description                                              |
| ------ | ----------------------------------------------------------------------- | ------- | -------------------------------------------------------- |
| Colors | `.ui-critical`, `.ui-info`, `.ui-neutral`, `.ui-success`, `.ui-warning` | -       | Optional colors. Fills the marker.                       |
| Date   | `time[datetime]`                                                        | -       | The machine-readable date or time.                       |
| State  | `[aria-current]`                                                        | -       | Marks the current item with a primary marker and a halo. |

#### Parts

| Part         | Description                                                       |
| ------------ | ----------------------------------------------------------------- |
| `<li>`       | An event. Content after the title goes in the content column.     |
| `<time>`     | The date, in its own column. Above the title in narrow timelines. |
| `.ui-marker` | Optional custom marker, such as an icon. Replaces the dot.        |
| `<h3>`       | The title.                                                        |

#### CSS variables

| Variable             | Default                                                                               | Description                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--primary`          | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast` | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/html/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/html/guide/browser-support/?components=Timeline.md).

## Installation

- `opui-css/css/components/timeline.css`

## Changelog

### What's new

- New component. A [timeline](#basics) of dated events whose dates line up in their own column, with colors, custom markers and progress.
