// @ts-check
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import {
  defineConfig,
  fontProviders,
  passthroughImageService,
} from "astro/config"
import sitemap from "@astrojs/sitemap"
import react from "@astrojs/react"
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
    ["/guide", ...FRAMEWORK_IDS.map((f) => `/${f}/guide`)].map((prefix) => [
      `${prefix}/theme-generator`,
      "/theme-builder",
    ]),
  ),
  ...Object.fromEntries(
    ["/blog", ...FRAMEWORK_IDS.map((f) => `/${f}/blog`)].flatMap((prefix) => [
      [prefix, "/learn"],
      ...learnSlugs.map((s) => [`${prefix}/${s}`, `/learn/${s}`]),
    ]),
  ),
}

/** @type {URL | undefined} */
let outDir
const NOINDEX =
  /<meta\b(?=[^>]*\bname="robots")(?=[^>]*\bcontent="[^"]*\bnoindex)[^>]*>/i
/** @param {string} page */
const indexable = (page) => {
  if (!outDir) return true
  const file = new URL(`.${new URL(page).pathname}index.html`, outDir)
  return !existsSync(file) || !NOINDEX.test(readFileSync(file, "utf-8"))
}

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  image: { service: passthroughImageService() },
  markdown: { syntaxHighlight: false },
  site: "https://open-props-ui.netlify.app/",
  redirects: legacyRedirects,
  integrations: [
    {
      name: "opui-out-dir",
      hooks: {
        "astro:config:done": ({ config }) => {
          outDir = config.outDir
        },
      },
    },
    vue(),
    sitemap({ filter: indexable }),
    svelte(),
    react({ include: [/\.react\.tsx$/] }),
    llms(),
  ],
  vite: {
    build: {
      dynamicImportVarsOptions: {
        exclude: [/node_modules\/(?!(\.pnpm\/)?microlighter)/],
      },
    },
    optimizeDeps: { exclude: ["microlighter"] },
    plugins: [
      {
        name: "opui-no-react-refresh",
        enforce: "post",
        config: () => ({ oxc: { jsx: { refresh: false } } }),
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
