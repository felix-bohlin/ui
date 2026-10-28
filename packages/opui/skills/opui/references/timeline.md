# Timeline

A list of dated events with markers and a connecting line.

- CSS: `opui-css/css/components/timeline.css`.
- Full docs with every example: [HTML](https://open-props-ui.netlify.app/html/components/timeline.md), [Astro](https://open-props-ui.netlify.app/astro/components/timeline.md), [React](https://open-props-ui.netlify.app/react/components/timeline.md), [Svelte](https://open-props-ui.netlify.app/svelte/components/timeline.md), [Vue](https://open-props-ui.netlify.app/vue/components/timeline.md).

## Timeline

### Parts

- `ol.ui-timeline` (root): Container element.
- `<li>` (`TimelineItem`): An event, with its marker and the line to the next one.

### Props and modifiers

- `items`: `TimelineItemData[]`. The items, as `{ color, current, datetime, description, headingLevel, label, time }` objects. `description` renders a paragraph.
- `size`: `"medium"` (default), `"small"` (`.ui-small`). The size of the element.
- `tracked`: `boolean`, `.ui-tracked`. Colors the line and the plain markers before the current item with the primary color, like a progress tracker.

### Slots

- `default`: The items.

## TimelineItem

### Parts

- `li` (root): An event.
- `.ui-marker` (slot `marker`): Replaces the dot with an icon. It follows the item's color and the current state.
- `<time>` (prop `datetime`, prop `time`): The date, in its own column.
- `<h3>` (prop `headingLevel`, prop `label`, slot `label`): The title of the event.

### Props and modifiers

- `color`: `"critical"` (`.ui-critical`), `"info"` (`.ui-info`), `"neutral"` (`.ui-neutral`), `"success"` (`.ui-success`), `"warning"` (`.ui-warning`). Optional colors.
- `current`: `"date" | "step" | "time" | boolean`, `[aria-current]`. Marks the current item, which fills its marker with the primary color and a halo. `true` renders `aria-current="true"`, and `"step"`, `"date"` or `"time"` that value.
- `datetime`: `string`, `time[datetime]`. The machine-readable date of `time`.
- `headingLevel`: `2 | 3 | 4 | 5 | 6`, default `3`. The heading level of `label`, so the item fits the page outline.
- `label`: `string`. The title of the event, rendered as a heading. Rich content goes in the `label` slot.
- `time`: `string`. The date as shown, in the date column.

### Slots

- `default`: The content of the event, after the title.

## Component properties

Set inputs on the component, inline or in your CSS. Outputs follow the variant and state, so never override them.

### timeline.css

- `--_dot-size`: Size of the plain marker dot. Defaults to `--ui-space-3`, `--ui-space-2` with `.ui-small`.
- `--_gap`: Space on each side of the marker column. Defaults to `--ui-space-3`, `--ui-space-2` with `.ui-small`.
- `--_icon-size`: Size of a `.ui-marker` with an icon. Defaults to `--ui-space-5`, `--ui-space-4` with `.ui-small`.
- `--_item-gap`: Space below each item. Defaults to `--ui-space-5`, `--ui-space-3` with `.ui-small`.
- `--_line-border-color`: Color of the line between the markers. Defaults to `--ui-border-color`, and `.ui-tracked` sets `--ui-primary` before the current item.
- `--_line-border-width`: Width of the line and the marker border. Defaults to `--ui-border-width-thick`.

Outputs: `--_marker-accent`, `--_marker-size` and `--_next-marker-size`.

## Theme tokens

The stylesheets read `--ui-border-color`, `--ui-border-width-thick`, `--ui-font-size-caption`, `--ui-on-primary`, `--ui-palette-on-strong`, `--ui-palette-strong`, `--ui-primary`, `--ui-radius-round`, `--ui-space-1`, `--ui-space-2`, `--ui-space-3`, `--ui-space-4`, `--ui-space-5`, `--ui-state-active-alpha-accent`, `--ui-surface` and `--ui-text-subtle`. `theming.md` and `tokens.json` describe them.

## HTML

### Example: Basics

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

## Astro

`import { Timeline, TimelineItem } from "opui-css/astro"`

- `TimelineItem` named slots: `label` and `marker`. Fill one with `slot="label"` on a child.

### Example: Basics

```astro
---
import { Timeline, TimelineItem } from "opui-css/astro"
---

<Timeline>
  <TimelineItem datetime="2026-08-04" time="Aug 4, 2026" label="Bug fixes">
    <p>Faster search and fewer duplicate notifications.</p>
  </TimelineItem>
  <TimelineItem datetime="2026-09-12" time="Sep 12, 2026" label="Saved views">
    <p>Save filters and sorting as named views and share them with a link.</p>
  </TimelineItem>
  <TimelineItem
    datetime="2026-10-01"
    time="Oct 1, 2026"
    label="Planning and a faster board"
  >
    <p>
      Estimates from past work, and a board that renders three times faster.
    </p>
  </TimelineItem>
</Timeline>
```

## React

`import { Timeline, TimelineItem } from "opui-css/react"`

- `TimelineItem` slot props (`ReactNode`): `children`, `label` and `marker`.

### Example: Basics

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Basics() {
  return (
    <Timeline>
      <TimelineItem datetime="2026-08-04" label="Bug fixes" time="Aug 4, 2026">
        <p>Faster search and fewer duplicate notifications.</p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-09-12"
        label="Saved views"
        time="Sep 12, 2026"
      >
        <p>
          Save filters and sorting as named views and share them with a link.
        </p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-10-01"
        label="Planning and a faster board"
        time="Oct 1, 2026"
      >
        <p>
          Estimates from past work, and a board that renders three times faster.
        </p>
      </TimelineItem>
    </Timeline>
  )
}
```

## Svelte

`import { Timeline, TimelineItem } from "opui-css/svelte"`

- `TimelineItem` slot snippets: `children`, `label` and `marker`.

### Example: Basics

```svelte
<script lang="ts">
  import { Timeline, TimelineItem } from "opui-css/svelte"
</script>

<Timeline>
  <TimelineItem datetime="2026-08-04" time="Aug 4, 2026" label="Bug fixes">
    <p>Faster search and fewer duplicate notifications.</p>
  </TimelineItem>
  <TimelineItem datetime="2026-09-12" time="Sep 12, 2026" label="Saved views">
    <p>Save filters and sorting as named views and share them with a link.</p>
  </TimelineItem>
  <TimelineItem
    datetime="2026-10-01"
    time="Oct 1, 2026"
    label="Planning and a faster board"
  >
    <p>
      Estimates from past work, and a board that renders three times faster.
    </p>
  </TimelineItem>
</Timeline>
```

## Vue

`import { Timeline, TimelineItem } from "opui-css/vue"`

- `TimelineItem` named slots: `label` and `marker`. Fill one with `<template #label>`.

### Example: Basics

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem datetime="2026-08-04" time="Aug 4, 2026" label="Bug fixes">
      <p>Faster search and fewer duplicate notifications.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-09-12" time="Sep 12, 2026" label="Saved views">
      <p>Save filters and sorting as named views and share them with a link.</p>
    </TimelineItem>
    <TimelineItem
      datetime="2026-10-01"
      time="Oct 1, 2026"
      label="Planning and a faster board"
    >
      <p>
        Estimates from past work, and a board that renders three times faster.
      </p>
    </TimelineItem>
  </Timeline>
</template>
```
