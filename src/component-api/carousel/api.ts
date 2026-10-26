import type { ComponentApi } from "../types"

export default {
  component: "Carousel",
  keyboard: [
    {
      description:
        "Moves focus to the current marker, then the previous and next buttons, then the scroll box. A disabled button is skipped, and the scroll box only takes focus when its items hold nothing focusable.",
      keys: ["Tab"],
    },
    {
      description:
        "On the previous or next button, scrolls by one view. The button that reaches the start or end gets disabled, and focus moves to the page.",
      keys: ["Enter", "Space"],
    },
    {
      description:
        "On a marker, moves to the previous or next marker and scrolls to its item, wrapping around at the ends. In the scroll box, scrolls to the previous or next item along the carousel's axis. Left and Right follow the reading direction.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
  notes: {
    default:
      "Smooth scrolling follows `--ui-motion`: `.ui-motion-off` on the carousel or a parent turns it off.",
    html: "The root is a `<ul>` with an `aria-label`. CSS adds the buttons, and `.ui-markers` the markers. Smooth scrolling follows `--ui-motion`: `.ui-motion-off` on the carousel or a parent turns it off.",
  },
  options: [
    {
      default: '"start"',
      description: "Where items snap.",
      group: "Alignment",
      prop: "align",
      values: { center: ".ui-align-center", start: null },
    },
    {
      attribute: "[aria-label]",
      description: "Accessible name of the carousel.",
      group: "Label",
      inherited: true,
      prop: "aria-label",
      type: "string",
    },
    {
      cssVar: "--_media-aspect-ratio",
      default: '"16 / 9"',
      description:
        "Aspect ratio that images, videos and iframes are cropped to.",
      group: "Aspect ratio",
      prop: "aspectRatio",
    },
    {
      default: '"inside"',
      description:
        'Previous and next buttons. `"outside"` places them beside the items, and `"none"` leaves them out.',
      group: "Buttons",
      prop: "buttons",
      values: {
        inside: null,
        none: ".ui-buttons-none",
        outside: ".ui-buttons-outside",
      },
    },
    {
      cssVar: "--_items-per-view",
      default: "1",
      description: "Number of visible items.",
      group: "Items per view",
      prop: "itemsPerView",
    },
    {
      class: ".ui-markers",
      default: "false",
      description: "One marker per item, after the list.",
      group: "Markers",
      prop: "markers",
    },
    {
      default: '"horizontal"',
      description:
        "The orientation of the element. A vertical carousel is `--_block-size` tall, `24rem` by default.",
      group: "Orientation",
      prop: "orientation",
      values: { horizontal: null, vertical: ".ui-vertical" },
    },
    {
      class: ".ui-peek",
      default: "false",
      description: "Shows part of the neighboring items.",
      group: "Peek",
      prop: "peek",
    },
    {
      class: ".ui-persistent-buttons",
      default: "false",
      description:
        "Keeps the buttons visible at the ends. A disabled button has a muted border.",
      group: "Persistent buttons",
      prop: "persistentButtons",
    },
    {
      class: ".ui-stretch",
      default: "false",
      description:
        "Makes each item a grid, so its content (a card, a link) fills the item's height. Media with an aspect ratio keeps it.",
      group: "Stretch",
      prop: "stretch",
    },
  ],
  parts: [
    {
      code: "<li>",
      description: "An item.",
      selector: ".ui-carousel > :first-child",
      slots: ["default"],
    },
    {
      code: "::scroll-button(inline-start)",
      description:
        "The previous button. `::scroll-button(block-start)` when vertical.",
      props: ["buttons"],
      selector: ".ui-carousel::scroll-button(inline-start)",
    },
    {
      code: "::scroll-button(inline-end)",
      description:
        "The next button. `::scroll-button(block-end)` when vertical.",
      props: ["buttons"],
      selector: ".ui-carousel::scroll-button(inline-end)",
    },
    {
      code: "li::scroll-marker",
      description: "A marker, one per item.",
      props: ["markers"],
      selector: ".ui-carousel > :first-child::scroll-marker",
    },
  ],
  root: {
    anchorName: "--ui-carousel",
    description: "The scroller.",
    selector: "ul.ui-carousel",
  },
  source: "Carousel",
} satisfies ComponentApi
