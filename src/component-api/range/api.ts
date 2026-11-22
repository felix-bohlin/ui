import type { ComponentApi } from "../types"

export default {
  component: "Range",
  css: ["range", "text-field"],
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
        "Increases or decreases the value by a larger step: 10% of the range in Chromium, and at least one step.",
      keys: ["Page Up", "Page Down"],
    },
  ],
  notes: {
    default:
      "Write an `<input type=\"range\">` in a `Field`, with its `id` set to `for`. A `<datalist>` after it, linked with `list`, draws tick marks, and its options' `label`s under them. Show the value yourself, such as in an `<output>` in the end text, and set `aria-valuetext` when the number alone doesn't say it.",
    react:
      "Write an `<input type=\"range\">` in a `Field`, with its `id` set to `htmlFor`. A `<datalist>` after it, linked with `list`, draws tick marks, and its options' `label`s under them. Show the value yourself, such as in an `<output>` in `endText`, and set `aria-valuetext` when the number alone doesn't say it.",
    html: "Put the `<input type=\"range\">` directly in `.ui-field-container`, and a `<datalist>` after it for tick marks. `range.css` drops the field's box and draws the track, the fill and the thumb. Show the value yourself, and set `aria-valuetext` when the number alone doesn't say it.",
  },
  options: [],
  parts: [
    {
      code: '<input type="range">',
      description:
        "Your range input, directly in `.ui-field-container`. The track fills up to the thumb with CSS, so it follows the value without a script. The field's `variant` and `size` set the track and thumb.",
      selector: '.ui-field-container > input[type="range"]',
    },
    {
      code: "<datalist>",
      description:
        "Tick marks for the input it's linked to with `list`, and the `label` of each option under its mark. Give it `aria-hidden=\"true\"`, and set `aria-valuetext` on the input to the label at its value, since screen readers don't read the datalist.",
      selector: ".ui-field-container > datalist",
    },
  ],
  root: {
    description:
      "A `.ui-field` with an `<input type=\"range\">` in its container, which `range.css` draws without the field's box, as tall as any field's control.",
    selector: '.ui-field:has(> .ui-field-container > input[type="range"])',
  },
} satisfies ComponentApi
