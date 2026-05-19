// @ts-check
import { readFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { createRequire } from "node:module"
import postcss from "postcss"
import atImport from "postcss-import"
import { cosmiconfig } from "cosmiconfig"

const require = createRequire(import.meta.url)
const postcssRename = require("postcss-rename")

const here = dirname(fileURLToPath(import.meta.url))
const root = resolve(here, "..")

const targets = {
  "virtual:opui.css": "css/imports.css",
  "virtual:opui-components.css": "css/components.css",
  "virtual:opui-open-props.css": "open-props.css",
}

/**
 * @returns {import('vite').Plugin}
 */
export const opui = () => ({
  name: "opui",

  async resolveId(id) {
    if (id === "virtual:opui-config" || id in targets) {
      return id
    }
  },

  async load(id) {
    // import the config
    if (id === "virtual:opui-config") {
      const explorer = cosmiconfig("opui")
      const result = await explorer.search()
      const config = result?.config || {}
      return `export default ${JSON.stringify(config)}`
    }

    /**
     * @param {string} id
     * @returns {id is keyof typeof targets}
     */
    function isTargetId(id) {
      return id in targets
    }

    // import and transform css targets
    if (isTargetId(id)) {
      const explorer = cosmiconfig("opui")
      const result = await explorer.search()
      const { prefix } = result?.config || {}

      const inputPath = resolve(root, targets[id])
      const css = await readFile(inputPath, "utf-8")

      const processor = postcss(
        [
          atImport(),
          prefix &&
            postcssRename({
              prefix,
            }),
        ].filter(Boolean),
      )

      const processed = await processor.process(css, {
        from: inputPath,
        to: id,
      })

      return processed.css
    }
  },
})

export default opui
