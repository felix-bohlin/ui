import { build } from "esbuild"
import opui from "opui-css/nunjucks/eleventy"

export default (eleventyConfig) => {
  eleventyConfig.addPlugin(opui)
  eleventyConfig.addPassthroughCopy({ public: "/" })
  eleventyConfig.on("eleventy.before", () =>
    build({
      bundle: true,
      entryNames: "app",
      entryPoints: ["src/scripts/app.ts", "src/styles.css"],
      format: "esm",
      logLevel: "warning",
      outdir: "_site",
    }),
  )
  return { dir: { input: "src" } }
}
