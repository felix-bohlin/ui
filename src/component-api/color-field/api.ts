import { passThrough } from "../frameworks.ts"
import type { ComponentApi } from "../types"

const hydrated =
  "The picker works once the component hydrates, or once the page imports `opui-css/elements/color-field.js`. Until then it's a text field that takes an `oklch()` string."

export default {
  component: "ColorField",
  css: ["button", "color-field", "range", "text-field"],
  keyboard: [
    {
      description:
        "Moves focus between the picker button and the input. While the picker is open, its buttons and sliders come right after the picker button, and moving focus out of the picker closes it.",
      keys: ["Tab"],
    },
    {
      description:
        "On the picker button, opens the picker and moves focus to its first slider, or closes it.",
      keys: ["Enter", "Space"],
    },
    {
      description: "On a slider, changes its channel by its `step`.",
      keys: ["Up Arrow", "Down Arrow", "Left Arrow", "Right Arrow"],
    },
    {
      description:
        "On a slider, sets its channel to the lowest or highest value.",
      keys: ["Home", "End"],
    },
    {
      description:
        "Closes the picker and moves focus back to the picker button.",
      keys: ["Esc"],
    },
  ],
  model: {
    description: "The `oklch()` color, as the input's text.",
    prop: "value",
    type: "string",
  },
  notes: {
    ...passThrough(
      "input",
      "opui-color-field",
      ["name", "placeholder", "required"],
      {
        astro:
          "The component loads `opui-css/elements/color-field.js`, which runs the picker.",
        react: `Use \`value\` with \`onChange\`, or \`defaultValue\`. ${hydrated}`,
        svelte: hydrated,
        vue: hydrated,
      },
    ),
    html: "Put the picker button in the field's `.ui-start`, with `commandfor` naming the picker and `command=\"toggle-popover\"`, and the sliders in the `.ui-floating` popover, each `input[type=range]` with `data-channel` set to `L`, `C`, `H` or `alpha`. Give the `<label>` a `for` and an id for the picker's `aria-labelledby`, and import `opui-css/elements/color-field.js`. Without it, the picker button is hidden and the field takes an `oklch()` string.",
  },
  options: [
    {
      class: ".ui-auto-fit",
      default: "false",
      description:
        "Lets the width follow the value, from `25ch`, like a `TextField`.",
      group: "Auto fit",
      part: ".ui-text-field",
      prop: "autoFit",
    },
    {
      default: '"Chroma"',
      description: "The label of the chroma slider.",
      prop: "chromaLabel",
    },
    {
      default: '"{light}:1 on light, {dark}:1 on dark"',
      description:
        "What a screen reader gets for the contrast ratios in the picker, with `{light}` and `{dark}` where the numbers go.",
      prop: "contrastLabel",
    },
    {
      default: '"Copied"',
      description:
        "What the picker announces after the copy button copied the value.",
      prop: "copiedLabel",
    },
    {
      default: '"Copy"',
      description: "The accessible name of the copy button in the picker.",
      prop: "copyLabel",
    },
    {
      attribute: "[disabled]",
      default: "false",
      description: "Dims the field and blocks input and the picker button.",
      group: "Disabled",
      inherited: true,
      part: "input",
      prop: "disabled",
      type: "boolean",
    },
    {
      attribute: '[aria-invalid="true"]',
      default: "false",
      description: "Marks the control invalid and shows error styles.",
      group: "Validation",
      part: "input",
      prop: "error",
    },
    {
      default: '"Pick from the screen"',
      description:
        "The accessible name of the eyedropper button in the picker, shown in browsers with the EyeDropper API.",
      prop: "eyedropperLabel",
    },
    {
      class: ".ui-sr-only",
      default: "false",
      description:
        "Visually hides the label, `.ui-sr-only` instead of `.ui-label`. The field keeps it as its accessible name.",
      group: "Label",
      part: ".ui-text-field > label",
      prop: "hideLabel",
    },
    {
      default: '"Hue"',
      description: "The label of the hue slider.",
      prop: "hueLabel",
    },
    {
      description:
        "The id of the `<input>`. The label, the picker button and the sliders build their ids from it, so the component generates one when it's left out.",
      inherited: true,
      prop: "id",
      type: "string",
    },
    {
      default: '"Not a color. Try oklch(0.6 0.2 250) or any CSS color."',
      description:
        "The validation message and the line under the sliders while the text isn't a color.",
      prop: "invalidText",
    },
    {
      default: '"Lightness"',
      description: "The label of the lightness slider.",
      prop: "lightnessLabel",
    },
    {
      description:
        "The name of the `<input>`, which submits the `oklch()` value. Inside a `FieldGroup`, the group's `name` applies.",
      inherited: true,
      prop: "name",
      type: "string",
    },
    {
      default: '"slider"',
      description:
        'The opacity slider, which keeps the alpha in the value. `"none"` leaves it out, so the value is always opaque.',
      group: "Opacity",
      prop: "opacity",
      values: { none: null, slider: null },
    },
    {
      default: '"Opacity"',
      description: 'The label of the opacity slider, unless `opacity="none"`.',
      prop: "opacityLabel",
    },
    {
      default:
        '"Display P3. Wide-gamut screens show it, others show the nearest sRGB color."',
      description:
        "The line under the sliders for a color outside sRGB but inside Display P3.",
      prop: "p3Text",
    },
    {
      default: '"Pick a color"',
      description: "The accessible name of the picker button.",
      prop: "pickerLabel",
    },
    {
      attribute: "[required]",
      description:
        "Adds a required mark after the label. The form won't submit while the field is empty.",
      group: "Required",
      inherited: true,
      part: "input",
      prop: "required",
      type: "boolean",
    },
    {
      default: '"medium"',
      description: "The size of the element.",
      group: "Sizes",
      part: ".ui-text-field",
      prop: "size",
      values: {
        large: ".ui-large",
        medium: null,
        small: ".ui-small",
        "x-small": ".ui-x-small",
      },
    },
    {
      class: ".ui-spread",
      default: "false",
      description:
        "Pushes the label and start text to one side and the field to the other.",
      group: "Spread",
      part: ".ui-text-field",
      prop: "spread",
    },
    {
      default: '"sRGB. Every screen shows it."',
      description: "The line under the sliders for a color inside sRGB.",
      prop: "srgbText",
    },
    {
      default: '"outlined"',
      description: "The variant to use.",
      group: "Variants",
      part: ".ui-text-field",
      prop: "variant",
      values: { filled: ".ui-filled", outlined: null },
    },
    {
      default: '"Beyond Display P3. Screens show the nearest color they can."',
      description: "The line under the sliders for a color outside Display P3.",
      prop: "wideText",
    },
  ],
  parts: [
    {
      description:
        "The field, a `TextField` part that holds the label, the input and the texts.",
      selector: ".ui-color-field > .ui-text-field",
    },
    {
      description: "The label for the field.",
      props: ["label"],
      selector: ".ui-label",
      slots: ["label"],
    },
    {
      description: "Start text displayed above the field.",
      props: ["startText"],
      selector: ".ui-start-text",
      slots: ["start-text"],
    },
    {
      description: "The boxed input area.",
      selector: ".ui-field",
    },
    {
      description:
        'The picker button, with `command="toggle-popover"`. Hidden until the element is defined.',
      props: ["pickerLabel"],
      selector: ".ui-field > .ui-start",
    },
    {
      description:
        "The swatch in the picker button, painted with the color over a checkerboard that shows its opacity.",
      selector: ".ui-indicator",
    },
    {
      code: '<input type="text">',
      description: "The input element, which holds the `oklch()` value.",
      model: true,
      selector: ".ui-field > input",
    },
    {
      description: "Supporting text displayed below the field.",
      props: ["endText"],
      selector: ".ui-end-text",
      slots: ["end-text"],
    },
    {
      description:
        "The picker, a popover dialog with a `.ui-range` slider per channel. Each slider's track shows the colors its channel reaches, and its thumb shows the color. Its background takes a faint tint of the color's hue, `--_tint-chroma` at most.",
      props: ["opacity"],
      selector: ".ui-floating",
    },
    {
      description:
        "The preview across the top of the picker, painted with the color over a checkerboard that shows its opacity, with the `oklch()` value and the buttons. The color fades into the tint below it.",
      selector: ".ui-floating > .ui-header",
    },
    {
      description: "The `oklch()` value, on the preview.",
      selector: ".ui-header > .ui-value",
    },
    {
      description:
        'The eyedropper button (`command="--eyedropper"`, shown where the browser has the EyeDropper API) and the copy button (`command="--copy"`), which announces `copiedLabel`.',
      props: ["copiedLabel", "copyLabel", "eyedropperLabel"],
      selector: ".ui-header > .ui-actions",
    },
    {
      description:
        "Under the sliders, which screens show the color: sRGB, Display P3 or beyond.",
      selector: ".ui-floating > .ui-description",
    },
    {
      description:
        "The color's contrast ratio as text on white and on black, in two chips, read out through `contrastLabel`.",
      props: ["contrastLabel"],
      selector: ".ui-floating > .ui-footer",
    },
  ],
  root: {
    description:
      "The `<opui-color-field>` custom element. It keeps the sliders, the swatch and the input in step, and marks text that isn't a color invalid.",
    selector: "opui-color-field.ui-color-field",
  },
  source: "ColorField",
} satisfies ComponentApi
