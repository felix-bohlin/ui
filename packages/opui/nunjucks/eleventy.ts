import type { Environment } from "nunjucks"
import { configure, type Options } from "./index"

type EleventyConfig = {
  amendLibrary: (name: "njk", amend: (env: Environment) => void) => void
}

export default function opui(
  eleventyConfig: EleventyConfig,
  options?: Options,
) {
  eleventyConfig.amendLibrary("njk", (env) => {
    configure(env, options)
  })
}
