import checkboxJs from "@opui/css/js/checkbox.js?url"
import rangeJs from "@opui/css/js/range.js?url"

const elements = import.meta.glob<string>("../../packages/opui/elements/*.js", {
  eager: true,
  import: "default",
  query: "?url",
})

export const importMap = JSON.stringify({
  imports: Object.fromEntries(
    [
      ["opui-css/css/js/checkbox.js", checkboxJs],
      ["opui-css/css/js/range.js", rangeJs],
      ...Object.entries(elements).map(([path, url]) => [
        `opui-css/elements/${path.split("/").at(-1)}`,
        url,
      ]),
    ].toSorted(([a], [b]) => a.localeCompare(b)),
  ),
})
