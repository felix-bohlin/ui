import opui from "opui-css/nunjucks/eleventy"

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(opui)
  eleventyConfig.addPassthroughCopy({
    "node_modules/opui-css/core": "opui/core",
    "node_modules/opui-css/css": "opui/css",
    "node_modules/opui-css/elements": "opui/elements",
    public: "/",
  })
  return { dir: { input: "src", output: "_site" } }
}
