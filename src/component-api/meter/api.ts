import type { ComponentApi } from "../types"

export default {
  component: "Meter",
  css: ["meter", "progress"],
  notes: {
    default:
      "`value`, `min`, `max`, `low`, `high` and `optimum` are the native attributes of the `<meter>`, which gets every extra attribute.",
    html: "Add `.ui-meter` to a `<meter>`. `value`, `min`, `max`, `low`, `high` and `optimum` are its native attributes.",
  },
  options: [
    {
      default: '"tonal"',
      description: "The variant to use.",
      group: "Variants",
      prop: "variant",
      values: {
        filled: ".ui-filled",
        tonal: null,
      },
    },
  ],
  parts: [],
  root: {
    code: "<meter>",
    description: "The meter. The browser draws the fill inside it.",
    selector: "meter.ui-meter",
  },
  slots: [
    {
      description: "Fallback content inside the `<meter>`.",
      name: "default",
    },
  ],
  source: "Meter",
} satisfies ComponentApi
