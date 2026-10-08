import type { ComponentApi } from "../types"

export default {
  component: "Rating",
  model: {
    description: "The checked rating, `0` for no rating.",
    prop: "value",
    type: "number",
  },
  notes: {
    astro:
      "Without `name`, it renders a `<meter>` and other attributes go to it. With `name`, they go to the `<fieldset>`.",
    html: 'A `<meter>` needs `max`, and `--_max` with the same number for browsers without typed `attr()`. The input is a `<fieldset>` of radios, one per star, plus a `value="0"` radio for no rating.',
    svelte:
      "Without `name`, it renders a `<meter>` and other attributes go to it. With `name`, they go to the `<fieldset>`.",
    vue: "Without `name`, it renders a `<meter>` and other attributes go to it. With `name`, they go to the `<fieldset>`.",
  },
  options: [
    {
      default: '"No rating"',
      description:
        "Accessible name of the radio that clears the rating. Not rendered with `required`.",
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
      prop: "max",
    },
    {
      description:
        "Renders the input: a `<fieldset>` of radios with this name. Without it, a read-only `<meter>`.",
      prop: "name",
    },
    {
      attribute: "[required]",
      default: "false",
      description: "Requires a star and drops the no rating radio.",
      group: "Required",
      part: "input",
      prop: "required",
    },
    {
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        small: ".ui-small",
      },
    },
    {
      default: '(value) => "1 star", "2 stars"…',
      description:
        "Returns the accessible name of each star radio. Use it to translate.",
      prop: "starLabel",
    },
    {
      description:
        "The score of the meter, fractions included, or the checked star of the input.",
      prop: "value",
      type: "number | string",
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
