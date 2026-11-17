import { type Change } from "../../../src/utils/changes.ts"

export default {
  entry:
    "`DrawerHeader` takes a `close-icon` slot (`closeIcon` in React and Svelte) that replaces the close button's icon.",
  notes: {
    drawer: {
      astro: `The <a href="#close-button">close button</a> in <code>DrawerHeader</code> takes your own icon in the <code>close-icon</code> slot.`,
      vue: `The <a href="#close-button">close button</a> in <code>DrawerHeader</code> takes your own icon in the <code>close-icon</code> slot.`,
      react: `The <a href="#close-button">close button</a> in <code>DrawerHeader</code> takes your own icon in the <code>closeIcon</code> prop.`,
      svelte: `The <a href="#close-button">close button</a> in <code>DrawerHeader</code> takes your own icon in the <code>closeIcon</code> snippet.`,
    },
  },
} satisfies Change
