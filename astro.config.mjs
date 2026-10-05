// @ts-check
import { readdirSync } from "node:fs"
import { fileURLToPath } from "node:url"
import {
  defineConfig,
  fontProviders,
  passthroughImageService,
} from "astro/config"
import sitemap from "@astrojs/sitemap"
import expressiveCode from "astro-expressive-code"
import svelte from "@astrojs/svelte"
import vue from "@astrojs/vue"
import llms from "./src/integrations/llms.mjs"

import { DEFAULT_FRAMEWORK, FRAMEWORK_IDS } from "./src/utils/framework.js"

/** @param {string} relDir */
const slugsIn = (relDir) =>
  readdirSync(fileURLToPath(new URL(relDir, import.meta.url)))
    .filter((f) => f.endsWith(".astro"))
    .map((f) => f.replace(/\.astro$/, ""))

const learnSlugs = slugsIn("./src/docs/learn").filter((s) => s !== "index")
const componentSlugs = slugsIn("./src/docs/components")
const guideSlugs = ["getting-started", ...slugsIn("./src/docs/guide")]

const d = `/${DEFAULT_FRAMEWORK}`
const legacyRedirects = {
  "/components": `${d}/components`,
  "/api": `${d}/api`,
  "/guide": `${d}/guide/getting-started`,
  "/components/icon-button": `${d}/components/button#icon-only`,
  ...Object.fromEntries(
    FRAMEWORK_IDS.map((f) => [
      `/${f}/components/icon-button`,
      `/${f}/components/button#icon-only`,
    ]),
  ),
  ...Object.fromEntries(
    componentSlugs.map((s) => [`/components/${s}`, `${d}/components/${s}`]),
  ),
  ...Object.fromEntries(
    guideSlugs.map((s) => [`/guide/${s}`, `${d}/guide/${s}`]),
  ),
  ...Object.fromEntries(
    ["/blog", ...FRAMEWORK_IDS.map((f) => `/${f}/blog`)].flatMap((prefix) => [
      [prefix, "/learn"],
      ...learnSlugs.map((s) => [`${prefix}/${s}`, `/learn/${s}`]),
    ]),
  ),
}

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  image: { service: passthroughImageService() },
  site: "https://open-props-ui.netlify.app/",
  i18n: {
    defaultLocale: DEFAULT_FRAMEWORK,
    locales: FRAMEWORK_IDS,
    routing: { prefixDefaultLocale: true },
  },
  redirects: legacyRedirects,
  integrations: [
    vue(),
    sitemap(),
    svelte(),
    llms(),
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
