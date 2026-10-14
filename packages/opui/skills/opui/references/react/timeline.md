# Timeline

An ordered list of dated events with markers and a connecting line. The dates line up in their own column, whatever their length.

## Anatomy

1. Sep 2

   ### Design freeze

   Final screens handed off.

2. Oct 31
   ### Launch

- `<TimelineItem>`

  An event. Content after the heading goes in the content column.

- `time`

  The date, in its own column. Above the heading in narrow timelines.

- `marker`

  Optional custom marker, such as an icon. Replaces the dot.

- `heading`

  The heading.

## Basics

Each `TimelineItem` takes a `time`, a `datetime` and a `heading`, and its content as children. The heading is an `h3`. Set `headingLevel` to fit your page outline, or leave out `heading` and put your own heading in the children.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Basics() {
  return (
    <Timeline>
      <TimelineItem
        datetime="2026-08-04"
        heading="Bug fixes"
        time="Aug 4, 2026"
      >
        <p>Faster search and fewer duplicate notifications.</p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-09-12"
        heading="Saved views"
        time="Sep 12, 2026"
      >
        <p>
          Save filters and sorting as named views and share them with a link.
        </p>
      </TimelineItem>
      <TimelineItem
        datetime="2026-10-01"
        heading="Planning and a faster board"
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

Browsers without subgrid give each item its own columns, so dates of different lengths don't line up.

## Colors

Set `color` and the other tones on an item to fill its marker. Say the status in the text too, since the color isn't announced.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Colors() {
  return (
    <Timeline>
      <TimelineItem
        color="critical"
        datetime="2026-10-08T12:18"
        heading="Investigating"
        time="12:18"
      >
        <p>Search is slower in eu-north.</p>
      </TimelineItem>
      <TimelineItem
        color="warning"
        datetime="2026-10-08T13:40"
        heading="Identified"
        time="13:40"
      >
        <p>An index rebuild competes with live traffic.</p>
      </TimelineItem>
      <TimelineItem
        color="info"
        datetime="2026-10-08T14:05"
        heading="Monitoring"
        time="14:05"
      >
        <p>Response times are back to normal.</p>
      </TimelineItem>
      <TimelineItem
        color="success"
        datetime="2026-10-08T15:30"
        heading="Resolved"
        time="15:30"
      >
        <p>The rebuild finished. No data was lost.</p>
      </TimelineItem>
      <TimelineItem
        color="neutral"
        datetime="2026-10-09T09:00"
        heading="Postmortem"
        time="Oct 9"
      >
        <p>A full report follows within a week.</p>
      </TimelineItem>
    </Timeline>
  )
}
```

## Sizes

`size="small"` makes the markers and the spacing smaller, for logs and dense lists.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Sizes() {
  return (
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
  )
}
```

## Custom marker

Put an icon in the `marker` prop to replace the dot. It follows the item's color and the current state.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

const check = (
  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
)

export default function CustomMarker() {
  return (
    <Timeline>
      <TimelineItem
        color="success"
        datetime="2026-10-01"
        heading="Ordered"
        marker={check}
        time="Oct 1"
      />
      <TimelineItem
        color="success"
        datetime="2026-10-02"
        heading="Packed"
        marker={check}
        time="Oct 2"
      />
      <TimelineItem
        color="success"
        datetime="2026-10-03"
        heading="Shipped"
        marker={check}
        time="Oct 3"
      >
        <p>On its way from Gothenburg.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-06" heading="Delivered" time="Oct 6">
        <p>Expected</p>
      </TimelineItem>
    </Timeline>
  )
}
```

## Current item

Set `current` on the current item. `current="step"` fits a milestone, and `current` alone renders `aria-current="true"`. Its marker gets the primary color and a halo.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Current() {
  return (
    <Timeline>
      <TimelineItem
        datetime="2026-09-02"
        heading="Design freeze"
        time="Sep 2"
      />
      <TimelineItem
        datetime="2026-09-16"
        heading="Feature complete"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        heading="Beta review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-31" heading="Launch" time="Oct 31" />
    </Timeline>
  )
}
```

## Progress

`progress` colors the line up to the current item, and the markers before it that have no color.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Progress() {
  return (
    <Timeline progress>
      <TimelineItem
        datetime="2026-09-02"
        heading="Design freeze"
        time="Sep 2"
      />
      <TimelineItem
        datetime="2026-09-16"
        heading="Feature complete"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        heading="Beta review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-31" heading="Launch" time="Oct 31" />
    </Timeline>
  )
}
```

## Narrow containers

When the timeline is narrower than `24rem`, the dates move above the titles and the date column closes. It responds to its own width, so it works in sidebars and cards too. Browsers without container queries keep the date column.

```tsx
import { Timeline, TimelineItem } from "opui-css/react"

export default function Narrow() {
  return (
    <Timeline style={{ maxInlineSize: "20rem" }}>
      <TimelineItem
        datetime="2026-09-02"
        heading="Design freeze"
        time="Sep 2"
      />
      <TimelineItem
        datetime="2026-09-16"
        heading="Feature complete"
        time="Sep 16"
      />
      <TimelineItem
        current="step"
        datetime="2026-10-14"
        heading="Beta review"
        time="Oct 14"
      >
        <p>Moved from October 10.</p>
      </TimelineItem>
      <TimelineItem datetime="2026-10-31" heading="Launch" time="Oct 31" />
    </Timeline>
  )
}
```

## Items

Pass `items` to render the list from data. Each `description` renders a paragraph. Use `TimelineItem` for custom markers or richer content.

```tsx
import { Timeline } from "opui-css/react"

const releases = [
  {
    datetime: "2026-04-02",
    description: "The first stable release.",
    heading: "Version 1.0",
    time: "Apr 2, 2026",
  },
  {
    datetime: "2026-06-18",
    description: "Dark mode and keyboard shortcuts.",
    heading: "Version 1.1",
    time: "Jun 18, 2026",
  },
  {
    current: true,
    datetime: "2026-10-01",
    description: "A new board and saved views.",
    heading: "Version 2.0",
    time: "Oct 1, 2026",
  },
]

export default function Items() {
  return <Timeline items={releases} />
}
```

## Accessibility

The timeline is an `ol`, so screen readers announce the number of events and the position of each. Put the items in the order you want them read; the list has no visible numbers, so `reversed` changes nothing.

Put dates in a `<time>` with a `datetime` attribute. The dots and the line are drawn with pseudo-elements and aren't announced. Give icons in a custom marker `aria-hidden="true"`.

`aria-current` tells screen readers which item is current. Colors are only visual, so name the status in the text.

In forced colors mode the line and markers use system colors, colored markers are filled with `CanvasText`, and the current marker and the progress line use `Highlight`.

## API

### Timeline API

| Prop       | Type        | Default | Description                                                                                                                        |
| ---------- | ----------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `children` | `ReactNode` | -       | The items.                                                                                                                         |
| `items`    | `Entry[]`   | -       | The items, as `{ color, current, datetime, description, heading, headingLevel, time }` objects. `description` renders a paragraph. |
| `progress` | `boolean`   | `false` | Colors the line and the plain markers before the current item with the primary color.                                              |
| `size`     | `"small"`   | -       | The size of the element.                                                                                                           |

#### CSS variables

| Variable                      | Default                                                                               | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-width`              | `1px`                                                                                 | Default border width for components that draw a border.                                                                                                                                                      |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`          | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--state-active-alpha-accent` | `25%`                                                                                 | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                            |
| `--surface-default`           | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

### Timeline item API

| Prop           | Type                                                              | Default | Description                                                                                    |
| -------------- | ----------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| `children`     | `ReactNode`                                                       | -       | The event content, such as a paragraph.                                                        |
| `color`        | `"critical"` , `"info"` , `"neutral"` , `"success"` , `"warning"` | -       | Optional colors. Fills the marker.                                                             |
| `current`      | `boolean` , `"time"` , `"step"` , `"date"`                        | `false` | Marks the current item with a primary marker and a halo. `true` renders `aria-current="true"`. |
| `datetime`     | `string`                                                          | -       | The machine-readable date or time.                                                             |
| `heading`      | `string`                                                          | -       | The heading. Renders a heading element with `.ui-h6`.                                          |
| `headingLevel` | `2` , `3` , `4` , `5` , `6`                                       | `3`     | The level of the heading.                                                                      |
| `marker`       | `ReactNode`                                                       | -       | Optional custom marker, such as an icon. Replaces the dot.                                     |
| `time`         | `string`                                                          | -       | The visible date or time. Renders a `<time>`.                                                  |

#### CSS variables

| Variable                      | Default                                                                               | Description                                                                                                                                                                                                  |
| ----------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `--border-color`              | `light-dark(var(--gray-4), var(--gray-12))`                                           | Default border color for cards, lists, tables and dividers.                                                                                                                                                  |
| `--border-width`              | `1px`                                                                                 | Default border width for components that draw a border.                                                                                                                                                      |
| `--primary`                   | `light-dark(var(--color-9), var(--color-6))`                                          | Brand color for primary actions and accents.                                                                                                                                                                 |
| `--primary-contrast`          | `oklch( from var(--primary) clamp(0.15, (0.565 - l) * 1000, 0.98) calc(c * 0.15) h )` | Text color on `--primary`. Derived with relative color: near-black when the primary's lightness is above 0.565, near-white below, tinted with 15% of its chroma, so a custom `--primary` gets readable text. |
| `--state-active-alpha-accent` | `25%`                                                                                 | Alpha of the pressed state layer on primary and critical buttons.                                                                                                                                            |
| `--surface-default`           | `light-dark(var(--gray-1), var(--gray-13))`                                           | Page and card background.                                                                                                                                                                                    |
| `--text-muted`                | `light-dark(var(--gray-13), var(--gray-4))`                                           | Body text color.                                                                                                                                                                                             |

This component uses these theme tokens. Override them on `html` or on a wrapper. See all [theme tokens](https://open-props-ui.netlify.app/react/guide/theme-tokens.md).

## Under the hood

`ol.ui-timeline` is a grid with `[date] auto [marker] auto [content] minmax(0, 1fr)` columns, and each `li` spans it with `grid-template-columns: subgrid`, so every date shares one column. The `time` goes in the `date` column and everything else in `content`.

`li::before` is the dot and `li:not(:last-child)::after` the line, both in the `marker` column. The dot is centered on the first line of text with `margin-block-start: calc((1lh - var(--_marker-size)) / 2)`, and the line starts and ends relative to the markers above and below it, which `li:has(+ li > .ui-marker)` sizes for a custom marker. A `.ui-marker` child replaces the dot with `content: none`.

`li[aria-current]` fills the marker with `--primary` and a translucent `box-shadow` halo, and `.ui-with-progress > li:has(~ li[aria-current])` colors the line and the uncolored markers before it. The container query under `24rem` moves `time` into the `content` column.

## Browser support

- Chromium: Full support Supported since v125.
- Firefox: Full support Supported since v151.
- Safari: Full support Supported since v18.

Explore these features in the [browser support guide](https://open-props-ui.netlify.app/react/guide/browser-support/?components=Timeline.md).

## Installation

Import the components from `opui-css/react`:

- `opui-css/css/components/timeline.css`

## Changelog

### What's new

- New component. A [timeline](#basics) of dated events whose dates line up in their own column, with colors, custom markers and progress.
