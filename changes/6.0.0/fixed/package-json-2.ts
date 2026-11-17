import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`package.json` peer dependency ranges are `astro` `^7`, `svelte` `^5.57` and `vue` `^3.5.2` instead of the versions used for development.",
} satisfies Change
