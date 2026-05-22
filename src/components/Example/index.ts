import Example from "./Example.astro"
import Preview from "./Preview.astro"
import PreviewSvelte from "./Preview.svelte"
import Code from "./Code.astro"

export { Preview, PreviewSvelte, Code }

export default Object.assign(Example, {
  Preview,
  PreviewSvelte,
  Code,
})
