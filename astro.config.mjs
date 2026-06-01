// @ts-check
import { readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { defineConfig, fontProviders } from "astro/config"
import sitemap from "@astrojs/sitemap"

import expressiveCode from "astro-expressive-code"

import { DEFAULT_FRAMEWORK, FRAMEWORK_IDS } from "./src/utils/framework.js"

/** @param {string} relDir */
const slugsIn = (relDir) =>
  readdirSync(fileURLToPath(new URL(relDir, import.meta.url)))
    .filter((f) => f.endsWith(".astro"))
    .map((f) => f.replace(/\.astro$/, ""))

const componentSlugs = slugsIn("./src/docs/components")
const guideSlugs = ["getting-started", ...slugsIn("./src/docs/guide")]

const d = `/${DEFAULT_FRAMEWORK}`
// Legacy unprefixed paths redirect to the default framework variant. Astro
// validates each destination against an existing route, so we enumerate
// component and guide slugs from disk rather than using `[param]` patterns.
const legacyRedirects = {
  "/components": `${d}/components`,
  "/api": `${d}/api`,
  "/guide": `${d}/guide/getting-started`,
  ...Object.fromEntries(
    componentSlugs.map((s) => [`/components/${s}`, `${d}/components/${s}`]),
  ),
  ...Object.fromEntries(
    guideSlugs.map((s) => [`/guide/${s}`, `${d}/guide/${s}`]),
  ),
}

// https://astro.build/config
export default defineConfig({
  site: "https://open-props-ui.netlify.app/",
  // Framework variants are modeled as i18n locales. Every framework lives
  // under its own URL prefix (e.g. /html/..., /astro/...). The "default" is
  // only used as a fallback target for unprefixed legacy URLs, which redirect
  // to /<DEFAULT_FRAMEWORK>/... via dedicated redirect pages under src/pages.
  i18n: {
    defaultLocale: DEFAULT_FRAMEWORK,
    locales: FRAMEWORK_IDS,
    routing: { prefixDefaultLocale: true },
  },
  redirects: legacyRedirects,
  integrations: [
    sitemap(),
    expressiveCode({
      themes: ["dark-plus", "light-plus"],
    }),
  ],
  vite: {
    plugins: [
      {
        name: "opui-package-astro-hmr",
        handleHotUpdate({ file, server }) {
          if (file.includes("/packages/opui/") && file.endsWith(".astro")) {
            server.ws.send({ type: "full-reload", path: "*" })
          }
        },
      },
    ],
  },
  devToolbar: { enabled: false },
  fonts: [
    {
      name: "Bricolage Grotesque",
      provider: fontProviders.local(),
      cssVariable: "--font-bricolage-grotesque",
      options: {
        variants: [
          {
            src: ["./public/BricolageGrotesque[opsz,wdth,wght].ttf"],
            style: "normal",
            weight: "300 900",
            display: "swap",
          },
        ],
      },
    },
  ],
})
