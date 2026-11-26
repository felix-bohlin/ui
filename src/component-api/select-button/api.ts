import type { ComponentApi } from "../types"

export default {
  component: "SelectButton",
  css: ["field", "list", "select"],
  notes: {
    default:
      "Put it first in your `<select>`. The browser copies the selected option into `<selectedcontent>`, icon and description included. Browsers without customizable select leave it out.",
    html: "Put `<button><selectedcontent></selectedcontent></button>` first in the `<select>`, before the options.",
  },
  options: [],
  page: "select",
  parts: [],
  root: {
    code: "<button>",
    description:
      "The select's button, showing the selected option in `<selectedcontent>`.",
    selector: "select > button",
  },
  source: "SelectButton",
} satisfies ComponentApi
