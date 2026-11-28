import type { ComponentApi } from "../types"

export default {
  component: "Range",
  css: ["field", "range"],
  keyboard: [
    {
      description:
        "Increases the value by one step. In right-to-left text, Right Arrow decreases it.",
      keys: ["Up Arrow", "Right Arrow"],
    },
    {
      description:
        "Decreases the value by one step. In right-to-left text, Left Arrow increases it.",
      keys: ["Down Arrow", "Left Arrow"],
    },
    {
      description: "Sets the value to the minimum or the maximum.",
      keys: ["Home", "End"],
    },
    {
      description:
        "Changes the value by a larger step, 10% of the range in Chromium.",
      keys: ["Page Up", "Page Down"],
    },
  ],
  notes: {
    default:
      'Write an `<input type="range">` in a `Field`, with its `id` set to `for`. Show the value yourself, and set `aria-valuetext` when the number alone doesn\'t say it.',
    react:
      'Write an `<input type="range">` in a `Field`, with its `id` set to `htmlFor`. Show the value yourself, and set `aria-valuetext` when the number alone doesn\'t say it.',
    html: 'Put the `<input type="range">` in `.ui-field-container`, with a `<datalist>` after it for labels. Show the value yourself, and set `aria-valuetext` when the number alone doesn\'t say it.',
  },
  options: [],
  parts: [
    {
      code: '<input type="range">',
      description:
        "Your range input. The track fills up to the thumb without a script, and the field's variant (`variant`, `.ui-filled`) and size (`size`, `.ui-x-small`, `.ui-small`, `.ui-large`) set the track and thumb.",
      selector: '.ui-field-container > input[type="range"]',
    },
    {
      code: "<datalist>",
      description:
        "Labels under the input, linked with `list`: each option's `label`, spread evenly. Give it `aria-hidden=\"true\"`, and set the input's `aria-valuetext` to the label at its value.",
      selector: ".ui-field-container > datalist",
    },
  ],
  root: {
    description:
      'A `.ui-field` with an `<input type="range">`, drawn without the field\'s box.',
    selector: '.ui-field:has(> .ui-field-container > input[type="range"])',
  },
} satisfies ComponentApi
