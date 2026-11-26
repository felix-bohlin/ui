import opui from "opui-css/nunjucks/eleventy"

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(opui)
  eleventyConfig.addPassthroughCopy({
    "node_modules/opui-css/dist/opui.css": "opui.css",
  })
  return { dir: { input: "src", output: "dist" } }
}
