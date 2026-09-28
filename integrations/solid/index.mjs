import { fileURLToPath } from "node:url"
import solid from "@solidjs/vite-plugin"

/**
 * @param {{ include?: import("vite").FilterPattern, exclude?: import("vite").FilterPattern }} [options]
 * @returns {import("astro").AstroIntegration}
 */
export default function solidIntegration(options = {}) {
  return {
    name: "opui-solid",
    hooks: {
      "astro:config:setup": ({ addRenderer, updateConfig }) => {
        addRenderer({
          name: "opui-solid",
          clientEntrypoint: fileURLToPath(new URL("./client.js", import.meta.url)),
          serverEntrypoint: fileURLToPath(new URL("./server.js", import.meta.url)),
        })
        updateConfig({
          vite: {
            plugins: [
              solid({
                exclude: options.exclude,
                include: options.include,
                ssr: true,
              }),
            ],
          },
        })
      },
    },
  }
}
