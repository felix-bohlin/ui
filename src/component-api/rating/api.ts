import type { ComponentApi } from "../types"

export default {
  component: "Rating",
  css: ["rating"],
  keyboard: [
    {
      description:
        "Moves focus into the input, to the checked radio, or to the first one when none is checked. The next Tab leaves it.",
      keys: ["Tab"],
    },
    {
      description:
        "Moves to the previous or next star and checks it. Left and Right follow the reading direction.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
  ],
  model: {
    description:
      "The score of the meter, fractions included, or the checked star of the input.",
    prop: "value",
    type: "number | string",
  },
  notes: {
    default:
      "Extra attributes go to the `<fieldset>` or the `<meter>`, except `aria-describedby` and `aria-invalid`, which go to every radio.",
    html: "Add `.ui-rating` to a `<meter>` with `max` and `value`, or to a `<fieldset>` with a `<legend>` and one radio per star.",
    react: "Use `value` with `onChange`, or `defaultValue`.",
    svelte: "Bind the input with `bind:value`.",
    vue: "Bind the input with `v-model`.",
  },
  options: [
    {
      default: '"No rating"',
      description:
        "The accessible name of the radio that clears the rating. Not rendered with `required`.",
      prop: "clearLabel",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Disables the input.",
      group: "Disabled",
      part: "fieldset",
      prop: "disabled",
    },
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the radios invalid and tints the empty stars.",
      group: "Validation",
      part: "input",
      prop: "error",
    },
    {
      description:
        "The `<legend>` of the input, or the `aria-label` of the meter. Include the score in a meter label.",
      prop: "label",
    },
    {
      attribute: "[max]",
      cssVar: "--_max",
      default: "5",
      description: "Number of stars.",
      group: "Max",
      htmlDescription:
        "Number of stars, read with typed `attr()`. Browsers without it read `--_max`, so set both.",
      prop: "max",
    },
    {
      description:
        "Renders the input: a `<fieldset>` of radios with this name. Without it, a read-only `<meter>`.",
      prop: "name",
    },
    {
      description: "Called when a star or the clear radio is picked.",
      frameworks: ["react"],
      prop: "onChange",
      type: "ChangeEventHandler<HTMLInputElement>",
    },
    {
      attribute: "[required]",
      default: "false",
      description: "Requires a star and drops the clear radio.",
      group: "Required",
      part: "input",
      prop: "required",
    },
    {
      default: '"medium"',
      description: "The size of the stars.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
      },
    },
    {
      default: '(value) => "1 star", "2 stars"',
      description:
        "Returns the accessible name of each star radio. Use it to translate.",
      prop: "starLabel",
    },
  ],
  parts: [
    {
      code: "<legend>",
      description: "The label of the input.",
      props: ["label"],
      selector: "legend",
    },
    {
      code: 'input[value="0"]',
      description:
        "Clears the rating. Drawn as a muted icon, left out with `required`.",
      props: ["clearLabel"],
      selector: 'input[value="0"]',
    },
    {
      code: 'input[type="radio"]',
      description: "A star, one per value from `1` to `max`.",
      model: true,
      props: ["starLabel"],
      selector: 'input[value="1"]',
    },
    {
      code: "::after",
      description:
        "The checked and total count, such as `3/5`. Hidden from screen readers.",
      selector: "fieldset.ui-rating::after",
    },
  ],
  root: {
    description:
      "A `<meter>` for a read-only score, or a `<fieldset>` of radios for input.",
    selector: ".ui-rating",
  },
  source: "Rating",
} satisfies ComponentApi
