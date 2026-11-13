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
    react:
      "Use `value` with `onValueChange`, or `defaultValue`. Without them the radios keep their own state, and `onValueChange` still reports changes.",
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
      description:
        "The starting score of the meter or the star checked at the start, when `value` is omitted.",
      frameworks: ["react"],
      prop: "defaultValue",
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
      description:
        "The language of the `<fieldset>` or the `<meter>`, which picks the plural form of `starLabel` with `Intl.PluralRules`. Without it, the rating picks the English form.",
      inherited: true,
      prop: "lang",
      type: "string",
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
      description:
        "Called with the `value` of the star when one is picked, or `0` for the clear radio.",
      frameworks: ["react"],
      prop: "onValueChange",
      type: "(value: number | string) => void",
    },
    {
      attribute: "[required]",
      default: "false",
      description:
        "Adds a required mark after the legend, requires a star and drops the clear radio.",
      group: "Required",
      part: "input",
      prop: "required",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
      },
    },
    {
      default: '{ one: "{count} star", other: "{count} stars" }',
      description:
        "The accessible name of each star radio: a template per plural category of `lang` (`zero`, `one`, `two`, `few`, `many` and `other`), with `{count}` where the number goes. A category without a template takes `other`. Use it to translate.",
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
