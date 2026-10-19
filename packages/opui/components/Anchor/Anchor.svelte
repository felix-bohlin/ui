<script lang="ts">
  import { mergeStyle } from "../style"
  import { setAnchorContext } from "./context.svelte"
  import type { Props } from "./types.svelte"

  let {
    alignment,
    class: className,
    id: idProp,
    style,
    trigger = "always",

    // Snippets
    children,
    ...rest
  }: Props = $props()

  const isHover = $derived(trigger === "hover")
  const id = $derived(isHover ? (idProp ?? undefined) : undefined)

  setAnchorContext({
    get floatingId() {
      return id
    },
    get popover() {
      return isHover ? ("hint" as const) : undefined
    },
  })
</script>

<span
  class={["ui-anchor", className]}
  id={isHover ? undefined : idProp}
  style={mergeStyle({ "--ui-anchor-position-area": alignment }, style)}
  {...rest}
>
  {@render children?.()}
</span>
