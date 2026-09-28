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
import vue from "@astrojs/vue"
import llms from "./src/integrations/llms.mjs"

import { DEFAULT_FRAMEWORK, FRAMEWORK_IDS } from "./src/utils/framework.js"

/** @param {string} relDir */
const slugsIn = (relDir) =>
  readdirSync(fileURLToPath(new URL(relDir, import.meta.url)))
    .filter((f) => f.endsWith(".astro"))
    .map((f) => f.replace(/\.astro$/, ""))

const componentSlugs = slugsIn("./src/docs/components")
const guideSlugs = ["getting-started", ...slugsIn("./src/docs/guide")]

const themePresetsDir = fileURLToPath(
  new URL("./src/styles/themes/", import.meta.url),
).replace(/\\/g, "/")

const d = `/${DEFAULT_FRAMEWORK}`
const legacyRedirects = {
  "/components": `${d}/components`,
  "/api": `${d}/api`,
  "/guide": `${d}/guide/getting-started`,
  "/themes": `${d}/themes`,
  ...Object.fromEntries(
    componentSlugs.map((s) => [`/components/${s}`, `${d}/components/${s}`]),
  ),
  ...Object.fromEntries(
    guideSlugs.map((s) => [`/guide/${s}`, `${d}/guide/${s}`]),
  ),
}

// https://astro.build/config
export default defineConfig({
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
    llms(),
    expressiveCode({
      themes: ["dark-plus", "light-plus"],
    }),
  ],
  vite: {
    plugins: [
      {
        name: "opui-theme-preset-scope",
        enforce: "pre",
        transform(code, id) {
          const file = id.replace(/\\/g, "/")
          if (!file.startsWith(themePresetsDir) || !file.endsWith(".css")) {
            return
          }
          const preset = file.slice(themePresetsDir.length, -".css".length)
          const fontFacePattern = /@font-face\s*\{[^}]*\}/g
          const fontFaces = code.match(fontFacePattern) ?? []
          const body = code
            .replace(fontFacePattern, "")
            .replaceAll(`[data-theme="${preset}"]`, ":scope")
            .trim()
          return {
            code: [
              ...fontFaces,
              `@scope ([data-theme="${preset}"]) to (:scope [data-theme]) {`,
              body,
              "}",
              "",
            ].join("\n"),
            map: null,
          }
        },
      },
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
