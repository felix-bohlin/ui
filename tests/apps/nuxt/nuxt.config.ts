const readme = process.env.OPUI_README_BUILD
const settings = readme ? JSON.parse(readme) : {}

export default defineNuxtConfig({
  ...(readme
    ? {
        buildDir: ".nuxt-readme",
        nitro: { output: { dir: ".output-readme" } },
      }
    : {}),
  compatibilityDate: "2026-11-01",
  css: ["opui-css/css/imports.css"],
  devtools: { enabled: false },
  vite: {
    ...settings,
    define: { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true },
  },
})
