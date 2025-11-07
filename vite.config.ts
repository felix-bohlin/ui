import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

export default defineConfig({
  ssr: {
    noExternal: ["baseline-status"],
  },
  optimizeDeps: {
    include: ["baseline-status"],
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes("-"),
        },
      },
    }),
  ],
  build: {
    target: "esnext",
  },
})
