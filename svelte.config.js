import { vitePreprocess } from "@astrojs/svelte"

export default {
  preprocess: vitePreprocess(),
  onwarn(warning, defaultHandler) {
    if (warning.filename?.includes("component-examples")) return
    defaultHandler(warning)
  },
}
