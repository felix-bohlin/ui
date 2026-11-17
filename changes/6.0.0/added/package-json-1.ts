import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`package.json` has a `svelte` field and a `svelte` export condition on `opui-css/svelte` (`./dist/svelte/index.js`), which `@sveltejs/vite-plugin-svelte` reads to compile the package for SSR in SvelteKit and Vite instead of externalizing it.",
} satisfies Change
