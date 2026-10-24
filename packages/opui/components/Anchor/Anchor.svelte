<script lang="ts">
  import { mergeStyle } from "../style"
  import { setAnchorContext } from "./context.svelte"
  import { extendsAnchor } from "./root"
  import type { Props } from "./types.svelte"

  let {
    class: className,
    id: idProp,
    positionArea,
    style,
    trigger,

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
  class={[!extendsAnchor(className) && "ui-anchor", className]}
  id={isHover ? undefined : idProp}
  style={mergeStyle({ "--ui-anchor-position-area": positionArea }, style)}
  {...rest}
>
  {@render children?.()}
</span>
