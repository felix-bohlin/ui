export default defineNuxtConfig({
  build: { transpile: ["opui-css"] },
  compatibilityDate: "2026-11-01",
  css: ["opui-css/css/imports.css"],
  devtools: { enabled: false },
  vite: { define: { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true } },
})
