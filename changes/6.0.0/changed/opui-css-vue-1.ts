import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`opui-css/vue` exports compiled ES modules with `.d.ts` types, source maps and declaration maps instead of the `.vue` and `.ts` sources, so Nuxt and server rendering in Vite need no `build.transpile` or `ssr.noExternal`, `skipLibCheck` skips its types, and your `compilerOptions` only apply to your own code. The components are compiled in production mode, so Vue no longer warns at runtime about a prop of the wrong type. `opui-css/components/<Name>/<Part>.vue` resolves to the same compiled files, so it shares context with the entry point, and the sources stay in the package for the maps and for reading.",
} satisfies Change
