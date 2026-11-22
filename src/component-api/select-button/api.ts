import type { ComponentApi } from "../types"

export default {
  component: "SelectButton",
  css: ["list", "select", "text-field"],
  notes: {
    default:
      "Put it first in your `<select>`, before the options. The select keeps clicks, focus and the name, and the browser fills `<selectedcontent>` with a copy of the selected option, so an option with an icon or a description shows them in the field. Browsers without customizable select leave it out.",
    html: "Put `<button><selectedcontent></selectedcontent></button>` first in the `<select>`, before the options.",
  },
  options: [],
  page: "select",
  parts: [],
  root: {
    code: "<button>",
    description:
      "The select's button, with `<selectedcontent>` inside, which shows the selected option.",
    selector: "select > button",
  },
  source: "SelectButton",
} satisfies ComponentApi
