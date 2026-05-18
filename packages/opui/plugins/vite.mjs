// @ts-check
import { cosmiconfig } from "cosmiconfig"

/**
 * @returns {import('vite').Plugin}
 */
export const opui = () => ({
  name: "opui",
  /**
   * @param {string} id
   * @returns {Promise<string | undefined>}
   */
  async resolveId(id) {
    if (id === "virtual:opui-config") return id
  },
  /**
   * @param {string} id
   * @returns {Promise<string | undefined>}
   */
  async load(id) {
    if (id === "virtual:opui-config") {
      const explorer = cosmiconfig("opui")
      const result = await explorer.search()
      const config = result?.config || { prefix: "" }
      return `export default ${JSON.stringify(config)}`
    }
  },
})
export default opui
