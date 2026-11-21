export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: { lang: "en" },
      link: [{ href: "data:,", rel: "icon" }],
      script: [
        {
          innerHTML:
            'try{const theme=localStorage.getItem("reference-theme");if(theme)document.documentElement.dataset.theme=theme}catch{}',
          tagPosition: "head",
        },
      ],
      titleTemplate: "%s | Reference",
    },
  },
  build: { transpile: ["reference-shared"] },
  compatibilityDate: "2026-11-01",
  css: [
    "opui-css/css/imports.css",
    "reference-shared/theme.css",
    "reference-shared/app.css",
  ],
  devtools: { enabled: false },
  telemetry: false,
  vite: {
    define: { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true },
    ssr: { noExternal: ["reference-shared"] },
  },
})
