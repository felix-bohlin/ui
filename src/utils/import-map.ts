import checkboxJs from "@opui/css/js/checkbox.js?url"

const elements = import.meta.glob<string>("../../packages/opui/elements/*.js", {
  eager: true,
  import: "default",
  query: "?url",
})

export const importMap = JSON.stringify({
  imports: Object.fromEntries(
    [
      ["opui-css/css/js/checkbox.js", checkboxJs],
      ...Object.entries(elements).map(([path, url]) => [
        `opui-css/elements/${path.split("/").at(-1)}`,
        url,
      ]),
    ].toSorted(([a], [b]) => a.localeCompare(b)),
  ),
})
