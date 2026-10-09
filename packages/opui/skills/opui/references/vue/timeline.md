# Timeline

An ordered list of dated events with markers and a connecting line. The dates line up in their own column, whatever their length.

## Anatomy

1. Sep 2

   ### Design freeze

   Final screens handed off.

2. Oct 31
   ### Launch

- `<TimelineItem>`

  An event. Content after the title goes in the content column.

- `time`

  The date, in its own column. Above the title in narrow timelines.

- `v-slot:marker`

  Optional custom marker, such as an icon. Replaces the dot.

- `title`

  The title.

## Basics

Each `TimelineItem` takes a `time`, a `datetime` and a `title`, and its content in the default slot. The title is an `h3`. Set `headingLevel` to fit your page outline, or leave out `title` and put your own heading in the default slot.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem datetime="2026-08-04" time="Aug 4, 2026" title="Bug fixes">
      <p>Faster search and fewer duplicate notifications.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-09-12" time="Sep 12, 2026" title="Saved views">
      <p>Save filters and sorting as named views and share them with a link.</p>
    </TimelineItem>
    <TimelineItem
      datetime="2026-10-01"
      time="Oct 1, 2026"
      title="Planning and a faster board"
    >
      <p>
        Estimates from past work, and a board that renders three times faster.
      </p>
    </TimelineItem>
  </Timeline>
</template>
```

Browsers without subgrid give each item its own columns, so dates of different lengths don't line up.

## Colors

Set `color` and the other tones on an item to fill its marker. Say the status in the text too, since the color isn't announced.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem
      color="critical"
      datetime="2026-10-08T12:18"
      time="12:18"
      title="Investigating"
    >
      <p>Search is slower in eu-north.</p>
    </TimelineItem>
    <TimelineItem
      color="warning"
      datetime="2026-10-08T13:40"
      time="13:40"
      title="Identified"
    >
      <p>An index rebuild competes with live traffic.</p>
    </TimelineItem>
    <TimelineItem
      color="info"
      datetime="2026-10-08T14:05"
      time="14:05"
      title="Monitoring"
    >
      <p>Response times are back to normal.</p>
    </TimelineItem>
    <TimelineItem
      color="success"
      datetime="2026-10-08T15:30"
      time="15:30"
      title="Resolved"
    >
      <p>The rebuild finished. No data was lost.</p>
    </TimelineItem>
    <TimelineItem
      color="neutral"
      datetime="2026-10-09T09:00"
      time="Oct 9"
      title="Postmortem"
    >
      <p>A full report follows within a week.</p>
    </TimelineItem>
  </Timeline>
</template>
```

## Small

`size="small"` makes the markers and the spacing smaller, for logs and dense lists.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline size="small">
    <TimelineItem datetime="2026-10-08T09:12" time="09:12">
      <p>Build started.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-08T09:15" time="09:15">
      <p>Tests passed.</p>
    </TimelineItem>
    <TimelineItem color="success" datetime="2026-10-08T09:16" time="09:16">
      <p>Deployed to production.</p>
    </TimelineItem>
  </Timeline>
</template>
```

## Custom marker

Put an icon in the `marker` slot to replace the dot. It follows the item's color and the current state.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem
      color="success"
      datetime="2026-10-01"
      time="Oct 1"
      title="Ordered"
    >
      <template #marker
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
      ></template>
    </TimelineItem>
    <TimelineItem
      color="success"
      datetime="2026-10-02"
      time="Oct 2"
      title="Packed"
    >
      <template #marker
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
      ></template>
    </TimelineItem>
    <TimelineItem
      color="success"
      datetime="2026-10-03"
      time="Oct 3"
      title="Shipped"
    >
      <template #marker
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
      ></template>
      <p>On its way from Gothenburg.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-06" time="Oct 6" title="Delivered" />
  </Timeline>
</template>
```

## Current item

Set `current` on the current item. `current="step"` fits a milestone, and `current` alone renders `aria-current="true"`. Its marker gets the primary color and a halo.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline>
    <TimelineItem datetime="2026-09-02" time="Sep 2" title="Design freeze" />
    <TimelineItem
      datetime="2026-09-16"
      time="Sep 16"
      title="Feature complete"
    />
    <TimelineItem
      current="step"
      datetime="2026-10-14"
      time="Oct 14"
      title="Beta review"
    >
      <p>Moved from October 10.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-31" time="Oct 31" title="Launch" />
  </Timeline>
</template>
```

## Progress

`progress` colors the line up to the current item, and the markers before it that have no color.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline progress>
    <TimelineItem datetime="2026-09-02" time="Sep 2" title="Design freeze" />
    <TimelineItem
      datetime="2026-09-16"
      time="Sep 16"
      title="Feature complete"
    />
    <TimelineItem
      current="step"
      datetime="2026-10-14"
      time="Oct 14"
      title="Beta review"
    >
      <p>Moved from October 10.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-31" time="Oct 31" title="Launch" />
  </Timeline>
</template>
```

## Narrow containers

When the timeline is narrower than `24rem`, the dates move above the titles and the date column closes. It responds to its own width, so it works in sidebars and cards too. Browsers without container queries keep the date column.

```vue
<script setup lang="ts">
import { Timeline, TimelineItem } from "opui-css/vue"
</script>

<template>
  <Timeline style="max-inline-size: 20rem">
    <TimelineItem datetime="2026-09-02" time="Sep 2" title="Design freeze" />
    <TimelineItem
      datetime="2026-09-16"
      time="Sep 16"
      title="Feature complete"
    />
    <TimelineItem
      current="step"
      datetime="2026-10-14"
      time="Oct 14"
      title="Beta review"
    >
      <p>Moved from October 10.</p>
    </TimelineItem>
    <TimelineItem datetime="2026-10-31" time="Oct 31" title="Launch" />
  </Timeline>
</template>
```

## Items

Pass `items` to render the list from data. Each `description` renders a paragraph. Use `TimelineItem` for custom markers or richer content.

```vue
<script setup lang="ts">
import { Timeline } from "opui-css/vue"

const releases = [
  {
    datetime: "2026-04-02",
    description: "The first stable release.",
    time: "Apr 2, 2026",
    title: "Version 1.0",
  },
  {
    datetime: "2026-06-18",
    description: "Dark mode and keyboard shortcuts.",
    time: "Jun 18, 2026",
    title: "Version 1.1",
  },
  {
    current: true,
    datetime: "2026-10-01",
    description: "A new board and saved views.",
    time: "Oct 1, 2026",
    title: "Version 2.0",
  },
]
</script>

<template>
  <Timeline :items="releases" />
</template>
```

## Accessibility

The timeline is an `ol`, so screen readers announce the number of events and the position of each. Add `reversed` when the newest event comes first.

Put dates in a `<time>` with a `datetime` attribute. The dots and the line are drawn with pseudo-elements and aren't announced. Give icons in a custom marker `aria-hidden="true"`.

`aria-current` tells screen readers which item is current. Colors are only visual, so name the status in the text.

In forced colors mode the line and markers use system colors, colored markers are filled with `CanvasText`, and the current marker and the progress line use `Highlight`.

## API

### Timeline API

| Prop       | Type      | Default | Description                                                                                                                      |
| ---------- | --------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `items`    | `Entry[]` | -       | The items, as `{ color, current, datetime, description, headingLevel, time, title }` objects. `description` renders a paragraph. |
| `progress` | `boolean` | `false` | Colors the line and the plain markers before the current item with the primary color.                                            |
| `size`     | `"small"` | -       | The size of the element.                                                                                                         |

#### Slots

| Slot      | Description |
| --------- | ----------- |
| `default` | The items.  |

#### CSS variables

| Variable             | Default                                                                               | Description                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--primary`          | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast` | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

### Timeline item API

| Prop           | Type                                                              | Default | Description                                                                                    |
| -------------- | ----------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `color`        | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -       | Optional colors. Fills the marker.                                                             |
| `current`      | `boolean` , `"time"` , `"step"` , `"date"`                        | `false` | Marks the current item with a primary marker and a halo. `true` renders `aria-current="true"`. |
| `datetime`     | `string`                                                          | -       | The machine-readable date or time.                                                             |
| `headingLevel` | `2` , `3` , `4` , `5` , `6`                                       | `3`     | The heading level of the title.                                                                |
| `time`         | `string`                                                          | -       | The visible date or time. Renders a `<time>`.                                                  |
| `title`        | `string`                                                          | -       | The title. Renders a heading with `.ui-h6`.                                                    |

#### Slots

| Slot      | Description                                                |
| --------- | ---------------------------------------------------------- |
| `default` | The event content, such as a paragraph.                    |
| `marker`  | Optional custom marker, such as an icon. Replaces the dot. |

#### CSS variables

| Variable             | Default                                                                               | Description                                                                                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`     | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--primary`          | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast` | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--surface-default`  | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`       | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

Theme tokens this component reads. Override them on `html` or on a wrapper. See [theme tokens](https://open-props-ui.netlify.app/vue/guide/theme-tokens.md) for the full list.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/vue/guide/browser-support/?components=Timeline.md).

## Installation

Import the components from `opui-css/vue`:

- `opui-css/css/components/timeline.css`

## Changelog

### What's new

- New component. A [timeline](#basics) of dated events whose dates line up in their own column, with colors, custom markers and progress.
